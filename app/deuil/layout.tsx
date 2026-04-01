import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Fleurs de Deuil — Compositions Funéraires Livrées en Normandie',
  description:
    'Compositions de deuil artisanales livrées avec soin à Granville, Avranches, Coutances, Caen et toute la Normandie. Gerbes, coussins, couronnes. Ruban personnalisé inclus.',
  alternates: {
    canonical: 'https://fleuriste-annefreret.com/deuil',
  },
  openGraph: {
    title: 'Fleurs de Deuil — Compositions Funéraires Livrées en Normandie',
    description:
      'Compositions de deuil artisanales livrées avec soin à Granville, Avranches, Coutances, Caen et toute la Normandie.',
    url: 'https://fleuriste-annefreret.com/deuil',
  },
};

export default function DeuilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd type="BreadcrumbList" pathname="/deuil" />
      {children}
    </>
  );
}
