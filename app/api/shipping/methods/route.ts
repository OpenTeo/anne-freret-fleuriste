import { NextResponse } from 'next/server';
import { getShippingMethods } from '@/lib/sendcloud';

export async function GET() {
  try {
    const methods = await getShippingMethods();
    return NextResponse.json({ methods });
  } catch (error) {
    console.error('SendCloud shipping methods error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des méthodes' },
      { status: 500 }
    );
  }
}
