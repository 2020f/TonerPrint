import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/layout/WhatsAppFAB'
import CartSidebar from '@/components/cart/CartSidebar'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import ProductModal from '@/components/catalog/ProductModal'
import ToastProvider from '@/components/ui/ToastProvider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TonerPrint — Insumos de Impresión en República Dominicana',
  description:
    'Tóneres, tintas e impresoras originales HP, Epson, Canon y Brother al mejor precio en Santo Domingo, República Dominicana. Envío el mismo día.',
  keywords: [
    'tóner Santo Domingo',
    'tintas impresora RD',
    'HP tóner República Dominicana',
    'Epson tinta Santo Domingo',
    'impresoras Dominican Republic',
    'TonerPrint',
  ],
  openGraph: {
    title: 'TonerPrint — Insumos de Impresión RD',
    description: 'Tóneres, tintas e impresoras originales a los mejores precios en República Dominicana.',
    type: 'website',
    locale: 'es_DO',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="font-poppins antialiased">
        <ToastProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartSidebar />
          <CheckoutModal />
          <ProductModal />
          <WhatsAppFAB />
        </ToastProvider>
      </body>
    </html>
  )
}
