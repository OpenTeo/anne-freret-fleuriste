import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    if (!email && !userId) {
      return NextResponse.json(
        { error: 'Email ou userId requis' },
        { status: 400 }
      );
    }

    // Construire query
    let query = sql`
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
    `;

    // Filtres
    if (email) {
      query = sql`
        ${query}
        WHERE o.customer_email = ${email.toLowerCase()}
      `;
    } else if (userId) {
      query = sql`
        ${query}
        WHERE o.user_id = ${userId}
      `;
    }

    if (status) {
      query = sql`
        ${query}
        AND o.status = ${status}
      `;
    }

    query = sql`
      ${query}
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;

    const result = await query;

    return NextResponse.json({
      orders: result.rows
    });

  } catch (error) {
    console.error('Erreur récupération commandes:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des commandes' },
      { status: 500 }
    );
  }
}
