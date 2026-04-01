'use client';

import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#faf8f5]">
      
      {/* MOBILE: Bright & Airy — hero pivoine + bannière crème + grille catégories */}
      <div className="md:hidden">
        {/* Image hero pleine largeur avec bannière overlay */}
        <div className="relative h-[60vh]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454')`,
            }}
          />
          {/* Bannière crème semi-transparente centrée */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[#faf8f5]/80 backdrop-blur-sm px-10 py-5 text-center">
              <h1 className="font-serif text-3xl tracking-wide" style={{ color: '#b8935a' }}>
                Bouquets
              </h1>
              <p className="text-[10px] tracking-[0.3em] uppercase mt-1 font-light" style={{ color: '#6b6560' }}>
                L&apos;artisanat de la fleur
              </p>
            </div>
          </div>
        </div>

        {/* Section catégories */}
        <div className="px-5 py-8 bg-[#faf8f5]">
          <p className="text-[10px] tracking-[0.3em] uppercase text-center font-light mb-1" style={{ color: '#b8935a' }}>
            Nos collections
          </p>
          <p className="font-serif text-xl text-center mb-6" style={{ color: '#2d2a26' }}>
            Pour chaque instant, une émotion fleurie.
          </p>

          {/* Grille 2x2 avec coins arrondis */}
          <div className="grid grid-cols-2 gap-3">
            <Link href="/boutique" className="relative aspect-square overflow-hidden rounded-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/files/7ACE65B9-6559-4B06-8BF7-0290B4194167.jpg?v=1736713275')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-xs font-light tracking-wider uppercase">Nos bouquets</span>
            </Link>
            <Link href="/abonnement" className="relative aspect-square overflow-hidden rounded-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/files/WhatsAppImage2026-02-11at06.34.45.jpg?v=1770916718')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-xs font-light tracking-wider uppercase">Abonnements</span>
            </Link>
            <Link href="/deuil" className="relative aspect-square overflow-hidden rounded-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/files/Couronne3.jpg?v=1743008466')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-xs font-light tracking-wider uppercase">Deuil</span>
            </Link>
            <Link href="/mariages" className="relative aspect-square overflow-hidden rounded-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/products/Lisianthusfriseblanc2.jpg?v=1625219126')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-xs font-light tracking-wider uppercase">Mariages</span>
            </Link>
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
