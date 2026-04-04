-- Migration 007: Ajout colonnes tracking livraison sur orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number VARCHAR(100);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_url TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS label_url TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS sendcloud_parcel_id INTEGER;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipped_at TIMESTAMP;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMP;
