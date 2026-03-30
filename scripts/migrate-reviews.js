const { neon } = require('@neondatabase/serverless');

const POSTGRES_URL = process.env.POSTGRES_URL || 'postgresql://neondb_owner:npg_KhVc6M2XdtsD@ep-steep-dust-agx38zwr-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require';
const sql = neon(POSTGRES_URL);

async function migrate() {
  try {
    console.log('🚀 Migration: création de la table reviews...');

    // Créer la table reviews
    await sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        product_id UUID REFERENCES products(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        author_name VARCHAR(100) NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        title VARCHAR(200),
        text TEXT NOT NULL,
        verified_purchase BOOLEAN DEFAULT FALSE,
        featured BOOLEAN DEFAULT FALSE,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Table reviews créée');

    // Créer les index
    await sql`CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_reviews_featured ON reviews(featured)`;
    console.log('✅ Index créés');

    console.log('🎉 Migration terminée avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    process.exit(1);
  }
}

migrate();
