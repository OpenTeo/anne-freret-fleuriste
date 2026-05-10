import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAdmin, isAuthError } from '@/lib/api-auth';
import { normalizeProductSlug, resolveProductSlug } from '@/lib/product-slugs';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+$/, '')
    .replace(/^-+/, '');
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean);
}

function toPgTextArray(values: string[]): string {
  if (values.length === 0) return '{}';

  return `{${values
    .map((value) => `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`)
    .join(',')}}`;
}

function normalizeSizes(value: unknown): Array<{ name: string; price: number }> {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const size = item as { name?: unknown; price?: unknown };
      const name = typeof size.name === 'string' ? size.name.trim() : '';
      const price = Number(size.price);

      if (!name || !Number.isFinite(price)) return null;

      return { name, price };
    })
    .filter((item): item is { name: string; price: number } => item !== null);
}

function normalizeVariants(value: unknown): Array<{ name: string }> {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const variant = item as { name?: unknown };
      const name = typeof variant.name === 'string' ? variant.name.trim() : '';

      if (!name) return null;

      return { name };
    })
    .filter((item): item is { name: string } => item !== null);
}

// GET /api/products/[id] - Détails d'un produit (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const canonicalId = resolveProductSlug(id);
    const result = await sql`
      SELECT * FROM products
      WHERE id = ${id} OR slug = ${id} OR slug = ${canonicalId}
      LIMIT 1
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 });
    }

    return NextResponse.json({ product: normalizeProductSlug(result.rows[0]) });
  } catch (error: unknown) {
    console.error('❌ Erreur GET /api/products/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PATCH /api/products/[id] - Modifier un produit (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, slug, description, category, price, original_price, images, tags, sizes, variants, stock, is_active, featured, in_stock } = body;

    // Récupérer le produit actuel
    const current = await sql`SELECT * FROM products WHERE id = ${id}`;
    if (current.rows.length === 0) {
      return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 });
    }

    const p = current.rows[0];
    const newName = name !== undefined ? name : p.name;
    const newSlug = typeof slug === 'string' && slug.trim()
      ? slugify(slug.trim())
      : name !== undefined
        ? slugify(name)
        : p.slug;
    const normalizedImages = images !== undefined ? normalizeStringArray(images) : p.images;
    const normalizedTags = tags !== undefined ? normalizeStringArray(tags) : p.tags;
    const normalizedSizes = sizes !== undefined ? normalizeSizes(sizes) : p.sizes;
    const normalizedVariants = variants !== undefined ? normalizeVariants(variants) : p.variants;
    const imagesArray = toPgTextArray(normalizedImages);
    const tagsArray = toPgTextArray(normalizedTags);

    const result = await sql`
      UPDATE products SET
        name = ${newName},
        slug = ${newSlug},
        description = ${description !== undefined ? description : p.description},
        category = ${category !== undefined ? category : p.category},
        price = ${price !== undefined ? price : p.price},
        original_price = ${original_price !== undefined ? original_price : p.original_price},
        images = ${imagesArray}::text[],
        tags = ${tagsArray}::text[],
        sizes = ${JSON.stringify(normalizedSizes)}::jsonb,
        variants = ${JSON.stringify(normalizedVariants)}::jsonb,
        stock = ${stock !== undefined ? stock : p.stock},
        is_active = ${is_active !== undefined ? is_active : p.is_active},
        featured = ${featured !== undefined ? featured : p.featured},
        in_stock = ${in_stock !== undefined ? in_stock : p.in_stock},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({ success: true, product: result.rows[0] });
  } catch (error: unknown) {
    console.error('❌ Erreur PATCH /api/products/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE /api/products/[id] - Désactiver un produit (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request);
  if (isAuthError(auth)) return auth;

  try {
    const { id } = await params;
    const result = await sql`
      UPDATE products SET is_active = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id} RETURNING *
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Produit désactivé' });
  } catch (error: unknown) {
    console.error('❌ Erreur DELETE /api/products/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
