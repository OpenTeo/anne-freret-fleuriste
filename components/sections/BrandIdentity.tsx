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
      
      {/* Overlay pour atténuer le motif et assurer la lisibilité */}
      <div className="absolute inset-0 bg-[#faf8f5]/92" />
      
      {/* Bordures subtiles haut/bas */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#b8935a]/20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#b8935a]/20" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center">
        <p className="text-[#b8935a] text-[10px] tracking-[0.3em] uppercase mb-6 font-light">
          Notre Signature
        </p>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#2d2a26] mb-6 font-light leading-tight">
          L'art de l'emballage,{' '}
          <span className="italic text-[#b8935a]">signé Anne Freret</span>
        </h2>
        <div className="flex justify-center mb-8">
          <div className="w-16 h-px bg-[#b8935a]" />
        </div>
        <p className="text-[#2d2a26]/70 text-base md:text-lg leading-relaxed mb-12 font-light max-w-2xl mx-auto">
          Chaque bouquet est enveloppé dans notre papier au dessin exclusif — 
          une illustration originale qui raconte l'univers Anne Freret. 
          Parce que la beauté commence avant même de découvrir les fleurs.
        </p>

        {/* 3 points en ligne */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
          {[
            { title: 'Dessin exclusif', desc: 'Créé pour Anne Freret' },
            { title: 'Papier de qualité', desc: 'Noble et responsable' },
            { title: 'Expérience unique', desc: 'Chaque colis est un cadeau' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-[#2d2a26] text-sm font-medium tracking-wide">{item.title}</p>
              <p className="text-[#2d2a26]/40 text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <a
          href="/boutique"
          className="inline-block text-[#2d2a26] text-sm tracking-wide underline underline-offset-8 decoration-[#b8935a] hover:text-[#b8935a] transition-colors font-light"
        >
          Découvrir nos créations →
        </a>
      </div>
    </section>
  );
}
