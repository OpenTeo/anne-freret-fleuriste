'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

const slides = [
  {
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/7ACE65B9-6559-4B06-8BF7-0290B4194167.jpg?v=1736713275',
    label: 'Sélection de saison',
    title: 'Le bouquet du mois',
    href: '/boutique',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_29_8a157ca1-e7ec-4bdd-8c6e-fc4a07a4af4c.png?v=1709222874',
    label: 'Abonnement Floral',
    title: 'Des fleurs chaque mois',
    href: '/abonnement',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Couronne3.jpg?v=1743008466',
    label: 'Hommages & Recueillement',
    title: 'Compositions de deuil',
    href: '/deuil',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/2_1eed40b5-fab8-414d-9819-7f2592160295.png?v=1684426098',
    label: 'Jour J',
    title: 'Fleurs de mariage',
    href: '/mariages',
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden bg-[#faf8f5]">
      
      {/* ═══════════ MOBILE: Bright & Airy ═══════════ */}
      <div className="md:hidden">
        <div className="relative h-[60vh]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454')`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[#faf8f5]/80 backdrop-blur-sm px-10 py-5 text-center">
              <h1 className="font-serif text-3xl tracking-wide" style={{ color: '#b8935a' }}>
                Bouquets
              </h1>
              <p className="text-[10px] tracking-[0.3em] uppercase mt-1 font-light" style={{ color: '#6b6560' }}>
                L&apos;artisanat de la fleur
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 py-8 bg-[#faf8f5]">
          <p className="text-[10px] tracking-[0.3em] uppercase text-center font-light mb-1" style={{ color: '#b8935a' }}>
            Nos collections
          </p>
          <p className="font-serif text-xl text-center mb-6" style={{ color: '#2d2a26' }}>
            Pour chaque instant, une émotion fleurie.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { href: '/boutique', img: slides[0].image, label: 'Nos bouquets' },
              { href: '/abonnement', img: slides[1].image, label: 'Abonnements' },
              { href: '/deuil', img: slides[2].image, label: 'Deuil' },
              { href: '/mariages', img: slides[3].image, label: 'Mariages' },
            ].map((cat) => (
              <Link key={cat.label} href={cat.href} className="relative aspect-square overflow-hidden rounded-2xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                  style={{ backgroundImage: `url('${cat.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-light tracking-wider uppercase">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════ DESKTOP: Carousel pleine largeur ═══════════ */}
      <div className="hidden md:block">
        {/* Image carousel */}
        <div className="relative h-[70vh] overflow-hidden">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
              />
            </div>
          ))}

          {/* Flèches navigation */}
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors rounded-full"
            aria-label="Slide précédent"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors rounded-full"
            aria-label="Slide suivant"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Texte sous l'image + dots */}
        <div className="bg-[#faf8f5] px-8 lg:px-16 xl:px-24 py-8">
          <p className="text-[11px] tracking-[0.3em] uppercase font-light mb-2" style={{ color: '#b8935a' }}>
            {slides[current].label}
          </p>
          <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl mb-4 font-light" style={{ color: '#2d2a26' }}>
            {slides[current].title}
          </h2>
          <Link 
            href={slides[current].href}
            className="inline-block text-sm font-light border-b pb-0.5 transition-colors hover:text-[#b8935a] hover:border-[#b8935a]"
            style={{ color: '#2d2a26', borderColor: '#2d2a26' }}
          >
            Découvrir →
          </Link>

          {/* Dots */}
          <div className="flex items-center gap-2 mt-6">
            {slides.map((_, i) => (
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
      </div>
    </section>
  );
};

export default Hero;
