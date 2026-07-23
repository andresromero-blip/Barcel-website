import Link from "next/link";
import type { Brand } from "@/data/brands";

export default function BrandCard({
  brand,
  dimmed,
  highlighted,
}: {
  brand: Brand;
  dimmed: boolean;
  highlighted: boolean;
}) {
  const hasRealLogo = Boolean(brand.logo && brand.logoHover);

  // En mobile (una sola columna) el tile de color/logo SIEMPRE va primero,
  // sin importar imageFirst — así lo requiere el diseño aprobado. imageFirst
  // solo decide el lado (izquierda/derecha) en el grid de 2 columnas de
  // desktop, usando md:order-* en vez de reordenar el DOM.
  const imageTile = (
    <div
      className={`group relative flex min-h-[220px] items-center justify-center overflow-hidden p-8 md:min-h-[300px] ${
        brand.imageFirst ? "" : "md:order-2"
      } ${brand.bg}`}
    >
      {hasRealLogo ? (
        <>
          {/* Estado default */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brand.logo}
            alt={`Logo ${brand.name}`}
            className="h-40 w-auto max-w-[80%] object-contain transition-all duration-300 ease-out group-hover:opacity-0 group-hover:scale-95 md:h-56"
          />
          {/* Estado hover: microinteracción — el producto asoma junto al logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brand.logoHover}
            alt=""
            aria-hidden="true"
            className="absolute h-44 w-auto max-w-[85%] object-contain opacity-0 scale-105 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 md:h-64"
          />
        </>
      ) : (
        <span
          className={`font-display text-3xl font-black uppercase tracking-tight transition-transform duration-300 group-hover:scale-105 md:text-5xl ${brand.logoText}`}
        >
          {brand.name}
          <sup className="ml-1 text-[0.4em]">®</sup>
        </span>
      )}
    </div>
  );

  const textTile = (
    <div
      className={`flex flex-col justify-center gap-3 bg-white p-8 md:p-12 ${
        brand.imageFirst ? "" : "md:order-1"
      }`}
    >
      <h3 className="font-display text-2xl font-extrabold text-barcel-black md:text-3xl">
        {brand.name}
        <sup className="text-[0.45em]">®</sup>
      </h3>
      <p className={`font-display text-sm font-bold md:text-base ${brand.textOnBg}`}>
        {brand.tagline}
      </p>
      <p className="font-body text-sm leading-relaxed text-barcel-black/70">
        {brand.description}
      </p>
      <Link
        href="/marcas"
        className="group mt-2 inline-flex w-fit items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wide text-barcel-black"
      >
        Ver todos los productos
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );

  return (
    <article
      id={brand.slug}
      className={`flex flex-col overflow-hidden transition-all duration-500 md:grid md:grid-cols-2 ${
        dimmed ? "opacity-30 saturate-50" : "opacity-100"
      } ${highlighted ? "ring-4 ring-barcel-red ring-offset-2" : ""}`}
    >
      {imageTile}
      {textTile}
    </article>
  );
}
