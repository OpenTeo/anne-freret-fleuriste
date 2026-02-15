'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/lib/auth-context';

interface OrderData {
  items: Array<{
    id: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  delivery: {
    mode: string;
    date: string;
    fee: number;
    discount: number;
    subtotal: number;
    total: number;
  };
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
  };
  orderId: string;
  date: string;
}

export default function Confirmation() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [password, setPassword] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);
  const [error, setError] = useState('');
  const { user, register } = useAuth();

  useEffect(() => {
    const stored = localStorage.getItem('af-last-order');
    if (stored) {
      setOrder(JSON.parse(stored));
    }
  }, []);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order || password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caracteres.');
      return;
    }

    const result = await register({
      firstName: order.customer.firstName,
      lastName: order.customer.lastName,
      email: order.customer.email,
      phone: order.customer.phone,
      password,
    });

    if (result.success) {
      // Transfer guest favorites
      const guestFavs = localStorage.getItem('favorites-guest');
      if (guestFavs) {
        const currentUser = JSON.parse(localStorage.getItem('af-current-user') || '{}');
        if (currentUser.id) {
          const existing = JSON.parse(localStorage.getItem(`favorites-${currentUser.id}`) || '[]');
          const merged = [...new Set([...existing, ...JSON.parse(guestFavs)])];
          localStorage.setItem(`favorites-${currentUser.id}`, JSON.stringify(merged));
          localStorage.removeItem('favorites-guest');
        }
      }
      setAccountCreated(true);
    } else {
      setError(result.error || 'Une erreur est survenue.');
    }
  };

  if (!order) {
    return (
      <>
        <Header />
        <main className="bg-[#faf8f5] min-h-screen pt-20">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-4">Aucune commande recente</h1>
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
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 max-w-3xl">

          {/* Success header */}
          <div className="text-center mb-12">
            <div className="w-12 h-12 border border-[#c4a47a] flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-3">Merci pour votre commande</h1>
            <div className="w-12 h-px bg-[#c4a47a] mx-auto mb-4" />
            <p className="text-sm text-[#2d2a26]/50 font-light">
              Commande {order.orderId} — Un email de confirmation a ete envoye a {order.customer.email}
            </p>
          </div>

          {/* Order recap */}
          <div className="bg-white border border-[#e8e0d8]/50 p-5 md:p-8 mb-8">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">Recapitulatif</h2>

            <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-14 h-14 flex-shrink-0 bg-[#faf8f5] overflow-hidden">
                    <Image src={item.image} alt={item.name} width={56} height={56} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm text-[#2d2a26] font-serif">{item.name}</p>
                    <p className="text-[10px] text-[#2d2a26]/40">{item.size} — Qte : {item.quantity}</p>
                  </div>
                  <p className="text-sm text-[#2d2a26] flex-shrink-0">{(item.price * item.quantity).toFixed(2)}€</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-[#e8e0d8]">
              <div className="flex justify-between text-sm text-[#2d2a26]/60">
                <span>Sous-total</span>
                <span>{order.delivery.subtotal.toFixed(2)}€</span>
              </div>
              {order.delivery.discount > 0 && (
                <div className="flex justify-between text-sm text-[#c4a47a]">
                  <span>Reduction</span>
                  <span>-{order.delivery.discount.toFixed(2)}€</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-[#2d2a26]/60">
                <span>Livraison</span>
                <span className={order.delivery.fee === 0 ? 'text-[#c4a47a]' : ''}>
                  {order.delivery.fee === 0 ? 'Offerte' : `${order.delivery.fee.toFixed(2)}€`}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-[#e8e0d8]">
                <span className="text-sm uppercase tracking-[0.1em] text-[#2d2a26]/50">Total</span>
                <span className="text-xl font-serif text-[#2d2a26]">{order.delivery.total.toFixed(2)}€</span>
              </div>
            </div>

            {/* Delivery details */}
            <div className="mt-6 pt-4 border-t border-[#e8e0d8]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-[#2d2a26]/40 mb-1">Livraison</p>
                  <p className="text-[#2d2a26]">
                    {order.delivery.mode === 'local' ? 'Locale' : 'France'} —{' '}
                    {new Date(order.delivery.date + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-[#2d2a26]/40 mb-1">Adresse</p>
                  <p className="text-[#2d2a26]">
                    {order.customer.address}, {order.customer.postalCode} {order.customer.city}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Account creation — only if not logged in */}
          {!user && !accountCreated && (
            <div className="bg-white border border-[#e8e0d8]/50 p-5 md:p-8 mb-8">
              <div className="text-center mb-6">
                <h2 className="font-serif text-xl text-[#2d2a26] mb-2">Creez votre compte en 1 clic</h2>
                <p className="text-sm text-[#2d2a26]/50 font-light leading-relaxed">
                  Suivez votre commande, retrouvez vos favoris, commandez plus vite.
                </p>
              </div>

              <form onSubmit={handleCreateAccount} className="max-w-sm mx-auto space-y-4">
                <div className="flex gap-4 text-sm text-[#2d2a26]/60">
                  <div className="flex-1 px-4 py-3 bg-[#faf8f5] border border-[#e8e0d8]">
                    {order.customer.firstName} {order.customer.lastName}
                  </div>
                </div>
                <div className="px-4 py-3 bg-[#faf8f5] border border-[#e8e0d8] text-sm text-[#2d2a26]/60">
                  {order.customer.email}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.1em] text-[#2d2a26]/50 mb-1.5">Mot de passe</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 border border-[#e8e0d8] text-sm text-[#2d2a26] bg-white focus:outline-none focus:border-[#c4a47a] transition-colors"
                    placeholder="6 caracteres minimum"
                  />
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-[#c4a47a] text-white py-3 text-sm uppercase tracking-[0.1em] hover:bg-[#b8956a] transition-colors"
                >
                  Creer mon compte
                </button>
              </form>

              <p className="text-center mt-4">
                <Link href="/" className="text-xs text-[#2d2a26]/40 hover:text-[#2d2a26]/60 transition-colors">
                  Non merci, continuer
                </Link>
              </p>
            </div>
          )}

          {/* Account created success */}
          {accountCreated && (
            <div className="bg-white border border-[#c4a47a]/30 p-5 md:p-8 mb-8 text-center">
              <svg className="w-5 h-5 text-[#c4a47a] mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <p className="text-sm text-[#2d2a26]">Votre compte a ete cree avec succes.</p>
              <Link href="/compte" className="text-xs text-[#c4a47a] hover:text-[#b8956a] transition-colors mt-2 inline-block">
                Acceder a mon compte
              </Link>
            </div>
          )}

          {/* Already logged in */}
          {user && (
            <div className="text-center mb-8">
              <Link href="/compte" className="text-sm text-[#c4a47a] hover:text-[#b8956a] transition-colors">
                Voir mon compte
              </Link>
            </div>
          )}

          {/* Continue */}
          <div className="text-center">
            <Link href="/boutique" className="inline-block border border-[#2d2a26] text-[#2d2a26] px-8 py-3 text-sm uppercase tracking-[0.1em] hover:bg-[#2d2a26] hover:text-white transition-colors">
              Continuer les achats
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
