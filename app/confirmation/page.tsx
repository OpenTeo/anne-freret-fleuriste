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
  const [showRecap, setShowRecap] = useState(false);
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
      setError('Le mot de passe doit contenir au moins 6 caractères.');
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
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-4">Aucune commande récente</h1>
            <Link href="/boutique" className="text-sm text-[#c4a47a] hover:text-[#b8956a] transition-colors">
              Retour à la boutique
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const deliveryDateFormatted = order.delivery.date 
    ? new Date(order.delivery.date + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    : '';

  const mapQuery = encodeURIComponent(`${order.customer.address}, ${order.customer.postalCode} ${order.customer.city}, France`);

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-20">
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-2xl">

          {/* Résumé commande — barre dépliable */}
          <button
            onClick={() => setShowRecap(!showRecap)}
            className="w-full flex items-center justify-between py-4 px-5 bg-white border border-[#e8e0d8]/50 mb-6"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#2d2a26]">Résumé de la commande</span>
              <svg className={`w-3.5 h-3.5 text-[#2d2a26]/40 transition-transform duration-300 ${showRecap ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
            <span className="text-lg font-serif text-[#2d2a26]">{order.delivery.total.toFixed(2)} €</span>
          </button>

          {/* Résumé dépliable */}
          {showRecap && (
            <div className="bg-white border border-[#e8e0d8]/50 border-t-0 -mt-6 mb-6 p-5">
              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 flex-shrink-0 bg-[#faf8f5] overflow-hidden">
                      <Image src={item.image} alt={item.name} width={48} height={48} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm text-[#2d2a26]">{item.name}</p>
                      <p className="text-[10px] text-[#2d2a26]/35">{item.size} — Qté : {item.quantity}</p>
                    </div>
                    <p className="text-sm text-[#2d2a26] flex-shrink-0">{(item.price * item.quantity).toFixed(2)}€</p>
                  </div>
                ))}
              </div>
              <div className="space-y-1.5 pt-3 border-t border-[#e8e0d8]/50 text-sm text-[#2d2a26]/50">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{order.delivery.subtotal.toFixed(2)}€</span>
                </div>
                {order.delivery.discount > 0 && (
                  <div className="flex justify-between text-[#c4a47a]">
                    <span>Réduction</span>
                    <span>-{order.delivery.discount.toFixed(2)}€</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className={order.delivery.fee === 0 ? 'text-[#c4a47a]' : ''}>
                    {order.delivery.fee === 0 ? 'Offerte' : `${order.delivery.fee.toFixed(2)}€`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation header */}
          <div className="bg-white border border-[#e8e0d8]/50 p-6 md:p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 border-2 border-[#c4a47a] rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#2d2a26]/40 mb-1">Confirmation n° {order.orderId}</p>
                <h1 className="font-serif text-base md:text-lg text-[#2d2a26] uppercase tracking-[0.15em]">
                  Merci, {order.customer.firstName} !
                </h1>
              </div>
            </div>

            {/* Carte Google Maps */}
            <div className="border border-[#e8e0d8]/50 overflow-hidden mb-6">
              <iframe
                src={`https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`}
                width="100%"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                title="Adresse de livraison"
                className="w-full"
              />
            </div>

            {/* Message confirmation */}
            <div className="border border-[#e8e0d8]/50 p-4 mb-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#2d2a26]/40 mb-2">
                Votre commande est maintenant confirmée
              </p>
              <p className="text-sm text-[#2d2a26]/60 font-light leading-relaxed">
                Vous recevrez prochainement un e-mail de confirmation à {order.customer.email}
              </p>
            </div>
          </div>

          {/* Détails de la commande */}
          <div className="bg-white border border-[#e8e0d8]/50 p-6 md:p-8 mb-6">
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#2d2a26]/40 mb-6">Détails de la commande</h2>

            <div className="space-y-5">
              {/* Coordonnées */}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#2d2a26] font-medium mb-2">Coordonnées</p>
                <p className="text-sm text-[#2d2a26]/60">{order.customer.email}</p>
                {order.customer.phone && (
                  <p className="text-sm text-[#2d2a26]/60">{order.customer.phone}</p>
                )}
              </div>

              {/* Adresse de livraison */}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#2d2a26] font-medium mb-2">Adresse de livraison</p>
                <p className="text-sm text-[#2d2a26]/60">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
                <p className="text-sm text-[#2d2a26]/60">{order.customer.address}</p>
                <p className="text-sm text-[#2d2a26]/60">{order.customer.postalCode} {order.customer.city}</p>
              </div>

              {/* Mode de livraison */}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#2d2a26] font-medium mb-2">Livraison</p>
                <p className="text-sm text-[#2d2a26]/60 flex items-center gap-2">
                  {order.delivery.mode === 'local' && (
                    <><span className="text-[9px] px-1.5 py-0.5 rounded-sm text-white" style={{ backgroundColor: '#c4a47a' }}>Locale</span> Livraison locale — Sous 24h</>
                  )}
                  {order.delivery.mode === 'colissimo' && (
                    <><span className="text-[9px] px-1.5 py-0.5 rounded-sm text-white" style={{ backgroundColor: '#003DA5' }}>Colissimo</span> La Poste — Sous 48h</>
                  )}
                  {order.delivery.mode === 'chronopost' && (
                    <><span className="text-[9px] px-1.5 py-0.5 rounded-sm text-white" style={{ backgroundColor: '#D4003C' }}>Chronopost</span> Express — Sous 24h</>
                  )}
                  {!['local', 'colissimo', 'chronopost'].includes(order.delivery.mode) && (
                    <>Livraison — {order.delivery.mode}</>
                  )}
                </p>
                {deliveryDateFormatted && (
                  <p className="text-sm text-[#2d2a26]/60">
                    Date souhaitée : {deliveryDateFormatted}
                  </p>
                )}
              </div>

              {/* Méthode de paiement */}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#2d2a26] font-medium mb-2">Paiement</p>
                <p className="text-sm text-[#2d2a26]/60">{order.delivery.total.toFixed(2)}€ — Carte bancaire</p>
              </div>
            </div>
          </div>

          {/* Création de compte — seulement si pas connecté */}
          {!user && !accountCreated && (
            <div className="bg-white border border-[#c4a47a]/20 p-6 md:p-8 mb-6">
              <div className="text-center mb-6">
                <h2 className="font-serif text-lg text-[#2d2a26] mb-2">Créez votre compte en 1 clic</h2>
                <p className="text-xs text-[#2d2a26]/40 leading-relaxed">
                  Suivez votre commande, retrouvez vos favoris, commandez plus vite.
                </p>
              </div>

              <form onSubmit={handleCreateAccount} className="max-w-sm mx-auto space-y-3">
                <div className="px-3 py-2.5 bg-[#faf8f5] border border-[#e8e0d8] text-sm text-[#2d2a26]/40">
                  {order.customer.firstName} {order.customer.lastName}
                </div>
                <div className="px-3 py-2.5 bg-[#faf8f5] border border-[#e8e0d8] text-sm text-[#2d2a26]/40">
                  {order.customer.email}
                </div>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    required
                    minLength={6}
                    className="w-full px-3 py-2.5 border border-[#e8e0d8] text-sm text-[#2d2a26] bg-white focus:outline-none focus:border-[#c4a47a] transition-colors placeholder:text-[#2d2a26]/25"
                    placeholder="Choisissez un mot de passe"
                  />
                </div>
                {error && <p className="text-xs text-red-400">{error}</p>}
                <button type="submit" className="w-full bg-[#c4a47a] text-white py-3 text-sm uppercase tracking-[0.1em] hover:bg-[#b8956a] transition-colors">
                  Créer mon compte
                </button>
                <p className="text-center">
                  <Link href="/" className="text-[10px] text-[#2d2a26]/30 hover:text-[#2d2a26]/50 transition-colors">
                    Non merci
                  </Link>
                </p>
              </form>
            </div>
          )}

          {/* Compte créé */}
          {accountCreated && (
            <div className="bg-white border border-[#c4a47a]/30 p-5 mb-6 flex items-center gap-3">
              <svg className="w-4 h-4 text-[#c4a47a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <p className="text-sm text-[#2d2a26]">
                Compte créé ! <Link href="/compte" className="text-[#c4a47a] hover:text-[#b8956a]">Accéder à mon espace</Link>
              </p>
            </div>
          )}

          {/* Déjà connecté */}
          {user && (
            <div className="text-center mb-6">
              <Link href="/compte/commandes" className="text-sm text-[#c4a47a] hover:text-[#b8956a] transition-colors">
                Suivre ma commande →
              </Link>
            </div>
          )}

          {/* Continue */}
          <div className="text-center pt-4">
            <Link href="/boutique" className="text-sm text-[#2d2a26]/40 hover:text-[#2d2a26]/60 transition-colors">
              ← Continuer les achats
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}