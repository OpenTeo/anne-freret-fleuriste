import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Abonnement Fleurs — Bouquets de Saison Livrés Chaque Mois',
  description:
    'Abonnement bouquet mensuel livré chez vous. Fleurs de saison composées par Anne Freret, artisan fleuriste en Normandie. Dès 39,90€/mois, sans engagement.',
  alternates: {
    canonical: 'https://fleuriste-annefreret.com/abonnement',
  },
  openGraph: {
    title: 'Abonnement Fleurs — Bouquets de Saison Livrés Chaque Mois',
    description:
      'Abonnement bouquet mensuel livré chez vous. Fleurs de saison composées par Anne Freret. Dès 39,90€/mois, sans engagement.',
    url: 'https://fleuriste-annefreret.com/abonnement',
  },
};

export default function AbonnementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd type="BreadcrumbList" pathname="/abonnement" />
      {children}
    </>
  );
}
