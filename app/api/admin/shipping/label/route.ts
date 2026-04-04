import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getLabelUrl } from '@/lib/sendcloud';

// GET /api/admin/shipping/label?orderId=xxx
// Récupère l'URL du bon de livraison SendCloud
export async function GET(request: NextRequest) {
  const orderId = request.nextUrl.searchParams.get('orderId');
  
  if (!orderId) {
    return NextResponse.json({ error: 'orderId requis' }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT label_url, sendcloud_parcel_id, tracking_number, tracking_url
      FROM orders WHERE id = ${orderId}
    `;
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });
    }

    const order = result.rows[0];

    // Si on a déjà l'URL du label, la retourner
    if (order.label_url) {
      return NextResponse.json({
        labelUrl: order.label_url,
        trackingNumber: order.tracking_number,
        trackingUrl: order.tracking_url,
      });
    }

    // Sinon, essayer de la récupérer depuis SendCloud
    if (order.sendcloud_parcel_id) {
      const labelUrl = await getLabelUrl(order.sendcloud_parcel_id);
      
      // Sauvegarder pour la prochaine fois
      if (labelUrl) {
        await sql`
          UPDATE orders SET label_url = ${labelUrl} WHERE id = ${orderId}
        `;
      }

      return NextResponse.json({
        labelUrl,
        trackingNumber: order.tracking_number,
        trackingUrl: order.tracking_url,
      });
    }

    return NextResponse.json({ error: 'Pas de colis SendCloud pour cette commande' }, { status: 404 });
  } catch (error) {
    console.error('Erreur récupération label:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
