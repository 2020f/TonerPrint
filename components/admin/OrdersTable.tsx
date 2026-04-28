'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Eye } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  pending:    'bg-yellow-100 text-yellow-700 border-yellow-200',
  confirmed:  'bg-blue-100 text-blue-700 border-blue-200',
  processing: 'bg-purple-100 text-purple-700 border-purple-200',
  shipped:    'bg-orange-100 text-orange-700 border-orange-200',
  delivered:  'bg-green-100 text-green-700 border-green-200',
  cancelled:  'bg-red-100 text-red-700 border-red-200',
};
const STATUS_LABELS: Record<string, string> = {
  pending:'Pendiente', confirmed:'Confirmado', processing:'Procesando',
  shipped:'Enviado', delivered:'Entregado', cancelled:'Cancelado',
};
const PAY_LABELS: Record<string, string> = {
  card:'💳 Tarjeta', transfer:'🏦 Transferencia', delivery:'📦 Contra entrega',
};

const STATUS_COUNTS = ['', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function OrdersTable({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders]     = useState<any[]>(initialOrders);
  const [search, setSearch]     = useState('');
  const [statusF, setStatusF]   = useState('');
  const [updating, setUpdating] = useState<number | null>(null);

  const filtered = orders.filter(o => {
    const s = search.toLowerCase();
    const matchS = !s || o.order_number.toLowerCase().includes(s) || o.customer_name.toLowerCase().includes(s) || o.customer_email.toLowerCase().includes(s);
    const matchSt = !statusF || o.status === statusF;
    return matchS && matchSt;
  });

  async function updateStatus(id: number, status: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      }
    } finally {
      setUpdating(null);
    }
  }

  const counts: Record<string, number> = {};
  STATUS_COUNTS.forEach(s => {
    counts[s] = s ? orders.filter(o => o.status === s).length : orders.length;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por número, cliente…"
            className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-pink/20 border border-transparent focus:border-pink/30 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_COUNTS.map(s => (
            <button
              key={s}
              onClick={() => setStatusF(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${statusF === s ? 'bg-pink text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {s ? STATUS_LABELS[s] : 'Todos'}
              <span className={`text-xs rounded-full px-1.5 py-0.5 ${statusF === s ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {counts[s]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-5 py-3.5 text-left font-semibold">Pedido</th>
                <th className="px-5 py-3.5 text-left font-semibold">Cliente</th>
                <th className="px-5 py-3.5 text-left font-semibold">Fecha</th>
                <th className="px-5 py-3.5 text-left font-semibold">Items</th>
                <th className="px-5 py-3.5 text-left font-semibold">Total</th>
                <th className="px-5 py-3.5 text-left font-semibold">Pago</th>
                <th className="px-5 py-3.5 text-left font-semibold">Estado</th>
                <th className="px-5 py-3.5 text-left font-semibold">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center text-gray-400">No se encontraron pedidos</td>
                </tr>
              ) : filtered.map(o => (
                <tr key={o.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/orders/${o.id}`} className="font-bold text-gray-900 hover:text-pink transition-colors">
                      {o.order_number}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-gray-800">{o.customer_name}</div>
                    <div className="text-xs text-gray-400">{o.customer_email}</div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">
                    {new Date(o.created_at).toLocaleDateString('es-DO', { day:'2-digit', month:'short', year:'numeric' })}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded-lg">{o.items_count}</span>
                  </td>
                  <td className="px-5 py-3.5 font-bold text-gray-900">RD${Number(o.total).toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{PAY_LABELS[o.payment_method] || o.payment_method}</td>
                  <td className="px-5 py-3.5">
                    <select
                      value={o.status}
                      onChange={e => updateStatus(o.id, e.target.value)}
                      disabled={updating === o.id}
                      className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer outline-none transition-all disabled:opacity-50 ${STATUS_COLORS[o.status] || 'bg-gray-100 text-gray-700'}`}
                    >
                      {Object.entries(STATUS_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-pink/10 hover:text-pink text-gray-500 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
            Mostrando {filtered.length} de {orders.length} pedidos
          </div>
        )}
      </div>
    </div>
  );
}
