"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Flavor } from "@/data/brands";
import TakisTape from "./TakisTape";
import { SPICE_LEVELS } from "./Picometro";

const CARD_CLASSNAME =
  "group relative isolate flex w-64 shrink-0 flex-col items-center justify-end gap-3 overflow-hidden bg-white p-5 text-center text-barcel-black transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-red sm:w-96 sm:gap-4 sm:p-8 md:w-[32rem] md:p-10";

function CardContent({ flavor, isTakis }: { flavor: Flavor; isTakis: boolean }) {
  return (
    <>
      {/* Ronda 55: el cliente mandó referencia explícita del hover —
          en vez de asomar la composición DETRÁS de la bolsa (Ronda 51),
          ahora en hover la composición oficial del Takis Global
          Brandbook 2025 (fondo de color + swirl + producto + garnish)
          REEMPLAZA a la bolsa por completo: la bolsa se desvanece
          (opacity 0) y la composición queda full-bleed, sola, con el
          link "Ver más información" — solo para Takis. Las demás
          marcas conservan el criterio anterior (bolsa fija + fondo
          detrás) porque no tienen este asset de composición. */}
      {flavor.hoverImage && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={flavor.hoverImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
        />
      )}
      <div className="relative flex h-56 w-full items-end justify-center overflow-visible sm:h-80 md:h-[26rem]">
        {/* Ronda 54: badge del Picómetro — el cliente pidió que cada
            tarjeta del slider muestre su nivel de picante (mismo asset
            PNG de termómetro que ya usaba la página de detalle, ver
            Picometro.tsx) flotando junto a la bolsa, no solo dentro de
            una sección aparte. Va DENTRO de este div (overflow-visible)
            en vez del contenedor exterior de la tarjeta, que tiene
            overflow-hidden por la revelación del hover — si el badge
            viviera ahí se recortaría contra el borde de la tarjeta. */}
        {isTakis && flavor.spiceLevel && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={SPICE_LEVELS[flavor.spiceLevel].image}
            alt={`Picómetro: ${SPICE_LEVELS[flavor.spiceLevel].label}`}
            className={`absolute left-0 top-1/2 z-20 h-16 w-auto -translate-x-1/3 -translate-y-1/2 object-contain drop-shadow-lg sm:h-20 md:h-24 ${
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
          un overlay fijo al fondo de la tarjeta con su propio scrim de
          degradado (garantiza legibilidad sin importar qué haya detrás)
          — posición idéntica para los 8 sabores. */}
      {isTakis ? (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-1.5 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-4 pb-4 pt-10 font-display text-sm font-bold uppercase tracking-wide text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:pb-5 sm:text-base">
          Ver más información
          <span aria-hidden>→</span>
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

  // Ronda 59: "hover:[animation-play-state:paused]" en CSS solo pausa
  // con mouse real — en celular no existe :hover, así que el marquee
  // NUNCA se detenía en touch. El usuario tocaba una tarjeta pero, entre
  // el instante en que su dedo baja y el tap se resuelve, la animación
  // seguía corriendo por debajo — el navegador termina resolviendo el
  // tap contra lo que esté en ese punto exacto en ese instante (a veces
  // el hueco entre tarjetas, sin link ahí), y el CTA "no llevaba a
  // ningún lado". Fix: pausar la animación por JS en el primer contacto
  // (pointerdown cubre touch Y mouse) mutando el estilo directo por ref
  // — sin esperar al ciclo de render de React — así la posición queda
  // congelada ANTES de que el tap se resuelva contra un elemento.
  // Se reanuda un momento después de soltar (si no hubo navegación, el
  // componente sigue vivo y el loop continúa; si sí navegó, el
  // componente se desmonta y el timeout no importa).
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTrack = () => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const scheduleResume = () => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      if (trackRef.current) trackRef.current.style.animationPlayState = "running";
    }, 1500);
  };

  return (
    <>
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max animate-marquee items-stretch gap-6 py-2 hover:[animation-play-state:paused] sm:gap-8"
          onPointerDown={pauseTrack}
          onPointerUp={scheduleResume}
          onPointerCancel={scheduleResume}
          onMouseLeave={scheduleResume}
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
                className={`${CARD_CLASSNAME} ${hoverBg} ${hoverText}`}
              >
                <CardContent flavor={flavor} isTakis={isTakis} />
              </Link>
            ) : (
              <button
                key={`${flavor.name}-${i}`}
                type="button"
                onClick={() => setActive(flavor)}
                aria-label={`Ver ${brandName} ${flavor.name}`}
                className={`${CARD_CLASSNAME} ${hoverBg} ${hoverText}`}
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
