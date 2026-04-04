import { readFileSync } from 'fs';
import { createPool } from '@vercel/postgres';

// Load .env.local manually
const envContent = readFileSync('.env.local', 'utf-8');
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const val = match[2].trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}

const file = process.argv[2];
if (!file) {
  console.error('Usage: node migrations/run-migration.mjs <migration-file>');
  process.exit(1);
}

const sqlContent = readFileSync(file, 'utf-8');
const pool = createPool({ connectionString: process.env.POSTGRES_URL });

try {
  await pool.query(sqlContent);
  console.log(`✅ Migration ${file} exécutée avec succès`);
} catch (err) {
  console.error(`❌ Erreur migration:`, err.message);
  process.exit(1);
} finally {
  await pool.end();
}
