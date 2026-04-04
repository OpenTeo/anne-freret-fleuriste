import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAdmin, isAuthError } from '@/lib/api-auth';

// GET /api/users - Liste des utilisateurs (admin only)
export async function GET(request: NextRequest) {
  // Auth admin requise
  const auth = await requireAdmin(request);
  if (isAuthError(auth)) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const isAdmin = searchParams.get('isAdmin');

    // Query unique avec JOIN pour éviter le N+1
    let result;

    if (search && isAdmin !== null) {
      const searchPattern = `%${search}%`;
      const adminBool = isAdmin === 'true';
      result = await sql`
        SELECT 
          u.id, u.email, u.first_name, u.last_name, u.phone,
          u.address, u.address_complement, u.postal_code, u.city,
          u.loyalty_points, u.total_spent, u.is_admin,
          u.created_at, u.updated_at,
          COALESCE(o.orders_count, 0)::int as orders_count,
          o.last_order_date
        FROM users u
        LEFT JOIN (
          SELECT customer_email, 
                 COUNT(*)::int as orders_count,
                 MAX(created_at) as last_order_date
          FROM orders GROUP BY customer_email
        ) o ON o.customer_email = u.email
        WHERE u.is_admin = ${adminBool}
          AND (LOWER(u.first_name || ' ' || u.last_name) LIKE LOWER(${searchPattern})
               OR LOWER(u.email) LIKE LOWER(${searchPattern}))
        ORDER BY u.created_at DESC
      `;
    } else if (search) {
      const searchPattern = `%${search}%`;
      result = await sql`
        SELECT 
          u.id, u.email, u.first_name, u.last_name, u.phone,
          u.address, u.address_complement, u.postal_code, u.city,
          u.loyalty_points, u.total_spent, u.is_admin,
          u.created_at, u.updated_at,
          COALESCE(o.orders_count, 0)::int as orders_count,
          o.last_order_date
        FROM users u
        LEFT JOIN (
          SELECT customer_email, 
                 COUNT(*)::int as orders_count,
                 MAX(created_at) as last_order_date
          FROM orders GROUP BY customer_email
        ) o ON o.customer_email = u.email
        WHERE LOWER(u.first_name || ' ' || u.last_name) LIKE LOWER(${searchPattern})
           OR LOWER(u.email) LIKE LOWER(${searchPattern})
        ORDER BY u.created_at DESC
      `;
    } else if (isAdmin !== null) {
      const adminBool = isAdmin === 'true';
      result = await sql`
        SELECT 
          u.id, u.email, u.first_name, u.last_name, u.phone,
          u.address, u.address_complement, u.postal_code, u.city,
          u.loyalty_points, u.total_spent, u.is_admin,
          u.created_at, u.updated_at,
          COALESCE(o.orders_count, 0)::int as orders_count,
          o.last_order_date
        FROM users u
        LEFT JOIN (
          SELECT customer_email, 
                 COUNT(*)::int as orders_count,
                 MAX(created_at) as last_order_date
          FROM orders GROUP BY customer_email
        ) o ON o.customer_email = u.email
        WHERE u.is_admin = ${adminBool}
        ORDER BY u.created_at DESC
      `;
    } else {
      result = await sql`
        SELECT 
          u.id, u.email, u.first_name, u.last_name, u.phone,
          u.address, u.address_complement, u.postal_code, u.city,
          u.loyalty_points, u.total_spent, u.is_admin,
          u.created_at, u.updated_at,
          COALESCE(o.orders_count, 0)::int as orders_count,
          o.last_order_date
        FROM users u
        LEFT JOIN (
          SELECT customer_email, 
                 COUNT(*)::int as orders_count,
                 MAX(created_at) as last_order_date
          FROM orders GROUP BY customer_email
        ) o ON o.customer_email = u.email
        ORDER BY u.created_at DESC
      `;
    }

    return NextResponse.json({ users: result.rows });
  } catch (error: unknown) {
    console.error('❌ Erreur GET /api/users:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
