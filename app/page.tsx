import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import Testimonials from '@/components/sections/Testimonials';
import HeroSlider from '@/components/sections/HeroSlider';
import { blogPosts } from '@/lib/mock-data';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-14 md:pt-20">
        {/* NOUVEAU HERO - Grille visuelle de catégories */}
        <section className="py-6 md:py-12 bg-[#faf8f5]">
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

            {/* Mobile: Slider plein écran avec catégories */}
            <div className="md:hidden">
              <HeroSlider />
            </div>
          </div>
        </section>

        {/* BARRE DE CONFIANCE */}
        <section className="py-6 bg-[#f5f0eb]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left gap-6 md:gap-8">
              {/* Avis clients */}
              <div className="flex items-center gap-3 text-sm text-[#2d2a26]">
                <div className="w-10 h-10 rounded-full bg-[#b8956a]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#b8956a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold block text-[#2d2a26]">5/5 Excellent</span>
                  <span className="text-xs text-[#2d2a26]/60">17 avis clients vérifiés</span>
                </div>
              </div>
              {/* Livraison France */}
              <div className="flex items-center gap-3 text-sm text-[#2d2a26]">
                <div className="w-10 h-10 rounded-full bg-[#b8956a]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#b8956a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold block text-[#2d2a26]">Livraison France</span>
                  <span className="text-xs text-[#2d2a26]/60">Partout en métropole</span>
                </div>
              </div>
              {/* Fraîcheur */}
              <div className="flex items-center gap-3 text-sm text-[#2d2a26]">
                <div className="w-10 h-10 rounded-full bg-[#b8956a]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#b8956a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold block text-[#2d2a26]">Fraîcheur garantie</span>
                  <span className="text-xs text-[#2d2a26]/60">72h ou remboursé</span>
                </div>
              </div>
              {/* Paiement sécurisé */}
              <div className="flex items-center gap-3 text-sm text-[#2d2a26]">
                <div className="w-10 h-10 rounded-full bg-[#b8956a]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#b8956a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <div>
                  <span className="font-semibold block text-[#2d2a26]">Paiement sécurisé</span>
                  <span className="text-xs text-[#2d2a26]/60">CB, Visa, Mastercard</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BARRE DE RECHERCHE RAPIDE */}
        <section className="py-12 bg-[#ffffff]">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <form className="flex flex-col md:flex-row gap-4 md:gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Votre code postal ou ville..."
                  className="w-full px-4 py-3 border border-[#c4a47a]/30 rounded-sm focus:outline-none focus:border-[#c4a47a] transition-all duration-500 text-sm font-light italic font-serif"
                />
              </div>
              <div className="flex-1">
                <select className="w-full px-4 py-3 border border-[#c4a47a]/30 rounded-sm focus:outline-none focus:border-[#c4a47a] transition-all duration-500 text-sm bg-white font-light font-serif">
                  <option value="" className="font-serif italic">Occasion</option>
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
                  className="btn-luxury w-full md:w-auto bg-[#c4a47a] text-white hover:bg-[#b8956a]"
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
        <section className="py-20 md:py-24 bg-[#ffffff] relative">
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(45deg,transparent_25%,rgba(196,164,122,0.5)_25%,rgba(196,164,122,0.5)_50%,transparent_50%,transparent_75%,rgba(196,164,122,0.5)_75%)] bg-[length:20px_20px]"></div>
          
          <div className="max-w-2xl mx-auto px-4 md:px-6 text-center relative">
            <p className="text-[#c4a47a] luxury-label mb-3">Notre engagement</p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#2d2a26] mb-6 leading-snug">
              Des fleurs fraîches,<br />un savoir-faire artisanal
            </h2>
            <div className="gold-separator mb-8"></div>
            <p className="text-[#6b6560] text-sm leading-relaxed mb-12 font-light">
              Chaque bouquet est composé avec soin par nos fleuristes passionnés. 
              Nous sélectionnons les plus belles fleurs de saison pour vous offrir 
              des créations uniques, livrées en toute fraîcheur.
            </p>
            <div className="flex justify-center gap-12 md:gap-16">
              <div className="fade-in">
                <p className="text-[#c4a47a] font-serif text-3xl md:text-4xl mb-2 font-light">72h</p>
                <p className="text-[#6b6560] luxury-label">Fraîcheur</p>
              </div>
              <div className="fade-in">
                <p className="text-[#c4a47a] font-serif text-3xl md:text-4xl mb-2 font-light">17</p>
                <p className="text-[#6b6560] luxury-label">Avis 5★</p>
              </div>
              <div className="fade-in">
                <p className="text-[#c4a47a] font-serif text-3xl md:text-4xl mb-2 font-light">100%</p>
                <p className="text-[#6b6560] luxury-label">Artisanal</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION BLOG - Le Journal Floral */}
        <section className="py-20 md:py-24 bg-[#faf8f5]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-[#c4a47a] luxury-label mb-3">Notre journal</p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#2d2a26] mb-6 font-light">
                Le Journal Floral
              </h2>
              <div className="gold-separator mb-6"></div>
              <p className="text-[#6b6560] text-lg leading-relaxed max-w-2xl mx-auto font-light">
                Découvrez nos conseils d'experts et nos inspirations florales
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogPosts.slice(0, 3).map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className="group bg-[#ffffff] rounded-sm overflow-hidden luxury-lift transition-all duration-700"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="luxury-label text-[#c4a47a]">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl md:text-2xl text-[#2d2a26] mb-4 group-hover:text-[#c4a47a] transition-colors line-clamp-2 font-light leading-tight">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[#6b6560] text-sm md:text-base leading-relaxed mb-6 line-clamp-3 font-light">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs md:text-sm text-[#999]">
                      <div className="flex items-center gap-4">
                        <span className="font-light">
                          {new Date(post.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                        <span className="font-light">{post.readTime}</span>
                      </div>
                      <span className="text-[#c4a47a] group-hover:underline luxury-label">
                        Lire →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Link to all articles */}
            <div className="text-center mt-12">
              <Link 
                href="/blog"
                className="btn-luxury inline-flex items-center gap-3 bg-[#c4a47a] text-white hover:bg-[#b8956a]"
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