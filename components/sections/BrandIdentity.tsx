'use client';

export default function BrandIdentity() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Papier emballage en fond full-width */}
      <div 
        className="absolute inset-0 bg-repeat bg-center"
        style={{
          backgroundImage: 'url(/images/brand/papier-emballage.jpg)',
          backgroundSize: '600px',
        }}
      />
      
      {/* Overlay léger */}
      <div className="absolute inset-0 bg-[#faf8f5]/30" />
      
      {/* Bordures subtiles haut/bas */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#b8935a]/20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#b8935a]/20" />

      {/* Carte centrale */}
      <div className="relative z-10 max-w-3xl mx-auto mx-4 md:mx-auto bg-[#faf8f5]/90 backdrop-blur-sm py-16 md:py-20 px-8 md:px-16 rounded-2xl shadow-sm border border-[#b8935a]/15">
        
        {/* Ornement haut */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-12 h-px bg-[#b8935a]/30" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#b8935a]/40">
            <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="currentColor"/>
          </svg>
          <div className="w-12 h-px bg-[#b8935a]/30" />
        </div>

        <p className="text-[#b8935a] text-[10px] tracking-[0.4em] uppercase mb-8 font-light text-center">
          Notre Signature
        </p>

        <h2 className="font-serif text-3xl md:text-5xl lg:text-[3.5rem] text-[#2d2a26] mb-8 font-light leading-tight text-center">
          L'art de l'emballage,{' '}
          <br className="hidden md:block" />
          <span className="italic text-[#b8935a]">signé Anne Freret</span>
        </h2>

        {/* Séparateur doré élégant */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-8 h-px bg-[#b8935a]/40" />
          <div className="w-2 h-2 rounded-full bg-[#b8935a]/30" />
          <div className="w-8 h-px bg-[#b8935a]/40" />
        </div>

        <p className="text-[#6b6560] text-base md:text-lg leading-relaxed mb-14 font-light max-w-xl mx-auto text-center">
          Chaque bouquet est enveloppé dans notre papier au dessin exclusif, 
          une illustration originale qui raconte l'univers Anne Freret. 
          Parce que la beauté commence avant même de découvrir les fleurs.
        </p>

        {/* 3 points avec icônes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-14">
          {[
            { 
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c-4-3-8-7.5-8-12a8 8 0 0 1 16 0c0 4.5-4 9-8 12z"/>
                  <path d="M12 11c1.5-3 4-5 4-5s-1 3-4 5z"/>
                  <path d="M12 11c-1.5-3-4-5-4-5s1 3 4 5z"/>
                  <line x1="12" y1="22" x2="12" y2="11"/>
                </svg>
              ),
              title: 'Composé à la main', 
              desc: 'Chaque bouquet est unique' 
            },
            { 
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 6.5C17.5 4 15.5 2 12 2S6.5 4 6.5 6.5c0 3 3 5 5.5 8 2.5-3 5.5-5 5.5-8z"/>
                  <circle cx="12" cy="6.5" r="1.5"/>
                  <path d="M4 14c0 4.4 3.6 8 8 8s8-3.6 8-8"/>
                  <path d="M8 18h8"/>
                </svg>
              ),
              title: 'Fleurs responsables', 
              desc: 'Circuit court, fraîcheur garantie' 
            },
            { 
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12v10H4V12"/>
                  <path d="M2 7h20v5H2z"/>
                  <path d="M12 22V7"/>
                  <path d="M12 7s-1.5-5-5-5c-1.5 0-3 1-3 2.5S5.5 7 7 7h5"/>
                  <path d="M12 7s1.5-5 5-5c1.5 0 3 1 3 2.5S18.5 7 17 7h-5"/>
                  <path d="M7 12v2"/><path d="M17 12v2"/>
                </svg>
              ),
              title: 'Expérience cadeau', 
              desc: 'Chaque colis est une surprise' 
            },
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#b8935a]/8 text-[#b8935a] mb-4 group-hover:bg-[#b8935a]/15 transition-colors">
                {item.icon}
              </div>
              <p className="text-[#2d2a26] text-sm font-medium tracking-wide mb-1">{item.title}</p>
              <p className="text-[#9a9490] text-xs">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Bouton élégant */}
        <div className="text-center">
          <a
            href="/boutique"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#b8935a]/40 text-[#2d2a26] text-sm tracking-wider uppercase rounded-full hover:bg-[#b8935a] hover:text-white hover:border-[#b8935a] transition-all duration-300 font-light"
          >
            Découvrir nos créations
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        {/* Ornement bas */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="w-12 h-px bg-[#b8935a]/30" />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#b8935a]/40">
            <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="currentColor"/>
          </svg>
          <div className="w-12 h-px bg-[#b8935a]/30" />
        </div>
      </div>
    </section>
  );
}
