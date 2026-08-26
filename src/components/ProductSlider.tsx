"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Flavor } from "@/data/brands";
import TakisTape from "./TakisTape";
import { SPICE_LEVELS } from "./Picometro";

const CARD_CLASSNAME =
  "group relative isolate flex w-64 shrink-0 flex-col items-center justify-end gap-3 overflow-hidden bg-white p-5 text-center text-barcel-black transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-red sm:w-96 sm:gap-4 sm:p-8 md:w-[32rem] md:p-10";

function CardContent({ flavor, isTakis }: { flavor: Flavor; isTakis: boolean }) {
  // Ronda 90: el cliente mandó una referencia exacta del hover que
  // esperaba (marco violeta grueso + caja blanca + CTA con borde
  // blanco) y marcó que el resultado de Ronda 88/89 "no se parece en
  // nada" — causa raíz: el ring de 4px (Ronda 88) era demasiado
  // delgado para leerse como "marco", y la composición seguía siendo
  // full-bleed (Ronda 55/73) sin dejar margen blanco alrededor. Fix
  // real: el marco ahora nace del padding REAL de la tarjeta
  // (p-5/8/10, ver CARD_CLASSNAME) + fondo violeta en hover (ver
  // cardClass) — no de un ring. La composición vive dentro de una
  // caja blanca opaca inset (no full-bleed), con el mismo padding
  // generoso que muestra la referencia, y el CTA con su borde blanco
  // (Ronda 89) vive debajo, ya directamente sobre el violeta de la
  // tarjeta. hasComposition = true solo para Takis con hoverImage.
  const hasComposition = isTakis && !!flavor.hoverImage;
  return (
    <>
      {hasComposition && (
        // Ronda 73 (nota original, sigue vigente): cada composición del
        // Global Brandbook ya trae swirl + producto + cinta + picómetro
        // quemados en un solo PNG — por eso esta caja no vuelve a
        // renderizar cinta ni picómetro por separado, solo la imagen.
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-white p-5 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 sm:gap-5 sm:p-7 md:p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={flavor.hoverImage}
            alt=""
            aria-hidden="true"
            className="h-full w-full flex-1 object-contain"
          />
          <span className="relative inline-flex shrink-0 items-center gap-1.5 border-2 border-white bg-takis-purple px-5 py-2.5 font-display text-xs font-extrabold uppercase tracking-wide text-white shadow-lg sm:px-6 sm:py-3 sm:text-sm">
            Ver más información
            <span aria-hidden>→</span>
          </span>
        </div>
      )}
      <div className="relative flex h-56 w-full items-end justify-center overflow-visible sm:h-80 md:h-[26rem]">
        {/* Ronda 54: badge del Picómetro — el cliente pidió que cada
            tarjeta del slider muestre su nivel de picante (mismo asset
            PNG de termómetro que ya usaba la página de detalle, ver
            Picometro.tsx) flotando junto a la bolsa, no solo dentro de
            una sección aparte. Va DENTRO de este div (overflow-visible)
            en vez del contenedor exterior de la tarjeta, que tiene
            overflow-hidden por la revelación del hover — si el badge
            viviera ahí se recortaría contra el borde de la tarjeta.
            Ronda 73: el cliente mandó una imagen de referencia mostrando
            el termómetro a un tamaño mucho mayor (ocupando ~40-50% del
            alto de la pieza, no ~23-29% como estaba) y separado por
            completo del producto — sin pisarlo. Se sube de h-16/20/24 a
            h-28/36/44 (+75% aprox., misma proporción que la referencia)
            y se empuja más hacia la izquierda (-translate-x-1/2 en vez
            de -1/3) para que quede claramente afuera de la bolsa en vez
            de superpuesto sobre su borde. */}
        {isTakis && flavor.spiceLevel && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={SPICE_LEVELS[flavor.spiceLevel].image}
            alt={`Picómetro: ${SPICE_LEVELS[flavor.spiceLevel].label}`}
            className={`absolute left-0 top-1/2 z-20 h-28 w-auto -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-lg sm:h-36 md:h-44 ${
              flavor.hoverImage
                ? "transition-opacity duration-300 ease-out group-hover:opacity-0"
                : ""
            }`}
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={flavor.image}
          alt=""
          aria-hidden="true"
          className={`h-full w-auto object-contain drop-shadow-xl ${
            isTakis && flavor.hoverImage
              ? "transition-opacity duration-300 ease-out group-hover:opacity-0"
              : ""
          }`}
        />
      </div>
      {/* Ronda 44: nombre de sabor en font-takisMark (sustituto de la
          "TAKIS® Font" del brandbook, ver globals.css) solo para Takis —
          Permanent Marker es de un solo peso, sin font-extrabold falso.
          Ronda 45: el manual (03.4, pág. 37) exige que ese nombre vaya
          siempre dentro del "manchón" amarillo — TakisTape.
          Ronda 56: cada composición del Global Brandbook YA trae el
          nombre del sabor quemado en la imagen (su propia cinta
          amarilla). En hover, nuestra propia TakisTape quedaba flotando
          encima de esa cinta ya impresa — dos nombres pisándose. Se
          desvanece la nuestra en hover (mismo criterio que la bolsa)
          cuando hay hoverImage, dejando solo la cinta real de la
          composición. */}
      {isTakis ? (
        <TakisTape
          className={`relative px-3 py-1 transition-opacity duration-300 ${
            flavor.hoverImage ? "group-hover:opacity-0" : ""
          }`}
        >
          <span className="font-takisMark text-base uppercase leading-tight sm:text-xl md:text-2xl">
            {flavor.name}
          </span>
        </TakisTape>
      ) : (
        <span className="relative font-display text-lg font-extrabold uppercase leading-tight sm:text-2xl md:text-3xl">
          {flavor.name}
        </span>
      )}
      {/* Ronda 56: el link ya no vive en el flujo normal debajo de la
          cinta — su posición dependía de dónde terminara CADA
          composición (proporciones distintas por sabor), y en Fuego
          caía justo encima de la cinta quemada en la imagen. Ahora es
          un overlay fijo al fondo de la tarjeta — posición idéntica
          para los 8 sabores.
          Ronda 72: el cliente marcó que el CTA "pasa desapercibido
          debido a la carga cognitiva de la pieza" — el scrim de
          degradado + texto plano (Ronda 56) no alcanza a competir
          visualmente con las composiciones oficiales del brandbook
          (swirl + garnish a color completo, distinto por sabor). Fix:
          el texto pasa a vivir dentro de un contenedor real de botón
          primario (sombra, mayúsculas) en vez de flotar sobre un
          degradado.
          Ronda 74: al quitar el fondo violeta de la tarjeta (el cliente
          reportó que se veía detrás de las composiciones transparentes),
          el fondo real detrás del botón pasó a ser blanco — el botón
          bg-white de Ronda 72 quedó blanco sobre blanco, invisible
          ("se pierde con el fondo"). Se invierte a fondo morado sólido +
          texto blanco: mismo contenedor opaco y mismo contraste
          consistente sin importar el color de cada composición, pero
          ahora SÍ se distingue del bg-white base de la tarjeta.
          Ronda 90: este botón-overlay independiente ya NO se usa cuando
          hay composición (hasComposition) — ese caso ahora tiene su
          propio CTA dentro de la caja blanca de arriba, para no
          duplicar "Ver más información" dos veces sobre la misma
          tarjeta. Se mantiene solo para Takis SIN composición (sabores
          que aún no tienen el asset del brandbook) y para el resto de
          marcas. */}
      {hasComposition ? null : isTakis ? (
        <span className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:bottom-5">
          <span className="inline-flex items-center gap-1.5 border-2 border-white bg-takis-purple px-5 py-2.5 font-display text-xs font-extrabold uppercase tracking-wide text-white shadow-lg sm:px-6 sm:py-3 sm:text-sm">
            Ver más información
            <span aria-hidden>→</span>
          </span>
        </span>
      ) : (
        <span className="relative flex h-5 items-center gap-1.5 font-display text-sm font-bold uppercase tracking-wide opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-base">
          Ver detalle
          <span aria-hidden>→</span>
        </span>
      )}
    </>
  );
}

export default function ProductSlider({
  brandName,
  brandSlug,
  flavors,
  hoverBg,
  hoverText,
}: {
  brandName: string;
  brandSlug: string;
  flavors: Flavor[];
  hoverBg: string;
  hoverText: string;
}) {
  const [active, setActive] = useState<Flavor | null>(null);

  // Mismo mecanismo que el marquee de logos del Home: loop continuo vía
  // CSS (animate-marquee), pausado al pasar el cursor — así el usuario
  // tiene todo el tiempo que necesite para hacer clic sobre un SKU en
  // cuanto lo detiene. 4 copias son de sobra para que el loop de -50%
  // nunca deje ver un hueco, incluso en monitores anchos.
  const loop = Array.from({ length: 4 }, () => flavors).flat();
  const isTakis = brandSlug === "takis";

  // Ronda 74: el cliente reportó que los hovers con composición oficial
  // (hoverImage) se veían con un fondo violeta detrás — causa raíz: la
  // tarjeta completa (Link/button) siempre lleva "hoverBg" (hover:bg-
  // takis-purple) para las marcas SIN composición, como color de
  // respaldo. Las composiciones nuevas son PNG con transparencia real
  // (Ronda 73), así que ese violeta de la tarjeta se colaba por las
  // zonas transparentes de la imagen en vez de quedar oculto. Fix: para
  // Takis, cuando el sabor SÍ tiene hoverImage, se omite hoverBg de la
  // tarjeta (queda el bg-white base de CARD_CLASSNAME sin tinte) — la
  // composición ya trae su propio fondo/color, no necesita ayuda de la
  // tarjeta. Los sabores sin hoverImage siguen usando el violeta de
  // respaldo, igual que las demás marcas.
  // Ronda 88: el cliente pidió replicar, en este slider, el "marco
  // violeta" que ya usa RelatedProductsSlider.tsx ("También te puede
  // antojar") — pero eligió conservar intacta la composición del
  // brandbook en hover (Ronda 55-74, ~15 rondas de trabajo), así que
  // NO se toca el fondo/composición: solo se agrega un anillo violeta
  // alrededor de la tarjeta en hover, únicamente para Takis (las otras
  // 5 marcas no tienen este asset ni fueron parte del pedido).
  // ring-inset para que el marco quede DENTRO del borde de la tarjeta
  // (que ya tiene overflow-hidden por la composición), en vez de
  // agregar tamaño extra que movería el layout del slider.
  // Ronda 90: el marco violeta de la referencia del cliente no es un
  // ring delgado (Ronda 88, insuficiente) — nace de que la TARJETA
  // ENTERA se pone violeta en hover y la composición vive en una caja
  // blanca con padding real por dentro (ver CardContent), así que ese
  // padding de la propia tarjeta (p-5/8/10 en CARD_CLASSNAME) es lo
  // que se ve como marco. El fondo violeta ya no se omite para
  // hoverImage (a diferencia de Ronda 74): ese fix era necesario
  // porque la composición ERA full-bleed y el violeta se colaba por
  // sus zonas transparentes internas; ahora la composición vive dentro
  // de una caja bg-white opaca, así que ese problema no puede repetirse.
  const cardClass = (flavor: Flavor) => {
    const hasComposition = isTakis && !!flavor.hoverImage;
    if (hasComposition) {
      return `${CARD_CLASSNAME} ${hoverText} hover:bg-takis-purple`;
    }
    return isTakis
      ? `${CARD_CLASSNAME} ${hoverBg} ${hoverText} hover:ring-4 hover:ring-inset hover:ring-takis-purple`
      : `${CARD_CLASSNAME} ${hoverBg} ${hoverText}`;
  };

  // Ronda 60: el fix de Ronda 59 (pausar por JS en pointerdown, con un
  // setTimeout que reanudaba 1500ms después de soltar/salir) rompió el
  // pausado por CSS existente: un estilo puesto por JS directo en el
  // elemento (style.animationPlayState) tiene MÁS especificidad que la
  // regla de clase "hover:[...]:hover{...}" del stylesheet. En cuanto
  // el mouse entraba y salía UNA vez del carrusel (algo que pasa solo
  // con scrollear cerca), el setTimeout de Ronda 59 terminaba fijando
  // animation-play-state:running por inline style — y desde ese
  // momento, TODOS los hovers futuros (aunque la regla CSS diga
  // "paused") quedaban completamente ignorados: el carrusel nunca
  // volvía a detenerse, para el resto de la sesión. El usuario apuntaba
  // a un sabor, pero como el carrusel seguía corriendo por debajo sin
  // que el :hover lo pausara, el click cronometrado contra la posición
  // que VIO terminaba resolviendo contra un sabor distinto (o el hueco
  // entre tarjetas) — exactamente el reporte de "la url no corresponde
  // a la página" / "no pasa nada".
  //
  // Fix real: una sola fuente de verdad en JS (nada de timers, nada de
  // pelear con una regla CSS aparte). Dos flags booleanos — "¿está el
  // mouse encima?" y "¿hay un dedo/click presionado?" — y CADA evento
  // relevante (enter/leave/down/up/cancel) recalcula el estilo inline
  // de inmediato a partir de ambos. Sin temporizadores no hay ventana
  // en la que un estado viejo se quede pegado.
  const trackRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const isPointerDown = useRef(false);
  const applyPlayState = () => {
    if (!trackRef.current) return;
    trackRef.current.style.animationPlayState =
      isHovering.current || isPointerDown.current ? "paused" : "running";
  };
  const handleMouseEnter = () => {
    isHovering.current = true;
    applyPlayState();
  };
  const handleMouseLeave = () => {
    isHovering.current = false;
    isPointerDown.current = false;
    applyPlayState();
  };
  const handlePointerDown = () => {
    isPointerDown.current = true;
    applyPlayState();
  };
  const handlePointerUp = () => {
    isPointerDown.current = false;
    applyPlayState();
  };

  return (
    <>
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max animate-marquee items-stretch gap-6 py-2 sm:gap-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {loop.map((flavor, i) =>
            flavor.slug ? (
              // Ronda 27: si el sabor ya tiene página de detalle propia
              // (/marcas/[marca]/[sabor]), el SKU navega ahí en vez de
              // abrir el modal rápido.
              <Link
                key={`${flavor.name}-${i}`}
                href={`/marcas/${brandSlug}/${flavor.slug}`}
                aria-label={`Ver ${brandName} ${flavor.name}`}
                className={cardClass(flavor)}
              >
                <CardContent flavor={flavor} isTakis={isTakis} />
              </Link>
            ) : (
              <button
                key={`${flavor.name}-${i}`}
                type="button"
                onClick={() => setActive(flavor)}
                aria-label={`Ver ${brandName} ${flavor.name}`}
                className={cardClass(flavor)}
              >
                <CardContent flavor={flavor} isTakis={isTakis} />
              </button>
            )
          )}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-6"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-sm bg-white p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-barcel-black/5 transition-colors hover:bg-barcel-black/10"
            >
              ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.image}
              alt={`${brandName}® ${active.name}`}
              className="mx-auto h-48 w-auto object-contain"
            />
            <h3 className="mt-4 font-display text-lg font-extrabold text-barcel-black">
              {brandName}
              <sup className="text-[0.5em]">®</sup> {active.name}
            </h3>
          </div>
        </div>
      )}
    </>
  );
}
