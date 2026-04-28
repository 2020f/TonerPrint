'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, Package } from 'lucide-react'
import { Product, ProductBrand, ProductType } from '@/types'
import FilterBar from '@/components/catalog/FilterBar'
import ProductCard from '@/components/catalog/ProductCard'

// Transforma respuesta de la API (snake_case) al tipo Product (camelCase)
function mapProduct(p: any): Product {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    type: p.type,
    price: Number(p.price),
    oldPrice: p.old_price ? Number(p.old_price) : undefined,
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

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeBrand, setActiveBrand] = useState<ProductBrand | 'all'>('all')
  const [activeType, setActiveType] = useState<ProductType | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(true)

  // Cargar productos desde la API
  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data.map(mapProduct))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Escuchar eventos de búsqueda desde el header
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<string>
      setSearchQuery(custom.detail)
    }
    window.addEventListener('catalog-search', handler)
    return () => window.removeEventListener('catalog-search', handler)
  }, [])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchBrand = activeBrand === 'all' || p.brand === activeBrand
      const matchType = activeType === 'all' || p.type === activeType
      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.type.toLowerCase().includes(searchQuery.toLowerCase())
      return matchBrand && matchType && matchSearch
    })
  }, [products, activeBrand, activeType, searchQuery])

  return (
    <section id="catalogo" className="bg-light py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-pink text-xs font-bold uppercase tracking-widest mb-3">
            <Package className="w-3.5 h-3.5" />
            Nuestro Catálogo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
            Encuentra el insumo{' '}
            <span style={{ background: 'linear-gradient(135deg, #E91E63, #F06292)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              perfecto
            </span>
          </h2>
          <p className="text-dark/55 text-lg max-w-xl mx-auto">
            Explora nuestra selección de más de 100 productos originales para todas las marcas y modelos de impresoras.
          </p>
        </motion.div>

        {/* Search + filter toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, marca o tipo..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-dark placeholder-gray-400 bg-gray-50 focus:bg-white focus:border-pink/50 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                showFilters
                  ? 'bg-pink text-white border-pink shadow-md shadow-pink/20'
                  : 'bg-white text-dark/60 border-gray-200 hover:border-pink/30 hover:text-pink'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
              {(activeBrand !== 'all' || activeType !== 'all') && (
                <span className="w-2 h-2 bg-orange rounded-full" />
              )}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-gray-100">
                  <FilterBar
                    activeBrand={activeBrand}
                    activeType={activeType}
                    onBrandChange={setActiveBrand}
                    onTypeChange={setActiveType}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-dark/50 text-sm">
            {loading ? (
              'Cargando productos...'
            ) : (
              <>
                <span className="text-dark font-semibold">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'producto encontrado' : 'productos encontrados'}
              </>
            )}
          </p>
          {(activeBrand !== 'all' || activeType !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setActiveBrand('all')
                setActiveType('all')
                setSearchQuery('')
              }}
              className="text-pink text-xs font-semibold hover:text-pink/80 transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Products grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-64 animate-pulse border border-gray-100" />
              ))}
            </motion.div>
          ) : filtered.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
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
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-dark font-semibold text-xl mb-2">
                No se encontraron productos
              </h3>
              <p className="text-dark/50 text-sm mb-6">
                Intenta con otros términos de búsqueda o ajusta los filtros.
              </p>
              <button
                onClick={() => {
                  setActiveBrand('all')
                  setActiveType('all')
                  setSearchQuery('')
                }}
                className="bg-pink text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-pink/90 transition-colors shadow-lg shadow-pink/20"
              >
                Ver todos los productos
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
