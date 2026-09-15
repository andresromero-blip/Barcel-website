import type { MetadataRoute } from "next";

// Ronda 148: capa técnica de SEO/identidad algorítmica — no existía
// robots.txt. Sin uno, no hay forma explícita de apuntar a /sitemap.xml
// ni de declarar la política de rastreo del sitio; los crawlers asumen
// "todo permitido" por default, pero dejarlo implícito no es buena
// práctica. Se permite todo (no hay ninguna sección del sitio que deba
// quedar fuera del índice) y se referencia el sitemap generado en
// app/sitemap.ts.
const SITE_URL = "https://barcel-website.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
