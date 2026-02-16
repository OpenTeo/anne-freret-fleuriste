'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const boxes = [
  {
    id: 'box-fraicheur',
    name: 'Box Fraîcheur',
    subtitle: 'Fleurs fraîches de saison',
    price: 39.90,
    description: 'Une sélection de fleurs fraîches de saison, un vase en verre recyclé, du papier kraft, un guide illustré pas à pas et un QR code vers notre tuto vidéo.',
    includes: ['8-12 tiges de fleurs fraîches', 'Vase en verre artisanal', 'Sécateur floral', 'Guide illustré 12 pages', 'Sachet de nourriture pour fleurs'],
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=85',
    badge: 'Populaire',
    color: '#c4a47a',
  },
  {
    id: 'box-eternelle',
    name: 'Box Éternelle',
    subtitle: 'Fleurs séchées & stabilisées',
    price: 49.90,
    description: 'Des fleurs séchées et stabilisées pour créer une composition qui dure des mois. Parfait pour décorer votre intérieur ou offrir un cadeau unique.',
    includes: ['10-15 variétés de fleurs séchées', 'Pampa, lavande, eucalyptus', 'Vase en céramique', 'Fil de fer floral doré', 'Guide de composition', 'Ruban en lin naturel'],
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=85',
    badge: 'Best-seller',
    color: '#b8956a',
  },
  {
    id: 'box-mixte',
    name: 'Box Atelier',
    subtitle: 'Fraîches + séchées — l\'expérience complète',
    price: 64.90,
    description: 'Notre box premium combine fleurs fraîches et séchées pour un atelier complet. Créez un centre de table unique mélangeant les textures et les couleurs.',
    includes: ['6-8 tiges fraîches', '8-10 variétés séchées', 'Mousse florale Oasis', 'Contenant en bois gravé', 'Sécateur + fil de fer', 'Carte message personnalisée', 'Tuto vidéo exclusif'],
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=85',
    badge: 'Premium',
    color: '#8b7355',
  },
]

const steps = [
  { num: '01', title: 'Choisissez votre box', desc: 'Fraîcheur, Éternelle ou Atelier — selon votre envie et votre niveau.' },
  { num: '02', title: 'Recevez chez vous', desc: 'Livraison soignée en 24-48h. Chaque tige est protégée individuellement.' },
  { num: '03', title: 'Suivez le guide', desc: 'Scannez le QR code pour accéder au tuto vidéo ou suivez le guide papier.' },
  { num: '04', title: 'Créez & admirez', desc: 'Composez votre arrangement unique. Partagez votre création avec #AnneFreretDIY !' },
]

export default function DIYPage() {
  const [selectedBox, setSelectedBox] = useState<string | null>(null)

  return (
    <main className="bg-[#faf8f5] min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=1400&q=85"
            alt="Atelier floral DIY"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#faf8f5]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <p className="uppercase text-[11px] tracking-[0.3em] text-white/80 mb-4">Atelier à la maison</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
            Do It Yourself
          </h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
            Recevez une box complète et créez votre propre arrangement floral chez vous. 
            Fraîches ou séchées — libérez votre créativité.
          </p>
          <a href="#boxes" className="inline-block mt-8 px-8 py-3 bg-[#c4a47a] text-white text-sm uppercase tracking-[0.15em] hover:bg-[#b8956a] transition-colors duration-500">
            Découvrir les box
          </a>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <p className="uppercase text-[10px] tracking-[0.25em] text-[#c4a47a] mb-3">Simple & amusant</p>
          <h2 className="text-3xl md:text-4xl text-[#2d2a26]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
            Comment ça marche
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full border border-[#c4a47a]/30 flex items-center justify-center group-hover:bg-[#c4a47a]/10 transition-colors duration-500">
                <span className="text-[#c4a47a] text-lg font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{step.num}</span>
              </div>
              <h3 className="text-sm uppercase tracking-[0.12em] text-[#2d2a26] mb-2">{step.title}</h3>
              <p className="text-[13px] text-[#2d2a26]/60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Les Box */}
      <section id="boxes" className="max-w-6xl mx-auto px-4 pb-24">
        <div className="text-center mb-16">
          <p className="uppercase text-[10px] tracking-[0.25em] text-[#c4a47a] mb-3">Nos créations</p>
          <h2 className="text-3xl md:text-4xl text-[#2d2a26]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
            Choisissez votre box
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {boxes.map((box) => (
            <div
              key={box.id}
              className="bg-white group cursor-pointer hover:shadow-lg transition-all duration-700"
              onClick={() => setSelectedBox(selectedBox === box.id ? null : box.id)}
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={box.image}
                  alt={box.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[#2d2a26]">
                    {box.badge}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: '#2d2a26' }}>
                  {box.name}
                </h3>
                <p className="text-[11px] uppercase tracking-[0.15em] text-[#c4a47a] mb-3">{box.subtitle}</p>
                <p className="text-[13px] text-[#2d2a26]/60 leading-relaxed mb-4">{box.description}</p>
                
                {/* Contenu de la box */}
                <div className={`overflow-hidden transition-all duration-500 ${selectedBox === box.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="border-t border-[#e8e0d8] pt-4 mt-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] mb-3">Contenu de la box</p>
                    <ul className="space-y-1.5">
                      {box.includes.map((item, i) => (
                        <li key={i} className="text-[12px] text-[#2d2a26]/70 flex items-start gap-2">
                          <span className="text-[#c4a47a] mt-0.5">✦</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e8e0d8]">
                  <span className="text-xl text-[#2d2a26]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {box.price.toFixed(2)}€
                  </span>
                  <button className="text-[10px] uppercase tracking-[0.2em] text-[#c4a47a] border border-[#c4a47a]/40 px-4 py-2 hover:bg-[#c4a47a] hover:text-white transition-all duration-500">
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bannière inspiration */}
      <section className="bg-[#2d2a26] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="uppercase text-[10px] tracking-[0.25em] text-[#c4a47a] mb-4">Inspiration</p>
          <h2 className="text-3xl md:text-4xl text-white/90 mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
            Partagez vos créations
          </h2>
          <p className="text-white/50 text-[14px] leading-relaxed max-w-lg mx-auto mb-8">
            Identifiez <span className="text-[#c4a47a]">@annefreret</span> et utilisez le hashtag <span className="text-[#c4a47a]">#AnneFreretDIY</span> sur Instagram. 
            Les plus belles compositions seront partagées sur notre page.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {['🌸', '🌿', '💐', '🌾'].map((emoji, i) => (
              <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded flex items-center justify-center text-3xl hover:bg-white/10 transition-colors duration-500">
                {emoji}
              </div>
            ))}
          </div>
          <p className="text-white/30 text-[11px] mt-4 italic">Vos photos apparaîtront ici</p>
        </div>
      </section>

      {/* FAQ DIY */}
      <section className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-[#2d2a26]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
            Questions fréquentes
          </h2>
        </div>
        <div className="space-y-6">
          {[
            { q: 'Faut-il avoir de l\'expérience en art floral ?', a: 'Absolument pas ! Nos box sont conçues pour tous les niveaux. Le guide illustré et le tuto vidéo vous accompagnent étape par étape.' },
            { q: 'Combien de temps durent les compositions ?', a: 'Les fleurs fraîches durent 7 à 10 jours avec le sachet nutritif inclus. Les fleurs séchées et stabilisées durent 6 mois à 2 ans.' },
            { q: 'Peut-on offrir une box en cadeau ?', a: 'Bien sûr ! Ajoutez une carte message personnalisée lors de la commande. La box arrive dans un packaging cadeau soigné.' },
            { q: 'Livrez-vous partout en France ?', a: 'Oui, livraison en 24-48h partout en France métropolitaine. Les fleurs fraîches sont expédiées en colis réfrigéré.' },
          ].map((faq, i) => (
            <div key={i} className="border-b border-[#e8e0d8] pb-5">
              <h3 className="text-[14px] text-[#2d2a26] font-medium mb-2">{faq.q}</h3>
              <p className="text-[13px] text-[#2d2a26]/60 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
