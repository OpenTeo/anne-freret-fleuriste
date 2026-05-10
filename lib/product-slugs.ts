type ProductLike = {
  name?: string;
  slug?: string;
};

const CANONICAL_SLUG_BY_NAME: Record<string, string> = {
  'Le Saint-Pairais': 'le-saint-pairais',
  'Le Chausiais': 'le-chausiais',
};

const LEGACY_SLUG_ALIASES: Record<string, string> = {
  'le-chausiais-1': 'le-saint-pairais',
};

export function resolveProductSlug(slug: string): string {
  return LEGACY_SLUG_ALIASES[slug] ?? slug;
}

export function normalizeProductSlug<T extends ProductLike>(product: T): T {
  const canonicalSlug = product.name ? CANONICAL_SLUG_BY_NAME[product.name] : undefined;

  if (!canonicalSlug || product.slug === canonicalSlug) {
    return product;
  }

  return {
    ...product,
    slug: canonicalSlug,
  };
}
