'use client'

import { motion } from 'framer-motion'
import { ProductBrand, ProductType } from '@/types'

interface FilterBarProps {
  activeBrand: ProductBrand | 'all'
  activeType: ProductType | 'all'
  onBrandChange: (brand: ProductBrand | 'all') => void
  onTypeChange: (type: ProductType | 'all') => void
}

const brands: { value: ProductBrand | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'Todos', emoji: '🌐' },
  { value: 'hp', label: 'HP', emoji: '🔷' },
  { value: 'epson', label: 'Epson', emoji: '🟦' },
  { value: 'canon', label: 'Canon', emoji: '🔴' },
  { value: 'brother', label: 'Brother', emoji: '⬛' },
]

const types: { value: ProductType | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'Todo tipo', emoji: '📦' },
  { value: 'toner', label: 'Tóneres', emoji: '🖨️' },
  { value: 'tinta', label: 'Tintas', emoji: '🎨' },
  { value: 'impresora', label: 'Impresoras', emoji: '🖥️' },
  { value: 'accesorio', label: 'Accesorios', emoji: '🔧' },
]

export default function FilterBar({ activeBrand, activeType, onBrandChange, onTypeChange }: FilterBarProps) {
  return (
    <div className="space-y-4">
      {/* Brand filters */}
      <div>
        <p className="text-dark/60 text-xs font-semibold uppercase tracking-wider mb-2.5">Marca</p>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => {
            const isActive = activeBrand === brand.value
            return (
              <motion.button
                key={brand.value}
                whileTap={{ scale: 0.95 }}
                onClick={() => onBrandChange(brand.value)}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isActive
                    ? 'bg-pink text-white border-pink shadow-lg shadow-pink/25'
                    : 'bg-white text-dark/60 border-gray-200 hover:border-pink/40 hover:text-pink hover:bg-pink/5'
                }`}
              >
                <span>{brand.emoji}</span>
                <span>{brand.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="brand-indicator"
                    className="absolute inset-0 rounded-xl bg-pink"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Type filters */}
      <div>
        <p className="text-dark/60 text-xs font-semibold uppercase tracking-wider mb-2.5">Tipo</p>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => {
            const isActive = activeType === type.value
            return (
              <motion.button
                key={type.value}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTypeChange(type.value)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isActive
                    ? 'bg-pink text-white border-pink shadow-lg shadow-pink/25'
                    : 'bg-white text-dark/60 border-gray-200 hover:border-pink/40 hover:text-pink hover:bg-pink/5'
                }`}
              >
                <span>{type.emoji}</span>
                <span>{type.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
