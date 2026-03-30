'use client';

import Image from 'next/image';

export default function BrandIdentity() {
  return (
    <section className="relative py-20 md:py-32 bg-[#2d2a26] overflow-hidden">
      {/* Subtle decorative lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-px bg-[#b8935a]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-[#b8935a]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image du papier d'emballage */}
          <div className="relative group order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
              {/* Cadre doré subtil */}
              <div className="absolute inset-0 border border-[#b8935a]/20 z-10 pointer-events-none" />
              <div className="absolute inset-2 border border-[#b8935a]/10 z-10 pointer-events-none" />
              
              <Image
                src="/images/brand/papier-emballage.jpg"
                alt="Papier d'emballage signature Anne Freret — Toile de Jouy artisanale"
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
              
              {/* Overlay gradient subtil en bas */}
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#2d2a26]/40 to-transparent z-10" />
            </div>
            
            {/* Petite légende sous l'image */}
            <p className="text-center mt-4 text-[9px] tracking-[0.3em] uppercase text-[#b8935a]/60 font-light">
              Toile de Jouy — Dessin exclusif
            </p>
          </div>

          {/* Texte */}
          <div className="order-1 lg:order-2">
            <p className="text-[#b8935a] text-[10px] tracking-[0.3em] uppercase mb-6 font-light">
              Notre Signature
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#f5f0eb] mb-6 font-light leading-tight">
              L'art de l'emballage,<br />
              <span className="text-[#b8935a]">notre promesse d'élégance</span>
            </h2>
            <div className="w-16 h-px bg-[#b8935a] mb-8" />
            <p className="text-[#f5f0eb]/70 text-base md:text-lg leading-relaxed mb-6 font-light">
              Chaque bouquet Anne Freret est enveloppé dans notre papier signature, une toile de Jouy exclusive dessinée pour notre maison. Ce motif, inspiré de la campagne normande et de notre atelier, transforme chaque création en un véritable cadeau.
            </p>
            <p className="text-[#f5f0eb]/50 text-sm leading-relaxed mb-10 font-light">
              Du manoir au jardin, des silhouettes intemporelles aux frondaisons luxuriantes — notre papier raconte l'histoire d'un savoir-faire artisanal transmis avec passion. Parce que l'émotion commence avant même de découvrir les fleurs.
            </p>

            {/* Détails signature */}
            <div className="space-y-4 mb-10">
              {[
                { label: 'Dessin exclusif', detail: 'Créé spécialement pour Anne Freret' },
                { label: 'Toile de Jouy', detail: 'Tradition française du XVIIIᵉ siècle' },
                { label: 'Éco-responsable', detail: 'Papier certifié, encres végétales' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span className="text-[#b8935a] text-lg leading-none mt-0.5">✦</span>
                  <div>
                    <p className="text-[#f5f0eb] text-sm font-medium">{item.label}</p>
                    <p className="text-[#f5f0eb]/40 text-xs">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/boutique"
              className="inline-block text-[#f5f0eb] text-sm tracking-wide underline underline-offset-8 decoration-[#b8935a] hover:text-[#b8935a] transition-colors font-light"
            >
              Découvrir nos créations →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
