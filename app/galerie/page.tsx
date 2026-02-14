'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Galerie() {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const categories = [
    'Toutes',
    'Bouquets de mariée',
    'Compositions florales',
    'Bouquets quotidiens',
    'Événements spéciaux'
  ];

  const galleryImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85',
      title: 'Bouquet de mariée champêtre',
      category: 'Bouquets de mariée',
      description: 'Composition romantique aux tons pastel avec roses, pivoines et eucalyptus.'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&q=85',
      title: 'Centre de table élégant',
      category: 'Compositions florales',
      description: 'Arrangement sophistiqué pour dîner d\'exception.'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=85',
      title: 'Bouquet du jour',
      category: 'Bouquets quotidiens',
      description: 'Création fraîche avec fleurs de saison.'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=85',
      title: 'Décoration événementielle',
      category: 'Événements spéciaux',
      description: 'Aménagement floral pour événement corporatif.'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=85',
      title: 'Bouquet exotique',
      category: 'Bouquets de mariée',
      description: 'Mariage tropical avec anthurium et orchidées.'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=85',
      title: 'Composition moderne',
      category: 'Compositions florales',
      description: 'Design contemporain aux lignes épurées.'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=85',
      title: 'Bouquet champêtre',
      category: 'Bouquets quotidiens',
      description: 'Naturel et authentique, parfait pour toute occasion.'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1563241527-3004b7ce2ad4?w=800&q=85',
      title: 'Installation artistique',
      category: 'Événements spéciaux',
      description: 'Création artistique pour exposition florale.'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=85',
      title: 'Bouquet classique',
      category: 'Bouquets quotidiens',
      description: 'Élégance intemporelle avec roses rouges.'
    },
    {
      id: 10,
      url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=85',
      title: 'Table d\'honneur',
      category: 'Compositions florales',
      description: 'Mise en scène florale pour table des mariés.'
    },
    {
      id: 11,
      url: 'https://images.unsplash.com/photo-1578766073628-e65ab8e0e495?w=800&q=85',
      title: 'Composition printanière',
      category: 'Bouquets quotidiens',
      description: 'Fraîcheur du printemps en bouquet.'
    },
    {
      id: 12,
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85',
      title: 'Décoration murale',
      category: 'Événements spéciaux',
      description: 'Installation florale murale pour événement.'
    }
  ];

  const filteredImages = selectedCategory === 'Toutes' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image: any) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <Header />
      
      <main className="bg-[#faf8f5] min-h-screen pt-20">
        
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-8">
                Galerie Photo
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2d2a26] mb-8 leading-tight">
                Nos Plus Belles Créations
              </h1>
              
              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light max-w-3xl mx-auto leading-relaxed">
                Découvrez l'art floral d'Anne Freret à travers une sélection de nos plus 
                belles réalisations, témoins de notre passion et de notre savoir-faire.
              </p>
            </div>
          </div>
        </section>

        {/* Filtres */}
        <section className="py-12 border-b border-[#c4a47a]/20">
          <div className="container mx-auto px-6 lg:px-8">
            
            <div className="text-center mb-8">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-4">
                Filtrer par catégorie
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 border text-sm ${
                    selectedCategory === category
                      ? 'bg-[#c4a47a] text-white border-[#c4a47a]'
                      : 'bg-transparent text-[#2d2a26] border-[#c4a47a]/30 hover:bg-[#c4a47a] hover:text-white hover:border-[#c4a47a]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-[#2d2a26] font-light text-sm">
                <span className="text-[#c4a47a]">{filteredImages.length}</span> création(s) 
                {selectedCategory !== 'Toutes' && (
                  <span> dans {selectedCategory}</span>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Galerie */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            
            {/* Grid de photos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredImages.map((image) => (
                <div 
                  key={image.id}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(image)}
                >
                  <div className="relative overflow-hidden bg-white">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    {/* Overlay au hover */}
                    <div className="absolute inset-0 bg-[#2d2a26]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                        <p className="text-white font-light text-sm">Voir en grand</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-2">
                      {image.category}
                    </div>
                    <h3 className="text-lg font-serif text-[#2d2a26] mb-2">
                      {image.title}
                    </h3>
                    <p className="text-[#2d2a26] font-light text-sm leading-relaxed">
                      {image.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                Votre Projet
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif text-[#2d2a26] mb-8">
                Une Vision pour Votre Événement ?
              </h2>
              
              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light mb-12 leading-relaxed">
                Inspiré par nos créations ? Discutons ensemble de votre projet floral 
                pour créer quelque chose d'unique qui vous ressemble.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                <a
                  href="/contact"
                  className="bg-[#c4a47a] text-white px-8 py-4 hover:bg-[#b8956a] transition-colors duration-300"
                >
                  Discuter de mon projet
                </a>
                <a
                  href="/boutique"
                  className="text-[#c4a47a] underline hover:text-[#b8956a] transition-colors"
                >
                  Voir nos créations
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-[#2d2a26]/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 w-10 h-10 bg-[#c4a47a] hover:bg-[#b8956a] rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="bg-white rounded overflow-hidden">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-contain"
              />
              
              <div className="p-6">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-2">
                  {selectedImage.category}
                </div>
                <h3 className="text-xl font-serif text-[#2d2a26] mb-3">
                  {selectedImage.title}
                </h3>
                <p className="text-[#2d2a26] font-light leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}