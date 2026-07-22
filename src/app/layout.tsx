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
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="font-body antialiased bg-white">{children}</body>
    </html>
  );
}
