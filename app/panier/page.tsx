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
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=85',
    category: 'Bouquets'
  },
  {
    id: '2',
    name: 'Barneville-Carteret',
    size: 'Très grand',
    price: 99.90,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400&q=85',
    category: 'Bouquets'
  }
];

export default function Panier() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [selectedCardDesign, setSelectedCardDesign] = useState<string | null>(null);
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
  const delivery = subtotal >= 50 ? 0 : deliveryFee;
  const total = subtotal - discount + delivery;
  
  const freeDeliveryRemaining = subtotal < 50 ? (50 - subtotal) : 0;

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="bg-[#faf8f5] min-h-screen pt-20">
          <div className="container mx-auto px-6 lg:px-8 py-24 md:py-32">
            <div className="max-w-md mx-auto text-center">
              
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-8">
                Panier
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-8">
                Votre Panier est Vide
              </h1>
              
              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light mb-12 leading-relaxed">
                Découvrez nos magnifiques créations florales et composez votre bouquet idéal.
              </p>
              
              <Link 
                href="/boutique" 
                className="bg-[#c4a47a] text-white px-8 py-4 hover:bg-[#b8956a] transition-colors duration-300"
              >
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
        <div className="container mx-auto px-6 lg:px-8 py-24 md:py-32">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <Link href="/boutique" className="text-[#c4a47a] hover:text-[#b8956a] transition-colors">Boutique</Link>
            <span className="text-[#c4a47a]">/</span>
            <span className="text-[#2d2a26] font-light">Votre panier</span>
          </div>

          {/* Title */}
          <div className="text-center mb-16">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
              Panier
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif text-[#2d2a26] mb-4">
              Votre Sélection
            </h1>
            
            <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-6"></div>
            
            <p className="text-[#2d2a26] font-light">
              {cartItems.length} article{cartItems.length > 1 ? 's' : ''} sélectionné{cartItems.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Free delivery progress */}
          {freeDeliveryRemaining > 0 && (
            <div className="bg-white p-6 mb-8 border border-[#c4a47a]/20 text-center">
              <p className="text-[#2d2a26] font-light mb-4">
                Plus que <span className="font-serif text-[#c4a47a]">{freeDeliveryRemaining.toFixed(2)}€</span> pour la livraison gratuite
              </p>
              <div className="w-full h-2 bg-[#e8e0d8]">
                <div 
                  className="h-2 bg-[#c4a47a] transition-all duration-300"
                  style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}

          {subtotal >= 50 && (
            <div className="bg-white p-6 mb-8 border border-[#c4a47a]/20 text-center">
              <p className="text-[#c4a47a] font-light">
                ✓ Livraison gratuite appliquée
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-8">
                  <div className="flex gap-6">
                    
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={120}
                        height={120}
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-2">
                            {item.category}
                          </div>
                          <h3 className="text-xl font-serif text-[#2d2a26] mb-2">{item.name}</h3>
                          <p className="text-[#2d2a26] font-light text-sm">Taille : {item.size}</p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)} 
                          className="text-[#2d2a26] hover:text-[#c4a47a] transition-colors p-2"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center border border-[#e8e0d8]">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                            className="w-10 h-10 flex items-center justify-center text-[#2d2a26] hover:text-[#c4a47a] transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-12 text-center text-[#2d2a26] font-light">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                            className="w-10 h-10 flex items-center justify-center text-[#2d2a26] hover:text-[#c4a47a] transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Price */}
                        <p className="text-xl font-serif text-[#c4a47a]">
                          {(item.price * item.quantity).toFixed(2)}€
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Card Message */}
              <div className="bg-white p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-serif text-[#2d2a26] mb-2">Carte Message Personnalisée</h3>
                  <p className="text-[#2d2a26] font-light text-sm">Gratuit — votre message sera imprimé et livré avec le bouquet</p>
                </div>
                <textarea
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  placeholder="Écrivez votre message ici..."
                  rows={4}
                  maxLength={200}
                  className="w-full px-4 py-3 border border-[#e8e0d8] text-[#2d2a26] font-light focus:outline-none focus:border-[#c4a47a] transition-colors resize-none"
                />
                <p className="text-xs text-right mt-2 text-[#2d2a26] font-light">
                  {cardMessage.length}/200
                </p>
              </div>

              {/* Choix de la carte message */}
              <div className="bg-white p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-serif text-[#2d2a26] mb-2">Modèle de Carte</h3>
                  <p className="text-[#2d2a26] font-light text-sm">Gratuit — choisissez le design de votre carte message</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'floral', label: 'Florale', desc: 'Motifs fleurs aquarelle', color: '#f5e6e0' },
                    { id: 'minimal', label: 'Élégante', desc: 'Sobre et raffinée', color: '#f0ebe6' },
                    { id: 'festive', label: 'Festive', desc: 'Fête et célébration', color: '#e8e0d8' },
                  ].map((card) => (
                    <button
                      key={card.id}
                      onClick={() => setSelectedCardDesign(selectedCardDesign === card.id ? null : card.id)}
                      className={`p-3 border transition-all duration-300 text-center ${
                        selectedCardDesign === card.id
                          ? 'border-[#c4a47a] ring-1 ring-[#c4a47a]'
                          : 'border-[#e8e0d8] hover:border-[#c4a47a]'
                      }`}
                    >
                      <div 
                        className="w-full aspect-[3/4] rounded mb-3 flex items-center justify-center"
                        style={{ backgroundColor: card.color }}
                      >
                        <span className="font-serif text-[#2d2a26]/30 text-2xl italic">A</span>
                      </div>
                      <p className="text-xs font-serif text-[#2d2a26] mb-0.5">{card.label}</p>
                      <p className="text-[9px] text-[#2d2a26]/50">{card.desc}</p>
                    </button>
                  ))}
                </div>
                {selectedCardDesign && (
                  <p className="text-xs text-[#c4a47a] mt-3">✓ Carte {selectedCardDesign === 'floral' ? 'florale' : selectedCardDesign === 'minimal' ? 'élégante' : 'festive'} sélectionnée</p>
                )}
              </div>

              {/* Continue shopping */}
              <div className="text-center">
                <Link 
                  href="/boutique" 
                  className="text-[#c4a47a] underline hover:text-[#b8956a] transition-colors"
                >
                  Continuer les achats
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 sticky top-24">
                
                <h2 className="text-2xl font-serif text-[#2d2a26] mb-8">Résumé</h2>

                {/* Delivery Calculator */}
                <div className="mb-8">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#c4a47a] mb-4">
                    Calculer la livraison
                  </h3>
                  <DeliveryCalculator 
                    onDeliveryChange={handleDeliveryChange}
                    showMap={false}
                    className="text-sm"
                  />
                  {deliveryTime && (
                    <div className="mt-4 p-4 bg-[#faf8f5] border border-[#e8e0d8]">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#2d2a26] font-light">Délai estimé :</span>
                        <span className="text-[#c4a47a]">{deliveryTime}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Promo Code */}
                <div className="mb-8">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Code promo"
                      className="flex-1 px-4 py-3 border border-[#e8e0d8] text-[#2d2a26] font-light focus:outline-none focus:border-[#c4a47a] transition-colors"
                    />
                    <button 
                      onClick={applyPromoCode} 
                      className="bg-[#c4a47a] text-white px-6 py-3 hover:bg-[#b8956a] transition-colors duration-300"
                    >
                      OK
                    </button>
                  </div>
                  {appliedPromo && (
                    <p className="text-sm mt-3 text-[#c4a47a]">
                      ✓ Code {appliedPromo} appliqué (-10%)
                    </p>
                  )}
                </div>

                {/* Breakdown */}
                <div className="space-y-4 mb-8 pb-8 border-b border-[#c4a47a]/20">
                  <div className="flex justify-between text-[#2d2a26] font-light">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#c4a47a]">
                      <span>Réduction</span>
                      <span>-{discount.toFixed(2)}€</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#2d2a26] font-light">
                    <div className="flex flex-col">
                      <span>Livraison</span>
                      {deliveryTime && (
                        <span className="text-xs text-[#c4a47a]">
                          Zone {deliveryType === 'local' ? 'locale' : deliveryType === 'regional' ? 'régionale' : 'nationale'}
                        </span>
                      )}
                    </div>
                    <span className={delivery === 0 ? 'text-[#c4a47a]' : 'text-[#2d2a26]'}>
                      {delivery === 0 ? 'Gratuit' : `${delivery.toFixed(2)}€`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mb-8">
                  <span className="text-xl font-serif text-[#2d2a26]">Total</span>
                  <span className="text-2xl font-serif text-[#2d2a26]">{total.toFixed(2)}€</span>
                </div>

                {/* Checkout */}
                <button className="w-full bg-[#c4a47a] text-white py-4 hover:bg-[#b8956a] transition-colors duration-300 mb-8">
                  Procéder au Paiement
                </button>

                {/* Trust */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-[#2d2a26] font-light">
                    <svg className="w-4 h-4 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Paiement 100% sécurisé</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#2d2a26] font-light">
                    <svg className="w-4 h-4 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>Livraison partout en France</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#2d2a26] font-light">
                    <svg className="w-4 h-4 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Fraîcheur garantie 72h</span>
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