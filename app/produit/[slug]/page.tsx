import type { Metadata } from 'next';
import { mockProducts } from '@/lib/mock-data';
import { sql } from '@/lib/db';
import ProductPageClient from './ProductPageClient';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const result = await sql`SELECT slug FROM products WHERE is_active = true`;
    return result.rows.map((r) => ({ slug: r.slug as string }));
  } catch {
    return mockProducts.map((product) => ({ slug: product.slug }));
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const result = await sql`
      SELECT name, description, images, slug
      FROM products
      WHERE (slug = ${slug} OR id = ${slug}) AND is_active = true
      LIMIT 1
    `;

    if (result.rows.length > 0) {
      const product = result.rows[0];
      const title = `${product.name} — Bouquet Artisanal | Anne Freret Fleuriste`;
      const description = product.description
        ? product.description.slice(0, 155)
        : `${product.name} - Bouquet artisanal composé à la main par Anne Freret Fleuriste en Normandie.`;
      const images = product.images as string[];
      const imageUrl = images?.[0]?.startsWith('http')
        ? images[0]
        : 'https://fleuriste-annefreret.com/images/og-image.jpg';

      return {
        title,
        description,
        alternates: { canonical: `https://fleuriste-annefreret.com/produit/${product.slug}` },
        openGraph: {
          title,
          description,
          url: `https://fleuriste-annefreret.com/produit/${product.slug}`,
          images: [{ url: imageUrl, width: 1200, height: 1200, alt: product.name }],
          type: 'website',
        },
      };
    }
  } catch (error) {
    console.error('Error generating product metadata:', error);
  }

  // Fallback to mockProducts
  const product = mockProducts.find((p) => p.slug === slug);
  if (!product) {
    return { title: 'Produit non trouvé', description: "Ce produit n'existe pas." };
  }

  const title = `${product.name} — Bouquet Artisanal | Anne Freret Fleuriste`;
  const description = product.description
    ? product.description.slice(0, 155)
    : `${product.name} - Bouquet artisanal composé à la main par Anne Freret Fleuriste en Normandie.`;

  return {
    title,
    description,
    alternates: { canonical: `https://fleuriste-annefreret.com/produit/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://fleuriste-annefreret.com/produit/${slug}`,
      images: [{ url: product.image, width: 1200, height: 1200, alt: product.name }],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductPageClient params={{ slug }} />;
}
