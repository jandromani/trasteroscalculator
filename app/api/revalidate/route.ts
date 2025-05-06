import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// Esta API permite forzar la revalidación de las páginas para mantener el SEO actualizado
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/"
  const secret = request.nextUrl.searchParams.get("secret")

  // Verificar que la solicitud incluye un token secreto válido
  // Esto es para evitar que cualquiera pueda revalidar tu sitio
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      {
        revalidated: false,
        message: "Invalid token",
      },
      { status: 401 },
    )
  }

  try {
    // Revalidar la ruta solicitada
    revalidatePath(path)
    return NextResponse.json({
      revalidated: true,
      message: `Path ${path} revalidated successfully`,
    })
  } catch (err) {
    // Si hay un error, devolver un mensaje de error
    return NextResponse.json(
      {
        revalidated: false,
        message: `Error revalidating: ${err instanceof Error ? err.message : String(err)}`,
      },
      { status: 500 },
    )
  }
}
