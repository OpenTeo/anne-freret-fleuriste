'use client';

import Link from 'next/link';
import { Product } from '@/lib/mock-data';

const StarRating = ({ rating, count }: { rating: number; count: number }) => (
  <div className="flex items-center gap-1">
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-2.5 h-2.5 md:w-3 md:h-3 ${star <= Math.round(rating) ? 'text-[#b8935a]' : 'text-[#e8e0d8]'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <span className="text-[9px] md:text-[10px] text-[#2d2a26]/40">({count})</span>
  </div>
);

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
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-[#b8935a]">{product.category}</p>
        <h3 className="font-serif text-sm md:text-xl lg:text-2xl text-[#2d2a26] group-hover:text-[#b8935a] transition-colors leading-tight font-light">
          {product.name}
        </h3>
        {product.rating && product.reviewCount && (
          <StarRating rating={product.rating} count={product.reviewCount} />
        )}
        <p className="text-[#2d2a26]/50 text-[11px] md:text-sm font-light">
          À partir de {formatPrice(product.price)} €
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;