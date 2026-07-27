import Link from "next/link";
import { brands } from "@/data/brands";

// Ronda 42: los .png de logo NO vienen recortados al contenido real — cada
// archivo tiene una cantidad distinta de "aire" (canvas cuadrado 597x597 con
// el wordmark centrado, salvo Golden Nuts que sí viene recortado ~93% de
// alto). Con una altura de <img> fija e igual para todos (h-7/h-8 anterior),
// el resultado visual era que Golden Nuts (poco aire) se veía grande y el
// resto (mucho aire, sobre todo Runners y Chip's) se veía diminuto — no es
// que los logos midan distinto, es que el "tinta" real dentro del archivo
// ocupa un % de alto muy distinto por marca.
//
// Fix: en vez de recortar los .png (usados también en BrandCard/BrandPage,
// fuera de alcance de este ajuste), se calcula por marca la altura de <img>
// necesaria para que la ALTURA REAL DEL LOGO (no del canvas) quede igual a
// la de Golden Nuts — que es el logo que el cliente pidió usar como
// referencia de tamaño. Fórmula: alturaCanvas = alturaTintaGoldenNuts /
// (altoBBoxContenido / altoCanvas) de cada logo, medido con PIL sobre los
// assets reales. Valores fijos (no se recalculan en runtime) porque
// Tailwind JIT necesita ver el string completo de la clase en el código.
const LOGO_SIZE: Record<string, string> = {
  chips: "h-[47px] md:h-[53px]",
  takis: "h-[32px] md:h-[36px]",
  runners: "h-[49px] md:h-[56px]",
  "big-mix": "h-[34px] md:h-[38px]",
  "hot-nuts": "h-[36px] md:h-[41px]",
  "golden-nuts": "h-[28px] md:h-[32px]", // sin cambios — es la referencia
};

export default function LogoMarquee() {
  // Solo marcas con logo real confirmado (Golden Nuts ya lo tiene, Ronda 31).
  const withLogo = brands.filter((b) => b.logo);
  // Se repite 8x (ancho fijo por logo) para garantizar que la tira cubra de
  // sobra hasta monitores ultra anchos y el loop -50% nunca deje un hueco en
  // blanco visible, sin depender del ancho real del viewport.
  const loop = Array.from({ length: 8 }, () => withLogo).flat();

  return (
    <div className="overflow-hidden border-y border-black/5 bg-white">
      <div className="flex w-max animate-marquee items-center py-5 hover:[animation-play-state:paused]">
        {loop.map((brand, i) => (
          <Link
            key={`${brand.slug}-${i}`}
            href={`/marcas/${brand.slug}`}
            aria-label={`Ir a la página de ${brand.name}`}
            className="flex w-32 shrink-0 items-center justify-center transition-opacity hover:opacity-70 focus-visible:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-red md:w-40"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.logo}
              alt={brand.name}
              className={`w-auto object-contain ${LOGO_SIZE[brand.slug] ?? "h-7 md:h-8"}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
