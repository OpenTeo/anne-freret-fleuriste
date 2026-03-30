const { sql } = require('@vercel/postgres');

async function updateFeatured() {
  try {
    // Set Lilou (Plantes) as featured
    await sql`
      UPDATE products 
      SET featured = true 
      WHERE name = 'Lilou'
    `;
    console.log('✓ Lilou marquée comme featured');
    
    console.log('\n=== UPDATED FEATURED PRODUCTS ===');
    const { rows } = await sql`
      SELECT name, category, featured 
      FROM products 
      WHERE featured = true
      ORDER BY category, name
    `;
    console.log(JSON.stringify(rows, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  }
}

updateFeatured();
