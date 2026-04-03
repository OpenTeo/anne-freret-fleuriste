'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  original_price?: number;
  image: string;
  images?: string[];
  featured: boolean;
  inStock: boolean;
  in_stock: boolean;
  tags: string[];
  sizes?: Array<{ name: string; price: number }>;
  variants?: Array<{ name: string; price?: number }>;
  rating?: number;
  reviewCount?: number;
  review_count?: number;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch('/api/products?active=true');
        const data = await res.json();
        const normalizedProducts = (data.products || [])
          .filter((p: any) => p.featured && p.is_active)
          .map((p: any) => ({
            ...p,
            image: p.images?.[0] || '',
            inStock: p.in_stock ?? true,
            reviewCount: p.review_count || 0,
            tags: p.tags || [],
          }));
        setProducts(normalizedProducts);
      } catch (error) {
        console.error('Erreur chargement produits featured:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const excludeCategories = ['Deuil & Hommages', 'Mariages'];
  const featuredProducts = products
    .filter(p => !excludeCategories.includes(p.category))
    .slice(0, 6);

  if (isLoading) {
    return (
      <section className="py-12 md:py-20 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <div className="text-[#2d2a26]/60">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-[#faf8f5]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#b8935a] text-[10px] tracking-[0.2em] uppercase mb-4 font-light">
            Sélection
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#2d2a26] mb-6 font-light">
            Ceux qui font craquer
          </h2>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-px bg-[#b8935a]"></div>
          </div>
          <p className="text-[#2d2a26]/50 text-sm md:text-base font-light max-w-lg mx-auto">
            Des fleurs fraîches, cueillies avec soin, livrées partout en France
          </p>
        </div>

        {/* Grille uniforme 2 colonnes mobile, 3 colonnes desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/boutique"
            className="inline-block text-[#2d2a26] text-sm underline underline-offset-8 decoration-[#b8935a] hover:text-[#b8935a] transition-colors font-light tracking-wide"
          >
            Découvrir toute la collection →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
