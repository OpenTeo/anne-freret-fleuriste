import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Blog — Conseils Floraux et Inspirations',
  description:
    'Découvrez nos conseils d\'entretien, inspirations florales et actualités. Anne Freret, artisan fleuriste en Normandie depuis 2001.',
  alternates: {
    canonical: 'https://fleuriste-annefreret.com/blog',
  },
  openGraph: {
    title: 'Blog — Conseils Floraux et Inspirations',
    description:
      'Découvrez nos conseils d\'entretien, inspirations florales et actualités. Anne Freret, artisan fleuriste en Normandie depuis 2001.',
    url: 'https://fleuriste-annefreret.com/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd type="BreadcrumbList" pathname="/blog" />
      {children}
    </>
  );
}
