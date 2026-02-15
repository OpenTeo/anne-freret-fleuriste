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

// Delivery zones data - focused on South Manche / North Brittany region + major French cities
export const DELIVERY_ZONES: DeliveryZone[] = [
  // Zone 0-5km - 8€
  { postalCode: '50380', city: 'Saint-Pair-sur-Mer', distance: 0, deliveryFee: 6, deliveryTime: '2-4h', zone: 'local' },
  { postalCode: '50400', city: 'Granville', distance: 2, deliveryFee: 6, deliveryTime: '2-4h', zone: 'local' },
  { postalCode: '50350', city: 'Donville-les-Bains', distance: 3, deliveryFee: 6, deliveryTime: '2-4h', zone: 'local' },
  { postalCode: '50410', city: 'Percy-en-Normandie', distance: 4, deliveryFee: 6, deliveryTime: '2-4h', zone: 'local' },
  { postalCode: '50590', city: 'Montmartin-sur-Mer', distance: 5, deliveryFee: 6, deliveryTime: '2-4h', zone: 'local' },

  // Zone 5-10km - 12€
  { postalCode: '50290', city: 'Bréhal', distance: 8, deliveryFee: 8, deliveryTime: '4-6h', zone: 'local' },
  { postalCode: '50540', city: 'Isigny-le-Buat', distance: 7, deliveryFee: 8, deliveryTime: '4-6h', zone: 'local' },
  { postalCode: '50640', city: 'Villedieu-les-Poêles', distance: 9, deliveryFee: 8, deliveryTime: '4-6h', zone: 'local' },
  { postalCode: '50450', city: 'Gavray-sur-Sienne', distance: 10, deliveryFee: 8, deliveryTime: '4-6h', zone: 'local' },

  // Zone 10+ km local (Manche/Normandie) - 18€
  { postalCode: '50530', city: 'Sartilly-Baie-Bocage', distance: 12, deliveryFee: 18, deliveryTime: '4-8h', zone: 'regional' },
  { postalCode: '50300', city: 'Avranches', distance: 25, deliveryFee: 10, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '50170', city: 'Pontorson', distance: 30, deliveryFee: 10, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '50220', city: 'Ducey-Les Chéris', distance: 20, deliveryFee: 10, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '50600', city: 'Saint-Hilaire-du-Harcouët', distance: 35, deliveryFee: 10, deliveryTime: '6-8h', zone: 'regional' },
  
  // Manche department - main cities
  { postalCode: '50100', city: 'Cherbourg-en-Cotentin', distance: 85, deliveryFee: 18, deliveryTime: '24h', zone: 'regional' },
  { postalCode: '50000', city: 'Saint-Lô', distance: 45, deliveryFee: 18, deliveryTime: '24h', zone: 'regional' },
  { postalCode: '50200', city: 'Coutances', distance: 35, deliveryFee: 10, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '50700', city: 'Valognes', distance: 70, deliveryFee: 18, deliveryTime: '24h', zone: 'regional' },
  { postalCode: '50500', city: 'Carentan-les-Marais', distance: 60, deliveryFee: 18, deliveryTime: '24h', zone: 'regional' },

  // North Brittany - nearby cities
  { postalCode: '35120', city: 'Dol-de-Bretagne', distance: 40, deliveryFee: 10, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '35260', city: 'Cancale', distance: 45, deliveryFee: 10, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '35400', city: 'Saint-Malo', distance: 50, deliveryFee: 18, deliveryTime: '24h', zone: 'regional' },
  { postalCode: '22100', city: 'Dinan', distance: 65, deliveryFee: 18, deliveryTime: '24h', zone: 'regional' },

  // Additional South Manche cities
  { postalCode: '50320', city: 'La Haye-Pesnel', distance: 15, deliveryFee: 10, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '50510', city: 'Cerences', distance: 12, deliveryFee: 18, deliveryTime: '4-8h', zone: 'regional' },
  { postalCode: '50870', city: 'Tirepied-sur-Sée', distance: 18, deliveryFee: 10, deliveryTime: '6-8h', zone: 'regional' },
  { postalCode: '50720', city: 'Barenton', distance: 45, deliveryFee: 18, deliveryTime: '24h', zone: 'regional' },

  // Additional Normandy cities
  { postalCode: '14000', city: 'Caen', distance: 120, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '14800', city: 'Deauville', distance: 150, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '14360', city: 'Trouville-sur-Mer', distance: 150, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '14117', city: 'Arromanches-les-Bains', distance: 140, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '14520', city: 'Port-en-Bessin-Huppain', distance: 135, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '76000', city: 'Rouen', distance: 200, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '76200', city: 'Dieppe', distance: 230, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '76600', city: 'Le Havre', distance: 180, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '76210', city: 'Bolbec', distance: 170, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '27000', city: 'Évreux', distance: 180, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '61000', city: 'Alençon', distance: 140, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },

  // Major French cities - National delivery
  { postalCode: '75001', city: 'Paris', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75002', city: 'Paris 2e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75003', city: 'Paris 3e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75004', city: 'Paris 4e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75005', city: 'Paris 5e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75006', city: 'Paris 6e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75007', city: 'Paris 7e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75008', city: 'Paris 8e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75009', city: 'Paris 9e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75010', city: 'Paris 10e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75011', city: 'Paris 11e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75012', city: 'Paris 12e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75013', city: 'Paris 13e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75014', city: 'Paris 14e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75015', city: 'Paris 15e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75016', city: 'Paris 16e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75017', city: 'Paris 17e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75018', city: 'Paris 18e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75019', city: 'Paris 19e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '75020', city: 'Paris 20e', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  
  { postalCode: '69001', city: 'Lyon', distance: 650, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '13001', city: 'Marseille', distance: 850, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '06000', city: 'Nice', distance: 950, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '31000', city: 'Toulouse', distance: 650, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '33000', city: 'Bordeaux', distance: 550, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '44000', city: 'Nantes', distance: 250, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '67000', city: 'Strasbourg', distance: 700, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '59000', city: 'Lille', distance: 500, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '34000', city: 'Montpellier', distance: 750, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '35000', city: 'Rennes', distance: 200, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  
  // Additional major cities
  { postalCode: '51100', city: 'Reims', distance: 450, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '21000', city: 'Dijon', distance: 550, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '37000', city: 'Tours', distance: 300, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '45000', city: 'Orléans', distance: 280, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '49000', city: 'Angers', distance: 200, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '72000', city: 'Le Mans', distance: 180, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '86000', city: 'Poitiers', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '87000', city: 'Limoges', distance: 450, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '63000', city: 'Clermont-Ferrand', distance: 550, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '38000', city: 'Grenoble', distance: 700, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '73000', city: 'Chambéry', distance: 650, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '74000', city: 'Annecy', distance: 650, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '25000', city: 'Besançon', distance: 600, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '68000', city: 'Mulhouse', distance: 700, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '57000', city: 'Metz', distance: 600, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '54000', city: 'Nancy', distance: 550, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '08000', city: 'Charleville-Mézières', distance: 500, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '80000', city: 'Amiens', distance: 400, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '60000', city: 'Beauvais', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '02000', city: 'Laon', distance: 450, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '62000', city: 'Arras', distance: 450, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '59200', city: 'Tourcoing', distance: 500, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '59300', city: 'Valenciennes', distance: 500, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '59140', city: 'Dunkerque', distance: 520, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  
  // Brittany cities
  { postalCode: '29000', city: 'Quimper', distance: 300, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '29200', city: 'Brest', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '56000', city: 'Vannes', distance: 200, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '56100', city: 'Lorient', distance: 250, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '22000', city: 'Saint-Brieuc', distance: 150, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  
  // Atlantic coast
  { postalCode: '17000', city: 'La Rochelle', distance: 400, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '85000', city: 'La Roche-sur-Yon', distance: 300, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '79000', city: 'Niort', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '16000', city: 'Angoulême', distance: 450, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '24000', city: 'Périgueux', distance: 500, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '47000', city: 'Agen', distance: 600, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '40000', city: 'Mont-de-Marsan', distance: 550, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '64000', city: 'Pau', distance: 650, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '64100', city: 'Bayonne', distance: 700, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '64200', city: 'Biarritz', distance: 720, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  
  // South France
  { postalCode: '65000', city: 'Tarbes', distance: 700, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '09000', city: 'Foix', distance: 750, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '11000', city: 'Carcassonne', distance: 750, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '66000', city: 'Perpignan', distance: 900, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '30000', city: 'Nîmes', distance: 800, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '48000', city: 'Mende', distance: 700, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '12000', city: 'Rodez', distance: 650, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '81000', city: 'Albi', distance: 600, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '82000', city: 'Montauban', distance: 650, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '32000', city: 'Auch', distance: 650, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  
  // Mediterranean coast
  { postalCode: '13100', city: 'Aix-en-Provence', distance: 850, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '83000', city: 'Toulon', distance: 900, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '06400', city: 'Cannes', distance: 950, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '06300', city: 'Nice', distance: 950, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '06500', city: 'Menton', distance: 980, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '20000', city: 'Ajaccio', distance: 1200, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '20200', city: 'Bastia', distance: 1250, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '84000', city: 'Avignon', distance: 800, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '04000', city: 'Digne-les-Bains', distance: 850, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '05000', city: 'Gap', distance: 750, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  
  // Central France
  { postalCode: '03000', city: 'Moulins', distance: 500, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '58000', city: 'Nevers', distance: 450, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '89000', city: 'Auxerre', distance: 400, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '71000', city: 'Mâcon', distance: 600, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '70000', city: 'Vesoul', distance: 550, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '52000', city: 'Chaumont', distance: 500, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '10000', city: 'Troyes', distance: 400, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '18000', city: 'Bourges', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '36000', city: 'Châteauroux', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '23000', city: 'Guéret', distance: 400, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '19000', city: 'Tulle', distance: 450, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '15000', city: 'Aurillac', distance: 500, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '43000', city: 'Le Puy-en-Velay', distance: 550, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '07000', city: 'Privas', distance: 650, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '26000', city: 'Valence', distance: 650, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '42000', city: 'Saint-Étienne', distance: 650, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '01000', city: 'Bourg-en-Bresse', distance: 600, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '39000', city: 'Lons-le-Saunier', distance: 600, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  
  // East France
  { postalCode: '88000', city: 'Épinal', distance: 550, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '90000', city: 'Belfort', distance: 650, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  
  // Additional Île-de-France
  { postalCode: '77000', city: 'Melun', distance: 380, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '78000', city: 'Versailles', distance: 370, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '91000', city: 'Évry-Courcouronnes', distance: 360, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '92000', city: 'Nanterre', distance: 350, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '93000', city: 'Bobigny', distance: 360, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '94000', city: 'Créteil', distance: 360, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
  { postalCode: '95000', city: 'Cergy', distance: 370, deliveryFee: 17.90, deliveryTime: 'J+2', zone: 'national' },
];

// National delivery for postal codes not in the list
export const NATIONAL_DELIVERY = {
  deliveryFee: 17.90,
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