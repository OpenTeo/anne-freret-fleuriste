'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const slides = [
  {
    href: '/boutique',
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454',
    subtitle: 'Créations florales d\'exception',
    title: 'Nos Bouquets',
    cta: 'Découvrir la collection',
  },
  {
    href: '/mariages',
    image: 'https://fleuriste-annefreret.com/cdn/shop/files/1_2898336f-1c54-4008-a6e6-cfed21832288.png',
    subtitle: 'Votre jour, nos fleurs',
    title: 'Mariages',
    cta: 'Voir nos prestations',
  },
  {
    href: '/boutique?cat=fleuriste',
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
    subtitle: 'Composition unique du jour',
    title: 'Le choix du fleuriste',
    cta: 'Se laisser surprendre',
  },
  {
    href: '/boutique?cat=deuil',
    image: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/9D21A555-DA13-4A1B-B926-909320B670FB.jpg?v=1729195556',
    subtitle: 'Avec respect et délicatesse',
    title: 'Deuil & Hommages',
    cta: 'Voir les compositions',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl">
      {/* Slides */}
      {slides.map((slide, i) => (
        <Link
          key={slide.href}
          href={slide.href}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            i === current 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
          style={{ pointerEvents: i === current ? 'auto' : 'none' }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
          
          {/* Text content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 pb-16">
            <p 
              className={`text-white/70 text-[11px] tracking-[0.25em] uppercase mb-2 transition-all duration-700 delay-100 ${
                i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {slide.subtitle}
            </p>
            <h2 
              className={`text-white font-serif text-3xl font-bold mb-4 transition-all duration-700 delay-200 ${
                i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {slide.title}
            </h2>
            <span 
              className={`inline-block text-white text-[13px] font-medium tracking-wide border border-white/40 px-5 py-2.5 rounded-full backdrop-blur-sm transition-all duration-700 delay-300 ${
                i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              {slide.cta} →
            </span>
          </div>
        </Link>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(i); }}
            className={`transition-all duration-500 rounded-full ${
              i === current 
                ? 'w-6 h-2 bg-white' 
                : 'w-2 h-2 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Subtle top-right category count */}
      <div className="absolute top-4 right-4 text-white/50 text-[11px] tracking-wider font-light">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </div>
  );
}
