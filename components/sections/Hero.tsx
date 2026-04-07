'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

const SWIPE_THRESHOLD = 50;

const totalSlides = 4;

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % totalSlides), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + totalSlides) % totalSlides), []);

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    setTouchStartX(e.targetTouches[0]?.clientX ?? null);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    setTouchEndX(e.targetTouches[0]?.clientX ?? null);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const distance = touchStartX - touchEndX;
    if (distance > SWIPE_THRESHOLD) next();
    if (distance < -SWIPE_THRESHOLD) prev();

    setTouchStartX(null);
    setTouchEndX(null);
  };

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      className="relative overflow-hidden bg-[#faf8f5]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative">

        {/* ═══ SLIDE 1: Bouquet du mois ═══ */}
        <div
          className="transition-opacity duration-700 ease-in-out"
          style={{ opacity: current === 0 ? 1 : 0, position: current === 0 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}
        >
          <div className="relative h-[55vh] md:h-[60vh]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/images/bouquets/saint-pairais.png')` }}
            />
          </div>
          <div className="bg-[#faf8f5] px-6 md:px-16 lg:px-24 py-6 md:py-8">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-light mb-2" style={{ color: '#b8935a' }}>
              Sélection de saison
            </p>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl mb-2 font-light" style={{ color: '#2d2a26' }}>
              Le bouquet du mois
            </h2>
            <p className="text-sm md:text-base text-[#2d2a26]/60 font-light mb-3 max-w-xl">
              Une création délicate inspirée par notre boutique de Saint-Pair-sur-Mer, composée à la main dans notre atelier.
            </p>
            <Link
              href="/produit/le-saint-pairais"
              className="inline-block text-sm font-light border-b pb-0.5 transition-colors hover:text-[#b8935a] hover:border-[#b8935a]"
              style={{ color: '#2d2a26', borderColor: '#2d2a26' }}
            >
              Voir le Saint-Pairais →
            </Link>
          </div>
        </div>

        {/* ═══ SLIDE 2: Abonnement — fond crème + 3 cards élégantes ═══ */}
        <div
          className="transition-opacity duration-700 ease-in-out"
          style={{ opacity: current === 1 ? 1 : 0, position: current === 1 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}
        >
          <div className="bg-[#f7f3ee] h-[55vh] md:h-[60vh] flex flex-col items-center justify-center px-4 md:px-12">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-light mb-3" style={{ color: '#b8935a' }}>
              Abonnement Floral
            </p>
            <h2 className="font-serif text-2xl md:text-4xl text-center mb-6 font-light" style={{ color: '#2d2a26' }}>
              Chaque mois, une surprise florale
            </h2>

            {/* 3 cards */}
            <div className="flex flex-row items-stretch justify-center gap-3 md:gap-6 w-full max-w-4xl">
              {[
                { name: 'Essentiel', tagline: 'La douceur mensuelle', price: '29.90', features: ['3-5 variétés', 'Bouquet classique', 'Livraison incluse'], highlight: false },
                { name: 'Signature', tagline: 'Notre création favorite', price: '44.90', features: ['5-7 variétés', 'Composition premium', 'Carte personnalisée'], highlight: true },
                { name: 'Prestige', tagline: "L'excellence absolue", price: '59.90', features: ['8-10 variétés', "Fleurs d'exception", 'Service prioritaire'], highlight: false },
              ].map((plan) => (
                <Link
                  key={plan.name}
                  href={`/abonnement?plan=${plan.name.toLowerCase()}`}
                  className={`flex-1 bg-white px-3 md:px-6 py-4 md:py-6 text-center flex flex-col transition-all hover:shadow-md ${
                    plan.highlight
                      ? 'border-2 border-[#b8935a] shadow-sm'
                      : 'border border-[#e8e0d8]'
                  }`}
                >
                  {plan.highlight && (
                    <span className="inline-block mb-2 text-[7px] md:text-[8px] tracking-[0.2em] uppercase px-2 py-0.5 bg-[#b8935a] text-white">
                      Le + choisi
                    </span>
                  )}
                  <p className="font-serif text-base md:text-xl mb-0.5" style={{ color: '#2d2a26' }}>{plan.name}</p>
                  <p className="text-[9px] md:text-[10px] italic font-light mb-2" style={{ color: '#b8935a' }}>{plan.tagline}</p>
                  <div className="w-8 h-px bg-[#e8e0d8] mx-auto mb-2" />
                  <p className="font-serif text-xl md:text-3xl mb-1" style={{ color: '#2d2a26' }}>{plan.price}€</p>
                  <p className="text-[9px] md:text-[10px] text-[#2d2a26]/40 mb-2">par livraison</p>
                  <div className="hidden md:block space-y-1 mt-auto pt-2 border-t border-[#e8e0d8]">
                    {plan.features.map((f, i) => (
                      <p key={i} className="text-[10px] text-[#2d2a26]/50 font-light">
                        ✓ {f}
                      </p>
                    ))}
                  </div>
                </Link>
              ))}
            </div>

            {/* Garanties sous les cards */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mt-4">
              {['Sans engagement', 'Livraison offerte'].map((txt) => (
                <p key={txt} className="text-[9px] md:text-[10px] text-[#2d2a26]/40 font-light flex items-center gap-1">
                  <span style={{ color: '#b8935a' }}>✓</span> {txt}
                </p>
              ))}
            </div>
          </div>
          <div className="bg-[#faf8f5] px-6 md:px-16 lg:px-24 py-6 md:py-8">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-light mb-2" style={{ color: '#b8935a' }}>
              Abonnement Floral
            </p>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl mb-2 font-light" style={{ color: '#2d2a26' }}>
              Des fleurs chaque mois
            </h2>
            <p className="text-sm md:text-base text-[#2d2a26]/60 font-light mb-3 max-w-xl">
              Une parenthèse florale pensée pour durer, avec des créations de saison et sans engagement.
            </p>
            <Link
              href="/abonnement"
              className="inline-block text-sm font-light border-b pb-0.5 transition-colors hover:text-[#b8935a] hover:border-[#b8935a]"
              style={{ color: '#2d2a26', borderColor: '#2d2a26' }}
            >
              Découvrir les formules →
            </Link>
          </div>
        </div>

        {/* ═══ SLIDE 3: Deuil ═══ */}
        <div
          className="transition-opacity duration-700 ease-in-out"
          style={{ opacity: current === 2 ? 1 : 0, position: current === 2 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}
        >
          <div className="relative h-[55vh] md:h-[60vh]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Couronne3.jpg?v=1743008466')`, backgroundPosition: 'center 40%' }}
            />
          </div>
          <div className="bg-[#faf8f5] px-6 md:px-16 lg:px-24 py-6 md:py-8">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-light mb-2" style={{ color: '#b8935a' }}>
              Hommages & Recueillement
            </p>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl mb-2 font-light" style={{ color: '#2d2a26' }}>
              Compositions de deuil
            </h2>
            <p className="text-sm md:text-base text-[#2d2a26]/60 font-light mb-3 max-w-xl">
              Des hommages floraux réalisés avec délicatesse, pour accompagner chaque moment avec justesse.
            </p>
            <Link
              href="/deuil"
              className="inline-block text-sm font-light border-b pb-0.5 transition-colors hover:text-[#b8935a] hover:border-[#b8935a]"
              style={{ color: '#2d2a26', borderColor: '#2d2a26' }}
            >
              Voir les hommages floraux →
            </Link>
          </div>
        </div>

        {/* ═══ SLIDE 4: Mariages ═══ */}
        <div
          className="transition-opacity duration-700 ease-in-out"
          style={{ opacity: current === 3 ? 1 : 0, position: current === 3 ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}
        >
          <div className="relative h-[55vh] md:h-[60vh]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/images/mariages/bouquet-mariee-vert.jpg')` }}
            />
            {/* Desktop: photo paysage */}
            <div
              className="absolute inset-0 bg-cover bg-center hidden md:block"
              style={{ backgroundImage: `url('/images/mariages/couverts-fleurs.jpg')` }}
            />
            {/* Gradient pour lisibilité */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-10 left-0 right-0 text-center">
              <p className="font-serif text-2xl md:text-4xl italic font-light text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                Sublimez votre plus beau jour
              </p>
            </div>
            <p className="absolute bottom-3 right-4 text-[9px] text-white/70 font-light drop-shadow-md">
              © Bastien Norrington
            </p>
          </div>
          <div className="bg-[#faf8f5] px-6 md:px-16 lg:px-24 py-6 md:py-8">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-light mb-2" style={{ color: '#b8935a' }}>
              Jour J
            </p>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl mb-2 font-light" style={{ color: '#2d2a26' }}>
              Fleurs de mariage
            </h2>
            <p className="text-sm md:text-base text-[#2d2a26]/60 font-light mb-3 max-w-xl">
              Des créations pensées sur mesure pour sublimer votre histoire, du bouquet aux décors de réception.
            </p>
            <Link
              href="/mariages"
              className="inline-block text-sm font-light border-b pb-0.5 transition-colors hover:text-[#b8935a] hover:border-[#b8935a]"
              style={{ color: '#2d2a26', borderColor: '#2d2a26' }}
            >
              Découvrir l'univers mariage →
            </Link>
          </div>
        </div>

        {/* Flèches */}
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

      {/* Dots */}
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
