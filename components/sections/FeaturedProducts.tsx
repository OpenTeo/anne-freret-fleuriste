'use client';

import Link from 'next/link';
import { featuredProducts } from '@/lib/mock-data';
import ProductCard from '@/components/ui/ProductCard';

const FeaturedProducts = () => {
  const bestSellers = featuredProducts.slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-[#f5f0eb]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[#b8956a] text-xs tracking-[0.25em] uppercase mb-3">
            Sélection
          </p>
          <h2 className="font-serif text-2xl md:text-4xl text-[#2d2a26] mb-4">
            Nos bouquets du moment
          </h2>
          <div className="w-10 h-px bg-[#b8956a] mx-auto" />
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
            className="inline-block border border-[#b8956a] text-[#b8956a] px-6 md:px-8 py-3 text-xs md:text-sm tracking-wider uppercase hover:bg-[#b8956a] hover:text-white transition-all duration-300"
          >
            Voir toute la collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
