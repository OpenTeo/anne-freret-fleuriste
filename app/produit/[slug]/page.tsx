import type { Metadata } from 'next';
import { mockProducts } from '@/lib/mock-data';
import ProductPageClient from './ProductPageClient';

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  // Try to fetch product from API
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${apiUrl}/api/products/${slug}`, {
      next: { revalidate: 3600 },
    });
    
    if (response.ok) {
      const data = await response.json();
      const product = data.product;
      
      const title = `${product.name} — Bouquet Artisanal | Anne Freret Fleuriste`;
      const description = product.description 
        ? product.description.slice(0, 155) 
        : `${product.name} - Bouquet artisanal composé à la main par Anne Freret Fleuriste en Normandie.`;
      
      const imageUrl = product.images?.[0] 
        ? `https://fleuriste-annefreret.com${product.images[0]}`
        : 'https://fleuriste-annefreret.com/images/og-image.jpg';
      
      return {
        title,
        description,
        alternates: {
          canonical: `https://fleuriste-annefreret.com/produit/${slug}`,
        },
        openGraph: {
          title,
          description,
          url: `https://fleuriste-annefreret.com/produit/${slug}`,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 1200,
              alt: product.name,
            },
          ],
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
    return {
      title: 'Produit non trouvé',
      description: 'Ce produit n\'existe pas.',
    };
  }
  
  const title = `${product.name} — Bouquet Artisanal | Anne Freret Fleuriste`;
  const description = product.description 
    ? product.description.slice(0, 155) 
    : `${product.name} - Bouquet artisanal composé à la main par Anne Freret Fleuriste en Normandie.`;
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://fleuriste-annefreret.com/produit/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://fleuriste-annefreret.com/produit/${slug}`,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductPageClient params={{ slug }} />;
}
