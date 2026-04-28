export type ProductBrand = 'hp' | 'epson' | 'canon' | 'brother'
export type ProductType = 'toner' | 'tinta' | 'impresora' | 'accesorio'
export type ProductBadge = 'sale' | 'hot' | 'new' | null

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  id: number
  name: string
  brand: ProductBrand
  type: ProductType
  price: number
  oldPrice?: number
  imageUrl?: string
  emoji: string
  badge: ProductBadge
  description: string
  specs: ProductSpec[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  text: string
}

export interface ContactInfo {
  icon: string
  label: string
  value: string
  href: string
}
