'use client'

import { useEffect, useRef } from 'react'

const services = [
  {
    accent: 'var(--cyan)',
    accentAlpha: 'rgba(30,164,224,0.12)',
    tag: 'MISMO DÍA',
    title: 'Entrega a Domicilio',
    desc: 'Envío rápido y seguro a toda Santo Domingo. Recibe tus insumos el mismo día sin costo adicional desde RD$2,000.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    accent: 'var(--magenta)',
    accentAlpha: 'var(--magenta-soft)',
    tag: 'PROFESIONAL',
    title: 'Mantenimiento Técnico',
    desc: 'Mantenimiento preventivo y correctivo para impresoras de todas las marcas. Reparamos y optimizamos tu equipo.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    accent: 'var(--yellow)',
    accentAlpha: 'rgba(240,185,33,0.12)',
    tag: 'AHORRA 70%',
    title: 'Recarga de Cartuchos',
    desc: 'Recarga profesional para cartuchos de tinta y tóner. Calidad garantizada a una fracción del costo.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
      </svg>
    ),
  },
  {
    accent: 'var(--green)',
    accentAlpha: 'rgba(37,211,102,0.12)',
    tag: 'EXPERTOS RD',
    title: 'Asesoría Personalizada',
    desc: 'Nuestros expertos te ayudan a elegir el insumo correcto. Atención por WhatsApp, teléfono o en tienda.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)

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

  return (
    <section
      id="servicios"
      ref={sectionRef}
      style={{ background: 'var(--bg-soft)', padding: '80px 0' }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 28px' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <p
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--magenta)',
              marginBottom: 8,
            }}
          >
            Lo que ofrecemos
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 700,
              color: 'var(--ink)',
              margin: '0 0 12px',
            }}
          >
            Servicios que hacen la{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--magenta-deep), var(--magenta-bright))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              diferencia
            </span>
          </h2>
          <p
            style={{
              fontSize: 15,
              color: 'var(--muted)',
              maxWidth: 700,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Más que productos, ofrecemos soluciones completas para mantener tu impresora en óptimas condiciones.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
          className="svc-grid"
        >
          {services.map((svc, i) => (
            <div
              key={svc.title}
              className="svc-card reveal"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r-lg)',
                padding: '26px 22px',
                minHeight: 280,
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                animationDelay: `${i * 0.1}s`,
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.06)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 48, height: 48,
                  borderRadius: 14,
                  background: svc.accentAlpha,
                  color: svc.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                  flexShrink: 0,
                }}
              >
                {svc.icon}
              </div>

              {/* Tag pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    width: 6, height: 6,
                    borderRadius: '50%',
                    background: svc.accent,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: svc.accent,
                  }}
                >
                  {svc.tag}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontSize: 19,
                  fontWeight: 600,
                  color: 'var(--ink)',
                  margin: '0 0 10px',
                }}
              >
                {svc.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--muted)',
                  lineHeight: 1.6,
                  margin: '0 0 16px',
                  flex: 1,
                }}
              >
                {svc.desc}
              </p>

              {/* Link */}
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: svc.accent,
                  fontFamily: 'var(--font-jetbrains), monospace',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                Saber más →
              </button>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className="reveal"
          style={{
            marginTop: 40,
            background: 'linear-gradient(135deg, var(--magenta-deep), var(--magenta-bright))',
            borderRadius: 'var(--r-lg)',
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decoration circle */}
          <div
            style={{
              position: 'absolute',
              top: -40, right: -40,
              width: 160, height: 160,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative' }}>
            <h3
              style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontSize: 20,
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 4px',
              }}
            >
              ¿Necesitas atención especializada?
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
              Contáctanos y un experto te atenderá de inmediato.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexShrink: 0, position: 'relative', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/18095550100"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#fff',
                color: 'var(--magenta-deep)',
                fontWeight: 700,
                fontSize: 14,
                padding: '12px 22px',
                borderRadius: 'var(--r)',
                textDecoration: 'none',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="tel:+18095550100"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
                padding: '12px 22px',
                borderRadius: 'var(--r)',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >
              Llamar ahora
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .svc-grid {
          grid-template-columns: repeat(4, 1fr) !important;
        }
        @media (max-width: 1100px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 760px) {
          .svc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
