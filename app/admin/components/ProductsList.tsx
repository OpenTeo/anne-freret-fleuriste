'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  original_price?: number;
  images: string[];
  stock: number;
  is_active: boolean;
  featured: boolean;
  in_stock: boolean;
  tags?: string[];
  sizes?: Array<{ name: string; price: number }>;
  variants?: Array<{ name: string; price?: number }>;
  rating?: number;
  review_count?: number;
  created_at: string;
}

const categories = ['Bouquets', 'Plantes', 'Accessoires', 'Deuil & Hommages'];

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Erreur chargement produits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const toggleActive = async (productId: string, currentState: boolean) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentState }),
      });

      if (res.ok) {
        loadProducts();
      }
    } catch (error) {
      console.error('Erreur toggle actif:', error);
    }
  };

  const toggleFeatured = async (productId: string, currentState: boolean) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentState }),
      });

      if (res.ok) {
        loadProducts();
      }
    } catch (error) {
      console.error('Erreur toggle featured:', error);
    }
  };

  const filteredProducts = products.filter(
    (p) => categoryFilter === 'all' || p.category === categoryFilter
  );

  if (isLoading) {
    return <div className="text-center py-8 text-[#2d2a26]/40">Chargement...</div>;
  }

  return (
    <div>
      {/* Filters & Add button */}
      <div className="mb-6 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 text-sm rounded transition-all ${
              categoryFilter === 'all'
                ? 'bg-[#b8935a] text-white'
                : 'bg-white text-[#2d2a26] border border-[#e8e0d8] hover:border-[#b8935a]'
            }`}
          >
            Tous ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 text-sm rounded transition-all ${
                  categoryFilter === cat
                    ? 'bg-[#b8935a] text-white'
                    : 'bg-white text-[#2d2a26] border border-[#e8e0d8] hover:border-[#b8935a]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#b8935a] text-white rounded hover:bg-[#a07d45] transition-colors"
        >
          + Ajouter un produit
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-[#e8e0d8] rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Image */}
            <div className="relative h-48 bg-[#f5f0eb]">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#2d2a26]/30">
                  Aucune image
                </div>
              )}
              {/* Badges */}
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                {product.featured && (
                  <span className="bg-[#b8935a] text-white text-xs px-2 py-1 rounded">
                    ⭐ Vedette
                  </span>
                )}
                {!product.is_active && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Inactif
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-serif text-lg text-[#2d2a26] mb-1">{product.name}</h3>
              <p className="text-sm text-[#2d2a26]/60 mb-2">{product.category}</p>
              <p className="text-lg font-semibold text-[#b8935a] mb-3">{product.price.toFixed(2)} €</p>

              {/* Stats */}
              <div className="flex gap-3 text-xs text-[#2d2a26]/60 mb-3">
                <span>Stock: {product.stock}</span>
                {product.rating && (
                  <span>
                    ⭐ {product.rating} ({product.review_count || 0})
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => toggleActive(product.id, product.is_active)}
                  className={`flex-1 px-3 py-1.5 text-xs rounded transition-colors ${
                    product.is_active
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  {product.is_active ? 'Actif' : 'Inactif'}
                </button>
                <button
                  onClick={() => toggleFeatured(product.id, product.featured)}
                  className={`flex-1 px-3 py-1.5 text-xs rounded transition-colors ${
                    product.featured
                      ? 'bg-[#b8935a] text-white hover:bg-[#a07d45]'
                      : 'bg-[#f5f0eb] text-[#2d2a26] hover:bg-[#e8e0d8]'
                  }`}
                >
                  {product.featured ? '⭐ Vedette' : 'Normal'}
                </button>
              </div>

              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setShowEditModal(true);
                }}
                className="w-full mt-2 px-3 py-1.5 text-sm border border-[#e8e0d8] text-[#2d2a26] rounded hover:border-[#b8935a] hover:text-[#b8935a] transition-colors"
              >
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-[#2d2a26]/40">
          Aucun produit dans cette catégorie
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <ProductFormModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            loadProducts();
          }}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && selectedProduct && (
        <ProductFormModal
          product={selectedProduct}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
          onSuccess={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
            loadProducts();
          }}
        />
      )}
    </div>
  );
}

// Modal de formulaire (ajout/édition)
function ProductFormModal({
  product,
  onClose,
  onSuccess,
}: {
  product?: Product;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    category: product?.category || 'Bouquets',
    price: product?.price || 0,
    original_price: product?.original_price || null,
    stock: product?.stock || 0,
    images: product?.images?.join('\n') || '',
    tags: product?.tags?.join(', ') || '',
    is_active: product?.is_active ?? true,
    featured: product?.featured ?? false,
    in_stock: product?.in_stock ?? true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        images: formData.images.split('\n').filter((url) => url.trim()),
        tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
        original_price: formData.original_price || null,
      };

      const url = product ? `/api/products/${product.id}` : '/api/products';
      const method = product ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onSuccess();
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur réseau');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-[#e8e0d8] flex justify-between items-center">
          <h2 className="font-serif text-xl text-[#2d2a26]">
            {product ? 'Modifier le produit' : 'Nouveau produit'}
          </h2>
          <button
            onClick={onClose}
            className="text-[#2d2a26]/60 hover:text-[#2d2a26] text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-[#2d2a26] mb-1">
              Nom du produit *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-[#e8e0d8] rounded focus:outline-none focus:border-[#b8935a]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#2d2a26] mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-[#e8e0d8] rounded focus:outline-none focus:border-[#b8935a] h-24"
            />
          </div>

          {/* Catégorie & Prix */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2d2a26] mb-1">
                Catégorie *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-[#e8e0d8] rounded focus:outline-none focus:border-[#b8935a]"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2a26] mb-1">
                Prix (€) *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-[#e8e0d8] rounded focus:outline-none focus:border-[#b8935a]"
                required
              />
            </div>
          </div>

          {/* Prix original & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2d2a26] mb-1">
                Prix original (€)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.original_price || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    original_price: e.target.value ? parseFloat(e.target.value) : null,
                  })
                }
                className="w-full px-3 py-2 border border-[#e8e0d8] rounded focus:outline-none focus:border-[#b8935a]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2a26] mb-1">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-[#e8e0d8] rounded focus:outline-none focus:border-[#b8935a]"
              />
            </div>
          </div>

          {/* Images (URLs, une par ligne) */}
          <div>
            <label className="block text-sm font-medium text-[#2d2a26] mb-1">
              Images (URLs, une par ligne)
            </label>
            <textarea
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              className="w-full px-3 py-2 border border-[#e8e0d8] rounded focus:outline-none focus:border-[#b8935a] h-20 font-mono text-sm"
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-[#2d2a26] mb-1">
              Tags (séparés par des virgules)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 border border-[#e8e0d8] rounded focus:outline-none focus:border-[#b8935a]"
              placeholder="roses, champêtre, élégant"
            />
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm text-[#2d2a26]">Produit actif</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm text-[#2d2a26]">⭐ Produit vedette</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.in_stock}
                onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm text-[#2d2a26]">En stock</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-[#e8e0d8] text-[#2d2a26] rounded hover:bg-[#f5f0eb] transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-[#b8935a] text-white rounded hover:bg-[#a07d45] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Enregistrement...' : product ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
