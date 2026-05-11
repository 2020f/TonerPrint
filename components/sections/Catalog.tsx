'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Product, ProductType } from '@/types'
import ProductCard from '@/components/catalog/ProductCard'

function mapProduct(p: any): Product {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    type: p.type,
    price: Number(p.price),
    oldPrice: p.old_price ? Number(p.old_price) : undefined,
    imageUrl: p.image_url || undefined,
    emoji: p.emoji || '🖨️',
    badge: p.badge || null,
    description: p.description || '',
    specs: (() => {
      if (!p.specs) return []
      const raw = typeof p.specs === 'string' ? JSON.parse(p.specs) : p.specs
      if (Array.isArray(raw)) {
        return raw.map((s: any) =>
          Array.isArray(s) ? { label: s[0], value: s[1] } : s
        )
      }
      return []
    })(),
  }
}

type ChipType = ProductType | 'all'

const typeChips: { value: ChipType; label: string }[] = [
  { value: 'all',       label: 'Todos' },
  { value: 'toner',     label: 'Tóners' },
  { value: 'tinta',     label: 'Tintas' },
  { value: 'impresora', label: 'Impresoras' },
  { value: 'accesorio', label: 'Accesorios' },
]

export default function Catalog() {
  const [products, setProducts]       = useState<Product[]>([])
  const [loading, setLoading]         = useState(true)
  const [activeType, setActiveType]   = useState<ChipType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy]           = useState<'default' | 'price-asc' | 'price-desc'>('default')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Load products
  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setProducts(data.map(mapProduct)) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Listen to header search event
  useEffect(() => {
    const handler = (e: Event) => {
      setSearchQuery((e as CustomEvent<string>).detail)
    }
    window.addEventListener('catalog-search', handler)
    return () => window.removeEventListener('catalog-search', handler)
  }, [])

  // Listen to category click from Categories section
  useEffect(() => {
    const handler = (e: Event) => {
      const type = (e as CustomEvent<string>).detail as ChipType
      if (typeChips.some(c => c.value === type)) {
        setActiveType(type)
      } else {
        // 'recarga' → search for it
        setSearchQuery('recarga')
        setActiveType('all')
      }
    }
    window.addEventListener('catalog-filter-type', handler)
    return () => window.removeEventListener('catalog-filter-type', handler)
  }, [])

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const items = el.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') }),
      { threshold: 0.12 }
    )
    items.forEach(i => obs.observe(i))
    return () => obs.disconnect()
  }, [])

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      const matchType   = activeType === 'all' || p.type === activeType
      const matchSearch = !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.type.toLowerCase().includes(searchQuery.toLowerCase())
      return matchType && matchSearch
    })
    if (sortBy === 'price-asc')  result = [...result].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
    return result
  }, [products, activeType, searchQuery, sortBy])

  const chipCount = (type: ChipType) =>
    type === 'all'
      ? products.length
      : products.filter(p => p.type === type).length

  const clearAll = () => {
    setActiveType('all')
    setSearchQuery('')
    setSortBy('default')
  }

  return (
    <section id="catalogo" ref={sectionRef} style={{ background: 'var(--bg-soft)', padding: '80px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 28px' }}>

        {/* Section header */}
        <div className="reveal" style={{ marginBottom: 32 }}>
          <p
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--magenta)',
              marginBottom: 6,
            }}
          >
            Destacados
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: 700,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            Productos más vendidos
          </h2>
        </div>

        {/* Search + Filtros button */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 10,
            marginBottom: 14,
          }}
        >
          <div style={{ position: 'relative' }}>
            <Search
              size={17}
              style={{
                position: 'absolute', left: 14, top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--dim)',
                pointerEvents: 'none',
              }}
            />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, marca o tipo..."
              style={{
                width: '100%',
                background: 'var(--bg-soft)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r)',
                fontSize: 14,
                color: 'var(--ink)',
                padding: '12px 40px 12px 44px',
                outline: 'none',
                transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
              }}
              onFocus={e => {
                e.target.style.background = 'var(--bg)'
                e.target.style.borderColor = 'var(--magenta)'
                e.target.style.boxShadow = '0 0 0 3px var(--magenta-soft)'
              }}
              onBlur={e => {
                e.target.style.background = 'var(--bg-soft)'
                e.target.style.borderColor = 'var(--line)'
                e.target.style.boxShadow = 'none'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute', right: 12, top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none',
                  color: 'var(--dim)', cursor: 'pointer', padding: 2,
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: showFilters ? 'var(--magenta)' : 'var(--bg)',
              color: showFilters ? '#fff' : 'var(--ink)',
              border: `1px solid ${showFilters ? 'var(--magenta)' : 'var(--line)'}`,
              borderRadius: 'var(--r)',
              padding: '12px 18px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            <SlidersHorizontal size={16} />
            Filtros
          </button>
        </div>

        {/* Type chips */}
        <div
          className="reveal"
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 16,
          }}
        >
          {typeChips.map(chip => {
            const active = activeType === chip.value
            return (
              <button
                key={chip.value}
                onClick={() => setActiveType(chip.value)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: active ? 'var(--magenta)' : 'var(--bg)',
                  color: active ? '#fff' : 'var(--muted)',
                  border: `1px solid ${active ? 'var(--magenta)' : 'var(--line)'}`,
                  borderRadius: 99,
                  padding: '6px 14px',
                  fontSize: 13,
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {chip.label}
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: 10,
                    opacity: 0.7,
                  }}
                >
                  ({chipCount(chip.value)})
                </span>
              </button>
            )
          })}
        </div>

        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 20,
            flexWrap: 'wrap',
          }}
        >
          <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>
            {loading ? 'Cargando productos...' : (
              <>
                <strong style={{ color: 'var(--ink)' }}>{filtered.length}</strong>{' '}
                {filtered.length === 1 ? 'producto' : 'productos'}
                {activeType !== 'all' && ` en ${typeChips.find(c => c.value === activeType)?.label}`}
                {searchQuery && ` para "${searchQuery}"`}
              </>
            )}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {(activeType !== 'all' || searchQuery) && (
              <button
                onClick={clearAll}
                style={{
                  background: 'none', border: 'none',
                  color: 'var(--magenta)', fontSize: 13,
                  fontWeight: 600, cursor: 'pointer',
                }}
              >
                Limpiar filtros
              </button>
            )}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r-sm)',
                color: 'var(--ink)',
                fontSize: 13,
                padding: '6px 10px',
                cursor: 'pointer',
              }}
            >
              <option value="default">Ordenar: Destacados</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>

        {/* Products grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 16,
              }}
              className="prod-grid"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--r-lg)',
                    height: 260,
                    animation: 'pulse 1.5s ease-in-out infinite alternate',
                  }}
                />
              ))}
            </motion.div>
          ) : filtered.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 16,
              }}
              className="prod-grid"
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: i * 0.03 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', padding: '80px 20px' }}
            >
              <div style={{ fontSize: 64, marginBottom: 16 }}>
                <Search size={64} style={{ color: 'var(--line-2)', margin: '0 auto', display: 'block' }} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  marginBottom: 8,
                }}
              >
                Sin resultados
              </h3>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>
                Prueba con otro término o categoría.
              </p>
              <button
                onClick={clearAll}
                style={{
                  background: 'var(--magenta)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--r)',
                  padding: '12px 24px',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px var(--magenta-glow)',
                }}
              >
                Ver todos los productos
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .prod-grid {
          grid-template-columns: repeat(4, 1fr) !important;
        }
        @media (max-width: 1100px) {
          .prod-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 760px) {
          .prod-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @keyframes pulse {
          from { opacity: 0.4; }
          to { opacity: 0.8; }
        }
      `}</style>
    </section>
  )
}
