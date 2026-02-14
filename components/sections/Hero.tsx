'use client';

import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#faf8f5' }}>
      
      {/* MOBILE: Image first, then compact text */}
      <div className="md:hidden">
        {/* Image hero mobile */}
        <div className="relative h-[55vh]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454')`,
            }}
          />
          {/* Gradient bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#faf8f5] to-transparent" />
        </div>
        
        {/* Text content mobile — compact */}
        <div className="px-6 -mt-8 relative z-10 pb-10">
          <p className="text-xs tracking-[0.25em] uppercase mb-3 font-light" style={{ color: '#b8956a' }}>
            Fleuriste artisanal · Normandie
          </p>
          
          <p className="text-base mb-6 font-light leading-relaxed" style={{ color: '#6b6560' }}>
            Bouquets frais et créations florales d&apos;exception, livrés partout en France avec amour.
          </p>

          <div className="flex flex-col gap-3 mb-8">
            <Link 
              href="/boutique" 
              className="text-white px-6 py-3.5 text-sm font-semibold tracking-wider uppercase text-center"
              style={{ backgroundColor: '#b8956a' }}
            >
              Découvrir la boutique
            </Link>
            <Link 
              href="/mariages" 
              className="px-6 py-3.5 text-sm font-semibold tracking-wider uppercase border text-center"
              style={{ color: '#b8956a', borderColor: '#b8956a' }}
            >
              Mariages & Événements
            </Link>
          </div>

          {/* Trust badges mobile */}
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="text-xl font-serif" style={{ color: '#2d2a26' }}>72h</div>
              <div className="text-[10px] uppercase tracking-wider" style={{ color: '#9a9490' }}>Fraîcheur</div>
            </div>
            <div className="w-px h-6" style={{ backgroundColor: '#e8e0d8' }} />
            <div className="text-center">
              <div className="text-xl font-serif" style={{ color: '#2d2a26' }}>17</div>
              <div className="text-[10px] uppercase tracking-wider" style={{ color: '#9a9490' }}>Avis 5★</div>
            </div>
            <div className="w-px h-6" style={{ backgroundColor: '#e8e0d8' }} />
            <div className="text-center">
              <div className="text-xl font-serif" style={{ color: '#2d2a26' }}>100%</div>
              <div className="text-[10px] uppercase tracking-wider" style={{ color: '#9a9490' }}>Artisanal</div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP: Two-column layout */}
      <div className="hidden md:grid max-w-7xl mx-auto grid-cols-2 min-h-[85vh]">
        
        {/* Left: Text content */}
        <div className="flex flex-col justify-center px-16">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 font-light" style={{ color: '#b8956a' }}>
            Fleuriste artisanal · Saint-Pair-sur-Mer
          </p>
          
          <h1 className="font-serif text-6xl lg:text-7xl mb-6 font-normal leading-tight" style={{ color: '#2d2a26' }}>
            Anne Freret
          </h1>
          
          <p className="text-xl mb-4 font-light leading-relaxed max-w-md" style={{ color: '#6b6560' }}>
            Créations florales d&apos;exception, composées avec passion en Normandie.
          </p>
          
          <p className="text-base mb-10 font-light leading-relaxed max-w-md" style={{ color: '#9a9490' }}>
            Des bouquets frais, un savoir-faire artisanal depuis 2009, livrés chez vous avec amour partout en France.
          </p>

          <div className="flex items-start gap-4">
            <Link 
              href="/boutique" 
              className="text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase transition-colors"
              style={{ backgroundColor: '#b8956a' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#96754d'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#b8956a'}
            >
              Découvrir la boutique
            </Link>
            <Link 
              href="/mariages" 
              className="px-8 py-4 text-sm font-semibold tracking-wider uppercase border transition-colors"
              style={{ color: '#b8956a', borderColor: '#b8956a' }}
            >
              Mariages & Événements
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-2xl font-serif" style={{ color: '#2d2a26' }}>72h</div>
              <div className="text-xs uppercase tracking-wider" style={{ color: '#9a9490' }}>Fraîcheur</div>
            </div>
            <div className="w-px h-8" style={{ backgroundColor: '#e8e0d8' }} />
            <div className="text-center">
              <div className="text-2xl font-serif" style={{ color: '#2d2a26' }}>17</div>
              <div className="text-xs uppercase tracking-wider" style={{ color: '#9a9490' }}>Avis 5★</div>
            </div>
            <div className="w-px h-8" style={{ backgroundColor: '#e8e0d8' }} />
            <div className="text-center">
              <div className="text-2xl font-serif" style={{ color: '#2d2a26' }}>100%</div>
              <div className="text-xs uppercase tracking-wider" style={{ color: '#9a9490' }}>Artisanal</div>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://cdn.shopify.com/s/files/1/0295/6292/9231/products/bouquetdepivoineblanche_4fc67682-709a-45c2-9855-a91af5896ef7.jpg?v=1679413454')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5] via-transparent to-transparent w-24" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
