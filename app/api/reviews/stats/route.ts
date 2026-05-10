import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

// GET /api/reviews/stats - Statistiques globales des avis
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    let query;
    let params: string[] = [];

    if (productId) {
      // Stats pour un produit spécifique
      query = `
        SELECT
          COUNT(*) as total,
          AVG(rating)::numeric(3,2) as average,
          COUNT(CASE WHEN rating = 5 THEN 1 END) as stars_5,
          COUNT(CASE WHEN rating = 4 THEN 1 END) as stars_4,
          COUNT(CASE WHEN rating = 3 THEN 1 END) as stars_3,
          COUNT(CASE WHEN rating = 2 THEN 1 END) as stars_2,
          COUNT(CASE WHEN rating = 1 THEN 1 END) as stars_1
        FROM reviews
        WHERE product_id = $1 AND status = 'approved'
      `;
      params = [productId];
    } else {
      // Stats globales
      query = `
        SELECT
          COUNT(*) as total,
          AVG(rating)::numeric(3,2) as average,
          COUNT(CASE WHEN rating = 5 THEN 1 END) as stars_5,
          COUNT(CASE WHEN rating = 4 THEN 1 END) as stars_4,
          COUNT(CASE WHEN rating = 3 THEN 1 END) as stars_3,
          COUNT(CASE WHEN rating = 2 THEN 1 END) as stars_2,
          COUNT(CASE WHEN rating = 1 THEN 1 END) as stars_1
        FROM reviews
        WHERE status = 'approved'
      `;
    }

    const result = await sql.query(query, params);
    const stats = result.rows[0];

    return NextResponse.json({
      total: parseInt(stats.total),
      average: parseFloat(stats.average || 0),
      distribution: {
        5: parseInt(stats.stars_5),
        4: parseInt(stats.stars_4),
        3: parseInt(stats.stars_3),
        2: parseInt(stats.stars_2),
        1: parseInt(stats.stars_1),
      },
    });
  } catch (error: unknown) {
    console.error('❌ Erreur GET /api/reviews/stats:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
