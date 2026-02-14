import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import Testimonials from '@/components/sections/Testimonials';
import { blogPosts } from '@/lib/mock-data';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* NOUVEAU HERO - Grille visuelle de catégories */}
        <section className="py-8 md:py-12 bg-[#faf8f5]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            {/* Desktop: 50% + 50% (2x2 grille) */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
              {/* Grande image gauche - Nos Bouquets */}
              <Link 
                href="/boutique" 
                className="group relative aspect-[4/5] overflow-hidden rounded-lg"
              >
                <img 
                  src="https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454"
                  alt="Nos Bouquets" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-white font-serif text-3xl lg:text-4xl font-bold text-center">
                    Nos Bouquets
                  </h2>
                </div>
              </Link>

              {/* 4 petites images droite */}
              <div className="grid grid-cols-2 gap-3">
                {/* Mariages */}
                <Link 
                  href="/mariages" 
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <img 
                    src="https://fleuriste-annefreret.com/cdn/shop/files/1_2898336f-1c54-4008-a6e6-cfed21832288.png"
                    alt="Mariages" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-white font-serif text-lg font-bold">Mariages</span>
                  </div>
                </Link>

                {/* Deuil & Hommages */}
                <Link 
                  href="/boutique?cat=deuil" 
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <img 
                    src="https://cdn.shopify.com/s/files/1/0295/6292/9231/files/9D21A555-DA13-4A1B-B926-909320B670FB.jpg?v=1729195556"
                    alt="Deuil & Hommages" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-white font-serif text-sm font-bold">Deuil & Hommages</span>
                  </div>
                </Link>

                {/* Le choix du fleuriste */}
                <Link 
                  href="/boutique?cat=fleuriste" 
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <img 
                    src="https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798"
                    alt="Le choix du fleuriste" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-white font-serif text-sm font-bold">Le choix du fleuriste</span>
                  </div>
                </Link>

                {/* Livraison */}
                <Link 
                  href="/livraison" 
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <img 
                    src="https://cdn.shopify.com/s/files/1/0295/6292/9231/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798"
                    alt="Livraison" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-white font-serif text-lg font-bold">Livraison</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Mobile: 1 colonne, cards horizontales */}
            <div className="md:hidden space-y-4">
              {/* Nos Bouquets */}
              <Link 
                href="/boutique" 
                className="group relative aspect-[3/2] overflow-hidden rounded-lg flex"
              >
                <img 
                  src="https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454"
                  alt="Nos Bouquets" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-start px-6">
                  <h2 className="text-white font-serif text-2xl font-bold">Nos Bouquets</h2>
                </div>
              </Link>

              <div className="grid grid-cols-2 gap-3">
                {/* Mariages */}
                <Link 
                  href="/mariages" 
                  className="group relative aspect-[3/4] overflow-hidden rounded-lg"
                >
                  <img 
                    src="https://fleuriste-annefreret.com/cdn/shop/files/1_2898336f-1c54-4008-a6e6-cfed21832288.png"
                    alt="Mariages" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="text-white font-serif text-sm font-bold">Mariages</span>
                  </div>
                </Link>

                {/* Deuil & Hommages */}
                <Link 
                  href="/boutique?cat=deuil" 
                  className="group relative aspect-[3/4] overflow-hidden rounded-lg"
                >
                  <img 
                    src="https://cdn.shopify.com/s/files/1/0295/6292/9231/files/9D21A555-DA13-4A1B-B926-909320B670FB.jpg?v=1729195556"
                    alt="Deuil & Hommages" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="text-white font-serif text-xs font-bold">Deuil & Hommages</span>
                  </div>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Le choix du fleuriste */}
                <Link 
                  href="/boutique?cat=fleuriste" 
                  className="group relative aspect-[3/4] overflow-hidden rounded-lg"
                >
                  <img 
                    src="https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798"
                    alt="Le choix du fleuriste" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="text-white font-serif text-xs font-bold">Le choix du fleuriste</span>
                  </div>
                </Link>

                {/* Livraison */}
                <Link 
                  href="/livraison" 
                  className="group relative aspect-[3/4] overflow-hidden rounded-lg"
                >
                  <img 
                    src="https://cdn.shopify.com/s/files/1/0295/6292/9231/products/presentationlivraisonAnneFreret_a1e26262-43ad-45c1-960a-20b40f6bca47.jpg?v=1747399798"
                    alt="Livraison" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="text-white font-serif text-sm font-bold">Livraison</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BARRE DE CONFIANCE */}
        <section className="py-4 bg-[#f5f0eb]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left gap-4 md:gap-8">
              <div className="flex items-center gap-2 text-sm text-[#2d2a26]">
                <span className="text-[#b8956a]">★★★★★</span>
                <span className="font-medium">5/5 — 17 avis clients vérifiés</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#2d2a26]">
                <svg className="w-4 h-4 text-[#b8956a]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">Livraison partout en France</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#2d2a26]">
                <svg className="w-4 h-4 text-[#b8956a]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Fraîcheur garantie 72h</span>
              </div>
            </div>
          </div>
        </section>

        {/* BARRE DE RECHERCHE RAPIDE */}
        <section className="py-8 bg-[#ffffff]">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <form className="flex flex-col md:flex-row gap-4 md:gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Votre code postal ou ville..."
                  className="w-full px-4 py-3 border border-[#e8e0d8] rounded-md focus:outline-none focus:border-[#b8956a] transition-colors text-sm"
                />
              </div>
              <div className="flex-1">
                <select className="w-full px-4 py-3 border border-[#e8e0d8] rounded-md focus:outline-none focus:border-[#b8956a] transition-colors text-sm bg-white">
                  <option value="">Occasion</option>
                  <option value="anniversaire">Anniversaire</option>
                  <option value="fete-des-meres">Fête des mères</option>
                  <option value="mariage">Mariage</option>
                  <option value="remerciements">Remerciements</option>
                  <option value="condoleances">Condoléances</option>
                  <option value="juste-pour-le-plaisir">Juste pour le plaisir</option>
                </select>
              </div>
              <div className="md:flex-none">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 md:px-8 py-3 bg-[#b8956a] text-white font-medium text-sm uppercase tracking-wider hover:bg-[#a08354] transition-colors rounded-md"
                >
                  VOIR LA SÉLECTION
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* SECTION BEST-SELLERS - FeaturedProducts avec nouveau titre */}
        <FeaturedProducts />
        
        {/* SECTION ENGAGEMENT */}
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

        {/* SECTION BLOG - Le Journal Floral */}
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

        {/* TÉMOIGNAGES */}
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}