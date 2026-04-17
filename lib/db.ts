import { sql } from '@vercel/postgres';

// Client Vercel Postgres
// Note: @vercel/postgres est déprécié, migration vers Neon recommandée
// Pour l'instant, cela fonctionne avec les variables d'environnement auto-injectées par Vercel

export { sql };

// Types TypeScript

export interface User {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  address: string | null;
  address_complement: string | null;
  postal_code: string | null;
  city: string | null;
  loyalty_points: number;
  total_spent: number;
  is_admin: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  stripe_session_id: string | null;
  customer_type: 'particulier' | 'professionnel';
  customer_siren: string | null;
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  delivery_address: string;
  delivery_city: string;
  delivery_postal_code: string;
  delivery_mode: 'local' | 'chronopost';
  delivery_date: Date | null;
  card_message: string | null;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  tracking_number: string | null;
  sendcloud_parcel_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  price: number;
  images: string[];
  stock: number;
  is_active: boolean;
  featured: boolean;
  created_at: Date;
  updated_at: Date;
}

// Helper pour vérifier la connexion
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    return { success: true, time: result.rows[0].now };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
