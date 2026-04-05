import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Contact — Anne Freret Fleuriste à Saint-Pair-sur-Mer',
  description:
    'Contactez Anne Freret Fleuriste à Saint-Pair-sur-Mer (50380), Normandie. Commandes, devis mariage, compositions sur mesure. Livraison Granville, Manche et Normandie.',
  alternates: {
    canonical: 'https://fleuriste-annefreret.com/contact',
  },
  openGraph: {
    title: 'Contact — Anne Freret Fleuriste à Saint-Pair-sur-Mer',
    description:
      'Contactez Anne Freret Fleuriste à Saint-Pair-sur-Mer (50380), Normandie. Commandes, devis mariage, compositions sur mesure.',
    url: 'https://fleuriste-annefreret.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd type="BreadcrumbList" pathname="/contact" />
      {children}
    </>
  );
}
