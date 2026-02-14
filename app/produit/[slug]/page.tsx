import { mockProducts } from '@/lib/mock-data';
import ProductPageClient from './ProductPageClient';

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductPageClient params={params} />;
}
