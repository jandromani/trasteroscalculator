import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Crear cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    // Obtener fecha actual en formato YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0]

    // Obtener total de visitas
    const { count: totalVisitors } = await supabase.from("visits").select("*", { count: "exact", head: true })

    // Obtener visitas de hoy
    const { data: todayData } = await supabase.from("daily_visits").select("count").eq("date", today).single()

    // Calcular usuarios actualmente online (últimos 5 minutos)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    const { count: currentlyOnline } = await supabase
      .from("visits")
      .select("*", { count: "exact", head: true })
      .gte("timestamp", fiveMinutesAgo)

    return NextResponse.json({
      totalVisitors: totalVisitors || 0,
      todayVisitors: todayData?.count || 0,
      currentlyOnline: currentlyOnline || 0,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error)
    return NextResponse.json(
      {
        totalVisitors: 0,
        todayVisitors: 0,
        currentlyOnline: 0,
        lastUpdated: new Date().toISOString(),
        error: "Error obteniendo estadísticas",
      },
      { status: 500 },
    )
  }
}
