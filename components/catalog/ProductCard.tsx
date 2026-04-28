'use client'

import { motion } from 'framer-motion'
import { Plus, Star } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/lib/store/cartStore'
import { useUIStore } from '@/lib/store/uiStore'
import { useToast } from '@/components/ui/ToastProvider'

interface ProductCardProps {
  product: Product
}

const badgeConfig = {
  sale: { label: '% OFERTA', className: 'bg-orange text-white' },
  hot: { label: '🔥 HOT', className: 'bg-pink text-white' },
  new: { label: '✨ NUEVO', className: 'bg-blue text-white' },
}

const brandColors: Record<string, string> = {
  hp: 'text-blue-500',
  epson: 'text-blue-600',
  canon: 'text-red-500',
  brother: 'text-gray-600',
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const openProduct = useUIStore((s) => s.openProduct)
  const { showToast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
    showToast(`${product.name} agregado al carrito`, 'success')
  }

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={() => openProduct(product)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-pink/10 border border-gray-100 overflow-hidden cursor-pointer group transition-shadow duration-300"
    >
      {/* Product image area */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-44 flex items-center justify-center overflow-hidden">
        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-lg z-10 ${badgeConfig[product.badge].className}`}>
            {badgeConfig[product.badge].label}
          </div>
        )}

        {/* Discount badge */}
        {discount && (
          <div className="absolute top-3 right-3 bg-orange text-white text-[10px] font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
            -{discount}%
          </div>
        )}

        {/* Imagen o Emoji */}
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <motion.span
            className="text-7xl select-none filter drop-shadow-md"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            role="img"
            aria-label={product.name}
          >
            {product.emoji}
          </motion.span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-pink/0 group-hover:bg-pink/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${brandColors[product.brand] || 'text-pink'}`}>
          {product.brand.toUpperCase()}
        </p>

        {/* Name */}
        <h3 className="text-dark font-semibold text-sm leading-snug mb-1.5 group-hover:text-pink transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Type */}
        <span className="inline-block bg-gray-100 text-gray-500 text-[10px] font-medium px-2 py-0.5 rounded capitalize mb-3">
          {product.type}
        </span>

        {/* Price row */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-dark leading-none">
              RD${product.price.toLocaleString('es-DO')}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                RD${product.oldPrice.toLocaleString('es-DO')}
              </span>
            )}
          </div>

          {/* Add to cart button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleAddToCart}
            className="w-9 h-9 bg-pink hover:bg-pink/90 text-white rounded-full flex items-center justify-center shadow-lg shadow-pink/30 hover:shadow-pink/50 transition-all flex-shrink-0"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
