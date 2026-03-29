'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Commandes() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push('/compte/connexion');
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <>
        <Header />
        <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="animate-pulse">
              <div className="h-8 bg-[#e8e0d8] rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-[#e8e0d8] rounded w-1/2"></div>
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
      <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <div className="mb-8">
              <h1 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-2">Mes commandes</h1>
              <p className="text-[#2d2a26]/60 text-sm">Suivi de vos achats</p>
            </div>

            {/* Message temporaire pendant reconstruction */}
            <div className="bg-white border border-[#e8e0d8] p-8 md:p-12 text-center">
              <svg className="w-12 h-12 mx-auto mb-4 text-[#b8935a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="font-serif text-xl text-[#2d2a26] mb-3">Historique en construction</h2>
              <p className="text-[#2d2a26]/60 text-sm mb-6 leading-relaxed max-w-md mx-auto">
                Vos commandes sont bien enregistrées et traitées. 
                Vous recevez un email de confirmation après chaque achat.
                <br /><br />
                L'historique détaillé sera disponible très prochainement.
              </p>
              <p className="text-[#2d2a26]/40 text-xs">
                Questions ? Contactez-nous : <a href="mailto:contact@anne-freret.fr" className="text-[#b8935a] underline">contact@anne-freret.fr</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
