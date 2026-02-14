import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import Testimonials from '@/components/sections/Testimonials';
import { blogPosts } from '@/lib/mock-data';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        
        {/* Categories */}
        <section className="py-12 md:py-16 bg-[#f5f0eb]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center mb-8">
              <p className="text-[#b8956a] text-xs tracking-[0.25em] uppercase mb-3">Nos univers</p>
              <h2 className="font-serif text-2xl md:text-3xl text-[#2d2a26]">Explorez nos collections</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { name: 'Bouquets', img: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Designsanstitre_35.png?v=1706808037' },
                { name: 'Mariages', img: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/2_1eed40b5-fab8-414d-9819-7f2592160295.png?v=1684426098' },
                { name: 'Deuil', img: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/9D21A555-DA13-4A1B-B926-909320B670FB.jpg?v=1729195556' },
                { name: 'Sur mesure', img: 'https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798' },
              ].map(cat => (
                <a key={cat.name} href="/boutique" className="group relative aspect-[3/4] overflow-hidden rounded-sm">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-white font-serif text-sm md:text-lg">{cat.name}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <FeaturedProducts />
        
        {/* Engagement */}
        <section className="py-16 md:py-20 bg-[#ffffff]">
          <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
            <p className="text-[#b8956a] text-xs tracking-[0.25em] uppercase mb-3">Notre engagement</p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#2d2a26] mb-5 leading-snug">
              Des fleurs fraîches,<br />un savoir-faire artisanal
            </h2>
            <p className="text-[#6b6560] text-sm leading-relaxed mb-10">
              Chaque bouquet est composé avec soin par nos fleuristes passionnés. 
              Nous sélectionnons les plus belles fleurs de saison pour vous offrir 
              des créations uniques, livrées en toute fraîcheur.
            </p>
            <div className="flex justify-center gap-8 md:gap-14">
              <div>
                <p className="text-[#b8956a] font-serif text-2xl md:text-3xl mb-1">72h</p>
                <p className="text-[#6b6560] text-[10px] md:text-xs uppercase tracking-wider">Fraîcheur</p>
              </div>
              <div>
                <p className="text-[#b8956a] font-serif text-2xl md:text-3xl mb-1">17</p>
                <p className="text-[#6b6560] text-[10px] md:text-xs uppercase tracking-wider">Avis 5★</p>
              </div>
              <div>
                <p className="text-[#b8956a] font-serif text-2xl md:text-3xl mb-1">100%</p>
                <p className="text-[#6b6560] text-[10px] md:text-xs uppercase tracking-wider">Artisanal</p>
              </div>
            </div>
          </div>
        </section>

        {/* Le Journal Floral */}
        <section className="py-16 md:py-20 bg-[#faf8f5]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10 md:mb-12">
              <p className="text-[#b8956a] text-xs tracking-[0.25em] uppercase mb-3">Notre journal</p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#2d2a26] mb-4">
                Le Journal Floral
              </h2>
              <p className="text-[#6b6560] text-lg leading-relaxed max-w-2xl mx-auto">
                Découvrez nos conseils d'experts et nos inspirations florales
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogPosts.slice(0, 3).map((post) => (
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
                            month: 'short'
                          })}
                        </span>
                        <span>{post.readTime}</span>
                      </div>
                      <span className="text-[#b8956a] group-hover:underline">
                        Lire →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Link to all articles */}
            <div className="text-center mt-10">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 bg-[#b8956a] text-white px-8 py-3 rounded-full font-medium hover:bg-[#a08354] transition-colors"
              >
                Tous nos articles
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
