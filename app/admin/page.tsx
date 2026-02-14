'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

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
  createdAt: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered';
  createdAt: string;
}

interface WeddingRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  budget: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'confirmed' | 'archived';
  createdAt: string;
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

type Tab = 'dashboard' | 'products' | 'orders' | 'clients' | 'weddings' | 'subscriptions';

export default function Admin() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [weddings, setWeddings] = useState<WeddingRequest[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product form
  const [pName, setPName] = useState('');
  const [pPrice, setPPrice] = useState('');
  const [pCategory, setPCategory] = useState('bouquets');
  const [pImage, setPImage] = useState('');
  const [pDescription, setPDescription] = useState('');
  const [pActive, setPActive] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      router.push('/compte/connexion');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('af-admin-products') || '[]'));
    setOrders(JSON.parse(localStorage.getItem('af-admin-orders') || '[]'));
    setWeddings(JSON.parse(localStorage.getItem('af-admin-weddings') || '[]'));
  }, []);

  const saveProducts = (p: Product[]) => { setProducts(p); localStorage.setItem('af-admin-products', JSON.stringify(p)); };
  const saveOrders = (o: Order[]) => { setOrders(o); localStorage.setItem('af-admin-orders', JSON.stringify(o)); };
  const saveWeddings = (w: WeddingRequest[]) => { setWeddings(w); localStorage.setItem('af-admin-weddings', JSON.stringify(w)); };

  const clients = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('af-users') || '[]' : '[]')
    .filter((u: { isAdmin?: boolean }) => !u.isAdmin);

  const resetProductForm = () => {
    setPName(''); setPPrice(''); setPCategory('bouquets'); setPImage(''); setPDescription(''); setPActive(true);
    setEditingProduct(null); setShowProductForm(false);
  };

  const handleSaveProduct = () => {
    if (!pName || !pPrice) return;
    const slug = pName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/-+$/,'');
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
    setPImage(p.image); setPDescription(p.description); setPActive(p.active);
    setEditingProduct(p); setShowProductForm(true);
  };

  const deleteProduct = (id: string) => {
    if (confirm('Supprimer ce produit ?')) saveProducts(products.filter(p => p.id !== id));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    saveOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const updateWeddingStatus = (id: string, status: WeddingRequest['status']) => {
    saveWeddings(weddings.map(w => w.id === id ? { ...w, status } : w));
  };

  if (isLoading || !user?.isAdmin) return null;

  const inputClass = "w-full px-3 py-2.5 bg-white border border-[#e8e0d8] text-[#2d2a26] text-sm focus:outline-none focus:border-[#c4a47a]";
  const labelClass = "block text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/50 mb-1.5";

  const tabs: { id: Tab; label: string; icon: string; count?: number }[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { id: 'products', label: 'Produits', icon: '🌸', count: products.length },
    { id: 'orders', label: 'Commandes', icon: '📦', count: orders.filter(o => o.status === 'pending').length },
    { id: 'clients', label: 'Clients', icon: '👥', count: clients.length },
    { id: 'weddings', label: 'Mariages', icon: '💍', count: weddings.filter(w => w.status === 'new').length },
    { id: 'subscriptions', label: 'Abonnements', icon: '🔄' },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1714] text-white min-h-screen fixed left-0 top-0 z-50 hidden md:block">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="font-serif text-xl text-white/90">Anne Freret</Link>
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#c4a47a] mt-1">Administration</p>
        </div>
        <nav className="p-4 space-y-1">
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
              {tab.count !== undefined && tab.count > 0 && (
                <span className="ml-auto bg-[#c4a47a] text-white text-[10px] px-2 py-0.5 rounded-full">{tab.count}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#c4a47a] rounded-full flex items-center justify-center text-white text-xs">AF</div>
            <div>
              <p className="text-sm text-white/80">{user.firstName} {user.lastName}</p>
              <p className="text-[10px] text-white/40">Administrateur</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#1a1714] z-50 overflow-x-auto">
        <div className="flex px-2 py-2 gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-3 py-2 rounded text-xs ${
                activeTab === tab.id ? 'bg-[#c4a47a]/20 text-[#c4a47a]' : 'text-white/60'
              }`}
            >
              {tab.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 pt-16 md:pt-10">

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-8">Tableau de bord</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Produits', value: products.length, icon: '🌸' },
                { label: 'Commandes', value: orders.length, icon: '📦' },
                { label: 'Clients', value: clients.length, icon: '👥' },
                { label: 'Mariages', value: weddings.filter(w => w.status !== 'archived').length, icon: '💍' },
              ].map(stat => (
                <div key={stat.label} className="bg-white border border-[#e8e0d8] p-6">
                  <p className="text-2xl mb-2">{stat.icon}</p>
                  <p className="font-serif text-3xl text-[#2d2a26]">{stat.value}</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#2d2a26]/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#e8e0d8] p-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Dernières commandes</h3>
                {orders.length === 0 ? (
                  <p className="text-[#2d2a26]/40 text-sm">Aucune commande pour le moment</p>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(-5).reverse().map(o => (
                      <div key={o.id} className="flex items-center justify-between text-sm">
                        <span className="text-[#2d2a26]">{o.customerName}</span>
                        <span className="text-[#2d2a26]/60">{o.total.toFixed(2)}€</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded ${statusLabels[o.status]?.color}`}>
                          {statusLabels[o.status]?.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="bg-white border border-[#e8e0d8] p-6">
                <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Demandes mariages</h3>
                {weddings.filter(w => w.status === 'new').length === 0 ? (
                  <p className="text-[#2d2a26]/40 text-sm">Aucune nouvelle demande</p>
                ) : (
                  <div className="space-y-3">
                    {weddings.filter(w => w.status === 'new').slice(0, 5).map(w => (
                      <div key={w.id} className="text-sm">
                        <p className="text-[#2d2a26]">{w.name} — {w.date}</p>
                        <p className="text-[#2d2a26]/40 text-xs">{w.budget}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="font-serif text-2xl text-[#2d2a26]">Produits</h1>
              <button
                onClick={() => { resetProductForm(); setShowProductForm(true); }}
                className="px-6 py-2.5 bg-[#c4a47a] text-white text-sm hover:bg-[#b8956a] transition-colors"
              >
                + Nouveau produit
              </button>
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
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>URL de l'image</label>
                    <input value={pImage} onChange={e => setPImage(e.target.value)} placeholder="https://..." className={inputClass} />
                  </div>
                </div>
                <div className="mb-4">
                  <label className={labelClass}>Description</label>
                  <textarea value={pDescription} onChange={e => setPDescription(e.target.value)} rows={3} placeholder="Description du produit..." className={`${inputClass} resize-none`} />
                </div>
                <div className="mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={pActive} onChange={e => setPActive(e.target.checked)} className="accent-[#c4a47a]" />
                    <span className="text-sm text-[#2d2a26]/70">Produit actif (visible sur le site)</span>
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
                    <img src={pImage} alt="Aperçu" className="w-32 h-32 object-cover border border-[#e8e0d8]" />
                  </div>
                )}
              </div>
            )}

            {products.length === 0 ? (
              <div className="bg-white border border-[#e8e0d8] p-12 text-center">
                <p className="text-4xl mb-4">🌸</p>
                <p className="text-[#2d2a26]/60 mb-2">Aucun produit ajouté</p>
                <p className="text-[#2d2a26]/40 text-xs">Les produits existants du site ne sont pas encore migrés ici. Ajoutez-en de nouveaux !</p>
              </div>
            ) : (
              <div className="bg-white border border-[#e8e0d8]">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#e8e0d8] text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/40">
                  <div className="col-span-1">Image</div>
                  <div className="col-span-3">Nom</div>
                  <div className="col-span-2">Catégorie</div>
                  <div className="col-span-2">Prix</div>
                  <div className="col-span-2">Statut</div>
                  <div className="col-span-2">Actions</div>
                </div>
                {products.map(p => (
                  <div key={p.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b border-[#e8e0d8] last:border-0 items-center">
                    <div className="col-span-1">
                      {p.image ? <img src={p.image} alt={p.name} className="w-12 h-12 object-cover" /> : <div className="w-12 h-12 bg-[#e8e0d8] flex items-center justify-center text-xs">🌸</div>}
                    </div>
                    <div className="col-span-3 text-sm text-[#2d2a26]">{p.name}</div>
                    <div className="col-span-2 text-xs text-[#2d2a26]/60 capitalize">{p.category}</div>
                    <div className="col-span-2 text-sm text-[#2d2a26]">{p.price.toFixed(2)}€</div>
                    <div className="col-span-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded ${p.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        {p.active ? 'Actif' : 'Masqué'}
                      </span>
                    </div>
                    <div className="col-span-2 flex gap-2">
                      <button onClick={() => editProduct(p)} className="text-xs text-[#c4a47a] hover:underline">Modifier</button>
                      <button onClick={() => deleteProduct(p.id)} className="text-xs text-red-400 hover:underline">Supprimer</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ORDERS */}
        {activeTab === 'orders' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-8">Commandes</h1>
            {orders.length === 0 ? (
              <div className="bg-white border border-[#e8e0d8] p-12 text-center">
                <p className="text-4xl mb-4">📦</p>
                <p className="text-[#2d2a26]/60">Aucune commande pour le moment</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(o => (
                  <div key={o.id} className="bg-white border border-[#e8e0d8] p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="text-sm text-[#2d2a26] font-medium">{o.customerName}</p>
                        <p className="text-xs text-[#2d2a26]/40">{o.customerEmail} · {new Date(o.createdAt).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-lg text-[#2d2a26]">{o.total.toFixed(2)}€</span>
                        <select
                          value={o.status}
                          onChange={e => updateOrderStatus(o.id, e.target.value as Order['status'])}
                          className="text-xs border border-[#e8e0d8] px-2 py-1 focus:outline-none focus:border-[#c4a47a]"
                        >
                          <option value="pending">En attente</option>
                          <option value="confirmed">Confirmée</option>
                          <option value="preparing">En préparation</option>
                          <option value="shipped">Expédiée</option>
                          <option value="delivered">Livrée</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {o.items.map((item, i) => (
                        <p key={i} className="text-xs text-[#2d2a26]/60">{item.qty}× {item.name} — {item.price.toFixed(2)}€</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CLIENTS */}
        {activeTab === 'clients' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-8">Clients</h1>
            {clients.length === 0 ? (
              <div className="bg-white border border-[#e8e0d8] p-12 text-center">
                <p className="text-4xl mb-4">👥</p>
                <p className="text-[#2d2a26]/60">Aucun client inscrit</p>
              </div>
            ) : (
              <div className="bg-white border border-[#e8e0d8]">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#e8e0d8] text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/40">
                  <div className="col-span-3">Nom</div>
                  <div className="col-span-3">Email</div>
                  <div className="col-span-2">Téléphone</div>
                  <div className="col-span-2">Ville</div>
                  <div className="col-span-2">Inscrit le</div>
                </div>
                {clients.map((c: { id: string; firstName: string; lastName: string; email: string; phone: string; city?: string; createdAt: string }) => (
                  <div key={c.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 border-b border-[#e8e0d8] last:border-0 items-center">
                    <div className="col-span-3 text-sm text-[#2d2a26]">{c.firstName} {c.lastName}</div>
                    <div className="col-span-3 text-xs text-[#2d2a26]/60">{c.email}</div>
                    <div className="col-span-2 text-xs text-[#2d2a26]/60">{c.phone}</div>
                    <div className="col-span-2 text-xs text-[#2d2a26]/60">{c.city || '—'}</div>
                    <div className="col-span-2 text-xs text-[#2d2a26]/40">{new Date(c.createdAt).toLocaleDateString('fr-FR')}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* WEDDINGS */}
        {activeTab === 'weddings' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-8">Demandes Mariages</h1>
            {weddings.length === 0 ? (
              <div className="bg-white border border-[#e8e0d8] p-12 text-center">
                <p className="text-4xl mb-4">💍</p>
                <p className="text-[#2d2a26]/60 mb-2">Aucune demande de mariage</p>
                <p className="text-xs text-[#2d2a26]/40">Les demandes du formulaire mariage apparaîtront ici</p>
              </div>
            ) : (
              <div className="space-y-4">
                {weddings.map(w => (
                  <div key={w.id} className="bg-white border border-[#e8e0d8] p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-sm text-[#2d2a26] font-medium">{w.name}</p>
                        <p className="text-xs text-[#2d2a26]/40">{w.email} · {w.phone}</p>
                        <p className="text-xs text-[#c4a47a] mt-1">📅 {w.date} · Budget: {w.budget}</p>
                      </div>
                      <select
                        value={w.status}
                        onChange={e => updateWeddingStatus(w.id, e.target.value as WeddingRequest['status'])}
                        className="text-xs border border-[#e8e0d8] px-2 py-1 focus:outline-none focus:border-[#c4a47a]"
                      >
                        <option value="new">Nouveau</option>
                        <option value="contacted">Contacté</option>
                        <option value="quoted">Devis envoyé</option>
                        <option value="confirmed">Confirmé</option>
                        <option value="archived">Archivé</option>
                      </select>
                    </div>
                    <p className="text-sm text-[#2d2a26]/60 bg-[#faf8f5] p-4">{w.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBSCRIPTIONS */}
        {activeTab === 'subscriptions' && (
          <div>
            <h1 className="font-serif text-2xl text-[#2d2a26] mb-8">Abonnements</h1>
            <div className="bg-white border border-[#e8e0d8] p-12 text-center">
              <p className="text-4xl mb-4">🔄</p>
              <p className="text-[#2d2a26]/60 mb-2">Aucun abonnement actif</p>
              <p className="text-xs text-[#2d2a26]/40">Les abonnements souscrits apparaîtront ici avec leur statut, fréquence et prochaine livraison</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
