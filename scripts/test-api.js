const { neon } = require('@neondatabase/serverless');

const POSTGRES_URL = process.env.POSTGRES_URL || 'postgresql://neondb_owner:npg_KhVc6M2XdtsD@ep-steep-dust-agx38zwr-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(POSTGRES_URL);

async function testAPI() {
  console.log('🧪 Test des fonctionnalités API...\n');

  try {
    // 1. Récupérer un produit avec avis
    const product = await sql`
      SELECT id, name, slug, rating, review_count
      FROM products
      WHERE review_count > 0
      LIMIT 1
    `;

    if (product.length === 0) {
      console.log('⚠️ Aucun produit avec avis trouvé');
      return;
    }

    const p = product[0];
    console.log(`📦 Produit testé: ${p.name}`);
    console.log(`   Rating: ${p.rating} ⭐`);
    console.log(`   Nombre d'avis: ${p.review_count}\n`);

    // 2. Récupérer les avis de ce produit
    const reviews = await sql`
      SELECT 
        author_name,
        rating,
        title,
        text,
        status,
        verified_purchase,
        featured,
        created_at
      FROM reviews
      WHERE product_id = ${p.id} AND status = 'approved'
      ORDER BY created_at DESC
    `;

    console.log(`✅ ${reviews.length} avis récupérés:\n`);
    reviews.forEach((r, i) => {
      console.log(`   ${i + 1}. ${r.author_name} - ${r.rating}⭐`);
      console.log(`      "${r.title || r.text.substring(0, 50)}..."`);
      console.log(`      Status: ${r.status}, Featured: ${r.featured}, Vérifié: ${r.verified_purchase}\n`);
    });

    // 3. Test des statistiques
    const stats = await sql`
      SELECT
        COUNT(*) as total,
        AVG(rating)::numeric(3,2) as average,
        COUNT(CASE WHEN rating = 5 THEN 1 END) as stars_5,
        COUNT(CASE WHEN rating = 4 THEN 1 END) as stars_4,
        COUNT(CASE WHEN rating = 3 THEN 1 END) as stars_3,
        COUNT(CASE WHEN rating = 2 THEN 1 END) as stars_2,
        COUNT(CASE WHEN rating = 1 THEN 1 END) as stars_1
      FROM reviews
      WHERE product_id = ${p.id} AND status = 'approved'
    `;

    console.log('📊 Statistiques:');
    console.log(`   Total: ${stats[0].total}`);
    console.log(`   Moyenne: ${stats[0].average}`);
    console.log(`   Distribution:`);
    console.log(`     5⭐: ${stats[0].stars_5}`);
    console.log(`     4⭐: ${stats[0].stars_4}`);
    console.log(`     3⭐: ${stats[0].stars_3}`);
    console.log(`     2⭐: ${stats[0].stars_2}`);
    console.log(`     1⭐: ${stats[0].stars_1}\n`);

    // 4. Test featured reviews
    const featuredReviews = await sql`
      SELECT 
        r.author_name,
        r.rating,
        r.text,
        p.name as product_name
      FROM reviews r
      LEFT JOIN products p ON r.product_id = p.id
      WHERE r.status = 'approved' AND r.featured = true
      LIMIT 6
    `;

    console.log(`⭐ ${featuredReviews.length} avis mis en avant (homepage):\n`);
    featuredReviews.forEach((r, i) => {
      console.log(`   ${i + 1}. ${r.author_name} - ${r.rating}⭐ (${r.product_name})`);
      console.log(`      "${r.text.substring(0, 60)}..."\n`);
    });

    console.log('✅ Tous les tests API passés avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
  }
}

testAPI();
