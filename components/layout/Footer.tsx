'use client'

import Image from 'next/image'

const footerLinks = {
  productos: ['Tóners', 'Tintas', 'Impresoras', 'Accesorios', 'Recargas'],
  empresa:   ['Nosotros', 'Servicios', 'Contacto', 'Garantías'],
}

const contactInfo = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006.72 6.72l1.48-1.35a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
    ),
    text: '(809) 555-0100',
    href: 'tel:+18095550100',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    ),
    text: 'ventas@tonerprint.com.do',
    href: 'mailto:ventas@tonerprint.com.do',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
    text: 'Av. Abraham Lincoln 1002, Piantini, Santo Domingo',
    href: '#',
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
    text: 'Lun–Sáb: 8:00 AM – 6:00 PM',
    href: '#',
  },
]

const socialLinks = [
  {
    label: 'Facebook',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    ),
  },
  {
    label: 'WhatsApp',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    ),
    href: 'https://wa.me/18095550100',
  },
]

export default function Footer() {
  const handleNavClick = (href: string) => {
    if (href === '#') return
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const sectionHref = (label: string) => {
    const map: Record<string, string> = {
      'Tóners': '#catalogo', 'Tintas': '#catalogo', 'Impresoras': '#catalogo',
      'Accesorios': '#catalogo', 'Recargas': '#catalogo',
      'Nosotros': '#nosotros', 'Servicios': '#servicios',
      'Contacto': '#contacto', 'Garantías': '#',
    }
    return map[label] || '#'
  }

  return (
    <footer style={{ background: 'var(--ink)', color: '#fff' }}>
      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '60px 28px 40px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 40,
        }}
        className="footer-grid"
      >
        {/* Column 1 — Brand */}
        <div>
          {/* Logo real */}
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.96)',
                borderRadius: 12,
                padding: '8px 22px',
                boxShadow:
                  '0 0 0 1px rgba(236,61,138,0.2), 0 0 24px rgba(236,61,138,0.25), 0 6px 18px rgba(0,0,0,0.3)',
              }}
            >
              <Image
                src="/logo.png"
                alt="TonerPrint Technology"
                width={180}
                height={66}
                style={{ display: 'block', height: 'auto', width: 160 }}
              />
            </div>
          </div>

          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 300, marginBottom: 20 }}>
            Distribuidor #1 de insumos de impresión en República Dominicana. Tóneres, tintas e impresoras originales a los mejores precios del mercado dominicano.
          </p>

          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {contactInfo.map((item, i) => (
              <a
                key={i}
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  fontSize: 12,
                  lineHeight: 1.5,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--magenta)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
              >
                <span style={{ marginTop: 2, flexShrink: 0, color: 'var(--magenta)', opacity: 0.7 }}>{item.icon}</span>
                {item.text}
              </a>
            ))}
          </div>

          {/* Social */}
          <div style={{ display: 'flex', gap: 8 }}>
            {socialLinks.map(s => (
              <a
                key={s.label}
                href={s.href || '#'}
                target={s.href?.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: 34, height: 34,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--magenta-soft)'
                  e.currentTarget.style.borderColor = 'var(--magenta)'
                  e.currentTarget.style.color = 'var(--magenta)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Productos */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            Productos
          </h4>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {footerLinks.productos.map(label => (
              <li key={label}>
                <a
                  href={sectionHref(label)}
                  onClick={e => { e.preventDefault(); handleNavClick(sectionHref(label)) }}
                  style={{
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    fontSize: 13,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--magenta)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Empresa */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            Empresa
          </h4>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {footerLinks.empresa.map(label => (
              <li key={label}>
                <a
                  href={sectionHref(label)}
                  onClick={e => { e.preventDefault(); handleNavClick(sectionHref(label)) }}
                  style={{
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    fontSize: 13,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--magenta)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contacto (redundant with col 1 but following spec grid) */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            Contacto
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {contactInfo.map((item, i) => (
              <a
                key={i}
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 8,
                  color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  fontSize: 12,
                  lineHeight: 1.5,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
              >
                <span style={{ marginTop: 2, flexShrink: 0, color: 'var(--magenta)', opacity: 0.7 }}>{item.icon}</span>
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            © {new Date().getFullYear()} TonerPrint. Todos los derechos reservados.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            Diseñado con cariño en Santo Domingo 🇩🇴
          </p>
        </div>
      </div>

      <style>{`
        .footer-grid {
          grid-template-columns: 2fr 1fr 1fr 1fr !important;
        }
        @media (max-width: 1100px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
