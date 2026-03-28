import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');
  if (!sessionId) {
    return NextResponse.json({ error: 'session_id manquant' }, { status: 400 });
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: 'Config manquante' }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}?expand[]=line_items`, {
      headers: {
        'Authorization': `Bearer ${key}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Session introuvable' }, { status: 404 });
    }

    const session = await res.json();

    return NextResponse.json({
      id: session.id,
      status: session.payment_status,
      amount_total: session.amount_total,
      customer_email: session.customer_email,
      metadata: session.metadata,
      line_items: session.line_items?.data?.map((item: any) => ({
        description: item.description,
        quantity: item.quantity,
        amount_total: item.amount_total,
      })),
    });
  } catch (error) {
    console.error('Session retrieve error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
