import Hero from '@/components/sections/Hero'
import Categories from '@/components/sections/Categories'
import Catalog from '@/components/sections/Catalog'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Catalog />
      <Services />
      <Testimonials />
      <About />
      <Contact />
    </>
  )
}
