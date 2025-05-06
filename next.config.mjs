/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para optimizar la indexación en buscadores
  poweredByHeader: false, // Elimina el header X-Powered-By para mayor seguridad
  
  // Configuración para optimizar imágenes
  images: {
    domains: ['trasteros-calculator.vercel.app'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    unoptimized: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuración para mejorar el rendimiento
  experimental: {
    // Removed optimizeCss that was causing build errors
  },
  
  // Configuración para mejorar el SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ]
  },
}

export default nextConfig
