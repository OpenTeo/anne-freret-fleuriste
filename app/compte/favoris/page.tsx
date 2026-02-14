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
            <button onClick={() => router.push('/compte')} className="text-[#c4a47a] text-sm hover:underline mb-6 inline-block">← Mon compte</button>
            <h1 className="font-serif text-2xl md:text-3xl text-[#2d2a26] mb-8">Mes favoris</h1>
            
            <div className="bg-white border border-[#e8e0d8] p-12 text-center">
              <p className="text-4xl mb-4">❤️</p>
              <p className="text-[#2d2a26]/60 mb-4">Vous n'avez pas encore de favoris</p>
              <button onClick={() => router.push('/boutique')} className="text-[#c4a47a] text-sm hover:underline">
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
