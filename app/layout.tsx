import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SEO from "@/components/seo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trasteros Pro Madrid | Calculadora de Presupuestos",
  description:
    "Calcula al instante el presupuesto para tu proyecto de trasteros en Madrid. Presupuestos detallados y profesionales.",
  keywords:
    "trasteros madrid, instalación trasteros, construcción trasteros, presupuesto trasteros, calculadora trasteros",
  robots: "index, follow",
  authors: [{ name: "Trasteros Pro Madrid" }],
  creator: "Trasteros Pro Madrid",
  publisher: "Trasteros Pro Madrid",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Trasteros Pro Madrid | Calculadora de Presupuestos",
    description:
      "Calcula al instante el presupuesto para tu proyecto de trasteros en Madrid. Presupuestos detallados y profesionales.",
    url: "https://trasteros-calculator.vercel.app",
    siteName: "Trasteros Pro Madrid",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trasteros Pro Madrid | Calculadora de Presupuestos",
    description:
      "Calcula al instante el presupuesto para tu proyecto de trasteros en Madrid. Presupuestos detallados y profesionales.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SEO />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
