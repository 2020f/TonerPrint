'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Heart, CheckCircle, Users, Award, Package, Clock } from 'lucide-react'

const stats = [
  { value: '5,000+', label: 'Clientes', icon: Users },
  { value: '10+', label: 'Años exp.', icon: Clock },
  { value: '100+', label: 'Productos', icon: Package },
  { value: '99%', label: 'Satisfacción', icon: Award },
]

const values = [
  'Productos 100% originales y certificados',
  'Precios competitivos sin sacrificar calidad',
  'Atención personalizada y asesoría técnica',
  'Entrega rápida en todo Santo Domingo',
  'Garantía en todos nuestros productos',
  'Soporte post-venta dedicado',
]

export default function About() {
  return (
    <section id="nosotros" className="bg-white py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink/3 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink2/3 rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-pink text-xs font-bold uppercase tracking-widest mb-3">
            <Heart className="w-3.5 h-3.5" />
            Sobre Nosotros
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
            Más de una década siendo{' '}
            <span style={{ background: 'linear-gradient(135deg, #E91E63, #F06292)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              tu aliado
            </span>
          </h2>
          <p className="text-dark/55 text-lg max-w-xl mx-auto">
            TonerPrint nació con la misión de ofrecer insumos de impresión auténticos a precios accesibles para todos los dominicanos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Pink gradient card with stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative bg-gradient-to-br from-pink to-pink2 rounded-3xl p-8 overflow-hidden shadow-2xl shadow-pink/25">
              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />

              <div className="relative z-10">
                {/* Header */}
                <div className="mb-8">
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
                    TonerPrint en números
                  </p>
                  <h3 className="text-white font-bold text-2xl leading-tight">
                    Líderes en insumos de impresión en República Dominicana
                  </h3>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {stats.map(({ value, label, icon: Icon }) => (
                    <div
                      key={label}
                      className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 hover:bg-white/15 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-white/70 mb-3" />
                      <p className="text-white font-bold text-3xl leading-none">{value}</p>
                      <p className="text-white/65 text-xs mt-1 font-medium">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Values list */}
                <div className="space-y-2.5">
                  {values.slice(0, 4).map((val) => (
                    <div key={val} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-white/80 flex-shrink-0 mt-0.5" />
                      <span className="text-white/75 text-sm">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Extra cards below */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-[#0D0D0D] rounded-2xl p-5">
                <p className="text-pink font-bold text-2xl">RD$180</p>
                <p className="text-white/50 text-xs mt-1">Producto desde</p>
              </div>
              <div className="bg-light rounded-2xl p-5 border border-gray-100">
                <p className="text-dark font-bold text-2xl">24/7</p>
                <p className="text-dark/40 text-xs mt-1">Soporte WhatsApp</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            {/* Story */}
            <div>
              <h3 className="text-dark font-bold text-2xl mb-4">Nuestra historia</h3>
              <p className="text-dark/60 leading-relaxed mb-4">
                Fundada en 2014 en Santo Domingo, TonerPrint comenzó como una pequeña tienda especializada en tóneres HP. Con el tiempo, expandimos nuestro catálogo para incluir todas las marcas principales: Epson, Canon y Brother.
              </p>
              <p className="text-dark/60 leading-relaxed">
                Hoy somos el proveedor de confianza de miles de hogares, oficinas, colegios y empresas en toda República Dominicana. Nuestra promesa siempre ha sido la misma: productos auténticos, precios honestos y servicio excepcional.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-pink/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-pink" />
                </div>
                <div>
                  <h4 className="text-dark font-bold text-base mb-2">Misión</h4>
                  <p className="text-dark/60 text-sm leading-relaxed">
                    Proveer insumos de impresión originales y de alta calidad, accesibles para todos los dominicanos, con un servicio de atención que supere las expectativas de nuestros clientes.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-blue" />
                </div>
                <div>
                  <h4 className="text-dark font-bold text-base mb-2">Visión</h4>
                  <p className="text-dark/60 text-sm leading-relaxed">
                    Ser la tienda online de insumos de impresión más reconocida y confiable de la República Dominicana, expandiendo nuestra presencia a todo el Caribe hispanohablante.
                  </p>
                </div>
              </div>
            </div>

            {/* Remaining values */}
            <div>
              <h4 className="text-dark font-bold text-base mb-4">¿Por qué elegirnos?</h4>
              <div className="space-y-2.5">
                {values.map((val) => (
                  <div key={val} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-pink/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-pink" />
                    </div>
                    <span className="text-dark/65 text-sm">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
