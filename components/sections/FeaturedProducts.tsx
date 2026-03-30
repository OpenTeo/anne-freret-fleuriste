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
        // Normaliser et filtrer les produits featured
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

  // Show all featured products except Deuil, max 8 total
  const excludeCategories = ['Deuil & Hommages'];
  const featuredProducts = products
    .filter(p => !excludeCategories.includes(p.category))
    .slice(0, 8);
  
  // Group by category for display
  const categoriesOrder = ['Bouquets', 'Plantes', 'Mariages', 'Accessoires'];
  const grouped = categoriesOrder
    .map(cat => ({
      category: cat,
      items: featuredProducts.filter(p => p.category === cat)
    }))
    .filter(g => g.items.length > 0);

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
    <section className="py-12 md:py-20 bg-[#faf8f5]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[#b8935a] text-[10px] tracking-[0.2em] uppercase mb-3 font-light">
            Sélection
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#2d2a26] mb-4 font-light">
            Nos créations
          </h2>
          <p className="text-[#2d2a26]/50 text-sm md:text-base font-light max-w-lg mx-auto">
            Des fleurs fraîches, cueillies avec soin, livrées partout en France
          </p>
        </div>

        {/* Products grouped by category */}
        <div className="space-y-12 md:space-y-16 mb-16 md:mb-20">
          {grouped.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="h-px flex-1 bg-[#e8e0d8]"></div>
                <h3 className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#b8935a] whitespace-nowrap">
                  {group.category}
                </h3>
                <div className="h-px flex-1 bg-[#e8e0d8]"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12">
                {group.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/boutique"
            className="text-[#2d2a26] text-sm md:text-base underline underline-offset-4 hover:text-[#b8935a] transition-colors font-light"
          >
            Voir toute la collection →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
