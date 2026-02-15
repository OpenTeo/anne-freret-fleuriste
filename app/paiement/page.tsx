'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface DeliveryInfo {
  mode: string;
  date: string;
  fee: number;
  discount: number;
  subtotal: number;
  total: number;
}

export default function Paiement() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
  });

  useEffect(() => {
    const cart = localStorage.getItem('af-checkout-cart');
    const delivery = localStorage.getItem('af-checkout-delivery');
    if (cart) setCartItems(JSON.parse(cart));
    if (delivery) setDeliveryInfo(JSON.parse(delivery));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid = form.email && form.firstName && form.lastName && form.phone && form.address && form.postalCode && form.city;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);

    // Store order info for confirmation page
    localStorage.setItem('af-last-order', JSON.stringify({
      items: cartItems,
      delivery: deliveryInfo,
      customer: form,
      orderId: `AF-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toISOString(),
    }));

    // Clear cart
    localStorage.removeItem('af-checkout-cart');
    localStorage.removeItem('af-checkout-delivery');

    setTimeout(() => {
      router.push('/confirmation');
    }, 800);
  };

  if (cartItems.length === 0 && typeof window !== 'undefined') {
    return (
      <>
        <Header />
        <main className="bg-[#faf8f5] min-h-screen pt-20">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-4">Aucune commande en cours</h1>
            <Link href="/boutique" className="text-sm text-[#c4a47a] hover:text-[#b8956a] transition-colors">
              Retour a la boutique
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
      <main className="bg-[#faf8f5] min-h-screen pt-20">
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-16">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-8">
            <Link href="/panier" className="text-[#c4a47a] hover:text-[#b8956a] transition-colors">Panier</Link>
            <span className="text-[#2d2a26]/20">/</span>
            <span className="text-[#2d2a26]/50">Paiement</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-serif text-[#2d2a26] mb-2">Finaliser votre commande</h1>
          <p className="text-sm text-[#2d2a26]/50 font-light mb-10">Aucun compte requis</p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

              {/* Left — Form */}
              <div className="lg:col-span-2 space-y-8">

                {/* Contact */}
                <div>
                  <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-4">Vos coordonnees</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.1em] text-[#2d2a26]/50 mb-1.5">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#e8e0d8] text-sm text-[#2d2a26] bg-white focus:outline-none focus:border-[#c4a47a] transition-colors placeholder:text-[#2d2a26]/25"
                        placeholder="votre@email.fr"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-[0.1em] text-[#2d2a26]/50 mb-1.5">Prenom</label>
                        <input
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-[#e8e0d8] text-sm text-[#2d2a26] bg-white focus:outline-none focus:border-[#c4a47a] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.1em] text-[#2d2a26]/50 mb-1.5">Nom</label>
                        <input
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-[#e8e0d8] text-sm text-[#2d2a26] bg-white focus:outline-none focus:border-[#c4a47a] transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.1em] text-[#2d2a26]/50 mb-1.5">Telephone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#e8e0d8] text-sm text-[#2d2a26] bg-white focus:outline-none focus:border-[#c4a47a] transition-colors"
                        placeholder="06 00 00 00 00"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-4">Adresse de livraison</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.1em] text-[#2d2a26]/50 mb-1.5">Adresse</label>
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#e8e0d8] text-sm text-[#2d2a26] bg-white focus:outline-none focus:border-[#c4a47a] transition-colors"
                        placeholder="12 rue des Fleurs"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-[0.1em] text-[#2d2a26]/50 mb-1.5">Code postal</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={form.postalCode}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-[#e8e0d8] text-sm text-[#2d2a26] bg-white focus:outline-none focus:border-[#c4a47a] transition-colors"
                          placeholder="50000"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.1em] text-[#2d2a26]/50 mb-1.5">Ville</label>
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-[#e8e0d8] text-sm text-[#2d2a26] bg-white focus:outline-none focus:border-[#c4a47a] transition-colors"
                          placeholder="Saint-Lo"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Login hint */}
                <div className="pt-2 border-t border-[#e8e0d8]">
                  <p className="text-xs text-[#2d2a26]/40 font-light">
                    Vous avez un compte ?{' '}
                    <Link href="/compte/connexion" className="text-[#c4a47a] hover:text-[#b8956a] transition-colors">
                      Connectez-vous
                    </Link>
                    {' '}pour pre-remplir vos informations.
                  </p>
                </div>
              </div>

              {/* Right — Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-5 md:p-6 border border-[#e8e0d8]/50 sticky top-24 space-y-6">

                  <h2 className="text-lg font-serif text-[#2d2a26]">Votre commande</h2>

                  {/* Items */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-16 flex-shrink-0 bg-[#faf8f5] overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <p className="text-sm text-[#2d2a26] font-serif leading-tight">{item.name}</p>
                          <p className="text-[10px] text-[#2d2a26]/40 mt-0.5">{item.size} — Qte : {item.quantity}</p>
                        </div>
                        <p className="text-sm text-[#2d2a26] flex-shrink-0">{(item.price * item.quantity).toFixed(2)}€</p>
                      </div>
                    ))}
                  </div>

                  {/* Delivery info */}
                  {deliveryInfo && (
                    <>
                      <div className="space-y-3 pt-4 border-t border-[#e8e0d8]">
                        <div className="flex justify-between text-sm text-[#2d2a26]/70">
                          <span>Sous-total</span>
                          <span>{deliveryInfo.subtotal.toFixed(2)}€</span>
                        </div>
                        {deliveryInfo.discount > 0 && (
                          <div className="flex justify-between text-sm text-[#c4a47a]">
                            <span>Reduction</span>
                            <span>-{deliveryInfo.discount.toFixed(2)}€</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm text-[#2d2a26]/70">
                          <span className="flex items-center gap-1.5">
                            Livraison
                            {deliveryInfo.mode === 'local' && <span className="text-[9px] px-1.5 py-0.5 rounded-sm text-white" style={{ backgroundColor: '#c4a47a' }}>Locale</span>}
                            {deliveryInfo.mode === 'colissimo' && <span className="text-[9px] px-1.5 py-0.5 rounded-sm text-white" style={{ backgroundColor: '#003DA5' }}>Colissimo</span>}
                            {deliveryInfo.mode === 'chronopost' && <span className="text-[9px] px-1.5 py-0.5 rounded-sm text-white" style={{ backgroundColor: '#D4003C' }}>Chronopost</span>}
                          </span>
                          <span className={deliveryInfo.fee === 0 ? 'text-[#c4a47a]' : ''}>
                            {deliveryInfo.fee === 0 ? 'Offerte' : `${deliveryInfo.fee.toFixed(2)}€`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#2d2a26]/70">
                          <svg className="w-3.5 h-3.5 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                          <span>
                            {new Date(deliveryInfo.date + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-baseline pt-4 border-t border-[#2d2a26]/10">
                        <span className="text-sm uppercase tracking-[0.1em] text-[#2d2a26]/50">Total</span>
                        <span className="text-2xl font-serif text-[#2d2a26]">{deliveryInfo.total.toFixed(2)}€</span>
                      </div>
                    </>
                  )}

                  {/* Pay button */}
                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-3.5 text-sm uppercase tracking-[0.1em] transition-all ${
                      isFormValid && !isSubmitting
                        ? 'bg-[#c4a47a] text-white hover:bg-[#b8956a]'
                        : 'bg-[#e8e0d8] text-[#2d2a26]/30 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Traitement en cours...' : 'Payer'}
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-1">
                    <svg className="w-3.5 h-3.5 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    <span className="text-[10px] text-[#2d2a26]/40">Paiement securise</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
