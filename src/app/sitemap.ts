import type { MetadataRoute } from "next";
import { brands } from "@/data/brands";

// Ronda 148: cliente pidió pasar el sitio por buenas prácticas de SEO/
// identidad algorítmica para buscadores de IA. No existía ningún
// sitemap.xml — sin uno, un crawler tiene que descubrir cada URL
// siguiendo links uno por uno (y páginas de sabor "hondas" como
// /marcas/takis/blue-heat pueden tardar más en indexarse o quedar fuera).
// Next.js 13.3+ soporta este archivo nativamente (confirmado: el
// proyecto corre en 14.2.5) — exportar `sitemap()` desde app/sitemap.ts
// genera /sitemap.xml automáticamente, sin tocar next.config.js.
//
// Mismo dominio que src/app/layout.tsx (SITE_URL) — no se importa desde
// ahí porque ese archivo es un Client/Server Component con metadata, y
// duplicar una sola constante de string es más simple que crear un
// módulo compartido solo para esto. Si el dominio final cambia, hay que
// actualizar los dos lugares.
const SITE_URL = "https://barcel-website.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/marcas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/sobre-nosotros`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/contacto`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  // Ronda 148: misma fuente de verdad que el resto del sitio (brands.ts)
  // — nada de rutas hardcodeadas que se puedan desincronizar. El filtro
  // `f.slug` reutiliza el mismo patrón ya usado en TakisProductDetail.tsx
  // para descartar sabores sin slug propio (algunos flavors solo existen
  // como texto de referencia, sin página de detalle dedicada).
  const brandRoutes: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${SITE_URL}/marcas/${brand.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const flavorRoutes: MetadataRoute.Sitemap = brands.flatMap((brand) =>
    (brand.flavors ?? [])
      .filter((f) => f.slug)
      .map((flavor) => ({
        url: `${SITE_URL}/marcas/${brand.slug}/${flavor.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
  );

  return [...staticRoutes, ...brandRoutes, ...flavorRoutes];
}
