import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Test 1: Vérifier config
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      return NextResponse.json({
        error: 'Variables Supabase manquantes',
        url: !!url,
        key: !!key,
      }, { status: 500 });
    }

    // Test 2: Insérer une commande test
    const testOrder = {
      order_number: `TEST${Date.now()}`,
      stripe_session_id: `test_session_${Date.now()}`,
      customer_name: 'Test Client',
      customer_email: 'test@example.com',
      customer_phone: '0600000000',
      delivery_address: '123 rue Test',
      delivery_city: 'Paris',
      delivery_postal_code: '75001',
      delivery_mode: 'local',
      total_amount: 50.00,
      status: 'confirmed',
    };

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(testOrder)
      .select()
      .single();

    if (orderError) {
      return NextResponse.json({
        error: 'Erreur insertion commande test',
        details: orderError,
        message: orderError.message,
        hint: orderError.hint,
      }, { status: 500 });
    }

    // Test 3: Lire la commande
    const { data: orders, error: readError } = await supabase
      .from('orders')
      .select('*')
      .limit(5);

    if (readError) {
      return NextResponse.json({
        error: 'Erreur lecture commandes',
        details: readError,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase fonctionne correctement',
      testOrder: order,
      totalOrders: orders?.length || 0,
      recentOrders: orders,
    });
  } catch (err) {
    return NextResponse.json({
      error: 'Exception',
      details: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}
