'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DeliveryCalculator from '@/components/ui/DeliveryCalculator';

const initialCartItems = [
  {
    id: '1',
    name: 'Le Jullouvillais',
    size: 'Grand',
    price: 59.90,
    quantity: 1,
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Jullouvillais_48dce71f-18c7-4c3b-9aa1-9e23e6e62f9c.png?v=1684428619',
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

type DeliveryMode = 'local' | 'national' | null;

export default function Panier() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [selectedCardDesign, setSelectedCardDesign] = useState<string | null>(null);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>(null);
  const [localDeliveryFee, setLocalDeliveryFee] = useState(0);
  const [localDeliveryCity, setLocalDeliveryCity] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) { removeItem(id); return; }
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'bienvenue10') setAppliedPromo('BIENVENUE10');
    setPromoCode('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  
  const getDeliveryFee = () => {
    if (!deliveryMode) return 0;
    if (subtotal >= 60) return 0;
    return deliveryMode === 'local' ? localDeliveryFee : 17.90;
  };
  
  const delivery = getDeliveryFee();
  const total = subtotal - discount + delivery;
  const freeDeliveryRemaining = subtotal < 60 ? (60 - subtotal) : 0;

  const hasDeuil = cartItems.some(item => item.category === 'Deuil & Hommages');

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="bg-[#faf8f5] min-h-screen pt-20">
          <div className="container mx-auto px-4 md:px-8 py-20 md:py-32">
            <div className="max-w-md mx-auto text-center">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">Panier</div>
              <h1 className="text-3xl md:text-5xl font-serif text-[#2d2a26] mb-6">Votre Panier est Vide</h1>
              <div className="w-12 h-px bg-[#c4a47a] mx-auto mb-6"></div>
              <p className="text-[#2d2a26] font-light mb-10 leading-relaxed">
                Découvrez nos créations florales artisanales.
              </p>
              <Link href="/boutique" className="inline-block bg-[#c4a47a] text-white px-8 py-3.5 text-sm uppercase tracking-[0.1em] hover:bg-[#b8956a] transition-colors">
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
            <Link href="/boutique" className="text-[#c4a47a] hover:text-[#b8956a] transition-colors">Boutique</Link>
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
          {freeDeliveryRemaining > 0 && (
            <div className="bg-white p-4 mb-6 border border-[#e8e0d8]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-[#2d2a26] font-light">
                  Plus que <span className="text-[#c4a47a] font-medium">{freeDeliveryRemaining.toFixed(2)}€</span> pour la livraison gratuite
                </p>
                <svg className="w-4 h-4 text-[#c4a47a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <div className="w-full h-1.5 bg-[#e8e0d8] rounded-full overflow-hidden">
                <div className="h-full bg-[#c4a47a] rounded-full transition-all duration-500" style={{ width: `${Math.min((subtotal / 60) * 100, 100)}%` }} />
              </div>
            </div>
          )}

          {subtotal >= 60 && (
            <div className="flex items-center gap-2 bg-white p-4 mb-6 border border-[#c4a47a]/30">
              <svg className="w-4 h-4 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <p className="text-sm text-[#c4a47a]">Livraison gratuite appliquée</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left column */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Cart Items */}
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-4 md:p-6 border border-[#e8e0d8]/50">
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 bg-[#faf8f5] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-grow min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.15em] text-[#c4a47a] mb-1">{item.category}</p>
                            <h3 className="text-base md:text-lg font-serif text-[#2d2a26] leading-tight">{item.name}</h3>
                            <p className="text-xs text-[#2d2a26]/40 mt-0.5">Taille : {item.size}</p>
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
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-full flex items-center justify-center text-[#2d2a26]/50 hover:text-[#c4a47a] transition-colors text-sm">−</button>
                          <span className="w-8 text-center text-sm text-[#2d2a26]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-full flex items-center justify-center text-[#2d2a26]/50 hover:text-[#c4a47a] transition-colors text-sm">+</button>
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
              {freeDeliveryRemaining > 0 && freeDeliveryRemaining < 30 && (
                <div className="pt-2">
                  <p className="text-xs text-[#2d2a26]/40 mb-3 uppercase tracking-[0.1em]">Complétez votre commande</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { name: 'Bougie parfumée', price: 12.90, image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Fleur de coton' },
                      { name: 'Vase céramique', price: 19.90, image: 'https://images.pexels.com/photos/4207891/pexels-photo-4207891.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Fait main' },
                      { name: 'Chocolats belges', price: 14.90, image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Coffret 12 pièces' },
                      { name: 'Graines sauvages', price: 8.90, image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=300', desc: 'Fleurs à semer' },
                    ].map((item) => (
                      <button key={item.name} className="bg-white border border-[#e8e0d8] p-2.5 text-left hover:border-[#c4a47a] transition-all group">
                        <img src={item.image} alt={item.name} className="w-full aspect-square object-cover mb-2" />
                        <p className="text-xs text-[#2d2a26] leading-tight">{item.name}</p>
                        <p className="text-xs text-[#c4a47a] mt-1">{item.price.toFixed(2)}€</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Card Message */}
              <div className="bg-white p-4 md:p-6 border border-[#e8e0d8]/50">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <h3 className="text-sm font-serif text-[#2d2a26]">Carte message offerte</h3>
                </div>
                
                {/* Card designs */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { id: 'floral', label: 'Florale', color: '#f5e6e0' },
                    { id: 'minimal', label: 'Élégante', color: '#f0ebe6' },
                    { id: 'festive', label: 'Festive', color: '#e8e0d8' },
                  ].map((card) => (
                    <button
                      key={card.id}
                      onClick={() => setSelectedCardDesign(selectedCardDesign === card.id ? null : card.id)}
                      className={`p-2 border transition-all text-center ${
                        selectedCardDesign === card.id ? 'border-[#c4a47a]' : 'border-[#e8e0d8] hover:border-[#c4a47a]/50'
                      }`}
                    >
                      <div className="w-full aspect-[4/3] mb-1.5" style={{ backgroundColor: card.color }} />
                      <p className="text-[10px] text-[#2d2a26]/60">{card.label}</p>
                    </button>
                  ))}
                </div>

                <textarea
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  placeholder="Votre message personnel (optionnel)..."
                  rows={3}
                  maxLength={200}
                  className="w-full px-3 py-2.5 border border-[#e8e0d8] text-sm text-[#2d2a26] font-light focus:outline-none focus:border-[#c4a47a] transition-colors resize-none placeholder:text-[#2d2a26]/25"
                />
                <p className="text-[10px] text-right mt-1 text-[#2d2a26]/30">{cardMessage.length}/200</p>
              </div>

              {/* Continue shopping */}
              <div className="text-center pt-4">
                <Link href="/boutique" className="text-sm text-[#c4a47a] hover:text-[#b8956a] transition-colors">
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
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#c4a47a] mb-3">Mode de livraison</p>
                  
                  <div className="space-y-2">
                    {/* Local */}
                    <div className={`border transition-all ${
                      deliveryMode === 'local' 
                        ? 'border-[#c4a47a] bg-[#c4a47a]/5' 
                        : 'border-[#e8e0d8] hover:border-[#c4a47a]/50'
                    }`}>
                      <button
                        onClick={() => setDeliveryMode('local')}
                        className="w-full text-left p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${
                            deliveryMode === 'local' ? 'border-[#c4a47a]' : 'border-[#e8e0d8]'
                          }`}>
                            {deliveryMode === 'local' && <div className="w-2 h-2 rounded-full bg-[#c4a47a]" />}
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-[#2d2a26] font-medium">Livraison locale</p>
                              <p className="text-sm text-[#c4a47a]">{subtotal >= 60 ? 'Offerte' : 'Dès 6€'}</p>
                            </div>
                            <p className="text-xs text-[#2d2a26]/40 mt-1 leading-relaxed">
                              Livrée à la main · Rayon 35 km · Sous 24h
                            </p>
                          </div>
                        </div>
                      </button>
                      
                      {/* Tarifs locaux + calculateur */}
                      {deliveryMode === 'local' && (
                        <div className="px-4 pb-4 space-y-3">
                          <div className="border-t border-[#c4a47a]/20 pt-3">
                            {/* Grille tarifs */}
                            <div className="grid grid-cols-3 gap-2 mb-3">
                              {[
                                { dist: '0-5 km', price: '6€' },
                                { dist: '5-10 km', price: '8€' },
                                { dist: '10-35 km', price: '10€' },
                              ].map(t => (
                                <div key={t.dist} className="text-center py-2 bg-white border border-[#e8e0d8]/50">
                                  <p className="text-[10px] text-[#2d2a26]/40 uppercase tracking-wider">{t.dist}</p>
                                  <p className="text-sm text-[#2d2a26] font-medium mt-0.5">{t.price}</p>
                                </div>
                              ))}
                            </div>
                            {subtotal >= 60 && (
                              <p className="text-[10px] text-[#c4a47a] mb-3">Livraison offerte — votre commande dépasse 60€</p>
                            )}
                            {/* Recherche ville */}
                            <p className="text-[10px] uppercase tracking-[0.1em] text-[#2d2a26]/30 mb-2">Vérifier votre ville</p>
                            <DeliveryCalculator
                              onDeliveryChange={(fee, _time, _type) => {
                                setLocalDeliveryFee(fee);
                                setLocalDeliveryCity('confirmed');
                              }}
                              showMap={false}
                              className="text-sm"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* National */}
                    <div className={`border transition-all ${
                      hasDeuil ? 'opacity-40 cursor-not-allowed border-[#e8e0d8]' :
                      deliveryMode === 'national' 
                        ? 'border-[#c4a47a] bg-[#c4a47a]/5' 
                        : 'border-[#e8e0d8] hover:border-[#c4a47a]/50'
                    }`}>
                      <button
                        onClick={() => !hasDeuil && setDeliveryMode('national')}
                        disabled={hasDeuil}
                        className="w-full text-left p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center ${
                            deliveryMode === 'national' ? 'border-[#c4a47a]' : 'border-[#e8e0d8]'
                          }`}>
                            {deliveryMode === 'national' && <div className="w-2 h-2 rounded-full bg-[#c4a47a]" />}
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-[#2d2a26] font-medium">Livraison en France</p>
                              <p className="text-sm text-[#c4a47a]">{subtotal >= 60 ? 'Offerte' : '17.90€'}</p>
                            </div>
                            <p className="text-xs text-[#2d2a26]/40 mt-1 leading-relaxed">
                              Colissimo · France métropolitaine · 48h
                            </p>
                            {hasDeuil && (
                              <p className="text-[10px] text-red-400 mt-1">Les compositions de deuil sont livrées localement uniquement.</p>
                            )}
                          </div>
                        </div>
                      </button>
                      {deliveryMode === 'national' && (
                        <div className="px-4 pb-4">
                          <div className="border-t border-[#c4a47a]/20 pt-3">
                            <div className="text-center py-2 bg-white border border-[#e8e0d8]/50">
                              <p className="text-[10px] text-[#2d2a26]/40 uppercase tracking-wider">Tarif unique</p>
                              <p className="text-sm text-[#2d2a26] font-medium mt-0.5">{subtotal >= 60 ? <span className="text-[#c4a47a]">Offerte</span> : '17.90€'}</p>
                            </div>
                            {subtotal >= 60 && (
                              <p className="text-[10px] text-[#c4a47a] mt-2">Livraison offerte — votre commande dépasse 60€</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ——— DATE PICKER ——— */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#c4a47a] mb-3">Date de livraison souhaitée</p>
                  
                  {/* Estimation automatique */}
                  {deliveryMode && !selectedDate && (() => {
                    const est = new Date();
                    est.setDate(est.getDate() + (deliveryMode === 'national' ? 2 : 1));
                    if (est.getDay() === 0) est.setDate(est.getDate() + 1); // skip dimanche
                    return (
                      <div className="flex items-center gap-2 p-3 bg-[#faf8f5] border border-[#e8e0d8]/50 mb-3">
                        <svg className="w-4 h-4 text-[#c4a47a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
                    const minDate = new Date(today);
                    minDate.setDate(minDate.getDate() + (deliveryMode === 'national' ? 2 : 1));
                    
                    const year = calendarMonth.getFullYear();
                    const month = calendarMonth.getMonth();
                    const firstDay = new Date(year, month, 1).getDay();
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    const startDay = firstDay === 0 ? 6 : firstDay - 1;
                    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
                    
                    const canGoPrev = new Date(year, month, 1) > new Date(today.getFullYear(), today.getMonth(), 1);
                    
                    return (
                      <div className="border border-[#e8e0d8] p-3">
                        <div className="flex items-center justify-between mb-2">
                          <button 
                            onClick={() => canGoPrev && setCalendarMonth(new Date(year, month - 1, 1))}
                            className={`p-1 transition-colors ${canGoPrev ? 'text-[#2d2a26]/40 hover:text-[#c4a47a]' : 'text-[#2d2a26]/10 cursor-not-allowed'}`}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                          </button>
                          <span className="text-xs text-[#2d2a26] font-serif">{monthNames[month]} {year}</span>
                          <button 
                            onClick={() => setCalendarMonth(new Date(year, month + 1, 1))}
                            className="p-1 text-[#2d2a26]/40 hover:text-[#c4a47a] transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          </button>
                        </div>
                        <div className="grid grid-cols-7 mb-0.5">
                          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                            <div key={i} className="text-center text-[8px] text-[#2d2a26]/25 uppercase py-1">{d}</div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-px">
                          {Array.from({ length: startDay }, (_, i) => <div key={`e-${i}`} />)}
                          {Array.from({ length: daysInMonth }, (_, i) => {
                            const day = i + 1;
                            const date = new Date(year, month, day);
                            const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                            const isSunday = date.getDay() === 0;
                            const isPast = date < minDate;
                            const isDisabled = isSunday || isPast;
                            const isSelected = selectedDate === dateStr;
                            const isToday = date.getTime() === today.getTime();
                            
                            return (
                              <button
                                key={day}
                                disabled={isDisabled}
                                onClick={() => setSelectedDate(isSelected ? '' : dateStr)}
                                className={`aspect-square flex items-center justify-center text-[11px] transition-all rounded-sm
                                  ${isDisabled ? 'text-[#2d2a26]/12' : 'hover:bg-[#c4a47a]/10 cursor-pointer'}
                                  ${isSelected ? 'bg-[#c4a47a] text-white rounded-sm' : 'text-[#2d2a26]/60'}
                                  ${isToday && !isSelected ? 'text-[#c4a47a] font-medium' : ''}
                                `}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                        {selectedDate && (
                          <div className="mt-2 pt-2 border-t border-[#e8e0d8]/50 flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-[#c4a47a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <p className="text-[11px] text-[#2d2a26]">
                              Livraison le <span className="font-medium">{new Date(selectedDate + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                              <span className="text-[#2d2a26]/40"> · {deliveryMode === 'local' ? 'Sous 24h' : 'Sous 48h'}</span>
                            </p>
                          </div>
                        )}
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
                      className="flex-1 px-3 py-2.5 border border-[#e8e0d8] text-sm text-[#2d2a26] font-light focus:outline-none focus:border-[#c4a47a] transition-colors placeholder:text-[#2d2a26]/25"
                    />
                    <button onClick={applyPromoCode} className="bg-[#2d2a26] text-white px-4 py-2.5 text-sm hover:bg-[#2d2a26]/80 transition-colors">
                      OK
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-xs mt-2 text-[#c4a47a]">Code {appliedPromo} appliqué (-10%)</p>
                  )}
                </div>

                {/* ——— BREAKDOWN ——— */}
                <div className="space-y-3 pt-2 border-t border-[#e8e0d8]">
                  <div className="flex justify-between text-sm text-[#2d2a26]/70">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-[#c4a47a]">
                      <span>Réduction</span>
                      <span>-{discount.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-[#2d2a26]/70">
                    <span>Livraison {deliveryMode === 'local' ? '(locale)' : deliveryMode === 'national' ? '(France)' : ''}</span>
                    <span className={delivery === 0 && deliveryMode ? 'text-[#c4a47a]' : ''}>
                      {!deliveryMode ? '—' : delivery === 0 ? 'Offerte' : `${delivery.toFixed(2)}€`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-4 border-t border-[#2d2a26]/10">
                  <span className="text-sm uppercase tracking-[0.1em] text-[#2d2a26]/50">Total</span>
                  <span className="text-2xl font-serif text-[#2d2a26]">{total.toFixed(2)}€</span>
                </div>

                {/* Checkout button */}
                <button 
                  disabled={!deliveryMode || !selectedDate}
                  className={`w-full py-3.5 text-sm uppercase tracking-[0.1em] transition-all ${
                    deliveryMode && selectedDate
                      ? 'bg-[#c4a47a] text-white hover:bg-[#b8956a]'
                      : 'bg-[#e8e0d8] text-[#2d2a26]/30 cursor-not-allowed'
                  }`}
                >
                  {!deliveryMode ? 'Choisissez un mode de livraison' : !selectedDate ? 'Choisissez une date' : 'Procéder au paiement'}
                </button>

                {/* Trust badges */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z', text: 'Paiement sécurisé' },
                    { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Fraîcheur 7 jours' },
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-[#c4a47a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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