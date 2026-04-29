import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/layout/WhatsAppFAB'
import CartSidebar from '@/components/cart/CartSidebar'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import ProductModal from '@/components/catalog/ProductModal'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartSidebar />
      <CheckoutModal />
      <ProductModal />
      <WhatsAppFAB />
    </>
  )
}
