'use client'

import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react'
import Image from 'next/image'

const footerLinks = {
  productos: [
    { label: 'Tóneres HP', href: '#catalogo' },
    { label: 'Tóneres Brother', href: '#catalogo' },
    { label: 'Tintas Epson', href: '#catalogo' },
    { label: 'Tintas Canon', href: '#catalogo' },
    { label: 'Impresoras', href: '#catalogo' },
    { label: 'Accesorios', href: '#catalogo' },
  ],
  servicios: [
    { label: 'Asesoría técnica', href: '#servicios' },
    { label: 'Entrega a domicilio', href: '#servicios' },
    { label: 'Recarga de cartuchos', href: '#servicios' },
    { label: 'Mantenimiento', href: '#servicios' },
    { label: 'Venta por volumen', href: '#servicios' },
    { label: 'Garantía de productos', href: '#servicios' },
  ],
  empresa: [
    { label: 'Sobre nosotros', href: '#nosotros' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Contáctanos', href: '#contacto' },
    { label: 'Política de privacidad', href: '#' },
    { label: 'Términos y condiciones', href: '#' },
  ],
}

export default function Footer() {
  const handleNavClick = (href: string) => {
    if (href === '#') return
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#070707] text-white border-t border-white/5">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <div className="inline-block bg-white rounded-2xl px-3 py-2 shadow-lg">
                <Image
                  src="/logo.png"
                  alt="TonerPrint"
                  width={140}
                  height={52}
                  className="h-11 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Tu tienda de confianza para insumos de impresión en Santo Domingo. Tóneres, tintas e impresoras originales a los mejores precios del mercado dominicano.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pink/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-pink" />
                </div>
                <p className="text-white/50 text-xs leading-relaxed">
                  Av. Abraham Lincoln 1002, Piantini<br />Santo Domingo, República Dominicana
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-pink" />
                </div>
                <a href="tel:+18095550100" className="text-white/50 hover:text-pink text-xs transition-colors">
                  (809) 555-0100
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 text-pink" />
                </div>
                <a href="mailto:ventas@tonerprint.com.do" className="text-white/50 hover:text-pink text-xs transition-colors">
                  ventas@tonerprint.com.do
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-3.5 h-3.5 text-pink" />
                </div>
                <p className="text-white/50 text-xs">Lun–Sáb: 8:00 AM – 6:00 PM</p>
              </div>
            </div>

            {/* Social media */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 hover:bg-pink/20 hover:text-pink rounded-lg flex items-center justify-center text-white/40 transition-all border border-white/5 hover:border-pink/30"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products column */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 pb-3 border-b border-white/10">
              Productos
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.productos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className="text-white/45 hover:text-pink text-xs transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 pb-3 border-b border-white/10">
              Servicios
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className="text-white/45 hover:text-pink text-xs transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 pb-3 border-b border-white/10">
              Empresa
            </h3>
            <ul className="space-y-2.5 mb-8">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                    className="text-white/45 hover:text-pink text-xs transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-semibold text-xs mb-3 uppercase tracking-wider">
              Boletín de ofertas
            </h4>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs px-3 py-2.5 rounded-lg focus:border-pink/50 transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-pink hover:bg-pink/90 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Payment methods + copyright */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} TonerPrint. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
            <span className="text-white/25 text-xs w-full sm:w-auto text-center sm:text-left sm:mr-1">Pagos:</span>
            {['💳 Visa', '💳 Mastercard', '🏦 Transferencia', '🚚 Contra entrega'].map((m) => (
              <span key={m} className="text-white/30 text-xs bg-white/5 px-2.5 py-1 rounded border border-white/5">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
