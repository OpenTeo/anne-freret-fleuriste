'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

/* ─── Photos réelles Anne Freret ─── */
const gallery = {
  bouquets: [
    { src: '/images/mariages/bouquet-mariee-vert.jpg', alt: 'Bouquet de mariée champêtre verdure', credit: '© Bastien Norrington' },
    { src: '/images/mariages/bouquet-fauteuil-rouge.jpg', alt: 'Bouquet de mariée rouge passion sur fauteuil', credit: '© Bastien Norrington' },
    { src: '/images/mariages/boutonniere.jpg', alt: 'Boutonnière marié', credit: '© Bastien Norrington' },
  ],
  tables: [
    { src: '/images/mariages/centre-table-rose.jpg', alt: 'Centre de table roses et pivoines' },
    { src: '/images/mariages/centre-table-blanc.jpg', alt: 'Centre de table blanc et vert' },
    { src: '/images/mariages/centre-table-rouge.jpg', alt: 'Centre de table rouge passion', credit: '© Bastien Norrington' },
    { src: '/images/mariages/couverts-fleurs.jpg', alt: 'Détail couverts et fleurs' },
  ],
  ambiances: [
    { src: '/images/mariages/salle-reception.jpg', alt: 'Salle de réception décorée de fleurs' },
    { src: '/images/mariages/table-vue-mer.jpg', alt: 'Table dressée avec vue mer en Normandie' },
    { src: '/images/mariages/table-cheminee.jpg', alt: 'Table intimiste cheminée et bougies' },
    { src: '/images/mariages/table-bougies-rouge.jpg', alt: 'Ambiance chaleureuse bougies et roses rouges', credit: '© Bastien Norrington' },
    { src: '/images/mariages/velo-tournesols.jpg', alt: 'Vélo vintage décoré de tournesols' },
    { src: '/images/mariages/roses-alignees.jpg', alt: 'Roses alignées en décoration' },
  ],
  coulisses: [
    { src: '/images/mariages/fleuriste-action.jpg', alt: 'Anne en pleine création', credit: '© Bastien Norrington' },
    { src: '/images/mariages/fleuriste-preparation.jpg', alt: 'Préparation des compositions', credit: '© Bastien Norrington' },
    { src: '/images/mariages/fleuriste-preparation-2.jpg', alt: 'Les mains dans les fleurs', credit: '© Bastien Norrington' },
    { src: '/images/mariages/vase-pierre.jpg', alt: 'Vase en pierre avec composition', credit: '© Bastien Norrington' },
  ],
};

export default function Mariages() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    dateMariage: '',
    lieuMariage: '',
    nombreInvites: '',
    budget: '',
    message: ''
  });

  const [lightbox, setLightbox] = useState<{ src: string; alt: string; credit?: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Demande de devis:', formData);
  };

  return (
    <>
      <Header />
      
      <main className="bg-[#faf8f5] min-h-screen pt-20">
        
        {/* ════ HERO ════ */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <Image
            src="/images/mariages/salle-reception.jpg"
            alt="Salle de réception mariage fleurie — Anne Freret"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <div className="bg-white/60 backdrop-blur-[3px] px-8 py-8 md:px-14 md:py-12 text-center max-w-xl border border-white/40">
              <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-[#b8935a] mb-4">
                Fleuriste Mariage · Normandie
              </p>
              <h1 className="font-serif text-4xl md:text-6xl text-[#2d2a26] mb-4">
                Votre jour, nos fleurs
              </h1>
              <div className="w-12 h-px bg-[#b8935a] mx-auto mb-4" />
              <p className="text-[#2d2a26]/70 text-base md:text-lg font-light max-w-xl mx-auto mb-8">
                Chaque mariage est unique. Anne crée vos compositions à la main, 
                avec des fleurs d'Europe sélectionnées avec soin.
              </p>
              <a
                href="#devis"
                className="inline-block bg-[#b8935a] text-white px-8 py-3 text-sm uppercase tracking-[0.1em] hover:bg-[#a6834e] transition-colors"
              >
                Demander un devis gratuit
              </a>
            </div>
          </div>
        </section>

        {/* ════ INTRO HUMAINE ════ */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/mariages/fleuriste-action.jpg"
                  alt="Anne Freret en pleine création florale"
                  fill
                  className="object-cover"
                />
                <p className="absolute bottom-3 right-3 text-[9px] text-white/60 drop-shadow-md">© Bastien Norrington</p>
              </div>
              <div className="lg:pl-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#b8935a] mb-4">
                  Une artisan à vos côtés
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-6 leading-tight">
                  Pas juste des fleurs.<br />
                  <span className="italic" style={{ color: '#b8935a' }}>Votre histoire.</span>
                </h2>
                <p className="text-[#2d2a26]/70 font-light leading-relaxed mb-4">
                  Depuis plus de 20 ans, Anne conçoit les décorations florales de mariages en Normandie 
                  et au-delà. Accompagnée par Charles et toute l'équipe, qui partagent cette aventure depuis quelques années, 
                  chaque projet est porté par cette passion commune. Chaque couple est différent, 
                  chaque lieu a son caractère — c'est ce qui rend ce métier passionnant.
                </p>
                <p className="text-[#2d2a26]/70 font-light leading-relaxed mb-6">
                  Du premier rendez-vous à l'installation le jour J, Anne est là. Elle écoute, 
                  propose, ajuste. Le résultat ? Des compositions qui vous ressemblent, 
                  réalisées avec des fleurs fraîches, toutes de provenance européenne.
                </p>
                <div className="flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.15em] text-[#b8935a]">
                  <span className="border border-[#b8935a]/30 px-4 py-2">Bouquets de mariée</span>
                  <span className="border border-[#b8935a]/30 px-4 py-2">Centres de table</span>
                  <span className="border border-[#b8935a]/30 px-4 py-2">Arches & décor</span>
                  <span className="border border-[#b8935a]/30 px-4 py-2">Boutonnières</span>
                  <span className="border border-[#b8935a]/30 px-4 py-2">Véhicules</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════ BOUQUETS DE MARIÉE ════ */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#b8935a] mb-3">Le bouquet</p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-4">
                L'accessoire le plus photographié
              </h2>
              <p className="text-[#2d2a26]/60 font-light max-w-lg mx-auto">
                Rond, cascade, champêtre ou structuré — votre bouquet est composé selon 
                vos goûts, votre robe et la palette de votre mariage.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gallery.bouquets.map((img, i) => (
                <button key={i} onClick={() => setLightbox(img)} className="group relative aspect-[3/4] overflow-hidden">
                  <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  {img.credit && <p className="absolute bottom-2 right-2 text-[8px] text-white/50">{img.credit}</p>}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ════ CENTRES DE TABLE ════ */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#b8935a] mb-3">Les tables</p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-4">
                Là où tout le monde s'assoit et se souvient
              </h2>
              <p className="text-[#2d2a26]/60 font-light max-w-lg mx-auto">
                Compositions basses, hautes, chemins de table fleuris... 
                Chaque détail compte pour créer l'ambiance parfaite.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.tables.map((img, i) => (
                <button key={i} onClick={() => setLightbox(img)} className="group relative aspect-square overflow-hidden">
                  <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  {img.credit && <p className="absolute bottom-2 right-2 text-[8px] text-white/50">{img.credit}</p>}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ════ AMBIANCES & LIEUX ════ */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#b8935a] mb-3">Ambiances</p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-4">
                Chaque lieu raconte une histoire
              </h2>
              <p className="text-[#2d2a26]/60 font-light max-w-lg mx-auto">
                Manoir normand, bord de mer, jardin champêtre — Anne adapte 
                ses créations à votre lieu et à votre univers.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.ambiances.map((img, i) => (
                <button key={i} onClick={() => setLightbox(img)} className="group relative aspect-[4/5] overflow-hidden">
                  <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  {img.credit && <p className="absolute bottom-2 right-2 text-[8px] text-white/50">{img.credit}</p>}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ════ EN COULISSES ════ */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#b8935a] mb-4">
                  En coulisses
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-6 leading-tight">
                  Les mains dans les fleurs,<br />
                  <span className="italic" style={{ color: '#b8935a' }}>la tête dans votre projet</span>
                </h2>
                <p className="text-[#2d2a26]/70 font-light leading-relaxed mb-4">
                  Derrière chaque composition, il y a des heures de préparation. 
                  Sélection de fleurs de provenance européenne, conditionnement, assemblage minutieux — 
                  tout est fait à la main dans notre atelier de Saint-Pair-sur-Mer.
                </p>
                <p className="text-[#2d2a26]/70 font-light leading-relaxed mb-8">
                  Le jour J, Anne et son équipe installent tout sur place. 
                  Vous n'avez rien à faire — juste profiter.
                </p>

                {/* Étapes */}
                <div className="space-y-6">
                  {[
                    { step: '01', title: 'Rencontre', desc: 'On se rencontre, on parle de vos envies, du lieu, des couleurs.' },
                    { step: '02', title: 'Proposition', desc: 'Anne vous envoie un projet détaillé avec ses recommandations.' },
                    { step: '03', title: 'Création', desc: 'Les compositions sont réalisées la veille et le matin du mariage.' },
                    { step: '04', title: 'Installation', desc: 'Tout est mis en place sur le lieu — vous arrivez, c\'est prêt.' },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <span className="font-serif text-2xl text-[#b8935a]/30 leading-none">{item.step}</span>
                      <div>
                        <p className="text-sm font-medium text-[#2d2a26] mb-0.5">{item.title}</p>
                        <p className="text-xs text-[#2d2a26]/50 font-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 grid grid-cols-2 gap-3">
                {gallery.coulisses.map((img, i) => (
                  <button key={i} onClick={() => setLightbox(img)} className="group relative aspect-[3/4] overflow-hidden">
                    <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    {img.credit && <p className="absolute bottom-2 right-2 text-[8px] text-white/50">{img.credit}</p>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════ CHIFFRES ════ */}
        <section className="py-12 bg-[#2d2a26]">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: '20+', label: 'ans d\'expérience' },
                { num: '1000+', label: 'mariages fleuris' },
                { num: '100%', label: 'sur-mesure' },
                { num: 'Normandie', label: 'et au-delà' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl md:text-4xl text-[#b8935a] mb-1">{stat.num}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════ FORMULAIRE DEVIS ════ */}
        <section id="devis" className="py-16 md:py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              
              <div className="text-center mb-12">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#b8935a] mb-4">
                  Demande de devis
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#2d2a26] mb-4">
                  Racontez-nous votre projet
                </h2>
                <p className="text-[#2d2a26]/60 font-light max-w-md mx-auto">
                  Gratuit et sans engagement. Anne vous répond personnellement sous 48h.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 space-y-6 border border-[#e8e0d8]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-3">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#b8935a] focus:outline-none transition-colors font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-3">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#b8935a] focus:outline-none transition-colors font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-3">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#b8935a] focus:outline-none transition-colors font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-3">
                      Date du mariage
                    </label>
                    <input
                      type="date"
                      name="dateMariage"
                      value={formData.dateMariage}
                      onChange={handleInputChange}
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#b8935a] focus:outline-none transition-colors font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-3">
                      Lieu de la cérémonie
                    </label>
                    <input
                      type="text"
                      name="lieuMariage"
                      value={formData.lieuMariage}
                      onChange={handleInputChange}
                      placeholder="Ex: Château de..., Plage de..."
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] placeholder-[#2d2a26]/30 focus:border-[#b8935a] focus:outline-none transition-colors font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-3">
                      Budget estimé
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] focus:border-[#b8935a] focus:outline-none transition-colors font-light"
                    >
                      <option value="">Sélectionner</option>
                      <option value="500-1000">500€ – 1 000€</option>
                      <option value="1000-2000">1 000€ – 2 000€</option>
                      <option value="2000-3500">2 000€ – 3 500€</option>
                      <option value="3500-5000">3 500€ – 5 000€</option>
                      <option value="5000+">5 000€ et plus</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-[#b8935a] mb-3">
                    Décrivez votre projet
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Vos couleurs, votre style, le nombre de tables, ce dont vous rêvez..."
                    className="w-full border border-[#e8e0d8] px-4 py-3 text-[#2d2a26] placeholder-[#2d2a26]/30 focus:border-[#b8935a] focus:outline-none transition-colors resize-none font-light"
                  />
                </div>
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="bg-[#b8935a] text-white px-10 py-4 text-sm uppercase tracking-[0.1em] hover:bg-[#a6834e] transition-colors"
                  >
                    Envoyer ma demande
                  </button>
                  <p className="text-[11px] text-[#2d2a26]/40 mt-4">
                    Ou écrivez directement à{' '}
                    <a href="mailto:evenementiel@fleuriste-annefreret.com" className="text-[#b8935a] hover:underline">
                      evenementiel@fleuriste-annefreret.com
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ════ LIGHTBOX ════ */}
      {lightbox && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[85vh]">
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={1600}
              className="object-contain w-full h-full max-h-[85vh]"
            />
            {lightbox.credit && (
              <p className="absolute bottom-4 right-4 text-xs text-white/60">{lightbox.credit}</p>
            )}
            <button 
              className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
