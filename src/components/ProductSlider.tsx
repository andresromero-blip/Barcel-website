"use client";

import { useState } from "react";
import type { Flavor } from "@/data/brands";

export default function ProductSlider({
  brandName,
  flavors,
  hoverBg,
  hoverText,
}: {
  brandName: string;
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

  return (
    <>
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee items-stretch gap-6 py-2 hover:[animation-play-state:paused] sm:gap-8">
          {loop.map((flavor, i) => (
            <button
              key={`${flavor.name}-${i}`}
              type="button"
              onClick={() => setActive(flavor)}
              aria-label={`Ver ${brandName} ${flavor.name}`}
              className={`group flex w-64 shrink-0 flex-col items-center justify-end gap-3 bg-white p-5 text-center text-barcel-black transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-red sm:w-96 sm:gap-4 sm:p-8 md:w-[32rem] md:p-10 ${hoverBg} ${hoverText}`}
            >
              {/* Producto suelto de cada sabor, grande y protagonista —
                  1:1 con la composición del referente (imagen de producto
                  domina la tarjeta, nombre y CTA compactos debajo). */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flavor.image}
                alt=""
                aria-hidden="true"
                className="h-56 w-auto object-contain transition-transform duration-300 group-hover:scale-110 sm:h-80 md:h-[26rem]"
              />
              <span className="font-display text-lg font-extrabold uppercase leading-tight sm:text-2xl md:text-3xl">
                {flavor.name}
              </span>
              <span className="flex h-5 items-center gap-1.5 font-display text-sm font-bold uppercase tracking-wide opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-base">
                Ver detalle
                <span aria-hidden>→</span>
              </span>
            </button>
          ))}
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
