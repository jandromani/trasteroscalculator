"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, FileText, Download } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface PriceBreakdownProps {
  costoMateriales: number
  costosFijos: number
  costoManoObra: number
  costoTotal: number
  cantidad: number
  metrosCuadrados: number
  tamaño: string
}

export default function PriceBreakdown({
  costoMateriales,
  costosFijos,
  costoManoObra,
  costoTotal,
  cantidad,
  metrosCuadrados,
  tamaño,
}: PriceBreakdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Cálculos detallados para Madrid 2025
  const calcularDetalles = () => {
    // Costos Madrid 2025 (con inflación estimada)
    const costosPorMetroCuadrado = {
      panelesDivisorios: 85, // € por m²
      suelo: 45, // € por m²
      techo: 40, // € por m²
      pintura: 20, // € por m²
      aislamiento: 35, // € por m²
    }

    // Costos de personal Madrid 2025
    const costosPersonal = {
      oficial1a: 26.5, // € por hora
      peon: 21.0, // € por hora
      instalador: 28.5, // € por hora
      electricista: 29.75, // € por hora
    }

    // Costos instalaciones
    const costosInstalaciones = {
      iluminacionBasica: 35, // € por trastero
      iluminacionAvanzada: 75, // € por trastero
      camaraSeguridad: 120, // € por unidad
      alarma: 85, // € por trastero
      sistemaAcceso: 105, // € por trastero
    }

    // Duración estimada del proyecto en días (basado en cantidad)
    const diasProyecto = Math.max(Math.ceil(cantidad / 5), 5) // Mínimo 5 días

    // Número de trabajadores necesarios
    const trabajadoresNecesarios = {
      oficial1a: Math.max(1, Math.ceil(cantidad / 20)),
      peon: Math.max(2, Math.ceil(cantidad / 10)),
      instalador: Math.max(1, Math.ceil(cantidad / 25)),
      electricista: Math.max(1, Math.ceil(cantidad / 30)),
    }

    // Superficie total de paredes por trastero (altura estándar 2.5m)
    const alturaEstandar = 2.5
    const perimetro = Math.sqrt(metrosCuadrados) * 4
    const superficieParedes = perimetro * alturaEstandar

    // Desglose de materiales
    const materialesDesglose = {
      panelesDivisorios: superficieParedes * costosPorMetroCuadrado.panelesDivisorios * cantidad,
      suelo: metrosCuadrados * costosPorMetroCuadrado.suelo * cantidad,
      techo: metrosCuadrados * costosPorMetroCuadrado.techo * cantidad,
      pintura: superficieParedes * costosPorMetroCuadrado.pintura * cantidad,
      aislamiento: superficieParedes * 0.5 * costosPorMetroCuadrado.aislamiento * cantidad, // 50% de las paredes
    }

    // Desglose instalaciones por proyecto
    const instalacionesDesglose = {
      iluminacionBasica: costosInstalaciones.iluminacionBasica * cantidad,
      camarasSeguridad: costosInstalaciones.camaraSeguridad * Math.ceil(cantidad / 8), // 1 cámara cada 8 trasteros
      alarma: costosInstalaciones.alarma * cantidad,
      sistemaAcceso: costosInstalaciones.sistemaAcceso * cantidad,
      electricidad: 85 * cantidad, // Base por trastero
    }

    // Costo total mano de obra por tipo de trabajador
    const horasPorTrastero = {
      oficial1a: 5,
      peon: 8,
      instalador: 3,
      electricista: 2,
    }

    const manoObraDesglose = {
      oficial1a: costosPersonal.oficial1a * horasPorTrastero.oficial1a * cantidad,
      peon: costosPersonal.peon * horasPorTrastero.peon * cantidad,
      instalador: costosPersonal.instalador * horasPorTrastero.instalador * cantidad,
      electricista: costosPersonal.electricista * horasPorTrastero.electricista * cantidad,
    }

    // Costos indirectos
    const costosIndirectos = {
      alquilerEquipos: 75 * diasProyecto,
      transporte: 120 * Math.ceil(diasProyecto / 2),
      permisos: 450 + cantidad * 15,
      seguros: 350 + cantidad * 5,
      gestionResiduos: cantidad * 45,
    }

    // Sumar totales por categoría
    const totalMateriales = Object.values(materialesDesglose).reduce((sum, val) => sum + val, 0)
    const totalInstalaciones = Object.values(instalacionesDesglose).reduce((sum, val) => sum + val, 0)
    const totalManoObra = Object.values(manoObraDesglose).reduce((sum, val) => sum + val, 0)
    const totalIndirectos = Object.values(costosIndirectos).reduce((sum, val) => sum + val, 0)

    return {
      materialesDesglose,
      instalacionesDesglose,
      manoObraDesglose,
      costosIndirectos,
      totalMateriales,
      totalInstalaciones,
      totalManoObra,
      totalIndirectos,
      diasProyecto,
      trabajadoresNecesarios,
    }
  }

  const detalles = calcularDetalles()

  // Calcular distribución del presupuesto para la visualización
  const distribucionPresupuesto = [
    {
      nombre: "Materiales",
      valor: detalles.totalMateriales,
      porcentaje: ((detalles.totalMateriales / costoTotal) * 100).toFixed(1),
    },
    {
      nombre: "Instalaciones",
      valor: detalles.totalInstalaciones,
      porcentaje: ((detalles.totalInstalaciones / costoTotal) * 100).toFixed(1),
    },
    {
      nombre: "Mano de Obra",
      valor: detalles.totalManoObra,
      porcentaje: ((detalles.totalManoObra / costoTotal) * 100).toFixed(1),
    },
    {
      nombre: "Costos Indirectos",
      valor: detalles.totalIndirectos,
      porcentaje: ((detalles.totalIndirectos / costoTotal) * 100).toFixed(1),
    },
  ]

  return (
    <div className="mt-4">
      <Button
        variant="ghost"
        className="flex items-center justify-between w-full p-0 text-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">Ver desglose de precios</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </Button>

      {isOpen && (
        <div className="p-4 mt-4 space-y-4 border rounded-lg">
          <Tabs defaultValue="resumen">
            <TabsList className="w-full">
              <TabsTrigger value="resumen" className="flex-1">
                Resumen
              </TabsTrigger>
              <TabsTrigger value="detallado" className="flex-1">
                Detallado
              </TabsTrigger>
              <TabsTrigger value="visualizacion" className="flex-1">
                Visualización
              </TabsTrigger>
            </TabsList>

            <TabsContent value="resumen" className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Materiales de construcción</span>
                <span className="font-medium">
                  {detalles.totalMateriales.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Instalaciones y equipamiento</span>
                <span className="font-medium">
                  {detalles.totalInstalaciones.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mano de obra</span>
                <span className="font-medium">
                  {detalles.totalManoObra.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Costos indirectos</span>
                <span className="font-medium">
                  {detalles.totalIndirectos.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                </span>
              </div>
              <div className="pt-2 mt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">
                    {costoTotal.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                  </span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="detallado" className="mt-4 space-y-6">
              <div>
                <h4 className="mb-2 font-semibold">Materiales de Construcción</h4>
                <div className="pl-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Paneles divisorios</span>
                    <span className="text-sm">
                      {detalles.materialesDesglose.panelesDivisorios.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Suelo</span>
                    <span className="text-sm">
                      {detalles.materialesDesglose.suelo.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Techo</span>
                    <span className="text-sm">
                      {detalles.materialesDesglose.techo.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pintura y acabados</span>
                    <span className="text-sm">
                      {detalles.materialesDesglose.pintura.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Aislamiento</span>
                    <span className="text-sm">
                      {detalles.materialesDesglose.aislamiento.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Instalaciones y Equipamiento</h4>
                <div className="pl-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Iluminación básica</span>
                    <span className="text-sm">
                      {detalles.instalacionesDesglose.iluminacionBasica.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cámaras de seguridad (CCTV)</span>
                    <span className="text-sm">
                      {detalles.instalacionesDesglose.camarasSeguridad.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sistema de alarma</span>
                    <span className="text-sm">
                      {detalles.instalacionesDesglose.alarma.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sistema de acceso</span>
                    <span className="text-sm">
                      {detalles.instalacionesDesglose.sistemaAcceso.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Instalación eléctrica</span>
                    <span className="text-sm">
                      {detalles.instalacionesDesglose.electricidad.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Mano de Obra</h4>
                <div className="pl-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Oficial de primera</span>
                    <span className="text-sm">
                      {detalles.manoObraDesglose.oficial1a.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Peón</span>
                    <span className="text-sm">
                      {detalles.manoObraDesglose.peon.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Instalador especializado</span>
                    <span className="text-sm">
                      {detalles.manoObraDesglose.instalador.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Electricista</span>
                    <span className="text-sm">
                      {detalles.manoObraDesglose.electricista.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-semibold">Costos Indirectos</h4>
                <div className="pl-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Alquiler de equipos</span>
                    <span className="text-sm">
                      {detalles.costosIndirectos.alquilerEquipos.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Transporte</span>
                    <span className="text-sm">
                      {detalles.costosIndirectos.transporte.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Permisos y licencias</span>
                    <span className="text-sm">
                      {detalles.costosIndirectos.permisos.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Seguros</span>
                    <span className="text-sm">
                      {detalles.costosIndirectos.seguros.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Gestión de residuos</span>
                    <span className="text-sm">
                      {detalles.costosIndirectos.gestionResiduos.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 mb-2 text-xs bg-orange-50 rounded-md border border-orange-100 text-orange-800">
                <p className="font-semibold">Duración estimada del proyecto: {detalles.diasProyecto} días</p>
                <p className="mt-1">
                  <strong>Equipo asignado:</strong> {detalles.trabajadoresNecesarios.oficial1a} oficial(es),{" "}
                  {detalles.trabajadoresNecesarios.peon} peón(es), {detalles.trabajadoresNecesarios.instalador}{" "}
                  instalador(es), {detalles.trabajadoresNecesarios.electricista} electricista(s)
                </p>
              </div>

              <div className="flex justify-center mt-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Descargar presupuesto detallado
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="visualizacion" className="mt-6 space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Distribución del Presupuesto</h4>
                {distribucionPresupuesto.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">{item.nombre}</span>
                      <span className="text-sm font-medium">{item.porcentaje}%</span>
                    </div>
                    <Progress value={Number.parseFloat(item.porcentaje)} className="h-2" />
                    <p className="text-xs text-right text-gray-500">
                      {item.valor.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 mt-4 border rounded-md">
                <h4 className="mb-3 font-semibold">Información Adicional</h4>
                <ul className="pl-5 mt-2 space-y-2 text-sm text-gray-600 list-disc">
                  <li>Todos los precios incluyen el 21% de IVA vigente en Madrid para 2025.</li>
                  <li>
                    Los trasteros cumplen con la normativa CTE DB-SI (protección contra incendios) y CTE DB-SUA
                    (seguridad de utilización).
                  </li>
                  <li>Instalación eléctrica conforme al Reglamento Electrotécnico de Baja Tensión (REBT).</li>
                  <li>Sistema de seguridad compatible con la normativa de protección de datos (LOPD-GDD).</li>
                  <li>Las cámaras CCTV cumplen con la Ley 5/2014 de Seguridad Privada.</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            variant="outline"
            className="mt-4 w-full flex items-center justify-center gap-2 text-orange-600 border-orange-300 hover:bg-orange-50"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <FileText className="w-4 h-4" />
            Solicitar presupuesto personalizado completo
          </Button>
        </div>
      )}
    </div>
  )
}
