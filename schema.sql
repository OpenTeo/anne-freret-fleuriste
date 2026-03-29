-- Anne Freret Fleuriste - Database Schema
-- Vercel Postgres

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table utilisateurs (clients + admin)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  address VARCHAR(255),
  address_complement VARCHAR(255),
  postal_code VARCHAR(10),
  city VARCHAR(100),
  loyalty_points INTEGER DEFAULT 0,
  total_spent DECIMAL(10, 2) DEFAULT 0,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table commandes
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  stripe_session_id VARCHAR(255) UNIQUE,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  delivery_address VARCHAR(255) NOT NULL,
  delivery_city VARCHAR(100) NOT NULL,
  delivery_postal_code VARCHAR(10) NOT NULL,
  delivery_mode VARCHAR(20) NOT NULL, -- 'local', 'colissimo', 'chronopost'
  delivery_date DATE,
  card_message TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled'
  tracking_number VARCHAR(100),
  sendcloud_parcel_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table articles de commande
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_name VARCHAR(255) NOT NULL,
  product_image VARCHAR(500),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table produits (pour migration future)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  images TEXT[], -- Array d'URLs
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);

-- Trigger pour update updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour ajouter points de fidélité (1€ = 1 point)
CREATE OR REPLACE FUNCTION add_loyalty_points()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'confirmed' AND OLD.status != 'confirmed' AND NEW.user_id IS NOT NULL THEN
        UPDATE users
        SET loyalty_points = loyalty_points + FLOOR(NEW.total_amount),
            total_spent = total_spent + NEW.total_amount
        WHERE id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_loyalty_points_on_order_confirm
    AFTER UPDATE ON orders
    FOR EACH ROW
    WHEN (NEW.status = 'confirmed')
    EXECUTE FUNCTION add_loyalty_points();

-- Seed admin account (password: AnneFreret2026!)
-- Hash généré avec bcrypt: $2b$10$... (à faire après installation bcrypt)
-- Pour l'instant on mettra un hash temporaire
