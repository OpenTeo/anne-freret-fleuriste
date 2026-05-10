import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAdmin, isAuthError } from '@/lib/api-auth';

// GET /api/reviews - Liste des avis
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const all = searchParams.get('all');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    let query;
    let result;

    if (productId) {
      // Avis pour un produit spécifique (seulement approuvés)
      query = `
        SELECT r.*, p.name as product_name
        FROM reviews r
        LEFT JOIN products p ON r.product_id = p.id
        WHERE r.product_id = $1 AND r.status = 'approved'
        ORDER BY r.created_at DESC
      `;
      result = await sql.query(query, [productId]);
    } else if (all === 'true') {
      const auth = await requireAdmin(request);
      if (isAuthError(auth)) return auth;

      // Tous les avis (admin)
      query = `
        SELECT r.*, p.name as product_name, p.slug as product_slug
        FROM reviews r
        LEFT JOIN products p ON r.product_id = p.id
        ORDER BY r.created_at DESC
      `;
      result = await sql.query(query);
    } else if (featured === 'true') {
      // Avis mis en avant pour la homepage
      const limitNum = limit ? parseInt(limit) : 6;
      query = `
        SELECT r.*, p.name as product_name, p.slug as product_slug
        FROM reviews r
        LEFT JOIN products p ON r.product_id = p.id
        WHERE r.status = 'approved' AND r.featured = true
        ORDER BY r.created_at DESC
        LIMIT $1
      `;
      result = await sql.query(query, [limitNum]);
    } else {
      // Tous les avis approuvés
      query = `
        SELECT r.*, p.name as product_name, p.slug as product_slug
        FROM reviews r
        LEFT JOIN products p ON r.product_id = p.id
        WHERE r.status = 'approved'
        ORDER BY r.created_at DESC
      `;
      result = await sql.query(query);
    }

    return NextResponse.json({ reviews: result.rows });
  } catch (error: unknown) {
    console.error('❌ Erreur GET /api/reviews:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST /api/reviews - Créer un avis
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product_id, author_name, rating, title, text, user_id } = body;

    if (!product_id || !author_name || !rating || !text) {
      return NextResponse.json(
        { error: 'Champs manquants: product_id, author_name, rating, text' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'La note doit être entre 1 et 5' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO reviews (
        product_id,
        user_id,
        author_name,
        rating,
        title,
        text,
        status
      ) VALUES (
        ${product_id},
        ${user_id || null},
        ${author_name},
        ${rating},
        ${title || null},
        ${text},
        'pending'
      )
      RETURNING *
    `;

    return NextResponse.json({
      success: true,
      review: result.rows[0],
    });
  } catch (error: unknown) {
    console.error('❌ Erreur POST /api/reviews:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
