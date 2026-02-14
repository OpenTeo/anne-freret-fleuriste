'use client';

import { testimonials } from '@/lib/mock-data';

const Testimonials = () => {
  const featured = testimonials.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-[#ffffff]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#b8956a] text-sm tracking-[0.25em] uppercase mb-3">
            Témoignages
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-4">
            Ce que disent nos clients
          </h2>
          <div className="w-12 h-px bg-[#b8956a] mx-auto mb-4" />
          <p className="text-[#6b6560] text-sm">
            ⭐⭐⭐⭐⭐ 5/5 d&apos;après 17 avis
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((t, i) => (
            <div key={i} className="bg-[#ffffff] border border-[#e8e0d8] rounded-lg p-8">
              <div className="text-[#b8956a] text-sm mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-[#6b6560] text-sm leading-relaxed mb-6 line-clamp-4">
                &ldquo;{t.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#b8956a] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[#2d2a26] text-sm font-medium">{t.name}</p>
                  <p className="text-[#6b6560] text-xs">Client vérifié</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
