import type { Metadata } from "next";
import "./globals.css";

// Nota: las fuentes se cargan vía <link> en el <head> (en vez de next/font/google)
// para que el build no dependa de acceso a fonts.googleapis.com en tiempo de
// compilación. En Vercel funcionará igual; si luego se quiere optimizar con
// next/font/google (self-hosting automático), basta con revertir este cambio.

export const metadata: Metadata = {
  title: "Barcel | Bienvenido al Universo Barcel",
  description:
    "Explora todas las marcas de Barcel: Chip's, Takis, Big Mix, Runners, Hot Nuts y Golden Nuts. Sabor y calidad, así es Barcel.",
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
      </head>
      <body className="font-body antialiased bg-white">{children}</body>
    </html>
  );
}
