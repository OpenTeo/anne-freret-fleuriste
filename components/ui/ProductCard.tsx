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
      <div className="relative aspect-[3/4] overflow-hidden mb-3 md:mb-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-500"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="space-y-1 md:space-y-2">
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-[#c4a47a]">{product.category}</p>
        <h3 className="font-serif text-sm md:text-xl lg:text-2xl text-[#2d2a26] group-hover:text-[#c4a47a] transition-colors leading-tight font-light">
          {product.name}
        </h3>
        <p className="text-[#2d2a26]/50 text-[11px] md:text-sm font-light">
          À partir de {formatPrice(product.price)} €
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;