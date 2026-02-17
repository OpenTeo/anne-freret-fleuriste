'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { blogPosts } from '@/lib/mock-data';

const CATEGORIES = [
  'Tous',
  'Conseils', 
  'Inspiration',
  'Saisons',
  'La marque',
  'Mariages',
  'Pratique'
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredPosts = selectedCategory === 'Tous' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <Header />
      <main className="bg-[#faf8f5] min-h-screen pt-20">
        
        {/* Hero Section with photo */}
        <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1600&q=80)' }}
          />
          <div className="absolute inset-0 bg-[#2d2a26]/50" />
          <div className="relative z-10 text-center px-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#c4a47a] mb-6">
              Le Journal Floral
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
              Conseils & Inspirations
            </h1>
            <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-6"></div>
            <p className="text-lg text-white/80 font-light leading-relaxed max-w-xl mx-auto">
              Nos secrets de fleuriste, inspirations saisonnières et idées 
              pour sublimer votre quotidien avec des fleurs.
            </p>
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
            
            <div className="flex flex-wrap gap-3 justify-center">
              {CATEGORIES.map((category) => (
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
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#2d2a26] font-light text-lg">
                  Aucun article trouvé dans cette catégorie.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredPosts.map((post) => (
                  <Link 
                    key={post.id} 
                    href={`/blog/${post.slug}`}
                    className="group bg-white overflow-hidden hover:bg-[#faf8f5] transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden mb-6">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category */}
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-4">
                        {post.category}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-serif text-[#2d2a26] mb-4 leading-tight group-hover:text-[#c4a47a] transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-[#2d2a26] font-light leading-relaxed mb-6">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-[#2d2a26] font-light">
                          {new Date(post.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="text-[#2d2a26] font-light">
                          {post.readTime}
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-[#c4a47a]/20">
                        <span className="text-[#c4a47a] group-hover:text-[#b8956a] transition-colors underline">
                          Lire la suite
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-6">
                Newsletter
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif text-[#2d2a26] mb-8">
                Restez Inspiré
              </h2>
              
              <div className="w-16 h-px bg-[#c4a47a] mx-auto mb-8"></div>
              
              <p className="text-xl text-[#2d2a26] font-light mb-12 leading-relaxed">
                Recevez nos derniers conseils floraux et inspirations directement dans votre boîte mail.
              </p>
              
              <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 border border-[#e8e0d8] text-[#2d2a26] font-light focus:outline-none focus:border-[#c4a47a] transition-colors"
                />
                <button className="bg-[#c4a47a] text-white px-8 py-3 hover:bg-[#b8956a] transition-colors duration-300 whitespace-nowrap">
                  S'abonner
                </button>
              </div>
              
              <p className="text-[#2d2a26] font-light text-sm mt-4">
                Pas de spam, juste des conseils floraux de qualité.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}