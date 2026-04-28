'use client'

import { motion } from 'framer-motion'
import { Truck, Wrench, RefreshCcw, Users, ArrowRight, Zap } from 'lucide-react'

const services = [
  {
    icon: Truck,
    title: 'Entrega a Domicilio',
    description:
      'Envío rápido y seguro a toda Santo Domingo. Recibe tus insumos el mismo día o al día siguiente sin costo adicional en compras mayores a RD$2,000.',
    highlight: 'Mismo día',
    color: 'from-blue-500/10 to-blue-600/5',
    iconBg: 'bg-blue/15',
    iconColor: 'text-blue',
  },
  {
    icon: Wrench,
    title: 'Mantenimiento Técnico',
    description:
      'Servicio especializado de mantenimiento preventivo y correctivo para impresoras de todas las marcas. Reparamos y optimizamos tu equipo.',
    highlight: 'Profesional',
    color: 'from-orange/10 to-orange/5',
    iconBg: 'bg-orange/15',
    iconColor: 'text-orange',
  },
  {
    icon: RefreshCcw,
    title: 'Recarga de Cartuchos',
    description:
      'Servicio de recarga profesional para cartuchos de tinta y tóner. Calidad garantizada a una fracción del costo. Ahorra hasta un 70% en insumos.',
    highlight: 'Ahorra 70%',
    color: 'from-pink/10 to-pink2/5',
    iconBg: 'bg-pink/15',
    iconColor: 'text-pink',
  },
  {
    icon: Users,
    title: 'Asesoría Personalizada',
    description:
      'Nuestros expertos te ayudan a elegir el insumo correcto para tu impresora. Atención personalizada por WhatsApp, teléfono o en nuestra tienda.',
    highlight: 'Expertos RD',
    color: 'from-green-500/10 to-green-600/5',
    iconBg: 'bg-green-500/15',
    iconColor: 'text-green-400',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Services() {
  return (
    <section id="servicios" className="bg-[#0D0D0D] py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-5 blur-[100px]"
          style={{ background: 'radial-gradient(ellipse, #E91E63 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-pink text-xs font-bold uppercase tracking-widest mb-3">
            <Zap className="w-3.5 h-3.5" />
            Lo que ofrecemos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Servicios que hacen la{' '}
            <span style={{ background: 'linear-gradient(135deg, #E91E63, #F06292)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              diferencia
            </span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Más que productos, ofrecemos soluciones completas para mantener tu impresora en óptimas condiciones.
          </p>
        </motion.div>

        {/* Service cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className={`group relative bg-gradient-to-br ${service.color} border border-white/10 hover:border-pink/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-pink/10 hover:-translate-y-1`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${service.iconColor}`} />
                </div>

                {/* Highlight badge */}
                <div className="inline-flex items-center gap-1 bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3">
                  <span className="w-1 h-1 bg-pink rounded-full" />
                  {service.highlight}
                </div>

                {/* Text */}
                <h3 className="text-white font-bold text-lg mb-3 leading-tight group-hover:text-pink transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Learn more */}
                <button className="flex items-center gap-1.5 text-pink/70 hover:text-pink text-xs font-semibold transition-colors group/btn">
                  Saber más
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                {/* Corner decoration */}
                <div className="absolute top-4 right-4 w-8 h-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-pink/15 via-pink/10 to-pink2/15 border border-pink/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-white font-bold text-xl mb-1">
              ¿Necesitas atención especializada?
            </h3>
            <p className="text-white/50 text-sm">
              Contáctanos y un experto te atenderá de inmediato.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <a
              href="https://wa.me/18095550100"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-green-500/20"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="tel:+18095550100"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Llamar
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
