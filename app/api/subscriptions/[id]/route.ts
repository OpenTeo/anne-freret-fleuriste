import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET /api/subscriptions/[id] - Détails d'un abonnement
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await sql`
      SELECT 
        s.*,
        u.email,
        u.first_name,
        u.last_name,
        u.phone,
        u.address,
        u.city,
        u.postal_code
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      WHERE s.id = ${id}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Abonnement introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json({ subscription: result.rows[0] });
  } catch (error: unknown) {
    console.error('❌ Erreur GET /api/subscriptions/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// PATCH /api/subscriptions/[id] - Modifier un abonnement
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { verifyAdminToken } = await import('@/lib/admin-auth');
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const { id } = await params;
    const body = await request.json();
    const { status, frequency, price, next_delivery_date, pause_reason } = body;

    // Construction dynamique de la requête UPDATE
    const updates: string[] = [];
    const values: (string | number | null)[] = [];
    let paramCount = 1;

    if (status !== undefined) {
      updates.push(`status = $${paramCount++}`);
      values.push(status);
      
      // Si annulé, enregistrer la date
      if (status === 'cancelled') {
        updates.push(`cancelled_at = CURRENT_TIMESTAMP`);
      }
    }

    if (frequency !== undefined) {
      updates.push(`frequency = $${paramCount++}`);
      values.push(frequency);
    }

    if (price !== undefined) {
      updates.push(`price = $${paramCount++}`);
      values.push(price);
    }

    if (next_delivery_date !== undefined) {
      updates.push(`next_delivery_date = $${paramCount++}`);
      values.push(next_delivery_date);
    }

    if (pause_reason !== undefined) {
      updates.push(`pause_reason = $${paramCount++}`);
      values.push(pause_reason);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'Aucune modification fournie' },
        { status: 400 }
      );
    }

    const result = await sql.query(
      `UPDATE subscriptions 
       SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
       WHERE id = $${paramCount}
       RETURNING *`,
      [...values, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Abonnement introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      subscription: result.rows[0],
    });
  } catch (error: unknown) {
    console.error('❌ Erreur PATCH /api/subscriptions/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// DELETE /api/subscriptions/[id] - Supprimer un abonnement (annulation définitive)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { verifyAdminToken } = await import('@/lib/admin-auth');
    const token = request.cookies.get('admin-token')?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    const { id } = await params;

    // Soft delete: on marque comme cancelled au lieu de supprimer
    const result = await sql`
      UPDATE subscriptions
      SET status = 'cancelled', cancelled_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Abonnement introuvable' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Abonnement annulé',
    });
  } catch (error: unknown) {
    console.error('❌ Erreur DELETE /api/subscriptions/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
