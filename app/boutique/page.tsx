'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { mockProducts, categories } from '@/lib/mock-data';

function BoutiqueContent() {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Tous');

  const allCategories = ['Tous', ...categories];

  useEffect(() => {
    let filtered = [...mockProducts];

    // Filter by category
    if (selectedCategory !== 'Tous') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory]);

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-20">
        
        {/* Hero Section */}
        <section className="py-20 bg-[#f5f0eb]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl text-[#2d2a26] mb-8 font-serif font-light">
                Notre Boutique
              </h1>
              <div className="gold-separator mb-8"></div>
              <p className="text-xl text-[#6b6560] max-w-2xl mx-auto font-light leading-relaxed">
                Découvrez toutes nos créations florales, bouquets et arrangements 
                pour chaque occasion de la vie.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-12 border-b border-[#b8935a]/20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-500 border luxury-label ${
                    selectedCategory === category
                      ? 'bg-[#b8935a] text-white border-[#b8935a]'
                      : 'bg-transparent text-[#2d2a26] border-[#b8935a]/30 hover:bg-[#b8935a] hover:text-white hover:border-[#b8935a]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-8">
            {filteredProducts.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-2xl font-serif text-[#2d2a26] font-light">
                    {selectedCategory === 'Tous' ? 'Toutes nos créations' : selectedCategory}
                  </h2>
                  <div className="text-[#6b6560] luxury-label">
                    {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-10">
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
                  onClick={() => setSelectedCategory('Tous')}
                  className="btn-luxury bg-[#b8935a] text-white hover:bg-[#b8956a]"
                >
                  Voir tous les produits
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