import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Force Node.js runtime (pas Edge) pour fetch avec auth
export const runtime = 'nodejs';

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
      ? await sql`SELECT label_url, sendcloud_parcel_id, tracking_number, order_number FROM orders WHERE id = ${orderId}`
      : await sql`SELECT label_url, sendcloud_parcel_id, tracking_number, order_number FROM orders WHERE sendcloud_parcel_id = ${parseInt(parcelId!)}`;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });
    }

    const order = result.rows[0];
    const scParcelId = order.sendcloud_parcel_id;

    if (!scParcelId) {
      return NextResponse.json({ 
        error: 'Pas de colis SendCloud pour cette commande. Le colis est créé automatiquement quand le client choisit Colissimo ou Chronopost.' 
      }, { status: 404 });
    }

    // Récupérer les credentials SendCloud
    const pub = process.env.SENDCLOUD_PUBLIC_KEY;
    const sec = process.env.SENDCLOUD_SECRET_KEY;
    if (!pub || !sec) {
      console.error('SendCloud keys missing: pub=', !!pub, 'sec=', !!sec);
      return NextResponse.json({ error: 'Configuration SendCloud manquante' }, { status: 500 });
    }

    const auth = 'Basic ' + Buffer.from(`${pub}:${sec}`).toString('base64');

    // Essayer d'abord le format A4 (normal_printer), puis thermique (label_printer)
    const urls = [
      `https://panel.sendcloud.sc/api/v2/labels/normal_printer/${scParcelId}?start_from=0`,
      `https://panel.sendcloud.sc/api/v2/labels/label_printer/${scParcelId}`,
    ];

    for (const labelUrl of urls) {
      try {
        console.log(`Fetching label from: ${labelUrl}`);
        const pdfResponse = await fetch(labelUrl, {
          headers: { 
            'Authorization': auth,
            'Accept': 'application/pdf',
          },
        });

        console.log(`Response: ${pdfResponse.status} ${pdfResponse.statusText} content-type: ${pdfResponse.headers.get('content-type')}`);

        if (pdfResponse.ok) {
          const contentType = pdfResponse.headers.get('content-type') || '';
          
          if (contentType.includes('pdf')) {
            const pdfBuffer = await pdfResponse.arrayBuffer();
            console.log(`PDF downloaded: ${pdfBuffer.byteLength} bytes`);
            
            return new NextResponse(pdfBuffer, {
              status: 200,
              headers: {
                'Content-Type': 'application/pdf',
                'Content-Length': String(pdfBuffer.byteLength),
                'Content-Disposition': `inline; filename="etiquette-${order.order_number || scParcelId}.pdf"`,
                'Cache-Control': 'private, max-age=3600',
              },
            });
          } else {
            // Peut-être un JSON d'erreur
            const text = await pdfResponse.text();
            console.error(`Unexpected content-type: ${contentType}, body: ${text.substring(0, 200)}`);
          }
        } else {
          const errText = await pdfResponse.text();
          console.error(`SendCloud ${pdfResponse.status}: ${errText.substring(0, 200)}`);
        }
      } catch (fetchErr) {
        console.error(`Fetch error for ${labelUrl}:`, fetchErr);
      }
    }

    return NextResponse.json({ error: 'Impossible de récupérer l\'étiquette depuis SendCloud' }, { status: 502 });
  } catch (error) {
    console.error('Erreur récupération label:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
