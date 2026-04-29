import Hero from '@/components/sections/Hero'
import PromoBanner from '@/components/sections/PromoBanner'
import Catalog from '@/components/sections/Catalog'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromoBanner />
      <Catalog />
      <Services />
      <Testimonials />
      <About />
      <Contact />
    </>
  )
}
