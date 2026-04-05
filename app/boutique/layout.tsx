import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Boutique en Ligne — Commander des Fleurs Artisanales',
  description:
    'Commandez vos bouquets artisanaux en ligne. Livraison en Normandie (Granville, Dinard, Saint-Malo, Dol-de-Bretagne) et partout en France. Fleurs fraîches composées à la main.',
  alternates: {
    canonical: 'https://fleuriste-annefreret.com/boutique',
  },
  openGraph: {
    title: 'Boutique en Ligne — Commander des Fleurs Artisanales',
    description:
      'Commandez vos bouquets artisanaux en ligne. Livraison en Normandie et partout en France. Fleurs fraîches composées à la main.',
    url: 'https://fleuriste-annefreret.com/boutique',
  },
};

export default function BoutiqueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd type="BreadcrumbList" pathname="/boutique" />
      {children}
    </>
  );
}
