import { NextRequest, NextResponse } from 'next/server';
import { createParcel } from '@/lib/sendcloud';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, address, city, postalCode, email, phone, orderNumber, deliveryMode } = body;

    if (!name || !address || !city || !postalCode || !email || !orderNumber) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    // Mapping mode de livraison → poids par défaut
    // Les IDs de méthode d'expédition seront à ajuster selon ton compte SendCloud
    // Pour l'instant on utilise un poids standard pour les fleurs
    const weight = body.weight || 1.5; // 1.5kg par défaut pour un bouquet

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
      shipmentMethod: body.shipmentMethodId || 8, // À configurer selon SendCloud
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
    return NextResponse.json(
      { error: 'Erreur lors de la création du colis' },
      { status: 500 }
    );
  }
}
