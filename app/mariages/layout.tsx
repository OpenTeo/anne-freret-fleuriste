import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Fleuriste Mariage Normandie — Décoration Florale Sur Mesure',
  description:
    'Fleuriste mariage en Normandie depuis 2001. Bouquets de mariée, décoration cérémonie et réception à Granville, Dinard, Saint-Malo et toute la Normandie. Consultation personnalisée.',
  alternates: {
    canonical: 'https://fleuriste-annefreret.com/mariages',
  },
  openGraph: {
    title: 'Fleuriste Mariage Normandie — Décoration Florale Sur Mesure',
    description:
      'Fleuriste mariage en Normandie depuis 2001. Bouquets de mariée, décoration cérémonie et réception. Consultation personnalisée.',
    url: 'https://fleuriste-annefreret.com/mariages',
  },
};

export default function MariagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd type="BreadcrumbList" pathname="/mariages" />
      {children}
    </>
  );
}
