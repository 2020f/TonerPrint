'use client'

import { motion } from 'framer-motion'
import { ShoppingBag, Phone, Star, Truck, Shield, Headphones, Award } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const benefits = [
  { icon: Truck, label: 'Envío rápido', sub: 'Santo Domingo' },
  { icon: Shield, label: '100% Originales', sub: 'Garantizados' },
  { icon: Headphones, label: 'Soporte 24/7', sub: 'WhatsApp' },
  { icon: Award, label: '+5 años', sub: 'De experiencia' },
]

const stats = [
  { value: '5,000+', label: 'Clientes Satisfechos' },
  { value: '99%', label: 'Productos Originales' },
]

export default function Hero() {
  const handleCtaClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0D0D0D]"
    >
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#1a0a11] to-[#0D0D0D]" />
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #E91E63 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #F06292 0%, transparent 70%)' }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            {/* Badge pill */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-pink/10 border border-pink/20 text-pink px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-pink rounded-full animate-pulse" />
                #1 en República Dominicana
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            >
              Insumos de{' '}
              <span
                className="relative inline-block"
                style={{
                  background: 'linear-gradient(135deg, #E91E63, #F06292)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                impresión
              </span>{' '}
              <br />
              al mejor{' '}
              <span className="relative">
                precio
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-pink/60 rounded-full origin-left"
                />
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Tóneres, tintas e impresoras <strong className="text-white/80">100% originales</strong> de HP, Epson, Canon y Brother. Envío a toda Santo Domingo con los mejores precios del mercado.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => handleCtaClick('#catalogo')}
                className="flex items-center gap-2.5 bg-pink hover:bg-pink/90 text-white px-7 py-3.5 rounded-xl font-semibold text-sm shadow-xl shadow-pink/25 hover:shadow-pink/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <ShoppingBag className="w-4 h-4" />
                Ver Catálogo
              </button>
              <a
                href="tel:+18095550100"
                className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-sm"
              >
                <Phone className="w-4 h-4" />
                Llamar ahora
              </a>
            </motion.div>

            {/* Benefits grid */}
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {benefits.map(({ icon: Icon, label, sub }) => (
                  <div
                    key={label}
                    className="flex flex-col items-start gap-2 bg-white/5 border border-white/10 rounded-xl p-3.5 hover:bg-white/8 hover:border-pink/20 transition-all"
                  >
                    <div className="w-8 h-8 bg-pink/15 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-pink" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold leading-tight">{label}</p>
                      <p className="text-white/40 text-[10px] mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Visual display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Main card */}
            <div className="relative w-full max-w-sm mx-auto">
              <div
                className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/15 rounded-3xl p-10 flex flex-col items-center justify-center gap-6 overflow-hidden"
                style={{ boxShadow: '0 25px 60px rgba(233,30,99,0.15), 0 0 0 1px rgba(255,255,255,0.05)' }}
              >
                {/* Background glow inside card */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink/5 via-transparent to-transparent pointer-events-none" />

                {/* Printer emoji */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="text-[100px] select-none filter drop-shadow-2xl"
                  role="img"
                  aria-label="Impresora"
                >
                  🖨️
                </motion.div>

                {/* Brand logos row */}
                <div className="flex items-center gap-4">
                  {['HP', 'Epson', 'Canon', 'Brother'].map((brand) => (
                    <div
                      key={brand}
                      className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-white/60 text-xs font-bold uppercase tracking-wider hover:bg-pink/10 hover:text-pink hover:border-pink/30 transition-all"
                    >
                      {brand}
                    </div>
                  ))}
                </div>

                {/* Rating row */}
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-white/50 text-xs ml-2">5.0 · 500+ reseñas</span>
                </div>
              </div>

              {/* Floating stat card 1 */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -left-10 top-8 bg-[#0D0D0D] border border-white/15 rounded-2xl px-4 py-3 shadow-2xl"
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)' }}
              >
                <p className="text-2xl font-bold text-white">5,000+</p>
                <p className="text-white/45 text-xs font-medium">Clientes satisfechos</p>
                <div className="flex gap-0.5 mt-1.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-pink rounded-full" />
                  ))}
                </div>
              </motion.div>

              {/* Floating stat card 2 */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1.2 }}
                className="absolute -right-8 bottom-12 bg-gradient-to-br from-pink to-pink2 rounded-2xl px-4 py-3 shadow-2xl"
                style={{ boxShadow: '0 10px 30px rgba(233,30,99,0.4)' }}
              >
                <p className="text-2xl font-bold text-white">99%</p>
                <p className="text-white/80 text-xs font-medium">Originales garantizados</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Shield className="w-3 h-3 text-white/70" />
                  <span className="text-white/70 text-[10px]">Certificados</span>
                </div>
              </motion.div>

              {/* Floating badge: envío gratis */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 2 }}
                className="absolute -top-4 right-6 bg-[#1a1a1a] border border-white/10 rounded-xl px-3 py-2 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-white text-xs font-semibold">Envío GRATIS</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0D0D0D] to-transparent pointer-events-none" />
    </section>
  )
}
