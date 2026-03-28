import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET() {
  try {
    // Test 1: Clé chargée ?
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'STRIPE_SECRET_KEY manquante' }, { status: 500 });
    }

    // Test 2: Connexion Stripe OK ?
    const balance = await stripe.balance.retrieve();
    
    // Test 3: Création session minimale
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: { name: 'Test' },
          unit_amount: 1000,
        },
        quantity: 1,
      }],
      success_url: 'https://anne-freret-fleuriste.vercel.app',
      cancel_url: 'https://anne-freret-fleuriste.vercel.app',
    });

    return NextResponse.json({
      ok: true,
      balance: balance.available[0]?.amount || 0,
      sessionId: session.id,
      checkoutUrl: session.url,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg, stack: error instanceof Error ? error.stack : undefined }, { status: 500 });
  }
}
