"use client"

import { Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative px-6 py-24 overflow-hidden bg-white isolate sm:py-32 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <Building2 className="w-12 h-12 text-orange-500" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Construimos Trasteros a Medida</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Calcule al instante el coste de su proyecto de trasteros. Nuestros presupuestos incluyen todas las normativas
          españolas de seguridad y calidad.
        </p>
        <div className="flex items-center justify-center mt-10 gap-x-6">
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-orange-500 hover:bg-orange-600"
            onClick={() => {
              document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Calcular Presupuesto
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 text-lg"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Contactar
          </Button>
        </div>
      </div>
    </div>
  )
}
