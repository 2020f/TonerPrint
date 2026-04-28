import { create } from 'zustand'
import { Product } from '@/types'

interface UIState {
  isCartOpen: boolean
  isProductModalOpen: boolean
  selectedProduct: Product | null
  isCheckoutOpen: boolean
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  openProduct: (product: Product) => void
  closeProduct: () => void
  openCheckout: () => void
  closeCheckout: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  isProductModalOpen: false,
  selectedProduct: null,
  isCheckoutOpen: false,

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  openProduct: (product: Product) =>
    set({ selectedProduct: product, isProductModalOpen: true }),
  closeProduct: () => set({ isProductModalOpen: false, selectedProduct: null }),

  openCheckout: () => set({ isCheckoutOpen: true, isCartOpen: false }),
  closeCheckout: () => set({ isCheckoutOpen: false }),
}))
