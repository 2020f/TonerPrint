'use client'

import { motion } from 'framer-motion'
import { Star, Quote, MessageCircle } from 'lucide-react'
import { testimonials } from '@/lib/data/testimonials'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Testimonials() {
  return (
    <section id="testimonios" className="bg-white py-20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #E91E63 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-pink text-xs font-bold uppercase tracking-widest mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
            Lo que dicen{' '}
            <span style={{ background: 'linear-gradient(135deg, #E91E63, #F06292)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              nuestros clientes
            </span>
          </h2>
          <p className="text-dark/55 text-lg max-w-xl mx-auto">
            Más de 5,000 clientes satisfechos en toda República Dominicana confían en TonerPrint.
          </p>

          {/* Overall rating */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-dark font-bold text-2xl">4.9</span>
            <span className="text-dark/40 text-sm">/ 5.0 basado en 500+ reseñas</span>
          </div>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-pink/8 hover:-translate-y-1 transition-all duration-300 group relative"
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote className="w-12 h-12 text-pink fill-pink" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-gray-200 fill-gray-200" />
                ))}
              </div>

              {/* Text */}
              <p className="text-dark/65 text-sm leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Divider */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink/15 to-pink2/15 border border-pink/10 flex items-center justify-center text-lg flex-shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-dark font-semibold text-sm leading-tight truncate">
                      {testimonial.name}
                    </p>
                    <p className="text-dark/40 text-xs truncate">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                  {/* Verified badge */}
                  <div className="flex-shrink-0 bg-green-50 border border-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ✓ Verificado
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-dark/40 text-sm mb-4">
            ¿Ya compraste con nosotros? Comparte tu experiencia
          </p>
          <a
            href="https://wa.me/18095550100?text=Hola%2C%20quisiera%20dejar%20mi%20opinión%20sobre%20TonerPrint"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0D0D0D] hover:bg-dark text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-lg"
          >
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            Dejar una reseña
          </a>
        </motion.div>
      </div>
    </section>
  )
}
