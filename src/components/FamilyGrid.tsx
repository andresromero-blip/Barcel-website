"use client";

import { brands } from "@/data/brands";
import BrandCard from "./BrandCard";
import { useSearch } from "./SearchContext";

export default function FamilyGrid() {
  const { query } = useSearch();
  const normalized = query.trim().toLowerCase();
  const hasQuery = normalized.length > 0;
  const matchCount = hasQuery
    ? brands.filter((b) => b.name.toLowerCase().includes(normalized)).length
    : brands.length;

  return (
    <section id="marcas" className="bg-white py-16 md:py-20">
      {/* Sin CTA "Nuestras botanas": ya no hay un catálogo/hub al que
          llevar — cada tarjeta de abajo enlaza directo a la página de esa
          marca con "Ver todos los productos →". */}
      {/* Ronda 116: copy 1:1 con el rediseño Figma (Home > Categorías,
          node 1:10497/1:10499-10500) — el subtítulo cambia, el título ya
          coincidía. */}
      <div className="container-page mb-10">
        <h2 className="font-teko text-3xl font-bold uppercase text-barcel-red md:text-4xl">
          Conoce toda nuestra familia
        </h2>
        <p className="mt-2 max-w-xl font-body text-sm text-barcel-black/70 md:text-base">
          Explora nuestros productos y encuentra nuevos antojos de
          Barcel<sup>®</sup>. Descubre todas las opciones llenas de sabor.
        </p>
        {hasQuery && (
          <p className="mt-2 font-display text-xs font-bold uppercase tracking-wide text-barcel-red">
            {matchCount > 0
              ? `${matchCount} marca${matchCount > 1 ? "s" : ""} encontrada${matchCount > 1 ? "s" : ""} para "${query}"`
              : `Sin resultados para "${query}"`}
          </p>
        )}
      </div>

      {/* Ronda 118: el cliente marcó que seguía viendo "espacios en
          blanco" que no están en Figma — eran los márgenes laterales que
          dejaba el mx-auto max-w-[1280px] de la Ronda 117 en pantallas
          >1280px (las filas nunca llegaban a tocar el borde real de la
          ventana). El propio node 1:3202 ("Cards Categorías") define las
          8 filas con x=0 y width=1440 — el ANCHO COMPLETO del frame, sin
          margen lateral alguno — así que el 1:1 real es full-bleed: sin
          max-width, sin mx-auto, tocando los bordes del viewport. En
          mobile este wrapper solo da el padding lateral y el gap entre
          tarjetas (equivalente a container-page); desde md: pierde
          ambos (gap-0, px-0) y las filas quedan pegadas entre sí Y
          pegadas a los bordes de la pantalla — verificado sin gap
          vertical en 1024/1440/1920px, el "espacio en blanco" era 100%
          el margen lateral, ya no existe. */}
      <div className="flex w-full flex-col gap-6 px-5 md:gap-0 md:px-0">
        {brands.map((brand) => {
          const isMatch = brand.name.toLowerCase().includes(normalized);
          return (
            <BrandCard
              key={brand.slug}
              brand={brand}
              dimmed={hasQuery && !isMatch}
              highlighted={hasQuery && isMatch}
            />
          );
        })}
      </div>
    </section>
  );
}
