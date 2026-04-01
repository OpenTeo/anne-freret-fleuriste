import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Contact — Anne Freret Fleuriste à Barneville-Carteret',
  description:
    'Contactez Anne Freret Fleuriste à Barneville-Carteret (50270), Cotentin. Commandes, devis mariage, compositions sur mesure. Livraison Granville, Manche et Normandie.',
  alternates: {
    canonical: 'https://fleuriste-annefreret.com/contact',
  },
  openGraph: {
    title: 'Contact — Anne Freret Fleuriste à Barneville-Carteret',
    description:
      'Contactez Anne Freret Fleuriste à Barneville-Carteret (50270), Cotentin. Commandes, devis mariage, compositions sur mesure.',
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
