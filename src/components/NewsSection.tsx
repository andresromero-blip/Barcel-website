"use client";

import { useState } from "react";
import { news } from "@/data/news";

function PlayIcon() {
  return (
    <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-white/90 text-barcel-black shadow-sm md:h-9 md:w-9">
      <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5 fill-current">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

export default function NewsSection() {
  const [active, setActive] = useState<string | null>(null);
  const activeItem = news.find((n) => n.id === active) ?? null;

  return (
    <section id="novedades" className="bg-barcel-cream py-16 md:py-24">
      <div className="container-page mb-10">
        <h2 className="font-display text-2xl font-extrabold uppercase text-barcel-red md:text-3xl">
          Nuestras novedades
        </h2>
        <p className="mt-2 max-w-2xl font-body text-sm text-barcel-black/70 md:text-base">
          Lo más nuevo de Barcel<sup>®</sup> está aquí. Mira las últimas
          publicaciones, lanzamientos, retos, sabores y momentos que están
          prendiendo las redes. Porque el antojo también se comparte.
        </p>
      </div>

      {/* Grid 1:1 con el diseño de referencia: tile grande (n1) + 4 tiles
          regulares en 2 columnas x 2 filas a su derecha. */}
      <div className="container-page grid grid-cols-2 gap-2 md:grid-cols-3 md:grid-rows-2 md:gap-3">
        {news.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={`group relative flex min-h-[180px] overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1 md:min-h-[220px] ${item.span}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.label}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {item.isVideo && <PlayIcon />}
          </button>
        ))}
      </div>

      {activeItem && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-6"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-sm overflow-hidden bg-barcel-black text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-black/50 hover:bg-black/70"
            >
              ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeItem.image}
              alt={activeItem.label}
              className="max-h-[70vh] w-full object-cover"
            />
            <div className="p-6">
              <h3 className="font-display text-lg font-extrabold leading-snug">
                {activeItem.label}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
