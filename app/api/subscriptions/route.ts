import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth, requireAdmin, isAuthError } from '@/lib/api-auth';

// GET /api/subscriptions - Liste des abonnements
export async function GET(request: NextRequest) {
  const auth = await requireAuth(request);
  if (isAuthError(auth)) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let result;

    if (auth.is_admin) {
      // Admin voit tout
      if (status) {
        result = await sql`
          SELECT s.*, u.email, u.first_name, u.last_name, u.phone
          FROM subscriptions s
          JOIN users u ON s.user_id = u.id
          WHERE s.status = ${status}
          ORDER BY s.created_at DESC
        `;
      } else {
        result = await sql`
          SELECT s.*, u.email, u.first_name, u.last_name, u.phone
          FROM subscriptions s
          JOIN users u ON s.user_id = u.id
          ORDER BY s.created_at DESC
        `;
      }
    } else {
      // User normal voit seulement ses abonnements
      if (status) {
        result = await sql`
          SELECT s.*, u.email, u.first_name, u.last_name, u.phone
          FROM subscriptions s
          JOIN users u ON s.user_id = u.id
          WHERE s.user_id = ${auth.id} AND s.status = ${status}
          ORDER BY s.created_at DESC
        `;
      } else {
        result = await sql`
          SELECT s.*, u.email, u.first_name, u.last_name, u.phone
          FROM subscriptions s
          JOIN users u ON s.user_id = u.id
          WHERE s.user_id = ${auth.id}
          ORDER BY s.created_at DESC
        `;
      }
    }

    return NextResponse.json({ subscriptions: result.rows });
  } catch (error: unknown) {
    console.error('❌ Erreur GET /api/subscriptions:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST /api/subscriptions - Créer un abonnement (admin only)
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (isAuthError(auth)) return auth;

  try {
    const body = await request.json();
    const { userId, formula, frequency, price } = body;

    if (!userId || !formula || !frequency || !price) {
      return NextResponse.json(
        { error: 'Champs manquants: userId, formula, frequency, price' },
        { status: 400 }
      );
    }

    // Valider la fréquence (prévient injection SQL)
    const validFrequencies = ['weekly', 'biweekly', 'monthly'];
    if (!validFrequencies.includes(frequency)) {
      return NextResponse.json({ error: 'Fréquence invalide' }, { status: 400 });
    }

    const userCheck = await sql`SELECT id FROM users WHERE id = ${userId}`;
    if (userCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 });
    }

    // Utiliser calculate_next_delivery_smart si elle existe, sinon fallback
    const result = await sql`
      INSERT INTO subscriptions (
        user_id, formula, status, frequency, price,
        next_delivery_date, start_date
      ) VALUES (
        ${userId}, ${formula}, 'active', ${frequency}, ${price},
        CURRENT_DATE + CASE 
          WHEN ${frequency} = 'weekly' THEN INTERVAL '7 days'
          WHEN ${frequency} = 'biweekly' THEN INTERVAL '14 days'
          ELSE INTERVAL '1 month'
        END,
        CURRENT_DATE
      )
      RETURNING *
    `;

    return NextResponse.json({ success: true, subscription: result.rows[0] }, { status: 201 });
  } catch (error: unknown) {
    console.error('❌ Erreur POST /api/subscriptions:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
