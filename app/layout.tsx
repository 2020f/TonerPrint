import type { Metadata } from 'next'
import { Poppins, Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/components/ui/ToastProvider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
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
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
