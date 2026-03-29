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

    let result;

    // Query selon les filtres
    if (email && status) {
      result = await sql`
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
        WHERE o.customer_email = ${email.toLowerCase()}
        AND o.status = ${status}
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `;
    } else if (email) {
      result = await sql`
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
        WHERE o.customer_email = ${email.toLowerCase()}
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `;
    } else if (userId && status) {
      result = await sql`
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
        WHERE o.user_id = ${userId}
        AND o.status = ${status}
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `;
    } else if (userId) {
      result = await sql`
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
        WHERE o.user_id = ${userId}
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `;
    }

    return NextResponse.json({
      orders: result?.rows || []
    });

  } catch (error) {
    console.error('Erreur récupération commandes:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des commandes' },
      { status: 500 }
    );
  }
}
