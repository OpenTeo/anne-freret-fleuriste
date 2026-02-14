'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function CGV() {
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
              <span className="text-primary">Conditions Générales de Vente</span>
            </nav>
          </div>
        </section>

        {/* Hero section */}
        <section className="bg-primary text-secondary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">
              Conditions Générales de Vente
            </h1>
            <p className="text-lg text-secondary/80 max-w-2xl mx-auto">
              Conditions applicables à toutes les ventes réalisées par Anne Freret Fleuriste.
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose prose-lg">
            
            {/* Préambule */}
            <section className="mb-12">
              <div className="bg-accent/10 p-6 rounded-lg mb-8">
                <p className="text-primary font-medium">
                  Les présentes Conditions Générales de Vente (CGV) régissent toutes les ventes de produits et services réalisées par Anne Freret Fleuriste, 
                  entreprise individuelle située à 39 place Générale de Gaulle, Saint-Pair-sur-Mer. 
                  Toute commande implique l'acceptation pleine et entière de ces conditions.
                </p>
              </div>
            </section>

            {/* Article 1 */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                Article 1 - Objet
              </h2>
              <div className="space-y-4">
                <p>
                  Les présentes Conditions Générales de Vente ont pour objet de définir les modalités et conditions dans lesquelles 
                  Anne Freret Fleuriste propose à la vente ses produits et services :
                </p>
                <ul className="ml-6 space-y-2">
                  <li>• Bouquets de fleurs fraîches</li>
                  <li>• Compositions florales</li>
                  <li>• Arrangements pour événements (mariages, obsèques, etc.)</li>
                  <li>• Plantes vertes et fleuries</li>
                  <li>• Accessoires de décoration florale</li>
                  <li>• Services de livraison</li>
                  <li>• Prestations de décoration florale</li>
                </ul>
                <p>
                  Ces conditions s'appliquent à toutes les ventes réalisées en magasin, par téléphone, ou via le site internet.
                </p>
              </div>
            </section>

            {/* Article 2 */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                Article 2 - Prix
              </h2>
              <div className="space-y-4">
                <p>
                  <strong>2.1. Tarification :</strong> Les prix de nos produits sont affichés en euros, toutes taxes comprises (TTC). 
                  Ils incluent la TVA au taux légal en vigueur à la date de la commande.
                </p>
                <p>
                  <strong>2.2. Frais de livraison :</strong> Les frais de livraison sont calculés en fonction de la zone géographique 
                  et du type de produit. Ils sont clairement indiqués avant la validation de votre commande.
                </p>
                <p>
                  <strong>2.3. Évolution des prix :</strong> Anne Freret Fleuriste se réserve le droit de modifier ses prix à tout moment. 
                  Toutefois, les prix applicables sont ceux en vigueur au moment de la validation de votre commande.
                </p>
                <p>
                  <strong>2.4. Promotions :</strong> Les offres promotionnelles sont valables dans la limite des stocks disponibles 
                  et pendant la période indiquée. Elles ne sont pas cumulables sauf indication contraire.
                </p>
              </div>
            </section>

            {/* Article 3 */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                Article 3 - Commande
              </h2>
              <div className="space-y-4">
                <p>
                  <strong>3.1. Passation de commande :</strong> Les commandes peuvent être passées :
                </p>
                <ul className="ml-6 space-y-2">
                  <li>• En magasin : Place de l'Église, 50270 Saint-Pair-sur-Mer</li>
                  <li>• Par téléphone : 02 33 50 26 15</li>
                  <li>• Sur notre site internet : annefreret.fr</li>
                  <li>• Par email : contact@annefreret.fr</li>
                </ul>
                <p>
                  <strong>3.2. Validation :</strong> Toute commande n'est définitive qu'après validation de votre part et acceptation 
                  de notre part. Une confirmation vous sera envoyée par email dans les meilleurs délais.
                </p>
                <p>
                  <strong>3.3. Disponibilité :</strong> Nos offres sont valables sous réserve de disponibilité. En cas d'indisponibilité 
                  d'un produit, nous vous proposons un produit de substitution de qualité et de valeur équivalentes.
                </p>
                <p>
                  <strong>3.4. Informations requises :</strong> Pour toute commande, vous devez fournir des informations exactes et complètes 
                  (nom, adresse, téléphone, email). Anne Freret Fleuriste ne saurait être tenue responsable d'erreurs de livraison 
                  dues à des informations erronées.
                </p>
              </div>
            </section>

            {/* Article 4 */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                Article 4 - Paiement
              </h2>
              <div className="space-y-4">
                <p>
                  <strong>4.1. Modalités :</strong> Le paiement s'effectue au moment de la commande par les moyens suivants :
                </p>
                <ul className="ml-6 space-y-2">
                  <li>• Carte bancaire (Visa, Mastercard, American Express)</li>
                  <li>• Espèces (pour les achats en magasin)</li>
                  <li>• Chèque (pour les achats en magasin)</li>
                  <li>• Virement bancaire (pour les commandes importantes)</li>
                </ul>
                <p>
                  <strong>4.2. Sécurité :</strong> Les paiements en ligne sont sécurisés par le protocole SSL et traités par des prestataires 
                  certifiés. Vos données bancaires ne sont jamais stockées sur nos serveurs.
                </p>
                <p>
                  <strong>4.3. Facturation :</strong> Une facture vous sera remise ou envoyée par email après paiement.
                </p>
              </div>
            </section>

            {/* Article 5 */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                Article 5 - Livraison
              </h2>
              <div className="space-y-4">
                <p>
                  <strong>5.1. Zone de livraison :</strong> Nous livrons sur toute la France métropolitaine. Des conditions particulières 
                  s'appliquent pour la Corse et les DOM-TOM (nous consulter).
                </p>
                <p>
                  <strong>5.2. Délais :</strong>
                </p>
                <ul className="ml-6 space-y-2">
                  <li>• Livraison express : 24 à 48 heures ouvrées</li>
                  <li>• Livraison standard : 2 à 4 jours ouvrés</li>
                  <li>• Livraison à date choisie : selon disponibilités</li>
                </ul>
                <p>
                  <strong>5.3. Emballage spécialisé :</strong> Nos fleurs fraîches sont emballées dans des contenants spéciaux 
                  avec réserve d'eau pour garantir leur fraîcheur pendant le transport.
                </p>
                <p>
                  <strong>5.4. Réception :</strong> La livraison s'effectue à l'adresse indiquée. Il est recommandé qu'une personne 
                  soit présente pour réceptionner les fleurs fraîches. En cas d'absence, nous laisserons un avis de passage.
                </p>
                <p>
                  <strong>5.5. Retard de livraison :</strong> En cas de retard imputable au transporteur, Anne Freret Fleuriste 
                  s'engage à rechercher votre colis et à vous tenir informé. Aucune pénalité ne sera due pour un retard de livraison.
                </p>
              </div>
            </section>

            {/* Article 6 */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                Article 6 - Droit de rétractation
              </h2>
              <div className="space-y-4 bg-amber-50 p-6 rounded-lg">
                <p className="font-medium text-primary">
                  ⚠️ <strong>Important :</strong> Conformément à l'article L221-28 du Code de la consommation, 
                  <strong> les fleurs coupées et compositions florales fraîches sont exclues du droit de rétractation</strong> 
                  en raison de leur caractère périssable.
                </p>
                <p>
                  <strong>6.1. Produits périssables :</strong> Les bouquets de fleurs fraîches, compositions florales 
                  et plantes ne peuvent faire l'objet d'un retour ou d'un remboursement, sauf en cas de vice apparent 
                  à la livraison.
                </p>
                <p>
                  <strong>6.2. Autres produits :</strong> Pour les accessoires et produits non périssables, 
                  vous disposez d'un délai de 14 jours à compter de la réception pour exercer votre droit de rétractation.
                </p>
                <p>
                  <strong>6.3. Modalités de retour :</strong> Les produits doivent être retournés dans leur état d'origine, 
                  dans leur emballage d'origine, accompagnés de la facture. Les frais de retour sont à votre charge.
                </p>
              </div>
            </section>

            {/* Article 7 */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                Article 7 - Garantie et réclamations
              </h2>
              <div className="space-y-4">
                <p>
                  <strong>7.1. Garantie fraîcheur :</strong> Nous garantissons la fraîcheur de nos fleurs au moment de la livraison. 
                  Si vous constatez que vos fleurs sont fanées ou endommagées à la réception, nous nous engageons à les remplacer 
                  gratuitement.
                </p>
                <p>
                  <strong>7.2. Délai de réclamation :</strong> Toute réclamation concernant l'état des fleurs doit être formulée 
                  dans les 24 heures suivant la livraison, accompagnée de photos.
                </p>
                <p>
                  <strong>7.3. Procédure :</strong> Les réclamations doivent être adressées :
                </p>
                <ul className="ml-6 space-y-2">
                  <li>• Par email : contact@annefreret.fr</li>
                  <li>• Par téléphone : 02 33 50 26 15</li>
                  <li>• Par courrier : Place de l'Église, 50270 Saint-Pair-sur-Mer</li>
                </ul>
                <p>
                  <strong>7.4. Durée de vie :</strong> Nous ne pouvons garantir la durée de vie des fleurs au-delà de la livraison, 
                  celle-ci dépendant des conditions de conservation et d'entretien.
                </p>
              </div>
            </section>

            {/* Article 8 */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                Article 8 - Données personnelles
              </h2>
              <div className="space-y-4">
                <p>
                  <strong>8.1. Collecte et traitement :</strong> Conformément au RGPD et à la Loi Informatique et Libertés, 
                  les données personnelles collectées sont nécessaires au traitement de vos commandes et à la gestion de notre relation commerciale.
                </p>
                <p>
                  <strong>8.2. Finalités :</strong> Vos données sont utilisées pour :
                </p>
                <ul className="ml-6 space-y-2">
                  <li>• Traiter et livrer vos commandes</li>
                  <li>• Gérer le service client</li>
                  <li>• Vous informer de nos offres (avec votre consentement)</li>
                  <li>• Respecter nos obligations légales</li>
                </ul>
                <p>
                  <strong>8.3. Droits :</strong> Vous disposez des droits d'accès, de rectification, d'effacement, 
                  d'opposition et de portabilité de vos données. Pour les exercer : contact@annefreret.fr
                </p>
              </div>
            </section>

            {/* Article 9 */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                Article 9 - Propriété intellectuelle
              </h2>
              <div className="space-y-4">
                <p>
                  <strong>9.1. Protection :</strong> Tous les contenus de notre site (textes, images, photos, logos, créations florales) 
                  sont protégés par les droits de propriété intellectuelle et appartiennent à Anne Freret Fleuriste.
                </p>
                <p>
                  <strong>9.2. Utilisation :</strong> Toute reproduction, représentation, adaptation ou exploitation, 
                  même partielle, est strictement interdite sans autorisation écrite préalable.
                </p>
                <p>
                  <strong>9.3. Créations :</strong> Nos créations florales sont des œuvres originales. 
                  Leur reproduction à des fins commerciales est interdite.
                </p>
              </div>
            </section>

            {/* Article 10 */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">
                Article 10 - Droit applicable et juridiction
              </h2>
              <div className="space-y-4">
                <p>
                  <strong>10.1. Droit applicable :</strong> Les présentes CGV sont régies par le droit français.
                </p>
                <p>
                  <strong>10.2. Médiation :</strong> En cas de litige, nous privilégions une solution amiable. 
                  Vous pouvez recourir à une médiation de la consommation ou saisir les tribunaux compétents.
                </p>
                <p>
                  <strong>10.3. Juridiction :</strong> En cas d'échec de la médiation, les tribunaux de Coutances seront seuls compétents, 
                  nonobstant pluralité de défendeurs ou appel en garantie.
                </p>
                <p>
                  <strong>10.4. Nullité partielle :</strong> Si une clause des présentes CGV était déclarée nulle, 
                  cela n'affecterait pas la validité des autres clauses.
                </p>
              </div>
            </section>

            {/* Contact et mise à jour */}
            <section className="mb-12">
              <div className="bg-gray/50 p-6 rounded-lg">
                <h3 className="font-serif text-xl font-semibold text-primary mb-4">Contact et mise à jour</h3>
                <p><strong>Dernière mise à jour :</strong> Février 2025</p>
                <p>
                  Pour toute question concernant ces CGV : contact@annefreret.fr ou 02 33 50 26 15
                </p>
                <p className="text-sm text-muted mt-4">
                  Anne Freret Fleuriste se réserve le droit de modifier ces CGV à tout moment. 
                  Les conditions applicables sont celles en vigueur au moment de votre commande.
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