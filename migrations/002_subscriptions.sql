-- Migration 002: Subscriptions (Abonnements)
-- À exécuter dans Neon SQL Editor

-- Table abonnements
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  formula VARCHAR(20) NOT NULL CHECK (formula IN ('essentiel', 'signature', 'prestige')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled')),
  frequency VARCHAR(20) NOT NULL CHECK (frequency IN ('weekly', 'biweekly', 'monthly')),
  price DECIMAL(10, 2) NOT NULL,
  next_delivery_date DATE,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  pause_reason TEXT,
  cancelled_at TIMESTAMP,
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour performance
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_next_delivery ON subscriptions(next_delivery_date);

-- Trigger auto-update
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour calculer la prochaine livraison
CREATE OR REPLACE FUNCTION calculate_next_delivery(
  p_current_date DATE,
  p_frequency VARCHAR(20)
) RETURNS DATE AS $$
BEGIN
  IF p_frequency = 'weekly' THEN
    RETURN p_current_date + INTERVAL '7 days';
  ELSIF p_frequency = 'biweekly' THEN
    RETURN p_current_date + INTERVAL '14 days';
  ELSE -- monthly
    RETURN p_current_date + INTERVAL '1 month';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Seed abonnements de test (liés au compte admin pour test)
INSERT INTO subscriptions (user_id, formula, status, frequency, price, next_delivery_date, start_date)
SELECT 
  id,
  'signature',
  'active',
  'biweekly',
  44.90,
  CURRENT_DATE + INTERVAL '7 days',
  CURRENT_DATE - INTERVAL '30 days'
FROM users 
WHERE email = 'admin@anne-freret.fr'
ON CONFLICT DO NOTHING;
