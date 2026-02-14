'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Compte() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push('/compte/connexion');
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <>
        <Header />
        <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20 flex items-center justify-center">
          <p className="text-[#2d2a26]/40">Chargement...</p>
        </main>
        <Footer />
      </>
    );
  }

  const menuItems = [
    { icon: '📦', label: 'Mes commandes', href: '/compte/commandes', desc: 'Historique et suivi de vos commandes' },
    { icon: '🌸', label: 'Mon abonnement', href: '/compte/abonnement', desc: 'Gérer votre abonnement floral' },
    { icon: '📍', label: 'Mes adresses', href: '/compte/adresses', desc: 'Adresses de livraison enregistrées' },
    { icon: '👤', label: 'Mes informations', href: '/compte/informations', desc: 'Modifier vos données personnelles' },
    { icon: '❤️', label: 'Mes favoris', href: '/compte/favoris', desc: 'Vos produits préférés' },
  ];

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            
            {/* Welcome */}
            <div className="mb-12 md:mb-16">
              <p className="text-[#c4a47a] text-[10px] tracking-[0.3em] uppercase mb-3">Mon espace</p>
              <h1 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-2">
                Bonjour, {user.firstName}
              </h1>
              <p className="text-[#2d2a26]/50 text-sm">
                Membre depuis le {new Date(user.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
              </p>
            </div>

            {/* Menu grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => router.push(item.href)}
                  className="flex items-start gap-4 p-6 bg-white border border-[#e8e0d8] hover:border-[#c4a47a] transition-all duration-300 text-left group"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-[#2d2a26] text-sm font-medium group-hover:text-[#c4a47a] transition-colors">{item.label}</p>
                    <p className="text-[#2d2a26]/40 text-xs mt-1">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Logout */}
            <div className="text-center">
              <button
                onClick={() => { logout(); router.push('/'); }}
                className="text-sm text-[#2d2a26]/40 hover:text-[#c4a47a] underline underline-offset-4 transition-colors"
              >
                Se déconnecter
              </button>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
