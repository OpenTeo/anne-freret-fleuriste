'use client'

import Image from 'next/image'
import { useState } from 'react'

/* ─── Données ─── */
const boxes = [
  {
    id: 'fraicheur',
    name: 'Box Fraîcheur',
    type: 'Fleurs fraîches',
    price: 39.90,
    tag: 'Idéal pour débuter',
    desc: 'Un bouquet prêt à assembler avec des fleurs fraîches de saison. Suivez le guide, créez votre composition et admirez le résultat pendant 7 à 14 jours.',
    includes: ['8-12 tiges fraîches de saison', 'Sachet d\'élixir végétal', 'Guide illustré pas à pas', 'QR code → tuto vidéo', 'Papier kraft & raphia'],
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=85',
    duration: '7-14 jours',
  },
  {
    id: 'eternelle',
    name: 'Box Éternelle',
    type: 'Fleurs séchées & stabilisées',
    price: 44.90,
    tag: 'Best-seller',
    desc: 'Des fleurs séchées et stabilisées pour une composition qui dure des mois. Pampa, lavande, eucalyptus, statice — un bouquet intemporel à créer chez vous.',
    includes: ['10-15 variétés séchées & stabilisées', 'Pampa, lavande, eucalyptus', 'Fil de fer floral doré', 'Ruban en lin naturel', 'Guide de composition illustré', 'QR code → tuto vidéo'],
    image: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=600&q=85',
    duration: '6 mois à 2 ans',
  },
  {
    id: 'atelier',
    name: 'Box Atelier Complet',
    type: 'Fraîches + séchées',
    price: 64.90,
    tag: 'L\'expérience premium',
    desc: 'Notre box signature qui combine fleurs fraîches et séchées. Créez un centre de table unique en mélangeant les textures, les couleurs et les parfums.',
    includes: ['6-8 tiges fraîches de saison', '8-10 variétés séchées', 'Mousse florale Oasis', 'Contenant en bois gravé', 'Sécateur floral professionnel', 'Carte message personnalisée', 'Guide + tuto vidéo exclusif'],
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=85',
    duration: 'Séchées: 6 mois+ / Fraîches: 7-14j',
  },
]

const steps = [
  {
    num: '01',
    title: 'Ouvrez votre box',
    desc: 'Chaque tige est protégée individuellement. Déballez délicatement, taillez les tiges en biseau et placez les fleurs fraîches dans l\'eau immédiatement.',
    tip: 'Astuce : laissez les fleurs fraîches s\'hydrater 2h avant de commencer.',
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="12" y="24" width="40" height="28" rx="2" />
        <path d="M12 24l20-12 20 12" />
        <path d="M32 12v16" strokeDasharray="3 3" />
        <circle cx="32" cy="36" r="4" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Préparez vos tiges',
    desc: 'Retirez le feuillage du bas des tiges — il ne doit pas toucher l\'eau. Pour les séchées, séparez-les délicatement par variété sur votre plan de travail.',
    tip: 'Astuce : gardez un bol d\'eau tiède à proximité pour les tiges fraîches.',
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 44l12-32 12 32" />
        <path d="M16 44h32" />
        <ellipse cx="32" cy="20" rx="6" ry="8" />
        <path d="M26 20c0-4 6-12 6-12s6 8 6 12" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Composez en spirale',
    desc: 'Commencez par les fleurs principales au centre. Ajoutez les secondaires en tournant le bouquet d\'un quart de tour à chaque tige. Terminez par le feuillage.',
    tip: 'Astuce : toujours de l\'extérieur vers l\'intérieur, en spirale.',
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M32 48c0-8 8-8 8-16s-8-8-8-16" />
        <path d="M32 48c0-8-8-8-8-16s8-8 8-16" />
        <circle cx="32" cy="16" r="6" />
        <circle cx="24" cy="28" r="4" />
        <circle cx="40" cy="28" r="4" />
        <path d="M28 48h8" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Nouez & admirez',
    desc: 'Attachez votre bouquet avec le ruban ou le raphia fourni. Placez-le dans votre vase et admirez votre création. Partagez avec #AnneFreretDIY !',
    tip: 'Astuce : changez l\'eau tous les 2 jours pour les fleurs fraîches.',
    icon: (
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 20c4 8 4 16 4 28" />
        <path d="M40 20c-4 8-4 16-4 28" />
        <path d="M20 34h24" />
        <path d="M28 34c-2-2-4-6 0-8s8 2 4 8" />
        <path d="M36 34c2-2 4-6 0-8s-8 2-4 8" />
        <circle cx="24" cy="16" r="6" />
        <circle cx="40" cy="16" r="6" />
        <circle cx="32" cy="12" r="5" />
      </svg>
    ),
  },
]

export default function DIYPage() {
  const [openBox, setOpenBox] = useState<string | null>(null)

  return (
    <main className="bg-[#faf8f5] min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative h-[75vh] min-h-[520px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=1400&q=85"
            alt="Atelier floral"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-[#faf8f5]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <p className="uppercase text-[11px] tracking-[0.35em] text-[#c4a47a] mb-5">Atelier à la maison</p>
          <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
            Do It Yourself
          </h1>
          <p className="text-white/85 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
            Devenez fleuriste le temps d'un instant. Recevez une box complète 
            et créez votre propre composition — fraîche, séchée, ou les deux.
          </p>
          <a href="#les-box" className="inline-block mt-10 px-10 py-3.5 bg-[#c4a47a] text-white text-[11px] uppercase tracking-[0.2em] hover:bg-[#b8956a] transition-colors duration-500">
            Choisir ma box
          </a>
        </div>
      </section>

      {/* ─── ÉTAPES PAS À PAS ─── */}
      <section className="max-w-5xl mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <p className="uppercase text-[10px] tracking-[0.3em] text-[#c4a47a] mb-4">En 4 étapes simples</p>
          <h2 className="text-3xl md:text-5xl text-[#2d2a26]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
            Comment ça marche
          </h2>
        </div>

        <div className="space-y-16 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-20">
          {steps.map((step) => (
            <div key={step.num} className="flex gap-6 items-start">
              {/* Icône SVG artisanale */}
              <div className="w-20 h-20 flex-shrink-0 text-[#c4a47a]/70">
                {step.icon}
              </div>
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[#c4a47a] text-2xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.num}</span>
                  <h3 className="text-sm uppercase tracking-[0.12em] text-[#2d2a26]">{step.title}</h3>
                </div>
                <p className="text-[13px] text-[#2d2a26]/60 leading-relaxed mb-3">{step.desc}</p>
                <p className="text-[12px] text-[#c4a47a] italic">{step.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bannière séparation ─── */}
      <section className="bg-[#2d2a26] py-12">
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="text-white/50 text-[13px] leading-relaxed">
            <span className="text-[#c4a47a]">Fleurs fraîches</span> pour une explosion de couleurs — 
            <span className="text-[#c4a47a]"> Fleurs séchées</span> pour une décoration qui dure — 
            <span className="text-[#c4a47a]"> Ou les deux</span> pour l'expérience ultime.
          </p>
        </div>
      </section>

      {/* ─── LES BOX ─── */}
      <section id="les-box" className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <p className="uppercase text-[10px] tracking-[0.3em] text-[#c4a47a] mb-4">Nos créations</p>
          <h2 className="text-3xl md:text-5xl text-[#2d2a26]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
            Choisissez votre box
          </h2>
        </div>

        <div className="space-y-20">
          {boxes.map((box, idx) => (
            <div
              key={box.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${idx % 2 === 1 ? 'md:[direction:rtl]' : ''}`}
            >
              {/* Image */}
              <div className="relative h-80 md:h-[480px] overflow-hidden md:[direction:ltr]">
                <Image
                  src={box.image}
                  alt={box.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-[0.15em] bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[#2d2a26]">
                    {box.tag}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="md:[direction:ltr]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-2">{box.type}</p>
                <h3 className="text-3xl md:text-4xl text-[#2d2a26] mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
                  {box.name}
                </h3>
                <div className="w-10 h-px bg-[#c4a47a] mb-5"></div>
                <p className="text-[14px] text-[#2d2a26]/60 leading-relaxed mb-6">{box.desc}</p>

                {/* Durée */}
                <div className="flex items-center gap-2 mb-6 text-[12px] text-[#2d2a26]/50">
                  <svg className="w-4 h-4 text-[#c4a47a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Durée : {box.duration}
                </div>

                {/* Contenu */}
                <button 
                  onClick={() => setOpenBox(openBox === box.id ? null : box.id)}
                  className="text-[11px] uppercase tracking-[0.15em] text-[#c4a47a] mb-4 hover:text-[#2d2a26] transition-colors flex items-center gap-2"
                >
                  Voir le contenu de la box
                  <span className={`transition-transform duration-300 ${openBox === box.id ? 'rotate-180' : ''}`}>▾</span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openBox === box.id ? 'max-h-80 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                  <ul className="space-y-2 pl-0">
                    {box.includes.map((item, i) => (
                      <li key={i} className="text-[13px] text-[#2d2a26]/65 flex items-start gap-2">
                        <span className="text-[#c4a47a] text-xs mt-0.5">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prix + CTA */}
                <div className="flex items-center gap-6">
                  <span className="text-3xl text-[#2d2a26]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {box.price.toFixed(2)}€
                  </span>
                  <button className="text-[10px] uppercase tracking-[0.2em] text-white bg-[#c4a47a] px-6 py-3 hover:bg-[#b8956a] transition-colors duration-500">
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Offrir en cadeau ─── */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase text-[10px] tracking-[0.25em] text-[#c4a47a] mb-3">Idée cadeau</p>
            <h2 className="text-3xl text-[#2d2a26] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
              Offrez l'expérience florale
            </h2>
            <div className="w-10 h-px bg-[#c4a47a] mb-5"></div>
            <p className="text-[14px] text-[#2d2a26]/60 leading-relaxed mb-4">
              Offrez à vos proches une box DIY — un cadeau original et personnel. 
              Ajoutez une carte message et nous nous occupons de l'emballage cadeau.
            </p>
            <p className="text-[14px] text-[#2d2a26]/60 leading-relaxed">
              C'est aussi l'activité parfaite à partager en famille ou entre amis. 
              Pas besoin d'être expert — le guide vous accompagne à chaque étape.
            </p>
          </div>
          <div className="bg-[#faf8f5] p-8 md:p-10 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[#c4a47a]">🎁</span>
              <p className="text-[13px] text-[#2d2a26]/70">Emballage cadeau inclus</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#c4a47a]">✉️</span>
              <p className="text-[13px] text-[#2d2a26]/70">Carte message personnalisée</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#c4a47a]">🚚</span>
              <p className="text-[13px] text-[#2d2a26]/70">Livraison 24-48h partout en France</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#c4a47a]">📹</span>
              <p className="text-[13px] text-[#2d2a26]/70">Tuto vidéo accessible par QR code</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#c4a47a]">🌿</span>
              <p className="text-[13px] text-[#2d2a26]/70">Fleurs de saison, fraîches ou séchées</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Partagez ─── */}
      <section className="bg-[#2d2a26] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase text-[10px] tracking-[0.25em] text-[#c4a47a] mb-4">Communauté</p>
          <h2 className="text-3xl text-white/90 mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
            Partagez vos créations
          </h2>
          <p className="text-white/45 text-[14px] leading-relaxed max-w-lg mx-auto mb-8">
            Identifiez <span className="text-[#c4a47a]">@annefreret</span> et utilisez 
            <span className="text-[#c4a47a]"> #AnneFreretDIY</span> — les plus belles 
            créations seront mises en avant sur notre page.
          </p>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl text-[#2d2a26]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
            Questions fréquentes
          </h2>
        </div>
        <div className="space-y-0">
          {[
            { q: 'Faut-il avoir de l\'expérience ?', a: 'Pas du tout ! Nos box sont conçues pour tous les niveaux. Le guide illustré et le tuto vidéo vous accompagnent étape par étape. De la débutante à la passionnée, chacune y trouvera son bonheur.' },
            { q: 'Combien de temps durent les compositions ?', a: 'Les fleurs fraîches durent 7 à 14 jours avec le sachet nutritif inclus. Les fleurs séchées et stabilisées durent 6 mois à 2 ans — parfois plus avec un bon entretien.' },
            { q: 'Peut-on offrir une box ?', a: 'Absolument ! Ajoutez une carte message personnalisée lors de votre commande. La box arrive dans un packaging cadeau soigné, prête à être offerte.' },
            { q: 'Comment sont livrées les fleurs fraîches ?', a: 'En colis Chronopost 24h, chaque tige est protégée individuellement dans un emballage biodégradable. Les fleurs arrivent en boutons pour une durée de vie maximale.' },
            { q: 'Peut-on choisir les variétés ?', a: 'Nos fleuristes composent chaque box avec les plus belles fleurs de saison. C\'est la surprise qui fait la magie ! Chaque box est unique.' },
          ].map((faq, i) => (
            <div key={i} className="border-b border-[#e8e0d8] py-5">
              <h3 className="text-[14px] text-[#2d2a26] mb-2">{faq.q}</h3>
              <p className="text-[13px] text-[#2d2a26]/55 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
