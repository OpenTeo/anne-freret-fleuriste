'use client';

import { useEffect, useState } from 'react';

interface PromoCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: string;
  min_order: string;
  max_uses: number | null;
  used_count: number;
  valid_from: string;
  valid_until: string | null;
  is_active: boolean;
  created_at: string;
}

const typeLabels: Record<string, string> = {
  percentage: 'Pourcentage',
  fixed: 'Montant fixe',
  free_shipping: 'Livraison gratuite',
};

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'AF-';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function getStatus(promo: PromoCode): { label: string; color: string } {
  if (!promo.is_active) return { label: 'Désactivé', color: 'bg-gray-100 text-gray-600' };
  if (promo.max_uses && promo.used_count >= promo.max_uses) return { label: 'Épuisé', color: 'bg-red-100 text-red-700' };
  if (promo.valid_until && new Date(promo.valid_until) < new Date()) return { label: 'Expiré', color: 'bg-gray-100 text-gray-500' };
  return { label: 'Actif', color: 'bg-green-100 text-green-700' };
}

export default function PromoCodesList() {
  const [promos, setPromos] = useState<PromoCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage' as PromoCode['type'],
    value: '',
    min_order: '',
    max_uses: '',
    valid_from: '',
    valid_until: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const loadPromos = async () => {
    try {
      const res = await fetch('/api/admin/promo');
      const data = await res.json();
      setPromos(data.promoCodes || []);
    } catch (error) {
      console.error('Erreur chargement promos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadPromos(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: formData.code,
          type: formData.type,
          value: formData.value ? parseFloat(formData.value) : 0,
          min_order: formData.min_order ? parseFloat(formData.min_order) : 0,
          max_uses: formData.max_uses ? parseInt(formData.max_uses) : null,
          valid_from: formData.valid_from || null,
          valid_until: formData.valid_until || null,
        }),
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({ code: '', type: 'percentage', value: '', min_order: '', max_uses: '', valid_from: '', valid_until: '' });
        loadPromos();
      } else {
        const data = await res.json();
        setFormError(data.error || 'Erreur lors de la création');
      }
    } catch {
      setFormError('Erreur réseau');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleActive = async (id: string, currentState: boolean) => {
    try {
      await fetch(`/api/admin/promo/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !currentState }),
      });
      loadPromos();
    } catch (error) {
      console.error('Erreur toggle:', error);
    }
  };

  const deletePromo = async (id: string) => {
    if (!confirm('Supprimer ce code promo définitivement ?')) return;
    try {
      await fetch(`/api/admin/promo/${id}`, { method: 'DELETE' });
      loadPromos();
    } catch (error) {
      console.error('Erreur suppression:', error);
    }
  };

  const formatValue = (promo: PromoCode) => {
    if (promo.type === 'percentage') return `${parseFloat(promo.value)}%`;
    if (promo.type === 'fixed') return `${parseFloat(promo.value).toFixed(2)} €`;
    return 'Livraison offerte';
  };

  if (isLoading) {
    return <div className="text-center py-8 text-[#2d2a26]/40">Chargement...</div>;
  }

  const inputClass = 'w-full px-3 py-2 border border-[#e8e0d8] rounded focus:outline-none focus:border-[#b8935a] text-sm';

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-sm text-[#2d2a26]/60">{promos.length} code{promos.length > 1 ? 's' : ''} promo</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-[#b8935a] text-white rounded hover:bg-[#a07d45] transition-colors text-sm"
        >
          {showForm ? 'Annuler' : '+ Nouveau code promo'}
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white border border-[#e8e0d8] rounded-lg p-6 mb-6">
          <h3 className="font-serif text-lg text-[#2d2a26] mb-4">Nouveau code promo</h3>

          {formError && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#2d2a26] mb-1">Code *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className={`${inputClass} flex-1`}
                  placeholder="EX: PRINTEMPS25"
                  required
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, code: generateCode() })}
                  className="px-3 py-2 text-xs border border-[#e8e0d8] text-[#2d2a26] rounded hover:border-[#b8935a] transition-colors whitespace-nowrap"
                >
                  🎲 Générer
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2a26] mb-1">Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as PromoCode['type'] })}
                className={inputClass}
              >
                <option value="percentage">Pourcentage</option>
                <option value="fixed">Montant fixe (€)</option>
                <option value="free_shipping">Livraison gratuite</option>
              </select>
            </div>

            {formData.type !== 'free_shipping' && (
              <div>
                <label className="block text-sm font-medium text-[#2d2a26] mb-1">
                  Valeur {formData.type === 'percentage' ? '(%)' : '(€)'}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className={inputClass}
                  placeholder={formData.type === 'percentage' ? '15' : '10.00'}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#2d2a26] mb-1">Commande minimum (€)</label>
              <input
                type="number"
                step="0.01"
                value={formData.min_order}
                onChange={(e) => setFormData({ ...formData, min_order: e.target.value })}
                className={inputClass}
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2a26] mb-1">Utilisations max</label>
              <input
                type="number"
                value={formData.max_uses}
                onChange={(e) => setFormData({ ...formData, max_uses: e.target.value })}
                className={inputClass}
                placeholder="Illimité"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2a26] mb-1">Valide à partir du</label>
              <input
                type="datetime-local"
                value={formData.valid_from}
                onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2d2a26] mb-1">Valide jusqu&apos;au</label>
              <input
                type="datetime-local"
                value={formData.valid_until}
                onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-4 border-t border-[#e8e0d8]">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-[#e8e0d8] text-[#2d2a26] rounded hover:bg-[#f5f0eb] transition-colors text-sm"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#b8935a] text-white rounded hover:bg-[#a07d45] transition-colors text-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Création...' : 'Créer le code'}
            </button>
          </div>
        </form>
      )}

      {/* Promo codes list */}
      {promos.length === 0 ? (
        <div className="bg-white border border-[#e8e0d8] p-12 text-center rounded-lg">
          <p className="text-[#2d2a26]/40 text-lg mb-2">🏷️</p>
          <p className="text-[#2d2a26]/40">Aucun code promo</p>
        </div>
      ) : (
        <div className="bg-white border border-[#e8e0d8] rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8e0d8] bg-[#f5f0eb]">
                <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Code</th>
                <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Type</th>
                <th className="p-3 text-right text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Valeur</th>
                <th className="p-3 text-right text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Min. commande</th>
                <th className="p-3 text-center text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Utilisations</th>
                <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Validité</th>
                <th className="p-3 text-center text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Statut</th>
                <th className="p-3 text-right text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((promo) => {
                const status = getStatus(promo);
                return (
                  <tr key={promo.id} className="border-b border-[#e8e0d8] hover:bg-[#faf8f5]">
                    <td className="p-3 font-mono font-bold text-[#2d2a26]">{promo.code}</td>
                    <td className="p-3 text-[#2d2a26]/60 text-xs">{typeLabels[promo.type]}</td>
                    <td className="p-3 text-right font-medium text-[#2d2a26]">{formatValue(promo)}</td>
                    <td className="p-3 text-right text-[#2d2a26]/60">
                      {parseFloat(promo.min_order) > 0 ? `${parseFloat(promo.min_order).toFixed(0)} €` : '-'}
                    </td>
                    <td className="p-3 text-center text-[#2d2a26]/60">
                      {promo.used_count}{promo.max_uses ? ` / ${promo.max_uses}` : ' / ∞'}
                    </td>
                    <td className="p-3 text-xs text-[#2d2a26]/60">
                      {promo.valid_from && (
                        <span>Du {new Date(promo.valid_from).toLocaleDateString('fr-FR')}</span>
                      )}
                      {promo.valid_until && (
                        <span> au {new Date(promo.valid_until).toLocaleDateString('fr-FR')}</span>
                      )}
                      {!promo.valid_from && !promo.valid_until && 'Illimité'}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-2 py-0.5 text-[10px] rounded ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex gap-1 justify-end">
                        <button
                          onClick={() => toggleActive(promo.id, promo.is_active)}
                          className={`px-2 py-1 text-xs rounded transition-colors ${
                            promo.is_active
                              ? 'text-yellow-700 hover:bg-yellow-50'
                              : 'text-green-700 hover:bg-green-50'
                          }`}
                          title={promo.is_active ? 'Désactiver' : 'Activer'}
                        >
                          {promo.is_active ? '⏸' : '▶️'}
                        </button>
                        <button
                          onClick={() => deletePromo(promo.id)}
                          className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Supprimer"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
