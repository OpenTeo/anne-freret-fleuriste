import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAdmin, isAuthError } from '@/lib/api-auth';

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

    return NextResponse.json({ products: result.rows });
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
    const { name, description, category, price, images, stock, is_active, featured } = body;

    if (!name || !category || price === undefined) {
      return NextResponse.json(
        { error: 'Champs manquants: name, category, price' },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+$/, '');

    const result = await sql`
      INSERT INTO products (name, slug, description, category, price, images, stock, is_active, featured)
      VALUES (
        ${name}, ${slug}, ${description || ''}, ${category}, ${price},
        ${images ? JSON.stringify(images) : '{}'}, ${stock || 0},
        ${is_active !== false}, ${featured || false}
      )
      RETURNING *
    `;

    return NextResponse.json({ success: true, product: result.rows[0] }, { status: 201 });
  } catch (error: unknown) {
    console.error('❌ Erreur POST /api/products:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
