'use client';

import { useEffect, useState } from 'react';

interface Client {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  city?: string;
  loyalty_points: number;
  total_spent: string;
  orders_count?: number;
  last_order_date?: string;
  created_at: string;
}

type SortKey = 'created_at' | 'total_spent';

export default function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('created_at');
  const [sortDesc, setSortDesc] = useState(true);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const res = await fetch(`/api/users?isAdmin=false&search=${search}`);
        const data = await res.json();
        setClients(data.users || []);
      } catch (error) {
        console.error('Erreur chargement clients:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      loadClients();
    }, 300);

    return () => clearTimeout(debounce);
  }, [search]);

  const handleExportCSV = async () => {
    try {
      const res = await fetch('/api/admin/export/clients');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `clients_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur export CSV:', error);
    }
  };

  const toggleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(key);
      setSortDesc(true);
    }
  };

  const sortedClients = [...clients].sort((a, b) => {
    let diff = 0;
    if (sortBy === 'created_at') {
      diff = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else if (sortBy === 'total_spent') {
      diff = parseFloat(a.total_spent) - parseFloat(b.total_spent);
    }
    return sortDesc ? -diff : diff;
  });

  if (isLoading) {
    return <div className="text-center py-8 text-[#2d2a26]/40">Chargement...</div>;
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap gap-3 items-center justify-between">
        <input
          type="text"
          placeholder="Rechercher par nom ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-[#e8e0d8] rounded-lg text-[#2d2a26] focus:outline-none focus:border-[#b8935a]"
        />
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 text-sm bg-[#b8935a] text-white rounded-lg hover:bg-[#a07d4a] transition flex items-center gap-2"
        >
          📥 Exporter CSV
        </button>
      </div>

      {/* Stats */}
      <div className="mb-4 flex gap-4 text-sm text-[#2d2a26]/60">
        <span>{clients.length} clients</span>
        <span>·</span>
        <span>CA total: {clients.reduce((s, c) => s + parseFloat(c.total_spent || '0'), 0).toFixed(0)} €</span>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e8e0d8] rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e8e0d8] bg-[#f5f0eb]">
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Client</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Email</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Téléphone</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Ville</th>
              <th className="p-3 text-right text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Commandes</th>
              <th
                className="p-3 text-right text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60 cursor-pointer hover:text-[#b8935a]"
                onClick={() => toggleSort('total_spent')}
              >
                CA Total {sortBy === 'total_spent' ? (sortDesc ? '↓' : '↑') : ''}
              </th>
              <th
                className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60 cursor-pointer hover:text-[#b8935a]"
                onClick={() => toggleSort('created_at')}
              >
                Inscription {sortBy === 'created_at' ? (sortDesc ? '↓' : '↑') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedClients.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-[#2d2a26]/40">
                  {search ? 'Aucun client trouvé' : 'Aucun client'}
                </td>
              </tr>
            ) : (
              sortedClients.map((client) => (
                <tr key={client.id} className="border-b border-[#e8e0d8] hover:bg-[#faf8f5]">
                  <td className="p-3 font-medium text-[#2d2a26]">
                    {client.first_name} {client.last_name}
                  </td>
                  <td className="p-3 text-[#2d2a26]/60 text-xs">{client.email}</td>
                  <td className="p-3 text-[#2d2a26]/60 text-xs">{client.phone || '-'}</td>
                  <td className="p-3 text-[#2d2a26]/60 text-xs">{client.city || '-'}</td>
                  <td className="p-3 text-right text-[#2d2a26]">{client.orders_count || 0}</td>
                  <td className="p-3 text-right text-[#2d2a26] font-medium">
                    {parseFloat(client.total_spent || '0').toFixed(2)} €
                  </td>
                  <td className="p-3 text-[#2d2a26]/60 text-xs">
                    {new Date(client.created_at).toLocaleDateString('fr-FR')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
