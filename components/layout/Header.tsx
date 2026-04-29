'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Search, Menu, X, Phone, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useCartStore } from '@/lib/store/cartStore'
import { useUIStore } from '@/lib/store/uiStore'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const itemCount = useCartStore((s) => s.itemCount())
  const toggleCart = useUIStore((s) => s.toggleCart)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus()
    }
  }, [searchOpen])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      const catalogSection = document.querySelector('#catalogo')
      if (catalogSection) catalogSection.scrollIntoView({ behavior: 'smooth' })
      // Dispatch custom event to filter catalog
      window.dispatchEvent(new CustomEvent('catalog-search', { detail: searchValue }))
    }
    setSearchOpen(false)
    setSearchValue('')
  }

  return (
    <>
      {/* Top info bar */}
      <div className="bg-pink text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        <span className="hidden sm:inline">🎉 Envío GRATIS en compras mayores a RD$2,000 • </span>
        <a href="tel:+18095550100" className="hover:underline inline-flex items-center gap-1">
          <Phone className="w-3 h-3" /> 809-555-0100
        </a>
        <span className="mx-2 opacity-50">|</span>
        <span>Lunes–Sábado 8AM–6PM</span>
      </div>

      {/* Main header */}
      <header
        className={`fixed top-7 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0D0D0D]/95 backdrop-blur-md shadow-xl shadow-black/30'
            : 'bg-[#0D0D0D]/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo */}
            <a
              href="#inicio"
              onClick={(e) => { e.preventDefault(); handleNavClick('#inicio') }}
              className="flex items-center group"
            >
              <div
                className="relative px-4 py-2 rounded-2xl group-hover:scale-105 transition-transform"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,1) 40%, rgba(255,255,255,0.5) 70%, transparent 100%)',
                }}
              >
                <Image
                  src="/logo.png"
                  alt="TonerPrint"
                  width={160}
                  height={60}
                  className="h-12 w-auto object-contain relative z-10"
                  priority
                />
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className="text-white/70 hover:text-white hover:bg-white/10 px-3.5 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart button */}
              <button
                onClick={toggleCart}
                className="relative flex items-center gap-2 bg-pink hover:bg-pink/90 text-white px-3.5 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-pink/30"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Carrito</span>
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key={itemCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                      className="absolute -top-1.5 -right-1.5 bg-orange text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md"
                    >
                      {itemCount > 9 ? '9+' : itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
                aria-label="Menú"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar expansion */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/10"
            >
              <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Buscar tóneres, tintas, impresoras..."
                    className="w-full bg-white/10 text-white placeholder-white/40 pl-11 pr-4 py-3 rounded-xl text-sm border border-white/10 focus:border-pink/60 focus:bg-white/15 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-pink text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-pink/90 transition-colors"
                  >
                    Buscar
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-[#0D0D0D] border-l border-white/10 flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div
                  className="px-4 py-2 rounded-2xl"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,1) 40%, rgba(255,255,255,0.5) 70%, transparent 100%)' }}
                >
                  <Image
                    src="/logo.png"
                    alt="TonerPrint"
                    width={140}
                    height={52}
                    className="h-11 w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-4 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-3.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between"
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4 -rotate-90 opacity-40" />
                  </motion.a>
                ))}
              </nav>
              <div className="p-4 border-t border-white/10">
                <a
                  href="https://wa.me/18095550100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#20bd5a] transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-[calc(1.75rem+68px)]" />
    </>
  )
}
