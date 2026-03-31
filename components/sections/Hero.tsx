'use client';

import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#faf8f5]">
      
      {/* MOBILE: Image en haut, texte en dessous avec gradient fade */}
      <div className="md:hidden">
        <div className="relative h-[60vh]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/files/WhatsAppImage2026-02-11at06.43.58.jpg?v=1770916995')`,
            }}
          />
          {/* Gradient fade vers le texte */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#faf8f5] via-[#faf8f5]/80 to-transparent" />
        </div>
        
        {/* Contenu texte mobile */}
        <div className="px-6 -mt-16 relative z-10 pb-12">
          <p className="text-xs tracking-[0.25em] uppercase mb-4 font-light" style={{ color: '#b8935a' }}>
            Artisan fleuriste · Normandie & Bretagne
          </p>
          
          <h1 className="font-serif text-3xl mb-4 font-normal leading-tight" style={{ color: '#2d2a26' }}>
            Des fleurs fraîches chaque semaine, créées avec passion
          </h1>
          
          <p className="text-base mb-6 font-light leading-relaxed" style={{ color: '#6b6560' }}>
            Bouquets d'exception composés à la main, livrés partout en France
          </p>

          <div className="flex flex-col gap-3 mb-8">
            <Link 
              href="/boutique" 
              className="text-white px-6 py-3.5 text-sm font-semibold tracking-wider uppercase text-center transition-colors"
              style={{ backgroundColor: '#b8935a' }}
            >
              Découvrir la boutique
            </Link>
            <Link 
              href="/abonnement" 
              className="px-6 py-3.5 text-sm font-semibold tracking-wider uppercase border text-center transition-colors"
              style={{ color: '#b8935a', borderColor: '#b8935a' }}
            >
              Nos abonnements
            </Link>
          </div>

          {/* Trust badges mobile */}
          <div className="flex items-center justify-around pt-6 border-t" style={{ borderColor: '#e8e0d8' }}>
            <div className="text-center">
              <p className="text-xs font-light mb-0.5" style={{ color: '#2d2a26' }}>Livraison France</p>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: '#9a9490' }}>Partout</p>
            </div>
            <div className="w-px h-8" style={{ backgroundColor: '#e8e0d8' }} />
            <div className="text-center">
              <p className="text-xs font-light mb-0.5" style={{ color: '#2d2a26' }}>Fraîcheur 7 jours</p>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: '#9a9490' }}>Garantie</p>
            </div>
            <div className="w-px h-8" style={{ backgroundColor: '#e8e0d8' }} />
            <div className="text-center">
              <p className="text-xs font-light mb-0.5" style={{ color: '#2d2a26' }}>100% artisanal</p>
              <p className="text-[10px] uppercase tracking-wider" style={{ color: '#9a9490' }}>Fait main</p>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP: Split 50/50 avec overlap subtil */}
      <div className="hidden md:flex relative min-h-[85vh]">
        
        {/* Côté gauche: Texte sur fond crème */}
        <div className="w-1/2 flex flex-col justify-center px-12 lg:px-16 xl:px-24 py-16 relative z-10">
          <p className="text-sm tracking-[0.3em] uppercase mb-6 font-light" style={{ color: '#b8935a' }}>
            Artisan fleuriste · Normandie & Bretagne
          </p>
          
          <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl mb-6 font-normal leading-tight" style={{ color: '#2d2a26' }}>
            Des fleurs fraîches chaque semaine, créées avec passion
          </h1>
          
          <p className="text-lg lg:text-xl mb-10 font-light leading-relaxed max-w-lg" style={{ color: '#6b6560' }}>
            Bouquets d'exception composés à la main, livrés partout en France
          </p>

          <div className="flex items-start gap-4 mb-12">
            <Link 
              href="/boutique" 
              className="text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#b8935a' }}
            >
              Découvrir la boutique
            </Link>
            <Link 
              href="/abonnement" 
              className="px-8 py-4 text-sm font-semibold tracking-wider uppercase border transition-all duration-300 hover:border-[#96754d] hover:text-[#96754d]"
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
              backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/files/WhatsAppImage2026-02-11at06.43.58.jpg?v=1770916995')`,
              clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0 100%)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
