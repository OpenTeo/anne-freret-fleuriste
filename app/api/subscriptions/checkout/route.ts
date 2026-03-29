import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

// Mapping des formules/fréquences vers les Price IDs Stripe (créés le 2026-03-29)
const PRICE_IDS: Record<string, Record<string, string>> = {
  essentiel: {
    weekly: 'price_1TGSgxRwU9pCrCN8Zeyu0ukj',
    biweekly: 'price_1TGSgxRwU9pCrCN8LTBQMz99',
    monthly: 'price_1TGSgxRwU9pCrCN8OEWAfnN8',
  },
  signature: {
    weekly: 'price_1TGSgxRwU9pCrCN88MTZGPb2',
    biweekly: 'price_1TGSgxRwU9pCrCN8Fd31JXBQ',
    monthly: 'price_1TGSgxRwU9pCrCN8oblkGjz9',
  },
  prestige: {
    weekly: 'price_1TGSgyRwU9pCrCN81USSri9D',
    biweekly: 'price_1TGSgyRwU9pCrCN8eTlY03mG',
    monthly: 'price_1TGSgyRwU9pCrCN8OlbqbkA0',
  },
};

interface CheckoutBody {
  formula: string;
  frequency: string;
  email: string;
  userId: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();
    const { formula, frequency, email, userId } = body;

    if (!formula || !frequency || !email) {
      return NextResponse.json(
        { error: 'Données manquantes (formula, frequency, email requis)' },
        { status: 400 }
      );
    }

    // Vérifier que la combinaison existe
    const priceId = PRICE_IDS[formula]?.[frequency];
    if (!priceId) {
      return NextResponse.json(
        { error: `Combinaison invalide: ${formula} / ${frequency}` },
        { status: 400 }
      );
    }

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://anne-freret-fleuriste.vercel.app').trim();

    // Créer ou récupérer le Customer Stripe
    let customerId: string;
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    
    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
      console.log(`✅ Customer existant trouvé: ${customerId}`);
    } else {
      const customer = await stripe.customers.create({ email });
      customerId = customer.id;
      console.log(`✨ Nouveau customer créé: ${customerId}`);
    }

    // Créer une Checkout Session en mode 'subscription'
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/compte?subscription=success`,
      cancel_url: `${siteUrl}/abonnement`,
      locale: 'fr',
      subscription_data: {
        metadata: {
          formula,
          frequency,
          user_id: userId,
        },
      },
      metadata: {
        formula,
        frequency,
        user_id: userId,
      },
    });

    console.log(`🔗 Checkout session créée: ${session.id} | URL: ${session.url}`);

    return NextResponse.json({ success: true, url: session.url });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error('❌ Erreur checkout abonnement:', errMsg);
    return NextResponse.json(
      { error: 'Erreur serveur', details: errMsg },
      { status: 500 }
    );
  }
}
