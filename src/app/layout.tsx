import type { Metadata } from "next";
import "./globals.css";

// Nota: las fuentes se cargan vía <link> en el <head> (en vez de next/font/google)
// para que el build no dependa de acceso a fonts.googleapis.com en tiempo de
// compilación. En Vercel funcionará igual; si luego se quiere optimizar con
// next/font/google (self-hosting automático), basta con revertir este cambio.

// Ronda 148: cliente pidió pasar los textos del sitio por "buenas prácticas
// de identidad algorítmica" y optimización SEO/buscadores de IA. Se
// interpreta como la capa técnica que un crawler tradicional (Google) y un
// crawler de IA (que arma respuestas a partir de la página, no solo la
// indexa) necesitan para identificar de qué trata el sitio sin ambigüedad:
// metadataBase real, título/descripción completos y correctos, Open
// Graph/Twitter Card (para que un link compartido en redes o WhatsApp se
// vea bien), robots/canonical explícitos, y JSON-LD (Organization+WebSite)
// para que un motor de búsqueda con IA pueda extraer la identidad de la
// marca como datos estructurados, no solo como texto suelto.
//
// SITE_URL: no existe todavía un dominio de producción confirmado por el
// cliente — el sitio vive en Vercel (barcel-website.vercel.app). Se usa
// ese dominio como base real y verificable en vez de inventar uno
// (barcel.com, barcel.mx, etc. no son del cliente y declararlos aquí sería
// falso). Cuando exista un dominio final, este es el único valor a
// cambiar — todo lo demás (canonical, OG, JSON-LD) se deriva de aquí.
const SITE_URL = "https://barcel-website.vercel.app";

// Ronda 148: la descripción anterior listaba solo 6 de las 8 marcas reales
// (le faltaban POP y Tostachos, agregadas en Ronda 111 a brands.ts pero
// nunca reflejadas aquí) — esto no es una decisión editorial, es corregir
// un dato desactualizado. Ver src/data/brands.ts para la lista fuente.
const SITE_DESCRIPTION =
  "Descubre el universo Barcel®: Chip's, Takis, Runners, Big Mix, Hot Nuts, POP, Golden Nuts y Tostachos. Botanas con sabor y calidad para cada antojo, hechas en México.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Barcel | Bienvenido al Universo Barcel",
    // Ronda 148: template para que cada página interna (marca, sabor,
    // contacto) arme su propio <title> único en vez de repetir el mismo
    // string en todo el sitio — encabezados/títulos duplicados entre
    // páginas son una señal negativa tanto para SEO clásico como para un
    // crawler de IA tratando de distinguir el contenido de cada URL. Las
    // páginas que ya exportan su propio `metadata.title` (si las hay)
    // heredan este template automáticamente vía Next.js.
    template: "%s | Barcel",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Barcel",
    "botanas",
    "Chip's",
    "Takis",
    "Runners",
    "Big Mix",
    "Hot Nuts",
    "POP",
    "Golden Nuts",
    "Tostachos",
    "papas fritas",
    "snacks México",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: "Barcel",
    title: "Barcel | Bienvenido al Universo Barcel",
    description: SITE_DESCRIPTION,
    // Ronda 148: no existe un asset de Open Graph dedicado (1200x630) en
    // el proyecto — se reutiliza un banner real del hero en vez de dejar
    // el campo vacío (sin imagen, la mayoría de plataformas no arma
    // preview alguno al compartir el link). Candidato claro a
    // reemplazarse por un diseño 1200x630 dedicado cuando el cliente lo
    // provea.
    images: [{ url: "/hero/slide-chips-35-anos.jpg", width: 1774, height: 887, alt: "Barcel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barcel | Bienvenido al Universo Barcel",
    description: SITE_DESCRIPTION,
    images: ["/hero/slide-chips-35-anos.jpg"],
  },
};

// Ronda 148: JSON-LD (schema.org) con datos estructurados de Organization
// + WebSite. Esto es lo que un buscador de IA (o el Knowledge Graph de
// Google) usa para confirmar "quién es" el sitio de forma inequívoca, en
// vez de tener que inferirlo del texto visible. Se deja fuera
// deliberadamente el campo `sameAs` (perfiles de redes sociales): los 3
// links del Footer (Facebook/Instagram/YouTube) son todos href="#"
// placeholder — no existe todavía una URL real de ningún perfil oficial.
// Inventar URLs de redes sociales sería un dato falso que un motor de
// búsqueda con IA podría tomar como verificación de identidad; se agrega
// `sameAs` en cuanto el cliente confirme los perfiles reales.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Barcel",
      url: SITE_URL,
      logo: `${SITE_URL}/logos/barcel-logo-horizontal.png`,
      description: SITE_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Barcel",
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "es-MX",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&family=Teko:wght@400;500;600;700&family=Anton&family=Permanent+Marker&display=swap"
        />
        {/* Ronda 47: kit web de Adobe Fonts del cliente (fonts.adobe.com,
            proyecto "Barcel Website") — trae las fuentes REALES del Takis
            Global Brandbook 2025 (Veneer para headlines, Acumin Pro para
            cuerpo de texto), con licencia activa vía su cuenta de Creative
            Cloud. Reemplaza a Anton/Permanent Marker como sustitutos (ver
            globals.css) — esos quedan solo como fallback si el kit no
            carga. */}
        <link rel="stylesheet" href="https://use.typekit.net/zib0uot.css" />
        {/* Ronda 148: JSON-LD de Organization+WebSite — ver structuredData
            arriba para el detalle de qué se incluye y qué se omite. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body antialiased bg-white">{children}</body>
    </html>
  );
}
