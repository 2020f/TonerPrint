'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingCart, Search, Menu, X, Heart } from 'lucide-react'
import Image from 'next/image'
import { useCartStore } from '@/lib/store/cartStore'
import { useUIStore } from '@/lib/store/uiStore'

const navLinks = [
  { label: 'Inicio',    href: '#inicio' },
  { label: 'Catálogo',  href: '#catalogo' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros',  href: '#nosotros' },
  { label: 'Contacto',  href: '#contacto' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [activeLink, setActiveLink]   = useState('#inicio')
  const searchRef = useRef<HTMLInputElement>(null)

  const itemCount  = useCartStore((s) => s.itemCount())
  const toggleCart = useUIStore((s) => s.toggleCart)

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    setActiveLink(href)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      const el = document.querySelector('#catalogo')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      window.dispatchEvent(new CustomEvent('catalog-search', { detail: searchValue }))
    }
    setSearchOpen(false)
    setSearchValue('')
  }

  return (
    <>
      {/* ── TOP BAR — oculto en mobile ───────────────────────────────── */}
      <div className="hidden sm:block" style={{ background: '#2D2930', padding: '7px 0' }}>
        <div
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          {/* Izquierda: promo */}
          <span style={{ display: 'flex', alignItems: 'center', gap: 7, color: '#fff', fontSize: 12.5, fontWeight: 400 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            Envío GRATIS en compras desde RD$2,000
          </span>

          {/* Derecha: contacto */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <a
              href="tel:+18095550100"
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff', fontSize: 12.5, fontWeight: 400, textDecoration: 'none' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006.72 6.72l1.48-1.35a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              809-555-0100
            </a>
            <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.25)' }} />
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff', fontSize: 12.5 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Lunes–Sábado · 8AM–6PM
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER ─────────────────────────────────────────────── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: '#ffffff',
          borderBottom: '2px solid #E91E63',
          overflow: 'visible',
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            height: 64,
            overflow: 'visible',
          }}
        >

          {/* ── Logo — sobresale del nav bar ──────────────────────── */}
          <a
            href="#inicio"
            onClick={(e) => { e.preventDefault(); handleNavClick('#inicio') }}
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              flexShrink: 0,
              transition: 'transform 0.25s, opacity 0.25s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'
              ;(e.currentTarget as HTMLElement).style.opacity = '0.9'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
              ;(e.currentTarget as HTMLElement).style.opacity = '1'
            }}
          >
            <Image
              src="/logo.png"
              alt="TonerPrint Technology"
              width={260}
              height={96}
              priority
              className="header-logo-resp"
              style={{ display: 'block', width: 'auto' }}
            />
          </a>

          {/* ── Nav central ───────────────────────────────────────── */}
          <nav
            className="hidden lg:flex"
            style={{ alignItems: 'center', gap: 2 }}
          >
            {navLinks.map((link) => {
              const isActive = activeLink === link.href
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  style={{
                    position: 'relative',
                    color: isActive ? '#E91E63' : '#2D2930',
                    fontWeight: 500,
                    fontSize: 14,
                    padding: '8px 14px',
                    borderRadius: 6,
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#E91E63'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#2D2930'
                  }}
                >
                  {link.label}
                  {/* Línea subrayado activo */}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 2, left: 14, right: 14,
                        height: 2,
                        background: '#E91E63',
                        borderRadius: 2,
                      }}
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* ── Acciones derecha ──────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>

            {/* Búsqueda */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{
                width: 36, height: 36,
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                color: '#2D2930',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#E91E63'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#2D2930'}
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>

            {/* Favoritos */}
            <button
              style={{
                width: 36, height: 36,
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                color: '#2D2930',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              className="hidden sm:flex"
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#E91E63'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#2D2930'}
              aria-label="Favoritos"
            >
              <Heart size={20} />
            </button>

            {/* Carrito */}
            <button
              onClick={toggleCart}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                background: '#E91E63',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '9px 18px',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#c91f6e'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#E91E63'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
              aria-label="Ver carrito"
            >
              <ShoppingCart size={17} />
              <span className="hidden sm:inline">Carrito</span>
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    style={{
                      position: 'absolute',
                      top: -7, right: -7,
                      background: '#f0b921',
                      color: '#1a1422',
                      fontSize: 10,
                      fontWeight: 700,
                      width: 18, height: 18,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburguesa mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden"
              style={{
                background: 'transparent',
                border: '1.5px solid #e0d8e8',
                color: '#2D2930',
                borderRadius: 8,
                padding: 6,
                cursor: 'pointer',
                display: 'flex',
              }}
              aria-label="Menú"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Barra de búsqueda expansible ──────────────────────────── */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden', borderTop: '1px solid #f0eaf5' }}
            >
              <form
                onSubmit={handleSearch}
                style={{ maxWidth: 1320, margin: '0 auto', padding: '10px 28px' }}
              >
                <div style={{ position: 'relative' }}>
                  <Search
                    size={16}
                    style={{
                      position: 'absolute', left: 14, top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9a93a4',
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Buscar tóneres, tintas, impresoras..."
                    style={{
                      width: '100%',
                      background: '#f7f5f9',
                      border: '1px solid #ece8ef',
                      borderRadius: 10,
                      color: '#1a1422',
                      fontSize: 14,
                      padding: '10px 80px 10px 42px',
                      outline: 'none',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = '#E91E63'
                      e.target.style.background = '#fff'
                      e.target.style.boxShadow = '0 0 0 3px rgba(233,30,99,0.1)'
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = '#ece8ef'
                      e.target.style.background = '#f7f5f9'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      position: 'absolute', right: 10, top: '50%',
                      transform: 'translateY(-50%)',
                      background: '#E91E63',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 7,
                      padding: '6px 14px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Buscar
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Menú mobile ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ position: 'fixed', inset: 0, zIndex: 60 }}
          >
            <div
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />
            <div
              style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: 280,
                background: '#fff',
                borderLeft: '1px solid #ece8ef',
                display: 'flex', flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderBottom: '1px solid #ece8ef',
                }}
              >
                <div style={{ background: '#fff' }}>
                  <Image
                    src="/logo.png"
                    alt="TonerPrint"
                    width={150}
                    height={56}
                    style={{ display: 'block', height: 'auto' }}
                  />
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#6b6577', cursor: 'pointer', padding: 4 }}
                >
                  <X size={20} />
                </button>
              </div>

              <nav style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {navLinks.map((link, i) => {
                  const isActive = activeLink === link.href
                  return (
                    <motion.a
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                      style={{
                        display: 'block',
                        color: isActive ? '#E91E63' : '#2D2930',
                        textDecoration: 'none',
                        padding: '12px 16px',
                        borderRadius: 8,
                        fontSize: 15,
                        fontWeight: isActive ? 600 : 500,
                        background: isActive ? 'rgba(233,30,99,0.06)' : 'transparent',
                        borderLeft: isActive ? '3px solid #E91E63' : '3px solid transparent',
                        transition: 'all 0.15s',
                      }}
                    >
                      {link.label}
                    </motion.a>
                  )
                })}
              </nav>

              <div style={{ padding: 16, borderTop: '1px solid #ece8ef' }}>
                <a
                  href="https://wa.me/18095550100"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    width: '100%', background: '#25d366', color: '#fff',
                    padding: '12px', borderRadius: 10, fontWeight: 600, fontSize: 14,
                    textDecoration: 'none',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
