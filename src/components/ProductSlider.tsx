"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Flavor } from "@/data/brands";
import { SPICE_LEVELS } from "./Picometro";

// Ronda 142: controladores del slider (flechas, pausa/play, dots) — el
// cliente marcó con una captura de Figma que estos controles "hacen
// falta" en vivo. Mismos SVG que ya usa el carrusel del Hero (Ronda 210,
// "flechas 1:1 con Figma") para no inventar un segundo set de iconos.
function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-barcel-red sm:h-6 sm:w-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7.85 13L10.7 15.85C10.9 16.05 10.9958 16.2833 10.9875 16.55C10.9792 16.8167 10.8833 17.05 10.7 17.25C10.5 17.45 10.2625 17.5542 9.9875 17.5625C9.7125 17.5708 9.475 17.475 9.275 17.275L4.7 12.7C4.5 12.5 4.4 12.2667 4.4 12C4.4 11.7333 4.5 11.5 4.7 11.3L9.275 6.725C9.475 6.525 9.7125 6.42917 9.9875 6.4375C10.2625 6.44583 10.5 6.55 10.7 6.75C10.8833 6.95 10.9792 7.18333 10.9875 7.45C10.9958 7.71667 10.9 7.95 10.7 8.15L7.85 11H19C19.2833 11 19.5208 11.0958 19.7125 11.2875C19.9042 11.4792 20 11.7167 20 12C20 12.2833 19.9042 12.5208 19.7125 12.7125C19.5208 12.9042 19.2833 13 19 13H7.85Z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-barcel-red sm:h-6 sm:w-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16.15 13H5C4.71667 13 4.47917 12.9042 4.2875 12.7125C4.09583 12.5208 4 12.2833 4 12C4 11.7167 4.09583 11.4792 4.2875 11.2875C4.47917 11.0958 4.71667 11 5 11H16.15L13.3 8.15C13.1 7.95 13.0042 7.71667 13.0125 7.45C13.0208 7.18333 13.1167 6.95 13.3 6.75C13.5 6.55 13.7375 6.44583 14.0125 6.4375C14.2875 6.42917 14.525 6.525 14.725 6.725L19.3 11.3C19.4 11.4 19.4708 11.5083 19.5125 11.625C19.5542 11.7417 19.575 11.8667 19.575 12C19.575 12.1333 19.5542 12.2583 19.5125 12.375C19.4708 12.4917 19.4 12.6 19.3 12.7L14.725 17.275C14.525 17.475 14.2875 17.5708 14.0125 17.5625C13.7375 17.5542 13.5 17.45 13.3 17.25C13.1167 17.05 13.0208 16.8167 13.0125 16.55C13.0042 16.2833 13.1 16.05 13.3 15.85L16.15 13Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 5L19 12L7 19V5Z" />
    </svg>
  );
}

const CARD_CLASSNAME =
  // Ronda 152: el cliente pidió eliminar "el cuadro y la sombra
  // paralela" en desktop — la caja blanca de composición (Ronda 88-91)
  // y el hover:shadow-lg que la acompañaba — y reemplazar todo el
  // comportamiento por "algo más simple... un movimiento sutil y leve",
  // señalando como referencia el prototipo del SKU en Figma
  // (node-id=1-3858, sección "También te puede antojar"): ahí la
  // tarjeta es solo imagen + picómetro + nombre, sin caja, sin sombra
  // de hover, sin cambio de color — reposa igual en cualquier estado.
  // Se quita hover:shadow-lg; se conserva SOLO hover:-translate-y-1
  // (un lift de 4px) como único feedback de interacción, en línea con
  // "sutil y leve". Ver CardContent y cardClass más abajo para el resto
  // del recorte (caja de composición, fondo de yute, anillos de color,
  // CTAs que aparecían/desaparecían con el hover).
  "group relative isolate flex w-64 shrink-0 flex-col items-center justify-end gap-3 overflow-hidden bg-white p-5 text-center text-barcel-black transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-red sm:w-96 sm:gap-4 sm:p-8 md:w-[32rem] md:p-10";

function CardContent({
  flavor,
  isTakis,
  isChips,
}: {
  flavor: Flavor;
  isTakis: boolean;
  isChips: boolean;
}) {
  // Ronda 152: se elimina por completo el swap hover→composición
  // (Ronda 55-151: caja blanca con la composición oficial del
  // brandbook + CTA propio para Takis, fondo de yute + nombre oculto
  // para Chip's, y los 3 overlays de "Pruébalo" que aparecían recién al
  // hacer hover). El cliente confirmó el punto que motivó Ronda 151
  // ("el contenido queda invisible por defecto y nunca se revela [en
  // touch], es justo lo que marca WCAG 1.4.13 como anti-patrón") y
  // pidió resolverlo de raíz, no parchearlo por breakpoint: en vez de
  // mostrar/ocultar contenido según haya o no hover disponible, la
  // tarjeta ahora es la MISMA en cualquier estado — imagen + picómetro
  // + nombre, siempre visibles — igual que el SKU de referencia en
  // Figma (node-id=1-3858). Ya no hay nada que dependa de group-hover
  // dentro de esta tarjeta: el único feedback de interacción vive en
  // CARD_CLASSNAME (el lift sutil) y es puramente decorativo, no gatea
  // contenido ni acciones — el Link/botón que envuelve la tarjeta ya es
  // clicable en toda su superficie.
  return (
    <>
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
          // Ronda 149: el cliente mandó evidencia de que en mobile el
          // Picómetro se corta — confirmado midiendo el DOM en vivo
          // (getBoundingClientRect): con "left-0 -translate-x-1/2", el
          // borde izquierdo de la imagen queda ~3.5px por fuera del
          // borde izquierdo de la tarjeta (que tiene overflow-hidden por
          // la revelación del hover, Ronda 54), así que ese margen se
          // recorta de verdad, no es una percepción óptica — el PNG real
          // (public/picometro/*.png, ratio ancho/alto ≈0.42-0.43) es más
          // ancho de lo que el padding de la tarjeta en mobile (p-5,
          // 20px) alcanza a cubrir una vez centrado con -translate-x-1/2.
          // Fix: "left-2" en vez de "left-0" (8px) — recorre el centro
          // del badge 8px hacia adentro, dejando ~4-10px de margen real
          // en todos los breakpoints (verificado con el sabor de mayor
          // ancho, picante.png) sin necesidad de encoger el tamaño que
          // el cliente pidió agrandar en Ronda 73.
          // Ronda 152: sin swap a composición (ver nota arriba), el
          // picómetro ya no necesita ningún estado de opacidad — es
          // estático, visible siempre, en mobile y en desktop por igual.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={SPICE_LEVELS[flavor.spiceLevel].image}
            alt={`Picómetro: ${SPICE_LEVELS[flavor.spiceLevel].label}`}
            className="absolute left-2 top-1/2 z-20 h-28 w-auto -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-lg sm:h-36 md:h-44"
          />
        )}
        {isChips && flavor.sliderImage ? (
          // Ronda 101: foto de estilo de vida (bolsa + bowl + fondo real)
          // que el cliente pidió usar en vez del recorte de producto —
          // a diferencia de los demás casos (object-contain, deja ver el
          // fondo blanco de la tarjeta alrededor), esta va a sangre
          // dentro de la caja de la tarjeta (object-cover, sin
          // drop-shadow: la foto ya trae su propia composición/sombra).
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={flavor.sliderImage}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={flavor.image}
            alt=""
            aria-hidden="true"
            className="h-full w-auto object-contain drop-shadow-xl"
          />
        )}
      </div>
      {/* Ronda 143: el cliente marcó (screenshot + link a Figma
          node-id=1-3760, el frame REAL del rediseño de "Portafolio de
          productos") que el nombre de sabor aquí NO lleva el manchón
          amarillo (TakisTape) ni la fuente manuscrita (font-takisMark,
          Permanent Marker) — eso quedó de la Ronda 44/45, cuando esta
          sección todavía no tenía su propio pase de rediseño Figma 1:1
          (tarea #204, aún pendiente para el resto del portafolio). El
          frame 1-3760 muestra el nombre en texto plano, en negritas,
          mayúsculas, color takis-purple, en la misma fuente oficial del
          brandbook que ya usa el H1 del hero de Takis (font-takisDisplay
          = Veneer/Anton, ver globals.css y TakisHero.tsx) — no
          font-display genérico. Se quita TakisTape/font-takisMark de
          aquí; ambos siguen existiendo y se usan en otras piezas del
          brandbook (ej. las composiciones oficiales con cinta quemada
          en la imagen, que no se tocan). */}
      {isTakis ? (
        // Ronda 152: sin swap a composición, el nombre ya no se oculta en
        // ningún breakpoint — estático siempre, como en la referencia de
        // Figma.
        // Ronda 153: el cliente pidió (a) subir el nombre +4px en todos
        // los breakpoints (16→20, 20→24, 24→28 — el último no cae en un
        // escalón estándar de Tailwind, de ahí los valores entre
        // corchetes) y (b) agregar una flecha "con el mismo comportamiento
        // que los de las marcas en el home" — la misma que usa
        // BrandCard.tsx en "Ver todos los productos": un span aparte con
        // transition-transform + group-hover:translate-x-1 (CARD_CLASSNAME
        // ya trae "group" en la tarjeta, así que el hover de la tarjeta
        // completa ya dispara este nudge, sin JS ni estado nuevo). La
        // flecha vive en su PROPIO span, no dentro del texto, para poder
        // animarla sola sin heredar/tocar la tipografía del nombre — el
        // cliente pidió explícitamente "mantén la tipografía en los
        // nombres".
        <span className="relative inline-flex items-center gap-1.5 px-3 py-1">
          <span className="font-takisDisplay text-[20px] font-bold uppercase leading-tight tracking-wide text-takis-purple sm:text-[24px] md:text-[28px]">
            {flavor.name}
          </span>
          <span
            className="text-takis-purple transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </span>
      ) : (
        // Ronda 98 (revertida en Ronda 100): se probó reemplazar este
        // texto por la etiqueta de yute como imagen (flavor.nameImage).
        // El cliente pidió volver a texto plano tanto aquí como en la
        // página de producto — "vamos a quitar las imágenes con el
        // nombre de producto ... y vamos a volver a tener el nombre del
        // producto en texto". font-introhead solo para Chip's (misma
        // fuente que ya se autohospedó en Ronda 97 para el H1 del hero);
        // el resto de marcas sin tratamiento especial se queda en
        // font-display, como siempre.
        // Ronda 152: sin fondo de yute en hover (eliminado junto con la
        // caja de composición, ver nota al inicio de CardContent), el
        // nombre de Chip's ya no necesita distinguir "con/sin sliderImage"
        // para decidir si se oculta — es font-introhead siempre visible,
        // para todos los sabores.
        // Ronda 153: mismo +4px (18→22, 24→28, 30→34) y misma flecha con
        // group-hover:translate-x-1 que la variante de Takis arriba — ver
        // esa nota para el razonamiento completo. El color de la flecha
        // aquí no se fija explícito: hereda text-barcel-black de
        // CARD_CLASSNAME, igual que ya hacía el nombre (que tampoco traía
        // color propio en esta rama).
        <span className="relative inline-flex items-center gap-1.5">
          <span
            className={`text-[22px] font-extrabold uppercase leading-tight sm:text-[28px] md:text-[34px] ${
              isChips ? "font-introhead" : "font-display"
            }`}
          >
            {flavor.name}
          </span>
          <span
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </span>
      )}
      {/* Ronda 152: se elimina el CTA "Pruébalo" que vivía como overlay
          independiente al fondo de la tarjeta (nacido en Ronda 56, con
          9 rondas de ajustes desde entonces — contenedor de botón real
          en Ronda 72, borde blanco en Ronda 89, texto corto en Ronda
          150, visible-por-defecto en mobile en Ronda 151). El cliente
          pidió "algo más simple" y señaló como referencia el SKU de
          Figma (node-id=1-3858, "También te puede antojar"): ahí la
          tarjeta NO lleva ningún CTA propio — el nombre del sabor es el
          único texto, y toda la tarjeta ya es el elemento clicable
          (Link/button que envuelve CardContent, ver más abajo). Quitar
          este overlay también resuelve la pregunta de fondo del cliente
          sobre WCAG 1.4.13 de una vez: no queda NADA en la tarjeta que
          dependa de hover para revelarse, en ningún dispositivo. */}
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
  const isChips = brandSlug === "chips";

  // Ronda 152: se elimina toda la lógica que hacía cardClass() distinta
  // por marca/sabor (fondo violeta de Takis, anillo de color de Takis/
  // Chip's, texto de contraste hoverText/hoverBg para cuando el fondo
  // cambiaba en hover — Rondas 73-149). El cliente pidió quitar "el
  // cuadro y la sombra paralela" de desktop y reemplazar todo el
  // comportamiento por "algo más simple... un movimiento sutil y leve",
  // con el SKU de Figma (node-id=1-3858) como referencia: ahí la
  // tarjeta no cambia de color ni de borde en ningún estado, solo
  // reposa. cardClass ahora es la MISMA clase para las 8 marcas — el
  // único feedback de interacción es el lift de CARD_CLASSNAME.
  // hoverBg/hoverText se mantienen en la firma del componente (los
  // siguen pasando BrandPage.tsx y RelatedProductsSlider.tsx) pero ya
  // no se aplican aquí.
  const cardClass = (_flavor: Flavor) => CARD_CLASSNAME;

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
  // Ronda 142: el cliente mandó una captura de Figma marcando que "hacen
  // falta los controladores del slider" — flechas prev/next, un botón
  // explícito de pausa/play (no solo :hover, que en touch no existe) y
  // dots de navegación. Eso obliga a abandonar la animación por CSS
  // keyframes (Ronda 33/45, animate-marquee): una vez pausada por CSS,
  // "saltar" a una posición arbitraria (flecha/dot) requiere pelear
  // contra el propio keyframe, que sigue "dueño" del transform aunque
  // esté en paused (los estilos inline NO ganan sobre una animación
  // activa, solo sobre CSS normal). Se reemplaza por una posición en px
  // llevada en un ref (offsetRef) y animada a mano vía
  // requestAnimationFrame — control total: el autoplay avanza el
  // offset cada frame, las flechas/dots lo saltan directo, y "pausa" es
  // simplemente "no avanzar este frame". Los 4 sets duplicados (loop,
  // ya existían para el loop CSS) siguen sirviendo de colchón: el
  // offset se mantiene siempre en la ventana (-2×W, 0) — dentro de los
  // sets 2º-4º — y se corrige con saltos invisibles de ±W cuando se
  // acerca a cualquier borde, para nunca quedarse sin contenido
  // duplicado hacia ningún lado (autoplay solo resta; las flechas/dots
  // pueden sumar).
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const isPointerDown = useRef(false);
  const [playing, setPlaying] = useState(true);
  const playingRef = useRef(true);
  const offsetRef = useRef(0);
  const oneSetWidthRef = useRef(0);
  const cardOffsetsRef = useRef<number[]>([]); // offsetLeft de cada sabor único (primer set)
  // Ronda 142 (verificado contra el archivo de Figma real, viendo el
  // frame directamente — el cliente tiene 8 sabores Takis pero SOLO 4
  // dots en el diseño): los dots no son "uno por sabor", son "una por
  // página" — cuántas tarjetas caben de una vez en el viewport
  // (cardsPerView). Con 8 sabores y ~2 tarjetas visibles a la vez en el
  // ancho del frame de Figma, 8÷2=4 páginas — coincide exacto. Se
  // recalcula en cada resize (cardsPerView cambia con el breakpoint:
  // las tarjetas son más angostas en mobile/tablet, w-64→sm:w-96→
  // md:w-[32rem]) en vez de asumir un número fijo, para que el mismo
  // criterio sea válido en cualquier marca (menos de 8 sabores) y en
  // cualquier ancho de pantalla.
  const cardsPerViewRef = useRef(1);
  const dotsCountRef = useRef(1);
  const [dotsCount, setDotsCount] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const applyTransform = (smooth = false) => {
    if (!trackRef.current) return;
    trackRef.current.style.transition = smooth
      ? "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";
    trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
  };

  const measure = () => {
    if (!trackRef.current || !viewportRef.current) return;
    const kids = Array.from(trackRef.current.children) as HTMLElement[];
    if (kids.length < flavors.length * 2) return;
    oneSetWidthRef.current = kids[flavors.length].offsetLeft - kids[0].offsetLeft;
    cardOffsetsRef.current = kids
      .slice(0, flavors.length)
      .map((el) => el.offsetLeft - kids[0].offsetLeft);
    const cardStep = kids.length > 1 ? kids[1].offsetLeft - kids[0].offsetLeft : 0;
    if (cardStep > 0) {
      const perView = Math.max(
        1,
        Math.round(viewportRef.current.clientWidth / cardStep)
      );
      cardsPerViewRef.current = perView;
      const pages = Math.max(1, Math.ceil(flavors.length / perView));
      dotsCountRef.current = pages;
      setDotsCount(pages);
    }
    if (offsetRef.current === 0 && oneSetWidthRef.current > 0) {
      // Arranca en el 2º set: dejar colchón de un set completo hacia
      // atrás (para que la flecha "Anterior" siempre tenga de dónde
      // tomar contenido) sin mover nada visualmente (sets idénticos).
      offsetRef.current = -oneSetWidthRef.current;
      applyTransform(false);
    }
  };

  // Sabor más cercano al borde izquierdo visible → página (dot)
  // correspondiente = ese índice dividido entre cardsPerView.
  const closestIndex = () => {
    const W = oneSetWidthRef.current;
    const offsets = cardOffsetsRef.current;
    if (!W || offsets.length === 0) return 0;
    const posInSet = (((-offsetRef.current) % W) + W) % W;
    let best = 0;
    let bestDist = Infinity;
    offsets.forEach((o, i) => {
      const d = Math.abs(o - posInSet);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  };
  const closestPage = () => {
    const perView = Math.max(1, cardsPerViewRef.current);
    return Math.min(dotsCountRef.current - 1, Math.round(closestIndex() / perView));
  };

  const wrap = () => {
    const W = oneSetWidthRef.current;
    if (!W) return;
    // Mantiene offsetRef dentro de (-2W, 0) — siempre dentro de los
    // sets 2º-4º de los 4 duplicados — con saltos de ±W indetectables
    // porque cada set renderiza el mismo contenido.
    while (offsetRef.current <= -2 * W) offsetRef.current += W;
    while (offsetRef.current > 0) offsetRef.current -= W;
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flavors.length]);

  useEffect(() => {
    // Ronda 144: "la velocidad de esos slider debe subir x1.5" — 34px/s
    // (Ronda 142) era el ritmo original del animate-marquee que reemplazó.
    // Ronda 145: "aumenta x2 más, está demasiado lento" — sobre los 51px/s
    // de la Ronda 144, x2 más = 102px/s. Mismo mecanismo (rAF), sin tocar
    // wrap()/measure() ni el resto del carrusel.
    const SPEED_PX_PER_SEC = 102;
    let last = performance.now();
    let raf = 0;
    let frame = 0;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const shouldPlay =
        playingRef.current && !isHovering.current && !isPointerDown.current;
      if (shouldPlay && oneSetWidthRef.current > 0) {
        offsetRef.current -= (SPEED_PX_PER_SEC * dt) / 1000;
        wrap();
        applyTransform(false);
      }
      // Recalcular el dot (página) activo ~6 veces por segundo, no cada
      // frame — de sobra para que se sienta instantáneo sin
      // re-renderizar a 60fps.
      frame += 1;
      if (frame % 10 === 0) {
        const page = closestPage();
        if (page !== activeIndexRef.current) {
          activeIndexRef.current = page;
          setActiveIndex(page);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = () => {
    if (!trackRef.current || trackRef.current.children.length < 2) return 0;
    const a = trackRef.current.children[0] as HTMLElement;
    const b = trackRef.current.children[1] as HTMLElement;
    return b.offsetLeft - a.offsetLeft;
  };

  const goPrev = () => {
    setPlaying(false);
    playingRef.current = false;
    offsetRef.current += step();
    wrap();
    applyTransform(true);
  };
  const goNext = () => {
    setPlaying(false);
    playingRef.current = false;
    offsetRef.current -= step();
    wrap();
    applyTransform(true);
  };
  const goToPage = (page: number) => {
    if (!oneSetWidthRef.current || cardOffsetsRef.current.length === 0) return;
    setPlaying(false);
    playingRef.current = false;
    // El dot N lleva al sabor N×cardsPerView (el primero de esa
    // página); clamp al último sabor real por si flavors.length no es
    // múltiplo exacto de cardsPerView (última página más corta).
    const i = Math.min(
      cardOffsetsRef.current.length - 1,
      page * cardsPerViewRef.current
    );
    // Salta dentro del set en el que ya está parado, para que el salto
    // siempre sea corto (nunca más de un set completo).
    const W = oneSetWidthRef.current;
    const base = Math.floor(-offsetRef.current / W) * W;
    offsetRef.current = -(base + cardOffsetsRef.current[i]);
    wrap();
    applyTransform(true);
  };
  const togglePlay = () => {
    setPlaying((p) => {
      playingRef.current = !p;
      return !p;
    });
  };

  const handleMouseEnter = () => {
    isHovering.current = true;
  };
  const handleMouseLeave = () => {
    isHovering.current = false;
    isPointerDown.current = false;
  };
  const handlePointerDown = () => {
    isPointerDown.current = true;
  };
  const handlePointerUp = () => {
    isPointerDown.current = false;
  };

  return (
    <>
      <div className="relative">
        <div className="overflow-hidden" ref={viewportRef}>
        <div
          ref={trackRef}
          className="flex w-max items-stretch gap-6 py-2 sm:gap-8"
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
                <CardContent flavor={flavor} isTakis={isTakis} isChips={isChips} />
              </Link>
            ) : (
              <button
                key={`${flavor.name}-${i}`}
                type="button"
                onClick={() => setActive(flavor)}
                aria-label={`Ver ${brandName} ${flavor.name}`}
                className={cardClass(flavor)}
              >
                <CardContent flavor={flavor} isTakis={isTakis} isChips={isChips} />
              </button>
            )
          )}
        </div>
        </div>

        {/* Ronda 142: flechas prev/next — mismo componente visual que ya
            usa el Hero (border-2 border-grey-300 bg-white, ícono rojo),
            ocultas en mobile igual que ahí (el swipe nativo + los dots
            ya cubren la navegación en touch, y a este ancho de tarjeta
            —w-64, 256px— las flechas pegadas al borde tapan parte de la
            primera/última tarjeta visible). */}
        <button
          type="button"
          aria-label="Sabor anterior"
          onClick={goPrev}
          className="absolute left-0 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border-2 border-grey-300 bg-white transition hover:bg-grey-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-black sm:flex sm:h-14 sm:w-14"
        >
          <ArrowLeftIcon />
        </button>
        <button
          type="button"
          aria-label="Siguiente sabor"
          onClick={goNext}
          className="absolute right-0 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border-2 border-grey-300 bg-white transition hover:bg-grey-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-black sm:flex sm:h-14 sm:w-14"
        >
          <ArrowRightIcon />
        </button>
      </div>

      {/* Ronda 142: botón de pausa/play (esencial en touch — sin :hover
          real, es la única forma de detener el carrusel para poder leer
          con calma o hacer tap con puntería) + dots. Verificado contra
          el archivo de Figma real: NO es un dot por sabor — son páginas
          (cuántas tarjetas caben de una vez, ver dotsCount/cardsPerView
          arriba), mismo patrón visual que los dots del Hero (Ronda
          28/210: activo = píldora roja alargada, inactivo = punto
          gris). */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label={playing ? "Pausar carrusel" : "Reanudar carrusel"}
          aria-pressed={!playing}
          onClick={togglePlay}
          className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-grey-300 bg-white text-barcel-black transition hover:bg-grey-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-black"
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: dotsCount }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a la página ${i + 1}`}
              aria-current={i === activeIndex}
              onClick={() => goToPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 bg-barcel-red"
                  : "w-1.5 bg-grey-200 hover:bg-grey-300"
              }`}
            />
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
