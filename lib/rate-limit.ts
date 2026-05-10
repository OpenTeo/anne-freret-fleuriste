import { sql } from '@/lib/db';

export async function rateLimit(key: string, maxRequests: number, windowMs: number): Promise<boolean> {
  try {
    const resetAt = new Date(Date.now() + windowMs).toISOString();
    const result = await sql.query(
      `INSERT INTO rate_limits (key, count, reset_at)
       VALUES ($1, 1, $2::timestamptz)
       ON CONFLICT (key) DO UPDATE SET
         count    = CASE WHEN rate_limits.reset_at < NOW() THEN 1          ELSE rate_limits.count + 1     END,
         reset_at = CASE WHEN rate_limits.reset_at < NOW() THEN $2::timestamptz ELSE rate_limits.reset_at END
       RETURNING count`,
      [key, resetAt]
    );
    return (result.rows[0].count as number) <= maxRequests;
  } catch {
    // Table absente ou erreur DB → fail open (ne pas bloquer les utilisateurs légitimes)
    return true;
  }
}
