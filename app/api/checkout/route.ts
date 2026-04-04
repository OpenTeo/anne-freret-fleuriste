import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

interface CartItem {
  id: string; // Format: "product-uuid-sizeName" ou "product-uuid-default"
  name: string;
  size: string;
  price: number; // ⚠️ NE PAS FAIRE CONFIANCE
  quantity: number;
  image: string;
  category: string;
}

interface CheckoutBody {
  items: CartItem[];
  delivery: {
    mode: string; // local | colissimo | chronopost
    date: string;
    fee: number; // ⚠️ NE PAS FAIRE CONFIANCE
    discount: number; // ⚠️ NE PAS FAIRE CONFIANCE
    subtotal: number; // ⚠️ NE PAS FAIRE CONFIANCE
    total: number; // ⚠️ NE PAS FAIRE CONFIANCE
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
  cardSupplement?: number; // ⚠️ NE PAS FAIRE CONFIANCE
  promoCode?: string; // Code promo à valider
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();
    const { items, delivery, customer, cardMessage, promoCode } = body;

    if (!items?.length || !customer?.email) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json({ error: 'Config Stripe manquante' }, { status: 500 });
    }

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://anne-freret-fleuriste.vercel.app').trim();

    // ========================================
    // 🔒 VALIDATION 1 : Vérifier les prix réels en base
    // ========================================
    const validatedItems: Array<{ name: string; size: string; price: number; quantity: number; image: string }> = [];
    let subtotal = 0;

    for (const item of items) {
      // Extraire product_id depuis item.id (format: "uuid-sizeName")
      const productId = item.id.split('-').slice(0, 5).join('-'); // Récupère l'UUID (5 segments)
      
      const productResult = await sql`
        SELECT name, price, sizes, images FROM products WHERE id = ${productId} AND is_active = true
      `;

      if (productResult.rows.length === 0) {
        return NextResponse.json({ error: `Produit ${item.name} introuvable ou inactif` }, { status: 400 });
      }

      const product = productResult.rows[0];
      let realPrice = parseFloat(product.price);

      // Si le produit a des tailles (sizes), vérifier le prix de la taille sélectionnée
      if (product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0) {
        const selectedSize = product.sizes.find((s: any) => s.name === item.size);
        if (selectedSize && selectedSize.price) {
          realPrice = parseFloat(selectedSize.price);
        }
      }

      // Ajouter à la liste validée
      validatedItems.push({
        name: product.name,
        size: item.size,
        price: realPrice,
        quantity: item.quantity,
        image: product.images?.[0] || '',
      });

      subtotal += realPrice * item.quantity;
    }

    // ========================================
    // 🔒 VALIDATION 2 : Vérifier les frais de livraison
    // ========================================
    let realDeliveryFee = 0;

    if (delivery.mode === 'colissimo') {
      realDeliveryFee = 7.0;
    } else if (delivery.mode === 'chronopost') {
      realDeliveryFee = 12.0;
    } else if (delivery.mode === 'local') {
      // Livraison locale : vérifier le code postal (simplification : 0€ si 50xxx, sinon 7€)
      const postalCode = customer.postalCode;
      if (postalCode.startsWith('50')) {
        realDeliveryFee = 0; // Gratuit pour la Manche
      } else {
        realDeliveryFee = 7.0; // Sinon Colissimo
      }
    }

    // ========================================
    // 🔒 VALIDATION 3 : Vérifier le code promo
    // ========================================
    let discount = 0;
    let promoCodeUsed = '';

    if (promoCode) {
      const promoResult = await sql`
        SELECT code, type, value, min_order, max_uses, used_count, valid_from, valid_until, is_active
        FROM promo_codes
        WHERE LOWER(code) = LOWER(${promoCode})
      `;

      if (promoResult.rows.length > 0) {
        const promo = promoResult.rows[0];
        const now = new Date();
        const validFrom = promo.valid_from ? new Date(promo.valid_from) : null;
        const validUntil = promo.valid_until ? new Date(promo.valid_until) : null;

        // Vérifications
        if (!promo.is_active) {
          return NextResponse.json({ error: 'Code promo inactif' }, { status: 400 });
        }
        if (validFrom && now < validFrom) {
          return NextResponse.json({ error: 'Code promo pas encore valide' }, { status: 400 });
        }
        if (validUntil && now > validUntil) {
          return NextResponse.json({ error: 'Code promo expiré' }, { status: 400 });
        }
        if (promo.max_uses && promo.used_count >= promo.max_uses) {
          return NextResponse.json({ error: 'Code promo épuisé' }, { status: 400 });
        }
        if (promo.min_order && subtotal < parseFloat(promo.min_order)) {
          return NextResponse.json({ error: `Commande minimum ${promo.min_order}€ pour ce code` }, { status: 400 });
        }

        // Calculer la réduction
        if (promo.type === 'percentage') {
          discount = (subtotal * parseFloat(promo.value)) / 100;
        } else if (promo.type === 'fixed') {
          discount = parseFloat(promo.value);
        }

        // Ne pas dépasser le subtotal
        if (discount > subtotal) {
          discount = subtotal;
        }

        promoCodeUsed = promo.code;
      } else {
        return NextResponse.json({ error: 'Code promo invalide' }, { status: 400 });
      }
    }

    // ========================================
    // 🔒 VALIDATION 4 : Carte message (fixe 5€)
    // ========================================
    const realCardSupplement = cardMessage ? 5.0 : 0;

    // ========================================
    // 🧮 CALCUL FINAL
    // ========================================
    const total = subtotal - discount + realDeliveryFee + realCardSupplement;

    if (total < 0) {
      return NextResponse.json({ error: 'Total invalide' }, { status: 400 });
    }

    // ========================================
    // 🎯 CRÉATION SESSION STRIPE (avec prix validés)
    // ========================================
    const params = new URLSearchParams();
    params.append('mode', 'payment');
    params.append('payment_method_types[0]', 'card');
    params.append('customer_email', customer.email);
    params.append('success_url', `${siteUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`);
    params.append('cancel_url', `${siteUrl}/panier`);
    params.append('locale', 'fr');
    params.append('billing_address_collection', 'required');

    // Line items (validés)
    let idx = 0;
    validatedItems.forEach((item) => {
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

    // Livraison
    if (realDeliveryFee > 0) {
      const modeLabel =
        delivery.mode === 'local' ? 'Livraison locale' :
        delivery.mode === 'colissimo' ? 'Colissimo (48h)' :
        delivery.mode === 'chronopost' ? 'Chronopost Express (24h)' :
        'Livraison';
      params.append(`line_items[${idx}][price_data][currency]`, 'eur');
      params.append(`line_items[${idx}][price_data][product_data][name]`, modeLabel);
      params.append(`line_items[${idx}][price_data][unit_amount]`, Math.round(realDeliveryFee * 100).toString());
      params.append(`line_items[${idx}][quantity]`, '1');
      idx++;
    }

    // Carte message
    if (realCardSupplement > 0) {
      params.append(`line_items[${idx}][price_data][currency]`, 'eur');
      params.append(`line_items[${idx}][price_data][product_data][name]`, 'Carte message artisanale');
      params.append(`line_items[${idx}][price_data][unit_amount]`, Math.round(realCardSupplement * 100).toString());
      params.append(`line_items[${idx}][quantity]`, '1');
      idx++;
    }

    // Réduction (si applicable)
    if (discount > 0 && promoCodeUsed) {
      params.append('discounts[0][coupon]', await createStripeCoupon(discount, key));
    }

    // Metadata
    params.append('metadata[customer_name]', `${customer.firstName} ${customer.lastName}`);
    params.append('metadata[customer_phone]', customer.phone);
    params.append('metadata[delivery_mode]', delivery.mode);
    params.append('metadata[delivery_date]', delivery.date);
    params.append('metadata[delivery_address]', `${customer.address}, ${customer.postalCode} ${customer.city}`);
    params.append('metadata[card_message]', cardMessage || '');
    params.append('metadata[promo_code]', promoCodeUsed || '');
    params.append('metadata[order_items]', validatedItems.map(i => `${i.quantity}x ${i.name} (${i.size})`).join(' | '));
    params.append('metadata[order_items_json]', JSON.stringify(validatedItems.map(i => ({
      name: i.name,
      size: i.size,
      price: i.price,
      quantity: i.quantity,
      image: i.image,
    }))));

    // Appel Stripe
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

// Créer un coupon Stripe à usage unique
async function createStripeCoupon(amountOff: number, key: string): Promise<string> {
  const params = new URLSearchParams();
  params.append('amount_off', Math.round(amountOff * 100).toString());
  params.append('currency', 'eur');
  params.append('duration', 'once');

  const res = await fetch('https://api.stripe.com/v1/coupons', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const data = await res.json();
  return data.id;
}
