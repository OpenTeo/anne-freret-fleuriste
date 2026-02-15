'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const slides = [
  {
    href: '/boutique',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1400&q=85',
    subtitle: 'Créations florales d\'exception',
    title: 'Nos Bouquets',
    cta: 'Découvrir →',
  },
  {
    href: '/mariages',
    image: 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=1400&q=85',
    subtitle: 'Votre jour, nos fleurs',
    title: 'Mariages',
    cta: 'Découvrir →',
  },
  {
    href: '/boutique',
    image: 'https://images.pexels.com/photos/4466260/pexels-photo-4466260.jpeg?auto=compress&cs=tinysrgb&w=1400',
    subtitle: 'Sélection de saison',
    title: 'Le bouquet du mois',
    cta: 'Découvrir →',
  },
  {
    href: '/blog/art-composer-bouquet-champetre',
    image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1400',
    subtitle: 'Le Journal Floral',
    title: 'L\'art du bouquet champêtre',
    cta: 'Lire l\'article →',
  },
  {
    href: '/abonnement',
    image: '',
    subtitle: '',
    title: '',
    cta: '',
    isGraphic: true,
  },
];

export default function HeroSlider() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchMoved = useRef(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  // Touch swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    touchMoved.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    if (Math.abs(touchStartX.current - touchEndX.current) > 10) {
      touchMoved.current = true;
    }
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  const handleSlideClick = (href: string) => {
    if (!touchMoved.current) {
      router.push(href);
    }
  };

  // Auto-advance every 6s
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div 
      className="relative w-full aspect-[9/16] md:h-[85vh] md:aspect-auto overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.href}
          onClick={() => handleSlideClick(slide.href)}
          className={`absolute inset-0 cursor-pointer transition-all duration-700 ease-in-out ${
            i === current 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
          style={{ pointerEvents: i === current ? 'auto' : 'none' }}
        >
          {/* Slide graphique abonnement */}
          {'isGraphic' in slide && slide.isGraphic ? (
            <div className="w-full h-full bg-[#faf8f5] flex items-center justify-center px-6 md:px-16">
              <div className={`max-w-4xl w-full text-center transition-all duration-700 ${i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <p className="text-[#c4a47a] text-[10px] md:text-[11px] tracking-[0.3em] uppercase mb-4 md:mb-6">Nouveau</p>
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#2d2a26] mb-4 md:mb-6">L'Abonnement Floral</h2>
                <p className="text-[#2d2a26]/60 text-sm md:text-base mb-8 md:mb-12 max-w-lg mx-auto">Des fleurs fraîches de saison livrées chez vous, chaque mois</p>
                
                {/* 3 formules */}
                <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto mb-8 md:mb-12">
                  <div className="border border-[#e8e0d8] p-4 md:p-6 bg-white">
                    <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#c4a47a] mb-2">Essentiel</p>
                    <p className="font-serif text-2xl md:text-4xl text-[#2d2a26]">39<span className="text-lg md:text-2xl">.90€</span></p>
                    <p className="text-[#2d2a26]/40 text-[10px] md:text-xs mt-1">/mois</p>
                  </div>
                  <div className="border-2 border-[#c4a47a] p-4 md:p-6 bg-white relative">
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#c4a47a] text-white text-[8px] md:text-[9px] tracking-[0.15em] uppercase px-3 py-0.5">Populaire</div>
                    <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#c4a47a] mb-2">Signature</p>
                    <p className="font-serif text-2xl md:text-4xl text-[#2d2a26]">49<span className="text-lg md:text-2xl">.90€</span></p>
                    <p className="text-[#2d2a26]/40 text-[10px] md:text-xs mt-1">/mois</p>
                  </div>
                  <div className="border border-[#e8e0d8] p-4 md:p-6 bg-white">
                    <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#c4a47a] mb-2">Prestige</p>
                    <p className="font-serif text-2xl md:text-4xl text-[#2d2a26]">69<span className="text-lg md:text-2xl">.90€</span></p>
                    <p className="text-[#2d2a26]/40 text-[10px] md:text-xs mt-1">/mois</p>
                  </div>
                </div>

                <span className="inline-block text-[#2d2a26] text-sm tracking-wide underline underline-offset-8 decoration-[#c4a47a]">
                  Découvrir nos formules →
                </span>
              </div>
            </div>
          ) : (
            <>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-bottom"
              />
              {/* Text content — bandeau blanc en bas pour lisibilité */}
              <div className="absolute bottom-0 left-0 right-0">
                <div className="bg-white/90 backdrop-blur-sm p-5 md:p-8 pb-12 md:pb-14">
                  <div className="max-w-4xl">
                    <p 
                      className={`text-[#c4a47a] text-[11px] md:text-xs tracking-[0.25em] uppercase mb-2 md:mb-3 transition-all duration-700 delay-100 ${
                        i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      {slide.subtitle}
                    </p>
                    <h1 
                      className={`text-[#2d2a26] font-serif text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6 transition-all duration-700 delay-200 leading-tight ${
                        i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      {slide.title}
                    </h1>
                    <span 
                      className={`inline-block text-[#2d2a26] text-sm tracking-wide underline underline-offset-8 decoration-[#c4a47a] hover:text-[#c4a47a] transition-all duration-500 delay-300 ${
                        i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      {slide.cta}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      {/* Dots - Plus petits et subtils */}
      <div className="absolute bottom-4 md:bottom-6 left-8 md:left-12 flex gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(i); }}
            className={`transition-all duration-500 ${
              i === current 
                ? 'w-8 h-1 bg-[#2d2a26]' 
                : 'w-1 h-1 bg-[#2d2a26]/30 hover:bg-[#2d2a26]/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}