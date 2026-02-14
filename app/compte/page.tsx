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
    { icon: <svg className="w-6 h-6 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>, label: 'Mes commandes', href: '/compte/commandes', desc: 'Historique et suivi de vos commandes' },
    { icon: <svg className="w-6 h-6 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" /></svg>, label: 'Mon abonnement', href: '/compte/abonnement', desc: 'Gérer votre abonnement floral' },
    { icon: <svg className="w-6 h-6 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>, label: 'Mes adresses', href: '/compte/adresses', desc: 'Adresses de livraison enregistrées' },
    { icon: <svg className="w-6 h-6 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>, label: 'Mes informations', href: '/compte/informations', desc: 'Modifier vos données personnelles' },
    { icon: <svg className="w-6 h-6 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>, label: 'Mes favoris', href: '/compte/favoris', desc: 'Vos produits préférés' },
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
                  <span className="flex-shrink-0">{item.icon}</span>
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
