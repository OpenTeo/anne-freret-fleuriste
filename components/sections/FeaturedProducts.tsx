'use client';

import Link from 'next/link';
import { featuredProducts } from '@/lib/mock-data';
import ProductCard from '@/components/ui/ProductCard';

const FeaturedProducts = () => {
  // Show specific categories in order, skip Deuil on homepage
  const showCategories = ['Bouquets', 'Plantes'];
  const grouped = showCategories
    .map(cat => ({
      category: cat,
      items: featuredProducts.filter(p => p.category === cat).slice(0, 4)
    }))
    .filter(g => g.items.length > 0);

  return (
    <section className="py-24 md:py-32 bg-[#faf8f5]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[#c4a47a] text-[10px] tracking-[0.2em] uppercase mb-4 font-light">
            Sélection
          </p>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#2d2a26] mb-8 font-light">
            Nos créations
          </h2>
          <div className="flex justify-center mb-8">
            <div className="w-16 h-px bg-[#c4a47a]"></div>
          </div>
          <p className="text-[#2d2a26]/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Une sélection de nos bouquets les plus appréciés, 
            créés avec passion par nos fleuristes
          </p>
        </div>

        {/* Products grouped by category */}
        <div className="space-y-12 md:space-y-16 mb-16 md:mb-20">
          {grouped.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="h-px flex-1 bg-[#e8e0d8]"></div>
                <h3 className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#c4a47a] whitespace-nowrap">
                  {group.category}
                </h3>
                <div className="h-px flex-1 bg-[#e8e0d8]"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12">
                {group.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/boutique"
            className="text-[#2d2a26] text-sm md:text-base underline underline-offset-4 hover:text-[#c4a47a] transition-colors font-light"
          >
            Voir toute la collection →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
