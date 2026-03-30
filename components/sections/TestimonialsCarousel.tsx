'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  author: string;
  rating: number;
  text: string;
  verified: boolean;
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: 'r1',
    author: 'Marie L.',
    rating: 5,
    text: 'Absolument magnifique ! Les fleurs étaient fraîches et le bouquet a tenu plus de 10 jours. Je recommande vivement.',
    verified: true
  },
  {
    id: 'r4',
    author: 'Claire B.',
    rating: 5,
    text: 'C\'est la troisième fois que je commande et je ne suis jamais déçue. Qualité constante et service impeccable.',
    verified: true
  },
  {
    id: 'r7',
    author: 'Nathalie P.',
    rating: 5,
    text: 'Un vrai bonheur de recevoir ces fleurs ! L\'odeur est divine et elles illuminent mon salon depuis une semaine.',
    verified: true
  },
  {
    id: 'r8',
    author: 'François H.',
    rating: 5,
    text: 'Parfait pour un anniversaire de mariage. Ma femme a adoré. Merci Anne Freret !',
    verified: true
  },
  {
    id: 'r11',
    author: 'Camille A.',
    rating: 5,
    text: 'Fidèle cliente depuis l\'ouverture. Anne a un talent fou pour les compositions. Toujours un plaisir.',
    verified: true
  },
  {
    id: 'r2',
    author: 'Sophie D.',
    rating: 5,
    text: 'Livraison rapide et soignée. Le bouquet était encore plus beau que sur la photo. Ma mère était ravie !',
    verified: true
  }
];

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Charger les avis mis en avant depuis la DB
  useEffect(() => {
    const loadFeaturedReviews = async () => {
      try {
        const res = await fetch('/api/reviews?featured=true&limit=6');
        const data = await res.json();
        
        if (data.reviews && data.reviews.length > 0) {
          const formattedReviews = data.reviews.map((review: any) => ({
            id: review.id,
            author: review.author_name,
            rating: review.rating,
            text: review.text,
            verified: review.verified_purchase || false,
          }));
          setTestimonials(formattedReviews);
        }
      } catch (error) {
        console.error('Erreur chargement avis mis en avant:', error);
        // Garder les avis fallback
      }
    };

    loadFeaturedReviews();
  }, []);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 md:py-24 bg-white border-y border-[#e8e0d8]">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#b8935a] text-[10px] tracking-[0.2em] uppercase mb-4 font-light">
            Témoignages
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2d2a26] mb-6 font-light">
            Ils nous font confiance
          </h2>
          <div className="flex justify-center mb-6">
            <div className="w-12 h-px bg-[#b8935a]"></div>
          </div>
          
          {/* Rating summary */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5 text-[#b8935a]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[#2d2a26] text-lg font-light">4.8 / 5</span>
          </div>
          <p className="text-[#2d2a26]/50 text-xs tracking-[0.15em] uppercase font-light">
            Basé sur 238 avis clients
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4 md:px-8"
                >
                  <div className="text-center">
                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${
                            star <= testimonial.rating
                              ? 'text-[#b8935a]'
                              : 'text-[#e8e0d8]'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="font-serif text-lg md:text-xl lg:text-2xl text-[#2d2a26] mb-8 leading-relaxed font-light max-w-2xl mx-auto">
                      {testimonial.text}
                    </blockquote>

                    {/* Author */}
                    <div className="space-y-1">
                      <p className="text-[#2d2a26] text-sm md:text-base font-light">
                        {testimonial.author}
                      </p>
                      {testimonial.verified && (
                        <p className="text-[#b8935a] text-[10px] tracking-[0.2em] uppercase font-light">
                          Achat vérifié
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#b8935a] w-6'
                    : 'bg-[#e8e0d8] hover:bg-[#b8935a]/50'
                }`}
                aria-label={`Aller à l'avis ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
