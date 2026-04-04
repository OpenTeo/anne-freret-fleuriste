import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

const VALID_STATUSES = ['pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled'];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Statut invalide. Valeurs acceptées: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    const result = await sql`
      UPDATE orders 
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, status
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });
    }

    return NextResponse.json({ order: result.rows[0] });
  } catch (error) {
    console.error('❌ Erreur PATCH /api/admin/orders/[id]/status:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
