import { mockProducts } from '@/lib/mock-data';
import ProductPageClient from './ProductPageClient';

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductPageClient params={{ slug }} />;
}
