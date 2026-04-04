'use client';

import { useState, useEffect } from 'react';

interface ProductData {
  id?: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number | string;
  original_price: number | string;
  stock: number | string;
  images: string[];
  tags: string[];
  sizes: Array<{ name: string; price: number | string }>;
  variants: Array<{ name: string }>;
  is_active: boolean;
  featured: boolean;
  in_stock: boolean;
}

const CATEGORIES = [
  'Bouquets',
  'Plantes',
  'Compositions',
  'Deuil & Hommages',
  'Mariages',
  'Séchées',
  'Abonnements',
];

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+$/, '')
    .replace(/^-+/, '');
}

const emptyProduct: ProductData = {
  name: '',
  slug: '',
  description: '',
  category: '',
  price: '',
  original_price: '',
  stock: '',
  images: [],
  tags: [],
  sizes: [],
  variants: [],
  is_active: true,
  featured: false,
  in_stock: true,
};

export default function ProductForm({
  product,
  onClose,
  onSaved,
}: {
  product: ProductData | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<ProductData>(product || emptyProduct);
  const [imagesText, setImagesText] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setForm(product);
      setImagesText((product.images || []).join('\n'));
      setTagsText((product.tags || []).join(', '));
    }
  }, [product]);

  const handleNameChange = (name: string) => {
    setForm((f) => ({ ...f, name, slug: slugify(name) }));
  };

  const handleSubmit = async () => {
    setError('');
    if (!form.name.trim()) { setError('Le nom est requis'); return; }
    if (!form.category) { setError('La catégorie est requise'); return; }
    if (!form.price && form.price !== 0) { setError('Le prix est requis'); return; }

    setSaving(true);
    try {
      const images = imagesText.split('\n').map((s) => s.trim()).filter(Boolean);
      const tags = tagsText.split(',').map((s) => s.trim()).filter(Boolean);

      const body = {
        name: form.name,
        slug: form.slug || slugify(form.name),
        description: form.description,
        category: form.category,
        price: Number(form.price),
        original_price: form.original_price ? Number(form.original_price) : null,
        stock: form.stock ? Number(form.stock) : 0,
        images,
        tags,
        sizes: form.sizes,
        variants: form.variants,
        is_active: form.is_active,
        featured: form.featured,
        in_stock: form.in_stock,
      };

      const url = form.id ? `/api/products/${form.id}` : '/api/products';
      const method = form.id ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        onSaved();
        onClose();
      } else {
        const data = await res.json();
        setError(data.error || 'Erreur lors de la sauvegarde');
      }
    } catch (e) {
      console.error(e);
      setError('Erreur réseau');
    } finally {
      setSaving(false);
    }
  };

  const addSize = () => {
    setForm((f) => ({ ...f, sizes: [...f.sizes, { name: '', price: '' }] }));
  };

  const updateSize = (i: number, field: 'name' | 'price', value: string) => {
    setForm((f) => {
      const sizes = [...f.sizes];
      sizes[i] = { ...sizes[i], [field]: value };
      return { ...f, sizes };
    });
  };

  const removeSize = (i: number) => {
    setForm((f) => ({ ...f, sizes: f.sizes.filter((_, idx) => idx !== i) }));
  };

  const addVariant = () => {
    setForm((f) => ({ ...f, variants: [...f.variants, { name: '' }] }));
  };

  const updateVariant = (i: number, value: string) => {
    setForm((f) => {
      const variants = [...f.variants];
      variants[i] = { name: value };
      return { ...f, variants };
    });
  };

  const removeVariant = (i: number) => {
    setForm((f) => ({ ...f, variants: f.variants.filter((_, idx) => idx !== i) }));
  };

  const imageUrls = imagesText.split('\n').map((s) => s.trim()).filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-[#e8e0d8] px-6 py-4 flex items-center justify-between rounded-t-lg z-10">
          <h2 className="text-lg font-semibold text-[#2d2a26]">
            {form.id ? 'Modifier le produit' : 'Nouveau produit'}
          </h2>
          <button onClick={onClose} className="text-[#2d2a26]/40 hover:text-[#2d2a26] text-xl">✕</button>
        </div>

        <div className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Name + Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#2d2a26]/70 mb-1">Nom *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3 py-2 border border-[#e8e0d8] rounded-lg text-sm focus:outline-none focus:border-[#b8935a]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#2d2a26]/70 mb-1">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-[#e8e0d8] rounded-lg text-sm bg-[#faf8f5] focus:outline-none focus:border-[#b8935a]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-[#2d2a26]/70 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-[#e8e0d8] rounded-lg text-sm focus:outline-none focus:border-[#b8935a] resize-y"
            />
          </div>

          {/* Category + Price + Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#2d2a26]/70 mb-1">Catégorie *</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2 border border-[#e8e0d8] rounded-lg text-sm focus:outline-none focus:border-[#b8935a]"
              >
                <option value="">Choisir…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#2d2a26]/70 mb-1">Prix (€) *</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="w-full px-3 py-2 border border-[#e8e0d8] rounded-lg text-sm focus:outline-none focus:border-[#b8935a]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#2d2a26]/70 mb-1">Prix original (€)</label>
              <input
                type="number"
                step="0.01"
                value={form.original_price}
                onChange={(e) => setForm((f) => ({ ...f, original_price: e.target.value }))}
                className="w-full px-3 py-2 border border-[#e8e0d8] rounded-lg text-sm focus:outline-none focus:border-[#b8935a]"
                placeholder="Barré"
              />
            </div>
          </div>

          {/* Stock */}
          <div className="w-32">
            <label className="block text-xs font-medium text-[#2d2a26]/70 mb-1">Stock</label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
              className="w-full px-3 py-2 border border-[#e8e0d8] rounded-lg text-sm focus:outline-none focus:border-[#b8935a]"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-xs font-medium text-[#2d2a26]/70 mb-1">
              Images (URLs, une par ligne)
            </label>
            <textarea
              value={imagesText}
              onChange={(e) => setImagesText(e.target.value)}
              rows={3}
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              className="w-full px-3 py-2 border border-[#e8e0d8] rounded-lg text-sm font-mono focus:outline-none focus:border-[#b8935a] resize-y"
            />
            {imageUrls.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {imageUrls.slice(0, 6).map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt=""
                    className="w-16 h-16 object-cover rounded border border-[#e8e0d8]"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-[#2d2a26]/70 mb-1">
              Tags (séparés par des virgules)
            </label>
            <input
              type="text"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              placeholder="romantique, printemps, roses"
              className="w-full px-3 py-2 border border-[#e8e0d8] rounded-lg text-sm focus:outline-none focus:border-[#b8935a]"
            />
          </div>

          {/* Sizes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-[#2d2a26]/70">Tailles</label>
              <button
                type="button"
                onClick={addSize}
                className="text-xs text-[#b8935a] hover:underline"
              >
                + Ajouter une taille
              </button>
            </div>
            {form.sizes.map((size, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={size.name}
                  onChange={(e) => updateSize(i, 'name', e.target.value)}
                  placeholder="Nom (ex: Grand)"
                  className="flex-1 px-3 py-2 border border-[#e8e0d8] rounded-lg text-sm focus:outline-none focus:border-[#b8935a]"
                />
                <input
                  type="number"
                  step="0.01"
                  value={size.price}
                  onChange={(e) => updateSize(i, 'price', e.target.value)}
                  placeholder="Prix €"
                  className="w-28 px-3 py-2 border border-[#e8e0d8] rounded-lg text-sm focus:outline-none focus:border-[#b8935a]"
                />
                <button
                  type="button"
                  onClick={() => removeSize(i)}
                  className="text-red-400 hover:text-red-600 px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Variants */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-[#2d2a26]/70">Variantes</label>
              <button
                type="button"
                onClick={addVariant}
                className="text-xs text-[#b8935a] hover:underline"
              >
                + Ajouter une variante
              </button>
            </div>
            {form.variants.map((v, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={v.name}
                  onChange={(e) => updateVariant(i, e.target.value)}
                  placeholder="Nom variante"
                  className="flex-1 px-3 py-2 border border-[#e8e0d8] rounded-lg text-sm focus:outline-none focus:border-[#b8935a]"
                />
                <button
                  type="button"
                  onClick={() => removeVariant(i)}
                  className="text-red-400 hover:text-red-600 px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                className="accent-[#b8935a]"
              />
              Actif
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                className="accent-[#b8935a]"
              />
              Mis en avant
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.in_stock}
                onChange={(e) => setForm((f) => ({ ...f, in_stock: e.target.checked }))}
                className="accent-[#b8935a]"
              />
              En stock
            </label>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4 border-t border-[#e8e0d8]">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-6 py-2.5 text-sm bg-[#b8935a] text-white rounded-lg hover:bg-[#a07d4a] transition-colors disabled:opacity-50"
            >
              {saving ? '⏳ Enregistrement…' : '💾 Sauvegarder'}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm border border-[#e8e0d8] text-[#2d2a26] rounded-lg hover:bg-[#faf8f5] transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
