const { neon } = require('@neondatabase/serverless');

const POSTGRES_URL = process.env.POSTGRES_URL || 'postgresql://neondb_owner:npg_KhVc6M2XdtsD@ep-steep-dust-agx38zwr-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(POSTGRES_URL);

async function check() {
  try {
    console.log('📊 Vérification du système d\'avis...\n');

    // Statistiques globales
    const totalReviews = await sql`SELECT COUNT(*) as count FROM reviews`;
    console.log(`Total avis: ${totalReviews[0].count}`);

    const byStatus = await sql`
      SELECT status, COUNT(*) as count
      FROM reviews
      GROUP BY status
    `;
    console.log('\nPar statut:');
    byStatus.forEach(row => {
      console.log(`  - ${row.status}: ${row.count}`);
    });

    const featured = await sql`SELECT COUNT(*) as count FROM reviews WHERE featured = true`;
    console.log(`\nAvis mis en avant: ${featured[0].count}`);

    // Vérifier les produits avec avis
    const productsWithReviews = await sql`
      SELECT 
        p.name,
        p.rating,
        p.review_count,
        COUNT(r.id) as actual_count
      FROM products p
      LEFT JOIN reviews r ON p.id = r.product_id
      WHERE p.review_count > 0
      GROUP BY p.id, p.name, p.rating, p.review_count
    `;

    console.log('\nProduits avec avis:');
    productsWithReviews.forEach(p => {
      console.log(`  - ${p.name}: ${p.rating} ⭐ (${p.review_count} avis, ${p.actual_count} en DB)`);
    });

    console.log('\n✅ Système d\'avis opérationnel !');
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

check();
