'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const totalSlides = 3;

  const next = useCallback(() => setCurrent((c) => (c + 1) % totalSlides), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + totalSlides) % totalSlides), []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden bg-[#faf8f5]">
      <div className="relative">
        {/* ═══ SLIDE 1: Bouquet du mois ═══ */}
        <div
          className="transition-opacity duration-700 ease-in-out"
          style={{ opacity: current === 0 ? 1 : 0, position: current === 0 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}
        >
          <div className="relative h-[55vh] md:h-[60vh]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/files/7ACE65B9-6559-4B06-8BF7-0290B4194167.jpg?v=1736713275')` }}
            />
          </div>
          <div className="bg-[#faf8f5] px-6 md:px-16 lg:px-24 py-6 md:py-8">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-light mb-2" style={{ color: '#b8935a' }}>
              Sélection de saison
            </p>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl mb-3 font-light" style={{ color: '#2d2a26' }}>
              Le bouquet du mois
            </h2>
            <Link
              href="/boutique"
              className="inline-block text-sm font-light border-b pb-0.5 transition-colors hover:text-[#b8935a] hover:border-[#b8935a]"
              style={{ color: '#2d2a26', borderColor: '#2d2a26' }}
            >
              Découvrir →
            </Link>
          </div>
        </div>

        {/* ═══ SLIDE 2: Abonnement — photo bouquet + overlay beige avec formules ═══ */}
        <div
          className="transition-opacity duration-700 ease-in-out"
          style={{ opacity: current === 1 ? 1 : 0, position: current === 1 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}
        >
          <div className="relative h-[55vh] md:h-[60vh]">
            {/* Photo de fond — Le Sublime */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_29_8a157ca1-e7ec-4bdd-8c6e-fc4a07a4af4c.png?v=1709222874')` }}
            />
            {/* Overlay beige semi-transparent */}
            <div className="absolute inset-0 bg-[#f5f0ea]/75 backdrop-blur-[2px]" />
            
            {/* Contenu centré */}
            <div className="relative h-full flex flex-col items-center justify-center px-6">
              <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-light mb-3" style={{ color: '#b8935a' }}>
                Abonnement Floral
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-center mb-2 font-light" style={{ color: '#2d2a26' }}>
                Des fleurs chaque mois
              </h2>
              <div className="w-12 h-px bg-[#b8935a] mb-6" />

              {/* 3 formules en ligne */}
              <div className="flex items-center justify-center gap-8 md:gap-14">
                {[
                  { name: 'Essentiel', price: '39.90' },
                  { name: 'Signature', price: '49.90' },
                  { name: 'Prestige', price: '69.90' },
                ].map((plan, i) => (
                  <div key={plan.name} className="text-center flex flex-col items-center">
                    <p className="font-serif text-base md:text-lg mb-0.5" style={{ color: '#2d2a26' }}>{plan.name}</p>
                    <p className="text-sm md:text-base font-light" style={{ color: '#b8935a' }}>{plan.price}€<span className="text-[10px] text-[#2d2a26]/40">/mois</span></p>
                    {i === 1 && <span className="mt-1 text-[8px] tracking-[0.2em] uppercase px-2 py-0.5 bg-[#b8935a] text-white rounded-full">Favori</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-[#faf8f5] px-6 md:px-16 lg:px-24 py-6 md:py-8">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-light mb-2" style={{ color: '#b8935a' }}>
              Abonnement Floral
            </p>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl mb-3 font-light" style={{ color: '#2d2a26' }}>
              Des fleurs chaque mois
            </h2>
            <Link
              href="/abonnement"
              className="inline-block text-sm font-light border-b pb-0.5 transition-colors hover:text-[#b8935a] hover:border-[#b8935a]"
              style={{ color: '#2d2a26', borderColor: '#2d2a26' }}
            >
              Découvrir →
            </Link>
          </div>
        </div>

        {/* ═══ SLIDE 3: Mariages — photo bouquet mariée + phrase dorée ═══ */}
        <div
          className="transition-opacity duration-700 ease-in-out"
          style={{ opacity: current === 2 ? 1 : 0, position: current === 2 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}
        >
          <div className="relative h-[55vh] md:h-[60vh]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/images/mariages/bouquet-mariee-vert.jpg')` }}
            />
            {/* Phrase dorée discrète en bas */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="font-serif text-lg md:text-2xl italic font-light text-white/90 drop-shadow-lg">
                Sublimez votre plus beau jour
              </p>
            </div>
            {/* Crédit photographe */}
            <p className="absolute bottom-2 right-3 text-[8px] text-white/50 font-light">
              © Bastien Norrington
            </p>
          </div>
          <div className="bg-[#faf8f5] px-6 md:px-16 lg:px-24 py-6 md:py-8">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-light mb-2" style={{ color: '#b8935a' }}>
              Jour J
            </p>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl mb-3 font-light" style={{ color: '#2d2a26' }}>
              Fleurs de mariage
            </h2>
            <Link
              href="/mariages"
              className="inline-block text-sm font-light border-b pb-0.5 transition-colors hover:text-[#b8935a] hover:border-[#b8935a]"
              style={{ color: '#2d2a26', borderColor: '#2d2a26' }}
            >
              Découvrir →
            </Link>
          </div>
        </div>

        {/* Flèches navigation */}
        <button
          onClick={prev}
          className="absolute left-4 md:left-6 top-[27vh] md:top-[30vh] z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors rounded-full"
          aria-label="Slide précédent"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-4 md:right-6 top-[27vh] md:top-[30vh] z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors rounded-full"
          aria-label="Slide suivant"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots — dans la zone texte */}
      <div className="bg-[#faf8f5] px-6 md:px-16 lg:px-24 pb-6">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-8 h-2 bg-[#2d2a26]'
                  : 'w-2 h-2 bg-[#2d2a26]/25 hover:bg-[#2d2a26]/50'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
