import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Questions Fréquentes — Anne Freret Fleuriste',
  description:
    'Retrouvez les réponses à vos questions sur la livraison, les commandes, les abonnements et les compositions florales Anne Freret.',
  alternates: {
    canonical: 'https://fleuriste-annefreret.com/faq',
  },
  openGraph: {
    title: 'Questions Fréquentes — Anne Freret Fleuriste',
    description:
      'Retrouvez les réponses à vos questions sur la livraison, les commandes, les abonnements et les compositions florales Anne Freret.',
    url: 'https://fleuriste-annefreret.com/faq',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd type="BreadcrumbList" pathname="/faq" />
      {children}
    </>
  );
}
