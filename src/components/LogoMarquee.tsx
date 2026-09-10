import { Fragment } from "react";
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
// mucho más ancho que alto (bbox de tinta ~576x222px, relación ~2.6:1)
// mientras el resto ronda 1:1–1.7:1. Con la altura de tinta igual mediante
// h fija + w-auto, Golden Nuts terminaba con casi el DOBLE de ancho que
// cualquier otro logo — se veía "más grande" aunque su altura coincidiera.
// Primer intento: acotar también el ancho, pero con un presupuesto de 78px
// (holgado) Golden Nuts seguía siendo, por mucho, el más ancho de la tira
// (78px vs. ~27–59px del resto) — el cliente lo siguió viendo más grande.
//
// Ronda 110: se aprieta el presupuesto de ancho a 59px — el ancho que
// Runners (el segundo más ancho) ya ocupa de forma natural igualando solo
// altura. Con eso, Golden Nuts y Runners empatan como los más anchos de la
// tira (ninguno puede rebasar al otro) y Golden Nuts cede en ALTURA (baja a
// ~25px en vez de 33px) para no exceder ese ancho — es la marca con la
// forma más corta/ancha del set, así que algo tenía que ceder para no
// dominar la fila; se prefirió que cediera altura antes que seguir siendo
// el logo más ancho por un margen tan grande. Mismos criterios que antes
// (bbox de tinta real medido en el archivo, no el canvas con aire).
// Valores fijos (no se recalculan en runtime) porque Tailwind JIT necesita
// ver el string completo de la clase en el código.
// Ronda 123: POP y Tostachos se agregaron al marquee en la Ronda 111 pero
// NUNCA se dieron de alta en este mapa — caían en el fallback genérico
// "h-7 md:h-8" (28px/32px de canvas), que combinado con su propio % de aire
// interno daba una tinta visible de solo ~17-20px (Tostachos: bbox real
// 552x323 sobre canvas 595x595 => tinta ocupa 54.3% de esa altura) frente a
// los ~30-34px del resto — de ahí que se vieran mucho más chicos/ilegibles
// en la tira. Se calculó la altura de <img> que iguala solo la ALTURA de
// tinta de estos dos al resto (~30.4px / ~34.3px).
//
// Ronda 124: igualar solo la ALTURA de tinta (Ronda 42/109/110/123) seguía
// sin ser suficiente — el cliente reportó que Takis, Hot Nuts y Big Mix se
// veían con "menor jerarquía y peso visual" que el resto, a pesar de tener
// la misma altura de tinta que Chip's/Runners/Tostachos. Causa real: esas
// tres marcas tienen un bbox de tinta casi CUADRADO (ancho ≈ alto: Hot Nuts
// 345x429px, ratio ancho/alto 0.80; Takis 510x483px, ratio 1.06; Big Mix
// 496x463px, ratio 1.07) mientras que Chip's/Runners/Tostachos son bboxes
// muy anchos y bajos (ratio ~1.7). Iguala la altura y listo si el logo es
// ancho — pero un bbox cuadrado con la misma altura ocupa mucha MENOS área
// total (menos "masa" de tinta en pantalla) que uno ancho, así que se ve
// más liviano/pequeño aunque la altura coincida en teoría.
// Fix real: en vez de igualar altura de tinta, se iguala el ÁREA de tinta
// renderizada en pantalla (conteo real de píxeles con alpha>128 en el PNG,
// escalado al cuadrado del factor de reducción h_render/h_canvas — el área
// escala con el cuadrado de la altura, no linealmente). Medido con canvas
// 2D sobre cada PNG (conteo de píxeles opacos):
//   chips   597x597, 104,997px opacos → área renderizada actual (62px) ≈ 1133px² (referencia, sin cambio)
//   runners 597x597, 100,731px opacos → área actual (64px) ≈ 1159px² (referencia, sin cambio)
//   golden-nuts 600x245, 109,266px opacos → área actual (25px) ≈ 1138px² (referencia, sin cambio; ya limitado por ancho, Ronda 110)
//   tostachos 595x595, 113,424px opacos → área actual (63px) ≈ 1272px² (se ajusta a 59px ≈ 1116px² para igualar al resto)
//   takis     597x597, 134,967px opacos → ERA 42px ≈ 669px² (¡solo 59% del área de chips!) → sube a 55px ≈ 1146px²
//   hot-nuts  597x597, 109,234px opacos → ERA 47px ≈ 677px² (60% del área de chips) → sube a 61px ≈ 1140px²
//   big-mix   597x597, 148,018px opacos → ERA 44px ≈ 805px² (71% del área de chips) → sube a 52px ≈ 1123px²
//   pop       595x595, 136,603px opacos → ERA 48px ≈ 889px² (78% del área de chips) → sube a 54px ≈ 1125px²
// Target ≈ 1120-1160px² de tinta renderizada para las 8 marcas por igual.
const LOGO_SIZE: Record<string, string> = {
  chips: "h-[55px] md:h-[62px]",
  takis: "h-[48px] md:h-[55px]",
  runners: "h-[57px] md:h-[64px]",
  "big-mix": "h-[46px] md:h-[52px]",
  "hot-nuts": "h-[54px] md:h-[61px]",
  "golden-nuts": "h-[22px] md:h-[25px]", // limitado por ancho de tinta (empata con Runners), no por altura
  pop: "h-[48px] md:h-[54px]",
  tostachos: "h-[53px] md:h-[59px]",
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
      {/* Ronda 122: medidas 1:1 con Figma (node "Barra de logos", 1:3159) —
          barra de 96px de alto (h-24), cada logo en una caja fija de 80x80px
          (w-20 h-20, antes w-32/w-40 variable) y separador de 40px + punto
          de 8px (bg-grey-300, #b0b0b0, mismo token que el borde del CTA y
          las flechas) + 40px entre cada logo — gap-x-10 (40px) en el flex
          con un <span> de punto entre cada logo reproduce exactamente el
          patrón logo-40-punto-40-logo del diseño. */}
      <div className="flex h-24 w-max animate-marquee items-center gap-x-10 hover:[animation-play-state:paused]">
        {loop.map((brand, i) => (
          <Fragment key={`${brand.slug}-${i}`}>
            <Link
              href={`/marcas/${brand.slug}`}
              aria-label={`Ir a la página de ${brand.name}`}
              className="flex h-20 w-20 shrink-0 items-center justify-center transition-opacity hover:opacity-70 focus-visible:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-red"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.logo}
                alt={brand.name}
                className={`w-auto object-contain ${LOGO_SIZE[brand.slug] ?? "h-7 md:h-8"}`}
              />
            </Link>
            <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-grey-300" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
