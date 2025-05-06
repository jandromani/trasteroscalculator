import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Crear cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST() {
  try {
    // Obtener fecha actual en formato YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0]

    // Verificar si ya existe un registro para hoy
    const { data: existingData } = await supabase.from("daily_visits").select("*").eq("date", today).single()

    if (existingData) {
      // Actualizar contador de visitas para hoy
      await supabase
        .from("daily_visits")
        .update({ count: existingData.count + 1 })
        .eq("date", today)
    } else {
      // Crear nuevo registro para hoy
      await supabase.from("daily_visits").insert([{ date: today, count: 1 }])
    }

    // Registrar visita individual con timestamp
    await supabase.from("visits").insert([
      {
        timestamp: new Date().toISOString(),
        user_agent: "", // Podríamos capturar esto de los headers
        referrer: "", // Podríamos capturar esto de los headers
      },
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error registrando visita:", error)
    return NextResponse.json({ error: "Error registrando visita" }, { status: 500 })
  }
}
