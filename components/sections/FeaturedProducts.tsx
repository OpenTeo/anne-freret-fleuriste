'use client';

import Link from 'next/link';
import { featuredProducts } from '@/lib/mock-data';
import ProductCard from '@/components/ui/ProductCard';

const FeaturedProducts = () => {
  const bestSellers = featuredProducts.slice(0, 3);

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

        {/* Products Grid - 3 colonnes avec beaucoup d'espace */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16 md:mb-20">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA - Lien souligné */}
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