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

        {/* 4. BRAND IDENTITY - Section papier signature (différenciation) */}
        <BrandIdentity />

        {/* 5. TESTIMONIALS - Social proof (sépare les deux sections papier) */}
        <TestimonialsCarousel />

        {/* 6. SECTION ABONNEMENT - Fond sombre */}
        <section className="py-16 md:py-24 bg-[#2d2a26] relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute top-0 left-0 w-full h-px bg-[#b8935a]" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-[#b8935a]" />
          </div>

          <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <p className="text-[#b8935a] text-[10px] tracking-[0.3em] uppercase mb-4 font-light">
                Abonnement Floral
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-[#f5f0eb] mb-6 font-light">
                Chaque mois,<br />une surprise florale
              </h2>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-px bg-[#b8935a]"></div>
              </div>
              <p className="text-[#f5f0eb]/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-light">
                Imaginez rentrer chez vous et découvrir un bouquet de saison, choisi avec soin. Plus qu'un abonnement : une parenthèse enchantée qui transforme votre quotidien.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { 
                  name: 'Essentiel', 
                  price: '39.90', 
                  desc: 'La douceur mensuelle',
                  features: ['3-5 variétés', 'Bouquet classique', 'Livraison incluse'],
                  popular: false 
                },
                { 
                  name: 'Signature', 
                  price: '49.90', 
                  desc: 'L\'équilibre parfait',
                  features: ['5-7 variétés', 'Composition premium', 'Carte personnalisée'],
                  popular: true 
                },
                { 
                  name: 'Prestige', 
                  price: '69.90', 
                  desc: 'L\'excellence absolue',
                  features: ['8-10 variétés', 'Fleurs d\'exception', 'Service prioritaire'],
                  popular: false 
                },
              ].map((plan) => (
                <a 
                  key={plan.name} 
                  href={`/abonnement?plan=${plan.name.toLowerCase()}`}
                  className={`group relative bg-[#faf8f5] p-8 transition-all duration-500 hover:scale-[1.02] ${
                    plan.popular 
                      ? 'md:-translate-y-4 border-2 border-[#b8935a]' 
                      : 'border border-[#e8e0d8] hover:border-[#b8935a]'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#b8935a] text-white px-4 py-1 text-[9px] tracking-[0.2em] uppercase">
                      Coup de cœur
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl text-[#2d2a26] mb-2">{plan.name}</h3>
                    <p className="text-xs text-[#2d2a26]/50 tracking-wide uppercase">{plan.desc}</p>
                  </div>

                  <div className="text-center mb-8 pb-8 border-b border-[#e8e0d8]">
                    <span className="font-serif text-4xl text-[#2d2a26]">{plan.price}€</span>
                    <span className="text-sm text-[#2d2a26]/50">/mois</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-[#2d2a26]/70">
                        <svg className="w-4 h-4 text-[#b8935a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <span className="inline-block text-[#2d2a26] text-sm group-hover:text-[#b8935a] transition-colors font-light border-b border-[#2d2a26] group-hover:border-[#b8935a]">
                      Choisir cette formule
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Benefits */}
            <div className="mt-16 text-center">
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {[
                  { icon: '✓', text: 'Sans engagement' },
                  { icon: '✓', text: 'Pausez quand vous voulez' },
                  { icon: '✓', text: 'Livraison offerte' },
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#f5f0eb]/60 text-sm">
                    <span className="text-[#b8935a]">{benefit.icon}</span>
                    {benefit.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. SECTION BLOG - Layout compact horizontal */}
        <section className="py-16 md:py-20 bg-[#faf8f5]">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            {/* Header */}
            <div className="text-center mb-10 md:mb-14">
              <p className="text-[#b8935a] text-[10px] tracking-[0.2em] uppercase mb-4 font-light">
                Inspiration & Savoir-Faire
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-[#2d2a26] mb-6 font-light">
                Notre Carnet d'Atelier
              </h2>
              <div className="flex justify-center">
                <div className="w-12 h-px bg-[#b8935a]"></div>
              </div>
            </div>
            
            {/* 3 Cards horizontales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
              {blogPosts.slice(0, 3).map((post) => (
                <Link 
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white overflow-hidden transition-all duration-500 hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <p className="text-[#b8935a] text-[9px] tracking-[0.2em] uppercase font-light">
                      {post.category}
                    </p>
                    <h3 className="font-serif text-lg md:text-xl text-[#2d2a26] group-hover:text-[#b8935a] transition-colors font-light leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-[9px] tracking-[0.15em] uppercase font-light text-[#2d2a26]/50">
                      <span>
                        {new Date(post.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Link vers tous les articles */}
            <div className="text-center">
              <Link 
                href="/blog"
                className="inline-block text-[#2d2a26] text-sm underline underline-offset-4 hover:text-[#b8935a] transition-colors font-light"
              >
                Découvrir tous nos articles →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
