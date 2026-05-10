'use client';

import { useEffect, useState, useCallback } from 'react';
import ProductForm from './ProductForm';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  original_price: number | null;
  stock: number | null;
  images: string[];
  tags: string[];
  sizes: Array<{ name: string; price: number | string }> | null;
  variants: Array<{ name: string }> | null;
  is_active: boolean;
  featured: boolean;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

function fmt(n: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
}

function stockIndicator(stock: number | null): string {
  if (stock === null || stock === undefined) return '🟢';
  if (stock > 10) return '🟢';
  if (stock >= 1) return '🟠';
  return '🔴';
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (e) {
      console.error('Erreur chargement produits:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const toggleField = async (id: string, field: 'is_active' | 'featured', current: boolean) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: !current }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, [field]: !current } : p))
        );
      }
    } catch (e) {
      console.error('Erreur toggle:', e);
    }
  };

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))].sort();

  const filtered = categoryFilter
    ? products.filter((p) => p.category === categoryFilter)
    : products;

  const openEdit = (product: Product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const openNew = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#b8935a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 border border-[#e8e0d8] rounded-lg text-sm bg-white focus:outline-none focus:border-[#b8935a] text-[#2d2a26]"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div className="flex-1" />
        <button
          onClick={openNew}
          className="px-4 py-2.5 text-sm bg-[#b8935a] text-white rounded-lg hover:bg-[#a07d4a] transition-colors whitespace-nowrap"
        >
          + Ajouter un produit
        </button>
      </div>

      <p className="text-xs text-[#2d2a26]/50 mb-3">{filtered.length} produit{filtered.length > 1 ? 's' : ''}</p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((product) => {
          const img = product.images && product.images.length > 0 ? product.images[0] : null;
          return (
            <div
              key={product.id}
              className={`bg-white border rounded-lg overflow-hidden transition-shadow hover:shadow-md ${
                product.is_active ? 'border-[#e8e0d8]' : 'border-red-200 opacity-60'
              }`}
            >
              {/* Image */}
              <div className="aspect-square bg-[#faf8f5] relative">
                {img ? (
                  <img
                    src={img}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#2d2a26]/20 text-4xl">
                    🌸
                  </div>
                )}
                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-1">
                  {product.featured && (
                    <span className="bg-[#b8935a] text-white text-[10px] px-2 py-0.5 rounded-full">
                      ⭐ En avant
                    </span>
                  )}
                  {!product.is_active && (
                    <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                      Inactif
                    </span>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-sm" title={`Stock: ${product.stock ?? 'illimité'}`}>
                    {stockIndicator(product.stock)} {product.stock ?? '∞'}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-xs text-[#b8935a] mb-0.5">{product.category}</p>
                <h3 className="text-sm font-medium text-[#2d2a26] truncate">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-[#2d2a26]">{fmt(Number(product.price))}</span>
                  {product.original_price && Number(product.original_price) > Number(product.price) && (
                    <span className="text-xs text-[#2d2a26]/40 line-through">
                      {fmt(Number(product.original_price))}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#e8e0d8]">
                  <button
                    onClick={() => toggleField(product.id, 'is_active', product.is_active)}
                    className={`text-[10px] px-2 py-1 rounded transition-colors ${
                      product.is_active
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {product.is_active ? 'Actif' : 'Inactif'}
                  </button>
                  <button
                    onClick={() => toggleField(product.id, 'featured', product.featured)}
                    className={`text-[10px] px-2 py-1 rounded transition-colors ${
                      product.featured
                        ? 'bg-[#b8935a]/20 text-[#b8935a] hover:bg-[#b8935a]/30'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {product.featured ? '⭐' : '☆'}
                  </button>
                  <button
                    onClick={() => openEdit(product)}
                    className="ml-auto text-xs text-[#b8935a] hover:underline"
                  >
                    Modifier
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[#2d2a26]/40">Aucun produit trouvé</div>
      )}

      {/* Product form modal */}
      {showForm && (
        <ProductForm
          product={
            editProduct
              ? {
                  id: editProduct.id,
                  name: editProduct.name,
                  slug: editProduct.slug,
                  description: editProduct.description || '',
                  category: editProduct.category,
                  price: editProduct.price,
                  original_price: editProduct.original_price || '',
                  stock: editProduct.stock ?? '',
                  images: editProduct.images || [],
                  tags: editProduct.tags || [],
                  sizes: editProduct.sizes || [],
                  variants: editProduct.variants || [],
                  is_active: editProduct.is_active,
                  featured: editProduct.featured,
                  in_stock: editProduct.in_stock,
                }
              : null
          }
          onClose={() => {
            setShowForm(false);
            setEditProduct(null);
          }}
          onSaved={loadProducts}
        />
      )}
    </div>
  );
}
