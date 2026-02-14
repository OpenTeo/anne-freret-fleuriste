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
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-transparent mb-4 group-hover:shadow-lg transition-all duration-700">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-[#c4a47a] text-white text-[10px] font-medium px-2.5 py-1 tracking-[0.2em] uppercase">
            Coup de cœur
          </span>
        )}
      </div>

      {/* Content */}
      {product.category && (
        <div className="mb-1">
          <span className="luxury-label text-[#c4a47a] text-[10px]">
            {product.category}
          </span>
        </div>
      )}
      
      <h3 className="font-serif text-lg text-[#2d2a26] mb-2 group-hover:text-[#c4a47a] transition-colors leading-tight">
        {product.name}
      </h3>
      
      <div className="flex items-center gap-1">
        <span className="luxury-label text-[#c4a47a] text-[11px]">
          {product.sizes ? 'Dès' : ''}
        </span>
        <span className="text-[#2d2a26] text-base luxury-price font-light">
          {formatPrice(product.price)} €
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
