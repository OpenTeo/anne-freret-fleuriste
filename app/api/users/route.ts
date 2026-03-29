import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET /api/users - Liste des utilisateurs (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const isAdmin = searchParams.get('isAdmin');

    let query = sql`
      SELECT 
        id,
        email,
        first_name,
        last_name,
        phone,
        address,
        address_complement,
        postal_code,
        city,
        loyalty_points,
        total_spent,
        is_admin,
        created_at,
        updated_at
      FROM users
      WHERE 1=1
    `;

    // Filtrer par admin/client
    if (isAdmin !== null) {
      query = sql`${query} AND is_admin = ${isAdmin === 'true'}`;
    }

    // Recherche par nom/email
    if (search) {
      const searchPattern = `%${search}%`;
      query = sql`${query} AND (
        LOWER(first_name || ' ' || last_name) LIKE LOWER(${searchPattern})
        OR LOWER(email) LIKE LOWER(${searchPattern})
      )`;
    }

    query = sql`${query} ORDER BY created_at DESC`;

    const result = await query;

    // Ajouter des stats pour chaque client
    const users = await Promise.all(
      result.rows.map(async (user) => {
        const ordersCount = await sql`
          SELECT COUNT(*) as count
          FROM orders
          WHERE customer_email = ${user.email}
        `;

        const lastOrder = await sql`
          SELECT created_at
          FROM orders
          WHERE customer_email = ${user.email}
          ORDER BY created_at DESC
          LIMIT 1
        `;

        return {
          ...user,
          orders_count: parseInt(ordersCount.rows[0]?.count || '0'),
          last_order_date: lastOrder.rows[0]?.created_at || null,
        };
      })
    );

    return NextResponse.json({ users });
  } catch (error: unknown) {
    console.error('❌ Erreur GET /api/users:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
