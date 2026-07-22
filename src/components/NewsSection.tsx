"use client";

import { useState } from "react";
import { news } from "@/data/news";

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

      <div className="container-page grid grid-cols-2 gap-3 md:grid-cols-3 md:grid-rows-2 md:gap-4">
        {news.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={`group relative flex min-h-[140px] flex-col justify-end overflow-hidden rounded-2xl p-4 text-left text-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg md:min-h-[180px] md:p-5 ${item.bg} ${item.span}`}
          >
            <span className="absolute right-3 top-3 rounded-full bg-white/20 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm">
              {item.tag}
            </span>
            <span className="font-display text-sm font-bold leading-snug drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 md:text-base">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {activeItem && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-6"
          onClick={() => setActive(null)}
        >
          <div
            className={`relative w-full max-w-md rounded-3xl p-8 text-white shadow-2xl ${activeItem.bg}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
            >
              ✕
            </button>
            <span className="rounded-full bg-white/20 px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wide">
              {activeItem.tag}
            </span>
            <h3 className="mt-4 font-display text-xl font-extrabold leading-snug">
              {activeItem.label}
            </h3>
            <p className="mt-3 font-body text-sm text-white/85">
              Contenido de muestra para el prototipo — aquí irá la publicación,
              imagen o video real conectado a redes sociales de Barcel®.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
