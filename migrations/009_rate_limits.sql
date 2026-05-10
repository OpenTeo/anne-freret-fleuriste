-- Migration 009: Rate limiting persistent (DB-backed, multi-instance safe)
CREATE TABLE IF NOT EXISTS rate_limits (
  key VARCHAR(255) PRIMARY KEY,
  count INTEGER DEFAULT 1,
  reset_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_reset ON rate_limits(reset_at);

-- Cleanup automatique des entrées expirées (via DELETE périodique dans le code)
