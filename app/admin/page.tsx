'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

// ─── TYPES ───────────────────────────────────────────────

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sizes: { name: string; price: number }[];
  active: boolean;
  inStock: boolean;
  salesCount: number;
  createdAt: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered';
  carrier: 'locale' | 'colissimo' | 'chronopost';
  trackingNumber: string;
  address: string;
  city: string;
  zipCode: string;
  deliveryMode: string;
  createdAt: string;
}

interface WeddingRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  budget: string;
  budgetNum: number;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'confirmed' | 'archived';
  createdAt: string;
}

interface Subscription {
  id: string;
  customerName: string;
  customerEmail: string;
  formula: 'essentiel' | 'signature' | 'prestige';
  status: 'active' | 'paused' | 'cancelled';
  frequency: 'weekly' | 'biweekly' | 'monthly';
  price: number;
  nextDelivery: string;
  startDate: string;
}

interface ClientData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city?: string;
  isAdmin?: boolean;
  createdAt: string;
  favorites?: string[];
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  confirmed: { label: 'Confirmée', color: 'bg-blue-100 text-blue-800' },
  preparing: { label: 'En préparation', color: 'bg-purple-100 text-purple-800' },
  shipped: { label: 'Expédiée', color: 'bg-indigo-100 text-indigo-800' },
  delivered: { label: 'Livrée', color: 'bg-green-100 text-green-800' },
  new: { label: 'Nouveau', color: 'bg-red-100 text-red-800' },
  contacted: { label: 'Contacté', color: 'bg-yellow-100 text-yellow-800' },
  quoted: { label: 'Devis envoyé', color: 'bg-blue-100 text-blue-800' },
  archived: { label: 'Archivé', color: 'bg-gray-100 text-gray-600' },
};

const carrierLabels: Record<string, { label: string; color: string }> = {
  locale: { label: '🚲 Locale', color: 'bg-emerald-100 text-emerald-800' },
  colissimo: { label: '📮 Colissimo', color: 'bg-sky-100 text-sky-800' },
  chronopost: { label: '⚡ Chronopost', color: 'bg-orange-100 text-orange-800' },
};

const formulaLabels: Record<string, { label: string; price: number; color: string }> = {
  essentiel: { label: '🌿 Essentiel', price: 29.90, color: 'bg-green-100 text-green-800' },
  signature: { label: '🌸 Signature', price: 44.90, color: 'bg-pink-100 text-pink-800' },
  prestige: { label: '👑 Prestige', price: 69.90, color: 'bg-amber-100 text-amber-800' },
};

const frequencyLabels: Record<string, string> = {
  weekly: 'Hebdomadaire',
  biweekly: 'Bi-mensuel',
  monthly: 'Mensuel',
};

const subStatusLabels: Record<string, { label: string; color: string }> = {
  active: { label: 'Actif', color: 'bg-green-100 text-green-800' },
  paused: { label: 'En pause', color: 'bg-yellow-100 text-yellow-800' },
  cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-800' },
};

const deliveryStatusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  picked: { label: 'Ramassée', color: 'bg-blue-100 text-blue-800' },
  transit: { label: 'En transit', color: 'bg-purple-100 text-purple-800' },
  delivered: { label: 'Livrée', color: 'bg-green-100 text-green-800' },
};

const orderStatusFlow: Order['status'][] = ['pending', 'confirmed', 'preparing', 'shipped', 'delivered'];

type Tab = 'dashboard' | 'products' | 'orders' | 'clients' | 'weddings' | 'subscriptions' | 'deliveries' | 'stats';

// ─── SEED DATA ───────────────────────────────────────────

function seedOrders(): Order[] {
  return [
    { id: 'o1', orderNumber: 'AF-2026-001', customerName: 'Marie Dupont', customerEmail: 'marie.dupont@email.fr', customerPhone: '06 12 34 56 78', items: [{ name: 'Bouquet Rose Éternelle', qty: 1, price: 45.00 }, { name: 'Vase en verre', qty: 1, price: 19.90 }], total: 64.90, status: 'delivered', carrier: 'colissimo', trackingNumber: '6A12345678901', address: '12 rue des Lilas', city: 'Rouen', zipCode: '76000', deliveryMode: 'Domicile', createdAt: '2026-02-01T10:30:00Z' },
    { id: 'o2', orderNumber: 'AF-2026-002', customerName: 'Jean-Pierre Martin', customerEmail: 'jpmartin@gmail.com', customerPhone: '06 98 76 54 32', items: [{ name: 'Composition Printanière', qty: 1, price: 55.00 }], total: 55.00, status: 'shipped', carrier: 'chronopost', trackingNumber: 'XY987654321FR', address: '45 avenue Victor Hugo', city: 'Le Havre', zipCode: '76600', deliveryMode: 'Domicile', createdAt: '2026-02-03T14:20:00Z' },
    { id: 'o3', orderNumber: 'AF-2026-003', customerName: 'Sophie Leroy', customerEmail: 'sophie.leroy@outlook.fr', customerPhone: '06 11 22 33 44', items: [{ name: 'Orchidée Blanche', qty: 2, price: 35.00 }], total: 70.00, status: 'preparing', carrier: 'locale', trackingNumber: '', address: '8 place du Vieux-Marché', city: 'Rouen', zipCode: '76000', deliveryMode: 'Retrait boutique', createdAt: '2026-02-05T09:15:00Z' },
    { id: 'o4', orderNumber: 'AF-2026-004', customerName: 'Philippe Moreau', customerEmail: 'p.moreau@free.fr', customerPhone: '06 55 44 33 22', items: [{ name: 'Bouquet Champêtre', qty: 1, price: 39.90 }, { name: 'Carte personnalisée', qty: 1, price: 4.90 }], total: 44.80, status: 'confirmed', carrier: 'colissimo', trackingNumber: '', address: '23 rue Jeanne d\'Arc', city: 'Rouen', zipCode: '76000', deliveryMode: 'Domicile', createdAt: '2026-02-07T16:45:00Z' },
    { id: 'o5', orderNumber: 'AF-2026-005', customerName: 'Isabelle Petit', customerEmail: 'isabelle.petit@yahoo.fr', customerPhone: '06 77 88 99 00', items: [{ name: 'Couronne de Deuil', qty: 1, price: 89.00 }], total: 89.00, status: 'pending', carrier: 'chronopost', trackingNumber: '', address: '67 boulevard Gambetta', city: 'Dieppe', zipCode: '76200', deliveryMode: 'Domicile', createdAt: '2026-02-10T08:00:00Z' },
    { id: 'o6', orderNumber: 'AF-2026-006', customerName: 'Camille Bernard', customerEmail: 'camille.b@gmail.com', customerPhone: '06 33 22 11 00', items: [{ name: 'Plante Monstera', qty: 1, price: 42.00 }, { name: 'Cache-pot céramique', qty: 1, price: 24.90 }], total: 66.90, status: 'pending', carrier: 'locale', trackingNumber: '', address: '5 rue Eau-de-Robec', city: 'Rouen', zipCode: '76000', deliveryMode: 'Livraison locale', createdAt: '2026-02-12T11:30:00Z' },
    { id: 'o7', orderNumber: 'AF-2026-007', customerName: 'Laurent Dubois', customerEmail: 'l.dubois@hotmail.fr', customerPhone: '06 44 55 66 77', items: [{ name: 'Bouquet Saint-Valentin', qty: 1, price: 59.90 }], total: 59.90, status: 'delivered', carrier: 'locale', trackingNumber: '', address: '14 rue de la République', city: 'Rouen', zipCode: '76000', deliveryMode: 'Livraison locale', createdAt: '2026-02-13T07:45:00Z' },
    { id: 'o8', orderNumber: 'AF-2026-008', customerName: 'Nathalie Rousseau', customerEmail: 'n.rousseau@email.fr', customerPhone: '06 88 77 66 55', items: [{ name: 'Bouquet Pastel', qty: 1, price: 49.90 }, { name: 'Chocolats artisanaux', qty: 1, price: 15.00 }], total: 64.90, status: 'pending', carrier: 'colissimo', trackingNumber: '', address: '31 rue du Gros-Horloge', city: 'Rouen', zipCode: '76000', deliveryMode: 'Domicile', createdAt: '2026-02-14T18:20:00Z' },
    { id: 'o9', orderNumber: 'AF-2026-009', customerName: 'Thomas Garcia', customerEmail: 'thomas.g@gmail.com', customerPhone: '06 22 33 44 55', items: [{ name: 'Succulent Box', qty: 3, price: 18.00 }], total: 54.00, status: 'confirmed', carrier: 'chronopost', trackingNumber: '', address: '9 avenue de Bretagne', city: 'Rouen', zipCode: '76100', deliveryMode: 'Domicile', createdAt: '2026-02-15T09:00:00Z' },
    { id: 'o10', orderNumber: 'AF-2026-010', customerName: 'Claire Fontaine', customerEmail: 'claire.f@laposte.net', customerPhone: '06 99 88 77 66', items: [{ name: 'Bouquet Rose Éternelle', qty: 1, price: 45.00 }], total: 45.00, status: 'preparing', carrier: 'locale', trackingNumber: '', address: '2 rue Beauvoisine', city: 'Rouen', zipCode: '76000', deliveryMode: 'Retrait boutique', createdAt: '2026-02-15T12:15:00Z' },
  ];
}

function seedWeddings(): WeddingRequest[] {
  return [
    { id: 'w1', name: 'Émilie & Julien Marchand', email: 'emilie.julien@gmail.com', phone: '06 12 34 56 78', date: '2026-06-20', budget: '2 500 €', budgetNum: 2500, message: 'Nous cherchons des compositions florales pour notre mariage champêtre en extérieur. Couleurs: blanc, rose pâle et vert. Environ 80 invités. Centre de table + bouquet de mariée + arche fleurie.', status: 'quoted', createdAt: '2026-01-15T10:00:00Z' },
    { id: 'w2', name: 'Charlotte & Nicolas Lefèvre', email: 'charlotte.n@outlook.fr', phone: '06 98 76 54 32', date: '2026-09-12', budget: '4 000 €', budgetNum: 4000, message: 'Mariage au Château de Bizy. Style romantique et élégant. Nous souhaitons des pivoines et roses de jardin. Décoration église + réception. 120 invités.', status: 'new', createdAt: '2026-02-08T14:30:00Z' },
    { id: 'w3', name: 'Amélie & Romain Duval', email: 'amelie.romain@free.fr', phone: '06 55 44 33 22', date: '2026-05-30', budget: '1 800 €', budgetNum: 1800, message: 'Mariage intime à la mairie + restaurant. 30 invités. Bouquet de mariée, boutonnières, et petits centres de table. Style bohème.', status: 'confirmed', createdAt: '2026-01-20T09:00:00Z' },
    { id: 'w4', name: 'Laura & Maxime Perrin', email: 'laura.max@gmail.com', phone: '06 11 22 33 44', date: '2026-08-08', budget: '3 200 €', budgetNum: 3200, message: 'Thème "jardin anglais". Beaucoup de verdure avec des touches de violet et blanc. Lieu: Manoir des Impressionnistes. 90 invités.', status: 'contacted', createdAt: '2026-02-12T16:00:00Z' },
  ];
}

function seedSubscriptions(): Subscription[] {
  return [
    { id: 's1', customerName: 'Marie Dupont', customerEmail: 'marie.dupont@email.fr', formula: 'signature', status: 'active', frequency: 'biweekly', price: 44.90, nextDelivery: '2026-02-21', startDate: '2025-11-01' },
    { id: 's2', customerName: 'Sophie Leroy', customerEmail: 'sophie.leroy@outlook.fr', formula: 'prestige', status: 'active', frequency: 'monthly', price: 69.90, nextDelivery: '2026-03-01', startDate: '2025-09-15' },
    { id: 's3', customerName: 'Camille Bernard', customerEmail: 'camille.b@gmail.com', formula: 'essentiel', status: 'active', frequency: 'weekly', price: 29.90, nextDelivery: '2026-02-17', startDate: '2026-01-06' },
    { id: 's4', customerName: 'Nathalie Rousseau', customerEmail: 'n.rousseau@email.fr', formula: 'signature', status: 'paused', frequency: 'monthly', price: 44.90, nextDelivery: '2026-03-15', startDate: '2025-12-01' },
    { id: 's5', customerName: 'Claire Fontaine', customerEmail: 'claire.f@laposte.net', formula: 'essentiel', status: 'active', frequency: 'biweekly', price: 29.90, nextDelivery: '2026-02-24', startDate: '2026-01-13' },
    { id: 's6', customerName: 'Laurent Dubois', customerEmail: 'l.dubois@hotmail.fr', formula: 'prestige', status: 'cancelled', frequency: 'monthly', price: 69.90, nextDelivery: '', startDate: '2025-06-01' },
  ];
}

function seedProducts(): Product[] {
  return [
    {
      id: 'p1',
      name: 'Bouquet Rose Éternelle',
      slug: 'bouquet-rose-eternelle',
      price: 45.00,
      category: 'bouquets',
      image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Un magnifique bouquet de roses roses délicatement arrangées, parfait pour exprimer vos sentiments les plus tendres.',
      sizes: [
        { name: 'Moyen', price: 45.00 },
        { name: 'Grand', price: 55.00 },
        { name: 'Très grand', price: 65.00 },
      ],
      active: true,
      inStock: true,
      salesCount: 12,
      createdAt: '2025-12-01T00:00:00Z',
    },
    {
      id: 'p2',
      name: 'Composition Printanière',
      slug: 'composition-printaniere',
      price: 55.00,
      category: 'compositions',
      image: 'https://images.pexels.com/photos/1070863/pexels-photo-1070863.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Une composition florale fraîche et colorée évoquant le renouveau du printemps.',
      sizes: [
        { name: 'Moyen', price: 55.00 },
        { name: 'Grand', price: 65.00 },
        { name: 'Très grand', price: 75.00 },
      ],
      active: true,
      inStock: true,
      salesCount: 8,
      createdAt: '2025-12-15T00:00:00Z',
    },
    {
      id: 'p3',
      name: 'Orchidée Blanche',
      slug: 'orchidee-blanche',
      price: 35.00,
      category: 'plantes',
      image: 'https://images.pexels.com/photos/1310778/pexels-photo-1310778.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Une élégante orchidée blanche, symbole de raffinement et de pureté.',
      sizes: [
        { name: 'Moyen', price: 35.00 },
        { name: 'Grand', price: 45.00 },
        { name: 'Très grand', price: 55.00 },
      ],
      active: true,
      inStock: true,
      salesCount: 15,
      createdAt: '2026-01-05T00:00:00Z',
    },
    {
      id: 'p4',
      name: 'Bouquet Champêtre',
      slug: 'bouquet-champetre',
      price: 39.90,
      category: 'bouquets',
      image: 'https://images.pexels.com/photos/1144179/pexels-photo-1144179.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Un bouquet aux allures champêtres mêlant fleurs des champs et graminées.',
      sizes: [
        { name: 'Moyen', price: 39.90 },
        { name: 'Grand', price: 49.90 },
        { name: 'Très grand', price: 59.90 },
      ],
      active: true,
      inStock: true,
      salesCount: 6,
      createdAt: '2026-01-10T00:00:00Z',
    },
    {
      id: 'p5',
      name: 'Couronne de Deuil',
      slug: 'couronne-de-deuil',
      price: 89.00,
      category: 'deuil',
      image: 'https://images.pexels.com/photos/8386415/pexels-photo-8386415.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Une couronne respectueuse et élégante pour honorer la mémoire de vos proches.',
      sizes: [
        { name: 'Moyen', price: 89.00 },
        { name: 'Grand', price: 109.00 },
        { name: 'Très grand', price: 129.00 },
      ],
      active: true,
      inStock: true,
      salesCount: 3,
      createdAt: '2026-01-12T00:00:00Z',
    },
    {
      id: 'p6',
      name: 'Monstera Deliciosa',
      slug: 'monstera-deliciosa',
      price: 42.00,
      category: 'plantes',
      image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Une magnifique plante tropicale aux feuilles découpées, parfaite pour décorer votre intérieur.',
      sizes: [
        { name: 'Moyen', price: 42.00 },
        { name: 'Grand', price: 52.00 },
        { name: 'Très grand', price: 62.00 },
      ],
      active: true,
      inStock: true,
      salesCount: 9,
      createdAt: '2026-01-15T00:00:00Z',
    },
    {
      id: 'p7',
      name: 'Cache-pot Céramique',
      slug: 'cache-pot-ceramique',
      price: 24.90,
      category: 'accessoires',
      image: 'https://images.pexels.com/photos/6208184/pexels-photo-6208184.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Un élégant cache-pot en céramique artisanale, idéal pour sublimer vos plantes.',
      sizes: [
        { name: 'Moyen', price: 24.90 },
        { name: 'Grand', price: 34.90 },
        { name: 'Très grand', price: 44.90 },
      ],
      active: true,
      inStock: true,
      salesCount: 11,
      createdAt: '2026-02-01T00:00:00Z',
    },
    {
      id: 'p8',
      name: 'Bouquet Saint-Valentin',
      slug: 'bouquet-saint-valentin',
      price: 59.90,
      category: 'bouquets',
      image: 'https://images.pexels.com/photos/1324896/pexels-photo-1324896.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Un bouquet romantique aux tons rouge et rose, parfait pour la Saint-Valentin.',
      sizes: [
        { name: 'Moyen', price: 59.90 },
        { name: 'Grand', price: 69.90 },
        { name: 'Très grand', price: 79.90 },
      ],
      active: true,
      inStock: true,
      salesCount: 7,
      createdAt: '2026-02-05T00:00:00Z',
    },
  ];
}

// ─── COMPONENT ───────────────────────────────────────────

export default function Admin() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [weddings, setWeddings] = useState<WeddingRequest[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Filters
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [productSearch, setProductSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderCarrierFilter, setOrderCarrierFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [clientSearch, setClientSearch] = useState('');
  const [deliveryFilter, setDeliveryFilter] = useState<'today' | 'week' | 'month'>('week');
  const [deliveryCarrierFilter, setDeliveryCarrierFilter] = useState('all');
  const [statsDateFilter, setStatsDateFilter] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [statsSortBy, setStatsSortBy] = useState<'date' | 'amount' | 'customer'>('date');
  const [statsSortOrder, setStatsSortOrder] = useState<'asc' | 'desc'>('desc');

  // Product form
  const [pName, setPName] = useState('');
  const [pPrice, setPPrice] = useState('');
  const [pCategory, setPCategory] = useState('bouquets');
  const [pImage, setPImage] = useState('');
  const [pDescription, setPDescription] = useState('');
  const [pActive, setPActive] = useState(true);
  const [pInStock, setPInStock] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push('/compte/connexion');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('af-admin-products');
    if (!storedProducts || JSON.parse(storedProducts).length === 0) {
      const seeded = seedProducts();
      localStorage.setItem('af-admin-products', JSON.stringify(seeded));
      setProducts(seeded);
    } else {
      setProducts(JSON.parse(storedProducts));
    }

    const storedOrders = localStorage.getItem('af-admin-orders');
    if (!storedOrders || JSON.parse(storedOrders).length === 0) {
      const seeded = seedOrders();
      localStorage.setItem('af-admin-orders', JSON.stringify(seeded));
      setOrders(seeded);
    } else {
      setOrders(JSON.parse(storedOrders));
    }

    const storedWeddings = localStorage.getItem('af-admin-weddings');
    if (!storedWeddings || JSON.parse(storedWeddings).length === 0) {
      const seeded = seedWeddings();
      localStorage.setItem('af-admin-weddings', JSON.stringify(seeded));
      setWeddings(seeded);
    } else {
      setWeddings(JSON.parse(storedWeddings));
    }

    const storedSubs = localStorage.getItem('af-admin-subscriptions');
    if (!storedSubs || JSON.parse(storedSubs).length === 0) {
      const seeded = seedSubscriptions();
      localStorage.setItem('af-admin-subscriptions', JSON.stringify(seeded));
      setSubscriptions(seeded);
    } else {
      setSubscriptions(JSON.parse(storedSubs));
    }
  }, []);

  const saveProducts = (p: Product[]) => { setProducts(p); localStorage.setItem('af-admin-products', JSON.stringify(p)); };
  const saveOrders = (o: Order[]) => { setOrders(o); localStorage.setItem('af-admin-orders', JSON.stringify(o)); };
  const saveWeddings = (w: WeddingRequest[]) => { setWeddings(w); localStorage.setItem('af-admin-weddings', JSON.stringify(w)); };
  const saveSubscriptions = (s: Subscription[]) => { setSubscriptions(s); localStorage.setItem('af-admin-subscriptions', JSON.stringify(s)); };

  const clients: ClientData[] = useMemo(() => {
    if (typeof window === 'undefined') return [];
    const users = JSON.parse(localStorage.getItem('af-users') || '[]');
    const nonAdmin = users.filter((u: ClientData) => !u.isAdmin);
    if (nonAdmin.length === 0) {
      const seedClients: ClientData[] = [
        { id: 'c1', firstName: 'Marie', lastName: 'Dupont', email: 'marie.dupont@email.fr', phone: '06 12 34 56 78', city: 'Rouen', createdAt: '2025-11-15T10:00:00Z', favorites: ['bouquet-rose-eternelle'] },
        { id: 'c2', firstName: 'Sophie', lastName: 'Leroy', email: 'sophie.leroy@outlook.fr', phone: '06 11 22 33 44', city: 'Rouen', createdAt: '2025-12-03T14:30:00Z', favorites: ['orchidee-blanche', 'composition-printaniere'] },
        { id: 'c3', firstName: 'Jean-Pierre', lastName: 'Martin', email: 'jpmartin@gmail.com', phone: '06 98 76 54 32', city: 'Le Havre', createdAt: '2026-01-10T09:00:00Z', favorites: [] },
        { id: 'c4', firstName: 'Camille', lastName: 'Bernard', email: 'camille.b@gmail.com', phone: '06 33 22 11 00', city: 'Rouen', createdAt: '2026-01-22T11:30:00Z', favorites: ['plante-monstera'] },
        { id: 'c5', firstName: 'Philippe', lastName: 'Moreau', email: 'p.moreau@free.fr', phone: '06 55 44 33 22', city: 'Rouen', createdAt: '2026-02-01T16:45:00Z', favorites: [] },
        { id: 'c6', firstName: 'Nathalie', lastName: 'Rousseau', email: 'n.rousseau@email.fr', phone: '06 88 77 66 55', city: 'Rouen', createdAt: '2026-02-05T08:20:00Z', favorites: ['bouquet-pastel'] },
        { id: 'c7', firstName: 'Laurent', lastName: 'Dubois', email: 'l.dubois@hotmail.fr', phone: '06 44 55 66 77', city: 'Rouen', createdAt: '2026-01-28T07:00:00Z', favorites: [] },
        { id: 'c8', firstName: 'Isabelle', lastName: 'Petit', email: 'isabelle.petit@yahoo.fr', phone: '06 77 88 99 00', city: 'Dieppe', createdAt: '2026-02-08T12:15:00Z', favorites: ['couronne-de-deuil'] },
      ];
      const updated = [...users, ...seedClients];
      localStorage.setItem('af-users', JSON.stringify(updated));
      return seedClients;
    }
    return nonAdmin;
  }, [activeTab]);

  const resetProductForm = () => {
    setPName(''); setPPrice(''); setPCategory('bouquets'); setPImage(''); setPDescription(''); setPActive(true); setPInStock(true);
    setEditingProduct(null); setShowProductForm(false);
  };

  const handleSaveProduct = () => {
    if (!pName || !pPrice) return;
    const slug = pName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    const product: Product = {
      id: editingProduct?.id || crypto.randomUUID(),
      name: pName,
      slug,
      price: parseFloat(pPrice),
      category: pCategory,
      image: pImage,
      description: pDescription,
      sizes: [
        { name: 'Moyen', price: parseFloat(pPrice) },
        { name: 'Grand', price: parseFloat(pPrice) + 10 },
        { name: 'Très grand', price: parseFloat(pPrice) + 20 },
      ],
      active: pActive,
      inStock: pInStock,
      salesCount: editingProduct?.salesCount || 0,
      createdAt: editingProduct?.createdAt || new Date().toISOString(),
    };
    if (editingProduct) {
      saveProducts(products.map(p => p.id === editingProduct.id ? product : p));
    } else {
      saveProducts([...products, product]);
    }
    resetProductForm();
  };

  const editProduct = (p: Product) => {
    setPName(p.name); setPPrice(p.price.toString()); setPCategory(p.category);
    setPImage(p.image); setPDescription(p.description); setPActive(p.active); setPInStock(p.inStock !== false);
    setEditingProduct(p); setShowProductForm(true);
  };

  const deleteProduct = (id: string) => {
    if (confirm('Supprimer ce produit ?')) saveProducts(products.filter(p => p.id !== id));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    saveOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const advanceOrderStatus = (id: string) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    const idx = orderStatusFlow.indexOf(order.status);
    if (idx < orderStatusFlow.length - 1) {
      updateOrderStatus(id, orderStatusFlow[idx + 1]);
    }
  };

  const updateTrackingNumber = (id: string, trackingNumber: string) => {
    saveOrders(orders.map(o => o.id === id ? { ...o, trackingNumber } : o));
  };

  const updateWeddingStatus = (id: string, status: WeddingRequest['status']) => {
    saveWeddings(weddings.map(w => w.id === id ? { ...w, status } : w));
  };

  const advanceWeddingStatus = (id: string, direction: 1 | -1) => {
    const flow: WeddingRequest['status'][] = ['new', 'contacted', 'quoted', 'confirmed', 'archived'];
    const w = weddings.find(x => x.id === id);
    if (!w) return;
    const idx = flow.indexOf(w.status);
    const next = idx + direction;
    if (next >= 0 && next < flow.length) {
      updateWeddingStatus(id, flow[next]);
    }
  };

  // Print order receipt
  const printOrderReceipt = (order: Order) => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) return;

    const receiptHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bon de commande ${order.orderNumber}</title>
          <style>
            @media print { body { margin: 0; } }
            * { box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; color: #2d2a26; background: white; padding: 30px; max-width: 800px; margin: 0 auto; }
            .header { border-bottom: 2px solid #b8935a; padding-bottom: 20px; margin-bottom: 30px; }
            .company { font-family: Georgia, "Times New Roman", serif; font-size: 24px; color: #b8935a; margin-bottom: 5px; }
            .order-number { font-size: 14px; color: #666; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #666; margin-bottom: 10px; border-bottom: 1px solid #e8e0d8; padding-bottom: 5px; }
            .customer-info { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .items-table th { background: #f5f0eb; padding: 10px; text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
            .items-table td { padding: 10px; border-bottom: 1px solid #e8e0d8; }
            .items-table .qty { text-align: center; width: 60px; }
            .items-table .price { text-align: right; width: 100px; }
            .total-section { border-top: 2px solid #b8935a; padding-top: 15px; text-align: right; }
            .total-amount { font-size: 20px; font-weight: bold; color: #b8935a; }
            .status-badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e8e0d8; font-size: 12px; color: #666; text-align: center; }
            @media print { .print-button { display: none; } }
            .print-button { background: #b8935a; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; margin-bottom: 20px; }
            .print-button:hover { background: #b8956a; }
          </style>
        </head>
        <body>
          <button class="print-button" onclick="window.print()">🖨 Imprimer</button>
          
          <div class="header">
            <div class="company">Anne Freret</div>
            <div style="color: #666; font-size: 14px;">Fleuriste Artisan • Rouen</div>
            <div class="order-number">Bon de commande • ${order.orderNumber}</div>
          </div>

          <div class="customer-info">
            <div class="section">
              <div class="section-title">Client</div>
              <div><strong>${order.customerName}</strong></div>
              <div>${order.customerEmail}</div>
              <div>${order.customerPhone}</div>
            </div>
            
            <div class="section">
              <div class="section-title">Adresse de livraison</div>
              <div>${order.address}</div>
              <div>${order.zipCode} ${order.city}</div>
              <div><strong>Mode:</strong> ${order.deliveryMode}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Détails de la commande</div>
            <div style="margin-bottom: 10px;">
              <strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} • 
              <strong>Statut:</strong> <span class="status-badge" style="background: #${order.status === 'delivered' ? 'dcfce7; color: #166534' : order.status === 'shipped' ? 'dbeafe; color: #1e40af' : order.status === 'preparing' ? 'e9d5ff; color: #7c2d12' : order.status === 'confirmed' ? 'dbeafe; color: #1e40af' : 'fef3c7; color: #92400e'};">${order.status === 'delivered' ? 'Livrée' : order.status === 'shipped' ? 'Expédiée' : order.status === 'preparing' ? 'En préparation' : order.status === 'confirmed' ? 'Confirmée' : 'En attente'}</span>
            </div>
            
            <table class="items-table">
              <thead>
                <tr>
                  <th>Article</th>
                  <th class="qty">Qté</th>
                  <th class="price">Prix unit.</th>
                  <th class="price">Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td class="qty">${item.qty}</td>
                    <td class="price">${item.price.toFixed(2)}€</td>
                    <td class="price">${(item.price * item.qty).toFixed(2)}€</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div class="total-section">
              <div class="total-amount">Total: ${order.total.toFixed(2)}€</div>
            </div>
          </div>

          ${order.trackingNumber ? `
            <div class="section">
              <div class="section-title">Suivi</div>
              <div><strong>Transporteur:</strong> ${order.carrier === 'locale' ? 'Livraison locale' : order.carrier === 'colissimo' ? 'La Poste Colissimo' : 'Chronopost'}</div>
              ${order.trackingNumber && order.carrier !== 'locale' ? `<div><strong>Numéro de suivi:</strong> ${order.trackingNumber}</div>` : ''}
            </div>
          ` : ''}

          <div class="footer">
            <div>Anne Freret • Fleuriste Artisan</div>
            <div>12 place du Vieux-Marché • 76000 Rouen</div>
            <div>06 12 34 56 78 • contact@annefreret.fr</div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    printWindow.focus();
  };

  if (isLoading || !user?.isAdmin) return null;

  const inputClass = "w-full px-3 py-2.5 bg-white border border-[#e8e0d8] text-[#2d2a26] text-[16px] sm:text-sm focus:outline-none focus:border-[#b8935a]";
  const labelClass = "block text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/50 mb-1.5";

  // ─── Computed data ───

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const avgBasket = orders.length > 0 ? totalRevenue / orders.length : 0;
  const uniqueClients = new Set(orders.map(o => o.customerEmail)).size;

  // Category sales for chart
  const categorySales = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach(o => o.items.forEach(i => {
      const cat = i.name.toLowerCase().includes('plante') || i.name.toLowerCase().includes('monstera') || i.name.toLowerCase().includes('succulent') ? 'Plantes'
        : i.name.toLowerCase().includes('deuil') || i.name.toLowerCase().includes('couronne') ? 'Deuil'
        : i.name.toLowerCase().includes('vase') || i.name.toLowerCase().includes('cache-pot') || i.name.toLowerCase().includes('carte') || i.name.toLowerCase().includes('chocolat') ? 'Accessoires'
        : 'Bouquets';
      map[cat] = (map[cat] || 0) + i.price * i.qty;
    }));
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [orders]);

  const maxCategorySale = Math.max(...categorySales.map(c => c[1]), 1);

  // Filtered products
  const filteredProducts = products.filter(p => {
    if (productCategoryFilter !== 'all' && p.category !== productCategoryFilter) return false;
    if (productSearch && !p.name.toLowerCase().includes(productSearch.toLowerCase())) return false;
    return true;
  });

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    if (orderCarrierFilter === 'locale' && o.carrier !== 'locale') return false;
    if (orderCarrierFilter === 'nationale' && o.carrier === 'locale') return false;
    if (orderCarrierFilter !== 'all' && orderCarrierFilter !== 'locale' && orderCarrierFilter !== 'nationale' && o.carrier !== orderCarrierFilter) return false;
    return true;
  });

  // Filtered clients
  const filteredClients = clients.filter(c => {
    if (!clientSearch) return true;
    const q = clientSearch.toLowerCase();
    return `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  // Wedding kanban columns
  const weddingColumns: { status: WeddingRequest['status']; label: string; color: string }[] = [
    { status: 'new', label: '🆕 Nouveau', color: 'border-red-300' },
    { status: 'contacted', label: '📞 Contacté', color: 'border-yellow-300' },
    { status: 'quoted', label: '📝 Devis', color: 'border-blue-300' },
    { status: 'confirmed', label: '✅ Confirmé', color: 'border-green-300' },
    { status: 'archived', label: '📁 Archivé', color: 'border-gray-300' },
  ];

  // Subscriptions MRR
  const mrr = subscriptions.filter(s => s.status === 'active').reduce((sum, s) => {
    if (s.frequency === 'weekly') return sum + s.price * 4;
    if (s.frequency === 'biweekly') return sum + s.price * 2;
    return sum + s.price;
  }, 0);

  // Deliveries
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const deliveries = orders.filter(o => o.status !== 'delivered').map(o => {
    const dStatus = o.status === 'pending' ? 'pending' : o.status === 'confirmed' ? 'pending' : o.status === 'preparing' ? 'picked' : o.status === 'shipped' ? 'transit' : 'delivered';
    return { ...o, deliveryStatus: dStatus as string };
  });

  const weekFromNow = new Date(now.getTime() + 7 * 86400000);
  const monthFromNow = new Date(now.getTime() + 30 * 86400000);
  const filteredDeliveries = deliveries.filter(d => {
    const date = new Date(d.createdAt);
    if (deliveryFilter === 'today') return date.toISOString().slice(0, 10) === todayStr;
    if (deliveryFilter === 'week') return date <= weekFromNow;
    return date <= monthFromNow;
  }).filter(d => deliveryCarrierFilter === 'all' || d.carrier === deliveryCarrierFilter);

  // Stats
  const topProducts = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach(o => o.items.forEach(i => { map[i.name] = (map[i.name] || 0) + i.qty; }));
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [orders]);

  const carrierStats = useMemo(() => {
    const map: Record<string, number> = { locale: 0, colissimo: 0, chronopost: 0 };
    orders.forEach(o => { map[o.carrier] = (map[o.carrier] || 0) + 1; });
    return map;
  }, [orders]);

  const dayStats = useMemo(() => {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const map = [0, 0, 0, 0, 0, 0, 0];
    orders.forEach(o => { map[new Date(o.createdAt).getDay()]++; });
    return days.map((d, i) => ({ day: d, count: map[i] }));
  }, [orders]);

  // Tabs config
  const tabs: { id: Tab; label: string; icon: string; count?: number; badge?: boolean }[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { id: 'products', label: 'Produits', icon: '🌸', count: products.length },
    { id: 'orders', label: 'Commandes', icon: '📦', count: pendingOrders.length, badge: pendingOrders.length > 0 },
    { id: 'clients', label: 'Clients', icon: '👥', count: clients.length },
    { id: 'weddings', label: 'Mariages', icon: '💍', count: weddings.filter(w => w.status === 'new').length },
    { id: 'subscriptions', label: 'Abonnements', icon: '🔄', count: subscriptions.filter(s => s.status === 'active').length },
    { id: 'deliveries', label: 'Livraisons', icon: '🚚', count: deliveries.length },
    { id: 'stats', label: 'Statistiques', icon: '📈' },
  ];

  // Client helpers
  const getClientOrders = (email: string) => orders.filter(o => o.customerEmail === email);
  const getClientTotal = (email: string) => getClientOrders(email).reduce((s, o) => s + o.total, 0);
  const getClientLastOrder = (email: string) => {
    const co = getClientOrders(email);
    return co.length > 0 ? co.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt : null;
  };

  // Avatar color from name
  const avatarColor = (name: string) => {
    const colors = ['bg-rose-400', 'bg-sky-400', 'bg-amber-400', 'bg-emerald-400', 'bg-violet-400', 'bg-pink-400', 'bg-teal-400', 'bg-orange-400'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitials = (name: string) => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  // Countdown
  const daysUntil = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - now.getTime();
    return Math.ceil(diff / 86400000);
  };

  // Tracking URL
  const trackingUrl = (carrier: string, num: string) => {
    if (carrier === 'colissimo') return `https://www.laposte.fr/outils/suivre-vos-envois?code=${num}`;
    if (carrier === 'chronopost') return `https://www.chronopost.fr/tracking-no-powerful/tracking-search/${num}`;
    return '';
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-gradient-to-b from-[#1a1714] to-[#2d2a26] text-white min-h-screen fixed left-0 top-0 z-50 hidden md:flex md:flex-col shadow-2xl">
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-[#b8935a]/10 to-transparent">
          <Link href="/" className="font-serif text-2xl text-white/95 tracking-wide">Anne Freret</Link>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#b8935a] mt-2 font-medium">Administration</p>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-[#b8935a] to-[#b8956a] text-white shadow-lg transform scale-105' 
                  : 'text-white/70 hover:text-white hover:bg-white/10 hover:transform hover:scale-102'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
              {tab.badge ? (
                <span className="ml-auto bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">{tab.count}</span>
              ) : tab.count !== undefined && tab.count > 0 ? (
                <span className="ml-auto bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">{tab.count}</span>
              ) : null}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-4 bg-gradient-to-r from-[#b8935a]/5 to-transparent">
          <Link href="/" target="_blank" className="flex items-center gap-2 text-xs text-white/50 hover:text-[#b8935a] transition-colors duration-200">
            🌐 Voir le site web
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#b8935a] to-[#b8956a] rounded-full flex items-center justify-center text-white text-sm font-serif shadow-md">AF</div>
            <div>
              <p className="text-sm text-white/90 font-medium">{user.firstName} {user.lastName}</p>
              <p className="text-[10px] text-[#b8935a] uppercase tracking-wider">Administrateur</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile nav - bottom tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#1a1714] to-[#2d2a26] z-50 border-t border-white/10 safe-area-pb shadow-2xl">
        <div className="flex justify-around px-1 py-3">
          {tabs.slice(0, 6).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg relative transition-all duration-200 ${
                activeTab === tab.id ? 'text-[#b8935a] transform scale-110' : 'text-white/50'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-[9px] font-medium">{tab.label.split(' ')[0]}</span>
              {tab.badge && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">{tab.count}</span>
              )}
            </button>
          ))}
          <button
            onClick={() => setActiveTab(activeTab === 'deliveries' ? 'stats' : 'deliveries')}
            className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 ${
              activeTab === 'deliveries' || activeTab === 'stats' ? 'text-[#b8935a] transform scale-110' : 'text-white/50'
            }`}
          >
            <span className="text-lg">{activeTab === 'stats' ? '📈' : '🚚'}</span>
            <span className="text-[9px] font-medium">Plus</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-10 pb-24 md:pb-10 bg-gradient-to-br from-[#faf8f5] to-[#f5f0eb] min-h-screen">

        {/* ═══════════ DASHBOARD ═══════════ */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-8">Tableau de bord</h1>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
              {[
                { label: 'Chiffre d\'affaires', value: `${totalRevenue.toFixed(0)}€`, icon: '💰', sub: '' },
                { label: 'Commandes', value: orders.length.toString(), icon: '📦', sub: `${pendingOrders.length} en attente` },
                { label: 'Clients', value: uniqueClients.toString(), icon: '👥', sub: '' },
                { label: 'Panier moyen', value: `${avgBasket.toFixed(1)}€`, icon: '🛒', sub: '' },
                { label: 'En attente', value: pendingOrders.length.toString(), icon: '⏳', sub: '', highlight: pendingOrders.length > 0 },
                { label: 'Conversion', value: '3.2%', icon: '📈', sub: 'estimé' },
              ].map(kpi => (
                <div key={kpi.label} className={`bg-white border p-5 ${kpi.highlight ? 'border-red-300 bg-red-50/30' : 'border-[#e8e0d8]'}`}>
                  <p className="text-xl mb-1">{kpi.icon}</p>
                  <p className="font-serif text-2xl text-[#2d2a26]">{kpi.value}</p>
                  <p className="text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/40 mt-1">{kpi.label}</p>
                  {kpi.sub && <p className="text-[10px] text-[#b8935a] mt-0.5">{kpi.sub}</p>}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales by category chart */}
              <div className="bg-white border border-[#e8e0d8] p-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Ventes par catégorie</h3>
                {categorySales.length === 0 ? (
                  <p className="text-sm text-[#2d2a26]/40">Aucune donnée</p>
                ) : (
                  <div className="space-y-3">
                    {categorySales.map(([cat, total]) => (
                      <div key={cat}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#2d2a26]">{cat}</span>
                          <span className="text-[#2d2a26]/60">{total.toFixed(0)}€</span>
                        </div>
                        <div className="h-3 bg-[#f5f0eb] rounded-full overflow-hidden">
                          <div className="h-full bg-[#b8935a] rounded-full transition-all" style={{ width: `${(total / maxCategorySale) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Last 5 orders */}
              <div className="bg-white border border-[#e8e0d8] p-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Dernières commandes</h3>
                {orders.length === 0 ? (
                  <p className="text-[#2d2a26]/40 text-sm">Aucune commande</p>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(-5).reverse().map(o => (
                      <div key={o.id} className="flex items-center justify-between text-sm gap-2">
                        <div className="min-w-0">
                          <p className="text-[#2d2a26] truncate">{o.customerName}</p>
                          <p className="text-[10px] text-[#2d2a26]/40">{o.orderNumber}</p>
                        </div>
                        <span className="text-[#2d2a26]/60 flex-shrink-0">{o.total.toFixed(2)}€</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded flex-shrink-0 ${statusLabels[o.status]?.color}`}>
                          {statusLabels[o.status]?.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Wedding requests */}
              <div className="bg-white border border-[#e8e0d8] p-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Demandes mariages</h3>
                {weddings.filter(w => w.status !== 'archived').length === 0 ? (
                  <p className="text-[#2d2a26]/40 text-sm">Aucune demande active</p>
                ) : (
                  <div className="space-y-3">
                    {weddings.filter(w => w.status !== 'archived').slice(0, 4).map(w => (
                      <div key={w.id} className="flex items-center justify-between text-sm">
                        <div>
                          <p className="text-[#2d2a26]">{w.name}</p>
                          <p className="text-[10px] text-[#b8935a]">📅 {w.date} · {w.budget}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded ${statusLabels[w.status]?.color}`}>
                          {statusLabels[w.status]?.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subscriptions summary */}
              <div className="bg-white border border-[#e8e0d8] p-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Abonnements</h3>
                <div className="flex items-end gap-2 mb-4">
                  <span className="font-serif text-3xl text-[#2d2a26]">{mrr.toFixed(0)}€</span>
                  <span className="text-[10px] text-[#2d2a26]/40 mb-1">MRR</span>
                </div>
                <div className="space-y-2 text-sm">
                  {Object.entries(formulaLabels).map(([key, f]) => {
                    const count = subscriptions.filter(s => s.formula === key && s.status === 'active').length;
                    return (
                      <div key={key} className="flex justify-between">
                        <span className="text-[#2d2a26]/60">{f.label}</span>
                        <span className="text-[#2d2a26]">{count} actif{count > 1 ? 's' : ''}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════ PRODUCTS ═══════════ */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-serif text-2xl text-[#2d2a26]">Produits</h1>
              <button
                onClick={() => { resetProductForm(); setShowProductForm(true); }}
                className="px-6 py-2.5 bg-[#b8935a] text-white text-sm hover:bg-[#b8956a] transition-colors"
              >
                + Nouveau produit
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex gap-1 bg-white border border-[#e8e0d8] p-1 rounded">
                {[
                  { v: 'all', l: 'Tous' },
                  { v: 'bouquets', l: 'Bouquets' },
                  { v: 'plantes', l: 'Plantes' },
                  { v: 'accessoires', l: 'Accessoires' },
                  { v: 'compositions', l: 'Compositions' },
                  { v: 'deuil', l: 'Deuil' },
                ].map(f => (
                  <button
                    key={f.v}
                    onClick={() => setProductCategoryFilter(f.v)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${productCategoryFilter === f.v ? 'bg-[#b8935a] text-white' : 'text-[#2d2a26]/60 hover:bg-[#f5f0eb]'}`}
                  >
                    {f.l}
                  </button>
                ))}
              </div>
              <input
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
                placeholder="🔍 Rechercher un produit..."
                className={`${inputClass} !w-64`}
              />
            </div>

            {showProductForm && (
              <div className="bg-white border border-[#e8e0d8] p-6 md:p-8 mb-8">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-6">
                  {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>Nom du produit *</label>
                    <input value={pName} onChange={e => setPName(e.target.value)} placeholder="Bouquet Rose Éternelle" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Prix de base (€) *</label>
                    <input type="number" step="0.01" value={pPrice} onChange={e => setPPrice(e.target.value)} placeholder="39.90" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Catégorie</label>
                    <select value={pCategory} onChange={e => setPCategory(e.target.value)} className={inputClass}>
                      <option value="bouquets">Bouquets</option>
                      <option value="compositions">Compositions</option>
                      <option value="plantes">Plantes</option>
                      <option value="accessoires">Accessoires</option>
                      <option value="deuil">Deuil</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>URL de l&apos;image</label>
                    <input value={pImage} onChange={e => setPImage(e.target.value)} placeholder="https://..." className={inputClass} />
                  </div>
                </div>
                <div className="mb-4">
                  <label className={labelClass}>Description</label>
                  <textarea value={pDescription} onChange={e => setPDescription(e.target.value)} rows={3} placeholder="Description du produit..." className={`${inputClass} resize-none`} />
                </div>
                <div className="flex flex-wrap gap-6 mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={pActive} onChange={e => setPActive(e.target.checked)} className="accent-[#b8935a]" />
                    <span className="text-sm text-[#2d2a26]/70">Produit actif</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={pInStock} onChange={e => setPInStock(e.target.checked)} className="accent-[#b8935a]" />
                    <span className="text-sm text-[#2d2a26]/70">En stock</span>
                  </label>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleSaveProduct} className="px-8 py-2.5 bg-[#b8935a] text-white text-sm hover:bg-[#b8956a]">
                    {editingProduct ? 'Enregistrer' : 'Créer le produit'}
                  </button>
                  <button onClick={resetProductForm} className="px-6 py-2.5 border border-[#e8e0d8] text-[#2d2a26]/60 text-sm hover:border-[#b8935a]">
                    Annuler
                  </button>
                </div>
                {pImage && (
                  <div className="mt-4">
                    <p className={labelClass}>Aperçu</p>
                    <img src={pImage} alt="Aperçu" className="w-40 h-40 object-cover border border-[#e8e0d8]" />
                  </div>
                )}
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#e8e0d8] p-12 text-center">
                <p className="text-4xl mb-4">🌸</p>
                <p className="text-[#2d2a26]/60 mb-2">{products.length === 0 ? 'Aucun produit ajouté' : 'Aucun résultat'}</p>
              </div>
            ) : (
              <div className="bg-white border border-[#e8e0d8]">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#e8e0d8] text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/40">
                  <div className="col-span-1">Image</div>
                  <div className="col-span-3">Nom</div>
                  <div className="col-span-1">Catégorie</div>
                  <div className="col-span-1">Prix</div>
                  <div className="col-span-1">Stock</div>
                  <div className="col-span-1">Statut</div>
                  <div className="col-span-1">Ventes</div>
                  <div className="col-span-3">Actions</div>
                </div>
                {filteredProducts.map(p => (
                  <div key={p.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b border-[#e8e0d8] last:border-0 items-center hover:bg-[#faf8f5] transition-colors">
                    <div className="col-span-1">
                      {p.image ? <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded" /> : <div className="w-16 h-16 bg-[#f5f0eb] flex items-center justify-center text-2xl rounded">🌸</div>}
                    </div>
                    <div className="col-span-3">
                      <span className="text-sm text-[#2d2a26]">{p.name}</span>
                      {(p.salesCount || 0) >= 5 && <span className="ml-2 text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">🔥 Populaire</span>}
                    </div>
                    <div className="col-span-1 text-xs text-[#2d2a26]/60 capitalize">{p.category}</div>
                    <div className="col-span-1 text-sm text-[#2d2a26]">{p.price.toFixed(2)}€</div>
                    <div className="col-span-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded ${p.inStock !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {p.inStock !== false ? 'En stock' : 'Rupture'}
                      </span>
                    </div>
                    <div className="col-span-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded ${p.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        {p.active ? 'Actif' : 'Masqué'}
                      </span>
                    </div>
                    <div className="col-span-1 text-xs text-[#2d2a26]/60">{p.salesCount || 0}</div>
                    <div className="col-span-3 flex gap-2 flex-wrap">
                      <button onClick={() => editProduct(p)} className="text-xs text-[#b8935a] hover:underline">Modifier</button>
                      <Link href={`/produit/${p.slug}`} target="_blank" className="text-xs text-sky-600 hover:underline">Voir sur le site</Link>
                      <button onClick={() => deleteProduct(p.id)} className="text-xs text-red-400 hover:underline">Supprimer</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════════ ORDERS ═══════════ */}
        {activeTab === 'orders' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-serif text-2xl text-[#2d2a26]">Commandes</h1>
              <div className="text-sm text-[#2d2a26]/60">
                {filteredOrders.length} sur {orders.length} commandes
              </div>
            </div>

            {/* Status filters */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex gap-1 bg-white border border-[#e8e0d8] p-1 rounded">
                {[
                  { v: 'all', l: 'Toutes', count: orders.length },
                  { v: 'pending', l: 'En attente', count: orders.filter(o => o.status === 'pending').length },
                  { v: 'confirmed', l: 'Confirmées', count: orders.filter(o => o.status === 'confirmed').length },
                  { v: 'preparing', l: 'En préparation', count: orders.filter(o => o.status === 'preparing').length },
                  { v: 'shipped', l: 'Expédiées', count: orders.filter(o => o.status === 'shipped').length },
                  { v: 'delivered', l: 'Livrées', count: orders.filter(o => o.status === 'delivered').length },
                ].map(f => (
                  <button
                    key={f.v}
                    onClick={() => setOrderStatusFilter(f.v)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${orderStatusFilter === f.v ? 'bg-[#b8935a] text-white' : 'text-[#2d2a26]/60 hover:bg-[#f5f0eb]'}`}
                  >
                    {f.l} ({f.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Carrier filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex gap-1 bg-white border border-[#e8e0d8] p-1 rounded">
                {[
                  { v: 'all', l: 'Tous transporteurs', count: orders.length },
                  { v: 'locale', l: '🚲 Livraison locale', count: orders.filter(o => o.carrier === 'locale').length },
                  { v: 'nationale', l: '📮 Partout en France', count: orders.filter(o => o.carrier !== 'locale').length },
                ].map(f => (
                  <button
                    key={f.v}
                    onClick={() => setOrderCarrierFilter(f.v)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${orderCarrierFilter === f.v ? 'bg-[#b8935a] text-white' : 'text-[#2d2a26]/60 hover:bg-[#f5f0eb]'}`}
                  >
                    {f.l} ({f.count})
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="bg-white border border-[#e8e0d8] p-12 text-center">
                <p className="text-4xl mb-4">📦</p>
                <p className="text-[#2d2a26]/60">Aucune commande</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(o => {
                  const isExpanded = expandedOrder === o.id;
                  const statusIdx = orderStatusFlow.indexOf(o.status);
                  const nextAction = statusIdx === 0 ? 'Confirmer' : statusIdx === 1 ? 'Préparer' : statusIdx === 2 ? 'Expédier' : statusIdx === 3 ? 'Marquer livrée' : null;

                  return (
                    <div key={o.id} className="bg-white border border-[#e8e0d8] hover:border-[#b8935a]/30 transition-colors">
                      {/* Header */}
                      <div
                        className="flex flex-wrap items-center justify-between gap-3 p-5 cursor-pointer"
                        onClick={() => setExpandedOrder(isExpanded ? null : o.id)}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <span className="text-xs text-[#2d2a26]/30">{isExpanded ? '▼' : '▶'}</span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm text-[#2d2a26] font-medium">{o.customerName}</p>
                              <span className="text-[10px] text-[#2d2a26]/30">{o.orderNumber}</span>
                            </div>
                            <p className="text-xs text-[#2d2a26]/40">{new Date(o.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
                            o.carrier === 'locale' 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                              : 'bg-sky-100 text-sky-800 border border-sky-200'
                          }`}>
                            {o.carrier === 'locale' ? '🚲 Locale' : '📮 France'}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded ${statusLabels[o.status]?.color}`}>
                            {statusLabels[o.status]?.label}
                          </span>
                          <span className="font-serif text-lg text-[#2d2a26]">{o.total.toFixed(2)}€</span>
                        </div>
                      </div>

                      {/* Status timeline */}
                      <div className="px-5 pb-3">
                        <div className="flex items-center gap-1">
                          {orderStatusFlow.map((s, i) => (
                            <div key={s} className="flex items-center flex-1">
                              <div className={`h-1.5 flex-1 rounded-full ${i <= statusIdx ? 'bg-[#b8935a]' : 'bg-[#e8e0d8]'}`} />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between mt-1">
                          {orderStatusFlow.map((s, i) => (
                            <span key={s} className={`text-[8px] ${i <= statusIdx ? 'text-[#b8935a]' : 'text-[#2d2a26]/20'}`}>
                              {statusLabels[s]?.label}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Expanded details */}
                      {isExpanded && (
                        <div className="px-5 pb-5 border-t border-[#e8e0d8] pt-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className={labelClass}>Contact</p>
                              <p className="text-[#2d2a26]">{o.customerEmail}</p>
                              <p className="text-[#2d2a26]/60">{o.customerPhone}</p>
                            </div>
                            <div>
                              <p className={labelClass}>Adresse de livraison</p>
                              <p className="text-[#2d2a26]">{o.address}</p>
                              <p className="text-[#2d2a26]">{o.zipCode} {o.city}</p>
                            </div>
                            <div>
                              <p className={labelClass}>Mode de livraison</p>
                              <p className="text-[#2d2a26]">{o.deliveryMode}</p>
                            </div>
                          </div>

                          {/* Items */}
                          <div>
                            <p className={labelClass}>Articles</p>
                            <div className="space-y-1">
                              {o.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm py-1 border-b border-[#e8e0d8]/50 last:border-0">
                                  <span className="text-[#2d2a26]">{item.qty}× {item.name}</span>
                                  <span className="text-[#2d2a26]/60">{(item.price * item.qty).toFixed(2)}€</span>
                                </div>
                              ))}
                              <div className="flex justify-between text-sm font-medium pt-2">
                                <span>Total</span>
                                <span>{o.total.toFixed(2)}€</span>
                              </div>
                            </div>
                          </div>

                          {/* Tracking */}
                          {o.carrier !== 'locale' && (
                            <div>
                              <p className={labelClass}>Numéro de suivi</p>
                              <div className="flex gap-2">
                                <input
                                  value={o.trackingNumber}
                                  onChange={e => updateTrackingNumber(o.id, e.target.value)}
                                  placeholder="Entrer le numéro de suivi..."
                                  className={`${inputClass} !w-72`}
                                  onClick={e => e.stopPropagation()}
                                />
                                {o.trackingNumber && (
                                  <a
                                    href={trackingUrl(o.carrier, o.trackingNumber)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-2 text-xs bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 transition-colors"
                                  >
                                    🔍 Suivre
                                  </a>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Quick actions */}
                          <div className="flex gap-2 flex-wrap pt-2">
                            {nextAction && (
                              <button
                                onClick={() => advanceOrderStatus(o.id)}
                                className="px-4 py-2 bg-[#b8935a] text-white text-xs hover:bg-[#b8956a] transition-colors"
                              >
                                ▶ {nextAction}
                              </button>
                            )}
                            <button
                              onClick={() => printOrderReceipt(o)}
                              className="px-4 py-2 border border-[#e8e0d8] text-[#2d2a26] text-xs hover:border-[#b8935a] hover:bg-[#b8935a] hover:text-white transition-colors"
                            >
                              🖨 Imprimer
                            </button>
                            <select
                              value={o.status}
                              onChange={e => updateOrderStatus(o.id, e.target.value as Order['status'])}
                              className="text-xs border border-[#e8e0d8] px-3 py-2 focus:outline-none focus:border-[#b8935a]"
                            >
                              <option value="pending">En attente</option>
                              <option value="confirmed">Confirmée</option>
                              <option value="preparing">En préparation</option>
                              <option value="shipped">Expédiée</option>
                              <option value="delivered">Livrée</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ═══════════ CLIENTS ═══════════ */}
        {activeTab === 'clients' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-6">Clients</h1>

            <input
              value={clientSearch}
              onChange={e => setClientSearch(e.target.value)}
              placeholder="🔍 Rechercher par nom ou email..."
              className={`${inputClass} !w-full md:!w-80 mb-6`}
            />

            <div className="text-xs text-[#2d2a26]/40 mb-4">{filteredClients.length} client{filteredClients.length > 1 ? 's' : ''}</div>

            {filteredClients.length === 0 ? (
              <div className="bg-white border border-[#e8e0d8] p-12 text-center">
                <p className="text-[#2d2a26]/60">{clients.length === 0 ? 'Aucun client inscrit' : 'Aucun résultat'}</p>
              </div>
            ) : (
              <div className="bg-white border border-[#e8e0d8] overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#e8e0d8] bg-[#faf8f5]">
                      <th className="text-left text-[10px] uppercase tracking-wider text-[#2d2a26]/40 px-4 py-3">Client</th>
                      <th className="text-left text-[10px] uppercase tracking-wider text-[#2d2a26]/40 px-4 py-3 hidden sm:table-cell">Téléphone</th>
                      <th className="text-left text-[10px] uppercase tracking-wider text-[#2d2a26]/40 px-4 py-3 hidden md:table-cell">Ville</th>
                      <th className="text-center text-[10px] uppercase tracking-wider text-[#2d2a26]/40 px-4 py-3">Commandes</th>
                      <th className="text-right text-[10px] uppercase tracking-wider text-[#2d2a26]/40 px-4 py-3">Total dépensé</th>
                      <th className="text-right text-[10px] uppercase tracking-wider text-[#2d2a26]/40 px-4 py-3 hidden md:table-cell">Dernière commande</th>
                      <th className="text-right text-[10px] uppercase tracking-wider text-[#2d2a26]/40 px-4 py-3 hidden lg:table-cell">Inscrit le</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map(c => {
                      const fullName = `${c.firstName} ${c.lastName}`;
                      const co = getClientOrders(c.email);
                      const total = getClientTotal(c.email);
                      const last = getClientLastOrder(c.email);
                      return (
                        <tr key={c.id} className="border-b border-[#e8e0d8]/50 hover:bg-[#faf8f5]/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 ${avatarColor(fullName)} rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0`}>
                                {getInitials(fullName)}
                              </div>
                              <div>
                                <p className="text-[#2d2a26] font-medium text-sm">{fullName}</p>
                                <p className="text-[11px] text-[#2d2a26]/40">{c.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[#2d2a26]/60 text-xs hidden sm:table-cell">{c.phone || '—'}</td>
                          <td className="px-4 py-3 text-[#2d2a26]/60 text-xs hidden md:table-cell">{(c as any).city || '—'}</td>
                          <td className="px-4 py-3 text-center text-[#2d2a26] font-medium">{co.length}</td>
                          <td className="px-4 py-3 text-right text-[#2d2a26] font-medium">{total.toFixed(0)}€</td>
                          <td className="px-4 py-3 text-right text-[#2d2a26]/60 text-xs hidden md:table-cell">
                            {last ? new Date(last).toLocaleDateString('fr-FR') : '—'}
                          </td>
                          <td className="px-4 py-3 text-right text-[#2d2a26]/40 text-xs hidden lg:table-cell">
                            {c.createdAt ? new Date(c.createdAt).toLocaleDateString('fr-FR') : '—'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ═══════════ WEDDINGS (Kanban) ═══════════ */}
        {activeTab === 'weddings' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-6">Demandes Mariages</h1>

            {weddings.length === 0 ? (
              <div className="bg-white border border-[#e8e0d8] p-12 text-center">
                <p className="text-4xl mb-4">💍</p>
                <p className="text-[#2d2a26]/60">Aucune demande de mariage</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto">
                {weddingColumns.map(col => {
                  const colWeddings = weddings.filter(w => w.status === col.status);
                  return (
                    <div key={col.status} className={`bg-white border-t-4 ${col.color} border border-[#e8e0d8] rounded min-h-[200px]`}>
                      <div className="p-3 border-b border-[#e8e0d8]">
                        <h3 className="text-sm font-medium text-[#2d2a26]">{col.label}</h3>
                        <p className="text-[10px] text-[#2d2a26]/40">{colWeddings.length} demande{colWeddings.length > 1 ? 's' : ''}</p>
                      </div>
                      <div className="p-2 space-y-2">
                        {colWeddings.map(w => {
                          const days = daysUntil(w.date);
                          return (
                            <div key={w.id} className="bg-[#faf8f5] border border-[#e8e0d8] p-3 rounded text-sm">
                              <p className="font-medium text-[#2d2a26] text-xs">{w.name}</p>
                              <p className="text-[10px] text-[#b8935a] mt-1">📅 {w.date}</p>
                              <p className={`text-[10px] mt-0.5 ${days < 30 ? 'text-red-500 font-medium' : 'text-[#2d2a26]/40'}`}>
                                {days > 0 ? `J-${days}` : days === 0 ? "Aujourd'hui !" : 'Passé'}
                              </p>
                              <p className="font-serif text-lg text-[#2d2a26] mt-1">{w.budget}</p>
                              <div className="flex gap-1 mt-2">
                                <button
                                  onClick={() => advanceWeddingStatus(w.id, -1)}
                                  className="text-[10px] px-2 py-1 border border-[#e8e0d8] text-[#2d2a26]/40 hover:border-[#b8935a] rounded"
                                >
                                  ◀
                                </button>
                                <button
                                  onClick={() => advanceWeddingStatus(w.id, 1)}
                                  className="text-[10px] px-2 py-1 border border-[#e8e0d8] text-[#2d2a26]/40 hover:border-[#b8935a] rounded"
                                >
                                  ▶
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ═══════════ SUBSCRIPTIONS ═══════════ */}
        {activeTab === 'subscriptions' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-6">Abonnements</h1>

            {/* MRR section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-[#b8935a] to-[#b8956a] text-white p-6 rounded-lg">
                <div className="text-[10px] tracking-[0.12em] uppercase opacity-80 mb-2">Revenue récurrent mensuel</div>
                <div className="font-serif text-4xl mb-2">{mrr.toFixed(0)}€</div>
                <div className="text-sm opacity-90">+12% vs mois dernier</div>
              </div>
              <div className="bg-white border border-[#e8e0d8] p-6 text-center">
                <div className="text-2xl text-green-600 mb-2">{subscriptions.filter(s => s.status === 'active').length}</div>
                <div className="text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/40">Actifs</div>
              </div>
              <div className="bg-white border border-[#e8e0d8] p-6 text-center">
                <div className="text-2xl text-yellow-600 mb-2">{subscriptions.filter(s => s.status === 'paused').length}</div>
                <div className="text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/40">En pause</div>
              </div>
              <div className="bg-white border border-[#e8e0d8] p-6 text-center">
                <div className="text-2xl text-red-600 mb-2">{subscriptions.filter(s => s.status === 'cancelled').length}</div>
                <div className="text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/40">Annulés</div>
              </div>
            </div>

            {/* Formulas overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {Object.entries(formulaLabels).map(([key, formula]) => {
                const count = subscriptions.filter(s => s.formula === key && s.status === 'active').length;
                const revenue = subscriptions.filter(s => s.formula === key && s.status === 'active').reduce((sum, s) => sum + s.price, 0);
                
                return (
                  <div key={key} className="bg-white border border-[#e8e0d8] p-5 hover:border-[#b8935a]/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded ${formula.color}`}>
                        {formula.label}
                      </span>
                      <span className="font-serif text-lg text-[#2d2a26]">{formula.price}€<span className="text-xs text-[#2d2a26]/40">/mois</span></span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-2xl text-[#2d2a26] font-medium">{count}</div>
                        <div className="text-[10px] text-[#2d2a26]/40">abonnés actifs</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[#b8935a]">{revenue.toFixed(0)}€</div>
                        <div className="text-[10px] text-[#2d2a26]/40">revenu/mois</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subscriptions table */}
            <div className="bg-white border border-[#e8e0d8] overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e0d8] bg-[#faf8f5]">
                    <th className="text-left text-[10px] uppercase tracking-wider text-[#2d2a26]/40 px-4 py-3">Client</th>
                    <th className="text-left text-[10px] uppercase tracking-wider text-[#2d2a26]/40 px-4 py-3">Formule</th>
                    <th className="text-right text-[10px] uppercase tracking-wider text-[#2d2a26]/40 px-4 py-3">Prix</th>
                    <th className="text-left text-[10px] uppercase tracking-wider text-[#2d2a26]/40 px-4 py-3 hidden sm:table-cell">Fréquence</th>
                    <th className="text-center text-[10px] uppercase tracking-wider text-[#2d2a26]/40 px-4 py-3">Statut</th>
                    <th className="text-right text-[10px] uppercase tracking-wider text-[#2d2a26]/40 px-4 py-3 hidden md:table-cell">Prochaine livraison</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map(s => {
                    const formula = formulaLabels[s.formula];
                    const daysUntilNext = s.nextDelivery ? Math.ceil((new Date(s.nextDelivery).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;
                    return (
                      <tr key={s.id} className="border-b border-[#e8e0d8]/50 hover:bg-[#faf8f5]/50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="text-[#2d2a26] font-medium text-sm">{s.customerName}</p>
                          <p className="text-[11px] text-[#2d2a26]/40">{s.customerEmail}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded ${formula?.color}`}>{formula?.label}</span>
                        </td>
                        <td className="px-4 py-3 text-right text-[#2d2a26] font-medium">{s.price}€</td>
                        <td className="px-4 py-3 text-[#2d2a26]/60 text-xs hidden sm:table-cell">{frequencyLabels[s.frequency]}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`text-[10px] px-2 py-0.5 rounded ${subStatusLabels[s.status]?.color}`}>{subStatusLabels[s.status]?.label}</span>
                        </td>
                        <td className="px-4 py-3 text-right text-xs hidden md:table-cell">
                          {s.nextDelivery && daysUntilNext !== null ? (
                            <span className={daysUntilNext <= 3 ? 'text-[#b8935a] font-medium' : 'text-[#2d2a26]/60'}>
                              {daysUntilNext <= 0 ? "Aujourd'hui" : daysUntilNext === 1 ? "Demain" : `J-${daysUntilNext}`}
                              <span className="text-[#2d2a26]/30 ml-1">({new Date(s.nextDelivery).toLocaleDateString('fr-FR')})</span>
                            </span>
                          ) : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══════════ DELIVERIES ═══════════ */}
        {activeTab === 'deliveries' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-6">Livraisons</h1>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex gap-1 bg-white border border-[#e8e0d8] p-1 rounded">
                {[
                  { v: 'today' as const, l: "Aujourd'hui" },
                  { v: 'week' as const, l: 'Cette semaine' },
                  { v: 'month' as const, l: 'Ce mois' },
                ].map(f => (
                  <button
                    key={f.v}
                    onClick={() => setDeliveryFilter(f.v)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${deliveryFilter === f.v ? 'bg-[#b8935a] text-white' : 'text-[#2d2a26]/60 hover:bg-[#f5f0eb]'}`}
                  >
                    {f.l}
                  </button>
                ))}
              </div>
              <div className="flex gap-1 bg-white border border-[#e8e0d8] p-1 rounded">
                {[
                  { v: 'all', l: 'Tous' },
                  { v: 'locale', l: '🚲 Locale' },
                  { v: 'colissimo', l: '📮 Colissimo' },
                  { v: 'chronopost', l: '⚡ Chronopost' },
                ].map(f => (
                  <button
                    key={f.v}
                    onClick={() => setDeliveryCarrierFilter(f.v)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${deliveryCarrierFilter === f.v ? 'bg-[#b8935a] text-white' : 'text-[#2d2a26]/60 hover:bg-[#f5f0eb]'}`}
                  >
                    {f.l}
                  </button>
                ))}
              </div>
            </div>

            {filteredDeliveries.length === 0 ? (
              <div className="bg-white border border-[#e8e0d8] p-12 text-center">
                <p className="text-4xl mb-4">🚚</p>
                <p className="text-[#2d2a26]/60">Aucune livraison à afficher</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredDeliveries.map(d => (
                  <div key={d.id} className="bg-white border border-[#e8e0d8] p-5 flex flex-wrap items-center justify-between gap-3 hover:border-[#b8935a]/30 transition-colors">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#2d2a26]/30">{d.orderNumber}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded ${carrierLabels[d.carrier]?.color}`}>
                          {carrierLabels[d.carrier]?.label}
                        </span>
                      </div>
                      <p className="text-sm text-[#2d2a26] mt-1">{d.customerName}</p>
                      <p className="text-xs text-[#2d2a26]/40">{d.address}, {d.zipCode} {d.city}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded ${deliveryStatusLabels[d.deliveryStatus]?.color}`}>
                        {deliveryStatusLabels[d.deliveryStatus]?.label}
                      </span>
                      {d.trackingNumber && d.carrier !== 'locale' && (
                        <a
                          href={trackingUrl(d.carrier, d.trackingNumber)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-sky-600 hover:underline"
                        >
                          📍 {d.trackingNumber}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════════ STATISTICS ═══════════ */}
        {activeTab === 'stats' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-6">Statistiques</h1>

            {/* Date filter controls */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex gap-1 bg-white border border-[#e8e0d8] p-1 rounded">
                {[
                  { v: 'week' as const, l: 'Cette semaine' },
                  { v: 'month' as const, l: 'Ce mois' },
                  { v: 'quarter' as const, l: 'Ce trimestre' },
                  { v: 'year' as const, l: 'Cette année' },
                ].map(f => (
                  <button
                    key={f.v}
                    onClick={() => setStatsDateFilter(f.v)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${statsDateFilter === f.v ? 'bg-[#b8935a] text-white' : 'text-[#2d2a26]/60 hover:bg-[#f5f0eb]'}`}
                  >
                    {f.l}
                  </button>
                ))}
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-[#b8935a] to-[#b8956a] text-white p-6 rounded-lg">
                <div className="text-[10px] tracking-[0.12em] uppercase opacity-80 mb-2">Chiffre d'affaires</div>
                <div className="font-serif text-3xl mb-2">{totalRevenue.toFixed(0)}€</div>
                <div className="text-sm opacity-90">+8% vs période précédente</div>
              </div>
              <div className="bg-white border border-[#e8e0d8] p-6">
                <div className="text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/40 mb-2">Commandes</div>
                <div className="font-serif text-3xl text-[#2d2a26] mb-2">{orders.length}</div>
                <div className="text-sm text-[#2d2a26]/60">+{pendingOrders.length} en attente</div>
              </div>
              <div className="bg-white border border-[#e8e0d8] p-6">
                <div className="text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/40 mb-2">Panier moyen</div>
                <div className="font-serif text-3xl text-[#2d2a26] mb-2">{avgBasket.toFixed(0)}€</div>
                <div className="text-sm text-[#2d2a26]/60">+3€ vs mois dernier</div>
              </div>
              <div className="bg-white border border-[#e8e0d8] p-6">
                <div className="text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/40 mb-2">Clients uniques</div>
                <div className="font-serif text-3xl text-[#2d2a26] mb-2">{uniqueClients}</div>
                <div className="text-sm text-[#2d2a26]/60">Taux de retour: 42%</div>
              </div>
            </div>

            {/* Large charts section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Revenue trend */}
              <div className="bg-white border border-[#e8e0d8] p-6 lg:col-span-2">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Évolution du chiffre d'affaires</h3>
                <div className="h-64 flex items-end gap-2">
                  {[120, 150, 95, 180, 220, 190, 250, 280, 200, 320, 290, 340].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-xs text-[#2d2a26]/60">{val}€</div>
                      <div className="w-full bg-[#f5f0eb] rounded-t relative flex-1">
                        <div
                          className="absolute bottom-0 w-full bg-gradient-to-t from-[#b8935a] to-[#b8935a]/70 rounded-t transition-all duration-500"
                          style={{ height: `${(val / 340) * 100}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-[#2d2a26]/40">
                        {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category breakdown with larger chart */}
              <div className="bg-white border border-[#e8e0d8] p-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Répartition par catégorie</h3>
                {categorySales.length === 0 ? (
                  <p className="text-sm text-[#2d2a26]/40">Aucune donnée</p>
                ) : (
                  <div className="space-y-4">
                    {categorySales.map(([cat, total]) => (
                      <div key={cat}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[#2d2a26] font-medium">{cat}</span>
                          <span className="text-[#2d2a26]/60">{total.toFixed(0)}€ ({((total / totalRevenue) * 100).toFixed(0)}%)</span>
                        </div>
                        <div className="h-6 bg-[#f5f0eb] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#b8935a] to-[#b8956a] rounded-full transition-all duration-700" 
                            style={{ width: `${(total / maxCategorySale) * 100}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Top products with better visualization */}
              <div className="bg-white border border-[#e8e0d8] p-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Top 5 produits</h3>
                {topProducts.length === 0 ? (
                  <p className="text-sm text-[#2d2a26]/40">Aucune donnée</p>
                ) : (
                  <div className="space-y-4">
                    {topProducts.map(([name, count], i) => (
                      <div key={name} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium ${
                          i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-amber-600' : 'bg-[#b8935a]'
                        }`}>
                          #{i + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-[#2d2a26] font-medium truncate">{name}</p>
                          <div className="h-3 bg-[#f5f0eb] rounded-full mt-1 overflow-hidden">
                            <div 
                              className="h-full bg-[#b8935a] rounded-full transition-all duration-700" 
                              style={{ width: `${(count / (topProducts[0]?.[1] || 1)) * 100}%` }} 
                            />
                          </div>
                        </div>
                        <span className="text-sm text-[#2d2a26] font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Detailed orders table */}
            <div className="bg-white border border-[#e8e0d8]">
              <div className="p-6 border-b border-[#e8e0d8]">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg text-[#2d2a26]">Commandes détaillées</h3>
                  <div className="flex gap-2">
                    <select
                      value={statsSortBy}
                      onChange={e => setStatsSortBy(e.target.value as any)}
                      className="text-xs border border-[#e8e0d8] px-3 py-2 focus:outline-none focus:border-[#b8935a]"
                    >
                      <option value="date">Trier par date</option>
                      <option value="amount">Trier par montant</option>
                      <option value="customer">Trier par client</option>
                    </select>
                    <button
                      onClick={() => setStatsSortOrder(statsSortOrder === 'asc' ? 'desc' : 'asc')}
                      className="px-3 py-2 border border-[#e8e0d8] text-xs hover:border-[#b8935a] transition-colors"
                    >
                      {statsSortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f5f0eb]">
                    <tr className="text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">
                      <th className="text-left p-4">Commande</th>
                      <th className="text-left p-4">Client</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-right p-4">Montant</th>
                      <th className="text-left p-4">Statut</th>
                      <th className="text-left p-4">Livraison</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.sort((a, b) => {
                      if (statsSortBy === 'date') {
                        const dateA = new Date(a.createdAt).getTime();
                        const dateB = new Date(b.createdAt).getTime();
                        return statsSortOrder === 'desc' ? dateB - dateA : dateA - dateB;
                      }
                      if (statsSortBy === 'amount') {
                        return statsSortOrder === 'desc' ? b.total - a.total : a.total - b.total;
                      }
                      if (statsSortBy === 'customer') {
                        return statsSortOrder === 'desc' ? 
                          b.customerName.localeCompare(a.customerName) : 
                          a.customerName.localeCompare(b.customerName);
                      }
                      return 0;
                    }).slice(0, 20).map(o => (
                      <tr key={o.id} className="border-b border-[#e8e0d8] hover:bg-[#faf8f5] transition-colors">
                        <td className="p-4">
                          <div className="text-sm text-[#2d2a26]">{o.orderNumber}</div>
                          <div className="text-[10px] text-[#2d2a26]/40">{o.items.length} article{o.items.length > 1 ? 's' : ''}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-[#2d2a26]">{o.customerName}</div>
                          <div className="text-[10px] text-[#2d2a26]/40">{o.city}</div>
                        </td>
                        <td className="p-4 text-sm text-[#2d2a26]">
                          {new Date(o.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="p-4 text-right font-serif text-lg text-[#2d2a26]">
                          {o.total.toFixed(2)}€
                        </td>
                        <td className="p-4">
                          <span className={`text-[10px] px-2 py-0.5 rounded ${statusLabels[o.status]?.color}`}>
                            {statusLabels[o.status]?.label}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`text-[10px] px-2 py-0.5 rounded ${
                            o.carrier === 'locale' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                          }`}>
                            {o.carrier === 'locale' ? '🚲 Locale' : '📮 France'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
