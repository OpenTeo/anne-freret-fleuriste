-- Migration 006: Admin features (promo codes + devis requests)

-- Table codes promo
CREATE TABLE IF NOT EXISTS promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('percentage', 'fixed', 'free_shipping')),
  value NUMERIC(10, 2) DEFAULT 0,
  min_order NUMERIC(10, 2) DEFAULT 0,
  max_uses INT DEFAULT NULL,
  used_count INT DEFAULT 0,
  valid_from TIMESTAMP DEFAULT NOW(),
  valid_until TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table demandes de devis mariage
CREATE TABLE IF NOT EXISTS devis_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(50),
  date_mariage DATE,
  lieu_mariage VARCHAR(255),
  budget VARCHAR(100),
  message TEXT,
  status VARCHAR(30) DEFAULT 'nouveau',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_active ON promo_codes(is_active);
CREATE INDEX IF NOT EXISTS idx_devis_requests_status ON devis_requests(status);
CREATE INDEX IF NOT EXISTS idx_devis_requests_created ON devis_requests(created_at DESC);
