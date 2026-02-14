'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const slides = [
  {
    href: '/boutique',
    image: 'https://images.unsplash.com/photo-1471696035578-3d8c78d99571?w=1400&q=85',
    subtitle: 'Créations florales d\'exception',
    title: 'Nos Bouquets',
    cta: 'Découvrir →',
  },
  {
    href: '/mariages',
    image: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=1400&q=85',
    subtitle: 'Votre jour, nos fleurs',
    title: 'Mariages',
    cta: 'Découvrir →',
  },
  {
    href: '/boutique?cat=fleuriste',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=1400&q=85',
    subtitle: 'Composition unique du jour',
    title: 'Le choix du fleuriste',
    cta: 'Découvrir →',
  },
  {
    href: '/la-marque',
    image: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=1400&q=85',
    subtitle: 'Savoir-faire artisanal',
    title: 'Notre histoire',
    cta: 'Découvrir →',
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

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full aspect-[2/3] md:h-[85vh] md:aspect-auto overflow-hidden">
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
          {/* Gradient overlay — plus fort pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          
          {/* Text content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 pb-20 md:pb-24">
            <div className="max-w-4xl">
              <p 
                className={`text-white/90 text-[11px] md:text-xs tracking-[0.25em] uppercase mb-3 md:mb-5 transition-all duration-700 delay-100 ${
                  i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {slide.subtitle}
              </p>
              <h1 
                className={`text-white font-serif text-4xl md:text-6xl lg:text-7xl mb-6 md:mb-10 transition-all duration-700 delay-200 leading-tight ${
                  i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
              >
                {slide.title}
              </h1>
              <span 
                className={`inline-block text-white text-sm md:text-base tracking-wide underline underline-offset-8 decoration-white/50 hover:decoration-[#c4a47a] hover:text-[#c4a47a] transition-all duration-500 delay-300 ${
                  i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                {slide.cta}
              </span>
            </div>
          </div>
        </Link>
      ))}

      {/* Dots - Plus petits et subtils */}
      <div className="absolute bottom-8 md:bottom-12 left-8 md:left-16 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(i); }}
            className={`transition-all duration-500 ${
              i === current 
                ? 'w-8 h-1 bg-white' 
                : 'w-1 h-1 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}