import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

// Mapping formules → Prix Stripe (à créer dans Stripe Dashboard)
const FORMULA_PRICES: Record<string, { priceId: string; amount: number }> = {
  essentiel: {
    priceId: process.env.STRIPE_PRICE_ESSENTIEL || 'price_essentiel', // À remplacer par vrai ID
    amount: 29.90,
  },
  signature: {
    priceId: process.env.STRIPE_PRICE_SIGNATURE || 'price_signature',
    amount: 44.90,
  },
  prestige: {
    priceId: process.env.STRIPE_PRICE_PRESTIGE || 'price_prestige',
    amount: 69.90,
  },
};

// Mapping fréquences → recurring interval Stripe
const FREQUENCY_INTERVALS: Record<string, { interval: Stripe.Price.Recurring.Interval; interval_count: number }> = {
  weekly: { interval: 'week', interval_count: 1 },
  biweekly: { interval: 'week', interval_count: 2 },
  monthly: { interval: 'month', interval_count: 1 },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formula, frequency, email, userId } = body;

    if (!formula || !frequency || !email) {
      return NextResponse.json(
        { error: 'Champs manquants: formula, frequency, email' },
        { status: 400 }
      );
    }

    const formulaConfig = FORMULA_PRICES[formula];
    if (!formulaConfig) {
      return NextResponse.json(
        { error: 'Formule invalide' },
        { status: 400 }
      );
    }

    const frequencyConfig = FREQUENCY_INTERVALS[frequency];
    if (!frequencyConfig) {
      return NextResponse.json(
        { error: 'Fréquence invalide' },
        { status: 400 }
      );
    }

    // Créer ou récupérer le customer Stripe
    const customers = await stripe.customers.list({
      email,
      limit: 1,
    });

    let customer: Stripe.Customer;
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        metadata: {
          userId: userId || '',
        },
      });
    }

    // Créer un Price dynamique pour cette combinaison formule/fréquence
    // (Alternative: créer tous les prix à l'avance dans Stripe Dashboard)
    const price = await stripe.prices.create({
      unit_amount: Math.round(formulaConfig.amount * 100),
      currency: 'eur',
      recurring: frequencyConfig,
      product_data: {
        name: `Abonnement ${formula.charAt(0).toUpperCase() + formula.slice(1)}`,
        description: `Livraison de fleurs fraîches - ${frequency === 'weekly' ? 'Hebdomadaire' : frequency === 'biweekly' ? 'Bi-mensuel' : 'Mensuel'}`,
      },
    });

    // Créer la Checkout Session en mode subscription
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: {
          formula,
          frequency,
          userId: userId || '',
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}&type=subscription`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/abonnement`,
      locale: 'fr',
      billing_address_collection: 'required',
      allow_promotion_codes: true,
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: unknown) {
    console.error('❌ Erreur création checkout subscription:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
