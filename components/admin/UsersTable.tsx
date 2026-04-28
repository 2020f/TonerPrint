'use client';

import { useState } from 'react';
import { Search, Plus, Trash2, Edit2, ShoppingCart } from 'lucide-react';

interface User { id: number; name: string; email: string; role: string; phone: string; orders_count: number; created_at: string; }

const ROLE_COLORS = { admin: 'bg-pink/10 text-pink border-pink/20', user: 'bg-gray-100 text-gray-600 border-gray-200' };

export default function UsersTable({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers]         = useState<User[]>(initialUsers);
  const [search, setSearch]       = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser]   = useState<User | null>(null);
  const [confirmDel, setConfirmDel] = useState<number | null>(null);
  const [form, setForm]           = useState({ name: '', email: '', password: '', role: 'user', phone: '' });
  const [saving, setSaving]       = useState(false);
  const [err, setErr]             = useState('');

  const filtered = users.filter(u => {
    const s = search.toLowerCase();
    return !s || u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s);
  });

  function openNew() { setEditUser(null); setForm({ name:'', email:'', password:'', role:'user', phone:'' }); setErr(''); setShowModal(true); }
  function openEdit(u: User) { setEditUser(u); setForm({ name:u.name, email:u.email, password:'', role:u.role, phone:u.phone||'' }); setErr(''); setShowModal(true); }

  async function handleSave() {
    setSaving(true); setErr('');
    try {
      const url    = editUser ? `/api/users/${editUser.id}` : '/api/users';
      const method = editUser ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setErr(data.error || 'Error'); return; }
      if (editUser) {
        setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, ...data } : u));
      } else {
        setUsers(prev => [{ ...data, orders_count: 0 }, ...prev]);
      }
      setShowModal(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
    if (res.ok) { setUsers(prev => prev.filter(u => u.id !== id)); setConfirmDel(null); }
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar usuario…"
            className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-pink/20 border border-transparent focus:border-pink/30 transition-all" />
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-pink hover:bg-pink/90 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors shrink-0">
          <Plus className="w-4 h-4" /> Nuevo usuario
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-5 py-3.5 text-left font-semibold">Usuario</th>
                <th className="px-5 py-3.5 text-left font-semibold">Rol</th>
                <th className="px-5 py-3.5 text-left font-semibold">Teléfono</th>
                <th className="px-5 py-3.5 text-left font-semibold">Pedidos</th>
                <th className="px-5 py-3.5 text-left font-semibold">Registrado</th>
                <th className="px-5 py-3.5 text-left font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-16 text-center text-gray-400">Sin usuarios</td></tr>
              ) : filtered.map(u => (
                <tr key={u.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink to-pink/50 flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{u.name}</div>
                        <div className="text-xs text-gray-400">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${ROLE_COLORS[u.role as keyof typeof ROLE_COLORS] || 'bg-gray-100 text-gray-600'}`}>
                      {u.role === 'admin' ? 'Admin' : 'Usuario'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{u.phone || '—'}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <ShoppingCart className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-bold text-gray-700">{u.orders_count}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">
                    {new Date(u.created_at).toLocaleDateString('es-DO', { day:'2-digit', month:'short', year:'numeric' })}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => openEdit(u)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      {confirmDel === u.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handleDelete(u.id)} className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg">Sí</button>
                          <button onClick={() => setConfirmDel(null)} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg">No</button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDel(u.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-colors">
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
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-black text-gray-900 mb-5">{editUser ? 'Editar usuario' : 'Nuevo usuario'}</h3>
            {err && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm mb-4">{err}</div>}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Nombre *</label>
                <input value={form.name} onChange={e => setForm({...form, name:e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Email *</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">{editUser ? 'Nueva contraseña (opcional)' : 'Contraseña *'}</label>
                <input type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Rol</label>
                  <select value={form.role} onChange={e => setForm({...form, role:e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink transition-all bg-white">
                    <option value="user">Usuario</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Teléfono</label>
                  <input value={form.phone} onChange={e => setForm({...form, phone:e.target.value})}
                    placeholder="(809)…"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink transition-all" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 py-2.5 bg-pink hover:bg-pink/90 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-colors">
                {saving ? 'Guardando…' : editUser ? 'Guardar cambios' : 'Crear usuario'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
