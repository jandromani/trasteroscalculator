/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://trasteros-calculator.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    additionalSitemaps: [
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/api/sitemap`
        : "https://trasteros-calculator.vercel.app/api/sitemap",
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
