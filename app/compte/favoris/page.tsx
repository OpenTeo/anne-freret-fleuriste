'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Favoris() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push('/compte/connexion');
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4">
            <button onClick={() => router.push('/compte')} className="text-[#b8935a] text-sm hover:underline mb-6 inline-block">← Mon compte</button>
            <h1 className="font-serif text-2xl md:text-3xl text-[#2d2a26] mb-8">Mes favoris</h1>
            
            <div className="bg-white border border-[#e8e0d8] p-12 text-center">
              <svg className="w-12 h-12 mx-auto mb-4 text-[#b8935a]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
              <p className="text-[#2d2a26]/60 mb-4">Vous n'avez pas encore de favoris</p>
              <button onClick={() => router.push('/boutique')} className="text-[#b8935a] text-sm hover:underline">
                Parcourir nos créations →
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
