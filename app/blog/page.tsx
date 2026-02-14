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
      <main className="pt-20">
        
        {/* Hero Section */}
        <section className="py-16 md:py-20 bg-[#faf8f5]">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2d2a26] mb-4">
              Le Journal Floral
            </h1>
            <p className="text-[#6b6560] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Découvrez nos conseils d'experts, nos inspirations saisonnières et les secrets 
              de l'art floral normand à travers nos articles passionnés.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-[#ffffff] border-b border-[#e8e0d8]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm md:text-base rounded-full transition-all ${
                    selectedCategory === category
                      ? 'bg-[#b8956a] text-white'
                      : 'bg-[#faf8f5] text-[#2d2a26] hover:bg-[#e8e0d8] border border-[#e8e0d8]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 md:py-16 bg-[#faf8f5]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#6b6560] text-lg">
                  Aucun article trouvé dans cette catégorie.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredPosts.map((post) => (
                  <Link 
                    key={post.id} 
                    href={`/blog/${post.slug}`}
                    className="group bg-[#ffffff] rounded-lg overflow-hidden border border-[#e8e0d8] hover:shadow-lg transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category Badge */}
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-medium text-[#b8956a] bg-[#b8956a]/10 rounded-full">
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl md:text-2xl text-[#2d2a26] mb-3 group-hover:text-[#b8956a] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-[#6b6560] text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs md:text-sm text-[#999]">
                        <div className="flex items-center gap-4">
                          <span>
                            {new Date(post.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                          <span>{post.readTime}</span>
                        </div>
                        <span className="text-[#b8956a] group-hover:underline">
                          Lire la suite →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}