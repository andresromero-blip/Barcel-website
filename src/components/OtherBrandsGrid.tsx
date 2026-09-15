import Link from "next/link";
import type { Brand } from "@/data/brands";
import { LOGO_SIZE } from "./LogoMarquee";

// Ronda 54: extraído de BrandPage.tsx ("Explora otras marcas") para
// reutilizarlo tal cual en la página de detalle de sabor de Takis
// ("También te puede antojar" del mockup — mismas 5 marcas, mismo
// diseño de pill con cuadro de color, no el slider de sabores del
// mismo brand que usaba antes RelatedProductsSlider).
//
// Ronda 149: el cliente pidió reemplazar el cuadro de color + nombre de
// marca por el logo real de cada marca — "en lugar de el cuadrado de
// color y el nombre de la marca, utiliza los logos". Se reutiliza el
// mismo componente <img src={b.logo}> + LOGO_SIZE que ya usa
// LogoMarquee.tsx en el Home: esos tamaños por marca ya están calibrados
// 1:1 contra Figma para que las 8 marcas se vean con el mismo "peso
// visual" (área de tinta) entre sí, así que no hace falta inventar un
// tamaño nuevo aquí — object-contain + una altura fija (no un cuadro
// cuadrado) porque los archivos reales varían de wordmark casi cuadrado
// (Chip's, Takis...) a muy horizontal (Golden Nuts, 600x245), y forzar
// un mismo ancho los distorsionaría.
export default function OtherBrandsGrid({
  brands,
  heading,
  subheading,
}: {
  brands: Brand[];
  heading: string;
  subheading?: string;
}) {
  return (
    <div className="container-page">
      <h2 className="font-teko text-3xl font-bold uppercase text-barcel-black md:text-4xl">
        {heading}
      </h2>
      {subheading && (
        <p className="mt-1 font-body text-sm text-barcel-black/60">{subheading}</p>
      )}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {brands.map((b) => (
          <Link
            key={b.slug}
            href={`/marcas/${b.slug}`}
            aria-label={`Ir a la página de ${b.name}`}
            className={`group flex items-center justify-center gap-3 border-2 border-barcel-black/10 bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-md ${b.hoverBg}`}
          >
            {b.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={b.logo}
                alt={b.name}
                className={`w-auto object-contain ${LOGO_SIZE[b.slug] ?? "h-8 md:h-9"}`}
              />
            ) : (
              // Fallback defensivo (mismo patrón que BrandCard.tsx): brand.logo
              // es opcional en el tipo Brand, aunque hoy las 8 marcas ya
              // tienen logo real cargado.
              <span className={`font-display text-sm font-bold uppercase tracking-wide ${b.hoverText}`}>
                {b.name}
                <sup className="text-[0.6em]">®</sup>
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
