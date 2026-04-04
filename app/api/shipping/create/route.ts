import { NextRequest, NextResponse } from 'next/server';
import { createParcel } from '@/lib/sendcloud';
import { requireAdmin, isAuthError } from '@/lib/api-auth';

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (isAuthError(auth)) return auth;

  try {
    const body = await req.json();
    const { name, address, city, postalCode, email, phone, orderNumber, deliveryMode } = body;

    if (!name || !address || !city || !postalCode || !email || !orderNumber) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    const weight = body.weight || 1.5;

    const parcel = await createParcel({
      name,
      address,
      city,
      postalCode,
      country: 'FR',
      email,
      phone: phone || '',
      orderNumber,
      weight,
      shipmentMethod: body.shipmentMethodId || 9, // Chronopost
    });

    return NextResponse.json({
      parcelId: parcel.id,
      trackingNumber: parcel.tracking_number,
      trackingUrl: parcel.tracking_url,
      labelUrl: parcel.label?.label_printer || null,
      status: parcel.status?.message || 'Créé',
    });
  } catch (error) {
    console.error('SendCloud create parcel error:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du colis' }, { status: 500 });
  }
}
