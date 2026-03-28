import { NextRequest, NextResponse } from 'next/server';
import { getParcel } from '@/lib/sendcloud';

export async function GET(req: NextRequest) {
  const parcelId = req.nextUrl.searchParams.get('id');
  if (!parcelId) {
    return NextResponse.json({ error: 'id manquant' }, { status: 400 });
  }

  try {
    const parcel = await getParcel(parseInt(parcelId));
    return NextResponse.json({
      id: parcel.id,
      trackingNumber: parcel.tracking_number,
      trackingUrl: parcel.tracking_url,
      status: parcel.status?.message || 'Inconnu',
      carrier: parcel.carrier?.code || '',
    });
  } catch (error) {
    console.error('SendCloud track error:', error);
    return NextResponse.json(
      { error: 'Colis introuvable' },
      { status: 404 }
    );
  }
}
