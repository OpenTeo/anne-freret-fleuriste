-- Table pour la récupération des paniers abandonnés
-- Un seul panier par utilisateur connecté (UPSERT par user_id)
CREATE TABLE IF NOT EXISTS carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  total DECIMAL(10, 2) DEFAULT 0,
  reminder_sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_carts_user_id ON carts(user_id);
CREATE INDEX IF NOT EXISTS idx_carts_updated_at ON carts(updated_at);
CREATE INDEX IF NOT EXISTS idx_carts_reminder ON carts(reminder_sent_at) WHERE reminder_sent_at IS NULL;
