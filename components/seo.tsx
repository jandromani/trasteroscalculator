"use client"

import { useEffect, useState } from "react"
import Head from "next/head"

export default function SEO() {
  const [currentUrl, setCurrentUrl] = useState("")
  const [vercelDomain, setVercelDomain] = useState("")

  useEffect(() => {
    // Capturar la URL actual y el dominio de Vercel
    const url = window.location.href
    setCurrentUrl(url)

    // Extraer el dominio de Vercel (ejemplo: trasteros-calculator.vercel.app)
    const hostname = window.location.hostname
    setVercelDomain(hostname)
  }, [])

  // Nombre del proyecto en Vercel (para usar en los metadatos)
  const projectName = vercelDomain ? vercelDomain.split(".")[0] : "trasteros-calculator"

  // Base URL para todas las referencias
  const baseUrl = vercelDomain ? `https://${vercelDomain}` : "https://trasteros-calculator.vercel.app"

  // Imágenes para los rich snippets de Google
  const images = [
    `${baseUrl}/images/trasteros-madrid-1.jpg`,
    `${baseUrl}/images/trasteros-profesionales-2.jpg`,
    `${baseUrl}/images/instalacion-trasteros-3.png`,
    `${baseUrl}/images/trasteros-seguridad-4.png`,
  ]

  // Especificaciones de servicios
  const servicios = [
    {
      name: "Instalación de Trasteros Estándar",
      description: "Construcción e instalación de trasteros básicos con cumplimiento de normativa CTE",
      offers: {
        price: "350",
        priceCurrency: "EUR",
        priceSpecification: {
          valueAddedTaxIncluded: true,
          price: "350",
          priceCurrency: "EUR",
          unitText: "por metro cuadrado",
        },
      },
    },
    {
      name: "Instalación de Trasteros Premium",
      description: "Trasteros con mayor seguridad, aislamiento reforzado y acabados de alta calidad",
      offers: {
        price: "450",
        priceCurrency: "EUR",
        priceSpecification: {
          valueAddedTaxIncluded: true,
          price: "450",
          priceCurrency: "EUR",
          unitText: "por metro cuadrado",
        },
      },
    },
    {
      name: "Trasteros para Garajes y Parkings",
      description: "Soluciones específicas para zonas de aparcamiento con espacio optimizado",
      offers: {
        price: "380",
        priceCurrency: "EUR",
        priceSpecification: {
          valueAddedTaxIncluded: true,
          price: "380",
          priceCurrency: "EUR",
          unitText: "por metro cuadrado",
        },
      },
    },
    {
      name: "Trasteros para Comunidades de Vecinos",
      description: "Instalación de múltiples trasteros en espacios comunitarios con sistema de acceso centralizado",
      offers: {
        price: "375",
        priceCurrency: "EUR",
        priceSpecification: {
          valueAddedTaxIncluded: true,
          price: "375",
          priceCurrency: "EUR",
          unitText: "por metro cuadrado",
        },
      },
    },
    {
      name: "Trasteros para Naves Industriales",
      description: "Grandes instalaciones de trasteros en naves para alquiler o autoalmacenamiento",
      offers: {
        price: "320",
        priceCurrency: "EUR",
        priceSpecification: {
          valueAddedTaxIncluded: true,
          price: "320",
          priceCurrency: "EUR",
          unitText: "por metro cuadrado",
        },
      },
    },
  ]

  // Preguntas frecuentes para FAQPage
  const preguntas = [
    {
      question: "¿Cuánto tiempo se tarda en instalar un proyecto de trasteros?",
      answer:
        "El tiempo de instalación depende del tamaño del proyecto. Para proyectos pequeños (hasta 10 trasteros), solemos tardar entre 2-3 semanas desde la aprobación del presupuesto. Para proyectos grandes (más de 50 trasteros), el tiempo estimado es de 6-8 semanas. Incluimos el tiempo de tramitación de permisos, que suele ser de 1-2 semanas en Madrid.",
    },
    {
      question: "¿Los trasteros cumplen con la normativa contra incendios?",
      answer:
        "Sí, todos nuestros trasteros cumplen rigurosamente con el Código Técnico de la Edificación (CTE DB-SI), específicamente con la normativa de protección contra incendios. Utilizamos materiales ignífugos RF-60, instalamos puertas cortafuegos cuando es necesario y garantizamos la correcta ventilación según normativa.",
    },
    {
      question: "¿Qué garantías ofrecen en sus instalaciones?",
      answer:
        "Ofrecemos una garantía completa de 2 años en materiales y construcción, 5 años en instalaciones eléctricas y 10 años en elementos estructurales. Además, incluimos un año de mantenimiento gratuito con revisiones trimestrales y soporte técnico permanente.",
    },
    {
      question: "¿Cuál es el tamaño mínimo que debe tener un trastero según la normativa?",
      answer:
        "Según la normativa española actual, un trastero debe tener un mínimo de 2 metros cuadrados para ser considerado como tal, aunque recomendamos un mínimo de 3-4 metros cuadrados para garantizar su funcionalidad. La altura mínima recomendada es de 2,20 metros, aunque nosotros instalamos con una altura estándar de 2,50 metros para mayor comodidad.",
    },
    {
      question: "¿Qué sistemas de seguridad incluyen sus trasteros?",
      answer:
        "Nuestros trasteros incluyen cerraduras de seguridad, puertas metálicas reforzadas, y opcionalmente sistemas de vigilancia CCTV, alarmas conectadas y acceso mediante tarjeta o código personalizado. Todos los sistemas cumplen con la normativa de seguridad privada y protección de datos.",
    },
  ]

  // Reseñas para AggregateRating
  const reseñas = [
    {
      author: "Comunidad de Propietarios Alameda de Osuna",
      datePublished: "2025-02-15",
      reviewBody:
        "Excelente trabajo en la instalación de 45 trasteros en nuestro garaje comunitario. Cumplieron plazos y presupuesto.",
      reviewRating: {
        ratingValue: "5",
      },
    },
    {
      author: "Self Storage Madrid Norte",
      datePublished: "2025-01-22",
      reviewBody:
        "Contratamos la instalación de 120 trasteros para nuestro negocio de alquiler. Profesionalidad y calidad excelentes.",
      reviewRating: {
        ratingValue: "5",
      },
    },
    {
      author: "Carlos Méndez - Propietario",
      datePublished: "2024-11-10",
      reviewBody:
        "Instalaron 8 trasteros en mi local comercial para alquiler. Muy satisfecho con el resultado y la atención.",
      reviewRating: {
        ratingValue: "4",
      },
    },
  ]

  // Áreas de servicio detalladas
  const areasServicio = [
    {
      name: "Madrid Capital",
      geo: {
        latitude: 40.4168,
        longitude: -3.7038,
      },
    },
    {
      name: "Alcorcón",
      geo: {
        latitude: 40.3475,
        longitude: -3.8277,
      },
    },
    {
      name: "Leganés",
      geo: {
        latitude: 40.3262,
        longitude: -3.7589,
      },
    },
  ]

  // Combinar todas las partes en un objeto JSON-LD principal
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Información de LocalBusiness (completa)
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "ProfessionalService"],
        "@id": `${baseUrl}/#business`,
        name: "Trasteros Pro Madrid",
        alternateName: ["Trasteros Profesionales Madrid", "TP Instalaciones"],
        description:
          "Empresa especializada en diseño, fabricación e instalación de trasteros a medida en Madrid y alrededores. Cumplimos con todas las normativas y ofrecemos garantía y mantenimiento.",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
          width: "180",
          height: "60",
        },
        image: images.map((url) => ({
          "@type": "ImageObject",
          url: url,
        })),
        telephone: "+34612345678",
        email: "info@trasterospro.es",
        currenciesAccepted: "EUR",
        paymentAccepted: "Efectivo, Tarjeta de crédito, Transferencia bancaria, Financiación",
        priceRange: "€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: "C/ Ejemplo 123",
          addressLocality: "Madrid",
          postalCode: "28001",
          addressRegion: "Madrid",
          addressCountry: "ES",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 40.4168,
          longitude: -3.7038,
        },
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: 40.4168,
            longitude: -3.7038,
          },
          geoRadius: "100000",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de instalación de trasteros",
          itemListElement: servicios.map((servicio, index) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: servicio.name,
              description: servicio.description,
            },
            offers: servicio.offers,
          })),
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          bestRating: "5",
          worstRating: "1",
          ratingCount: "156",
          reviewCount: "87",
        },
        review: reseñas.map((reseña) => ({
          "@type": "Review",
          author: {
            "@type": "Person",
            name: reseña.author,
          },
          datePublished: reseña.datePublished,
          reviewBody: reseña.reviewBody,
          reviewRating: {
            "@type": "Rating",
            ...reseña.reviewRating,
            bestRating: "5",
            worstRating: "1",
          },
        })),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "10:00",
            closes: "14:00",
          },
        ],
        serviceArea: areasServicio.map((area) => ({
          "@type": "AdministrativeArea",
          name: area.name,
          geo: area.geo,
        })),
      },

      // 2. Información de WebSite
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Trasteros Pro Madrid | Instalación y Construcción de Trasteros",
        description:
          "Empresa líder en construcción e instalación de trasteros en Madrid. Presupuesto gratuito y sin compromiso.",
        publisher: {
          "@id": `${baseUrl}/#business`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/buscar?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        copyrightYear: "2025",
        inLanguage: "es",
      },

      // 3. FAQPage para las preguntas frecuentes
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        mainEntity: preguntas.map((pregunta) => ({
          "@type": "Question",
          name: pregunta.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: pregunta.answer,
          },
        })),
      },

      // 4. WebPage para la página actual
      {
        "@type": "WebPage",
        "@id": currentUrl || baseUrl,
        url: currentUrl || baseUrl,
        name: "Calculadora de Presupuestos para Trasteros | Trasteros Pro Madrid",
        description:
          "Calcule al instante el presupuesto para su proyecto de trasteros. Herramienta precisa que incluye materiales, mano de obra y cumplimiento de normativas.",
        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },
        datePublished: "2024-09-15T12:00:00+01:00",
        dateModified: new Date().toISOString(),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", ".speakable"],
        },
      },
    ],
  }

  return (
    <>
      <Head>
        {/* Google Search Console Verification Meta Tag */}
        <meta name="google-site-verification" content="REEMPLAZA_ESTO_CON_TU_CÓDIGO_DE_VERIFICACIÓN" />

        {/* Metadatos básicos */}
        <title>Calculadora de Presupuestos para Trasteros | Trasteros Pro Madrid</title>
        <meta
          name="description"
          content="Calcule al instante el presupuesto para su proyecto de trasteros. Herramienta precisa que incluye materiales, mano de obra y cumplimiento de normativas."
        />
        <meta
          name="keywords"
          content="trasteros madrid, instalación trasteros, construcción trasteros, trasteros a medida, trasteros normativa, presupuesto trasteros, trasteros comunidad vecinos, trasteros garaje, empresa trasteros, trasteros precio metro cuadrado"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Trasteros Pro Madrid | Calculadora de Presupuestos para Trasteros" />
        <meta
          property="og:description"
          content="Calcule al instante el presupuesto para su proyecto de trasteros. Especialistas en instalación y construcción de trasteros en Madrid."
        />
        <meta property="og:url" content={currentUrl || baseUrl} />
        <meta property="og:image" content={`${baseUrl}/images/og-image.jpg`} />
        <meta property="og:site_name" content="Trasteros Pro Madrid" />
        <meta property="og:locale" content="es_ES" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Trasteros Pro Madrid | Calculadora de Presupuestos para Trasteros" />
        <meta
          name="twitter:description"
          content="Calcule al instante el presupuesto para su proyecto de trasteros. Especialistas en instalación y construcción de trasteros en Madrid."
        />
        <meta name="twitter:image" content={`${baseUrl}/images/twitter-image.jpg`} />

        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl || baseUrl} />
      </Head>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </>
  )
}
