import Link from 'next/link';
import { mockProducts } from '@/lib/mock-data';

export default function DeuilPage() {
  const products = mockProducts.filter(p => p.category === 'Deuil & Hommages');

  return (
    <main className="bg-[#faf8f5] pt-28 md:pt-32">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 text-center mb-12 md:mb-16">
        <p className="text-[#c4a47a] text-[10px] tracking-[0.25em] uppercase mb-4">Accompagnement</p>
        <h1 className="font-serif text-3xl md:text-5xl text-[#2d2a26] mb-6">Deuil & Hommages</h1>
        <div className="w-12 h-px bg-[#c4a47a] mx-auto mb-6" />
        <p className="text-[#2d2a26]/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Dans ces moments difficiles, nos compositions florales portent vos émotions 
          avec délicatesse et respect. Chaque création est réalisée à la main par nos 
          fleuristes avec le plus grand soin.
        </p>
      </section>

      {/* Notice livraison locale */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 mb-10 md:mb-14">
        <div className="flex items-center gap-3 bg-white border border-[#e8e0d8] p-4 md:p-5">
          <svg className="w-5 h-5 text-[#c4a47a] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <div>
            <p className="text-[#2d2a26] text-sm font-medium">Livraison locale uniquement</p>
            <p className="text-[#2d2a26]/50 text-xs mt-0.5">
              Nos compositions de deuil sont livrées en main propre dans un rayon de 35 km 
              autour de Saint-Pair-sur-Mer. Livraison le jour même possible sur commande avant 14h.
            </p>
          </div>
        </div>
      </section>

      {/* Engagements */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 mb-12 md:mb-16">
        <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
          <div>
            <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-[#c4a47a]/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[10px] md:text-xs text-[#2d2a26]/60 uppercase tracking-wider">Livraison<br />le jour même</p>
          </div>
          <div>
            <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-[#c4a47a]/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
              </svg>
            </div>
            <p className="text-[10px] md:text-xs text-[#2d2a26]/60 uppercase tracking-wider">Fait main<br />avec soin</p>
          </div>
          <div>
            <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-[#c4a47a]/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <p className="text-[10px] md:text-xs text-[#2d2a26]/60 uppercase tracking-wider">Conseil<br />personnalisé</p>
          </div>
        </div>
      </section>

      {/* Produits */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mb-16 md:mb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {products.map(product => (
            <Link key={product.slug} href={`/produit/${product.slug}`} className="group">
              <div className="aspect-square overflow-hidden bg-[#f5f0eb] mb-3">
                <img 
                  src={product.images?.[0] || ''} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="font-serif text-sm md:text-base text-[#2d2a26] mb-1">{product.name}</h3>
              <p className="text-[#c4a47a] text-sm">Dès {product.sizes?.[0]?.price.toFixed(2)}€</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact section */}
      <section className="bg-[#2d2a26] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <p className="text-[#c4a47a] text-[10px] tracking-[0.25em] uppercase mb-4">Nous sommes là pour vous</p>
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">Besoin de conseils ?</h2>
          <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
            Nos fleuristes vous accompagnent avec discrétion et bienveillance 
            pour choisir la composition qui exprimera vos sentiments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:0233502615" className="flex items-center gap-2 text-white text-sm hover:text-[#c4a47a] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              02 33 50 26 15
            </a>
            <span className="hidden sm:block text-white/20">|</span>
            <Link href="/contact" className="text-white text-sm underline underline-offset-4 decoration-[#c4a47a] hover:text-[#c4a47a] transition-colors">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
