import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// GET /api/admin/shipping/label?orderId=xxx
// Proxy : télécharge le PDF depuis SendCloud avec auth et le renvoie au navigateur
export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get('orderId');
  const parcelId = request.nextUrl.searchParams.get('parcel_id');

  if (!orderId && !parcelId) {
    return NextResponse.json({ error: 'orderId ou parcel_id requis' }, { status: 400 });
  }

  try {
    const result = orderId
      ? await sql`SELECT label_url, sendcloud_parcel_id, tracking_number, tracking_url FROM orders WHERE id = ${orderId}`
      : await sql`SELECT label_url, sendcloud_parcel_id, tracking_number, tracking_url FROM orders WHERE sendcloud_parcel_id = ${parseInt(parcelId!)}`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });
    }

    const order = result.rows[0];
    const scParcelId = order.sendcloud_parcel_id;

    if (!scParcelId) {
      return NextResponse.json({ error: 'Pas de colis SendCloud pour cette commande' }, { status: 404 });
    }

    // Récupérer les credentials SendCloud
    const pub = process.env.SENDCLOUD_PUBLIC_KEY;
    const sec = process.env.SENDCLOUD_SECRET_KEY;
    if (!pub || !sec) {
      return NextResponse.json({ error: 'Clés SendCloud manquantes' }, { status: 500 });
    }

    const auth = 'Basic ' + Buffer.from(`${pub}:${sec}`).toString('base64');

    // Télécharger le PDF depuis SendCloud (format A6 pour étiquette standard)
    const labelUrl = `https://panel.sendcloud.sc/api/v2/labels/normal_printer/${scParcelId}?start_from=0`;
    
    const pdfResponse = await fetch(labelUrl, {
      headers: { 'Authorization': auth },
    });

    if (!pdfResponse.ok) {
      // Essayer le format label_printer (format thermique)
      const thermalUrl = `https://panel.sendcloud.sc/api/v2/labels/label_printer/${scParcelId}`;
      const thermalResponse = await fetch(thermalUrl, {
        headers: { 'Authorization': auth },
      });
      
      if (!thermalResponse.ok) {
        const errText = await thermalResponse.text();
        console.error('SendCloud label error:', errText);
        return NextResponse.json({ error: 'Impossible de récupérer l\'étiquette' }, { status: 502 });
      }

      const thermalPdf = await thermalResponse.arrayBuffer();
      return new NextResponse(thermalPdf, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename="etiquette-${order.tracking_number || scParcelId}.pdf"`,
        },
      });
    }

    const pdfBuffer = await pdfResponse.arrayBuffer();

    // Retourner le PDF directement au navigateur
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="etiquette-${order.tracking_number || scParcelId}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Erreur récupération label:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
