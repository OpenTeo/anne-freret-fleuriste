'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { categories } from '@/lib/mock-data';

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

function BoutiqueContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Bouquets');
  const [isLoading, setIsLoading] = useState(true);

  const allCategories = categories.filter(c => c !== 'Plantes');

  // Charger les produits depuis l'API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch('/api/products?active=true');
        const data = await res.json();
        // Normaliser les données pour compatibilité avec ProductCard
        const normalizedProducts = (data.products || []).map((p: any) => ({
          ...p,
          image: p.images?.[0] || '',
          inStock: p.in_stock ?? true,
          reviewCount: p.review_count || 0,
          tags: p.tags || [],
        }));
        setProducts(normalizedProducts);
        setFilteredProducts(normalizedProducts);
      } catch (error) {
        console.error('Erreur chargement produits:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filtrer par catégorie
  useEffect(() => {
    let filtered = [...products];

    filtered = filtered.filter(product => product.category === selectedCategory);

    setFilteredProducts(filtered);
  }, [selectedCategory, products]);

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-20">
        
        {/* Category Filter */}
        <section id="boutique-filtres" className="pt-6 pb-5 md:pt-7 md:pb-6 border-b border-[#b8935a]/20 bg-white/60 backdrop-blur-sm sticky top-[84px] md:top-[108px] z-30">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#b8935a] mb-1">Sélection</p>
                <h2 className="font-serif text-2xl text-[#2d2a26] font-light">Choisissez votre univers floral</h2>
              </div>
              <div className="hidden md:block text-[#6b6560] luxury-label">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
              </div>
            </div>
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-1">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-5 py-2.5 transition-all duration-300 border whitespace-nowrap text-[11px] md:text-[12px] uppercase tracking-[0.14em] ${
                    selectedCategory === category
                      ? 'bg-[#2d2a26] text-white border-[#2d2a26]'
                      : 'bg-white text-[#2d2a26] border-[#b8935a]/20 hover:border-[#b8935a] hover:text-[#b8935a]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="pt-6 pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            {isLoading ? (
              <div className="text-center py-20">
                <div className="text-[#2d2a26]/60">Chargement des produits...</div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#b8935a] mb-2">Collection en cours</p>
                    <h2 className="text-3xl md:text-4xl font-serif text-[#2d2a26] font-light">
                      {selectedCategory}
                    </h2>
                  </div>
                  <div className="text-[#6b6560] text-sm md:text-base font-light">
                    {filteredProducts.length} création{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7 lg:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

              </>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-2xl font-serif text-[#2d2a26] mb-6 font-light">
                  Aucun produit trouvé
                </h3>
                <div className="gold-separator mb-6"></div>
                <p className="text-[#6b6560] mb-10 font-light">
                  Aucun produit ne correspond à votre sélection actuelle.
                </p>
                <button
                  onClick={() => setSelectedCategory('Bouquets')}
                  className="btn-luxury bg-[#b8935a] text-white hover:bg-[#b8956a]"
                >
                  Voir les bouquets
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function Boutique() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-[#2d2a26]">Chargement...</div>
      </div>
    }>
      <BoutiqueContent />
    </Suspense>
  );
}
