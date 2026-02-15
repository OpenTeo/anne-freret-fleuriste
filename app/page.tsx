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
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#b8a590]">
                    {/* Écran avec petite fleur */}
                    <rect x="10" y="8" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
                    <line x1="20" y1="28" x2="28" y2="28" stroke="currentColor" strokeWidth="1" />
                    <line x1="24" y1="28" x2="24" y2="33" stroke="currentColor" strokeWidth="1" />
                    <line x1="19" y1="33" x2="29" y2="33" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    {/* Petite fleur sur l'écran */}
                    <circle cx="24" cy="16" r="1.5" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M24 14.5C24 14.5 25.5 13 25.5 11.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M24 14.5C24 14.5 22.5 13 22 11.8" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M24 17.5V21" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M24 19C25 18 26.5 18.5 26.5 18.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                    {/* Petite souris curseur */}
                    <path d="M30 20L32 22L30.5 22.5L31.5 24.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-sm md:text-base font-serif text-[#2d2a26] mb-1">Commandez en ligne</p>
                <p className="text-xs text-[#2d2a26]/40 leading-relaxed">Choisissez la création<br />qui vous ressemble.</p>
              </div>

              {/* Préparée avec amour */}
              <div className="text-center">
                <div className="h-14 flex items-center justify-center mb-4">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#b8a590]">
                    {/* Tige avec fleur simple élégante */}
                    <path d="M24 38V20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    <path d="M24 22C22 20 21 17 22 14C23 11 24 10 24 10C24 10 25 11 26 14C27 17 26 20 24 22Z" stroke="currentColor" strokeWidth="0.8" fill="none" />
                    {/* Pétales */}
                    <path d="M24 14C22 12 19 12 18 14C17 16 18.5 18 20 18.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
                    <path d="M24 14C26 12 29 12 30 14C31 16 29.5 18 28 18.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
                    {/* Petit cœur au sommet */}
                    <path d="M24 9C23.2 8.2 22 8 21.5 8.8C21 9.6 22 10.5 24 12C26 10.5 27 9.6 26.5 8.8C26 8 24.8 8.2 24 9Z" stroke="currentColor" strokeWidth="0.7" fill="none" />
                    {/* Feuille tige */}
                    <path d="M24 28C22 27 20 28 19 30" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M24 32C26 31 28 32 29 34" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-sm md:text-base font-serif text-[#2d2a26] mb-1">Préparée avec amour</p>
                <p className="text-xs text-[#2d2a26]/40 leading-relaxed">Dans notre atelier<br />par nos artisans fleuristes.</p>
              </div>

              {/* Expédiée avec soin */}
              <div className="text-center">
                <div className="h-14 flex items-center justify-center mb-4">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#b8a590]">
                    {/* Boîte cadeau ouverte avec fleur qui sort */}
                    <rect x="12" y="22" width="24" height="16" rx="1" stroke="currentColor" strokeWidth="1" />
                    <rect x="10" y="19" width="28" height="5" rx="1" stroke="currentColor" strokeWidth="1" />
                    <line x1="24" y1="19" x2="24" y2="38" stroke="currentColor" strokeWidth="1" />
                    {/* Ruban noeud */}
                    <path d="M24 19C22 17 20 16 19 17C18 18 19 19.5 24 19" stroke="currentColor" strokeWidth="0.8" fill="none" />
                    <path d="M24 19C26 17 28 16 29 17C30 18 29 19.5 24 19" stroke="currentColor" strokeWidth="0.8" fill="none" />
                    {/* Petite fleur sortant de la boîte */}
                    <path d="M24 19V13" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                    <circle cx="24" cy="11" r="2" stroke="currentColor" strokeWidth="0.7" fill="none" />
                    <circle cx="24" cy="11" r="0.5" fill="currentColor" />
                    {/* Petit cœur */}
                    <path d="M28 14C27.5 13.5 27 13.4 26.7 13.8C26.5 14.1 27 14.6 28 15.3C29 14.6 29.5 14.1 29.3 13.8C29 13.4 28.5 13.5 28 14Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  </svg>
                </div>
                <p className="text-sm md:text-base font-serif text-[#2d2a26] mb-1">Expédiée avec soin</p>
                <p className="text-xs text-[#2d2a26]/40 leading-relaxed">Emballage sur mesure,<br />100% adapté aux fleurs.</p>
              </div>

              {/* Livrée en un éclair */}
              <div className="text-center">
                <div className="h-14 flex items-center justify-center mb-4">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#b8a590]">
                    {/* Avion en papier avec traînée florale */}
                    <path d="M8 28L38 14L28 30L24 26Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fill="none" />
                    <path d="M24 26L28 30L26 38" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                    <path d="M24 26L38 14" stroke="currentColor" strokeWidth="0.8" />
                    {/* Petite fleur sur l'avion */}
                    <circle cx="36" cy="12" r="1.5" stroke="currentColor" strokeWidth="0.6" fill="none" />
                    <circle cx="36" cy="12" r="0.4" fill="currentColor" />
                    {/* Traînée */}
                    <path d="M10 30C12 29 13 30 14 29" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
                    <path d="M12 33C14 32 15 33 16 32" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" />
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