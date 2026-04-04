import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // CA total
    const totalRevenue = await sql`
      SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status != 'cancelled'
    `;

    // CA ce mois
    const monthRevenue = await sql`
      SELECT COALESCE(SUM(total_amount), 0) as total FROM orders 
      WHERE status != 'cancelled' 
      AND created_at >= date_trunc('month', CURRENT_DATE)
    `;

    // CA cette semaine
    const weekRevenue = await sql`
      SELECT COALESCE(SUM(total_amount), 0) as total FROM orders 
      WHERE status != 'cancelled' 
      AND created_at >= date_trunc('week', CURRENT_DATE)
    `;

    // Nb commandes + en attente
    const ordersCount = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'pending') as pending
      FROM orders
    `;

    // Nb clients
    const clientsCount = await sql`
      SELECT COUNT(*) as total FROM users WHERE is_admin = false
    `;

    // Top 5 produits (par nombre de ventes via order_items)
    const topProducts = await sql`
      SELECT 
        oi.product_name as name,
        SUM(oi.quantity) as total_sold,
        SUM(oi.total_price) as total_revenue
      FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
      WHERE o.status != 'cancelled'
      GROUP BY oi.product_name
      ORDER BY total_sold DESC
      LIMIT 5
    `;

    // 5 dernières commandes
    const recentOrders = await sql`
      SELECT id, order_number, customer_name, total_amount, status, created_at
      FROM orders
      ORDER BY created_at DESC
      LIMIT 5
    `;

    // Abonnements actifs par plan
    const activeSubscriptions = await sql`
      SELECT plan, COUNT(*) as count
      FROM subscriptions
      WHERE status = 'active'
      GROUP BY plan
    `;

    // Alertes stock bas (< 5)
    const lowStock = await sql`
      SELECT id, name, stock FROM products 
      WHERE stock < 5 AND is_active = true
      ORDER BY stock ASC
    `;

    // Avis en attente modération
    const pendingReviews = await sql`
      SELECT COUNT(*) as count FROM reviews WHERE is_approved = false
    `;

    return NextResponse.json({
      totalRevenue: parseFloat(totalRevenue.rows[0].total),
      monthRevenue: parseFloat(monthRevenue.rows[0].total),
      weekRevenue: parseFloat(weekRevenue.rows[0].total),
      ordersTotal: parseInt(ordersCount.rows[0].total),
      ordersPending: parseInt(ordersCount.rows[0].pending),
      clientsTotal: parseInt(clientsCount.rows[0].total),
      topProducts: topProducts.rows,
      recentOrders: recentOrders.rows,
      activeSubscriptions: activeSubscriptions.rows,
      lowStock: lowStock.rows,
      pendingReviewsCount: parseInt(pendingReviews.rows[0].count),
    });
  } catch (error) {
    console.error('❌ Erreur GET /api/admin/stats:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
