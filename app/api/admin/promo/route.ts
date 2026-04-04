import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM promo_codes ORDER BY created_at DESC
    `;
    return NextResponse.json({ promoCodes: result.rows });
  } catch (error) {
    console.error('❌ Erreur GET /api/admin/promo:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, type, value, min_order, max_uses, valid_from, valid_until } = body;

    if (!code || !type) {
      return NextResponse.json({ error: 'Code et type requis' }, { status: 400 });
    }

    if (!['percentage', 'fixed', 'free_shipping'].includes(type)) {
      return NextResponse.json({ error: 'Type invalide' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO promo_codes (code, type, value, min_order, max_uses, valid_from, valid_until)
      VALUES (
        ${code.toUpperCase()}, 
        ${type}, 
        ${value || 0}, 
        ${min_order || 0}, 
        ${max_uses || null}, 
        ${valid_from || new Date().toISOString()}, 
        ${valid_until || null}
      )
      RETURNING *
    `;

    return NextResponse.json({ promoCode: result.rows[0] }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Erreur serveur';
    if (msg.includes('unique') || msg.includes('duplicate')) {
      return NextResponse.json({ error: 'Ce code promo existe déjà' }, { status: 409 });
    }
    console.error('❌ Erreur POST /api/admin/promo:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
