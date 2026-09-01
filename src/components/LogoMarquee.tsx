import Link from "next/link";
import { brands } from "@/data/brands";

// Ronda 42: los .png de logo NO vienen recortados al contenido real — cada
// archivo tiene una cantidad distinta de "aire" (canvas cuadrado 597x597 con
// el wordmark centrado, salvo Golden Nuts que sí viene recortado ~93% de
// alto). Con una altura de <img> fija e igual para todos (h-7/h-8 anterior),
// el resultado visual era que Golden Nuts (poco aire) se veía grande y el
// resto (mucho aire, sobre todo Runners y Chip's) se veía diminuto — no es
// que los logos midan distinto, es que el "tinta" real dentro del archivo
// ocupa un % de alto muy distinto por marca. El fix de esa ronda calculó la
// altura de <img> por marca para igualar la ALTURA de esa tinta (~26px).
//
// Ronda 109: igualar solo la altura no bastaba — Golden Nuts es un wordmark
// mucho más ancho que alto (bbox de tinta ~583x228px, relación ~2.6:1)
// mientras el resto ronda 1:1–1.7:1. Con la altura de tinta igual mediante
// h fija + w-auto, Golden Nuts terminaba con casi el DOBLE de ancho que
// cualquier otro logo — se veía "más grande" aunque su altura coincidiera.
// Fix real: en vez de igualar solo alto, se ajusta por marca para que la
// tinta quepa dentro de la MISMA caja alto x ancho (34x78px en md, mismo
// criterio que object-fit:contain pero calculado sobre el bbox de tinta
// real medido con PIL, no sobre el canvas con aire) — así cada logo usa la
// dimensión que le toque recortar (alto para los 5 primeros, ancho para
// Golden Nuts) y todos ocupan, como máximo, el mismo espacio visual.
// Valores fijos (no se recalculan en runtime) porque Tailwind JIT necesita
// ver el string completo de la clase en el código.
const LOGO_SIZE: Record<string, string> = {
  chips: "h-[54px] md:h-[61px]",
  takis: "h-[36px] md:h-[41px]",
  runners: "h-[57px] md:h-[64px]",
  "big-mix": "h-[39px] md:h-[44px]",
  "hot-nuts": "h-[42px] md:h-[47px]",
  "golden-nuts": "h-[29px] md:h-[33px]", // ahora limitado por ancho de tinta, no por altura
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
