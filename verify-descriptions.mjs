import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.POSTGRES_URL);

async function verify() {
  console.log('🔍 Vérification des descriptions mises à jour\n');
  
  const products = await sql`
    SELECT name, category, description, LENGTH(description) as len
    FROM products
    ORDER BY category, name
    LIMIT 10
  `;
  
  for (const p of products) {
    console.log(`📦 ${p.name} (${p.category}) - ${p.len} caractères`);
    console.log(`   "${p.description}"\n`);
  }
  
  // Stats globales
  const stats = await sql`
    SELECT 
      category,
      COUNT(*) as count,
      AVG(LENGTH(description))::int as avg_length,
      MAX(LENGTH(description)) as max_length
    FROM products
    GROUP BY category
    ORDER BY category
  `;
  
  console.log('\n📊 Statistiques par catégorie:');
  for (const s of stats) {
    console.log(`   ${s.category}: ${s.count} produits, moy. ${s.avg_length} chars, max ${s.max_length} chars`);
  }
}

verify();
