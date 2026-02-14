'use client';

import Link from 'next/link';
import { featuredProducts } from '@/lib/mock-data';
import ProductCard from '@/components/ui/ProductCard';

const FeaturedProducts = () => {
  const bestSellers = featuredProducts.slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-[#f5f0eb]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[#c4a47a] luxury-label mb-3">
            Sélection
          </p>
          <h2 className="font-serif text-2xl md:text-4xl text-[#2d2a26] mb-6">
            Nos bouquets du moment
          </h2>
          <div className="gold-separator" />
        </div>

        {/* Products Grid — 2 cols on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/boutique"
            className="btn-luxury border border-[#c4a47a] text-[#c4a47a] hover:bg-[#c4a47a] hover:text-white"
          >
            Voir toute la collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
