'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastData {
  id: string
  message: string
  type: ToastType
}

interface ToastProps {
  toast: ToastData
  onDismiss: (id: string) => void
}

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />,
  info: <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />,
}

const colors = {
  success: 'border-l-green-400',
  error: 'border-l-red-400',
  info: 'border-l-blue-400',
}

export default function Toast({ toast, onDismiss }: ToastProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 120, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 120, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`flex items-center gap-3 bg-[#1a1a1a] border border-white/10 border-l-4 ${colors[toast.type]} rounded-xl px-4 py-3 shadow-2xl min-w-[280px] max-w-[360px]`}
    >
      {icons[toast.type]}
      <p className="text-white text-sm font-medium flex-1 leading-snug">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-white/50 hover:text-white transition-colors ml-1 flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}
