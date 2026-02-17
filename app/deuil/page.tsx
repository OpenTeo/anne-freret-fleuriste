'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockProducts } from '@/lib/mock-data';

const categories = [
  { id: 'all', label: 'Toutes les créations' },
  { id: 'raquette', label: 'Raquettes' },
  { id: 'coeur', label: 'Cœurs' },
  { id: 'couronne', label: 'Couronnes' },
  { id: 'coussin', label: 'Coussins' },
  { id: 'croix', label: 'Croix' },
  { id: 'gerbe', label: 'Gerbes' },
  { id: 'plantes', label: 'Jardins de plantes' },
];

export default function DeuilPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const products = mockProducts.filter(p => p.category === 'Deuil & Hommages');
  
  const filtered = activeFilter === 'all' 
    ? products 
    : products.filter(p => p.slug.includes(activeFilter));

  return (
    <>
    <Header />
    <main className="bg-[#faf8f5] pt-28 md:pt-32">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-6">
        <nav className="flex items-center gap-2 text-xs text-[#2d2a26]/40">
          <Link href="/" className="hover:text-[#c4a47a] transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/boutique" className="hover:text-[#c4a47a] transition-colors">Boutique</Link>
          <span>/</span>
          <span className="text-[#2d2a26]/60">Deuil &amp; Hommages</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 text-center mb-8 md:mb-12">
        <p className="text-[#c4a47a] text-[10px] tracking-[0.25em] uppercase mb-4">Accompagnement</p>
        <h1 className="font-serif text-3xl md:text-5xl text-[#2d2a26] mb-4">Deuil & Hommages</h1>
        <div className="w-12 h-px bg-[#c4a47a] mx-auto mb-4" />
        <p className="text-[#2d2a26]/50 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Nos créations pour rendre hommage avec amour et tendresse. 
          Chaque composition est réalisée à la main avec le plus grand soin.
        </p>
      </section>

      {/* Notice livraison locale */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mb-8">
        <div className="flex items-center gap-3 bg-white border border-[#e8e0d8] p-4">
          <svg className="w-5 h-5 text-[#c4a47a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <div>
            <p className="text-[#2d2a26] text-sm font-medium">Livraison locale uniquement</p>
            <p className="text-[#2d2a26]/40 text-xs mt-0.5">
              Rayon de 35 km autour de Saint-Pair-sur-Mer · Livraison le jour même avant 14h
            </p>
          </div>
        </div>
      </section>

      {/* Layout: Sidebar + Grid */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar filters — left */}
          <aside className="md:w-48 flex-shrink-0">
            {/* Mobile: horizontal scroll */}
            <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 md:overflow-visible -mx-1 px-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`whitespace-nowrap text-left text-xs md:text-[11px] uppercase tracking-[0.15em] px-3 py-2 md:px-0 md:py-2.5 md:border-b border-[#e8e0d8]/50 transition-all duration-300 ${
                    activeFilter === cat.id 
                      ? 'text-[#c4a47a] md:border-[#c4a47a] bg-[#c4a47a]/5 md:bg-transparent' 
                      : 'text-[#2d2a26]/40 hover:text-[#2d2a26]/70 bg-white md:bg-transparent border border-[#e8e0d8] md:border-0 md:border-b'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Contact */}
            <div className="hidden md:block mt-8 pt-6 border-t border-[#e8e0d8]/50">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#c4a47a] mb-2">Conseil</p>
              <a href="tel:0233502615" className="text-sm text-[#2d2a26]/60 hover:text-[#c4a47a] transition-colors">
                02 33 50 26 15
              </a>
              <p className="text-[10px] text-[#2d2a26]/30 mt-1">Du lundi au samedi<br />9h - 19h</p>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {filtered.map(product => (
                <Link key={product.slug} href={`/produit/${product.slug}`} className="group">
                  <div className="aspect-square overflow-hidden bg-[#f5f0eb] mb-3">
                    <img 
                      src={product.images?.[0] || ''} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="font-serif text-sm md:text-base text-[#2d2a26] mb-1">{product.name}</h3>
                  {/* Note */}
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-1.5">
                      <div className="flex">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} className={`w-3 h-3 ${s <= Math.round(product.rating!) ? 'text-[#c4a47a]' : 'text-[#e8e0d8]'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[9px] text-[#2d2a26]/30">({product.reviewCount})</span>
                    </div>
                  )}
                  {/* Variantes couleur */}
                  <div className="flex gap-1.5 mb-1.5">
                    {(product.variants || product.sizes)?.map((v: {name: string}) => (
                      <span key={v.name} className="text-[8px] md:text-[9px] text-[#2d2a26]/30 uppercase tracking-wider">
                        {v.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-[#c4a47a] text-sm">À partir de {product.price.toFixed(2)}€</p>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-[#2d2a26]/40 text-sm py-12">Aucun produit dans cette catégorie</p>
            )}
          </div>
        </div>
      </section>

      {/* Engagements */}
      <section className="border-t border-[#e8e0d8] py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-4 md:px-6 grid grid-cols-3 gap-4 md:gap-6 text-center">
          <div>
            <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-[#c4a47a]/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[10px] md:text-xs text-[#2d2a26]/50 uppercase tracking-wider">Livraison<br />le jour même</p>
          </div>
          <div>
            <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-[#c4a47a]/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <p className="text-[10px] md:text-xs text-[#2d2a26]/50 uppercase tracking-wider">Fait main<br />avec soin</p>
          </div>
          <div>
            <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-[#c4a47a]/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <p className="text-[10px] md:text-xs text-[#2d2a26]/50 uppercase tracking-wider">Conseil<br />personnalisé</p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#2d2a26] py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <p className="text-[#c4a47a] text-[10px] tracking-[0.25em] uppercase mb-3">Nous sommes là pour vous</p>
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">Besoin de conseils ?</h2>
          <p className="text-white/50 text-sm mb-5 max-w-md mx-auto">
            Nos fleuristes vous accompagnent avec discrétion et bienveillance.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="tel:0233502615" className="flex items-center gap-2 text-white text-sm hover:text-[#c4a47a] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              02 33 50 26 15
            </a>
            <span className="text-white/20">|</span>
            <Link href="/contact" className="text-white text-sm underline underline-offset-4 decoration-[#c4a47a] hover:text-[#c4a47a] transition-colors">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
