"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Eye, BarChart, Clock } from "lucide-react"

export default function VisitorCounter() {
  const [visitorStats, setVisitorStats] = useState({
    totalVisitors: 0,
    currentlyOnline: 0,
    todayVisitors: 0,
    lastUpdated: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Función para registrar una visita
    const registerVisit = async () => {
      try {
        const response = await fetch("/api/analytics/register-visit", {
          method: "POST",
        })

        if (response.ok) {
          fetchStats()
        }
      } catch (error) {
        console.error("Error registrando visita:", error)
      }
    }

    // Función para obtener estadísticas
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/analytics/stats")
        if (response.ok) {
          const data = await response.json()
          setVisitorStats(data)
        }
      } catch (error) {
        console.error("Error obteniendo estadísticas:", error)
      } finally {
        setLoading(false)
      }
    }

    // Registrar visita al cargar la página
    registerVisit()

    // Configurar intervalo para actualizar estadísticas
    const intervalId = setInterval(fetchStats, 30000) // Actualizar cada 30 segundos

    // Limpiar intervalo al desmontar
    return () => clearInterval(intervalId)
  }, [])

  // Formatear fecha
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-64 bg-white/95 backdrop-blur-sm shadow-lg border-orange-200">
        <CardHeader className="pb-2 pt-3">
          <CardTitle className="text-sm flex items-center gap-2 text-orange-700">
            <BarChart className="h-4 w-4" />
            Estadísticas de Visitas
          </CardTitle>
          <CardDescription className="text-xs">Datos en tiempo real</CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          {loading ? (
            <div className="flex justify-center py-2">
              <div className="animate-spin h-5 w-5 border-2 border-orange-500 rounded-full border-t-transparent"></div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-orange-500" />
                  Total de visitas:
                </span>
                <span className="font-medium text-sm">{visitorStats.totalVisitors.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-green-500" />
                  Visitantes hoy:
                </span>
                <span className="font-medium text-sm">{visitorStats.todayVisitors.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-gray-500" />
                  Actualizado:
                </span>
                <span className="text-xs text-gray-500">{formatDate(visitorStats.lastUpdated)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
