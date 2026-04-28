'use client';

import { useState } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';

const STATUS_LABELS: Record<string, string> = {
  pending:'Pendiente', confirmed:'Confirmado', processing:'Procesando',
  shipped:'Enviado', delivered:'Entregado', cancelled:'Cancelado',
};

export default function OrderStatusUpdater({ orderId, currentStatus }: { orderId: number; currentStatus: string }) {
  const [status, setStatus]   = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved]     = useState(false);

  async function handleSave() {
    setLoading(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2500); }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink focus:ring-2 focus:ring-pink/10 bg-white transition-all"
      >
        {Object.entries(STATUS_LABELS).map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
      <button
        onClick={handleSave}
        disabled={loading || status === currentStatus}
        className="w-full flex items-center justify-center gap-2 bg-pink hover:bg-pink/90 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Guardando…</>
        ) : saved ? (
          <><CheckCircle className="w-4 h-4" /> Guardado</>
        ) : (
          'Guardar estado'
        )}
      </button>
    </div>
  );
}
