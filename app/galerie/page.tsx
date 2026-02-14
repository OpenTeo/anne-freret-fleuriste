'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Camera, Eye, Heart, Filter, Grid, X } from 'lucide-react';

export default function Galerie() {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const categories = [
    'Toutes',
    'Bouquets de mariée',
    'Compositions florales',
    'Bouquets quotidiens',
    'Arrangements funéraires',
    'Événements spéciaux'
  ];

  const galleryImages = [
    {
      id: 1,
      url: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      title: 'Bouquet de mariée champêtre',
      category: 'Bouquets de mariée',
      description: 'Composition romantique aux tons pastel avec roses, pivoines et eucalyptus.'
    },
    {
      id: 2,
      url: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      title: 'Centre de table élégant',
      category: 'Compositions florales',
      description: 'Arrangement sophistiqué pour dîner d\'exception.'
    },
    {
      id: 3,
      url: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      title: 'Bouquet du jour',
      category: 'Bouquets quotidiens',
      description: 'Création fraîche avec fleurs de saison.'
    },
    {
      id: 4,
      url: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      title: 'Gerbe funéraire',
      category: 'Arrangements funéraires',
      description: 'Hommage respectueux aux tons blancs et verts.'
    },
    {
      id: 5,
      url: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      title: 'Décoration événementielle',
      category: 'Événements spéciaux',
      description: 'Aménagement floral pour événement corporatif.'
    },
    {
      id: 6,
      url: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      title: 'Bouquet exotique',
      category: 'Bouquets de mariée',
      description: 'Mariage tropical avec anthurium et orchidées.'
    },
    {
      id: 7,
      url: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      title: 'Composition moderne',
      category: 'Compositions florales',
      description: 'Design contemporain aux lignes épurées.'
    },
    {
      id: 8,
      url: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      title: 'Bouquet champêtre',
      category: 'Bouquets quotidiens',
      description: 'Naturel et authentique, parfait pour toute occasion.'
    },
    {
      id: 9,
      url: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      title: 'Installation artistique',
      category: 'Événements spéciaux',
      description: 'Création artistique pour exposition florale.'
    },
    {
      id: 10,
      url: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      title: 'Bouquet classique',
      category: 'Bouquets quotidiens',
      description: 'Élégance intemporelle avec roses rouges.'
    },
    {
      id: 11,
      url: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      title: 'Table d\'honneur',
      category: 'Compositions florales',
      description: 'Mise en scène florale pour table des mariés.'
    },
    {
      id: 12,
      url: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798',
      title: 'Couronne de deuil',
      category: 'Arrangements funéraires',
      description: 'Cercle de roses blanches et feuillages.'
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
      
      <main className="pt-20 bg-[#0a0a0a]">
        
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Camera className="w-6 h-6 text-[#c9a96e]" />
                <span className="text-[#c9a96e] text-sm font-medium uppercase tracking-wider">
                  Galerie photo
                </span>
                <Camera className="w-6 h-6 text-[#c9a96e]" />
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#f5f0eb] mb-6">
                Nos Plus Belles
                <span className="text-gradient block md:inline md:ml-4">Créations</span>
              </h1>
              
              <p className="text-xl text-[#f5f0eb]/70 max-w-3xl mx-auto leading-relaxed">
                Découvrez l'art floral d'Anne Freret à travers une sélection de nos plus 
                belles réalisations, témoins de notre passion et de notre savoir-faire.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#c9a96e]/10 text-center">
                <div className="text-3xl font-serif font-bold text-[#c9a96e] mb-2">500+</div>
                <div className="text-[#f5f0eb]/70 text-sm">Créations réalisées</div>
              </div>
              
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#c9a96e]/10 text-center">
                <div className="text-3xl font-serif font-bold text-[#7d8c6e] mb-2">50+</div>
                <div className="text-[#f5f0eb]/70 text-sm">Mariages accompagnés</div>
              </div>
              
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#c9a96e]/10 text-center">
                <div className="text-3xl font-serif font-bold text-[#c9a96e] mb-2">15</div>
                <div className="text-[#f5f0eb]/70 text-sm">Années d'expérience</div>
              </div>
              
              <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#c9a96e]/10 text-center">
                <div className="text-3xl font-serif font-bold text-[#7d8c6e] mb-2">100%</div>
                <div className="text-[#f5f0eb]/70 text-sm">Satisfaction client</div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="container mx-auto px-4 lg:px-8">
            
            {/* Filter Categories */}
            <div className="mb-16">
              <div className="flex items-center justify-center space-x-2 mb-8">
                <Filter className="w-5 h-5 text-[#c9a96e]" />
                <span className="text-[#f5f0eb] font-medium">Filtrer par catégorie</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-medium transition-all hover-lift ${
                      selectedCategory === category
                        ? 'bg-[#c9a96e] text-[#0a0a0a] shadow-lg shadow-[#c9a96e]/25'
                        : 'bg-[#1a1a1a] border border-[#c9a96e]/20 text-[#f5f0eb] hover:border-[#c9a96e]/50 hover:bg-[#c9a96e]/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <p className="text-[#f5f0eb]/60">
                  <span className="text-[#c9a96e] font-medium">{filteredImages.length}</span> photo(s) 
                  {selectedCategory !== 'Toutes' && (
                    <span> dans <span className="text-[#c9a96e]">{selectedCategory}</span></span>
                  )}
                </p>
              </div>
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {filteredImages.map((image) => (
                <div 
                  key={image.id}
                  className="break-inside-avoid bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#c9a96e]/10 hover:border-[#c9a96e]/30 transition-all cursor-pointer group hover-lift"
                  onClick={() => openLightbox(image)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <Eye className="w-8 h-8 text-white mx-auto mb-2" />
                        <p className="text-white text-sm font-medium">Voir en grand</p>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#c9a96e]/90 backdrop-blur-sm text-[#0a0a0a] px-3 py-1 rounded-full text-xs font-medium">
                        {image.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-[#f5f0eb] mb-2 line-clamp-1">
                      {image.title}
                    </h3>
                    <p className="text-[#f5f0eb]/60 text-sm line-clamp-2">
                      {image.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More (placeholder for future) */}
            {filteredImages.length >= 12 && (
              <div className="text-center mt-16">
                <button className="btn-secondary px-8 py-4 rounded-full font-medium">
                  Charger plus d'images
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-3xl p-8 md:p-12 border border-[#c9a96e]/10 text-center max-w-4xl mx-auto">
              <div className="w-20 h-20 bg-[#c9a96e]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-[#c9a96e]" />
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-[#f5f0eb] mb-4">
                Une vision pour votre projet ?
              </h2>
              
              <p className="text-xl text-[#f5f0eb]/70 mb-8 max-w-2xl mx-auto">
                Inspiré par nos créations ? Discutons ensemble de votre projet floral 
                pour créer quelque chose d'unique qui vous ressemble.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a
                  href="/contact"
                  className="btn-primary px-8 py-4 rounded-full text-lg font-semibold"
                >
                  Discuter de mon projet
                </a>
                <a
                  href="/boutique"
                  className="btn-secondary px-8 py-4 rounded-full text-lg font-semibold"
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
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#c9a96e]/20">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-contain"
              />
              
              <div className="p-6">
                <h3 className="font-serif text-xl text-[#f5f0eb] mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-[#c9a96e] text-sm font-medium mb-3">
                  {selectedImage.category}
                </p>
                <p className="text-[#f5f0eb]/70 leading-relaxed">
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