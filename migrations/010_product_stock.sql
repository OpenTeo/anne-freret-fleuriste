-- Migration 010: Colonne stock entier pour les produits
-- NULL = stock illimité (comportement par défaut pour fleurs fraîches)
-- INTEGER = stock limité, décrémenté à chaque commande

ALTER TABLE products ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT NULL;

CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock) WHERE stock IS NOT NULL;
