import Link from "next/link";
import type { Brand } from "@/data/brands";

// Ronda 116: rediseño Figma 1:1 MOBILE del grid de familia (Home >
// Categorías, "Card categoria", nodes 1:10502–1:10509) — tarjeta apilada:
// franja de color arriba (h-[200px], logo centrado) y bloque de texto
// blanco abajo. Ronda 117 la deja SOLO para mobile/tablet (md:hidden):
// el usuario reportó que el desktop en vivo no se parecía en nada al
// Figma real (https://.../node-id=1-3134) — Ronda 116 había estirado
// este mismo patrón apilado a un grid de 4 columnas en desktop
// ("provisional"), pero el Figma desktop real (node 1:3202,
// "Cards Categorías") es un patrón completamente distinto: una sola
// columna de 8 filas full-width, cada una con la franja de color y el
// bloque de texto LADO A LADO (no apilados) y alternando de lado en cada
// fila. Ver <DesktopCard> más abajo para ese layout, verificado 1:1
// contra get_design_context de cada fila real (I1:3202;205:3057 para
// Chip's [logo-izq], I1:3202;205:3144 para Takis [texto-izq]).
function MobileCard({ brand }: { brand: Brand }) {
  return (
    <div className="flex flex-col overflow-hidden md:hidden">
      {/* Logo marca: franja de color, h-200px en Figma */}
      <div
        className={`relative flex h-[200px] items-center justify-center overflow-hidden p-8 ${brand.familyCardBg}`}
      >
        {brand.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brand.logo}
            alt={`Logo ${brand.name}`}
            className="h-full w-full max-w-[70%] object-contain"
          />
        ) : (
          <span
            className={`font-display text-3xl font-black uppercase tracking-tight ${brand.logoText}`}
          >
            {brand.name}
            <sup className="ml-1 text-[0.4em]">®</sup>
          </span>
        )}
      </div>

      {/* Card text: bloque blanco con título, tag, descripción y CTA */}
      <div className="flex flex-col gap-4 bg-white px-4 py-6">
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-2xl font-bold text-barcel-black">
            {brand.name}
            <sup className="text-[0.45em]">®</sup>
          </h3>
          <p className={`font-display text-base font-semibold ${brand.familyCardText}`}>
            {brand.tagline}
          </p>
        </div>
        <p className="font-body text-sm leading-[1.3] text-barcel-black/70">
          {brand.description}
        </p>
        <Link
          href={`/marcas/${brand.slug}`}
          className="group mt-1 inline-flex w-fit items-center gap-1.5 font-body text-sm font-semibold text-barcel-black underline"
        >
          Ver todos los productos
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

// Ronda 117: fila desktop 1:1 con Figma (node 1:3202 "Cards Categorías",
// 8 instancias "Card categoria" full-width de 1440x650 apiladas SIN gap
// — no un grid de columnas). Cada fila = franja de color (mitad) + bloque
// de texto blanco (mitad), lado a lado, alternando qué mitad va primero
// según brand.imageFirst (ya existía en brands.ts, verificado 1:1 contra
// Figma: chips=true→logo-izq, takis=false→texto-izq, y así sucesivamente
// en alternancia estricta — coincide con el patrón real de las 8 filas).
// Tamaños de fuente/padding replican los valores literales de Figma
// (64px título, 36px tag, 24px descripción, px-80/gap-48 del bloque de
// texto) en el breakpoint xl (pantallas ≥1280px, el ancho real del
// frame); en md/lg se escalan hacia abajo para no romper en laptops más
// angostas — Figma no define un breakpoint intermedio propio.
function DesktopCard({ brand }: { brand: Brand }) {
  return (
    <div
      className={`hidden md:flex md:min-h-[360px] lg:min-h-[460px] xl:min-h-[650px] ${
        brand.imageFirst ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Logo marca: mitad de color, logo centrado */}
      <div
        className={`flex flex-1 items-center justify-center overflow-hidden p-10 lg:p-14 xl:p-16 ${brand.familyCardBg}`}
      >
        {brand.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brand.logo}
            alt={`Logo ${brand.name}`}
            className="h-full max-h-[420px] w-full max-w-[420px] object-contain"
          />
        ) : (
          <span
            className={`font-display text-6xl font-black uppercase tracking-tight ${brand.logoText}`}
          >
            {brand.name}
            <sup className="ml-1 text-[0.4em]">®</sup>
          </span>
        )}
      </div>

      {/* Card text: mitad blanca con título, tag, descripción y CTA */}
      <Link
        href={`/marcas/${brand.slug}`}
        className="flex flex-1 flex-col justify-center gap-6 bg-white px-8 py-10 lg:gap-8 lg:px-12 xl:gap-12 xl:px-20"
      >
        <div className="flex flex-col gap-4 xl:gap-6">
          <div className="flex items-start gap-3 xl:gap-4">
            <h3 className="font-display text-3xl font-bold leading-none text-barcel-black lg:text-5xl xl:text-[64px]">
              {brand.name}
            </h3>
            <sup className="mt-1 text-base text-barcel-black lg:text-xl xl:text-2xl">®</sup>
          </div>
          <p className={`font-display text-lg font-semibold lg:text-2xl xl:text-[36px] ${brand.familyCardText}`}>
            {brand.tagline}
          </p>
        </div>
        <p className="font-body text-sm leading-[1.3] text-barcel-black/70 lg:text-base xl:text-[24px]">
          {brand.description}
        </p>
        <span className="group inline-flex w-fit items-center gap-2 py-2 font-body text-sm font-medium text-barcel-black underline xl:gap-4 xl:py-3 xl:text-lg">
          Ver todos los productos
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </span>
      </Link>
    </div>
  );
}

export default function BrandCard({
  brand,
  dimmed,
  highlighted,
}: {
  brand: Brand;
  dimmed: boolean;
  highlighted: boolean;
}) {
  return (
    <article
      id={brand.slug}
      className={`transition-all duration-500 ${
        dimmed ? "opacity-30 saturate-50" : "opacity-100"
      } ${highlighted ? "ring-4 ring-barcel-red ring-offset-2" : ""}`}
    >
      <MobileCard brand={brand} />
      <DesktopCard brand={brand} />
    </article>
  );
}
