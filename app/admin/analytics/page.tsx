"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart, Users, Calendar, TrendingUp, Activity } from "lucide-react"

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    todayVisitors: 0,
    currentlyOnline: 0,
    lastUpdated: "",
    dailyStats: [] as { date: string; count: number }[],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDetailedStats = async () => {
      try {
        // Obtener estadísticas básicas
        const basicResponse = await fetch("/api/analytics/stats")
        const basicData = await basicResponse.json()

        // Obtener estadísticas diarias (simuladas por ahora)
        // En una implementación real, crearíamos otro endpoint para esto
        const dailyStats = [
          { date: "2025-03-01", count: 45 },
          { date: "2025-03-02", count: 62 },
          { date: "2025-03-03", count: 58 },
          { date: "2025-03-04", count: 71 },
          { date: "2025-03-05", count: 83 },
          { date: "2025-03-06", count: 79 },
          { date: "2025-03-07", count: 94 },
          { date: new Date().toISOString().split("T")[0], count: basicData.todayVisitors },
        ]

        setStats({
          ...basicData,
          dailyStats,
        })
      } catch (error) {
        console.error("Error obteniendo estadísticas detalladas:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetailedStats()
    const intervalId = setInterval(fetchDetailedStats, 60000) // Actualizar cada minuto

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

  // Formatear fecha corta
  const formatShortDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Analíticas</h1>
        <p className="text-gray-600 mt-2">Monitoriza el tráfico y las estadísticas de visitas de tu sitio web</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-orange-500 rounded-full border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total de Visitas</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  {stats.totalVisitors.toLocaleString()}
                  <Users className="h-6 w-6 text-orange-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-500">Desde el lanzamiento</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Visitas Hoy</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  {stats.todayVisitors.toLocaleString()}
                  <Calendar className="h-6 w-6 text-green-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-500">Actualizado: {formatDate(stats.lastUpdated)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Actualmente Online</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  {stats.currentlyOnline.toLocaleString()}
                  <Activity className="h-6 w-6 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-500">Últimos 5 minutos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Promedio Diario</CardDescription>
                <CardTitle className="text-3xl flex items-center gap-2">
                  {stats.dailyStats.length > 0
                    ? Math.round(
                        stats.dailyStats.reduce((sum, day) => sum + day.count, 0) / stats.dailyStats.length,
                      ).toLocaleString()
                    : "0"}
                  <TrendingUp className="h-6 w-6 text-purple-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-500">Últimos 7 días</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="daily">Visitas Diarias</TabsTrigger>
              <TabsTrigger value="sources">Fuentes de Tráfico</TabsTrigger>
              <TabsTrigger value="pages">Páginas Populares</TabsTrigger>
            </TabsList>

            <TabsContent value="daily">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-orange-500" />
                    Visitas Diarias
                  </CardTitle>
                  <CardDescription>Número de visitas por día durante la última semana</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    {/* Gráfico de barras simulado */}
                    <div className="h-full flex items-end gap-4 pt-10 pb-6 px-4">
                      {stats.dailyStats.map((day, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div
                            className="w-full bg-orange-500 rounded-t-md transition-all duration-500"
                            style={{
                              height: `${(day.count / Math.max(...stats.dailyStats.map((d) => d.count))) * 100}%`,
                              minHeight: "10px",
                            }}
                          ></div>
                          <span className="text-xs mt-2 text-gray-600">{formatShortDate(day.date)}</span>
                          <span className="text-xs font-medium">{day.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sources">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-orange-500" />
                    Fuentes de Tráfico
                  </CardTitle>
                  <CardDescription>De dónde provienen tus visitantes</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="w-full max-w-md">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                        <span className="flex-1 text-sm">Búsqueda Orgánica</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="flex-1 text-sm">Directo</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="flex-1 text-sm">Redes Sociales</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span className="flex-1 text-sm">Referencias</span>
                        <span className="font-medium">5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pages">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-orange-500" />
                    Páginas Más Visitadas
                  </CardTitle>
                  <CardDescription>Las páginas más populares de tu sitio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <span className="w-8 text-center font-bold text-orange-500">1</span>
                      <div className="flex-1 ml-2">
                        <p className="font-medium">Página Principal</p>
                        <p className="text-xs text-gray-500">/</p>
                      </div>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 text-center font-bold text-orange-500">2</span>
                      <div className="flex-1 ml-2">
                        <p className="font-medium">Calculadora</p>
                        <p className="text-xs text-gray-500">/calculadora</p>
                      </div>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 text-center font-bold text-orange-500">3</span>
                      <div className="flex-1 ml-2">
                        <p className="font-medium">Contacto</p>
                        <p className="text-xs text-gray-500">/contacto</p>
                      </div>
                      <span className="font-medium">7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
