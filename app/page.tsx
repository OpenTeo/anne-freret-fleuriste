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
      <main className="pt-14 md:pt-20 bg-[#faf8f5]">
        {/* HERO SLIDER - Plein écran mobile, 85vh desktop */}
        <section className="w-full">
          <HeroSlider />
        </section>

        {/* SECTION PROMESSE — accroche entre hero et créations */}
        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-px bg-[#c4a47a]"></div>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#2d2a26] mb-4 leading-relaxed">
              Des fleurs fraîches, cueillies avec soin,<br className="hidden md:block" /> livrées partout en France
            </h2>
            <p className="text-[#2d2a26]/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
              Depuis notre atelier à Saint-Pair-sur-Mer, nous composons chaque bouquet à la main avec des fleurs de saison sélectionnées chez les meilleurs producteurs.
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-[#2d2a26]/50 text-[11px] tracking-[0.2em] uppercase">
              <span>Livraison en 24h</span>
              <span>Fleurs de saison</span>
              <span>Fait main</span>
            </div>
          </div>
        </section>

        {/* SECTION NOS CRÉATIONS */}
        <FeaturedProducts />

        {/* SECTION ATELIER - Photo pleine largeur avec texte overlay */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=1400&q=85"
            alt="L'art floral depuis 2020"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-2xl px-4 md:px-6">
              <p className="text-[11px] tracking-[0.25em] uppercase mb-6 text-white/80">Saint-Pair-sur-Mer</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
                L'art floral depuis 2020
              </h2>
              <p className="text-white/90 text-base md:text-lg max-w-md mx-auto leading-relaxed">
                Chaque création naît de notre passion pour les fleurs et notre savoir-faire artisanal
              </p>
            </div>
          </div>
        </section>

        {/* SECTION ABONNEMENT */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <p className="text-[#c4a47a] text-[10px] tracking-[0.3em] uppercase mb-4">Nouveau</p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-4">
                  L'Abonnement Floral
                </h2>
                <div className="w-12 h-px bg-[#c4a47a] mb-6"></div>
                <p className="text-[#2d2a26]/60 text-base leading-relaxed mb-6">
                  Recevez chaque mois un bouquet de saison composé avec soin par notre fleuriste. Une surprise florale livrée directement chez vous.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-[#2d2a26]/70">
                    <svg className="w-5 h-5 text-[#c4a47a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    3 formules dès 39.90€/mois
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#2d2a26]/70">
                    <svg className="w-5 h-5 text-[#c4a47a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Livraison gratuite partout en France
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#2d2a26]/70">
                    <svg className="w-5 h-5 text-[#c4a47a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Sans engagement, annulation à tout moment
                  </div>
                </div>
                <a href="/abonnement" className="inline-block text-[#2d2a26] text-sm tracking-wide underline underline-offset-8 decoration-[#c4a47a] hover:text-[#c4a47a] transition-colors">
                  Découvrir nos formules →
                </a>
              </div>
              <div className="bg-[#faf8f5] p-8 md:p-10">
                <div className="space-y-4">
                  {[
                    { name: 'Essentiel', price: '39.90', desc: 'Bouquet de saison' },
                    { name: 'Signature', price: '49.90', desc: 'Sélection premium', popular: true },
                    { name: 'Prestige', price: '69.90', desc: "L'exception florale" },
                  ].map((plan) => (
                    <a key={plan.name} href="/abonnement" className={`block p-4 bg-white transition-all duration-300 hover:border-[#c4a47a] ${plan.popular ? 'border-2 border-[#c4a47a]' : 'border border-[#e8e0d8]'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-[#2d2a26]">{plan.name}</p>
                            {plan.popular && <span className="text-[8px] tracking-[0.1em] uppercase bg-[#c4a47a] text-white px-2 py-0.5">Populaire</span>}
                          </div>
                          <p className="text-xs text-[#2d2a26]/40">{plan.desc}</p>
                        </div>
                        <p className="font-serif text-lg text-[#2d2a26]">{plan.price}€<span className="text-xs text-[#2d2a26]/40">/mois</span></p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION BLOG - Layout éditorial */}
        <section className="py-24 md:py-32 bg-[#faf8f5]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16 md:mb-20">
              <p className="text-[#c4a47a] text-[10px] tracking-[0.2em] uppercase mb-4 font-light">
                Notre journal
              </p>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#2d2a26] mb-8 font-light">
                Le Journal Floral
              </h2>
              <div className="flex justify-center mb-8">
                <div className="w-16 h-px bg-[#c4a47a]"></div>
              </div>
            </div>
            
            {/* Layout éditorial - 1 grande + 2 petites */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Article principal - grande image */}
              {blogPosts[0] && (
                <Link 
                  href={`/blog/${blogPosts[0].slug}`}
                  className="group lg:row-span-2"
                >
                  <div className="aspect-[4/5] overflow-hidden mb-6">
                    <img
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="space-y-4">
                    <p className="text-[#c4a47a] text-[10px] tracking-[0.2em] uppercase font-light">
                      {blogPosts[0].category}
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#2d2a26] group-hover:text-[#c4a47a] transition-colors font-light leading-tight">
                      {blogPosts[0].title}
                    </h3>
                    <p className="text-[#2d2a26]/70 text-base leading-relaxed font-light">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-[10px] tracking-[0.2em] uppercase font-light text-[#2d2a26]/60">
                      <span>
                        {new Date(blogPosts[0].date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </span>
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Articles secondaires */}
              <div className="space-y-12">
                {blogPosts.slice(1, 3).map((post) => (
                  <Link 
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex gap-6"
                  >
                    <div className="w-32 flex-shrink-0 aspect-square overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <p className="text-[#c4a47a] text-[10px] tracking-[0.2em] uppercase font-light">
                        {post.category}
                      </p>
                      <h3 className="font-serif text-lg md:text-xl text-[#2d2a26] group-hover:text-[#c4a47a] transition-colors font-light leading-tight">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase font-light text-[#2d2a26]/60">
                        <span>
                          {new Date(post.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Link vers tous les articles */}
            <div className="text-center mt-16">
              <Link 
                href="/blog"
                className="text-[#2d2a26] text-sm underline underline-offset-4 hover:text-[#c4a47a] transition-colors font-light"
              >
                Tous nos articles →
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