"use client";

import { useState } from "react";
import type { Flavor } from "@/data/brands";

export default function ProductSlider({
  brandName,
  flavors,
}: {
  brandName: string;
  flavors: Flavor[];
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
        <div className="flex w-max animate-marquee items-stretch gap-5 py-2 hover:[animation-play-state:paused]">
          {loop.map((flavor, i) => (
            <button
              key={`${flavor.name}-${i}`}
              type="button"
              onClick={() => setActive(flavor)}
              aria-label={`Ver ${brandName} ${flavor.name}`}
              className="group flex w-40 shrink-0 flex-col items-center gap-3 border border-barcel-black/10 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-barcel-black hover:shadow-lg focus-visible:-translate-y-1 focus-visible:border-barcel-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-red sm:w-48"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flavor.image}
                alt=""
                aria-hidden="true"
                className="h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-110 sm:h-32"
              />
              <span className="font-display text-xs font-bold uppercase leading-tight text-barcel-black">
                {flavor.name}
              </span>
              <span className="flex h-3 items-center gap-1 font-display text-[10px] font-bold uppercase tracking-wide text-barcel-red opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
