'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/lib/store/cartStore'
import { useUIStore } from '@/lib/store/uiStore'
import { useToast } from '@/components/ui/ToastProvider'

interface ProductCardProps {
  product: Product
}

// SVG illustrations by type
function ProductIllustration({ type, emoji }: { type: string; emoji: string }) {
  if (type === 'toner') return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="12" y="18" width="40" height="28" rx="4" fill="var(--magenta-soft)" stroke="var(--magenta)" strokeWidth="1.5"/>
      <rect x="20" y="26" width="24" height="12" rx="2" fill="var(--magenta)" opacity="0.15"/>
      <rect x="24" y="22" width="16" height="4" rx="1" fill="var(--magenta)" opacity="0.3"/>
      <circle cx="18" cy="38" r="3" fill="var(--magenta)" opacity="0.4"/>
      <circle cx="46" cy="38" r="3" fill="var(--magenta)" opacity="0.4"/>
      <path d="M20 46 h24" stroke="var(--magenta)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
  if (type === 'tinta') return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <path d="M32 12 L44 28 A14 14 0 1 1 20 28 Z" fill="var(--magenta-soft)" stroke="var(--magenta)" strokeWidth="1.5"/>
      <path d="M32 20 L40 30 A10 10 0 0 1 24 30 Z" fill="var(--magenta)" opacity="0.2"/>
      <circle cx="32" cy="38" r="6" fill="var(--magenta)" opacity="0.3"/>
    </svg>
  )
  if (type === 'impresora') return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="10" y="26" width="44" height="20" rx="4" fill="var(--magenta-soft)" stroke="var(--magenta)" strokeWidth="1.5"/>
      <rect x="18" y="14" width="28" height="14" rx="3" fill="var(--line)" stroke="var(--line-2)" strokeWidth="1.5"/>
      <rect x="18" y="38" width="28" height="14" rx="3" fill="var(--bg)" stroke="var(--line-2)" strokeWidth="1.5"/>
      <rect x="22" y="42" width="20" height="6" rx="1" fill="var(--line)"/>
      <circle cx="42" cy="32" r="3" fill="var(--magenta)" opacity="0.5"/>
      <circle cx="48" cy="32" r="2" fill="var(--cyan)" opacity="0.5"/>
    </svg>
  )
  if (type === 'accesorio') return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="16" y="20" width="32" height="24" rx="3" fill="var(--magenta-soft)" stroke="var(--magenta)" strokeWidth="1.5"/>
      <line x1="16" y1="28" x2="48" y2="28" stroke="var(--magenta)" strokeWidth="1" opacity="0.3"/>
      <line x1="16" y1="36" x2="48" y2="36" stroke="var(--magenta)" strokeWidth="1" opacity="0.3"/>
      <line x1="24" y1="20" x2="24" y2="44" stroke="var(--magenta)" strokeWidth="1" opacity="0.3"/>
      <line x1="40" y1="20" x2="40" y2="44" stroke="var(--magenta)" strokeWidth="1" opacity="0.3"/>
    </svg>
  )
  // recarga / default
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="20" fill="var(--magenta-soft)" stroke="var(--magenta)" strokeWidth="1.5"/>
      <text x="32" y="37" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--magenta)" fontFamily="var(--font-space-grotesk), sans-serif">-70%</text>
      <path d="M22 20 Q32 12 42 20" stroke="var(--magenta)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M22 44 Q32 52 42 44" stroke="var(--magenta)" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

const badgeConfig = {
  sale: { label: 'Oferta',  bg: 'var(--magenta)', color: '#fff' },
  hot:  { label: 'Top',     bg: 'var(--yellow)',  color: 'var(--ink)' },
  new:  { label: 'Nuevo',   bg: 'var(--cyan)',    color: '#fff' },
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem    = useCartStore(s => s.addItem)
  const openProduct = useUIStore(s => s.openProduct)
  const { showToast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
    showToast(`${product.name} agregado al carrito`, 'success')
  }

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null

  const badge = product.badge ? badgeConfig[product.badge] : null

  return (
    <motion.div
      layout
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      onClick={() => openProduct(product)}
      className="product-card"
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--line-2)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--line)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Media area */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '4/3',
          background: 'var(--bg-soft)',
          borderBottom: '1px solid var(--line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Tags (stacked top-left) */}
        <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', flexDirection: 'column', gap: 4, zIndex: 2 }}>
          {badge && (
            <span
              style={{
                background: badge.bg,
                color: badge.color,
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: 9.5,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                padding: '3px 8px',
                borderRadius: 4,
                lineHeight: 1.4,
              }}
            >
              {badge.label}
            </span>
          )}
        </div>

        {/* Discount badge top-right */}
        {discount && (
          <span
            style={{
              position: 'absolute', top: 8, right: 8, zIndex: 2,
              background: 'var(--ink)',
              color: 'var(--magenta)',
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: 10,
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 99,
            }}
          >
            -{discount}%
          </span>
        )}

        {/* Product image or SVG illustration */}
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16 }}
          />
        ) : (
          <ProductIllustration type={product.type} emoji={product.emoji} />
        )}

        {/* Quick-add button (bottom-right, appears on hover) */}
        <button
          onClick={handleAddToCart}
          className="quick-add"
          style={{
            position: 'absolute', bottom: 10, right: 10, zIndex: 2,
            width: 34, height: 34,
            borderRadius: '50%',
            background: 'var(--magenta)',
            color: '#fff',
            border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 10px var(--magenta-glow)',
          }}
          aria-label={`Agregar ${product.name} al carrito`}
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '12px 14px 14px' }}>
        {/* Brand */}
        <p
          style={{
            fontFamily: 'var(--font-jetbrains), monospace',
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--magenta)',
            margin: '0 0 4px',
          }}
        >
          {product.brand.toUpperCase()}
        </p>

        {/* Name */}
        <h3
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            color: 'var(--ink)',
            margin: '0 0 6px',
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: 37,
          }}
        >
          {product.name}
        </h3>

        {/* Type pill */}
        <span
          style={{
            display: 'inline-block',
            background: 'var(--bg-soft)',
            color: 'var(--muted)',
            fontSize: 10.5,
            fontWeight: 500,
            padding: '2px 8px',
            borderRadius: 6,
            textTransform: 'capitalize',
            marginBottom: 10,
          }}
        >
          {product.type}
        </span>

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--ink)',
                margin: 0,
                lineHeight: 1,
              }}
            >
              RD${product.price.toLocaleString('es-DO')}
            </p>
            {product.oldPrice && (
              <p
                style={{
                  fontSize: 11.5,
                  color: 'var(--dim)',
                  textDecoration: 'line-through',
                  margin: '2px 0 0',
                }}
              >
                RD${product.oldPrice.toLocaleString('es-DO')}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
