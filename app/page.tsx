import Calculator from "@/components/calculator"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import VisitorCounter from "@/components/visitor-counter"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Hero />
      <Calculator />
      <Footer />
      <VisitorCounter />
    </main>
  )
}
