import { createFileRoute } from '@tanstack/react-router'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Styles from '../sections/Styles'
import FAQ from '../sections/FAQ'
import Testimonials from '../sections/Testimonials'
import Contact from '../sections/Contact'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Styles />
      <FAQ />
      <Testimonials />
      <Contact />
    </>
  )
}