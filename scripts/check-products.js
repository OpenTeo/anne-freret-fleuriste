const { sql } = require('@vercel/postgres');

async function checkProducts() {
  try {
    const { rows } = await sql`
      SELECT id, name, category, featured, is_active 
      FROM products 
      ORDER BY category, name
    `;
    
    console.log('=== ALL PRODUCTS ===');
    console.log(JSON.stringify(rows, null, 2));
    
    console.log('\n=== FEATURED PRODUCTS ===');
    const featured = rows.filter(p => p.featured);
    console.log(JSON.stringify(featured, null, 2));
    
    console.log('\n=== SUMMARY ===');
    const summary = {};
    rows.forEach(p => {
      if (!summary[p.category]) summary[p.category] = { total: 0, featured: 0 };
      summary[p.category].total++;
      if (p.featured) summary[p.category].featured++;
    });
    console.log(JSON.stringify(summary, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  }
}

checkProducts();
