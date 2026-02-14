'use client';

import { testimonials } from '@/lib/mock-data';

const Testimonials = () => {
  const featured = testimonials.slice(0, 3);

  return (
    <section className="py-24 md:py-32 bg-[#f5f0eb]">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[#c4a47a] text-[10px] tracking-[0.2em] uppercase mb-4 font-light">
            Témoignages
          </p>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#2d2a26] mb-8 font-light">
            Nos clients témoignent
          </h2>
          <div className="flex justify-center">
            <div className="w-16 h-px bg-[#c4a47a]"></div>
          </div>
        </div>

        {/* Testimonials - Sans cards, très épuré */}
        <div className="space-y-16 md:space-y-20">
          {featured.map((t, i) => (
            <div key={i} className="text-center">
              <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-[#2d2a26] italic mb-8 leading-relaxed font-light max-w-3xl mx-auto">
                "{t.comment}"
              </blockquote>
              <div className="space-y-1">
                <p className="text-[#2d2a26] text-sm md:text-base font-light">
                  {t.name}
                </p>
                <p className="text-[#2d2a26]/60 text-[10px] tracking-[0.2em] uppercase font-light">
                  Client vérifié
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;