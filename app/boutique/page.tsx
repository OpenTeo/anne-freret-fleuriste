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
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-[#f5f0eb] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-repeat bg-center opacity-[0.24]"
            style={{
              backgroundImage: 'url(/images/brand/papier-emballage.jpg)',
              backgroundSize: '460px',
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,240,235,0.92),rgba(250,248,245,0.95))]" />
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#b8935a] mb-4 font-light">
                Boutique florale
              </p>
              <h1 className="text-4xl md:text-6xl text-[#2d2a26] mb-6 font-serif font-light leading-tight">
                Des créations pensées pour offrir, célébrer et fleurir le quotidien.
              </h1>
              <div className="gold-separator mb-8"></div>
              <p className="text-lg md:text-xl text-[#6b6560] max-w-3xl mx-auto font-light leading-relaxed mb-10">
                Bouquets de saison, compositions signature et attentions fleuries composés à la main dans notre atelier de Saint-Pair-sur-Mer, avec retrait en boutique ou livraison locale.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-left">
                {[
                  'Livraison locale le jour même pour toute commande passée avant 12h',
                  'Créations artisanales composées à la main à Saint-Pair-sur-Mer',
                  'Retrait en boutique ou livraison dans nos zones locales',
                ].map((item) => (
                  <div key={item} className="border border-[#b8935a]/10 bg-[#fffdfa]/85 backdrop-blur-sm px-4 py-4 text-sm text-[#2d2a26]/70 font-light leading-relaxed shadow-sm">
                    <span className="inline-block text-[#b8935a] mr-2">✦</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 md:py-10 border-b border-[#b8935a]/20 bg-white/60 backdrop-blur-sm sticky top-[56px] md:top-[108px] z-30">
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
        <section className="py-12 md:py-16 lg:py-20">
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

                <div className="mt-14 md:mt-16 relative overflow-hidden border border-[#b8935a]/12 bg-white p-6 md:p-8 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-10 items-center">
                  <div
                    className="absolute inset-0 bg-repeat bg-center opacity-[0.10]"
                    style={{
                      backgroundImage: 'url(/images/brand/papier-emballage.jpg)',
                      backgroundSize: '420px',
                    }}
                  />
                  <div className="absolute inset-0 bg-white/82" />
                  <div className="relative">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#b8935a] mb-3">Notre promesse</p>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#2d2a26] font-light mb-4 leading-tight">
                      Chaque bouquet est composé à la main dans notre atelier, avec le même soin qu’en boutique.
                    </h3>
                    <p className="text-[#2d2a26]/60 font-light leading-relaxed">
                      Pour une attention de dernière minute, un grand événement ou une livraison du quotidien, nous sélectionnons des fleurs fraîches et des harmonies pensées pour durer.
                    </p>
                  </div>
                  <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-[#2d2a26]/70 font-light">
                    <div className="border border-[#e8e0d8] bg-[#faf8f5]/92 px-4 py-4"><span className="block text-[#b8935a] mb-1">✦</span>Livraison locale le jour même avant 12h</div>
                    <div className="border border-[#e8e0d8] bg-[#faf8f5]/92 px-4 py-4"><span className="block text-[#b8935a] mb-1">✦</span>Retrait en boutique à Saint-Pair et dans nos autres adresses</div>
                    <div className="border border-[#e8e0d8] bg-[#faf8f5]/92 px-4 py-4"><span className="block text-[#b8935a] mb-1">✦</span>Paiement sécurisé et accompagnement humain</div>
                  </div>
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