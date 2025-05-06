"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { InfoIcon as InfoCircle, Ruler, DoorOpen, AlertTriangle } from "lucide-react"
import PriceBreakdown from "./price-breakdown"
import DetailedQuote from "./detailed-quote"

// Precios base por metro cuadrado según tamaño
const PRECIOS_BASE = {
  pequeño: 450, // €/m²
  mediano: 400, // €/m²
  grande: 350, // €/m²
}

// Costes fijos por unidad
const COSTES_FIJOS = {
  puertaAntiincendios: 350, // € por puerta
  instalacionElectrica: 120, // € por trastero
  seguridadNormativa: 200, // € por trastero
}

// Descuentos por volumen
const DESCUENTOS = [
  { min: 0, max: 10, descuento: 0 },
  { min: 11, max: 30, descuento: 0.05 }, // 5%
  { min: 31, max: 50, descuento: 0.1 }, // 10%
  { min: 51, max: 100, descuento: 0.15 }, // 15%
  { min: 101, max: Number.POSITIVE_INFINITY, descuento: 0.2 }, // 20%
]

export default function Calculator() {
  const [cantidad, setCantidad] = useState<number>(1)
  const [tamaño, setTamaño] = useState<"pequeño" | "mediano" | "grande">("mediano")
  const [metrosCuadrados, setMetrosCuadrados] = useState<number>(5)
  const [showResults, setShowResults] = useState<boolean>(false)
  const [showDetailedQuote, setShowDetailedQuote] = useState<boolean>(false)

  // Calcular la superficie total
  const superficieTotal = cantidad * metrosCuadrados

  // Determinar el descuento por volumen
  const descuentoVolumen = DESCUENTOS.find((d) => cantidad >= d.min && cantidad <= d.max)?.descuento || 0

  // Calcular costos de materiales por unidad
  const costoMaterialesUnitario = metrosCuadrados * PRECIOS_BASE[tamaño]

  // Costo total de materiales (con descuento)
  const costoMaterialesTotal = cantidad * costoMaterialesUnitario * (1 - descuentoVolumen)

  // Costos fijos totales
  const costosFijosTotales =
    cantidad * (COSTES_FIJOS.puertaAntiincendios + COSTES_FIJOS.instalacionElectrica + COSTES_FIJOS.seguridadNormativa)

  // Costos de mano de obra (estimado como 40% del costo de materiales)
  const costoManoObra = costoMaterialesTotal * 0.4

  // Costo total del proyecto
  const costoTotal = costoMaterialesTotal + costosFijosTotales + costoManoObra

  // Costo por trastero
  const costoPorTrastero = costoTotal / cantidad

  const handleCalculate = () => {
    setShowResults(true)
    setShowDetailedQuote(false)
    // Scroll to the results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleRequestDetailedQuote = () => {
    setShowDetailedQuote(true)
    // Scroll to the detailed quote
    setTimeout(() => {
      document.getElementById("detailed-quote")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <section id="calculator" className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Calculadora de Trasteros</h2>
          <p className="mt-4 text-lg text-gray-600">Obtenga un presupuesto instantáneo para su proyecto de trasteros</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Proyecto</CardTitle>
              <CardDescription>Ingrese los datos de su proyecto para calcular el presupuesto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cantidad">Cantidad de Trasteros</Label>
                <Input
                  id="cantidad"
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(Number.parseInt(e.target.value) || 1)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Tamaño de los Trasteros</Label>
                  <div className="relative group">
                    <InfoCircle className="w-4 h-4 text-gray-400" />
                    <div className="absolute z-10 invisible p-2 text-xs text-white bg-gray-800 rounded group-hover:visible w-60 -top-2 left-6">
                      Pequeño: 1-4 m², Mediano: 5-10 m², Grande: más de 10 m²
                    </div>
                  </div>
                </div>
                <RadioGroup value={tamaño} onValueChange={(value) => setTamaño(value as any)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pequeño" id="pequeño" />
                    <Label htmlFor="pequeño">Pequeño (Ideal para cajas y objetos pequeños)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mediano" id="mediano" />
                    <Label htmlFor="mediano">Mediano (Muebles pequeños, electrodomésticos)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grande" id="grande" />
                    <Label htmlFor="grande">Grande (Mobiliario completo de una habitación)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metros">Metros Cuadrados por Trastero</Label>
                <Input
                  id="metros"
                  type="number"
                  min="1"
                  max="30"
                  value={metrosCuadrados}
                  onChange={(e) => setMetrosCuadrados(Number.parseInt(e.target.value) || 1)}
                  className="text-lg"
                />
              </div>

              <div className="p-4 mt-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 mt-0.5 text-orange-500" />
                  <div>
                    <h4 className="font-medium text-orange-800">Normativa Española</h4>
                    <p className="mt-1 text-sm text-orange-700">
                      Todos nuestros trasteros cumplen con la normativa española, incluyendo puertas antiincendios y
                      medidas mínimas de seguridad según el CTE (Código Técnico de la Edificación).
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={handleCalculate} size="lg" className="w-full mt-4 bg-orange-500 hover:bg-orange-600">
                Calcular Presupuesto
              </Button>
            </CardContent>
          </Card>

          <div id="results" className={showResults ? "block" : "hidden"}>
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Presupuesto</CardTitle>
                <CardDescription>Detalles del coste de su proyecto de trasteros</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2 text-gray-500">
                      <Ruler className="w-4 h-4" />
                      <span className="text-sm">Superficie Total</span>
                    </div>
                    <p className="text-2xl font-bold">{superficieTotal} m²</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2 text-gray-500">
                      <DoorOpen className="w-4 h-4" />
                      <span className="text-sm">Cantidad</span>
                    </div>
                    <p className="text-2xl font-bold">{cantidad} trasteros</p>
                  </div>
                </div>

                <div className="p-4 text-center bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Costo por trastero</p>
                  <p className="text-3xl font-bold text-orange-500">
                    {costoPorTrastero.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                  </p>
                </div>

                <Separator />

                <div className="p-4 text-center bg-gray-900 rounded-xl">
                  <p className="text-sm text-gray-300">Presupuesto Total</p>
                  <p className="text-4xl font-bold text-white">
                    {costoTotal.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                  </p>
                  {descuentoVolumen > 0 && (
                    <p className="mt-2 text-sm text-orange-300">
                      Incluye un {descuentoVolumen * 100}% de descuento por volumen
                    </p>
                  )}
                </div>

                <PriceBreakdown
                  costoMateriales={costoMaterialesTotal}
                  costosFijos={costosFijosTotales}
                  costoManoObra={costoManoObra}
                  costoTotal={costoTotal}
                  cantidad={cantidad}
                  metrosCuadrados={metrosCuadrados}
                  tamaño={tamaño}
                />

                <div className="p-4 mt-4 text-center bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">
                    ¿Necesita un presupuesto más detallado y personalizado con todas las especificaciones técnicas?
                  </p>
                  <Button className="mt-2 bg-orange-500 hover:bg-orange-600" onClick={handleRequestDetailedQuote}>
                    Solicitar Presupuesto Detallado
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {showDetailedQuote && (
          <div id="detailed-quote" className="mt-12">
            <DetailedQuote
              cantidad={cantidad}
              metrosCuadrados={metrosCuadrados}
              tamaño={tamaño}
              costoTotal={costoTotal}
            />
          </div>
        )}
      </div>
    </section>
  )
}
