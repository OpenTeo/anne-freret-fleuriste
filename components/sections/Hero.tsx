'use client';

import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#faf8f5]">
      
      {/* MOBILE: Image compacte + carte texte */}
      <div className="md:hidden">
        {/* Image — hauteur réduite */}
        <div className="relative h-[45vh]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/files/IMG_3629.jpg?v=1747399798')`,
            }}
          />
          {/* Overlay léger */}
          <div className="absolute inset-0 bg-black/10" />
          {/* Fade vers le bas */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#faf8f5] to-transparent" />
        </div>
        
        {/* Contenu texte sur fond crème — lisible */}
        <div className="px-6 -mt-8 relative z-10 pb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-3 font-light text-[#b8935a]">
            Artisan fleuriste · Depuis 2001
          </p>
          
          <h1 className="font-serif text-[1.75rem] leading-[1.2] mb-3 font-normal text-[#2d2a26]">
            Des bouquets d'exception,{' '}
            <span className="italic text-[#b8935a]">composés avec amour</span>
          </h1>
          
          <p className="text-sm mb-5 font-light leading-relaxed text-[#6b6560]">
            Compositions uniques livrées dans toute la France
          </p>

          <div className="flex gap-3 mb-6">
            <Link 
              href="/boutique" 
              className="flex-1 text-white px-5 py-3 text-xs font-semibold tracking-wider uppercase text-center rounded-full bg-[#b8935a] hover:bg-[#a07d45] transition-colors"
            >
              La boutique
            </Link>
            <Link 
              href="/abonnement" 
              className="flex-1 px-5 py-3 text-xs font-semibold tracking-wider uppercase text-center rounded-full border border-[#b8935a] text-[#b8935a] hover:bg-[#b8935a]/10 transition-colors"
            >
              Abonnements
            </Link>
          </div>

          {/* Trust badges mobile */}
          <div className="flex items-center justify-around pt-4 border-t border-[#e8e0d8]">
            <div className="text-center">
              <p className="text-[11px] font-light text-[#2d2a26]">Livraison France</p>
            </div>
            <div className="w-px h-4 bg-[#e8e0d8]" />
            <div className="text-center">
              <p className="text-[11px] font-light text-[#2d2a26]">Fraîcheur 7 jours</p>
            </div>
            <div className="w-px h-4 bg-[#e8e0d8]" />
            <div className="text-center">
              <p className="text-[11px] font-light text-[#2d2a26]">100% artisanal</p>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP: Split 50/50 avec overlap subtil */}
      <div className="hidden md:flex relative min-h-[85vh]">
        
        {/* Côté gauche: Texte sur fond crème */}
        <div className="w-1/2 flex flex-col justify-center px-12 lg:px-16 xl:px-24 py-16 relative z-10">
          <p className="text-sm tracking-[0.3em] uppercase mb-6 font-light" style={{ color: '#b8935a' }}>
            Artisan fleuriste · Depuis 2001
          </p>
          
          <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl mb-6 font-normal leading-tight" style={{ color: '#2d2a26' }}>
            Des bouquets d'exception, composés avec amour
          </h1>
          
          <p className="text-lg lg:text-xl mb-10 font-light leading-relaxed max-w-lg" style={{ color: '#6b6560' }}>
            Fleuriste artisanale depuis plus de 20 ans, Anne crée pour vous des compositions uniques livrées dans toute la France
          </p>

          <div className="flex items-start gap-4 mb-12">
            <Link 
              href="/boutique" 
              className="text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 rounded-full"
              style={{ backgroundColor: '#b8935a' }}
            >
              Découvrir la boutique
            </Link>
            <Link 
              href="/abonnement" 
              className="px-8 py-4 text-sm font-semibold tracking-wider uppercase border transition-all duration-300 hover:border-[#96754d] hover:text-[#96754d] rounded-full"
              style={{ color: '#b8935a', borderColor: '#b8935a' }}
            >
              Nos abonnements
            </Link>
          </div>

          {/* Trust badges desktop */}
          <div className="flex items-center gap-8 pt-8 border-t" style={{ borderColor: '#e8e0d8' }}>
            <div className="text-center">
              <p className="text-base font-light mb-1" style={{ color: '#2d2a26' }}>Livraison France</p>
              <p className="text-xs uppercase tracking-wider font-light" style={{ color: '#9a9490' }}>Partout</p>
            </div>
            <div className="w-px h-10" style={{ backgroundColor: '#e8e0d8' }} />
            <div className="text-center">
              <p className="text-base font-light mb-1" style={{ color: '#2d2a26' }}>Fraîcheur 7 jours</p>
              <p className="text-xs uppercase tracking-wider font-light" style={{ color: '#9a9490' }}>Garantie</p>
            </div>
            <div className="w-px h-10" style={{ backgroundColor: '#e8e0d8' }} />
            <div className="text-center">
              <p className="text-base font-light mb-1" style={{ color: '#2d2a26' }}>100% artisanal</p>
              <p className="text-xs uppercase tracking-wider font-light" style={{ color: '#9a9490' }}>Fait main</p>
            </div>
          </div>
        </div>

        {/* Côté droit: Image avec overlap subtil via clip-path */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454')`,
              clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0 100%)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
