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
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [clientSearch, setClientSearch] = useState('');
  const [deliveryFilter, setDeliveryFilter] = useState<'today' | 'week' | 'month'>('week');
  const [deliveryCarrierFilter, setDeliveryCarrierFilter] = useState('all');

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
    setProducts(JSON.parse(localStorage.getItem('af-admin-products') || '[]'));

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
    return JSON.parse(localStorage.getItem('af-users') || '[]').filter((u: ClientData) => !u.isAdmin);
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

  if (isLoading || !user?.isAdmin) return null;

  const inputClass = "w-full px-3 py-2.5 bg-white border border-[#e8e0d8] text-[#2d2a26] text-[16px] sm:text-sm focus:outline-none focus:border-[#c4a47a]";
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
  const filteredOrders = orderStatusFilter === 'all' ? orders : orders.filter(o => o.status === orderStatusFilter);

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
      <aside className="w-64 bg-[#1a1714] text-white min-h-screen fixed left-0 top-0 z-50 hidden md:flex md:flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="font-serif text-xl text-white/90">Anne Freret</Link>
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#c4a47a] mt-1">Administration</p>
        </div>
        <nav className="p-4 space-y-1 flex-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm transition-all ${
                activeTab === tab.id ? 'bg-[#c4a47a]/20 text-[#c4a47a]' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge ? (
                <span className="ml-auto bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{tab.count}</span>
              ) : tab.count !== undefined && tab.count > 0 ? (
                <span className="ml-auto bg-[#c4a47a] text-white text-[10px] px-2 py-0.5 rounded-full">{tab.count}</span>
              ) : null}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link href="/" target="_blank" className="flex items-center gap-2 text-xs text-white/40 hover:text-[#c4a47a] transition-colors">
            🌐 Voir le site
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#c4a47a] rounded-full flex items-center justify-center text-white text-xs">AF</div>
            <div>
              <p className="text-sm text-white/80">{user.firstName} {user.lastName}</p>
              <p className="text-[10px] text-white/40">Administrateur</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile nav - bottom tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1714] z-50 border-t border-white/10 safe-area-pb">
        <div className="flex justify-around px-1 py-2">
          {tabs.slice(0, 6).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded relative ${
                activeTab === tab.id ? 'text-[#c4a47a]' : 'text-white/40'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-[9px]">{tab.label.split(' ')[0]}</span>
              {tab.badge && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">{tab.count}</span>
              )}
            </button>
          ))}
          <button
            onClick={() => setActiveTab(activeTab === 'deliveries' ? 'stats' : 'deliveries')}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded ${
              activeTab === 'deliveries' || activeTab === 'stats' ? 'text-[#c4a47a]' : 'text-white/40'
            }`}
          >
            <span className="text-lg">{activeTab === 'stats' ? '📈' : '🚚'}</span>
            <span className="text-[9px]">Plus</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-10 pb-24 md:pb-10">

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
                  {kpi.sub && <p className="text-[10px] text-[#c4a47a] mt-0.5">{kpi.sub}</p>}
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
                          <div className="h-full bg-[#c4a47a] rounded-full transition-all" style={{ width: `${(total / maxCategorySale) * 100}%` }} />
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
                          <p className="text-[10px] text-[#c4a47a]">📅 {w.date} · {w.budget}</p>
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
                className="px-6 py-2.5 bg-[#c4a47a] text-white text-sm hover:bg-[#b8956a] transition-colors"
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
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${productCategoryFilter === f.v ? 'bg-[#c4a47a] text-white' : 'text-[#2d2a26]/60 hover:bg-[#f5f0eb]'}`}
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
                    <input type="checkbox" checked={pActive} onChange={e => setPActive(e.target.checked)} className="accent-[#c4a47a]" />
                    <span className="text-sm text-[#2d2a26]/70">Produit actif</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={pInStock} onChange={e => setPInStock(e.target.checked)} className="accent-[#c4a47a]" />
                    <span className="text-sm text-[#2d2a26]/70">En stock</span>
                  </label>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleSaveProduct} className="px-8 py-2.5 bg-[#c4a47a] text-white text-sm hover:bg-[#b8956a]">
                    {editingProduct ? 'Enregistrer' : 'Créer le produit'}
                  </button>
                  <button onClick={resetProductForm} className="px-6 py-2.5 border border-[#e8e0d8] text-[#2d2a26]/60 text-sm hover:border-[#c4a47a]">
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
                      <button onClick={() => editProduct(p)} className="text-xs text-[#c4a47a] hover:underline">Modifier</button>
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
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-6">Commandes</h1>

            {/* Status filters */}
            <div className="flex flex-wrap gap-2 mb-6">
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
                  className={`px-3 py-1.5 text-xs rounded border transition-colors ${orderStatusFilter === f.v ? 'bg-[#c4a47a] text-white border-[#c4a47a]' : 'border-[#e8e0d8] text-[#2d2a26]/60 hover:border-[#c4a47a]'}`}
                >
                  {f.l} ({f.count})
                </button>
              ))}
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
                    <div key={o.id} className="bg-white border border-[#e8e0d8] hover:border-[#c4a47a]/30 transition-colors">
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
                          <span className={`text-[10px] px-2 py-0.5 rounded ${carrierLabels[o.carrier]?.color || 'bg-gray-100'}`}>
                            {carrierLabels[o.carrier]?.label || o.carrier}
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
                              <div className={`h-1.5 flex-1 rounded-full ${i <= statusIdx ? 'bg-[#c4a47a]' : 'bg-[#e8e0d8]'}`} />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between mt-1">
                          {orderStatusFlow.map((s, i) => (
                            <span key={s} className={`text-[8px] ${i <= statusIdx ? 'text-[#c4a47a]' : 'text-[#2d2a26]/20'}`}>
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
                                className="px-4 py-2 bg-[#c4a47a] text-white text-xs hover:bg-[#b8956a] transition-colors"
                              >
                                ▶ {nextAction}
                              </button>
                            )}
                            <select
                              value={o.status}
                              onChange={e => updateOrderStatus(o.id, e.target.value as Order['status'])}
                              className="text-xs border border-[#e8e0d8] px-3 py-2 focus:outline-none focus:border-[#c4a47a]"
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

            {filteredClients.length === 0 ? (
              <div className="bg-white border border-[#e8e0d8] p-12 text-center">
                <p className="text-4xl mb-4">👥</p>
                <p className="text-[#2d2a26]/60">{clients.length === 0 ? 'Aucun client inscrit' : 'Aucun résultat'}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredClients.map(c => {
                  const fullName = `${c.firstName} ${c.lastName}`;
                  const co = getClientOrders(c.email);
                  const total = getClientTotal(c.email);
                  const last = getClientLastOrder(c.email);
                  return (
                    <div key={c.id} className="bg-white border border-[#e8e0d8] p-5 flex items-center gap-4 hover:border-[#c4a47a]/30 transition-colors">
                      <div className={`w-10 h-10 ${avatarColor(fullName)} rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0`}>
                        {getInitials(fullName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#2d2a26] font-medium">{fullName}</p>
                        <p className="text-xs text-[#2d2a26]/40">{c.email}</p>
                      </div>
                      <div className="hidden sm:block text-center">
                        <p className="text-sm text-[#2d2a26] font-medium">{co.length}</p>
                        <p className="text-[9px] text-[#2d2a26]/40 uppercase">Commandes</p>
                      </div>
                      <div className="hidden sm:block text-center">
                        <p className="text-sm text-[#2d2a26] font-medium">{total.toFixed(0)}€</p>
                        <p className="text-[9px] text-[#2d2a26]/40 uppercase">Total</p>
                      </div>
                      <div className="hidden md:block text-right">
                        {last ? (
                          <p className="text-xs text-[#2d2a26]/60">{new Date(last).toLocaleDateString('fr-FR')}</p>
                        ) : (
                          <p className="text-xs text-[#2d2a26]/30">—</p>
                        )}
                        <p className="text-[9px] text-[#2d2a26]/40 uppercase">Dernière commande</p>
                      </div>
                    </div>
                  );
                })}
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
                              <p className="text-[10px] text-[#c4a47a] mt-1">📅 {w.date}</p>
                              <p className={`text-[10px] mt-0.5 ${days < 30 ? 'text-red-500 font-medium' : 'text-[#2d2a26]/40'}`}>
                                {days > 0 ? `J-${days}` : days === 0 ? "Aujourd'hui !" : 'Passé'}
                              </p>
                              <p className="font-serif text-lg text-[#2d2a26] mt-1">{w.budget}</p>
                              <div className="flex gap-1 mt-2">
                                <button
                                  onClick={() => advanceWeddingStatus(w.id, -1)}
                                  className="text-[10px] px-2 py-1 border border-[#e8e0d8] text-[#2d2a26]/40 hover:border-[#c4a47a] rounded"
                                >
                                  ◀
                                </button>
                                <button
                                  onClick={() => advanceWeddingStatus(w.id, 1)}
                                  className="text-[10px] px-2 py-1 border border-[#e8e0d8] text-[#2d2a26]/40 hover:border-[#c4a47a] rounded"
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

            {/* MRR card */}
            <div className="bg-white border border-[#e8e0d8] p-6 mb-6 flex items-center gap-6">
              <div>
                <p className="text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/40">Revenue récurrent mensuel (MRR)</p>
                <p className="font-serif text-4xl text-[#2d2a26]">{mrr.toFixed(0)}€</p>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <p className="text-lg text-[#2d2a26]">{subscriptions.filter(s => s.status === 'active').length}</p>
                  <p className="text-[9px] text-green-600 uppercase">Actifs</p>
                </div>
                <div className="text-center">
                  <p className="text-lg text-[#2d2a26]">{subscriptions.filter(s => s.status === 'paused').length}</p>
                  <p className="text-[9px] text-yellow-600 uppercase">En pause</p>
                </div>
                <div className="text-center">
                  <p className="text-lg text-[#2d2a26]">{subscriptions.filter(s => s.status === 'cancelled').length}</p>
                  <p className="text-[9px] text-red-600 uppercase">Annulés</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#e8e0d8]">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#e8e0d8] text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/40">
                <div className="col-span-3">Client</div>
                <div className="col-span-2">Formule</div>
                <div className="col-span-1">Prix</div>
                <div className="col-span-2">Fréquence</div>
                <div className="col-span-2">Prochaine livraison</div>
                <div className="col-span-2">Statut</div>
              </div>
              {subscriptions.map(s => (
                <div key={s.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b border-[#e8e0d8] last:border-0 items-center hover:bg-[#faf8f5] transition-colors">
                  <div className="col-span-3">
                    <p className="text-sm text-[#2d2a26]">{s.customerName}</p>
                    <p className="text-[10px] text-[#2d2a26]/40">{s.customerEmail}</p>
                  </div>
                  <div className="col-span-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded ${formulaLabels[s.formula]?.color}`}>
                      {formulaLabels[s.formula]?.label}
                    </span>
                  </div>
                  <div className="col-span-1 text-sm text-[#2d2a26]">{s.price.toFixed(2)}€</div>
                  <div className="col-span-2 text-xs text-[#2d2a26]/60">{frequencyLabels[s.frequency]}</div>
                  <div className="col-span-2 text-xs text-[#2d2a26]/60">
                    {s.nextDelivery ? new Date(s.nextDelivery).toLocaleDateString('fr-FR') : '—'}
                  </div>
                  <div className="col-span-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded ${subStatusLabels[s.status]?.color}`}>
                      {subStatusLabels[s.status]?.label}
                    </span>
                  </div>
                </div>
              ))}
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
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${deliveryFilter === f.v ? 'bg-[#c4a47a] text-white' : 'text-[#2d2a26]/60 hover:bg-[#f5f0eb]'}`}
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
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${deliveryCarrierFilter === f.v ? 'bg-[#c4a47a] text-white' : 'text-[#2d2a26]/60 hover:bg-[#f5f0eb]'}`}
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
                  <div key={d.id} className="bg-white border border-[#e8e0d8] p-5 flex flex-wrap items-center justify-between gap-3 hover:border-[#c4a47a]/30 transition-colors">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue */}
              <div className="bg-white border border-[#e8e0d8] p-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-2">Chiffre d&apos;affaires</h3>
                <p className="font-serif text-4xl text-[#c4a47a] mb-4">{totalRevenue.toFixed(0)}€</p>
                <p className="text-xs text-[#2d2a26]/40">{orders.length} commandes · Panier moyen {avgBasket.toFixed(1)}€</p>
              </div>

              {/* Top products */}
              <div className="bg-white border border-[#e8e0d8] p-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Top 5 produits</h3>
                {topProducts.length === 0 ? (
                  <p className="text-sm text-[#2d2a26]/40">Aucune donnée</p>
                ) : (
                  <div className="space-y-3">
                    {topProducts.map(([name, count], i) => (
                      <div key={name} className="flex items-center gap-3">
                        <span className="text-sm text-[#c4a47a] font-medium w-6">#{i + 1}</span>
                        <div className="flex-1">
                          <p className="text-sm text-[#2d2a26]">{name}</p>
                          <div className="h-2 bg-[#f5f0eb] rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-[#c4a47a] rounded-full" style={{ width: `${(count / (topProducts[0]?.[1] || 1)) * 100}%` }} />
                          </div>
                        </div>
                        <span className="text-xs text-[#2d2a26]/60">{count} vente{count > 1 ? 's' : ''}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Category breakdown */}
              <div className="bg-white border border-[#e8e0d8] p-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Répartition par catégorie</h3>
                {categorySales.length === 0 ? (
                  <p className="text-sm text-[#2d2a26]/40">Aucune donnée</p>
                ) : (
                  <div className="space-y-3">
                    {categorySales.map(([cat, total]) => (
                      <div key={cat}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#2d2a26]">{cat}</span>
                          <span className="text-[#2d2a26]/60">{total.toFixed(0)}€ ({((total / totalRevenue) * 100).toFixed(0)}%)</span>
                        </div>
                        <div className="h-4 bg-[#f5f0eb] rounded-full overflow-hidden">
                          <div className="h-full bg-[#c4a47a] rounded-full" style={{ width: `${(total / maxCategorySale) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Carrier breakdown */}
              <div className="bg-white border border-[#e8e0d8] p-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Répartition par transporteur</h3>
                <div className="space-y-3">
                  {Object.entries(carrierStats).map(([carrier, count]) => (
                    <div key={carrier}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#2d2a26]">{carrierLabels[carrier]?.label}</span>
                        <span className="text-[#2d2a26]/60">{count} ({orders.length > 0 ? ((count / orders.length) * 100).toFixed(0) : 0}%)</span>
                      </div>
                      <div className="h-4 bg-[#f5f0eb] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{
                          width: `${orders.length > 0 ? (count / orders.length) * 100 : 0}%`,
                          backgroundColor: carrier === 'locale' ? '#10b981' : carrier === 'colissimo' ? '#0ea5e9' : '#f97316'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active days */}
              <div className="bg-white border border-[#e8e0d8] p-6 lg:col-span-2">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Jours les plus actifs</h3>
                <div className="flex items-end gap-2 h-32">
                  {dayStats.map(d => {
                    const maxDay = Math.max(...dayStats.map(x => x.count), 1);
                    return (
                      <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs text-[#2d2a26]/60">{d.count}</span>
                        <div className="w-full bg-[#f5f0eb] rounded-t relative" style={{ height: '80px' }}>
                          <div
                            className="absolute bottom-0 w-full bg-[#c4a47a] rounded-t transition-all"
                            style={{ height: `${(d.count / maxDay) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-[#2d2a26]/40">{d.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
