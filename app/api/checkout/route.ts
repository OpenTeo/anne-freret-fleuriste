import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CheckoutBody {
  items: CartItem[];
  delivery: {
    mode: string;
    date: string;
    fee: number;
    discount: number;
    subtotal: number;
    total: number;
  };
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
  };
  cardMessage?: string;
  cardSupplement?: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();
    const { items, delivery, customer, cardMessage, cardSupplement } = body;

    if (!items?.length || !customer?.email) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Build Stripe line items
    const lineItems: Array<{
      price_data: {
        currency: string;
        product_data: { name: string; description?: string; images?: string[] };
        unit_amount: number;
      };
      quantity: number;
    }> = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          description: `Taille : ${item.size}`,
          images: item.image.startsWith('http') ? [item.image] : undefined,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Delivery fee
    if (delivery.fee > 0) {
      const modeLabel =
        delivery.mode === 'local' ? 'Livraison locale' :
        delivery.mode === 'colissimo' ? 'Colissimo (48h)' :
        delivery.mode === 'chronopost' ? 'Chronopost Express (24h)' :
        'Livraison';

      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: { name: modeLabel },
          unit_amount: Math.round(delivery.fee * 100),
        },
        quantity: 1,
      });
    }

    // Card supplement
    if (cardSupplement && cardSupplement > 0) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: { name: 'Carte message artisanale' },
          unit_amount: Math.round(cardSupplement * 100),
        },
        quantity: 1,
      });
    }

    // Discount coupon (if applicable)
    const discounts: Array<{ coupon: string }> = [];
    if (delivery.discount > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: Math.round(delivery.discount * 100),
        currency: 'eur',
        duration: 'once',
        name: 'Réduction',
      });
      discounts.push({ coupon: coupon.id });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      discounts: discounts.length > 0 ? discounts : undefined,
      customer_email: customer.email,
      metadata: {
        customer_name: `${customer.firstName} ${customer.lastName}`,
        customer_phone: customer.phone,
        delivery_mode: delivery.mode,
        delivery_date: delivery.date,
        delivery_address: `${customer.address}, ${customer.postalCode} ${customer.city}`,
        card_message: cardMessage || '',
        order_items: items.map(i => `${i.quantity}x ${i.name} (${i.size})`).join(' | '),
      },
      shipping_options: delivery.fee === 0 && delivery.mode ? [{
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'eur' },
          display_name: delivery.mode === 'local' ? 'Livraison locale offerte' :
            delivery.mode === 'colissimo' ? 'Colissimo offert' :
            'Chronopost offert',
        },
      }] : undefined,
      success_url: `${siteUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/panier`,
      locale: 'fr',
      payment_intent_data: {
        metadata: {
          delivery_mode: delivery.mode,
          delivery_date: delivery.date,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error('Stripe checkout error:', errMsg, error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du paiement', details: errMsg },
      { status: 500 }
    );
  }
}
