'use client';

import { useEffect, useState } from 'react';

interface Devis {
  id: string;
  nom: string;
  email: string;
  telephone: string | null;
  date_mariage: string | null;
  lieu_mariage: string | null;
  budget: string | null;
  message: string | null;
  status: 'nouveau' | 'contacte' | 'devis_envoye' | 'accepte' | 'refuse';
  notes: string | null;
  created_at: string;
}

const statusConfig: Record<Devis['status'], { label: string; color: string }> = {
  nouveau: { label: 'Nouveau', color: 'bg-blue-100 text-blue-700' },
  contacte: { label: 'Contacté', color: 'bg-yellow-100 text-yellow-700' },
  devis_envoye: { label: 'Devis envoyé', color: 'bg-purple-100 text-purple-700' },
  accepte: { label: 'Accepté', color: 'bg-green-100 text-green-700' },
  refuse: { label: 'Refusé', color: 'bg-gray-100 text-gray-500' },
};

export default function DevisList() {
  const [devisList, setDevisList] = useState<Devis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const res = await fetch('/api/admin/devis');
      const data = await res.json();
      setDevisList(data.devis || []);
    } catch (err) {
      console.error('Erreur chargement devis:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: Devis['status']) => {
    try {
      await fetch(`/api/admin/devis/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      load();
    } catch (err) {
      console.error('Erreur mise à jour statut:', err);
    }
  };

  const saveNotes = async (id: string) => {
    setSaving(true);
    try {
      await fetch(`/api/admin/devis/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      setEditing(null);
      load();
    } catch (err) {
      console.error('Erreur sauvegarde notes:', err);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8 text-[#2d2a26]/40">Chargement...</div>;
  }

  const nouveaux = devisList.filter((d) => d.status === 'nouveau').length;

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <p className="text-sm text-[#2d2a26]/60">{devisList.length} demande{devisList.length > 1 ? 's' : ''}</p>
        {nouveaux > 0 && (
          <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
            {nouveaux} nouveau{nouveaux > 1 ? 'x' : ''}
          </span>
        )}
      </div>

      {devisList.length === 0 ? (
        <div className="bg-white border border-[#e8e0d8] p-12 text-center rounded-lg">
          <p className="text-[#2d2a26]/40 text-lg mb-2">💍</p>
          <p className="text-[#2d2a26]/40">Aucune demande de devis</p>
        </div>
      ) : (
        <div className="space-y-3">
          {devisList.map((devis) => {
            const sc = statusConfig[devis.status];
            const isExpanded = expanded === devis.id;
            const isEditingNotes = editing === devis.id;

            return (
              <div
                key={devis.id}
                className="bg-white border border-[#e8e0d8] rounded-lg overflow-hidden"
              >
                {/* Row header */}
                <button
                  className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#faf8f5] transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : devis.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-medium text-[#2d2a26] text-sm">{devis.nom}</span>
                      <span className={`px-2 py-0.5 text-[10px] rounded ${sc.color}`}>{sc.label}</span>
                    </div>
                    <div className="text-xs text-[#2d2a26]/50 mt-0.5 truncate">
                      {devis.email}
                      {devis.date_mariage && ` · Mariage : ${new Date(devis.date_mariage).toLocaleDateString('fr-FR')}`}
                    </div>
                  </div>
                  <div className="text-xs text-[#2d2a26]/40 shrink-0">
                    {new Date(devis.created_at).toLocaleDateString('fr-FR')}
                  </div>
                  <span className="text-[#2d2a26]/30 text-xs ml-1">{isExpanded ? '▲' : '▼'}</span>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-[#e8e0d8] px-5 py-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-[#b8935a] text-xs uppercase tracking-wide">Email</span>
                        <p className="text-[#2d2a26]">
                          <a href={`mailto:${devis.email}`} className="hover:underline">{devis.email}</a>
                        </p>
                      </div>
                      {devis.telephone && (
                        <div>
                          <span className="text-[#b8935a] text-xs uppercase tracking-wide">Téléphone</span>
                          <p className="text-[#2d2a26]">
                            <a href={`tel:${devis.telephone}`} className="hover:underline">{devis.telephone}</a>
                          </p>
                        </div>
                      )}
                      {devis.date_mariage && (
                        <div>
                          <span className="text-[#b8935a] text-xs uppercase tracking-wide">Date du mariage</span>
                          <p className="text-[#2d2a26]">{new Date(devis.date_mariage).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                      )}
                      {devis.lieu_mariage && (
                        <div>
                          <span className="text-[#b8935a] text-xs uppercase tracking-wide">Lieu</span>
                          <p className="text-[#2d2a26]">{devis.lieu_mariage}</p>
                        </div>
                      )}
                      {devis.budget && (
                        <div>
                          <span className="text-[#b8935a] text-xs uppercase tracking-wide">Budget</span>
                          <p className="text-[#2d2a26]">{devis.budget}</p>
                        </div>
                      )}
                    </div>

                    {devis.message && (
                      <div>
                        <span className="text-[#b8935a] text-xs uppercase tracking-wide">Message</span>
                        <p className="text-sm text-[#2d2a26] mt-1 whitespace-pre-wrap leading-relaxed">{devis.message}</p>
                      </div>
                    )}

                    {/* Notes internes */}
                    <div>
                      <span className="text-[#b8935a] text-xs uppercase tracking-wide">Notes internes</span>
                      {isEditingNotes ? (
                        <div className="mt-1 space-y-2">
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 text-sm border border-[#e8e0d8] rounded focus:outline-none focus:border-[#b8935a] resize-none"
                            placeholder="Notes internes..."
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveNotes(devis.id)}
                              disabled={saving}
                              className="px-3 py-1.5 text-xs bg-[#b8935a] text-white rounded hover:bg-[#a07d45] transition-colors disabled:opacity-50"
                            >
                              {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                            </button>
                            <button
                              onClick={() => setEditing(null)}
                              className="px-3 py-1.5 text-xs border border-[#e8e0d8] text-[#2d2a26] rounded hover:bg-[#f5f0eb] transition-colors"
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p
                          className="text-sm text-[#2d2a26]/60 mt-1 cursor-pointer hover:text-[#2d2a26] transition-colors"
                          onClick={() => { setEditing(devis.id); setNotes(devis.notes || ''); }}
                        >
                          {devis.notes || <span className="italic">Cliquer pour ajouter des notes…</span>}
                        </p>
                      )}
                    </div>

                    {/* Statut */}
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-[#e8e0d8]">
                      {(Object.keys(statusConfig) as Devis['status'][]).map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(devis.id, s)}
                          className={`px-3 py-1.5 text-xs rounded transition-colors ${
                            devis.status === s
                              ? statusConfig[s].color + ' font-medium'
                              : 'border border-[#e8e0d8] text-[#2d2a26]/60 hover:border-[#b8935a] hover:text-[#b8935a]'
                          }`}
                        >
                          {statusConfig[s].label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
