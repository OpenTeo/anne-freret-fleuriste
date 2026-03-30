import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';

const DATABASE_URL = process.env.POSTGRES_URL;
if (!DATABASE_URL) { console.error('No POSTGRES_URL'); process.exit(1); }

const sql = neon(DATABASE_URL);

async function run(filePath) {
  console.log(`Running: ${filePath}`);
  const content = readFileSync(filePath, 'utf8');
  
  try {
    await sql(content);
    console.log('Done: OK');
  } catch (e) {
    console.error(`ERROR: ${e.message}`);
    // Try to find the problematic area
    if (e.message.includes('unterminated')) {
      console.error('Likely a semicolon inside a string value in the SQL');
    }
  }
}

await run(process.argv[2]);
