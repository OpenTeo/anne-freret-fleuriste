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

  if (isLoading || !user) return null;

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-14 md:pt-20">
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4">
            <button onClick={() => router.push('/compte')} className="text-[#c4a47a] text-sm hover:underline mb-6 inline-block">← Mon compte</button>
            <h1 className="font-serif text-2xl md:text-3xl text-[#2d2a26] mb-8">Mes commandes</h1>
            
            <div className="bg-white border border-[#e8e0d8] p-12 text-center">
              <svg className="w-12 h-12 mx-auto mb-4 text-[#c4a47a]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
              <p className="text-[#2d2a26]/60 mb-4">Vous n'avez pas encore de commande</p>
              <button onClick={() => router.push('/boutique')} className="text-[#c4a47a] text-sm hover:underline">
                Découvrir notre boutique →
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
