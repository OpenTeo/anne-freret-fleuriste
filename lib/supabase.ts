import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types pour les commandes
export interface Order {
  id: string;
  order_number: string;
  stripe_session_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  delivery_address: string;
  delivery_city: string;
  delivery_postal_code: string;
  delivery_mode: 'local' | 'colissimo' | 'chronopost';
  delivery_date: string | null;
  card_message: string | null;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered';
  tracking_number: string | null;
  sendcloud_parcel_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
}
