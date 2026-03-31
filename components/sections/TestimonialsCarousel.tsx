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
    text: 'Absolument magnifique ! Les fleurs étaient fraîches et le bouquet a tenu plus de 10 jours.',
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
    text: 'Un vrai bonheur de recevoir ces fleurs ! L\'odeur est divine et elles illuminent mon salon.',
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
    text: 'Fidèle cliente depuis l\'ouverture. Anne a un talent fou pour les compositions.',
    verified: true
  },
  {
    id: 'r2',
    author: 'Sophie D.',
    rating: 5,
    text: 'Livraison rapide et soignée. Le bouquet était encore plus beau que sur la photo.',
    verified: true
  }
];

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      }
    };

    loadFeaturedReviews();
  }, []);

  // Auto-advance every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3) % testimonials.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Get 3 testimonials to show
  const visibleTestimonials = [
    testimonials[currentIndex % testimonials.length],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section className="relative py-16 md:py-24 bg-[#faf8f5] border-y border-[#e8e0d8]">
      {/* Decorative quote mark - giant serif */}
      <div className="absolute top-16 left-4 md:left-12 text-[#b8935a]/10 font-serif text-[200px] md:text-[300px] leading-none pointer-events-none select-none">
        "
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#b8935a] text-[10px] tracking-[0.2em] uppercase mb-4 font-light">
            Témoignages
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#2d2a26] mb-4 font-light">
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
                  className="w-4 h-4 text-[#b8935a]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[#2d2a26] text-base font-light">4.8 / 5</span>
          </div>
          <p className="text-[#2d2a26]/40 text-[10px] tracking-[0.15em] uppercase font-light">
            238 avis clients
          </p>
        </div>

        {/* Three testimonials side by side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          {visibleTestimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 md:p-8 transition-all duration-500"
              style={{
                animation: `fadeIn 0.5s ease-out ${idx * 0.1}s both`
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-3 h-3 ${
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
              <blockquote className="text-[#2d2a26] text-sm md:text-base leading-relaxed font-light mb-6 min-h-[80px]">
                {testimonial.text}
              </blockquote>

              {/* Author */}
              <div className="border-t border-[#e8e0d8] pt-4">
                <p className="text-[#2d2a26] text-sm font-light mb-1">
                  {testimonial.author}
                </p>
                {testimonial.verified && (
                  <p className="text-[#b8935a] text-[9px] tracking-[0.15em] uppercase font-light">
                    Achat vérifié
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index * 3)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / 3) === index
                  ? 'bg-[#b8935a] w-6'
                  : 'bg-[#e8e0d8] hover:bg-[#b8935a]/50'
              }`}
              aria-label={`Aller au groupe ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
