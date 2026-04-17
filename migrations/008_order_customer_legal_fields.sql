ALTER TABLE orders
ADD COLUMN IF NOT EXISTS customer_type VARCHAR(20) NOT NULL DEFAULT 'particulier'
  CHECK (customer_type IN ('particulier', 'professionnel'));

ALTER TABLE orders
ADD COLUMN IF NOT EXISTS customer_siren VARCHAR(9);

CREATE INDEX IF NOT EXISTS idx_orders_customer_type ON orders(customer_type);
