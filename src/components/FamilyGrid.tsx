"use client";

import { useState } from "react";
import { brands } from "@/data/brands";
import BrandCard from "./BrandCard";
import { useSearch } from "./SearchContext";

// Ronda 137: en mobile Figma no muestra las 8 marcas de una — el Figma
// (node 1:10510/1:10511, "Boton" con la instancia "Botón primario") trae
// un botón para revelar el resto. Node de la URL compartida por el
// cliente (1-10371) no cargó por un bug del server del MCP de Figma
// (mismo error de parseo en cada intento, con o sin screenshot/code-
// connect) — el conteo exacto de tarjetas visibles por default se
// confirmó directo con el cliente: 4 (Chip's, Takis, Runners, Big Mix),
// quedando Hot Nuts/POP/Golden Nuts/Tostachos detrás del botón. Solo
// aplica a mobile/tablet (md:hidden en el botón, y las tarjetas extra
// usan `md:block` para que desktop siga mostrando las 8 sin cambios —
// desktop nunca tuvo pedido de colapsarse).
// Ronda 138: el copy real del botón ("Ver todas las marcas", no
// "categorías" como decía el node de Figma) y el estilo (sin
// mayúsculas forzadas) los corrigió el cliente después de ver el
// primer deploy — ver el comentario junto al <button> más abajo.
// Ronda 139/140: dos vueltas sobre la tipografía del botón — la 139 lo
// dejó como link subrayado sin contenedor (malinterpretando "mismo
// puntaje y tipografía que 'Ver todos los productos'"); la 140 corrige:
// el cliente quería la tipografía de ese link (font-body, sin
// uppercase) pero CON contenedor — ver el comentario junto al <button>.
const DEFAULT_VISIBLE_MOBILE = 4;

export default function FamilyGrid() {
  const { query } = useSearch();
  const [expanded, setExpanded] = useState(false);
  const normalized = query.trim().toLowerCase();
  const hasQuery = normalized.length > 0;
  const matchCount = hasQuery
    ? brands.filter((b) => b.name.toLowerCase().includes(normalized)).length
    : brands.length;
  // Si hay una búsqueda activa, el colapso no aplica: la marca que el
  // cliente busca puede estar entre las 4 escondidas, y ocultarla
  // rompería el propio buscador (highlighted/dimmed ya asumen que todas
  // las tarjetas están en el DOM).
  const showCollapseButton =
    !hasQuery && !expanded && brands.length > DEFAULT_VISIBLE_MOBILE;

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
        {brands.map((brand, i) => {
          const isMatch = brand.name.toLowerCase().includes(normalized);
          const isExtra = i >= DEFAULT_VISIBLE_MOBILE;
          const card = (
            <BrandCard
              key={brand.slug}
              brand={brand}
              dimmed={hasQuery && !isMatch}
              highlighted={hasQuery && isMatch}
            />
          );
          // Las primeras 4 siempre van directo (sin wrapper). De la 5ª en
          // adelante, en mobile quedan `hidden` hasta expandir o buscar —
          // en desktop (md:block) se ven siempre, colapso no aplica ahí.
          if (!isExtra) return card;
          return (
            <div
              key={brand.slug}
              className={expanded || hasQuery ? "" : "hidden md:block"}
            >
              {card}
            </div>
          );
        })}
      </div>

      {/* Ronda 140: la Ronda 139 había interpretado "mismo puntaje y
          tipografía que 'Ver todos los productos'" como "conviértete en
          ese mismo link subrayado sin contenedor" — el cliente aclaró que
          se refería solo a la TIPOGRAFÍA (font-body, no font-display; texto
          normal, no uppercase) y al "puntaje" de contraste (negro sobre
          blanco, ~19.6:1, AAA de sobra), pero el botón SÍ debe seguir
          siendo un botón con contenedor (borde + caja), como el resto de
          los botones secundarios del sitio (mismo patrón "Botón Blanco" de
          Hero.tsx: border-2 border-grey-300 bg-white, corner-radius 0 —
          Ronda 19). Por eso: se mantiene el contenedor, pero el texto pasa
          de font-display text-xs font-bold uppercase (Figma) a font-body
          text-sm font-semibold sin uppercase — la tipografía real de "Ver
          todos los productos", no la de un botón. Alcance sigue acotado a
          este botón únicamente. Solo mobile/tablet (md:hidden): desktop
          siempre muestra las 8 tarjetas, no tiene este botón. */}
      {showCollapseButton && (
        <div className="mt-6 flex justify-center px-5 md:hidden">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="group flex min-h-[44px] items-center gap-1.5 border-2 border-grey-300 bg-white px-5 py-2.5 font-body text-sm font-semibold text-barcel-black transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-black active:scale-95"
          >
            Ver todas las marcas
            <span
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
