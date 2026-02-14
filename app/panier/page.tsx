'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DeliveryCalculator from '@/components/ui/DeliveryCalculator';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight, Gift, Truck, Shield, Clock } from 'lucide-react';

const initialCartItems = [
  {
    id: '1',
    name: 'Le Jullouvillais',
    size: 'Grand',
    price: 59.90,
    quantity: 1,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_35.png?v=1706808037',
    category: 'Bouquets'
  },
  {
    id: '2',
    name: 'Barneville-Carteret',
    size: 'Très grand',
    price: 99.90,
    quantity: 2,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/1_2c1fb84c-0074-4dce-9d4b-7161370a1a30.png?v=1684428619',
    category: 'Bouquets'
  }
];

export default function Panier() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(8.90);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryType, setDeliveryType] = useState<'local' | 'regional' | 'national'>('local');

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) { removeItem(id); return; }
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') setAppliedPromo('WELCOME10');
    setPromoCode('');
  };

  const handleDeliveryChange = (fee: number, time: string, type: 'local' | 'regional' | 'national') => {
    setDeliveryFee(fee);
    setDeliveryTime(time);
    setDeliveryType(type);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const delivery = subtotal >= 50 ? 0 : deliveryFee; // Use calculated delivery fee
  const total = subtotal - discount + delivery;
  const freeDeliveryRemaining = subtotal < 50 ? (50 - subtotal) : 0;

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-20" style={{ backgroundColor: '#faf8f5' }}>
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#f5f0eb' }}>
              <ShoppingBag size={36} style={{ color: '#b8956a' }} />
            </div>
            <h1 className="font-serif text-3xl mb-4" style={{ color: '#2d2a26' }}>Votre panier est vide</h1>
            <p className="mb-8" style={{ color: '#9a9490' }}>
              Découvrez nos magnifiques créations florales et composez votre bouquet idéal.
            </p>
            <Link href="/boutique" className="inline-flex items-center gap-2 px-8 py-3.5 text-white text-sm font-semibold tracking-wider uppercase transition-colors" style={{ backgroundColor: '#b8956a' }}>
              <span>Découvrir la boutique</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-8 md:py-12" style={{ backgroundColor: '#faf8f5' }}>
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link href="/boutique" className="hover:underline" style={{ color: '#b8956a' }}>Boutique</Link>
            <span style={{ color: '#ccc' }}>/</span>
            <span style={{ color: '#6b6560' }}>Votre panier</span>
          </div>

          {/* Title */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl" style={{ color: '#2d2a26' }}>Votre Panier</h1>
              <p className="mt-1" style={{ color: '#9a9490' }}>{cartItems.length} article{cartItems.length > 1 ? 's' : ''}</p>
            </div>
            <Link href="/boutique" className="hidden md:flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: '#b8956a' }}>
              <ArrowLeft size={14} />
              Continuer les achats
            </Link>
          </div>

          {/* Free delivery progress */}
          {freeDeliveryRemaining > 0 && (
            <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#f5f0eb', border: '1px solid #e8e0d8' }}>
              <div className="flex items-center gap-2 mb-2">
                <Truck size={16} style={{ color: '#b8956a' }} />
                <span className="text-sm font-medium" style={{ color: '#2d2a26' }}>
                  Plus que <strong>{freeDeliveryRemaining.toFixed(2)}€</strong> pour la livraison gratuite !
                </span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#e8e0d8' }}>
                <div className="h-2 rounded-full transition-all" style={{ backgroundColor: '#b8956a', width: `${Math.min((subtotal / 50) * 100, 100)}%` }} />
              </div>
            </div>
          )}

          {subtotal >= 50 && (
            <div className="rounded-lg p-4 mb-6 flex items-center gap-2" style={{ backgroundColor: '#f0f7f0', border: '1px solid #c8e6c9' }}>
              <Truck size={16} style={{ color: '#4caf50' }} />
              <span className="text-sm font-medium" style={{ color: '#2e7d32' }}>
                ✓ Livraison gratuite appliquée !
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="rounded-lg p-5 md:p-6" style={{ backgroundColor: '#ffffff', border: '1px solid #e8e0d8' }}>
                  <div className="flex gap-4 md:gap-6">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="rounded-lg object-cover"
                        style={{ width: '100px', height: '100px' }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs tracking-wider uppercase" style={{ color: '#b8956a' }}>{item.category}</span>
                          <h3 className="font-serif text-lg md:text-xl mt-0.5" style={{ color: '#2d2a26' }}>{item.name}</h3>
                          <p className="text-sm mt-0.5" style={{ color: '#9a9490' }}>Taille : {item.size}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="p-2 rounded-lg transition-colors hover:bg-red-50" style={{ color: '#9a9490' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center rounded-full" style={{ border: '1px solid #e8e0d8' }}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center rounded-l-full transition-colors" style={{ color: '#2d2a26' }}>
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold" style={{ color: '#2d2a26' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center rounded-r-full transition-colors" style={{ color: '#2d2a26' }}>
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        {/* Price */}
                        <p className="font-semibold text-lg" style={{ color: '#b8956a' }}>
                          {(item.price * item.quantity).toFixed(2)}€
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Card Message */}
              <div className="rounded-lg p-5 md:p-6" style={{ backgroundColor: '#ffffff', border: '1px solid #e8e0d8' }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💌</span>
                  <div>
                    <h3 className="font-serif text-lg" style={{ color: '#2d2a26' }}>Carte message personnalisée</h3>
                    <p className="text-sm" style={{ color: '#9a9490' }}>Gratuit — votre message sera imprimé et livré avec le bouquet</p>
                  </div>
                </div>
                <textarea
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  placeholder="Écrivez votre message ici... (ex: Joyeux anniversaire maman ! Avec tout mon amour.)"
                  rows={3}
                  maxLength={200}
                  className="w-full px-4 py-3 rounded-lg text-sm resize-none focus:outline-none focus:ring-2"
                  style={{ backgroundColor: '#faf8f5', border: '1px solid #e8e0d8', color: '#2d2a26' }}
                />
                <p className="text-xs text-right mt-1" style={{ color: '#9a9490' }}>{cardMessage.length}/200</p>
              </div>

              {/* Mobile: Continue shopping */}
              <div className="md:hidden">
                <Link href="/boutique" className="flex items-center gap-2 text-sm font-medium" style={{ color: '#b8956a' }}>
                  <ArrowLeft size={14} />
                  Continuer les achats
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-lg p-6 sticky top-24" style={{ backgroundColor: '#ffffff', border: '1px solid #e8e0d8' }}>
                <h2 className="font-serif text-xl mb-6" style={{ color: '#2d2a26' }}>Résumé</h2>

                {/* Delivery Calculator */}
                <div className="mb-6">
                  <h3 className="font-medium text-[#2d2a26] mb-3 text-sm uppercase tracking-wider">
                    Calculer la livraison
                  </h3>
                  <DeliveryCalculator 
                    onDeliveryChange={handleDeliveryChange}
                    showMap={false}
                    className="text-sm"
                  />
                  {deliveryTime && (
                    <div className="mt-3 p-3 bg-[#faf8f5] rounded-lg border border-[#e8e0d8]">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#6b6560]">Délai estimé :</span>
                        <span className="font-medium text-[#b8956a]">{deliveryTime}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Code promo"
                      className="flex-1 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2"
                      style={{ backgroundColor: '#faf8f5', border: '1px solid #e8e0d8', color: '#2d2a26' }}
                    />
                    <button onClick={applyPromoCode} className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-colors" style={{ backgroundColor: '#b8956a' }}>
                      OK
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-sm mt-2" style={{ color: '#4caf50' }}>✓ Code {appliedPromo} appliqué (-10%)</p>
                  )}
                </div>

                {/* Breakdown */}
                <div className="space-y-3 mb-6 pb-6" style={{ borderBottom: '1px solid #e8e0d8' }}>
                  <div className="flex justify-between text-sm" style={{ color: '#6b6560' }}>
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm" style={{ color: '#4caf50' }}>
                      <span>Réduction</span>
                      <span>-{discount.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm" style={{ color: '#6b6560' }}>
                    <div className="flex flex-col">
                      <span>Livraison</span>
                      {deliveryTime && (
                        <span className="text-xs text-[#9a9490]">
                          Zone {deliveryType === 'local' ? 'locale' : deliveryType === 'regional' ? 'régionale' : 'nationale'}
                        </span>
                      )}
                    </div>
                    <span style={{ color: delivery === 0 ? '#4caf50' : '#6b6560' }}>
                      {delivery === 0 ? 'Gratuit' : `${delivery.toFixed(2)}€`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-lg font-semibold" style={{ color: '#2d2a26' }}>Total</span>
                  <span className="text-xl font-bold" style={{ color: '#2d2a26' }}>{total.toFixed(2)}€</span>
                </div>

                {/* Checkout */}
                <button className="w-full py-4 rounded-lg text-white font-semibold text-sm tracking-wider uppercase transition-colors" style={{ backgroundColor: '#b8956a' }}>
                  Procéder au paiement
                </button>

                {/* Trust */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs" style={{ color: '#9a9490' }}>
                    <Shield size={14} style={{ color: '#b8956a' }} />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: '#9a9490' }}>
                    <Truck size={14} style={{ color: '#b8956a' }} />
                    <span>Livraison partout en France</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: '#9a9490' }}>
                    <Clock size={14} style={{ color: '#b8956a' }} />
                    <span>Fraîcheur garantie 72h</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: '#9a9490' }}>
                    <Gift size={14} style={{ color: '#b8956a' }} />
                    <span>Emballage cadeau offert</span>
                  </div>
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
