'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Edit2, Trash2, Search, CheckCircle, XCircle } from 'lucide-react';

const brandColors: Record<string, string> = {
  hp: 'bg-blue-100 text-blue-700',
  epson: 'bg-cyan-100 text-cyan-700',
  canon: 'bg-red-100 text-red-700',
  brother: 'bg-gray-100 text-gray-700',
};

const badgeColors: Record<string, string> = {
  sale: 'bg-orange-100 text-orange-700',
  hot:  'bg-pink/10 text-pink',
  new:  'bg-blue-100 text-blue-700',
};

export default function ProductsTable({ initialProducts }: { initialProducts: any[] }) {
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);
  const [confirmDel, setConfirmDel] = useState<number | null>(null);

  const filtered = products.filter(p => {
    const s = search.toLowerCase();
    const matchSearch = !s || p.name.toLowerCase().includes(s) || p.brand.includes(s);
    const matchBrand = !brandFilter || p.brand === brandFilter;
    const matchType  = !typeFilter  || p.type  === typeFilter;
    return matchSearch && matchBrand && matchType;
  });

  async function handleDelete(id: number) {
    setDeleting(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    } finally {
      setDeleting(null);
      setConfirmDel(null);
    }
  }

  async function toggleActive(id: number, current: boolean) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...p, active: !current, specs: p.specs ? (typeof p.specs === 'string' ? JSON.parse(p.specs) : p.specs) : [] }),
    });
    if (res.ok) {
      setProducts(prev => prev.map(x => x.id === id ? { ...x, active: !current } : x));
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar producto…"
            className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-pink/20 border border-transparent focus:border-pink/30 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['', 'hp', 'epson', 'canon', 'brother'].map(b => (
            <button
              key={b}
              onClick={() => setBrandFilter(b)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${brandFilter === b ? 'bg-pink text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {b || 'Todos'}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {['', 'toner', 'tinta', 'impresora', 'accesorio'].map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${typeFilter === t ? 'bg-[#0D0D0D] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {t ? {toner:'Tóner',tinta:'Tinta',impresora:'Impresora',accesorio:'Accesorio'}[t] : 'Tipo: todos'}
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
                <th className="px-5 py-3.5 text-left font-semibold">Producto</th>
                <th className="px-5 py-3.5 text-left font-semibold">Marca / Tipo</th>
                <th className="px-5 py-3.5 text-left font-semibold">Precio</th>
                <th className="px-5 py-3.5 text-left font-semibold">Stock</th>
                <th className="px-5 py-3.5 text-left font-semibold">Badge</th>
                <th className="px-5 py-3.5 text-left font-semibold">Activo</th>
                <th className="px-5 py-3.5 text-left font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center text-gray-400">
                    No se encontraron productos
                  </td>
                </tr>
              ) : filtered.map(p => (
                <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">{p.emoji || '🖨️'}</div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 max-w-[220px] truncate">{p.name}</p>
                        <p className="text-xs text-gray-400">ID: {p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex w-fit px-2 py-0.5 rounded-full text-xs font-bold ${brandColors[p.brand] || 'bg-gray-100 text-gray-700'}`}>
                        {p.brand.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">{p.type}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-gray-900">RD${Number(p.price).toLocaleString()}</div>
                    {p.old_price && (
                      <div className="text-xs text-gray-400 line-through">RD${Number(p.old_price).toLocaleString()}</div>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${
                      p.stock === 0 ? 'bg-red-100 text-red-600' :
                      p.stock < 10  ? 'bg-orange-100 text-orange-600' :
                      p.stock < 30  ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-green-100 text-green-700'
                    }`}>
                      {p.stock === 0 ? 'Agotado' : `${p.stock} uds`}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {p.badge ? (
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${badgeColors[p.badge] || 'bg-gray-100 text-gray-600'}`}>
                        {p.badge.toUpperCase()}
                      </span>
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => toggleActive(p.id, p.active)} className="transition-colors">
                      {p.active
                        ? <CheckCircle className="w-5 h-5 text-green-500 hover:text-green-400" />
                        : <XCircle className="w-5 h-5 text-gray-300 hover:text-gray-400" />
                      }
                    </button>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Link>
                      {confirmDel === p.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={deleting === p.id}
                            className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-50"
                          >
                            {deleting === p.id ? '…' : 'Sí'}
                          </button>
                          <button
                            onClick={() => setConfirmDel(null)}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-lg transition-colors"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDel(p.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
            Mostrando {filtered.length} de {products.length} productos
          </div>
        )}
      </div>
    </div>
  );
}
