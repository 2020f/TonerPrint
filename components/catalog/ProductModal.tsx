'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingCart, Star, Shield, Truck } from 'lucide-react'
import { useUIStore } from '@/lib/store/uiStore'
import { useCartStore } from '@/lib/store/cartStore'
import { useToast } from '@/components/ui/ToastProvider'

const badgeConfig = {
  sale: { label: '% OFERTA', className: 'bg-orange text-white' },
  hot: { label: '🔥 HOT', className: 'bg-pink text-white' },
  new: { label: '✨ NUEVO', className: 'bg-blue text-white' },
}

export default function ProductModal() {
  const { isProductModalOpen, selectedProduct, closeProduct, openCart } = useUIStore()
  const addItem = useCartStore((s) => s.addItem)
  const { showToast } = useToast()
  const [qty, setQty] = useState(1)

  const handleAddToCart = () => {
    if (!selectedProduct) return
    for (let i = 0; i < qty; i++) {
      addItem(selectedProduct)
    }
    showToast(`${qty}x ${selectedProduct.name} agregado al carrito`, 'success')
    closeProduct()
    setTimeout(() => openCart(), 300)
  }

  const handleClose = () => {
    closeProduct()
    setQty(1)
  }

  const discount = selectedProduct?.oldPrice
    ? Math.round(((selectedProduct.oldPrice - selectedProduct.price) / selectedProduct.oldPrice) * 100)
    : null

  return (
    <AnimatePresence>
      {isProductModalOpen && selectedProduct && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid sm:grid-cols-2 gap-0">
                {/* Left: Image */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-tl-3xl rounded-bl-3xl sm:rounded-tr-none rounded-tr-3xl p-10 flex flex-col items-center justify-center gap-4 relative min-h-[250px]">
                  {selectedProduct.badge && (
                    <div className={`absolute top-4 left-4 text-[10px] font-bold px-2.5 py-1 rounded-lg ${badgeConfig[selectedProduct.badge].className}`}>
                      {badgeConfig[selectedProduct.badge].label}
                    </div>
                  )}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="text-[90px] select-none"
                    role="img"
                    aria-label={selectedProduct.name}
                  >
                    {selectedProduct.emoji}
                  </motion.div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-gray-400 text-xs ml-1">(4.9)</span>
                  </div>
                  <span className="bg-white border border-gray-200 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-lg uppercase tracking-wide">
                    {selectedProduct.brand}
                  </span>
                </div>

                {/* Right: Details */}
                <div className="p-6 flex flex-col">
                  {/* Header */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-pink uppercase tracking-widest">
                      {selectedProduct.type}
                    </span>
                    <h2 className="text-dark font-bold text-xl leading-tight mt-1 pr-8">
                      {selectedProduct.name}
                    </h2>
                  </div>

                  {/* Price */}
                  <div className="flex items-end gap-3 mb-4">
                    <span className="text-3xl font-bold text-dark">
                      RD${selectedProduct.price.toLocaleString('es-DO')}
                    </span>
                    {selectedProduct.oldPrice && (
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-400 line-through">
                          RD${selectedProduct.oldPrice.toLocaleString('es-DO')}
                        </span>
                        {discount && (
                          <span className="text-xs font-bold text-orange">
                            Ahorras {discount}%
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {selectedProduct.description}
                  </p>

                  {/* Specs */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2">
                    {selectedProduct.specs.slice(0, 4).map((spec) => (
                      <div key={spec.label} className="flex justify-between items-start gap-2">
                        <span className="text-gray-500 text-xs font-medium">{spec.label}</span>
                        <span className="text-dark text-xs font-semibold text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Qty selector */}
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Cantidad</span>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-pink shadow-sm transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-dark font-bold text-sm w-6 text-center">{qty}</span>
                      <button
                        onClick={() => setQty(qty + 1)}
                        className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-gray-600 hover:text-pink shadow-sm transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-gray-400 text-xs">
                      Total: <strong className="text-dark">RD${(selectedProduct.price * qty).toLocaleString('es-DO')}</strong>
                    </span>
                  </div>

                  {/* Add to cart button */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2.5 w-full bg-pink hover:bg-pink/90 text-white py-3.5 rounded-xl font-semibold text-sm shadow-lg shadow-pink/25 transition-all"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Agregar al carrito
                  </motion.button>

                  {/* Trust badges */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Shield className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-xs">Original</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Truck className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-xs">Entrega rápida</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs">Garantía</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
