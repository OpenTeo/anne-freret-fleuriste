import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET /api/subscriptions - Liste des abonnements (admin ou user filtré)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    // Construction dynamique de la requête
    const conditions: string[] = [];
    const values: string[] = [];
    let paramIndex = 1;

    if (userId) {
      conditions.push(`s.user_id = $${paramIndex++}`);
      values.push(userId);
    }

    if (status) {
      conditions.push(`s.status = $${paramIndex++}`);
      values.push(status);
    }

    const whereClause = conditions.length > 0 ? `AND ${conditions.join(' AND ')}` : '';

    const query = `
      SELECT 
        s.*,
        u.email,
        u.first_name,
        u.last_name,
        u.phone
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      WHERE 1=1 ${whereClause}
      ORDER BY s.created_at DESC
    `;

    const result = await sql.query(query, values);

    return NextResponse.json({
      subscriptions: result.rows,
    });
  } catch (error: unknown) {
    console.error('❌ Erreur GET /api/subscriptions:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST /api/subscriptions - Créer un abonnement
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, formula, frequency, price } = body;

    if (!userId || !formula || !frequency || !price) {
      return NextResponse.json(
        { error: 'Champs manquants: userId, formula, frequency, price' },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur existe
    const userCheck = await sql`SELECT id FROM users WHERE id = ${userId}`;
    if (userCheck.rows.length === 0) {
      return NextResponse.json(
        { error: 'Utilisateur introuvable' },
        { status: 404 }
      );
    }

    // Calculer la prochaine date de livraison
    const intervalMap: Record<string, string> = {
      weekly: '7 days',
      biweekly: '14 days',
      monthly: '1 month',
    };
    const interval = intervalMap[frequency] || '1 month';

    const result = await sql.query(
      `INSERT INTO subscriptions (
        user_id,
        formula,
        status,
        frequency,
        price,
        next_delivery_date,
        start_date
      ) VALUES ($1, $2, 'active', $3, $4, CURRENT_DATE + INTERVAL '${interval}', CURRENT_DATE)
      RETURNING *`,
      [userId, formula, frequency, price]
    );

    return NextResponse.json({
      success: true,
      subscription: result.rows[0],
    });
  } catch (error: unknown) {
    console.error('❌ Erreur POST /api/subscriptions:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
