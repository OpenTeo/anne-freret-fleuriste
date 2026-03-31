import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import Guarantees from '@/components/sections/Guarantees';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import BrandIdentity from '@/components/sections/BrandIdentity';
import { blogPosts } from '@/lib/mock-data';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-14 md:pt-20 bg-[#faf8f5]">
        
        {/* 1. HERO - Accroche émotionnelle + CTA */}
        <Hero />

        {/* 2. FEATURED PRODUCTS - Montrer les produits immédiatement */}
        <FeaturedProducts />

        {/* 3. GUARANTEES - Rassurer: livraison, fraîcheur, artisanal */}
        <Guarantees />

        {/* 4. TESTIMONIALS - Social proof */}
        <TestimonialsCarousel />

        {/* 5. BRAND IDENTITY - Section papier signature (différenciation) */}
        <BrandIdentity />

        {/* 6. SECTION ABONNEMENT - Upsell abonnement */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <p className="text-[#b8935a] text-[10px] tracking-[0.3em] uppercase mb-4">Imaginez</p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-4">
                  Chaque mois, une surprise florale
                </h2>
                <div className="w-12 h-px bg-[#b8935a] mb-6"></div>
                <p className="text-[#2d2a26]/60 text-base leading-relaxed mb-6">
                  Imaginez rentrer chez vous et découvrir un bouquet de saison, choisi avec soin par notre fleuriste. Plus qu'un abonnement : une parenthèse enchantée qui transforme votre quotidien, mois après mois.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-[#2d2a26]/70">
                    <svg className="w-5 h-5 text-[#b8935a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    3 formules pensées pour vous — dès 39.90€/mois
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#2d2a26]/70">
                    <svg className="w-5 h-5 text-[#b8935a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Livrée chez vous, sans frais — partout en France
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#2d2a26]/70">
                    <svg className="w-5 h-5 text-[#b8935a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Liberté totale — pausez ou arrêtez quand vous voulez
                  </div>
                </div>
                <a href="/abonnement" className="inline-block text-[#2d2a26] text-sm tracking-wide underline underline-offset-8 decoration-[#b8935a] hover:text-[#b8935a] transition-colors">
                  Commencer mon voyage floral →
                </a>
              </div>
              <div className="bg-[#faf8f5] p-8 md:p-10">
                <div className="space-y-4">
                  {[
                    { name: 'Essentiel', price: '39.90', desc: 'La douceur mensuelle', popular: false },
                    { name: 'Signature', price: '49.90', desc: 'L\'équilibre parfait', popular: true },
                    { name: 'Prestige', price: '69.90', desc: 'L\'excellence absolue', popular: false },
                  ].map((plan) => (
                    <a key={plan.name} href={`/abonnement?plan=${plan.name.toLowerCase()}`} className={`block p-4 bg-white transition-all duration-300 hover:border-[#b8935a] cursor-pointer ${plan.popular ? 'border-2 border-[#b8935a]' : 'border border-[#e8e0d8]'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-[#2d2a26]">{plan.name}</p>
                            {plan.popular && <span className="text-[8px] tracking-[0.1em] uppercase bg-[#b8935a] text-white px-2 py-0.5">Coup de cœur</span>}
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

        {/* 7. SECTION BLOG - Layout éditorial */}
        <section className="py-24 md:py-32 bg-[#faf8f5]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16 md:mb-20">
              <p className="text-[#b8935a] text-[10px] tracking-[0.2em] uppercase mb-4 font-light">
                Inspiration & Savoir-Faire
              </p>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#2d2a26] mb-8 font-light">
                Notre Carnet d'Atelier
              </h2>
              <div className="flex justify-center mb-8">
                <div className="w-16 h-px bg-[#b8935a]"></div>
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
                    <p className="text-[#b8935a] text-[10px] tracking-[0.2em] uppercase font-light">
                      {blogPosts[0].category}
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#2d2a26] group-hover:text-[#b8935a] transition-colors font-light leading-tight">
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
                      <p className="text-[#b8935a] text-[10px] tracking-[0.2em] uppercase font-light">
                        {post.category}
                      </p>
                      <h3 className="font-serif text-lg md:text-xl text-[#2d2a26] group-hover:text-[#b8935a] transition-colors font-light leading-tight">
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
                className="text-[#2d2a26] text-sm underline underline-offset-4 hover:text-[#b8935a] transition-colors font-light"
              >
                Plongez dans nos inspirations →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
