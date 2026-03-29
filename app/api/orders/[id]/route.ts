import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Récupérer commande avec items
    const result = await sql`
      SELECT 
        o.*,
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_name', oi.product_name,
            'product_image', oi.product_image,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'total_price', oi.total_price
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.id = ${id} OR o.order_number = ${id}
      GROUP BY o.id
    `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      order: result.rows[0]
    });

  } catch (error) {
    console.error('Erreur récupération commande:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la commande' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, tracking_number } = body;

    // Update commande
    const updates: string[] = [];
    const values: any[] = [];

    if (status) {
      updates.push('status = $' + (updates.length + 1));
      values.push(status);
    }

    if (tracking_number) {
      updates.push('tracking_number = $' + (updates.length + 1));
      values.push(tracking_number);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'Aucune mise à jour fournie' },
        { status: 400 }
      );
    }

    const result = await sql`
      UPDATE orders
      SET ${sql.raw(updates.join(', '))}
      WHERE id = ${id} OR order_number = ${id}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      order: result.rows[0]
    });

  } catch (error) {
    console.error('Erreur mise à jour commande:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    );
  }
}
