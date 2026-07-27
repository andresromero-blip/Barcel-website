"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSearch } from "./SearchContext";
import { searchProducts, POPULAR_SEARCHES } from "@/data/search";

// Buscador overlay — 1:1 con el comportamiento del wireframe de Figma
// (node 107:2968, "Buscador (overlay) – Desktop"): panel a todo el
// ancho arriba (input grande + cerrar, chips de "Búsquedas populares",
// lista de "Resultados rápidos") con el resto de la pantalla oscurecido
// detrás. Figma solo traía la variante Desktop — aquí se adapta
// mobile-first con el mismo mecanismo (mismo componente, breakpoints),
// para que el comportamiento sea idéntico en ambos.
//
// Diferencias respecto al wireframe (mejoras, no desviaciones): el
// thumb de "Resultados rápidos" era un color placeholder — aquí se usa
// la foto real del producto (mismo tratamiento que
// RelatedProductsSlider.tsx: bg-barcel-cream + object-contain). Los
// resultados y las chips de sugerencias salen de datos reales
// (src/data/search.ts), no de copy fija.
export default function SearchOverlay() {
  const { query, setQuery, isOpen, closeSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    // Autofocus del input grande del overlay — igual que si el usuario
    // ya estuviera escribiendo en el trigger del Header.
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [isOpen, closeSearch]);

  if (!isOpen) return null;

  const results = searchProducts(query, 3);
  const hasQuery = query.trim().length > 0;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col">
      <div className="max-h-[100dvh] overflow-y-auto bg-white">
        {/* Ancho del panel: Figma mide el contenido en 898px dentro de un
            lienzo de 1440 (271px de inset a cada lado, ~18.8%) — mucho más
            angosto que el container-page estándar del sitio (max-w-1280px).
            Reusar container-page hacía que el panel se viera estirado en
            desktop frente al wireframe; max-w-[898px] + mx-auto replica esa
            proporción en pantallas grandes, con el mismo padding lateral
            mobile (px-5) que el resto del sitio en viewports angostos. */}
        <div className="mx-auto flex max-w-[898px] flex-col gap-6 px-5 py-6 md:px-10 md:py-12">
          {/* Input + cerrar */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex flex-1 items-center gap-3 bg-barcel-black/[0.04] px-4 py-3.5 md:gap-4 md:px-6 md:py-5">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 shrink-0 text-barcel-black/60 md:h-6 md:w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="¿Qué antojo buscas?"
                className="w-full bg-transparent font-body text-base text-barcel-black outline-none placeholder:text-barcel-black/50 md:text-xl"
              />
            </div>
            <button
              type="button"
              onClick={closeSearch}
              aria-label="Cerrar buscador"
              className="flex h-11 w-11 shrink-0 items-center justify-center text-barcel-black transition-transform hover:scale-110 active:scale-95 md:h-12 md:w-12"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 md:h-7 md:w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          {/* Búsquedas populares */}
          <div className="flex flex-col gap-3">
            <p className="font-display text-xs font-bold uppercase tracking-[0.15em] text-barcel-black/50">
              Búsquedas populares
            </p>
            <div className="flex flex-wrap gap-2.5">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="border-[1.5px] border-barcel-black/20 px-4 py-2 font-body text-sm font-medium text-barcel-black transition-colors hover:border-barcel-black hover:bg-barcel-black hover:text-white"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Resultados rápidos */}
          <div className="flex flex-col gap-3 pb-2">
            <p className="font-display text-xs font-bold uppercase tracking-[0.15em] text-barcel-black/50">
              Resultados rápidos
            </p>
            {results.length > 0 ? (
              <div className="flex flex-col gap-3">
                {results.map((result) => (
                  <Link
                    key={result.key}
                    href={result.href}
                    onClick={closeSearch}
                    className="group flex items-center gap-4 bg-barcel-black/[0.04] p-3 transition-colors hover:bg-barcel-cream"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-barcel-cream md:h-16 md:w-16">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={result.flavor.image}
                        alt=""
                        aria-hidden="true"
                        className="h-11 w-11 object-contain md:h-12 md:w-12"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <p className="truncate font-teko text-2xl font-semibold uppercase leading-none text-barcel-black md:text-3xl">
                        {result.title}
                      </p>
                      <p className="truncate font-body text-xs text-barcel-black/60 md:text-sm">
                        {result.subtitle}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-display text-lg font-bold text-barcel-black transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="bg-barcel-black/[0.04] p-4 font-body text-sm text-barcel-black/60">
                {hasQuery
                  ? `Sin resultados para "${query}". Prueba con otra marca o sabor.`
                  : "Escribe un antojo, una marca o un sabor para empezar."}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Fondo oscurecido — clic para cerrar */}
      <button
        type="button"
        onClick={closeSearch}
        aria-label="Cerrar buscador"
        className="flex-1 cursor-default bg-black/60"
      />
    </div>
  );
}
