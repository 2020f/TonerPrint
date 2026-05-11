'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const heroPhotos = ['/hero1.png', '/hero2.png', '/hero3.png']

const rotatingWords = [
  {
    word: 'impresión',
    desc: 'Tóners, tintas, impresoras y accesorios 100% originales de HP, Epson, Canon y Brother.',
  },
  {
    word: 'calidad',
    desc: 'Solo productos certificados de las marcas líderes. Garantía de fábrica en cada compra.',
  },
  {
    word: 'ahorro',
    desc: 'Hasta 70% de ahorro con recargas profesionales y precios mayoristas todo el año.',
  },
  {
    word: 'confianza',
    desc: 'Más de 5,000 clientes satisfechos en toda Santo Domingo. Envío GRATIS desde RD$2,000.',
  },
]

const stats = [
  { value: '5,000', suffix: '+', label: 'Clientes' },
  { value: '99',    suffix: '%', label: 'Originales' },
  { value: '24',    suffix: 'h', label: 'Entrega RD' },
  { value: '5',     suffix: '+', label: 'Años' },
]

export default function Hero() {
  const [photoIdx, setPhotoIdx]   = useState(0)
  const [wordIdx, setWordIdx]     = useState(0)
  const [wordEntering, setWordEntering] = useState(true)
  const [nextWordIdx, setNextWordIdx]   = useState<number | null>(null)
  const wordTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const photoTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  // Photo rotation every 5s
  useEffect(() => {
    photoTimer.current = setInterval(() => {
      setPhotoIdx((i) => (i + 1) % heroPhotos.length)
    }, 5000)
    return () => { if (photoTimer.current) clearInterval(photoTimer.current) }
  }, [])

  // Word rotation every 3.8s
  useEffect(() => {
    wordTimer.current = setInterval(() => {
      const next = (wordIdx + 1) % rotatingWords.length
      setNextWordIdx(next)
      setWordEntering(false)
      setTimeout(() => {
        setWordIdx(next)
        setNextWordIdx(null)
        setWordEntering(true)
      }, 400)
    }, 3800)
    return () => { if (wordTimer.current) clearInterval(wordTimer.current) }
  }, [wordIdx])

  const handleCtaClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      style={{
        position: 'relative',
        minHeight: 560,
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ── Photo slideshow ────────────────────────────────────── */}
      {heroPhotos.map((src, i) => (
        <div
          key={src}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === photoIdx ? 1 : 0,
            transition: 'opacity 1.2s ease',
            zIndex: 0,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center right',
              animation: i === photoIdx ? 'hero-zoom-out 8s ease forwards' : 'none',
            }}
          />
        </div>
      ))}

      {/* ── Overlay gradient ────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: `
            linear-gradient(
              90deg,
              rgba(255,255,255,1) 0%,
              rgba(255,255,255,0.92) 35%,
              rgba(255,255,255,0.5) 55%,
              rgba(255,255,255,0.1) 75%,
              transparent 100%
            )
          `,
        }}
      />
      {/* Mobile: vertical overlay */}
      <div
        className="block sm:hidden"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 60%, rgba(255,255,255,0.5) 100%)',
        }}
      />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1320,
          width: '100%',
          margin: '0 auto',
          padding: '64px 28px 56px',
        }}
      >
        <div style={{ maxWidth: 660 }}>

          {/* Badge */}
          <div style={{ marginBottom: 24 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#fff',
                border: '1px solid var(--line-2)',
                borderRadius: 99,
                padding: '6px 14px',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--ink-2)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
              }}
            >
              <span
                style={{
                  width: 8, height: 8,
                  borderRadius: '50%',
                  background: 'var(--magenta)',
                  animation: 'dot-pulse 1.5s ease-in-out infinite',
                  flexShrink: 0,
                }}
              />
              #1 en insumos de impresión · República Dominicana
            </span>
          </div>

          {/* Headline with rotating word */}
          <h1
            style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: 'clamp(38px, 5vw, 62px)',
              fontWeight: 600,
              color: 'var(--ink)',
              lineHeight: 1.12,
              margin: '0 0 16px',
            }}
          >
            Impresiones premium de{' '}
            <span
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'bottom',
                lineHeight: 1.2,
              }}
            >
              <span
                key={wordIdx}
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, var(--magenta-deep), var(--magenta-bright))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: wordEntering ? 'word-in 0.4s ease forwards' : 'word-out 0.4s ease forwards',
                }}
              >
                {rotatingWords[wordIdx].word}
              </span>
            </span>
            {' '}al mejor precio
          </h1>

          {/* Description (changes with word) */}
          <p
            key={`desc-${wordIdx}`}
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: 'var(--muted)',
              marginBottom: 32,
              animation: 'fade-in-up 0.5s ease forwards',
            }}
          >
            {rotatingWords[wordIdx].desc}
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
            <button
              onClick={() => handleCtaClick('#catalogo')}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--magenta)',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--r)',
                padding: '13px 26px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 6px 20px var(--magenta-glow)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 28px var(--magenta-glow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 6px 20px var(--magenta-glow)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              Ver catálogo
            </button>
            <a
              href="tel:+18095550100"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'transparent',
                color: 'var(--ink)',
                border: '1.5px solid var(--line-2)',
                borderRadius: 'var(--r)',
                padding: '13px 26px',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--magenta)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--line-2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 6.91a16 16 0 006.72 6.72l1.48-1.35a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              809-555-0100
            </a>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 24,
              paddingTop: 24,
              borderTop: '1px solid var(--line)',
            }}
          >
            {stats.map(({ value, suffix, label }) => (
              <div key={label}>
                <p
                  style={{
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: 22,
                    fontWeight: 700,
                    color: 'var(--ink)',
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {value}
                  <span style={{ color: 'var(--magenta)', fontSize: 18 }}>{suffix}</span>
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    fontSize: 11,
                    color: 'var(--muted)',
                    margin: '4px 0 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Photo indicators ─────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          right: 32,
          zIndex: 3,
          display: 'flex',
          gap: 6,
        }}
      >
        {heroPhotos.map((_, i) => (
          <button
            key={i}
            onClick={() => setPhotoIdx(i)}
            style={{
              width: 36,
              height: 3,
              borderRadius: 2,
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: i === photoIdx ? 'transparent' : 'rgba(0,0,0,0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
            aria-label={`Foto ${i + 1}`}
          >
            {i === photoIdx && (
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'var(--magenta)',
                  transformOrigin: 'left',
                  animation: 'progress-bar 5s linear forwards',
                }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
