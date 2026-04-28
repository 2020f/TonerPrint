'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Building2, Truck, CheckCircle, ArrowRight, ArrowLeft, ShoppingBag, Copy } from 'lucide-react'
import { useUIStore } from '@/lib/store/uiStore'
import { useCartStore } from '@/lib/store/cartStore'

type PaymentMethod = 'card' | 'transfer' | 'cod'
type Step = 'details' | 'payment' | 'success'

interface FormData {
  name: string
  phone: string
  email: string
  address: string
  notes: string
}

const paymentMethods = [
  {
    id: 'card' as PaymentMethod,
    icon: CreditCard,
    title: 'Tarjeta de Crédito/Débito',
    sub: 'Visa, Mastercard',
    color: 'border-blue/40 bg-blue/5',
    activeColor: 'border-blue bg-blue/10',
  },
  {
    id: 'transfer' as PaymentMethod,
    icon: Building2,
    title: 'Transferencia Bancaria',
    sub: 'Banco Popular, BHD, Banreservas',
    color: 'border-orange/40 bg-orange/5',
    activeColor: 'border-orange bg-orange/10',
  },
  {
    id: 'cod' as PaymentMethod,
    icon: Truck,
    title: 'Contra Entrega',
    sub: 'Paga cuando recibes',
    color: 'border-green-400/40 bg-green-400/5',
    activeColor: 'border-green-400 bg-green-400/10',
  },
]

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout } = useUIStore()
  const { items, total, itemCount, clearCart } = useCartStore()
  const [step, setStep] = useState<Step>('details')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [orderNumber, setOrderNumber] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const cartTotal = total()
  const count = itemCount()
  const shipping = cartTotal >= 2000 ? 0 : 250
  const orderTotal = cartTotal + shipping

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const validateDetails = () => {
    const newErrors: Partial<FormData> = {}
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido'
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido'
    if (!formData.email.trim()) newErrors.email = 'El email es requerido'
    if (!formData.address.trim()) newErrors.address = 'La dirección es requerida'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = async () => {
    if (step === 'details') {
      if (validateDetails()) setStep('payment')
    } else if (step === 'payment') {
      setSubmitting(true)
      setApiError('')
      try {
        const payMap: Record<PaymentMethod, string> = { card: 'card', transfer: 'transfer', cod: 'delivery' }
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone,
            customer_address: formData.address,
            payment_method: payMap[paymentMethod],
            notes: formData.notes,
            items: items.map(i => ({
              id: i.product.id,
              name: i.product.name,
              price: i.product.price,
              quantity: i.quantity,
            })),
          }),
        })
        const data = await res.json()
        if (!res.ok) { setApiError(data.error || 'Error al procesar pedido'); return }
        setOrderNumber(data.order_number)
        setStep('success')
        clearCart()
      } catch {
        setApiError('Error de conexión. Intenta de nuevo.')
      } finally {
        setSubmitting(false)
      }
    }
  }

  const handleClose = () => {
    closeCheckout()
    setTimeout(() => setStep('details'), 400)
  }

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step !== 'success' ? handleClose : undefined}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              {step !== 'success' && (
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <AnimatePresence mode="wait">
                {/* Step: Details */}
                {step === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6"
                  >
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-pink text-xs font-bold">PASO 1 DE 2</span>
                      </div>
                      <h2 className="text-dark font-bold text-2xl">Datos de entrega</h2>
                      <p className="text-dark/50 text-sm mt-1">Completa tus datos para continuar.</p>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 bg-gray-100 rounded-full mb-6 overflow-hidden">
                      <div className="h-full w-1/2 bg-pink rounded-full" />
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-dark/60 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                            Nombre completo *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Juan Pérez"
                            className={`w-full border px-4 py-3 rounded-xl text-sm text-dark placeholder-gray-300 focus:outline-none transition-all ${
                              errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-pink/50 bg-gray-50 focus:bg-white'
                            }`}
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="text-dark/60 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                            Teléfono *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(809) 000-0000"
                            className={`w-full border px-4 py-3 rounded-xl text-sm text-dark placeholder-gray-300 focus:outline-none transition-all ${
                              errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-pink/50 bg-gray-50 focus:bg-white'
                            }`}
                          />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="text-dark/60 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="juan@ejemplo.com"
                          className={`w-full border px-4 py-3 rounded-xl text-sm text-dark placeholder-gray-300 focus:outline-none transition-all ${
                            errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-pink/50 bg-gray-50 focus:bg-white'
                          }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="text-dark/60 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                          Dirección de entrega *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Calle, número, sector, ciudad"
                          className={`w-full border px-4 py-3 rounded-xl text-sm text-dark placeholder-gray-300 focus:outline-none transition-all ${
                            errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-pink/50 bg-gray-50 focus:bg-white'
                          }`}
                        />
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                      </div>

                      <div>
                        <label className="text-dark/60 text-xs font-semibold uppercase tracking-wide block mb-1.5">
                          Notas adicionales
                        </label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          rows={2}
                          placeholder="Instrucciones especiales, referencia de lugar..."
                          className="w-full border border-gray-200 px-4 py-3 rounded-xl text-sm text-dark placeholder-gray-300 focus:border-pink/50 focus:bg-white bg-gray-50 transition-all resize-none focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Order mini summary */}
                    <div className="bg-gray-50 rounded-xl p-4 mt-6 space-y-2">
                      <p className="text-dark/50 text-xs font-semibold uppercase tracking-wide">Resumen</p>
                      {items.map((item) => (
                        <div key={item.product.id} className="flex justify-between text-xs">
                          <span className="text-dark/60 truncate mr-4">
                            {item.quantity}x {item.product.name}
                          </span>
                          <span className="text-dark font-medium flex-shrink-0">
                            RD${(item.product.price * item.quantity).toLocaleString('es-DO')}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-sm">
                        <span>Total</span>
                        <span className="text-pink">RD${orderTotal.toLocaleString('es-DO')}</span>
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNextStep}
                      className="flex items-center justify-center gap-2 w-full bg-pink hover:bg-pink/90 text-white py-3.5 rounded-xl font-bold text-sm mt-5 shadow-lg shadow-pink/20 transition-all"
                    >
                      Continuar al pago
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}

                {/* Step: Payment */}
                {step === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-6"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <button
                        onClick={() => setStep('details')}
                        className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors flex-shrink-0"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <div>
                        <span className="text-pink text-xs font-bold block">PASO 2 DE 2</span>
                        <h2 className="text-dark font-bold text-2xl">Método de pago</h2>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 bg-gray-100 rounded-full mb-6 overflow-hidden">
                      <div className="h-full w-full bg-pink rounded-full" />
                    </div>

                    {/* Delivery info */}
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 mb-5">
                      <p className="text-dark/40 text-[10px] font-bold uppercase tracking-wider mb-1">Entrega para</p>
                      <p className="text-dark font-semibold text-sm">{formData.name}</p>
                      <p className="text-dark/55 text-xs">{formData.address}</p>
                      <p className="text-dark/55 text-xs">{formData.phone}</p>
                    </div>

                    {/* Payment methods */}
                    <div className="space-y-3 mb-5">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon
                        const isActive = paymentMethod === method.id
                        return (
                          <motion.button
                            key={method.id}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                              isActive ? method.activeColor + ' border-opacity-100' : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-white/60' : 'bg-gray-100'}`}>
                              <Icon className={`w-5 h-5 ${isActive ? 'text-dark' : 'text-gray-400'}`} />
                            </div>
                            <div className="flex-1">
                              <p className={`font-semibold text-sm ${isActive ? 'text-dark' : 'text-dark/70'}`}>
                                {method.title}
                              </p>
                              <p className="text-dark/40 text-xs mt-0.5">{method.sub}</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                              isActive ? 'border-pink bg-pink' : 'border-gray-300'
                            }`}>
                              {isActive && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>

                    {/* Bank info for transfer */}
                    <AnimatePresence>
                      {paymentMethod === 'transfer' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-orange/5 border border-orange/20 rounded-xl p-4 mb-5 overflow-hidden"
                        >
                          <p className="text-dark font-semibold text-xs mb-3">Datos para transferencia:</p>
                          <div className="space-y-1.5 text-xs text-dark/60">
                            <p><span className="font-medium text-dark">Banco:</span> Banco Popular Dominicano</p>
                            <p><span className="font-medium text-dark">Cuenta:</span> 123-456789-0</p>
                            <p><span className="font-medium text-dark">Titular:</span> TonerPrint SRL</p>
                            <p><span className="font-medium text-dark">RNC:</span> 1-31-00000-1</p>
                          </div>
                          <p className="text-orange text-xs mt-2">* Envía el comprobante por WhatsApp al completar</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Order summary */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-dark/50">Subtotal ({count} items)</span>
                        <span className="text-dark">RD${cartTotal.toLocaleString('es-DO')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-dark/50">Envío</span>
                        <span className={shipping === 0 ? 'text-green-500 font-medium' : 'text-dark'}>
                          {shipping === 0 ? 'Gratis 🎉' : `RD$${shipping}`}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold border-t border-gray-200 pt-2 mt-1">
                        <span className="text-dark">Total a pagar</span>
                        <span className="text-pink text-lg">RD${orderTotal.toLocaleString('es-DO')}</span>
                      </div>
                    </div>

                    {apiError && (
                      <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-3">{apiError}</div>
                    )}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNextStep}
                      disabled={submitting}
                      className="flex items-center justify-center gap-2.5 w-full bg-pink hover:bg-pink/90 disabled:opacity-60 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-pink/20 transition-all"
                    >
                      {submitting ? 'Procesando…' : 'Confirmar pedido'}
                      {!submitting && <ShoppingBag className="w-4 h-4" />}
                    </motion.button>
                  </motion.div>
                )}

                {/* Step: Success */}
                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 text-center"
                  >
                    {/* Confetti-like decoration */}
                    <div className="relative mb-6">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            y: [-20, -60 - Math.random() * 40],
                            x: (i % 2 === 0 ? 1 : -1) * (20 + Math.random() * 60),
                            scale: [0, 1, 0],
                            rotate: Math.random() * 360,
                          }}
                          transition={{ delay: i * 0.08, duration: 1.2 }}
                          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-sm"
                          style={{
                            background: ['#E91E63', '#F06292', '#FF7043', '#4FC3F7', '#FFD700'][i % 5],
                          }}
                        />
                      ))}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                        className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-400/30"
                      >
                        <CheckCircle className="w-12 h-12 text-white" />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h2 className="text-dark font-bold text-2xl mb-2">¡Pedido confirmado!</h2>
                      <p className="text-dark/50 text-sm mb-6 max-w-xs mx-auto">
                        Tu pedido ha sido recibido. Te contactaremos pronto para confirmar la entrega.
                      </p>

                      {/* Order number */}
                      <div className="bg-pink/5 border border-pink/15 rounded-2xl p-5 mb-6">
                        <p className="text-dark/40 text-xs uppercase tracking-wide mb-2">Número de orden</p>
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-pink font-bold text-2xl tracking-wider">{orderNumber}</span>
                          <button
                            onClick={() => navigator.clipboard?.writeText(orderNumber)}
                            className="text-gray-400 hover:text-pink transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-dark/40 text-xs mt-2">Guarda este número para dar seguimiento</p>
                      </div>

                      {/* WhatsApp confirmation CTA */}
                      <a
                        href={`https://wa.me/18095550100?text=Hola%2C%20acabo%20de%20hacer%20un%20pedido%20con%20el%20número%20${orderNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 rounded-xl font-semibold text-sm mb-3 transition-colors shadow-lg shadow-green-500/20"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Confirmar por WhatsApp
                      </a>

                      <button
                        onClick={handleClose}
                        className="w-full text-dark/40 hover:text-dark text-sm py-2 transition-colors"
                      >
                        Volver al inicio
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
