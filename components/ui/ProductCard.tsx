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
      <div className="relative aspect-[3/4] overflow-hidden mb-6 md:mb-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-500"
          loading="lazy"
        />
      </div>

      {/* Content - Très espacé */}
      <div className="space-y-3 md:space-y-4">
        <h3 className="font-serif text-lg md:text-xl lg:text-2xl text-[#2d2a26] group-hover:text-[#c4a47a] transition-colors leading-tight font-light">
          {product.name}
        </h3>
        
        <p className="text-[#2d2a26]/70 text-sm md:text-base font-light">
          dès {formatPrice(product.price)} €
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;