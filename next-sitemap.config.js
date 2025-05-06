/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://tu-nuevo-dominio.com", // Actualiza esta URL
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    additionalSitemaps: [
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/sitemap`
        : "https://trasterosmadrid.vercel.app/", // Actualiza esta URL
    ],
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*"],
      },
    ],
  },
}
