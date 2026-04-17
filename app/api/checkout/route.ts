import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

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
    customerType?: 'particulier' | 'professionnel';
    siren?: string;
    address: string;
    postalCode: string;
    city: string;
  };
  cardMessage?: string;
  cardSupplement?: number;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!rateLimit(`checkout:${ip}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Trop de tentatives. Réessayez dans quelques minutes.' }, { status: 429 });
  }

  try {
    const body: CheckoutBody = await req.json();
    const { items, delivery, customer, cardMessage, cardSupplement } = body;

    if (!items?.length || !customer?.email) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    const customerType = customer.customerType === 'professionnel' ? 'professionnel' : 'particulier';
    const customerSiren = (customer.siren || '').trim();

    if (customerType === 'professionnel' && !/^\d{9}$/.test(customerSiren)) {
      return NextResponse.json({ error: 'SIREN invalide' }, { status: 400 });
    }

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json({ error: 'Config Stripe manquante' }, { status: 500 });
    }

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://anne-freret-fleuriste.vercel.app').trim();

    // Build form data for Stripe API
    const params = new URLSearchParams();
    params.append('mode', 'payment');
    params.append('payment_method_types[0]', 'card');
    params.append('customer_email', customer.email);
    params.append('success_url', `${siteUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`);
    params.append('cancel_url', `${siteUrl}/panier`);
    params.append('locale', 'fr');
    params.append('billing_address_collection', 'required');

    // Add line items
    let idx = 0;
    items.forEach((item) => {
      params.append(`line_items[${idx}][price_data][currency]`, 'eur');
      params.append(`line_items[${idx}][price_data][product_data][name]`, item.name);
      params.append(`line_items[${idx}][price_data][product_data][description]`, `Taille : ${item.size}`);
      if (item.image.startsWith('http')) {
        params.append(`line_items[${idx}][price_data][product_data][images][0]`, item.image);
      }
      params.append(`line_items[${idx}][price_data][unit_amount]`, Math.round(item.price * 100).toString());
      params.append(`line_items[${idx}][quantity]`, item.quantity.toString());
      idx++;
    });

    // Delivery fee
    if (delivery.fee > 0) {
      const modeLabel =
        delivery.mode === 'local' ? 'Livraison locale' :
        delivery.mode === 'chronopost' ? 'Chronopost Express (24h)' :
        'Livraison';
      params.append(`line_items[${idx}][price_data][currency]`, 'eur');
      params.append(`line_items[${idx}][price_data][product_data][name]`, modeLabel);
      params.append(`line_items[${idx}][price_data][unit_amount]`, Math.round(delivery.fee * 100).toString());
      params.append(`line_items[${idx}][quantity]`, '1');
      idx++;
    }

    // Card supplement
    if (cardSupplement && cardSupplement > 0) {
      params.append(`line_items[${idx}][price_data][currency]`, 'eur');
      params.append(`line_items[${idx}][price_data][product_data][name]`, 'Carte message artisanale');
      params.append(`line_items[${idx}][price_data][unit_amount]`, Math.round(cardSupplement * 100).toString());
      params.append(`line_items[${idx}][quantity]`, '1');
      idx++;
    }

    // Metadata
    params.append('metadata[customer_name]', `${customer.firstName} ${customer.lastName}`);
    params.append('metadata[customer_phone]', customer.phone);
    params.append('metadata[customer_type]', customerType);
    params.append('metadata[customer_siren]', customerType === 'professionnel' ? customerSiren : '');
    params.append('metadata[delivery_mode]', delivery.mode);
    params.append('metadata[delivery_date]', delivery.date);
    params.append('metadata[delivery_address]', `${customer.address}, ${customer.postalCode} ${customer.city}`);
    params.append('metadata[card_message]', cardMessage || '');
    params.append('metadata[order_items]', items.map(i => `${i.quantity}x ${i.name} (${i.size})`).join(' | '));
    params.append('metadata[order_items_json]', JSON.stringify(items.map(i => ({
      name: i.name,
      size: i.size,
      price: i.price,
      quantity: i.quantity,
      image: i.image,
    }))));

    // Direct fetch to Stripe API
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Stripe API error:', JSON.stringify(data, null, 2));
      return NextResponse.json({ 
        error: data.error?.message || 'Erreur Stripe',
        details: data.error || data,
      }, { status: res.status });
    }

    return NextResponse.json({ url: data.url });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error('Checkout error:', errMsg);
    return NextResponse.json({ error: 'Erreur serveur', details: errMsg }, { status: 500 });
  }
}
