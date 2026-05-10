import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { is_active, value, min_order, max_uses, valid_from, valid_until } = body;

    // Build dynamic update
    const updates: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (is_active !== undefined) { updates.push(`is_active = $${idx++}`); values.push(is_active); }
    if (value !== undefined) { updates.push(`value = $${idx++}`); values.push(value); }
    if (min_order !== undefined) { updates.push(`min_order = $${idx++}`); values.push(min_order); }
    if (max_uses !== undefined) { updates.push(`max_uses = $${idx++}`); values.push(max_uses); }
    if (valid_from !== undefined) { updates.push(`valid_from = $${idx++}`); values.push(valid_from); }
    if (valid_until !== undefined) { updates.push(`valid_until = $${idx++}`); values.push(valid_until); }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'Aucun champ à mettre à jour' }, { status: 400 });
    }

    values.push(id);
    const query = `UPDATE promo_codes SET ${updates.join(', ')} WHERE id = $${idx} RETURNING *`;
    const result = await sql.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Code promo non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ promoCode: result.rows[0] });
  } catch (error) {
    console.error('❌ Erreur PATCH /api/admin/promo/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await sql`DELETE FROM promo_codes WHERE id = ${id} RETURNING id`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Code promo non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Erreur DELETE /api/admin/promo/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
