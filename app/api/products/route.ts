import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET /api/products - Liste des produits
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const active = searchParams.get('active');

    let query = sql`SELECT * FROM products WHERE 1=1`;

    if (category) {
      query = sql`${query} AND category = ${category}`;
    }

    if (active !== null) {
      query = sql`${query} AND is_active = ${active === 'true'}`;
    }

    query = sql`${query} ORDER BY created_at DESC`;

    const result = await query;

    return NextResponse.json({ products: result.rows });
  } catch (error: unknown) {
    console.error('❌ Erreur GET /api/products:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST /api/products - Créer un produit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, category, price, images, stock, is_active, featured } = body;

    if (!name || !category || price === undefined) {
      return NextResponse.json(
        { error: 'Champs manquants: name, category, price' },
        { status: 400 }
      );
    }

    // Générer slug depuis le nom
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/-+$/, '');

    const result = await sql`
      INSERT INTO products (
        name,
        slug,
        description,
        category,
        price,
        images,
        stock,
        is_active,
        featured
      ) VALUES (
        ${name},
        ${slug},
        ${description || ''},
        ${category},
        ${price},
        ${images ? JSON.stringify(images) : '{}'},
        ${stock || 0},
        ${is_active !== false},
        ${featured || false}
      )
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      product: result.rows[0],
    });
  } catch (error: unknown) {
    console.error('❌ Erreur POST /api/products:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
