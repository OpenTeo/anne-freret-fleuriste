'use client';

import Link from 'next/link';
import { Product } from '@/lib/mock-data';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return price.toFixed(2).replace('.', ',');
  };

  return (
    <Link 
      href={`/produit/${product.slug}`}
      className={`group block ${className}`}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#ffffff] border border-[#e8e0d8] mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-[#b8956a] text-white text-[10px] font-semibold px-2.5 py-1 tracking-wider uppercase">
            Coup de cœur
          </span>
        )}
      </div>

      {/* Content */}
      <h3 className="font-serif text-base text-[#2d2a26] mb-1 group-hover:text-[#b8956a] transition-colors">
        {product.name}
      </h3>
      
      <span className="text-[#b8956a] text-sm">
        {product.sizes ? 'À partir de ' : ''}{formatPrice(product.price)} €
      </span>
    </Link>
  );
};

export default ProductCard;
