'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, MessageCircle, Mail, Clock, Send, CheckCircle } from 'lucide-react'

const contactItems = [
  {
    icon: MapPin,
    label: 'Dirección',
    value: 'Av. Abraham Lincoln 1002, Piantini\nSanto Domingo, República Dominicana',
    href: 'https://maps.google.com/?q=Av+Abraham+Lincoln+1002+Piantini+Santo+Domingo',
    color: 'bg-pink/15 text-pink',
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '(809) 555-0100',
    href: 'tel:+18095550100',
    color: 'bg-blue/15 text-blue',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+1 (809) 555-0100\nRespuesta inmediata',
    href: 'https://wa.me/18095550100',
    color: 'bg-green-500/15 text-green-400',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'ventas@tonerprint.com.do',
    href: 'mailto:ventas@tonerprint.com.do',
    color: 'bg-orange/15 text-orange',
  },
  {
    icon: Clock,
    label: 'Horario',
    value: 'Lunes–Viernes: 8AM–6PM\nSábado: 9AM–3PM',
    href: '#',
    color: 'bg-purple-500/15 text-purple-400',
  },
]

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <section id="contacto" className="bg-[#0D0D0D] py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-5 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #E91E63 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-0 left-0 w-[300px] h-[300px] opacity-3 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #4FC3F7 0%, transparent 70%)' }}
        />
      </div>

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
            <Mail className="w-3.5 h-3.5" />
            Contáctanos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Tienes alguna{' '}
            <span style={{ background: 'linear-gradient(135deg, #E91E63, #F06292)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              pregunta?
            </span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto">
            Estamos listos para ayudarte. Escríbenos, llámanos o visítanos en nuestra tienda.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Contact info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Contact items */}
            <div className="space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon
                const lines = item.value.split('\n')
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 bg-white/5 hover:bg-white/8 border border-white/8 hover:border-white/15 rounded-2xl p-4 transition-all group"
                  >
                    <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-1">
                        {item.label}
                      </p>
                      {lines.map((line, i) => (
                        <p key={i} className="text-white/80 text-sm font-medium leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-52 bg-white/5 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.5!2d-69.9359!3d18.4701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI4JzEyLjQiTiA2OcKwNTYnMDkuMiJX!5e0!3m2!1ses!2sdo!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación TonerPrint - Piantini, Santo Domingo"
              />
              <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl" />
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-7">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/15 rounded-full flex items-center justify-center mb-5">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-white font-bold text-2xl mb-3">¡Mensaje enviado!</h3>
                  <p className="text-white/50 text-sm mb-6 max-w-xs">
                    Hemos recibido tu mensaje. Te responderemos en menos de 24 horas.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormState({ name: '', email: '', phone: '', subject: '', message: '' })
                    }}
                    className="bg-pink text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-pink/90 transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-white font-bold text-xl mb-6">Envíanos un mensaje</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/50 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="Tu nombre completo"
                          className="w-full bg-white/8 border border-white/10 text-white placeholder-white/25 px-4 py-3 rounded-xl text-sm focus:border-pink/50 focus:bg-white/12 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-white/50 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          placeholder="(809) 000-0000"
                          className="w-full bg-white/8 border border-white/10 text-white placeholder-white/25 px-4 py-3 rounded-xl text-sm focus:border-pink/50 focus:bg-white/12 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-white/50 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="w-full bg-white/8 border border-white/10 text-white placeholder-white/25 px-4 py-3 rounded-xl text-sm focus:border-pink/50 focus:bg-white/12 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-white/50 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                        Asunto
                      </label>
                      <select
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        className="w-full bg-white/8 border border-white/10 text-white px-4 py-3 rounded-xl text-sm focus:border-pink/50 transition-all appearance-none"
                        style={{ color: formState.subject ? 'white' : 'rgba(255,255,255,0.25)' }}
                      >
                        <option value="" disabled>Selecciona un asunto</option>
                        <option value="cotizacion">Solicitar cotización</option>
                        <option value="consulta">Consulta de producto</option>
                        <option value="soporte">Soporte técnico</option>
                        <option value="volumen">Compra por volumen</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-white/50 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                        Mensaje *
                      </label>
                      <textarea
                        name="message"
                        required
                        value={formState.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Cuéntanos en qué te podemos ayudar..."
                        className="w-full bg-white/8 border border-white/10 text-white placeholder-white/25 px-4 py-3 rounded-xl text-sm focus:border-pink/50 focus:bg-white/12 transition-all resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      className="flex items-center justify-center gap-2.5 w-full bg-pink hover:bg-pink/90 disabled:bg-pink/60 text-white py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-pink/20"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Enviar mensaje
                        </>
                      )}
                    </motion.button>

                    <p className="text-white/25 text-xs text-center">
                      También puedes escribirnos por{' '}
                      <a
                        href="https://wa.me/18095550100"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300"
                      >
                        WhatsApp
                      </a>{' '}
                      para respuesta inmediata.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
