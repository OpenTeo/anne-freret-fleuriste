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
  featured?: boolean;
}

const ProductCard = ({ product, className = '', featured = false }: ProductCardProps) => {
  const formatPrice = (price: number | string) => {
    return Number(price).toFixed(2).replace('.', ',');
  };

  return (
    <Link 
      href={`/produit/${product.slug}`}
      className={`group block ${className}`}
    >
      <article className="bg-white border border-[#e8e0d8]/70 overflow-hidden transition-all duration-500 hover:shadow-[0_18px_45px_rgba(45,42,38,0.08)] hover:-translate-y-1">
        <div className={`relative overflow-hidden ${featured ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="bg-white/92 text-[#2d2a26] text-[9px] uppercase tracking-[0.16em] px-2.5 py-1 border border-[#e8e0d8]">
              {product.category}
            </span>
            {product.featured && (
              <span className="bg-[#b8935a] text-white text-[9px] uppercase tracking-[0.16em] px-2.5 py-1">
                Signature
              </span>
            )}
          </div>
        </div>

        <div className="p-4 md:p-5 bg-[#fffdfa]">
          <h3 className={`font-serif text-[#2d2a26] group-hover:text-[#b8935a] transition-colors leading-tight font-light mb-2 ${featured ? 'text-lg md:text-2xl' : 'text-base md:text-xl'}`}>
            {product.name}
          </h3>
          <p className="text-sm text-[#2d2a26]/58 font-light leading-relaxed line-clamp-2 mb-3">
            {product.description}
          </p>
          <div className="flex items-center justify-between gap-3 border-t border-[#e8e0d8]/70 pt-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#b8935a]/80 mb-1">À partir de</p>
              <p className="text-[#2d2a26] text-lg md:text-xl font-serif">{formatPrice(product.price)} €</p>
            </div>
            <div className="text-right">
              {product.rating && product.reviewCount ? (
                <StarRating rating={product.rating} count={product.reviewCount} />
              ) : (
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#2d2a26]/35">Voir le produit</span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;