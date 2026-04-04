'use client';

import { useEffect, useState } from 'react';

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  postal_code: string;
  created_at: string;
  orders_count: number;
  total_spent: number;
}

type SortKey = 'name' | 'created_at' | 'total_spent' | 'orders_count';
type SortDir = 'asc' | 'desc';

function fmt(n: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
}

const PER_PAGE = 25;

export default function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('created_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch('/api/users')
      .then((r) => r.json())
      .then((data) => {
        // data.users expected with joined stats
        setClients(data.users || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const filtered = clients.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    const name = `${c.first_name || ''} ${c.last_name || ''}`.toLowerCase();
    return name.includes(q) || (c.email || '').toLowerCase().includes(q);
  });

  const sorted = [...filtered].sort((a, b) => {
    const dir = sortDir === 'asc' ? 1 : -1;
    switch (sortKey) {
      case 'name':
        return (`${a.first_name} ${a.last_name}`).localeCompare(`${b.first_name} ${b.last_name}`) * dir;
      case 'created_at':
        return (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) * dir;
      case 'total_spent':
        return ((a.total_spent || 0) - (b.total_spent || 0)) * dir;
      case 'orders_count':
        return ((a.orders_count || 0) - (b.orders_count || 0)) * dir;
      default:
        return 0;
    }
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [search, sortKey, sortDir]);

  const handleExport = async () => {
    try {
      const res = await fetch('/api/admin/export/clients');
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'clients.csv';
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error('Erreur export:', e);
    }
  };

  const SortHeader = ({ label, field }: { label: string; field: SortKey }) => (
    <th
      className="text-left px-4 py-3 cursor-pointer select-none hover:text-[#b8935a] transition-colors"
      onClick={() => handleSort(field)}
    >
      {label}
      {sortKey === field && (
        <span className="ml-1 text-[#b8935a]">{sortDir === 'asc' ? '↑' : '↓'}</span>
      )}
    </th>
  );

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
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Rechercher par nom ou email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-[#e8e0d8] rounded-lg text-sm bg-white focus:outline-none focus:border-[#b8935a] text-[#2d2a26]"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2d2a26]/30">🔍</span>
        </div>
        <button
          onClick={handleExport}
          className="px-4 py-2.5 text-sm bg-[#2d2a26] text-white rounded-lg hover:bg-[#2d2a26]/90 transition-colors whitespace-nowrap"
        >
          📥 Exporter CSV
        </button>
      </div>

      <p className="text-xs text-[#2d2a26]/50 mb-3">{sorted.length} client{sorted.length > 1 ? 's' : ''}</p>

      {/* Table */}
      <div className="bg-white border border-[#e8e0d8] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#faf8f5] text-[#2d2a26]/50 text-xs uppercase">
                <SortHeader label="Nom" field="name" />
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Téléphone</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Ville</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">CP</th>
                <SortHeader label="Inscription" field="created_at" />
                <SortHeader label="Commandes" field="orders_count" />
                <SortHeader label="CA Total" field="total_spent" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e0d8]">
              {paginated.map((client) => (
                <tr key={client.id} className="hover:bg-[#faf8f5] transition-colors">
                  <td className="px-4 py-3 font-medium text-[#2d2a26]">
                    {client.first_name} {client.last_name}
                  </td>
                  <td className="px-4 py-3 text-[#2d2a26]/70">{client.email}</td>
                  <td className="px-4 py-3 text-[#2d2a26]/60 hidden md:table-cell">
                    {client.phone || '—'}
                  </td>
                  <td className="px-4 py-3 text-[#2d2a26]/60 hidden lg:table-cell">
                    {client.city || '—'}
                  </td>
                  <td className="px-4 py-3 text-[#2d2a26]/60 hidden lg:table-cell">
                    {client.postal_code || '—'}
                  </td>
                  <td className="px-4 py-3 text-[#2d2a26]/60">
                    {new Date(client.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3 text-center text-[#2d2a26]">
                    {client.orders_count || 0}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-[#2d2a26]">
                    {fmt(client.total_spent || 0)}
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-[#2d2a26]/40">
                    Aucun client trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm border border-[#e8e0d8] rounded-lg disabled:opacity-30 hover:border-[#b8935a] transition-colors"
          >
            ←
          </button>
          <span className="text-sm text-[#2d2a26]/60">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm border border-[#e8e0d8] rounded-lg disabled:opacity-30 hover:border-[#b8935a] transition-colors"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
