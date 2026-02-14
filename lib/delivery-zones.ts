export interface DeliveryZone {
  postalCode: string;
  city: string;
  distance: number; // km from Saint-Pair-sur-Mer
  deliveryFee: number;
  deliveryTime: string;
  zone: 'local' | 'regional' | 'national';
}

// Saint-Pair-sur-Mer reference point
export const REFERENCE_POINT = {
  latitude: 48.8167,
  longitude: -1.5667,
  postalCode: '50380',
  city: 'Saint-Pair-sur-Mer'
};

// Delivery zones data - focused on South Manche / North Brittany region
export const DELIVERY_ZONES: DeliveryZone[] = [
  // Zone 0-5km - 8€
  { postalCode: '50380', city: 'Saint-Pair-sur-Mer', distance: 0, deliveryFee: 8, deliveryTime: '2-4h', zone: 'local' },
  { postalCode: '50400', city: 'Granville', distance: 2, deliveryFee: 8, deliveryTime: '2-4h', zone: 'local' },
  { postalCode: '50350', city: 'Donville-les-Bains', distance: 3, deliveryFee: 8, deliveryTime: '2-4h', zone: 'local' },
  { postalCode: '50410', city: 'Percy-en-Normandie', distance: 4, deliveryFee: 8, deliveryTime: '2-4h', zone: 'local' },
  { postalCode: '50590', city: 'Montmartin-sur-Mer', distance: 5, deliveryFee: 8, deliveryTime: '2-4h', zone: 'local' },

  // Zone 5-10km - 12€
  { postalCode: '50290', city: 'Bréhal', distance: 8, deliveryFee: 12, deliveryTime: '4-6h', zone: 'local' },
  { postalCode: '50540', city: 'Isigny-le-Buat', distance: 7, deliveryFee: 12, deliveryTime: '4-6h', zone: 'local' },
  { postalCode: '50640', city: 'Villedieu-les-Poêles', distance: 9, deliveryFee: 12, deliveryTime: '4-6h', zone: 'local' },
  { postalCode: '50450', city: 'Gavray-sur-Sienne', distance: 10, deliveryFee: 12, deliveryTime: '4-6h', zone: 'local' },

  // Zone 10+ km local (Manche/Normandie) - 18€
  { postalCode: '50530', city: 'Sartilly-Baie-Bocage', distance: 12, deliveryFee: 18, deliveryTime: '4-8h', zone: 'regional' },
  { postalCode: '50300', city: 'Avranches', distance: 25, deliveryFee: 18, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '50170', city: 'Pontorson', distance: 30, deliveryFee: 18, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '50220', city: 'Ducey-Les Chéris', distance: 20, deliveryFee: 18, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '50600', city: 'Saint-Hilaire-du-Harcouët', distance: 35, deliveryFee: 18, deliveryTime: '6-8h', zone: 'regional' },
  
  // Manche department - main cities
  { postalCode: '50100', city: 'Cherbourg-en-Cotentin', distance: 85, deliveryFee: 18, deliveryTime: '24h', zone: 'regional' },
  { postalCode: '50000', city: 'Saint-Lô', distance: 45, deliveryFee: 18, deliveryTime: '24h', zone: 'regional' },
  { postalCode: '50200', city: 'Coutances', distance: 35, deliveryFee: 18, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '50700', city: 'Valognes', distance: 70, deliveryFee: 18, deliveryTime: '24h', zone: 'regional' },
  { postalCode: '50500', city: 'Carentan-les-Marais', distance: 60, deliveryFee: 18, deliveryTime: '24h', zone: 'regional' },

  // North Brittany - nearby cities
  { postalCode: '35120', city: 'Dol-de-Bretagne', distance: 40, deliveryFee: 18, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '35260', city: 'Cancale', distance: 45, deliveryFee: 18, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '35400', city: 'Saint-Malo', distance: 50, deliveryFee: 18, deliveryTime: '24h', zone: 'regional' },
  { postalCode: '22100', city: 'Dinan', distance: 65, deliveryFee: 18, deliveryTime: '24h', zone: 'regional' },

  // Additional South Manche cities
  { postalCode: '50320', city: 'La Haye-Pesnel', distance: 15, deliveryFee: 18, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '50510', city: 'Cerences', distance: 12, deliveryFee: 18, deliveryTime: '4-8h', zone: 'regional' },
  { postalCode: '50870', city: 'Tirepied-sur-Sée', distance: 18, deliveryFee: 18, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '50720', city: 'Barenton', distance: 45, deliveryFee: 18, deliveryTime: '24h', zone: 'regional' },
];

// National delivery for postal codes not in the list
export const NATIONAL_DELIVERY = {
  deliveryFee: 12.90,
  deliveryTime: '24-48h',
  zone: 'national' as const,
  description: 'Livraison nationale par transporteur spécialisé'
};

// Search function for delivery zones
export function findDeliveryZone(postalCode: string): DeliveryZone | null {
  const code = postalCode.replace(/\s/g, '');
  return DELIVERY_ZONES.find(zone => zone.postalCode === code) || null;
}

// Search by city name
export function findDeliveryZoneByCity(cityName: string): DeliveryZone | null {
  const searchName = cityName.toLowerCase().trim();
  return DELIVERY_ZONES.find(zone => 
    zone.city.toLowerCase().includes(searchName) ||
    searchName.includes(zone.city.toLowerCase())
  ) || null;
}

// Get delivery info for any postal code/city
export function getDeliveryInfo(input: string): {
  zone: DeliveryZone | null;
  fee: number;
  time: string;
  type: 'local' | 'regional' | 'national';
  description: string;
} {
  const trimmedInput = input.trim();
  
  // Try postal code first
  let zone = findDeliveryZone(trimmedInput);
  
  // If not found, try city name
  if (!zone) {
    zone = findDeliveryZoneByCity(trimmedInput);
  }

  if (zone) {
    return {
      zone,
      fee: zone.deliveryFee,
      time: zone.deliveryTime,
      type: zone.zone,
      description: `${zone.city} (${zone.postalCode}) - ${zone.distance}km`
    };
  }

  // Default to national delivery
  return {
    zone: null,
    fee: NATIONAL_DELIVERY.deliveryFee,
    time: NATIONAL_DELIVERY.deliveryTime,
    type: NATIONAL_DELIVERY.zone,
    description: NATIONAL_DELIVERY.description
  };
}

// Get suggestions based on partial input
export function getDeliveryZoneSuggestions(input: string, limit: number = 5): DeliveryZone[] {
  if (!input || input.length < 2) return [];
  
  const searchTerm = input.toLowerCase().trim();
  
  return DELIVERY_ZONES
    .filter(zone => 
      zone.postalCode.startsWith(searchTerm) || 
      zone.city.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      // Prioritize postal code matches
      const aPostalMatch = a.postalCode.startsWith(searchTerm);
      const bPostalMatch = b.postalCode.startsWith(searchTerm);
      
      if (aPostalMatch && !bPostalMatch) return -1;
      if (!aPostalMatch && bPostalMatch) return 1;
      
      // Then by distance
      return a.distance - b.distance;
    })
    .slice(0, limit);
}