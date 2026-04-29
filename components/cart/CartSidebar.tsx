'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Package } from 'lucide-react'
import { useCartStore } from '@/lib/store/cartStore'
import { useUIStore } from '@/lib/store/uiStore'

export default function CartSidebar() {
  const { isCartOpen, closeCart, openCheckout } = useUIStore()
  const { items, removeItem, updateQty, total, itemCount, clearCart } = useCartStore()

  const cartTotal = total()
  const count = itemCount()
  const freeShippingThreshold = 2000
  const remainingForFree = freeShippingThreshold - cartTotal

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-white z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-pink/10 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-pink" />
                </div>
                <div>
                  <h2 className="text-dark font-bold text-base leading-tight">Tu Carrito</h2>
                  <p className="text-dark/40 text-xs">
                    {count === 0
                      ? 'Vacío'
                      : `${count} ${count === 1 ? 'producto' : 'productos'}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-gray-400 hover:text-red-500 text-xs flex items-center gap-1 hover:bg-red-50 px-2 py-1.5 rounded-lg transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                    Limpiar
                  </button>
                )}
                <button
                  onClick={closeCart}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Free shipping progress */}
            {items.length > 0 && (
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex-shrink-0">
                {remainingForFree > 0 ? (
                  <div>
                    <p className="text-dark/60 text-xs mb-1.5">
                      Agrega{' '}
                      <span className="font-bold text-pink">
                        RD${remainingForFree.toLocaleString('es-DO')}
                      </span>{' '}
                      más para envío gratis
                    </p>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((cartTotal / freeShippingThreshold) * 100, 100)}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-pink rounded-full"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-green-600 text-xs font-semibold flex items-center gap-1">
                    🎉 ¡Envío gratis en tu pedido!
                  </p>
                )}
              </div>
            )}

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full py-20 px-8 text-center"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-5">
                      <Package className="w-9 h-9 text-gray-400" />
                    </div>
                    <h3 className="text-dark font-semibold text-lg mb-2">Tu carrito está vacío</h3>
                    <p className="text-dark/40 text-sm mb-6">
                      Explora nuestro catálogo y agrega productos para comenzar.
                    </p>
                    <button
                      onClick={() => {
                        closeCart()
                        const el = document.querySelector('#catalogo')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="bg-pink text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-pink/90 transition-colors shadow-lg shadow-pink/20"
                    >
                      Ver catálogo
                    </button>
                  </motion.div>
                ) : (
                  <div className="p-4 space-y-3">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3.5 border border-gray-100"
                      >
                        {/* Product image or emoji */}
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100 overflow-hidden">
                          {item.product.imageUrl ? (
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-full h-full object-contain p-1"
                            />
                          ) : (
                            <span className="text-3xl">{item.product.emoji}</span>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-dark font-semibold text-xs leading-snug truncate">
                            {item.product.name}
                          </p>
                          <p className="text-pink font-bold text-sm mt-0.5">
                            RD${item.product.price.toLocaleString('es-DO')}
                          </p>

                          {/* Qty controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-0.5">
                              <button
                                onClick={() => updateQty(item.product.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 hover:text-dark transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-dark font-bold text-xs w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQty(item.product.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center rounded hover:bg-pink/10 text-gray-500 hover:text-pink transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="text-dark/40 text-xs">
                              = RD${(item.product.price * item.quantity).toLocaleString('es-DO')}
                            </span>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer with total + CTA */}
            {items.length > 0 && (
              <div className="flex-shrink-0 border-t border-gray-100 bg-white p-5 space-y-4">
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-dark/50">Subtotal ({count} items)</span>
                    <span className="text-dark font-medium">
                      RD${cartTotal.toLocaleString('es-DO')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark/50">Envío</span>
                    <span className={cartTotal >= freeShippingThreshold ? 'text-green-500 font-medium' : 'text-dark font-medium'}>
                      {cartTotal >= freeShippingThreshold ? '¡Gratis!' : 'RD$250'}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold border-t border-gray-100 pt-2 mt-2">
                    <span className="text-dark">Total</span>
                    <span className="text-pink">
                      RD${(cartTotal + (cartTotal >= freeShippingThreshold ? 0 : 250)).toLocaleString('es-DO')}
                    </span>
                  </div>
                </div>

                {/* Checkout button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={openCheckout}
                  className="flex items-center justify-center gap-2.5 w-full bg-pink hover:bg-pink/90 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-xl shadow-pink/25"
                >
                  Finalizar compra
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <button
                  onClick={closeCart}
                  className="w-full text-center text-dark/40 hover:text-dark text-xs py-1 transition-colors"
                >
                  Continuar comprando
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
