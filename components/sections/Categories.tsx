'use client'

import { useEffect, useRef } from 'react'

const categories = [
  {
    name: 'Tóners',
    count: '120+ refs',
    desc: 'HP, Canon, Brother, Samsung',
    type: 'toner',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    name: 'Tintas',
    count: '200+ refs',
    desc: 'Cartuchos y botellas EcoTank',
    type: 'tinta',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
      </svg>
    ),
  },
  {
    name: 'Impresoras',
    count: '45+ modelos',
    desc: 'Multifuncionales, EcoTank, láser',
    type: 'impresora',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="6 9 6 2 18 2 18 9"/>
        <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
        <rect x="6" y="14" width="12" height="8"/>
      </svg>
    ),
  },
  {
    name: 'Accesorios',
    count: '80+ items',
    desc: 'Papel, cables, repuestos',
    type: 'accesorio',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M20 12h2M2 12h2M17.66 17.66l-1.41-1.41M6.34 17.66l1.41-1.41"/>
      </svg>
    ),
  },
  {
    name: 'Recargas',
    count: 'Servicio',
    desc: 'Ahorra hasta 70% en insumos',
    type: 'recarga',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="23 4 23 10 17 10"/>
        <polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
      </svg>
    ),
  },
]

export default function Categories() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const cards = el.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in') }),
      { threshold: 0.12 }
    )
    cards.forEach((c) => obs.observe(c))
    return () => obs.disconnect()
  }, [])

  const handleCategoryClick = (type: string) => {
    // Dispatch filter event to Catalog
    window.dispatchEvent(new CustomEvent('catalog-filter-type', { detail: type }))
    // Scroll to catalog
    const el = document.querySelector('#catalogo')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} style={{ background: 'var(--bg)', padding: '64px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 28px' }}>

        {/* Section header */}
        <div className="reveal" style={{ marginBottom: 32 }}>
          <p
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--magenta)',
              marginBottom: 6,
            }}
          >
            Categorías
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
            Explora nuestro catálogo
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 14,
          }}
          className="cat-grid"
        >
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryClick(cat.type)}
              className="cat-card reveal"
              style={{
                animationDelay: `${i * 0.06}s`,
                position: 'relative',
                textAlign: 'left',
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r-lg)',
                padding: '22px 20px 20px',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.borderColor = 'var(--magenta)'
                e.currentTarget.style.boxShadow = '0 8px 24px var(--magenta-soft)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'var(--line)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Top bar */}
              <span className="cat-bar" />

              {/* Arrow (visible on hover via CSS parent) */}
              <div
                style={{
                  position: 'absolute',
                  top: 16, right: 16,
                  color: 'var(--dim)',
                  fontSize: 16,
                  opacity: 0,
                  transition: 'opacity 0.2s',
                }}
                className="cat-arrow"
              >
                →
              </div>

              {/* Icon */}
              <div
                style={{
                  width: 44, height: 44,
                  background: 'var(--magenta-soft)',
                  color: 'var(--magenta)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 14,
                }}
              >
                {cat.icon}
              </div>

              {/* Count */}
              <p
                style={{
                  fontFamily: 'var(--font-jetbrains), monospace',
                  fontSize: 10,
                  color: 'var(--dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  margin: '0 0 4px',
                }}
              >
                {cat.count}
              </p>

              {/* Name */}
              <p
                style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontSize: 17,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  margin: '0 0 4px',
                }}
              >
                {cat.name}
              </p>

              {/* Desc */}
              <p
                style={{
                  fontSize: 12.5,
                  color: 'var(--muted)',
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {cat.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Responsive grid CSS */}
      <style>{`
        .cat-grid {
          grid-template-columns: repeat(5, 1fr);
        }
        .cat-card:hover .cat-arrow { opacity: 1 !important; }
        @media (max-width: 1100px) {
          .cat-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 760px) {
          .cat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
