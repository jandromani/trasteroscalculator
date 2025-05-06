"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  CalendarDays,
  FileText,
  Landmark,
  Users,
  HardHat,
  ShieldCheck,
  Lightbulb,
  Ruler,
  ClipboardCheck,
  Download,
  ChevronRight,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface DetailedQuoteProps {
  cantidad: number
  metrosCuadrados: number
  tamaño: string
  costoTotal: number
}

export default function DetailedQuote({ cantidad, metrosCuadrados, tamaño, costoTotal }: DetailedQuoteProps) {
  const [opciones, setOpciones] = useState({
    iluminacionAvanzada: false,
    camarasAdicionales: false,
    aislamientoAcustico: false,
    acabadosPremium: false,
    sistemaAccesoDigital: false,
  })

  // Períodos estimados según el volumen
  const obtenerPlazos = () => {
    if (cantidad <= 10)
      return { diseno: "3-5 días", tramitacion: "5-7 días", construccion: "10-15 días", total: "18-27 días" }
    if (cantidad <= 30)
      return { diseno: "5-7 días", tramitacion: "7-10 días", construccion: "20-30 días", total: "32-47 días" }
    if (cantidad <= 60)
      return { diseno: "7-10 días", tramitacion: "10-15 días", construccion: "35-50 días", total: "52-75 días" }
    return { diseno: "10-15 días", tramitacion: "15-20 días", construccion: "50-70 días", total: "75-105 días" }
  }

  const plazos = obtenerPlazos()

  // Cálculos para determinar el equipo
  const calcularEquipo = () => {
    return {
      jefesObra: Math.max(1, Math.floor(cantidad / 40)),
      oficiales: Math.max(2, Math.ceil(cantidad / 15)),
      peones: Math.max(3, Math.ceil(cantidad / 8)),
      instaladores: Math.max(1, Math.ceil(cantidad / 20)),
      electricistas: Math.max(1, Math.ceil(cantidad / 25)),
    }
  }

  const equipo = calcularEquipo()

  // Precio actualizado con opciones adicionales
  const calcularPrecioActualizado = () => {
    let adicional = 0

    if (opciones.iluminacionAvanzada) adicional += cantidad * 45
    if (opciones.camarasAdicionales) adicional += Math.ceil(cantidad / 5) * 150
    if (opciones.aislamientoAcustico) adicional += metrosCuadrados * cantidad * 25
    if (opciones.acabadosPremium) adicional += metrosCuadrados * cantidad * 35
    if (opciones.sistemaAccesoDigital) adicional += cantidad * 85

    return costoTotal + adicional
  }

  const precioActualizado = calcularPrecioActualizado()

  // Normativas aplicables
  const normativas = [
    { nombre: "CTE DB-SI", descripcion: "Protección contra incendios" },
    { nombre: "CTE DB-SUA", descripcion: "Seguridad de utilización y accesibilidad" },
    { nombre: "REBT", descripcion: "Reglamento Electrotécnico para Baja Tensión" },
    { nombre: "Ordenanza Municipal", descripcion: "Madrid - Licencias de actividad y obras" },
    { nombre: "Ley 5/2014", descripcion: "Seguridad Privada (para sistemas CCTV)" },
    { nombre: "LOPD-GDD", descripcion: "Protección de datos (para control de accesos)" },
    { nombre: "RD 485/1997", descripcion: "Señalización de seguridad" },
  ]

  // Garantías ofrecidas
  const garantias = [
    {
      periodo: "2 años",
      elemento: "Materiales y construcción general",
      descripcion: "Cubre defectos en materiales y mano de obra",
    },
    {
      periodo: "5 años",
      elemento: "Instalación eléctrica",
      descripcion: "Garantía en todo el sistema eléctrico instalado",
    },
    { periodo: "3 años", elemento: "Sistemas de seguridad", descripcion: "CCTV, alarmas y control de acceso" },
    {
      periodo: "10 años",
      elemento: "Elementos estructurales",
      descripcion: "Paneles divisorios y elementos portantes",
    },
    { periodo: "1 año", elemento: "Mantenimiento gratuito", descripcion: "Revisiones periódicas trimestrales" },
  ]

  const toggleOpcion = (opcion: keyof typeof opciones) => {
    setOpciones({ ...opciones, [opcion]: !opciones[opcion] })
  }

  return (
    <Card className="mt-6 border-orange-200">
      <CardHeader className="pb-3 bg-orange-50 border-b border-orange-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-orange-800">Presupuesto Profesional Detallado</CardTitle>
            <CardDescription className="text-orange-700">
              Proyecto de construcción de {cantidad} trasteros en Madrid
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-orange-700 border-orange-300 bg-orange-50">
            Ref: T-{new Date().getFullYear()}-
            {Math.floor(Math.random() * 10000)
              .toString()
              .padStart(4, "0")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="general">
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="general" className="flex-1">
              General
            </TabsTrigger>
            <TabsTrigger value="equipo" className="flex-1">
              Equipo y Plazo
            </TabsTrigger>
            <TabsTrigger value="opciones" className="flex-1">
              Opciones
            </TabsTrigger>
            <TabsTrigger value="garantias" className="flex-1">
              Garantías
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <Ruler className="w-5 h-5 mt-1 text-orange-500" />
                  <div>
                    <h4 className="font-medium">Especificaciones Técnicas</h4>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>
                        • {cantidad} trasteros de tamaño {tamaño}
                      </li>
                      <li>• {metrosCuadrados} m² por unidad</li>
                      <li>• Paneles divisorios ignífugos RF-60</li>
                      <li>• Altura interior: 2.50 metros</li>
                      <li>• Puertas metálicas con cerradura de seguridad</li>
                      <li>• Iluminación LED con sensor de movimiento</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 mt-1 text-orange-500" />
                  <div>
                    <h4 className="font-medium">Normativas Aplicables</h4>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      {normativas.slice(0, 5).map((norma, index) => (
                        <li key={index}>
                          • <strong>{norma.nombre}</strong>: {norma.descripcion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border rounded-lg">
              <h4 className="mb-4 font-medium">Consideraciones del Proyecto</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 mt-1 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">Instalaciones</p>
                    <p className="mt-1 text-sm text-gray-600">
                      El proyecto incluye instalación eléctrica completa, sistema CCTV básico con monitorización 24/7,
                      iluminación LED con sensores de movimiento y sistema de alarma contra intrusión.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Landmark className="w-5 h-5 mt-1 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">Permisos y Licencias</p>
                    <p className="mt-1 text-sm text-gray-600">
                      Gestionamos toda la documentación necesaria ante el Ayuntamiento de Madrid, incluyendo la licencia
                      de obras y certificados de habitabilidad y seguridad.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 text-center border-t border-orange-100 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                Este presupuesto tiene una validez de 30 días a partir de la fecha de emisión.
              </p>
              <div className="flex justify-center gap-3 mt-3">
                <Button variant="outline" className="text-orange-600 border-orange-300 hover:bg-orange-100">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar PDF
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600">Solicitar visita técnica</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="equipo" className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 mt-1 text-orange-500" />
                  <div>
                    <h4 className="font-medium">Equipo Asignado</h4>
                    <ul className="mt-2 space-y-2 text-sm text-gray-600">
                      <li className="flex justify-between">
                        <span>Jefe(s) de Obra:</span>
                        <span className="font-medium">{equipo.jefesObra}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Oficial(es) de primera:</span>
                        <span className="font-medium">{equipo.oficiales}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Peón(es):</span>
                        <span className="font-medium">{equipo.peones}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Instalador(es):</span>
                        <span className="font-medium">{equipo.instaladores}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Electricista(s):</span>
                        <span className="font-medium">{equipo.electricistas}</span>
                      </li>
                    </ul>
                    <p className="mt-4 text-xs italic text-gray-500">
                      *Todo nuestro personal está altamente cualificado y cuenta con la formación en PRL necesaria.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  <CalendarDays className="w-5 h-5 mt-1 text-orange-500" />
                  <div>
                    <h4 className="font-medium">Plazos de Ejecución</h4>
                    <ul className="mt-2 space-y-2 text-sm text-gray-600">
                      <li className="flex justify-between">
                        <span>Fase de diseño y proyecto:</span>
                        <span className="font-medium">{plazos.diseno}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Tramitación de licencias:</span>
                        <span className="font-medium">{plazos.tramitacion}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Ejecución de obra:</span>
                        <span className="font-medium">{plazos.construccion}</span>
                      </li>
                      <li className="flex justify-between pt-2 mt-2 border-t">
                        <span className="font-medium">Plazo total estimado:</span>
                        <span className="font-bold text-orange-600">{plazos.total}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border rounded-lg">
              <div className="flex items-start gap-3">
                <HardHat className="w-5 h-5 mt-1 text-orange-500" />
                <div>
                  <h4 className="font-medium">Proceso de Ejecución</h4>
                  <ol className="mt-3 space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full shrink-0">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Replanteo y preparación del espacio</p>
                        <p className="text-gray-600">
                          Marcado del terreno, preparación de superficies y comprobación de medidas.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full shrink-0">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Instalación de estructura base</p>
                        <p className="text-gray-600">
                          Montaje de soportes y estructura metálica para anclaje de paneles.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full shrink-0">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Montaje de paneles divisorios</p>
                        <p className="text-gray-600">Colocación de paneles ignífugos y divisiones entre trasteros.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full shrink-0">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Instalaciones técnicas</p>
                        <p className="text-gray-600">Electricidad, iluminación, sistemas de seguridad y CCTV.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full shrink-0">
                        5
                      </div>
                      <div>
                        <p className="font-medium">Acabados y puertas</p>
                        <p className="text-gray-600">Montaje de puertas, cerraduras, pintura y acabados finales.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full shrink-0">
                        6
                      </div>
                      <div>
                        <p className="font-medium">Control de calidad y entrega</p>
                        <p className="text-gray-600">
                          Verificación final, pruebas de sistemas y entrega de documentación.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="opciones" className="p-6 space-y-6">
            <div className="mb-4">
              <h4 className="font-medium">Mejoras y Opciones Adicionales</h4>
              <p className="mt-1 text-sm text-gray-600">
                Personalice su proyecto con estas opciones adicionales para mejorar la calidad y funcionalidad.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 text-orange-500 bg-orange-50 rounded-md">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <Label htmlFor="iluminacion" className="font-medium">
                      Iluminación LED avanzada
                    </Label>
                    <p className="text-xs text-gray-500">
                      Iluminación premium con control de intensidad y temporizador
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">+45€/trastero</p>
                  <Switch
                    id="iluminacion"
                    checked={opciones.iluminacionAvanzada}
                    onCheckedChange={() => toggleOpcion("iluminacionAvanzada")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 text-orange-500 bg-orange-50 rounded-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <Label htmlFor="camaras" className="font-medium">
                      Cámaras CCTV adicionales
                    </Label>
                    <p className="text-xs text-gray-500">
                      Mayor cobertura con cámaras de alta resolución (1 cada 5 trasteros)
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">+150€/5 trasteros</p>
                  <Switch
                    id="camaras"
                    checked={opciones.camarasAdicionales}
                    onCheckedChange={() => toggleOpcion("camarasAdicionales")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 text-orange-500 bg-orange-50 rounded-md">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <Label htmlFor="aislamiento" className="font-medium">
                      Aislamiento acústico mejorado
                    </Label>
                    <p className="text-xs text-gray-500">
                      Paneles con mayor aislamiento acústico para mayor privacidad
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">+25€/m²</p>
                  <Switch
                    id="aislamiento"
                    checked={opciones.aislamientoAcustico}
                    onCheckedChange={() => toggleOpcion("aislamientoAcustico")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 text-orange-500 bg-orange-50 rounded-md">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <Label htmlFor="acabados" className="font-medium">
                      Acabados premium
                    </Label>
                    <p className="text-xs text-gray-500">
                      Pintura de alta calidad, suelos reforzados y acabados superiores
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">+35€/m²</p>
                  <Switch
                    id="acabados"
                    checked={opciones.acabadosPremium}
                    onCheckedChange={() => toggleOpcion("acabadosPremium")}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 text-orange-500 bg-orange-50 rounded-md">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <Label htmlFor="acceso" className="font-medium">
                      Sistema de acceso digital
                    </Label>
                    <p className="text-xs text-gray-500">Control de acceso con tarjetas RFID o código personal</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium">+85€/trastero</p>
                  <Switch
                    id="acceso"
                    checked={opciones.sistemaAccesoDigital}
                    onCheckedChange={() => toggleOpcion("sistemaAccesoDigital")}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 mt-4 text-center bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Presupuesto base:</span>
                <span className="text-sm font-medium">
                  {costoTotal.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                </span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Opciones seleccionadas:</span>
                <span className="text-sm font-medium">
                  {(precioActualizado - costoTotal).toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-base font-bold">TOTAL CON OPCIONES:</span>
                <span className="text-lg font-bold text-orange-600">
                  {precioActualizado.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                </span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="garantias" className="p-6 space-y-6">
            <div className="p-4 border rounded-lg">
              <h4 className="mb-4 font-medium">Garantías del Proyecto</h4>
              <div className="space-y-4">
                {garantias.map((garantia, index) => (
                  <div key={index} className="flex p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center justify-center w-12 h-12 mr-4 text-orange-500 bg-white rounded-full border border-orange-200 shrink-0">
                      <span className="font-bold">{garantia.periodo}</span>
                    </div>
                    <div>
                      <p className="font-medium">{garantia.elemento}</p>
                      <p className="mt-1 text-sm text-gray-600">{garantia.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="mb-4 font-medium">Certificaciones y Sellos de Calidad</h4>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="flex flex-col items-center p-3 text-center bg-gray-50 rounded-md">
                  <div className="w-14 h-14 mb-2 bg-white rounded-full flex items-center justify-center border">
                    <span className="text-2xl font-bold text-gray-400">ISO</span>
                  </div>
                  <p className="text-sm font-medium">ISO 9001</p>
                  <p className="text-xs text-gray-500">Gestión de Calidad</p>
                </div>
                <div className="flex flex-col items-center p-3 text-center bg-gray-50 rounded-md">
                  <div className="w-14 h-14 mb-2 bg-white rounded-full flex items-center justify-center border">
                    <span className="text-2xl font-bold text-gray-400">CE</span>
                  </div>
                  <p className="text-sm font-medium">Marcado CE</p>
                  <p className="text-xs text-gray-500">Materiales homologados</p>
                </div>
                <div className="flex flex-col items-center p-3 text-center bg-gray-50 rounded-md">
                  <div className="w-14 h-14 mb-2 bg-white rounded-full flex items-center justify-center border">
                    <span className="text-xl font-bold text-gray-400">AENOR</span>
                  </div>
                  <p className="text-sm font-medium">AENOR</p>
                  <p className="text-xs text-gray-500">Normalización Española</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
              <h4 className="mb-4 font-medium text-orange-800">Plan de Mantenimiento Incluido</h4>
              <ul className="space-y-2 text-sm text-orange-700">
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 mt-0.5 mr-2 text-orange-500" />
                  <span>Revisiones trimestrales de sistemas eléctricos y seguridad.</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 mt-0.5 mr-2 text-orange-500" />
                  <span>Mantenimiento preventivo de cerraduras y puertas.</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 mt-0.5 mr-2 text-orange-500" />
                  <span>Limpieza técnica del sistema CCTV y sensores.</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="w-4 h-4 mt-0.5 mr-2 text-orange-500" />
                  <span>Soporte técnico telefónico 24/7 durante el primer año.</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Descargar garantías
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600">Solicitar información adicional</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
