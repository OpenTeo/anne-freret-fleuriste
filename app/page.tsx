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

        {/* Trust bar avis — délimite hero et produits */}
        <div className="flex items-center justify-center gap-2 py-2.5 bg-[#2d2a26]">
          <span className="text-[9px] md:text-[10px] text-white/70">4.8 / 5</span>
          <div className="flex">
            {[1,2,3,4,5].map(s => (
              <svg key={s} className={`w-2.5 h-2.5 ${s <= 4 ? 'text-[#c4a47a]' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[9px] md:text-[10px] text-white/70 uppercase tracking-wider">238 avis clients</span>
        </div>

        {/* SECTION NOS CRÉATIONS */}
        <FeaturedProducts />

        {/* BANNIÈRE GARANTIES — illustrations ligne fine artisanales */}
        <section className="py-12 md:py-16 border-y border-[#e8e0d8]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
              {/* Commandez en ligne */}
              <div className="text-center">
                <div className="h-14 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
                  </svg>
                </div>
                <p className="text-sm md:text-base font-serif text-[#2d2a26] mb-1">Commandez en ligne</p>
                <p className="text-xs text-[#2d2a26]/40 leading-relaxed">Choisissez la création<br />qui vous ressemble.</p>
              </div>

              {/* Préparée avec amour */}
              <div className="text-center">
                <div className="h-14 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <p className="text-sm md:text-base font-serif text-[#2d2a26] mb-1">Préparée avec amour</p>
                <p className="text-xs text-[#2d2a26]/40 leading-relaxed">Dans notre atelier<br />par nos artisans fleuristes.</p>
              </div>

              {/* Expédiée avec soin */}
              <div className="text-center">
                <div className="h-14 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <p className="text-sm md:text-base font-serif text-[#2d2a26] mb-1">Expédiée avec soin</p>
                <p className="text-xs text-[#2d2a26]/40 leading-relaxed">Emballage sur mesure,<br />100% adapté aux fleurs.</p>
              </div>

              {/* Livrée en un éclair */}
              <div className="text-center">
                <div className="h-14 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <p className="text-sm md:text-base font-serif text-[#2d2a26] mb-1">Livrée en un éclair</p>
                <p className="text-xs text-[#2d2a26]/40 leading-relaxed">En quelques heures,<br />partout en France.</p>
              </div>
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
                    <a key={plan.name} href={`/abonnement?plan=${plan.name.toLowerCase()}`} className={`block p-4 bg-white transition-all duration-300 hover:border-[#c4a47a] cursor-pointer ${plan.popular ? 'border-2 border-[#c4a47a]' : 'border border-[#e8e0d8]'}`}>
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

        {/* SECTION DIY */}
        <section className="py-16 md:py-24 bg-[#f5f0eb]">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="relative h-80 md:h-96 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=85"
                  alt="Box DIY florale"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[#c4a47a] text-[10px] tracking-[0.3em] uppercase mb-4">Nouveau</p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-4">
                  Ateliers DIY
                </h2>
                <div className="w-12 h-px bg-[#c4a47a] mb-6"></div>
                <p className="text-[#2d2a26]/60 text-base leading-relaxed mb-6">
                  Recevez une box complète avec fleurs fraîches ou séchées, outils et guide illustré. 
                  Créez votre propre arrangement floral chez vous — aucune expérience requise.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-[#2d2a26]/70">
                    <span className="text-[#c4a47a]">✦</span> 3 box au choix dès 39.90€
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#2d2a26]/70">
                    <span className="text-[#c4a47a]">✦</span> Fleurs fraîches, séchées ou les deux
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#2d2a26]/70">
                    <span className="text-[#c4a47a]">✦</span> Guide illustré pas à pas inclus
                  </div>
                </div>
                <a href="/diy" className="inline-block text-[#2d2a26] text-sm tracking-wide underline underline-offset-8 decoration-[#c4a47a] hover:text-[#c4a47a] transition-colors">
                  Découvrir les box DIY →
                </a>
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