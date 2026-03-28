import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return NextResponse.json({ error: 'No key' }, { status: 500 });

    // Direct fetch to Stripe API (no SDK)
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'payment_method_types[0]': 'card',
        'line_items[0][price_data][currency]': 'eur',
        'line_items[0][price_data][product_data][name]': 'Test',
        'line_items[0][price_data][unit_amount]': '1000',
        'line_items[0][quantity]': '1',
        'success_url': 'https://anne-freret-fleuriste.vercel.app',
        'cancel_url': 'https://anne-freret-fleuriste.vercel.app',
      }),
    });

    const data = await res.json();
    return NextResponse.json({ ok: res.ok, status: res.status, data });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
