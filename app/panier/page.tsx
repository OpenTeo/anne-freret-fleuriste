'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth-context';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DeliveryCalculator from '@/components/ui/DeliveryCalculator';
import CardSelector, { CardPreview, MESSAGE_CARDS } from '@/components/ui/CardSelector';
import { DeliveryMode, getBusinessNow, getDeliveryModeDetails, getEarliestDeliveryDate, isSelectableDeliveryDate } from '@/lib/delivery-rules';

interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  message?: string;
  cardId?: string;
}

interface UpsellItem {
  id: string;
  name: string;
  size: string;
  price: number;
  image: string;
  desc: string;
  category: string;
}

type CardType = 'none' | 'standard' | 'artisanal';

interface CheckoutCardInfo {
  type: CardType;
  message: string;
  selectedCardImage?: string;
  supplement: number;
}

// Load cart from localStorage instead of hardcoding items
const getInitialCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('af-cart');
  return stored ? JSON.parse(stored) : [];
};

const initialCartItems = getInitialCart();

const getItemOptionLabel = (item: CartItem) => {
  if (
    item.category === 'Cartes message' ||
    item.id === 'addon-vase-decoratif' ||
    item.id === 'addon-chocolats-artisanaux'
  ) {
    return 'Modèle choisi';
  }

  return 'Taille';
};

const findCardMessageItem = (items: CartItem[]) =>
  items.find((item) => item.category === 'Cartes message');

const buildCardMessageItem = (
  cardType: CardType,
  message: string,
  selectedCardImage: string | null
): CartItem | null => {
  const normalizedMessage = message.trim().toUpperCase();

  if (cardType === 'standard') {
    return {
      id: 'cart-message-standard',
      name: 'Carte message standard',
      size: 'Carte standard',
      price: 0,
      quantity: 1,
      image: '/icons/envelope.svg',
      category: 'Cartes message',
      message: normalizedMessage || undefined,
    };
  }

  if (cardType === 'artisanal' && selectedCardImage) {
    const selectedCard = MESSAGE_CARDS.find((card) => card.id === selectedCardImage);
    return {
      id: `cart-message-artisanal-${selectedCardImage}`,
      name: 'Carte message artisanale',
      size: selectedCard?.name || 'Carte artisanale',
      price: 4.99,
      quantity: 1,
      image: '/icons/envelope.svg',
      category: 'Cartes message',
      message: normalizedMessage || undefined,
      cardId: selectedCardImage,
    };
  }

  return null;
};

const syncCardMessageItem = (
  items: CartItem[],
  cardType: CardType,
  message: string,
  selectedCardImage: string | null
) => {
  const nextItems = items.filter((item) => item.category !== 'Cartes message');
  const nextCardItem = buildCardMessageItem(cardType, message, selectedCardImage);

  if (nextCardItem) {
    nextItems.push(nextCardItem);
  }

  return nextItems;
};

export default function Panier() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [cardType, setCardType] = useState<CardType>('none');
  const [cardMessage, setCardMessage] = useState('');
  const [selectedCardImage, setSelectedCardImage] = useState<string | null>(null);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode | null>(null);
  const [localDeliveryFee, setLocalDeliveryFee] = useState(0);
  const [localDeliveryValidated, setLocalDeliveryValidated] = useState(false);
  const [localDeliveryUnsupported, setLocalDeliveryUnsupported] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('af-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save cart to DB for logged-in users (debounced 2s) — enables abandoned cart recovery
  const saveDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!user) return;
    if (saveDebounce.current) clearTimeout(saveDebounce.current);
    saveDebounce.current = setTimeout(() => {
      const mainItems = cartItems.filter((i) => i.category !== 'Cartes message');
      const total = mainItems.reduce((s, i) => s + i.price * i.quantity, 0);
      fetch('/api/cart/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: mainItems, total }),
      }).catch(() => {});
    }, 2000);
    return () => {
      if (saveDebounce.current) clearTimeout(saveDebounce.current);
    };
  }, [cartItems, user]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) { removeItem(id); return; }
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const addUpsellItem = (upsellItem: UpsellItem) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === upsellItem.id);

      if (existingItem) {
        return items.map((item) =>
          item.id === upsellItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...items,
        {
          id: upsellItem.id,
          name: upsellItem.name,
          size: upsellItem.size,
          price: upsellItem.price,
          quantity: 1,
          image: upsellItem.image,
          category: upsellItem.category,
        },
      ];
    });
  };

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;
    try {
      const res = await fetch(`/api/admin/promo?code=${encodeURIComponent(promoCode.trim())}`);
      if (res.ok) {
        const data = await res.json();
        if (data.promo && data.promo.is_active) {
          setAppliedPromo(data.promo.code);
          setPromoCode('');
        } else {
          alert('Code promo invalide ou expiré');
        }
      } else {
        // Fallback: vérifier les codes connus
        setAppliedPromo(promoCode.trim().toUpperCase());
        setPromoCode('');
      }
    } catch {
      setAppliedPromo(promoCode.trim().toUpperCase());
      setPromoCode('');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const businessNow = getBusinessNow();
  const localEarliestDate = getEarliestDeliveryDate('local');
  const chronopostEarliestDate = getEarliestDeliveryDate('chronopost');
  
  const getDeliveryFee = () => {
    if (!deliveryMode) return 0;
    if (deliveryMode === 'local') {
      if (!localDeliveryValidated) return 0;
      return subtotal >= 60 ? 0 : localDeliveryFee;
    }
    if (deliveryMode === 'chronopost') {
      return subtotal >= 90 ? 0 : 18.9;
    }
    return 0;
  };
  
  const localDeliveryNeedsValidation = deliveryMode === 'local' && !localDeliveryValidated;
  const deliveryFeeKnown = deliveryMode === 'chronopost' || (deliveryMode === 'local' && localDeliveryValidated);
  const delivery = deliveryFeeKnown ? getDeliveryFee() : 0;
  const pendingCardItem = !findCardMessageItem(cartItems)
    ? buildCardMessageItem(cardType, cardMessage, selectedCardImage)
    : null;
  const cardSupplement = pendingCardItem ? pendingCardItem.price * pendingCardItem.quantity : 0;
  const total = subtotal - discount + delivery + cardSupplement;
  const freeThreshold = deliveryMode === 'chronopost' ? 90 : 60; // local = 60, chronopost = 90
  const freeDeliveryRemaining = subtotal < freeThreshold ? (freeThreshold - subtotal) : 0;
  const deliveryThresholdReached = deliveryMode !== null && subtotal >= freeThreshold;
  const deliveryIsFree = deliveryFeeKnown && deliveryThresholdReached;
  const deliverySavings = deliveryMode === 'chronopost'
    ? 18.9
    : localDeliveryValidated
      ? localDeliveryFee
      : 0;
  const upsellItems: UpsellItem[] = [
    { id: 'addon-bougie-geodesis-figuier', name: 'Bougie Geodesis Figuier', size: 'Standard', price: 12.90, image: '/geodesis-figuier-addon.jpg', desc: 'Cire naturelle, notes vertes de figuier', category: 'Compléments' },
    { id: 'addon-vase-decoratif', name: 'Vase décoratif', size: 'Standard', price: 12.90, image: '/vase-addon.jpg', desc: '19 cm de haut, 15 cm de large', category: 'Compléments' },
    { id: 'addon-chocolats-artisanaux', name: 'Chocolats artisanaux', size: 'Standard', price: 14.90, image: '/chocolats-addon.jpg', desc: 'Coffret 12 pièces', category: 'Compléments' },
  ];
  const availableUpsellItems = upsellItems.filter(
    (upsellItem) => !cartItems.some((cartItem) => cartItem.id === upsellItem.id)
  );
  const existingCardMessageItem = findCardMessageItem(cartItems);
  const hasExistingCardMessage = Boolean(existingCardMessageItem);
  const activeCardItem = existingCardMessageItem || pendingCardItem;

  const hasDeuil = cartItems.some(item => item.category === 'Deuil & Hommages');
  const deliveryDateIsValid = deliveryMode ? isSelectableDeliveryDate(deliveryMode, selectedDate) : false;
  const canCheckout = deliveryMode !== null &&
    deliveryDateIsValid &&
    (deliveryMode !== 'local' || (localDeliveryValidated && !localDeliveryUnsupported));

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="bg-[#faf8f5] min-h-screen pt-20">
          <div className="container mx-auto px-4 md:px-8 py-20 md:py-32">
            <div className="max-w-md mx-auto text-center">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#b8935a] mb-6">Panier</div>
              <h1 className="text-3xl md:text-5xl font-serif text-[#2d2a26] mb-6">Votre Panier est Vide</h1>
              <div className="w-12 h-px bg-[#b8935a] mx-auto mb-6"></div>
              <p className="text-[#2d2a26] font-light mb-10 leading-relaxed">
                Découvrez nos créations florales artisanales.
              </p>
              <Link href="/boutique" className="inline-block bg-[#b8935a] text-white px-8 py-3.5 text-sm uppercase tracking-[0.1em] hover:bg-[#b8956a] transition-colors">
                Découvrir la Boutique
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-20">
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-16">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-6">
            <Link href="/boutique" className="text-[#b8935a] hover:text-[#b8956a] transition-colors">Boutique</Link>
            <span className="text-[#2d2a26]/20">/</span>
            <span className="text-[#2d2a26]/50">Votre panier</span>
          </div>

          {/* Title compact */}
          <h1 className="text-2xl md:text-4xl font-serif text-[#2d2a26] mb-2">
            Votre Sélection
          </h1>
          <p className="text-sm text-[#2d2a26]/50 font-light mb-8">
            {cartItems.length} article{cartItems.length > 1 ? 's' : ''}
          </p>

          {/* Free delivery progress */}
          <div className={`p-4 mb-6 border ${deliveryIsFree ? 'bg-[#f8f4ec] border-[#b8935a]/30' : 'bg-white border-[#e8e0d8]'}`}>
            <div className="flex items-center justify-between mb-2 gap-3">
              <div>
                {deliveryMode ? (
                  deliveryIsFree ? (
                    <>
                      <p className="text-sm text-[#2d2a26] font-medium">
                        Vous bénéficiez de la livraison offerte en {deliveryMode === 'chronopost' ? 'Chronopost' : 'livraison locale'}.
                      </p>
                      <p className="text-xs text-[#2d2a26]/45 mt-1">
                        Économie estimée : {deliverySavings.toFixed(2)}€ sur la livraison.
                      </p>
                    </>
                  ) : localDeliveryNeedsValidation && deliveryThresholdReached ? (
                    <>
                      <p className="text-sm text-[#2d2a26] font-light">
                        Le seuil de gratuité est atteint. Vérifie ta ville pour confirmer la livraison locale offerte.
                      </p>
                      <p className="text-xs text-[#2d2a26]/45 mt-1">
                        Livraison locale offerte dès 60,00€ pour les adresses couvertes.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-[#2d2a26] font-light">
                        Plus que <span className="text-[#b8935a] font-medium">{freeDeliveryRemaining.toFixed(2)}€</span> pour profiter de la livraison offerte.
                      </p>
                      <p className="text-xs text-[#2d2a26]/45 mt-1">
                        Seuil actuel : {freeThreshold.toFixed(2)}€ en {deliveryMode === 'chronopost' ? 'Chronopost' : 'livraison locale'}.
                      </p>
                    </>
                  )
                ) : (
                  <>
                    <p className="text-sm text-[#2d2a26] font-light">
                      Choisis ton mode de livraison pour voir quand elle devient offerte.
                    </p>
                    <p className="text-xs text-[#2d2a26]/45 mt-1">
                      Livraison locale offerte dès 60,00€ · Chronopost offert dès 90,00€.
                    </p>
                  </>
                )}
              </div>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${deliveryIsFree ? 'bg-[#b8935a] text-white' : 'text-[#b8935a]'}`}>
                {deliveryIsFree ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                )}
              </div>
            </div>
            <div className="w-full h-1.5 bg-[#e8e0d8] rounded-full overflow-hidden">
              <div className="h-full bg-[#b8935a] rounded-full transition-all duration-500" style={{ width: `${Math.min((subtotal / freeThreshold) * 100, 100)}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left column */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Cart Items */}
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-4 md:p-6 border border-[#e8e0d8]/50">
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 bg-[#faf8f5] overflow-hidden">
                      {item.category === 'Cartes message' && item.cardId ? (
                        <CardPreview cardId={item.cardId} />
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={112}
                          height={112}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-grow min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.15em] text-[#b8935a] mb-1">{item.category}</p>
                            <h3 className="text-base md:text-lg font-serif text-[#2d2a26] leading-tight">{item.name}</h3>
                            <p className="text-xs text-[#2d2a26]/40 mt-0.5">{getItemOptionLabel(item)} : {item.size}</p>
                            {item.message && (
                              <p className="text-xs text-[#2d2a26]/55 mt-1 italic tracking-[0.04em]">&ldquo;{item.message.toUpperCase()}&rdquo;</p>
                            )}
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)} 
                            className="text-[#2d2a26]/30 hover:text-[#2d2a26] transition-colors p-1 -mr-1 -mt-1"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#e8e0d8] h-8">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-full flex items-center justify-center text-[#2d2a26]/50 hover:text-[#b8935a] transition-colors text-sm">−</button>
                          <span className="w-8 text-center text-sm text-[#2d2a26]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-full flex items-center justify-center text-[#2d2a26]/50 hover:text-[#b8935a] transition-colors text-sm">+</button>
                        </div>
                        <p className="text-lg font-serif text-[#2d2a26]">
                          {(item.price * item.quantity).toFixed(2)}€
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upsell products */}
              {availableUpsellItems.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs text-[#2d2a26]/40 mb-3 uppercase tracking-[0.1em]">Complétez votre commande</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availableUpsellItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => addUpsellItem(item)}
                        className="bg-white border border-[#e8e0d8] p-2.5 text-left hover:border-[#b8935a] transition-all group"
                      >
                        <div className="relative w-full aspect-square bg-[#f5f0eb] mb-2 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 45vw, 12rem"
                            className="object-cover p-6"
                          />
                        </div>
                        <p className="text-xs text-[#2d2a26] leading-tight">{item.name}</p>
                        <p className="text-xs text-[#b8935a] mt-1">{item.price.toFixed(2)}€</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {hasExistingCardMessage ? (
                <div className="bg-white p-4 md:p-6 border border-[#e8e0d8]/50">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-[#b8935a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <h3 className="text-sm font-serif text-[#2d2a26]">Carte message</h3>
                  </div>
                  <p className="text-sm text-[#2d2a26]/60 font-light">
                    Une carte message est déjà présente dans votre panier.
                  </p>
                  {existingCardMessageItem?.message && (
                    <p className="text-xs text-[#2d2a26]/55 mt-2 italic tracking-[0.04em]">
                      &ldquo;{existingCardMessageItem.message.toUpperCase()}&rdquo;
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-white p-4 md:p-6 border border-[#e8e0d8]/50">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-4 h-4 text-[#b8935a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <h3 className="text-sm font-serif text-[#2d2a26]">Carte message</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                    <button
                      onClick={() => setCardType('standard')}
                      className={`border p-4 text-left transition-all ${cardType === 'standard' ? 'border-[#b8935a] bg-[#b8935a]/5' : 'border-[#e8e0d8] hover:border-[#b8935a]/50'}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm text-[#2d2a26] font-medium">Carte standard</p>
                          <p className="text-xs text-[#2d2a26]/45 mt-1">Simple, élégante et offerte avec votre bouquet.</p>
                        </div>
                        <span className="text-sm text-[#b8935a]">0,00 €</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setCardType('artisanal')}
                      className={`border p-4 text-left transition-all ${cardType === 'artisanal' ? 'border-[#b8935a] bg-[#b8935a]/5' : 'border-[#e8e0d8] hover:border-[#b8935a]/50'}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm text-[#2d2a26] font-medium">Carte artisanale</p>
                          <p className="text-xs text-[#2d2a26]/45 mt-1">Fleur séchée collée à la main, avec message personnalisé.</p>
                        </div>
                        <span className="text-sm text-[#b8935a]">+ 4,99 €</span>
                      </div>
                    </button>
                  </div>

                  {cardType === 'standard' && (
                    <div className="space-y-3">
                      <div className="rounded-sm border border-[#e8e0d8] bg-[#faf8f5] p-4">
                        <p className="text-sm text-[#2d2a26] mb-2">Message pour la carte standard</p>
                        <textarea
                          value={cardMessage}
                          onChange={(e) => setCardMessage(e.target.value)}
                          placeholder="Écris le message exact à inscrire sur la carte..."
                          maxLength={150}
                          rows={3}
                          className="w-full resize-none border border-[#e8e0d8] bg-white px-3 py-2.5 text-[16px] text-[#2d2a26] font-light focus:outline-none focus:border-[#b8935a] transition-colors placeholder:text-[#2d2a26]/25"
                        />
                        <p className="mt-1 text-right text-[10px] text-[#2d2a26]/30">{cardMessage.length}/150</p>
                      </div>
                    </div>
                  )}

                  {cardType === 'artisanal' && (
                    <CardSelector
                      selectedCard={selectedCardImage}
                      onSelect={setSelectedCardImage}
                      message={cardMessage}
                      onMessageChange={setCardMessage}
                    />
                  )}
                </div>
              )}

              {/* Continue shopping */}
              <div className="text-center pt-4">
                <Link href="/boutique" className="text-sm text-[#b8935a] hover:text-[#b8956a] transition-colors">
                  ← Continuer les achats
                </Link>
              </div>
            </div>

            {/* Right column — Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-5 md:p-6 border border-[#e8e0d8]/50 sticky top-24 space-y-6">
                
                <h2 className="text-lg font-serif text-[#2d2a26]">Récapitulatif</h2>

                {/* ——— DELIVERY MODE SELECTOR ——— */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#b8935a] mb-3">Mode de livraison</p>
                  
                  <div className="space-y-2">
                    {/* Local */}
                    <div className={`border transition-all ${
                      deliveryMode === 'local' 
                        ? 'border-[#b8935a] bg-[#b8935a]/5' 
                        : 'border-[#e8e0d8] hover:border-[#b8935a]/50'
                    }`}>
                      <button
                        onClick={() => {
                          setDeliveryMode('local');
                          if (!isSelectableDeliveryDate('local', selectedDate)) {
                            setSelectedDate(localEarliestDate);
                          }
                        }}
                        className="w-full text-left p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${
                            deliveryMode === 'local' ? 'border-[#b8935a]' : 'border-[#e8e0d8]'
                          }`}>
                            {deliveryMode === 'local' && <div className="w-2 h-2 rounded-full bg-[#b8935a]" />}
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-[#2d2a26] font-medium">Livraison locale</p>
                                <span className="text-[9px] px-1.5 py-0.5 rounded-sm text-white" style={{ backgroundColor: '#b8935a' }}>24h</span>
                              </div>
                              <p className="text-sm text-[#b8935a]">
                                {localDeliveryValidated
                                  ? delivery === 0
                                    ? 'Offerte'
                                    : `${localDeliveryFee.toFixed(2)}€`
                                  : subtotal >= 60
                                    ? 'Ville à vérifier'
                                    : 'Dès 6€'}
                              </p>
                            </div>
                            <p className="text-xs text-[#2d2a26]/40 mt-1 leading-relaxed">
                              Livraison locale 7j/7 · Le jour même avant 12h
                            </p>
                          </div>
                        </div>
                      </button>
                      
                      {/* Tarifs locaux + calculateur */}
                      {deliveryMode === 'local' && (
                        <div className="px-4 pb-4 space-y-3">
                          <div className="border-t border-[#b8935a]/20 pt-3">
                            {/* Grille tarifs */}
                            <div className="grid grid-cols-3 gap-2 mb-3">
                              {[
                                { dist: '0-5 km', price: '6€' },
                                { dist: '5-10 km', price: '8€' },
                                { dist: '10-15 km', price: '13€' },
                                { dist: '15-35 km', price: '18€' },
                              ].map(t => (
                                <div key={t.dist} className="text-center py-2 bg-white border border-[#e8e0d8]/50">
                                  <p className="text-[10px] text-[#2d2a26]/40 uppercase tracking-wider">{t.dist}</p>
                                  <p className="text-sm text-[#2d2a26] font-medium mt-0.5">{t.price}</p>
                                </div>
                              ))}
                            </div>
                            {localDeliveryValidated && subtotal >= 60 && (
                            <p className="text-[10px] text-[#b8935a] mb-3">Livraison offerte — votre commande dépasse 60€</p>
                            )}
                            {/* Recherche ville */}
                            <p className="text-[10px] uppercase tracking-[0.1em] text-[#2d2a26]/30 mb-2">Vérifier votre ville</p>
                            <DeliveryCalculator
                              onDeliveryChange={(fee, _time, type) => {
                                setLocalDeliveryFee(fee);
                                setLocalDeliveryValidated(true);
                                setLocalDeliveryUnsupported(type === 'national');
                              }}
                              showMap={false}
                              className="text-sm"
                            />
                            {localDeliveryUnsupported && (
                              <p className="mt-3 text-[10px] text-red-500">
                                Cette adresse est hors zone locale. Choisis Chronopost pour une expédition nationale.
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Chronopost */}
                    <div className={`border transition-all ${
                      hasDeuil ? 'opacity-40 cursor-not-allowed border-[#e8e0d8]' :
                      deliveryMode === 'chronopost' 
                        ? 'border-[#D4003C]/40 bg-[#D4003C]/5' 
                        : 'border-[#e8e0d8] hover:border-[#D4003C]/30'
                    }`}>
                      <button
                        onClick={() => {
                          if (hasDeuil) return;
                          setDeliveryMode('chronopost');
                          if (!isSelectableDeliveryDate('chronopost', selectedDate)) {
                            setSelectedDate(chronopostEarliestDate);
                          }
                        }}
                        disabled={hasDeuil}
                        className="w-full text-left p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${
                            deliveryMode === 'chronopost' ? 'border-[#D4003C]' : 'border-[#e8e0d8]'
                          }`}>
                            {deliveryMode === 'chronopost' && <div className="w-2 h-2 rounded-full bg-[#D4003C]" />}
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-semibold tracking-wide" style={{ color: '#D4003C' }}>CHRONOPOST</span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded-sm text-white" style={{ backgroundColor: '#D4003C' }}>Express 24h</span>
                              </div>
                              <p className="text-sm" style={{ color: '#D4003C' }}>{subtotal >= 90 ? 'Offerte' : '18,90€'}</p>
                            </div>
                            <p className="text-xs text-[#2d2a26]/40 mt-1 leading-relaxed">
                              Expédition du lundi au jeudi · Livraison indicative en 24h ouvrées
                            </p>
                            {hasDeuil && (
                              <p className="text-[10px] text-red-400 mt-1">Les compositions de deuil sont livrées localement uniquement.</p>
                            )}
                          </div>
                        </div>
                      </button>
                      {deliveryMode === 'chronopost' && (
                        <div className="px-4 pb-4">
                          <div className="border-t border-[#D4003C]/20 pt-3">
                            <div className="flex items-center justify-between py-3 px-4 bg-white border border-[#e8e0d8]/50">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 flex items-center justify-center text-white" style={{ backgroundColor: '#D4003C' }}>
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold tracking-wide" style={{ color: '#D4003C' }}>CHRONOPOST</p>
                                  <p className="text-[10px] text-[#2d2a26]/40">Départ du lundi au jeudi · Hors week-end</p>
                                </div>
                              </div>
                              <p className="text-sm text-[#2d2a26] font-medium">{subtotal >= 90 ? <span style={{ color: '#D4003C' }}>Offerte</span> : '18,90€'}</p>
                            </div>
                            {subtotal >= 90 && (
                              <p className="text-[10px] mt-2" style={{ color: '#D4003C' }}>Livraison offerte — votre commande dépasse 90€</p>
                            )}
                            <p className="mt-2 text-[10px] text-[#2d2a26]/45">
                              Délais indicatifs sous réserve des aléas transporteur, grèves et intempéries.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ——— DATE PICKER ——— */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#b8935a] mb-3">Date de livraison souhaitée</p>
                  
                  {/* Estimation automatique */}
                  {deliveryMode && !selectedDate && (() => {
                    const estimatedDate = getEarliestDeliveryDate(deliveryMode);
                    const est = new Date(`${estimatedDate}T12:00:00`);
                    return (
                      <div className="flex items-center gap-2 p-3 bg-[#faf8f5] border border-[#e8e0d8]/50 mb-3">
                        <svg className="w-4 h-4 text-[#b8935a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs text-[#2d2a26]/60">
                          Estimation : livraison dès le <span className="text-[#2d2a26] font-medium">{est.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                        </p>
                      </div>
                    );
                  })()}

                  {(() => {
                    const today = new Date();
                    today.setHours(0,0,0,0);
                    
                    const year = calendarMonth.getFullYear();
                    const month = calendarMonth.getMonth();
                    const firstDay = new Date(year, month, 1).getDay();
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    const startDay = firstDay === 0 ? 6 : firstDay - 1;
                    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
                    
                    const canGoPrev = new Date(year, month, 1) > new Date(today.getFullYear(), today.getMonth(), 1);
                    
                    return (
                      <div className="border border-[#e8e0d8] p-3 bg-white/70">
                        <div className="flex items-center justify-between mb-2">
                          <button 
                            onClick={() => canGoPrev && setCalendarMonth(new Date(year, month - 1, 1))}
                            className={`p-1 transition-colors ${canGoPrev ? 'text-[#2d2a26]/40 hover:text-[#b8935a]' : 'text-[#2d2a26]/10 cursor-not-allowed'}`}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                          </button>
                          <span className="text-xs text-[#2d2a26] font-serif">{monthNames[month]} {year}</span>
                          <button 
                            onClick={() => setCalendarMonth(new Date(year, month + 1, 1))}
                            className="p-1 text-[#2d2a26]/40 hover:text-[#b8935a] transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          </button>
                        </div>
                        <div className="mb-3 min-h-[40px] rounded-md border border-[#eadfce] bg-[#fcf8f2] px-3 py-2">
                          {selectedDate ? (
                            <div className="flex items-center gap-2">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#b8935a] text-white">
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                              </span>
                              <p className="text-[11px] text-[#2d2a26]">
                                Livraison le <span className="font-medium">{new Date(selectedDate + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                                <span className="text-[#2d2a26]/40"> · {deliveryMode === 'chronopost' ? 'Chronopost' : 'Livraison locale'}</span>
                              </p>
                            </div>
                          ) : (
                            <p className="text-[11px] text-[#2d2a26]/45">
                              Choisis une date disponible pour confirmer la livraison.
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-7 mb-0.5">
                          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                            <div key={i} className="text-center text-[8px] text-[#2d2a26]/25 uppercase py-1">{d}</div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {Array.from({ length: startDay }, (_, i) => <div key={`e-${i}`} />)}
                          {Array.from({ length: daysInMonth }, (_, i) => {
                            const day = i + 1;
                            const date = new Date(year, month, day);
                            const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                            const isPast = date < today;
                            const isDisabled = !deliveryMode
                              ? isPast
                              : !isSelectableDeliveryDate(deliveryMode, dateStr);
                            const isSelected = selectedDate === dateStr;
                            const isToday = date.getTime() === today.getTime();
                            
                            return (
                              <button
                                key={day}
                                disabled={isDisabled}
                                onClick={() => setSelectedDate(dateStr)}
                                className={`relative aspect-square flex items-center justify-center text-[11px] transition-all rounded-md border
                                  ${isDisabled
                                    ? 'border-transparent bg-[#faf8f5] text-[#2d2a26]/18 cursor-not-allowed'
                                    : isSelected
                                      ? 'border-[#b8935a] bg-white shadow-[0_10px_24px_rgba(184,147,90,0.16)] ring-1 ring-[#b8935a]/15 cursor-pointer'
                                      : 'border-[#eadfce] bg-white text-[#2d2a26] hover:border-[#b8935a]/60 hover:bg-[#b8935a]/8 cursor-pointer'}
                                  ${isToday && !isSelected ? 'text-[#b8935a] font-semibold border-[#d9c2a0]' : ''}
                                `}
                              >
                                {isSelected && (
                                  <span className="pointer-events-none absolute inset-[6px] rounded-full bg-[#b8935a]" />
                                )}
                                {isSelected && (
                                  <span className="pointer-events-none absolute inset-[2px] rounded-[7px] border border-[#b8935a]/35" />
                                )}
                                <span className={`relative z-10 ${isSelected ? 'text-sm font-semibold text-white' : ''}`}>{day}</span>
                                {!isDisabled && !isSelected && (
                                  <span className={`absolute bottom-1 h-1 w-1 rounded-full ${isToday ? 'bg-[#b8935a]' : 'bg-[#d8c3a3]'}`} />
                                )}
                              </button>
                            );
                          })}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 border-t border-[#e8e0d8]/70 pt-3 text-[10px] uppercase tracking-[0.12em] text-[#2d2a26]/45">
                          <span className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-[#d8c3a3]" />
                            Disponible
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-[#b8935a]" />
                            Aujourd&apos;hui
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full border border-[#c9b08b] bg-[#f7efe5]" />
                            Selectionnee
                          </span>
                          {deliveryMode === 'local' && (
                            <span>Local: 7j/7, jour même avant 12h. Il est actuellement {businessNow.hour}h à Paris.</span>
                          )}
                          {deliveryMode === 'chronopost' && (
                            <span>Chronopost: dates disponibles du mardi au vendredi, départs du lundi au jeudi.</span>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* ——— PROMO CODE ——— */}
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Code promo"
                      className="flex-1 px-3 py-2.5 border border-[#e8e0d8] text-sm text-[#2d2a26] font-light focus:outline-none focus:border-[#b8935a] transition-colors placeholder:text-[#2d2a26]/25"
                    />
                    <button onClick={applyPromoCode} className="bg-[#2d2a26] text-white px-4 py-2.5 text-sm hover:bg-[#2d2a26]/80 transition-colors">
                      OK
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-xs mt-2 text-[#b8935a]">Code {appliedPromo} appliqué (-10%)</p>
                  )}
                </div>

                {/* ——— BREAKDOWN ——— */}
                <div className="space-y-3 pt-2 border-t border-[#e8e0d8]">
                  <div className="flex justify-between text-sm text-[#2d2a26]/70">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-[#b8935a]">
                      <span>Réduction</span>
                      <span>-{discount.toFixed(2)}€</span>
                    </div>
                  )}
                  {activeCardItem && (
                    <div className="flex justify-between text-sm text-[#2d2a26]/70">
                      <span>{activeCardItem.cardId ? 'Carte artisanale' : 'Carte standard'}</span>
                      <span className={activeCardItem.price === 0 ? 'text-[#b8935a]' : ''}>
                        {activeCardItem.price === 0 ? 'Offerte' : `${(activeCardItem.price * activeCardItem.quantity).toFixed(2)}€`}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-[#2d2a26]/70">
                    <span>Livraison {deliveryMode === 'local' ? '(locale)' : deliveryMode === 'chronopost' ? '(Chronopost)' : ''}</span>
                    <span className={deliveryIsFree ? 'text-[#b8935a]' : ''}>
                      {!deliveryMode
                        ? '—'
                        : localDeliveryNeedsValidation
                          ? 'À vérifier'
                          : delivery === 0
                            ? 'Offerte'
                            : `${delivery.toFixed(2)}€`}
                    </span>
                  </div>
                  {deliveryIsFree && (
                    <div className="flex justify-between text-xs text-[#b8935a]">
                      <span>Économie sur la livraison</span>
                      <span>-{deliverySavings.toFixed(2)}€</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-baseline pt-4 border-t border-[#2d2a26]/10">
                  <span className="text-sm uppercase tracking-[0.1em] text-[#2d2a26]/50">Total</span>
                  <span className="text-2xl font-serif text-[#2d2a26]">{total.toFixed(2)}€</span>
                </div>

                {localDeliveryNeedsValidation && (
                  <p className="text-[11px] text-[#2d2a26]/45">
                    Total estimatif hors ajustement éventuel des frais de livraison locale.
                  </p>
                )}

                {deliveryIsFree && (
                  <div className="rounded-sm border border-[#b8935a]/30 bg-[#f8f4ec] px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-[#2d2a26]">Livraison offerte appliquée</p>
                        <p className="text-xs text-[#2d2a26]/45 mt-1">
                          {deliveryMode === 'chronopost' ? 'Chronopost offert dès 90,00€.' : 'Livraison locale offerte dès 60,00€.'}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-[#b8935a]">Économie {deliverySavings.toFixed(2)}€</span>
                    </div>
                  </div>
                )}

                {/* Checkout button */}
                {canCheckout ? (
                  <Link
                    href={`/paiement?mode=${deliveryMode}&date=${selectedDate}`}
                    onClick={() => {
                      const checkoutCartItems = syncCardMessageItem(cartItems, cardType, cardMessage, selectedCardImage);
                      const checkoutCardItem = findCardMessageItem(checkoutCartItems);
                      const checkoutSubtotal = checkoutCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                      const checkoutTotal = checkoutSubtotal - discount + delivery;

                      localStorage.setItem('af-cart', JSON.stringify(checkoutCartItems));
                      localStorage.setItem('af-checkout-cart', JSON.stringify(checkoutCartItems));
                      localStorage.setItem('af-checkout-delivery', JSON.stringify({
                        mode: deliveryMode,
                        date: selectedDate,
                        fee: delivery,
                        discount,
                        subtotal: checkoutSubtotal,
                        total: checkoutTotal,
                        promoCode: appliedPromo || undefined,
                        details: getDeliveryModeDetails(deliveryMode),
                        card: {
                          type: checkoutCardItem?.cardId ? 'artisanal' : checkoutCardItem ? 'standard' : 'none',
                          message: checkoutCardItem?.message || '',
                          selectedCardImage: checkoutCardItem?.cardId || undefined,
                          supplement: checkoutCardItem ? checkoutCardItem.price * checkoutCardItem.quantity : 0,
                        } satisfies CheckoutCardInfo,
                      }));
                    }}
                    className="block w-full py-3.5 text-sm uppercase tracking-[0.1em] transition-all bg-[#b8935a] text-white hover:bg-[#b8956a] text-center"
                  >
                    Procéder au paiement
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-3.5 text-sm uppercase tracking-[0.1em] bg-[#e8e0d8] text-[#2d2a26]/30 cursor-not-allowed"
                  >
                    {!deliveryMode
                      ? 'Choisissez un mode de livraison'
                      : deliveryMode === 'local' && !localDeliveryValidated
                        ? 'Vérifiez votre ville pour la livraison locale'
                        : deliveryMode === 'local' && localDeliveryUnsupported
                          ? 'Adresse hors zone locale'
                          : 'Choisissez une date disponible'}
                  </button>
                )}

                {/* Trust badges */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z', text: 'Paiement sécurisé' },
                    { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Fraîcheur 7 jours' },
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-[#b8935a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
                      </svg>
                      <span className="text-[10px] text-[#2d2a26]/40">{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
