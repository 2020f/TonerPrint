'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Upload, Loader2, Save } from 'lucide-react';

interface Spec { key: string; value: string; }

interface ProductFormProps {
  product?: any;
  isEdit?: boolean;
}

const EMOJIS = ['🖨️', '🎨', '💼', '🖊️', '🎯', '⚙️', '🔌', '📄', '🖥️', '📦'];

export default function ProductForm({ product, isEdit }: ProductFormProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const parseSpecs = (raw: any): Spec[] => {
    if (!raw) return [{ key: '', value: '' }];
    const arr = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return Array.isArray(arr) ? arr.map((s: any) => Array.isArray(s) ? { key: s[0], value: s[1] } : s) : [{ key: '', value: '' }];
  };

  const [name, setName]           = useState(product?.name || '');
  const [brand, setBrand]         = useState(product?.brand || 'hp');
  const [type, setType]           = useState(product?.type || 'toner');
  const [price, setPrice]         = useState(product?.price || '');
  const [oldPrice, setOldPrice]   = useState(product?.old_price || '');
  const [stock, setStock]         = useState(product?.stock ?? 0);
  const [description, setDesc]    = useState(product?.description || '');
  const [imageUrl, setImageUrl]   = useState(product?.image_url || '');
  const [emoji, setEmoji]         = useState(product?.emoji || '🖨️');
  const [badge, setBadge]         = useState(product?.badge || '');
  const [active, setActive]       = useState(product?.active !== false);
  const [specs, setSpecs]         = useState<Spec[]>(parseSpecs(product?.specs));
  const [loading, setLoading]     = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState('');
  const [preview, setPreview]     = useState(product?.image_url || '');

  function addSpec() { setSpecs(prev => [...prev, { key: '', value: '' }]); }
  function removeSpec(i: number) { setSpecs(prev => prev.filter((_, idx) => idx !== i)); }
  function updateSpec(i: number, field: 'key' | 'value', val: string) {
    setSpecs(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !isEdit) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await fetch(`/api/products/${product.id}/image`, { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) { setImageUrl(data.url); setPreview(data.url); }
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      name, brand, type,
      price: Number(price),
      old_price: oldPrice ? Number(oldPrice) : null,
      stock: Number(stock),
      description,
      specs: specs.filter(s => s.key).map(s => [s.key, s.value]),
      image_url: imageUrl || null,
      emoji,
      badge: badge || null,
      active,
    };

    try {
      const url   = isEdit ? `/api/products/${product.id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const d = await res.json();
        setError(d.error || 'Error al guardar');
        return;
      }

      router.push('/admin/products');
      router.refresh();
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main fields */}
        <div className="lg:col-span-2 space-y-5">

          {/* Basic info */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Información básica</h3>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">Nombre del producto *</label>
              <input
                value={name} onChange={e => setName(e.target.value)} required
                placeholder="Ej: Tóner HP 85A Negro CE285A"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink focus:ring-2 focus:ring-pink/10 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Marca *</label>
                <select value={brand} onChange={e => setBrand(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink focus:ring-2 focus:ring-pink/10 transition-all bg-white">
                  <option value="hp">HP</option>
                  <option value="epson">Epson</option>
                  <option value="canon">Canon</option>
                  <option value="brother">Brother</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Tipo *</label>
                <select value={type} onChange={e => setType(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink focus:ring-2 focus:ring-pink/10 transition-all bg-white">
                  <option value="toner">Tóner</option>
                  <option value="tinta">Tinta</option>
                  <option value="impresora">Impresora</option>
                  <option value="accesorio">Accesorio</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">Descripción</label>
              <textarea
                value={description} onChange={e => setDesc(e.target.value)}
                rows={3} placeholder="Descripción detallada del producto…"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink focus:ring-2 focus:ring-pink/10 transition-all resize-none"
              />
            </div>
          </div>

          {/* Price & Stock */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Precio y stock</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Precio (RD$) *</label>
                <input
                  type="number" value={price} onChange={e => setPrice(e.target.value)} required min="0" step="0.01"
                  placeholder="1850"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink focus:ring-2 focus:ring-pink/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Precio anterior (RD$)</label>
                <input
                  type="number" value={oldPrice} onChange={e => setOldPrice(e.target.value)} min="0" step="0.01"
                  placeholder="2200"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink focus:ring-2 focus:ring-pink/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5">Stock (unidades)</label>
                <input
                  type="number" value={stock} onChange={e => setStock(Number(e.target.value))} min="0"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink focus:ring-2 focus:ring-pink/10 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Especificaciones técnicas</h3>
              <button type="button" onClick={addSpec}
                className="flex items-center gap-1.5 text-xs font-bold text-pink hover:text-pink/80 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Agregar fila
              </button>
            </div>
            {specs.map((spec, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  value={spec.key} onChange={e => updateSpec(i, 'key', e.target.value)}
                  placeholder="Ej: Modelo"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-pink transition-all"
                />
                <input
                  value={spec.value} onChange={e => updateSpec(i, 'value', e.target.value)}
                  placeholder="Ej: CE285A"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-pink transition-all"
                />
                <button type="button" onClick={() => removeSpec(i)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Image */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Imagen</h3>

            <div className="aspect-square w-full bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
              {preview ? (
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-6xl">{emoji}</span>
              )}
            </div>

            {isEdit && (
              <>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-pink/40 rounded-xl py-2.5 text-sm text-gray-500 hover:text-pink transition-all disabled:opacity-50"
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploading ? 'Subiendo…' : 'Subir imagen'}
                </button>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">O pega una URL</label>
              <input
                value={imageUrl} onChange={e => { setImageUrl(e.target.value); setPreview(e.target.value); }}
                placeholder="https://…"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink transition-all"
              />
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Ajustes</h3>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">Emoji (si no hay foto)</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {EMOJIS.map(e => (
                  <button
                    key={e} type="button" onClick={() => setEmoji(e)}
                    className={`w-8 h-8 rounded-lg text-lg transition-all ${emoji === e ? 'bg-pink/10 ring-2 ring-pink' : 'hover:bg-gray-100'}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
              <input value={emoji} onChange={e => setEmoji(e.target.value)}
                placeholder="🖨️"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink transition-all" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">Badge</label>
              <div className="flex gap-2 flex-wrap">
                {[{ v: '', l: 'Ninguno' }, { v: 'sale', l: '% Oferta' }, { v: 'hot', l: '🔥 Hot' }, { v: 'new', l: '🆕 Nuevo' }].map(b => (
                  <button
                    key={b.v} type="button" onClick={() => setBadge(b.v)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${badge === b.v ? 'bg-pink text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {b.l}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-gray-700">Producto activo</div>
                <div className="text-xs text-gray-400">Visible en la tienda</div>
              </div>
              <button
                type="button"
                onClick={() => setActive(!active)}
                className={`relative w-11 h-6 rounded-full transition-colors ${active ? 'bg-pink' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${active ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-pink hover:bg-pink/90 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors shadow-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {loading ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear producto'}
          </button>
        </div>
      </div>
    </form>
  );
}
