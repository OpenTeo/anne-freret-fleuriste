'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function MentionsLegales() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <section className="bg-gray py-6">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-muted hover:text-accent transition-colors">
                Accueil
              </Link>
              <ChevronRight size={16} className="text-muted" />
              <span className="text-primary">Mentions légales</span>
            </nav>
          </div>
        </section>

        {/* Hero section */}
        <section className="bg-primary text-secondary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
              Mentions légales
            </h1>
            <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
              Informations légales et obligations réglementaires du site Anne Freret Fleuriste.
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose prose-lg">
            {/* Éditeur du site */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                1. Éditeur du site
              </h2>
              <div className="bg-gray/50 p-6 rounded-lg">
                <p><strong>Raison sociale :</strong> Anne Freret Fleuriste</p>
                <p><strong>Forme juridique :</strong> Entreprise individuelle</p>
                <p><strong>Siège social :</strong> 39 Place du Général de Gaulle, Saint-Pair-sur-Mer, France</p>
                <p><strong>SIRET :</strong> [À compléter - En cours d'immatriculation]</p>
                <p><strong>Code APE :</strong> 4776Z - Commerce de détail de fleurs, plantes, graines, engrais</p>
                <p><strong>TVA Intracommunautaire :</strong> [À compléter]</p>
                <p><strong>Directrice de publication :</strong> Anne Freret</p>
              </div>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                2. Contact
              </h2>
              <div className="bg-gray/50 p-6 rounded-lg">
                <p><strong>Adresse :</strong> 39 Place du Général de Gaulle, 50270 Saint-Pair-sur-Mer, France</p>
                <p><strong>Téléphone :</strong> 02 33 50 26 15</p>
                <p><strong>Email :</strong> contact@annefreret.fr</p>
                <p><strong>Horaires d'ouverture :</strong></p>
                <ul className="ml-4 mt-2">
                  <li>Lundi - Samedi : 9h00 - 19h00</li>
                  <li>Dimanche : 10h00 - 17h00</li>
                  <li>Fermé les jours fériés</li>
                </ul>
              </div>
            </section>

            {/* Hébergement */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                3. Hébergement
              </h2>
              <div className="bg-gray/50 p-6 rounded-lg">
                <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                <p><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
                <p><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://vercel.com</a></p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                4. Propriété intellectuelle
              </h2>
              <div className="space-y-4">
                <p>
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p>
                  La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
                <p>
                  Les marques et logos reproduits sur ce site sont déposés par les sociétés qui en sont propriétaires.
                </p>
                <p>
                  Les photographies de créations florales présentes sur ce site sont la propriété exclusive d'Anne Freret Fleuriste et ne peuvent être utilisées sans autorisation écrite préalable.
                </p>
              </div>
            </section>

            {/* Données personnelles et cookies */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                5. Données personnelles et cookies
              </h2>
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-semibold text-primary">5.1. Collecte des données</h3>
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la Loi Informatique et Libertés, nous vous informons que les données personnelles collectées sur ce site sont destinées à Anne Freret Fleuriste pour le traitement de vos commandes et la gestion de la relation client.
                </p>
                
                <h3 className="font-serif text-xl font-semibold text-primary">5.2. Droits des utilisateurs</h3>
                <p>
                  Vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité, de limitation du traitement, d'opposition et de ne pas faire l'objet d'une décision individuelle automatisée concernant vos données personnelles.
                </p>
                <p>
                  Pour exercer ces droits, vous pouvez nous contacter à l'adresse : contact@annefreret.fr
                </p>

                <h3 className="font-serif text-xl font-semibold text-primary">5.3. Cookies</h3>
                <p>
                  Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines fonctionnalités du site pourraient ne plus être disponibles.
                </p>
              </div>
            </section>

            {/* Responsabilité */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                6. Limitation de responsabilité
              </h2>
              <div className="space-y-4">
                <p>
                  Anne Freret Fleuriste ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site.
                </p>
                <p>
                  Anne Freret Fleuriste décline toute responsabilité quant à l'utilisation qui pourrait être faite des informations et contenus présents sur ce site.
                </p>
                <p>
                  Anne Freret Fleuriste s'engage à sécuriser au mieux ce site, cependant sa responsabilité ne pourra être mise en cause si des données indésirables sont importées et installées sur son site à son insu.
                </p>
              </div>
            </section>

            {/* Droit applicable */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                7. Droit applicable
              </h2>
              <div className="space-y-4">
                <p>
                  Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
                </p>
                <p>
                  Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à l'adresse : contact@annefreret.fr
                </p>
              </div>
            </section>

            {/* Mise à jour */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                8. Mise à jour
              </h2>
              <div className="bg-gray/50 p-6 rounded-lg">
                <p><strong>Dernière mise à jour :</strong> Février 2025</p>
                <p>
                  Anne Freret Fleuriste se réserve le droit de modifier les présentes mentions légales à tout moment. Il est conseillé de les consulter régulièrement.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}