import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET /api/products - Liste des produits
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const active = searchParams.get('active');

    // Construction dynamique de la requête
    const conditions: string[] = [];
    const values: (string | boolean)[] = [];
    let paramIndex = 1;

    if (category) {
      conditions.push(`category = $${paramIndex++}`);
      values.push(category);
    }

    if (active !== null) {
      conditions.push(`is_active = $${paramIndex++}`);
      values.push(active === 'true');
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `SELECT * FROM products ${whereClause} ORDER BY created_at DESC`;

    const result = await sql.query(query, values);

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
    const { 
      name, description, category, price, images, stock, is_active, featured,
      tags, sizes, variants, rating, review_count, original_price, in_stock
    } = body;

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
        featured,
        tags,
        sizes,
        variants,
        rating,
        review_count,
        original_price,
        in_stock
      ) VALUES (
        ${name},
        ${slug},
        ${description || ''},
        ${category},
        ${price},
        ${images || []},
        ${stock || 0},
        ${is_active !== false},
        ${featured || false},
        ${tags || []},
        ${sizes ? JSON.stringify(sizes) : '[]'},
        ${variants ? JSON.stringify(variants) : '[]'},
        ${rating || null},
        ${review_count || 0},
        ${original_price || null},
        ${in_stock !== false}
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
