const SENDCLOUD_API = 'https://panel.sendcloud.sc/api/v2';

function getAuth() {
  const pub = process.env.SENDCLOUD_PUBLIC_KEY;
  const sec = process.env.SENDCLOUD_SECRET_KEY;
  if (!pub || !sec) throw new Error('SendCloud keys manquantes dans .env.local');
  return 'Basic ' + Buffer.from(`${pub}:${sec}`).toString('base64');
}

async function sendcloudFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${SENDCLOUD_API}${path}`, {
    ...options,
    headers: {
      'Authorization': getAuth(),
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SendCloud ${res.status}: ${text}`);
  }
  return res.json();
}

export interface ParcelData {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string; // "FR"
  email: string;
  phone: string;
  orderNumber: string;
  weight: number; // kg
  shipmentMethod: number; // SendCloud shipping method ID
}

/**
 * Crée un colis dans SendCloud et génère l'étiquette
 */
export async function createParcel(data: ParcelData) {
  const body = {
    parcel: {
      name: data.name,
      address: data.address,
      city: data.city,
      postal_code: data.postalCode,
      country: data.country,
      email: data.email,
      telephone: data.phone,
      order_number: data.orderNumber,
      weight: data.weight.toFixed(3),
      shipment: { id: data.shipmentMethod },
      request_label: true,
    },
  };

  const result = await sendcloudFetch('/parcels', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return result.parcel;
}

/**
 * Récupère les méthodes d'expédition disponibles
 */
export async function getShippingMethods() {
  const result = await sendcloudFetch('/shipping_methods');
  return result.shipping_methods;
}

/**
 * Récupère le statut d'un colis
 */
export async function getParcel(parcelId: number) {
  const result = await sendcloudFetch(`/parcels/${parcelId}`);
  return result.parcel;
}

/**
 * Récupère l'URL du PDF de l'étiquette
 */
export async function getLabelUrl(parcelId: number): Promise<string> {
  const parcel = await getParcel(parcelId);
  return parcel.label?.label_printer || parcel.label?.normal_printer?.[0] || '';
}
