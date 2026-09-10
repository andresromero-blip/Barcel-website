import Link from "next/link";
import type { Brand } from "@/data/brands";

// Ronda 116: rediseño Figma 1:1 del grid de familia (Home > Categorías,
// "Card categoria", nodes 1:10502–1:10509). Reemplaza el layout anterior
// (tile de color + tile de texto lado a lado, imageFirst decidía el
// lado) por el nuevo patrón de Figma: tarjeta apilada — franja de color
// de marca arriba (h-[200px], con el logo centrado) y bloque de texto
// blanco abajo (título + tag + descripción + link). Es el MISMO patrón
// para las 8 marcas — ya no hay lado izq/der que alternar, así que
// brand.imageFirst deja de usarse aquí (sigue viviendo en brands.ts por
// si otras páginas —hero/portafolio de marca— lo necesitan).
//
// Pendiente (no bloqueante): Figma trae además una imagen decorativa de
// "acompañamiento" (ej. las papas sueltas bajo el logo de Chip's) dentro
// de la franja de color, y un pequeño ícono junto al título. No se
// replican todavía por no haber podido bajar esos assets puntuales del
// archivo de Figma sin arrastrar el arte completo de cada logotipo
// (vectores enmascarados, muy pesado) — el logo de marca sí es 1:1.
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
      className={`flex flex-col overflow-hidden transition-all duration-500 ${
        dimmed ? "opacity-30 saturate-50" : "opacity-100"
      } ${highlighted ? "ring-4 ring-barcel-red ring-offset-2" : ""}`}
    >
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
            className={`font-display text-3xl font-black uppercase tracking-tight md:text-5xl ${brand.logoText}`}
          >
            {brand.name}
            <sup className="ml-1 text-[0.4em]">®</sup>
          </span>
        )}
      </div>

      {/* Card text: bloque blanco con título, tag, descripción y CTA */}
      <div className="flex flex-col gap-4 bg-white px-4 py-6">
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-2xl font-bold text-barcel-black md:text-3xl">
            {brand.name}
            <sup className="text-[0.45em]">®</sup>
          </h3>
          <p className={`font-display text-base font-semibold md:text-xl ${brand.familyCardText}`}>
            {brand.tagline}
          </p>
        </div>
        <p className="font-body text-sm leading-[1.3] text-barcel-black/70 md:text-base">
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
    </article>
  );
}
