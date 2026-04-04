'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api-client';

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

export default function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadClients = async () => {
      try {
        const res = await apiFetch(`/api/users?isAdmin=false&search=${search}`);
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

  if (isLoading) {
    return <div className="text-center py-8 text-[#2d2a26]/40">Chargement...</div>;
  }

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-[#e8e0d8] text-[#2d2a26] focus:outline-none focus:border-[#b8935a]"
        />
      </div>

      {/* Clients table */}
      <div className="bg-white border border-[#e8e0d8] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e8e0d8] bg-[#f5f0eb]">
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Client</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Email</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Téléphone</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Ville</th>
              <th className="p-3 text-right text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Commandes</th>
              <th className="p-3 text-right text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Total dépensé</th>
              <th className="p-3 text-right text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Points</th>
              <th className="p-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#2d2a26]/60">Dernière cmd</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-[#2d2a26]/40">
                  {search ? 'Aucun client trouvé' : 'Aucun client'}
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr key={client.id} className="border-b border-[#e8e0d8] hover:bg-[#faf8f5]">
                  <td className="p-3">
                    <div className="font-medium text-[#2d2a26]">
                      {client.first_name} {client.last_name}
                    </div>
                  </td>
                  <td className="p-3 text-[#2d2a26]/60 text-xs">{client.email}</td>
                  <td className="p-3 text-[#2d2a26]/60 text-xs">{client.phone || '-'}</td>
                  <td className="p-3 text-[#2d2a26]/60 text-xs">{client.city || '-'}</td>
                  <td className="p-3 text-right text-[#2d2a26]">{client.orders_count || 0}</td>
                  <td className="p-3 text-right text-[#2d2a26] font-medium">
                    {parseFloat(client.total_spent).toFixed(2)}€
                  </td>
                  <td className="p-3 text-right">
                    <span className="inline-block px-2 py-0.5 text-[10px] bg-[#b8935a]/10 text-[#b8935a] rounded">
                      {client.loyalty_points} pts
                    </span>
                  </td>
                  <td className="p-3 text-[#2d2a26]/60 text-xs">
                    {client.last_order_date 
                      ? new Date(client.last_order_date).toLocaleDateString('fr-FR')
                      : '-'}
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
