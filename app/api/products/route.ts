import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAdmin, isAuthError } from '@/lib/api-auth';
import { normalizeProductSlug } from '@/lib/product-slugs';

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

// GET /api/products - Liste des produits (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const active = searchParams.get('active');

    let result;

    if (category && active !== null) {
      const activeBool = active === 'true';
      result = await sql`
        SELECT * FROM products 
        WHERE category = ${category} AND is_active = ${activeBool}
        ORDER BY created_at DESC
      `;
    } else if (category) {
      result = await sql`
        SELECT * FROM products 
        WHERE category = ${category}
        ORDER BY created_at DESC
      `;
    } else if (active !== null) {
      const activeBool = active === 'true';
      result = await sql`
        SELECT * FROM products 
        WHERE is_active = ${activeBool}
        ORDER BY created_at DESC
      `;
    } else {
      result = await sql`
        SELECT * FROM products 
        ORDER BY created_at DESC
      `;
    }

    return NextResponse.json({
      products: result.rows.map((product) => normalizeProductSlug(product)),
    });
  } catch (error: unknown) {
    console.error('❌ Erreur GET /api/products:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST /api/products - Créer un produit (admin only)
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (isAuthError(auth)) return auth;

  try {
    const body = await request.json();
    const { name, slug, description, category, price, original_price, images, tags, sizes, variants, stock, is_active, featured, in_stock } = body;

    if (!name || !category || price === undefined) {
      return NextResponse.json(
        { error: 'Champs manquants: name, category, price' },
        { status: 400 }
      );
    }

    const normalizedSlug = typeof slug === 'string' && slug.trim() ? slugify(slug.trim()) : slugify(name);
    const normalizedImages = normalizeStringArray(images);
    const normalizedTags = normalizeStringArray(tags);
    const normalizedSizes = normalizeSizes(sizes);
    const normalizedVariants = normalizeVariants(variants);
    const imagesArray = toPgTextArray(normalizedImages);
    const tagsArray = toPgTextArray(normalizedTags);

    const result = await sql`
      INSERT INTO products (
        name, slug, description, category, price, original_price, images, tags, sizes, variants,
        stock, is_active, featured, in_stock
      )
      VALUES (
        ${name}, ${normalizedSlug}, ${description || ''}, ${category}, ${price},
        ${original_price ?? null}, ${imagesArray}::text[], ${tagsArray}::text[],
        ${JSON.stringify(normalizedSizes)}::jsonb, ${JSON.stringify(normalizedVariants)}::jsonb,
        ${stock || 0}, ${is_active !== false}, ${featured || false}, ${in_stock !== false}
      )
      RETURNING *
    `;

    return NextResponse.json({ success: true, product: result.rows[0] }, { status: 201 });
  } catch (error: unknown) {
    console.error('❌ Erreur POST /api/products:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
