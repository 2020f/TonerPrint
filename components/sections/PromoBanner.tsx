'use client'

import { motion } from 'framer-motion'
import { Tag, Truck, Shield, Zap, Award, Clock } from 'lucide-react'

const promos = [
  { icon: Tag, text: '🔥 OFERTA: Tóner HP 85A a RD$1,850 — Ahorra RD$350' },
  { icon: Truck, text: '🚚 Envío GRATIS en compras mayores a RD$2,000' },
  { icon: Shield, text: '✅ 100% productos originales con garantía de fabricante' },
  { icon: Zap, text: '⚡ Entrega el mismo día en Santo Domingo' },
  { icon: Award, text: '🏆 +5 años siendo el proveedor #1 de insumos en RD' },
  { icon: Clock, text: '🕐 Atención al cliente Lunes–Sábado 8AM–6PM' },
  { icon: Tag, text: '💰 Pack Epson T664 x4 colores a solo RD$890' },
  { icon: Shield, text: '🎁 Descuentos especiales para compras por volumen' },
]

// Duplicate for seamless loop
const allPromos = [...promos, ...promos]

export default function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-[#1a0a11] via-[#0D0D0D] to-[#1a0a11] border-y border-pink/10 overflow-hidden py-3.5 relative">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10 pointer-events-none" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
        className="flex items-center gap-0 whitespace-nowrap"
      >
        {allPromos.map((promo, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-white/65 text-xs font-medium px-6"
          >
            <promo.icon className="w-3 h-3 text-pink flex-shrink-0" />
            {promo.text}
            <span className="text-pink/30 ml-4">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
