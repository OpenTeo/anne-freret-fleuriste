'use client';

import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#faf8f5]">
      
      {/* MOBILE: Style Bergamotte — image lifestyle + texte minimal centré */}
      <div className="md:hidden">
        {/* Image hero pleine largeur */}
        <div className="relative h-[70vh]">
          <div 
            className="absolute inset-0 bg-cover bg-[center_20%]"
            style={{
              backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/files/7ACE65B9-6559-4B06-8BF7-0290B4194167.jpg?v=1736713275')`,
            }}
          />
          {/* Overlay gradient: sombre en haut pour le texte, transparent au centre */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/10" />
          
          {/* Texte en haut de l'image — sur la zone sombre */}
          <div className="absolute top-0 left-0 right-0 z-10 px-8 pt-12">
            <h1 className="font-serif text-4xl text-white font-light text-center leading-tight tracking-wide" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
              Bouquets
            </h1>
            <p className="text-white/80 text-xs tracking-[0.25em] uppercase mt-3 font-light text-center" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
              Artisan fleuriste · Depuis 2001
            </p>
          </div>
        </div>

        {/* Catégories en grille sous l'image */}
        <div className="grid grid-cols-2 gap-[1px] bg-[#e8e0d8]">
          <Link href="/boutique" className="relative h-44 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
              style={{ backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/files/WhatsAppImage2026-02-11at06.43.58.jpg?v=1770916995')` }}
            />
            <div className="absolute inset-0 bg-black/25" />
            <p className="absolute bottom-4 left-4 text-white text-sm font-light tracking-wide">Nos bouquets</p>
          </Link>
          <Link href="/abonnement" className="relative h-44 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
              style={{ backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/files/WhatsAppImage2026-02-11at06.34.45.jpg?v=1770916718')` }}
            />
            <div className="absolute inset-0 bg-black/25" />
            <p className="absolute bottom-4 left-4 text-white text-sm font-light tracking-wide">Abonnements</p>
          </Link>
          <Link href="/deuil" className="relative h-44 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
              style={{ backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454')` }}
            />
            <div className="absolute inset-0 bg-black/25" />
            <p className="absolute bottom-4 left-4 text-white text-sm font-light tracking-wide">Deuil</p>
          </Link>
          <Link href="/mariages" className="relative h-44 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
              style={{ backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/products/Lisianthusfriseblanc2.jpg?v=1625219126')` }}
            />
            <div className="absolute inset-0 bg-black/25" />
            <p className="absolute bottom-4 left-4 text-white text-sm font-light tracking-wide">Mariages</p>
          </Link>
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
