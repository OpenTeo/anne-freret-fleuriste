import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // All queries in parallel
    const [
      revenueResult,
      monthRevenueResult,
      weekRevenueResult,
      ordersCountResult,
      pendingOrdersResult,
      clientsCountResult,
      activeSubsResult,
      subsByPlanResult,
      topProductsResult,
      recentOrdersResult,
      lowStockResult,
      pendingReviewsResult,
    ] = await Promise.all([
      // Total revenue
      sql`SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status != 'cancelled'`,
      // Month revenue
      sql`SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status != 'cancelled' AND created_at >= date_trunc('month', CURRENT_DATE)`,
      // Week revenue
      sql`SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status != 'cancelled' AND created_at >= date_trunc('week', CURRENT_DATE)`,
      // Orders count
      sql`SELECT COUNT(*) as count FROM orders`,
      // Pending orders
      sql`SELECT COUNT(*) as count FROM orders WHERE status = 'pending'`,
      // Clients count
      sql`SELECT COUNT(*) as count FROM users WHERE is_admin = false`,
      // Active subscriptions
      sql`SELECT COUNT(*) as count FROM subscriptions WHERE status = 'active'`,
      // Subscriptions by plan
      sql`SELECT LOWER(formula) as formula, COUNT(*) as count FROM subscriptions WHERE status = 'active' GROUP BY LOWER(formula)`,
      // Top products (from order_items)
      sql`SELECT product_name as name, SUM(quantity) as count, SUM(total_price) as revenue FROM order_items GROUP BY product_name ORDER BY count DESC LIMIT 5`,
      // Recent orders
      sql`SELECT id, order_number, customer_name, customer_email, total_amount, status, created_at FROM orders ORDER BY created_at DESC LIMIT 5`,
      // Low stock products
      sql`SELECT id, name, stock FROM products WHERE is_active = true AND stock < 5 ORDER BY stock ASC`,
      // Pending reviews
      sql`SELECT COUNT(*) as count FROM reviews WHERE is_approved = false`,
    ]);

    const subsByPlan: Record<string, number> = { essentiel: 0, signature: 0, prestige: 0 };
    for (const row of subsByPlanResult.rows) {
      const key = (row.formula as string) || '';
      if (key in subsByPlan) {
        subsByPlan[key] = Number(row.count);
      }
    }

    return NextResponse.json({
      totalRevenue: Number(revenueResult.rows[0].total),
      monthRevenue: Number(monthRevenueResult.rows[0].total),
      weekRevenue: Number(weekRevenueResult.rows[0].total),
      ordersCount: Number(ordersCountResult.rows[0].count),
      pendingOrders: Number(pendingOrdersResult.rows[0].count),
      clientsCount: Number(clientsCountResult.rows[0].count),
      activeSubscriptions: Number(activeSubsResult.rows[0].count),
      subscriptionsByPlan: subsByPlan,
      topProducts: topProductsResult.rows.map((r) => ({
        name: r.name,
        count: Number(r.count),
        revenue: Number(r.revenue),
      })),
      recentOrders: recentOrdersResult.rows,
      lowStockProducts: lowStockResult.rows.map((r) => ({
        id: r.id,
        name: r.name,
        stock: Number(r.stock),
      })),
      pendingReviews: Number(pendingReviewsResult.rows[0].count),
    });
  } catch (error) {
    console.error('Erreur stats:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
