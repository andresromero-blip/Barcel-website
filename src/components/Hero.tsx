"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Banners reales del prototipo (public/hero). El arte/headline ya vienen
// resueltos en la imagen; el CTA de cada slide es un componente real
// (accesible, con foco visible y fondo sólido para garantizar contraste),
// apilado en flujo normal debajo del banner en vez de calcado por
// coordenadas — así se mantiene correcto en cualquier tamaño de pantalla.
//
// Ronda 103: el cliente reemplazó el set completo de banners (pasó de 3 a
// 7 piezas: promo Golácticos, Chip's 35 años, Runners Juegalos, nuevas
// Pop, 2 piezas de Takis y Hot Nuts). El CTA de cada slide enlaza a la
// página de esa marca cuando existe en el sitio (chips/runners/takis/
// hot-nuts); Golácticos (promo con landing propia externa) y Pop (sin
// página de marca todavía) enlazan a la sección #marcas del home. Los
// colores de cada CTA son los tokens de marca ya verificados AA contra
// fondo blanco en tailwind.config.ts (mismo criterio que el resto del
// sitio, no valores nuevos).
// Ronda 132: se reemplazaron los 7 banners por versiones ampliadas a
// 3072x1536 (el doble de alto y 1.5x más anchas que el asset original
// de 2048x768). El arte original de cada banner se mantiene A ESCALA
// NATIVA (sin estirar), centrado horizontalmente (512px de margen a
// cada lado) y anclado arriba (0-768px); el espacio nuevo — los 512px
// de cada lado y los 768px de abajo — se rellenó con una extensión del
// propio fondo de cada banner (para golacticos/takis-picante/
// takis-picometro, generada con IA — Firefly Generative Expand; para
// pop/chips-35-anos/hotnuts/runners-juegalos, con un desenfoque +
// degradado del propio borde de la imagen vía Pillow, sin IA, porque la
// generación de Firefly alucinaba texto ilegible en el fondo de esos 4).
// El motivo del cambio: dar un "colchón" real debajo y a los costados
// del arte original para que un futuro overlay de CTA nunca tape
// contenido, sin depender de recortar dinámicamente con CSS.
// Como el contenido real de CADA banner ahora vive siempre en la misma
// franja (centrado, top-anchored, con ~512px de aire a cada lado y 768px
// abajo), ya no hace falta un `object-position` distinto por banner —
// `object-top` (centrado horizontal + anclado arriba) es seguro para
// los 7 en cualquier proporción de contenedor: el margen agregado
// absorbe el recorte lateral que pueda meter cualquier aspect-ratio del
// contenedor, y anclar arriba garantiza que el recorte (si lo hay) caiga
// siempre en el colchón de abajo, nunca en el arte real.
const SLIDES = [
  {
    id: "golacticos",
    image: "/hero/slide-golacticos.jpg",
    alt: "La Promo Golácticos Barcel — compra, encuentra tu código y regístrate para ganar premios",
    cta: {
      label: "Conoce la promo",
      href: "https://www.golacticosbarcel.com",
      // Fondo blanco solido + texto rojo oscuro: 5.7:1 de contraste (AA)
      variant: "text-barcel-red-dark",
    },
  },
  {
    id: "chips-35-anos",
    image: "/hero/slide-chips-35-anos.jpg",
    alt: "Chip's Jalapeño 35 años — celebrando a los que no dan de sus Chip's Jalapeño",
    cta: {
      label: "Descubre Chip's Jalapeño",
      href: "/marcas/chips",
      // Fondo blanco solido + texto café Chip's: 10.42:1 de contraste (AA)
      variant: "text-chips-brown",
    },
  },
  {
    id: "runners-juegalos",
    image: "/hero/slide-runners-juegalos.jpg",
    alt: "Runners Juégalos — pruébalos",
    cta: {
      label: "Descubre Runners",
      href: "/marcas/runners",
      // Fondo blanco solido + texto rosa Runners: 5.04:1 de contraste (AA)
      variant: "text-runners-pink-700",
    },
  },
  {
    id: "pop",
    image: "/hero/slide-pop.jpg",
    alt: "Nuevas Pop sabor extra mantequilla — encuéntralas en tu tiendita",
    cta: {
      label: "Descubre las nuevas Pop",
      href: "#marcas",
      // Fondo blanco solido + texto rojo oscuro: 5.7:1 de contraste (AA)
      variant: "text-barcel-red-dark",
    },
  },
  {
    id: "takis-picante",
    image: "/hero/slide-takis-picante.jpg",
    alt: "Takis Intense Nacho — todos intensos, no todos picantes",
    cta: {
      label: "Descubre Takis",
      href: "/marcas/takis",
      // Fondo blanco solido + texto morado oscuro: 6.75:1 de contraste (AA)
      variant: "text-takis-purple",
    },
  },
  {
    id: "takis-picometro",
    image: "/hero/slide-takis-picometro.jpg",
    alt: "Los 7 sabores de Takis y su nivel de picor — todos intensos, no todos picantes",
    cta: {
      label: "Elige tu nivel de picor",
      href: "/marcas/takis",
      // Fondo blanco solido + texto morado oscuro: 6.75:1 de contraste (AA)
      variant: "text-takis-purple",
    },
  },
  {
    id: "hotnuts",
    image: "/hero/slide-hotnuts.jpg",
    alt: "Hot Nuts — si va a tronar, ¡que truene bien!",
    cta: {
      label: "Descubre Hot Nuts",
      href: "/marcas/hot-nuts",
      // Fondo blanco solido + texto naranja Hot Nuts: 5.06:1 de contraste (AA)
      variant: "text-hotnuts-orange-700",
    },
  },
];

// Ronda 120: flechas del carrusel 1:1 con Figma (node 1:3154 "Arrows", dentro
// de 1:3146 "Carrusel"). El cliente marcó con un rectángulo rojo que el
// estilo en vivo (cuadro semitransparente bg-white/20 + glifo tipográfico
// ‹ › blanco) no correspondía al diseño real. Extraído vía get_design_context:
// caja 56x56 (h-14 w-14) bg-white con border-2 border-grey-300 (sin blur, sin
// transparencia), ícono real 24x24 "Google icons · arrow_left/arrow_right"
// (SVG exportado de Figma, no un glifo de texto) en barcel-red (#ff2d50,
// mismo token que el resto del sitio), separado 24px del borde (h-14 en vez
// de h-9/h-11, left/right-6 en vez de left-2/left-4).
function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-barcel-red" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7.85 13L10.7 15.85C10.9 16.05 10.9958 16.2833 10.9875 16.55C10.9792 16.8167 10.8833 17.05 10.7 17.25C10.5 17.45 10.2625 17.5542 9.9875 17.5625C9.7125 17.5708 9.475 17.475 9.275 17.275L4.7 12.7C4.5 12.5 4.4 12.2667 4.4 12C4.4 11.7333 4.5 11.5 4.7 11.3L9.275 6.725C9.475 6.525 9.7125 6.42917 9.9875 6.4375C10.2625 6.44583 10.5 6.55 10.7 6.75C10.8833 6.95 10.9792 7.18333 10.9875 7.45C10.9958 7.71667 10.9 7.95 10.7 8.15L7.85 11H19C19.2833 11 19.5208 11.0958 19.7125 11.2875C19.9042 11.4792 20 11.7167 20 12C20 12.2833 19.9042 12.5208 19.7125 12.7125C19.5208 12.9042 19.2833 13 19 13H7.85Z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-barcel-red" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16.15 13H5C4.71667 13 4.47917 12.9042 4.2875 12.7125C4.09583 12.5208 4 12.2833 4 12C4 11.7167 4.09583 11.4792 4.2875 11.2875C4.47917 11.0958 4.71667 11 5 11H16.15L13.3 8.15C13.1 7.95 13.0042 7.71667 13.0125 7.45C13.0208 7.18333 13.1167 6.95 13.3 6.75C13.5 6.55 13.7375 6.44583 14.0125 6.4375C14.2875 6.42917 14.525 6.525 14.725 6.725L19.3 11.3C19.4 11.4 19.4708 11.5083 19.5125 11.625C19.5542 11.7417 19.575 11.8667 19.575 12C19.575 12.1333 19.5542 12.2583 19.5125 12.375C19.4708 12.4917 19.4 12.6 19.3 12.7L14.725 17.275C14.525 17.475 14.2875 17.5708 14.0125 17.5625C13.7375 17.5542 13.5 17.45 13.3 17.25C13.1167 17.05 13.0208 16.8167 13.0125 16.55C13.0042 16.2833 13.1 16.05 13.3 15.85L16.15 13Z" />
    </svg>
  );
}

const AUTOPLAY_MS = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex((i + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  const slide = SLIDES[index];

  return (
    <section
      className="relative overflow-hidden bg-barcel-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Historial de este bloque (Rondas 104-107): con los banners
          originales, casi cuadrados (1440x900), no había forma de que la
          imagen llegara de borde a borde en pantallas anchas sin recortar
          contenido o sin dejar franjas/blur de relleno a los lados — el
          cliente no podía reeditar esos assets, así que se probaron
          varias soluciones solo-CSS (tope de altura, tope de ancho,
          fondo desenfocado) y ninguna quedó 100% "borde a borde, sin
          recortar nada" a la vez.
          Ronda 108: el cliente mandó los 7 banners rehechos en formato
          panorámico real (2048x768, proporción ~8:3) pensado para esto.
          Con esa proporción, a ancho completo la altura resultante es
          bastante menor que el viewport en cualquier pantalla común
          (1920 de ancho → ~720px de alto + header, cómodo en cualquier
          monitor), así que ya no hace falta ningún truco de recorte,
          tope de altura agresivo ni relleno — un solo <img> por slide,
          object-cover a ancho completo, igual que un hero "normal".
          `max-h-[85vh]` queda solo como colchón de seguridad para
          viewports extremadamente bajos (celular en horizontal), no
          como mecanismo principal — con estos assets casi nunca se
          activa.

          Ronda 113: el cliente reportó que en mobile "los banners se ven
          muy pequeños y el CTA los tapa". Causa real (parte 1): se
          forzaba el MISMO aspect-ratio panorámico (2048:768 ≈ 2.67:1,
          pensado para desktop) en todos los tamaños — en un viewport
          angosto (390px) eso da apenas ~146px de alto. Fix: en mobile se
          usa un aspect-ratio más alto/menos panorámico (4:3, el doble de
          alto que antes) — object-cover sigue mostrando el alto COMPLETO
          de la imagen (nunca recorta arriba/abajo, donde suele vivir el
          producto/logo), solo recorta un poco de los bordes
          izquierdo/derecho. A partir de md (donde el ancho real del
          viewport ya hace que 2048:768 dé una altura cómoda) se vuelve al
          aspect-ratio real del asset — desktop queda intacto.

          Ronda 114: agrandar la caja (Ronda 113) achicó el problema pero
          no lo eliminó — el cliente mandó captura del slide "Nuevas Pop"
          mostrando el CTA todavía encima del arte. Causa real (parte 2):
          el overlay de CTA+dots seguía siendo `absolute bottom-0` DENTRO
          de la imagen sin importar la altura de la caja — más alto solo
          reparte mejor el espacio ARRIBA, pero el overlay sigue anclado
          al borde inferior, así que cualquier banner cuya composición
          traiga texto/logo pegado abajo (como Pop) queda tapado sin
          importar qué tan alta sea la caja. Golácticos (fondo oscuro
          vacío abajo) no mostraba el problema; Pop (wordmark y texto
          pegados al borde inferior) sí.
          Fix definitivo: en mobile el CTA+dots deja de ser overlay — pasa
          a flujo normal DEBAJO de la imagen (bloque aparte, fondo sólido
          bg-barcel-black), así nunca se superpone a NINGÚN banner sin
          importar su composición. Desde md se mantiene el overlay
          absoluto original, sin ningún cambio (el cliente nunca reportó
          problema en desktop).

          Ronda 127: la Ronda 113 redujo el recorte cambiando el
          aspect-ratio (2.67:1 → 4:3 en mobile) pero seguía usando
          object-cover — un aspect-ratio más angosto que el de la imagen
          real SIGUE recortando los bordes izq/der sin importar cuál se
          elija, solo cambia cuánto. El cliente lo confirmó con captura
          real: en "Nuevas Pop" el wordmark "NUEVAS POP" (pegado al borde
          izquierdo del arte 2048x768) queda cortado a la mitad — no es
          un problema de proporción sino de que object-cover, por
          definición, siempre recorta cuando el aspect-ratio del
          contenedor no es idéntico al de la imagen.
          Fix (parcial, corregido en Ronda 128): pasar la imagen a
          object-contain en mobile y rellenar las franjas resultantes con
          una segunda copia desenfocada de fondo (efecto "story").

          Ronda 128: el cliente reportó el resultado de la Ronda 127 como
          "se ven espacios entre el banner, no es responsive, parece un
          error" — con razón. Causa real: la caja seguía forzando un
          aspect-ratio (4:3, luego 3:2) mucho más angosto/alto que el de
          la imagen real (2048:768 ≈ 2.67:1). Eso estaba bien mientras la
          imagen usaba object-cover (Rondas 104-114): el sobrante se
          recortaba en silencio por los bordes. Pero en cuanto la Ronda
          127 cambió a object-contain para dejar de recortar, ESE MISMO
          desfase de proporción pasó a verse como una franja vacía
          — y el "fondo desenfocado" pensado para disimularla se veía mal
          por la misma razón geométrica: object-cover, dentro de una caja
          mucho más alta que ancha respecto a la imagen, tiene que
          agrandar la imagen hasta cubrir el alto completo, lo que recorta
          la mayor parte del ANCHO — el fondo terminaba mostrando un
          fragmento angosto y muy ampliado del centro de la imagen
          (con estos banners, casi siempre pared/cielo de fondo, un color
          casi plano), que desenfocado ya no se lee como "fondo ambiental
          de la foto" sino como un degradado gris liso — de ahí que
          pareciera un glitch/error en vez de un fondo intencional.
          Fix (Ronda 128, corregido a su vez en Ronda 129): la caja dejó
          de tener un aspect-ratio propio distinto al de la imagen — usó
          el mismo (2048:768) en TODOS los breakpoints. Sin ninguna
          franja que rellenar, se quitó la segunda copia desenfocada.
          El costo (documentado entonces, subestimado en la práctica): el
          banner quedaba muy bajo en mobile (~140px de alto en un iPhone
          de 390px de ancho) — visualmente "aplastado" contra el bloque
          negro del CTA de abajo, que el cliente terminó leyendo como
          "todavía queda una franja negra" (Ronda 129) y pidió
          explícitamente más alto: "si la solución es ampliar el
          espacio para los banners de manera vertical hazlo".

          Ronda 129: con el ancho fijo al del viewport, la ÚNICA forma de
          que la imagen se vea más alta sin recortar contenido (mismo
          requisito de la Ronda 127) es agrandar la CAJA por encima de lo
          que da su proporción real — lo que vuelve a dejar franjas
          arriba/abajo por definición geométrica de object-contain. Se
          intentó rellenarlas con negro sólido (`bg-barcel-black`, el
          mismo fondo de la <section>) en vez de blur, pensando que al
          ser el mismo negro que el bloque de CTA de abajo se leería como
          una sola pieza "letterbox" intencional.

          Ronda 130: el cliente rechazó esto de forma tajante y con
          razón — dos franjas negras grandes (arriba Y abajo de la
          imagen, ~140px cada una en un iPhone de 390px) encima del
          bloque negro del CTA es objetivamente MUCHO negro para un
          "banner", sea o no el mismo tono: "esas franjas negras no
          deben existir, el banner debe cubrir la totalidad del espacio
          asignado". Tiene razón en el diagnóstico de fondo: con estos
          assets (2048x768 fijo) hay tres propiedades que NO se pueden
          cumplir las tres a la vez —
            (1) cubrir el 100% de la caja sin ningún espacio vacío,
            (2) nunca recortar nada del arte (el requisito de la Ronda 127),
            (3) que la caja sea más alta/angosta que la proporción real
                del asset (lo que pedía la Ronda 129).
          Cualquier combinación de 2 de las 3 es posible; las 3 juntas no
          — es geometría, no un bug de CSS. Entre "más alto" (129) y
          "cero recorte + cero franjas" (127/cliente original), el
          cliente ahora prioriza expresamente (1) y (2): que el banner
          rellene TODO el espacio asignado, sin cortar el arte. Eso solo
          es posible si el espacio asignado (la caja) tiene EXACTAMENTE
          la proporción real del asset (2048:768) — entonces no sobra
          ancho ni alto que recortar ni que dejar vacío: la imagen llena
          el 100% de la caja en cualquier ancho de pantalla (por eso
          "responsive": la caja se adapta a la proporción de la imagen
          en vez de forzar una propia). Se revierte al criterio de la
          Ronda 128 — 2048:768 en TODOS los breakpoints, sin variantes
          por tamaño — y de paso se cambia `object-contain` por
          `object-cover`: con la proporción de la caja ya idéntica a la
          de la imagen ambos se ven IGUAL (no hay margen que recortar ni
          que enseñar de más), pero "cover" dice explícitamente en el
          código la garantía que ahora es un requisito de negocio: cero
          espacio vacío, siempre. El banner vuelve a ser más bajo en
          mobile (~140px en un iPhone de 390px) que con la caja alta de
          la Ronda 129 — es la altura real de estos assets sin recortar
          ni dejar franjas; subir esa altura sin violar (1) o (2)
          requeriría que el cliente entregue una versión de cada banner
          recortada a propósito para mobile (p. ej. 4:3 o 1:1, con el
          contenido importante ya encuadrado para ese formato), no un
          ajuste de CSS sobre el mismo asset panorámico.

          Ronda 131: el cliente pidió explícitamente "soluciones" — se le
          presentaron 3 caminos reales (recorte inteligente por banner
          ahora mismo / pedir crops nuevos de diseño para mobile /
          separar texto e imagen a futuro) y eligió el primero: aceptar
          ALGO de recorte lateral (como en las Rondas 104-114) pero
          dirigido con criterio banner por banner, en vez de un recorte
          ciego centrado. Se subió la caja mobile/tablet de 2048:768 a
          16:9 (más alta que el asset real → +50% de alto, 211px en vez
          de 140px en un iPhone de 390px — bastante menos agresivo que
          el 4:3 de la Ronda 113/129, que solo dejaba ver el 50% del
          ancho) y se le da a cada slide su propio `mobilePosition`
          (object-position) según dónde vive su contenido crítico —
          revisado 1:1 contra los 7 JPG a resolución completa, ver el
          comentario junto al array SLIDES para el detalle banner por
          banner. Aviso importante para el cliente: en 2 de los 7
          banners (Golácticos, Takis Picómetro) el contenido llega hasta
          AMBOS bordes de la imagen (personajes/termómetro pegados a los
          extremos) — ningún object-position evita recortar algo ahí, se
          protegió el elemento más importante de cada uno (el logo y la
          fila de bolsas) a costa de la decoración de las esquinas. Esto
          ya no es ajustable por CSS: solo se resuelve con un recorte de
          diseño dedicado para mobile (la opción 2 que el cliente no
          eligió esta vez). Desde md se mantiene 2048:768 sin ningún
          cambio — cero recorte ahí, igual que siempre. */}
      {/* Ronda 132: assets pasaron de 2048x768 a 3072x1536 — se actualiza
          el aspect-ratio de md en adelante a la proporción real del
          nuevo asset (3072:1536 = 2:1) para mantener el mismo criterio
          de cero-recorte de las Rondas 130/131 (container ratio = asset
          ratio). Mobile se deja en 16:9 (no en 2:1): con estos banners
          más altos, forzar 2:1 en mobile daría una caja demasiado alta
          en pantallas angostas; 16:9 sigue sin recortar nada verticalmente
          (el asset es más "alto" que el contenedor: cover ajusta por
          ancho) y solo recorta un poco de los costados — lo cual ahora
          es seguro para los 7 banners gracias al margen de 512px por
          lado explicado arriba. */}
      <div className="relative aspect-[16/9] max-h-[85vh] min-h-[100px] w-full md:aspect-[3072/1536]">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== index}
            className={`absolute inset-0 h-full w-full overflow-hidden transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt={s.alt}
              className="absolute inset-0 h-full w-full object-cover object-top"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* arrow nav — ocultas en mobile (los dots + swipe/autoplay ya
            cubren la navegación ahí); visibles desde md hacia arriba */}
        <button
          type="button"
          aria-label="Anterior"
          onClick={prev}
          className="absolute left-6 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border-2 border-grey-300 bg-white transition hover:bg-grey-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-black md:flex"
        >
          <ArrowLeftIcon />
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={next}
          className="absolute right-6 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border-2 border-grey-300 bg-white transition hover:bg-grey-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-black md:flex"
        >
          <ArrowRightIcon />
        </button>
      </div>

      {/* CTA + dots — Ronda 114: en mobile van FUERA de la caja de la
          imagen, en flujo normal (nunca se superponen a ningún banner,
          sin importar su composición). Desde md vuelven a ser overlay
          absoluto sobre la imagen (posicionado contra la <section>, que
          es "relative" y envuelve tanto la caja de imagen como este
          bloque) — comportamiento idéntico al original pre-Ronda 114. */}
      <div className="relative flex flex-col items-center gap-1.5 bg-barcel-black px-3 py-3 xs:gap-2 sm:gap-3 sm:px-4 sm:py-4 md:absolute md:inset-x-0 md:bottom-0 md:gap-4 md:bg-transparent md:px-0 md:py-0 md:pb-6 lg:pb-8">
        <a
          href={slide.cta.href}
          // Ronda 103: Golácticos es una promo con landing propia fuera
          // del sitio (golacticosbarcel.com) — se abre en pestaña nueva
          // para no sacar al usuario de la navegación del home.
          {...(slide.cta.href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          // Ronda 121: borde 1:1 con Figma (node "Botón Blanco", 1:3158) —
          // border-2 border-grey-300 (#b0b0b0), inside (box-sizing:border-box
          // por defecto en Tailwind, no suma al tamaño de la caja). Figma no
          // trae shadow-md en este botón, así que se quita — el borde es la
          // única separación visual contra el banner.
          className={`flex min-h-[44px] items-center justify-center gap-1 border-2 border-grey-300 bg-white px-4 py-2 text-center font-display text-[11px] font-extrabold uppercase tracking-wide transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-black active:scale-95 xs:px-5 xs:text-xs sm:px-5 sm:py-3 md:px-7 md:text-base ${slide.cta.variant}`}
        >
          {slide.cta.label}
          <span aria-hidden>↗</span>
        </a>

        {/* dots — único elemento interactivo con corner radius (1:1 con el diseño) */}
        <div className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 shadow-sm xs:gap-2 xs:px-3 xs:py-2 sm:rounded-xl sm:px-4 sm:py-3 md:gap-2.5 md:rounded-2xl md:px-5 md:py-4">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Ir al slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 md:h-2.5 ${
                i === index
                  ? "w-6 bg-barcel-red sm:w-8 md:w-10"
                  : "w-1.5 bg-grey-200 hover:bg-grey-300 sm:w-2 md:w-2.5"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
