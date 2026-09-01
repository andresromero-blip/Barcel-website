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
      {/* Los banners son composiciones anchas (1440x900, contenido —texto y
          producto— repartido en todo el ancho). El cliente no puede
          reeditar/recortar estos assets, así que el ajuste tiene que
          resolverse solo con CSS, sobre las imágenes tal cual están.
          Ronda 104: aspect-[1440/900] a ancho completo daba una altura
          MAYOR que el viewport en pantallas anchas y bajas, empujando el
          CTA y los dots fuera de la primera vista.
          Ronda 105 (revertida): limitar solo `max-h` obligaba al
          object-cover a recortar arriba/abajo de la imagen (se probó
          mover el punto de recorte con `object-top`, solo trasladó el
          corte de arriba a abajo).
          Ronda 106 (revertida): limitar también el ancho para mantener
          la proporción 1440:900 exacta evitaba el recorte, pero dejaba
          franjas negras a los lados en pantallas anchas y bajas — el
          cliente lo reportó como "se corta en los laterales" (visualmente
          se siente igual de mal que un recorte real).
          Ronda 107 (fix real, con los assets fijos): fondo desenfocado +
          imagen real completa, técnica estándar de Spotify/YouTube para
          encajar una imagen con una proporción distinta a su contenedor
          SIN recortarla y SIN dejar franjas vacías. Dos capas por slide:
          1) una copia de la misma foto, agrandada (`scale-110`) y
          desenfocada (`blur-2xl`), en object-cover — rellena todo el
          contenedor de borde a borde, incluida el área que sobra a los
          lados cuando el contenedor es más ancho que la proporción
          1440:900 del banner. 2) la imagen real completa, en
          object-contain — se ve 100% de la pieza, sin recortar nada,
          "flotando" centrada sobre el fondo desenfocado. Resultado: nunca
          se pierde contenido Y nunca se ven franjas vacías, siempre
          "encaja perfecto" visualmente aunque el aspect ratio del
          contenedor no coincida con el de la imagen. */}
      <div className="relative aspect-[1440/900] max-h-[calc(100vh-4rem)] min-h-[280px] w-full md:max-h-[calc(100vh-5rem)]">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Capa 1: fondo — misma foto, agrandada y desenfocada, sin
                huecos vacíos ni bordes duros del blur (scale-110 los saca
                del área visible; overflow-hidden de la <section> recorta
                el resto). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-cover object-center blur-2xl brightness-75"
              loading={i === 0 ? "eager" : "lazy"}
            />
            {/* Capa 2: la pieza real, completa, sin recortar nada. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt={s.alt}
              className="absolute inset-0 h-full w-full object-contain"
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
          className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:left-4 md:flex md:h-11 md:w-11"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={next}
          className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-4 md:flex md:h-11 md:w-11"
        >
          ›
        </button>

        {/* CTA + dots apilados en flujo normal — al conservar la proporción
            real de la imagen (arriba) siempre quedan sobre la franja
            inferior de la composición, sin taparse ni deformarse en
            ningún ancho de pantalla. Tamaños reducidos en el breakpoint
            base (mobile) porque ahí el banner es más bajo en términos
            absolutos. */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1.5 px-3 pb-2 xs:gap-2 xs:pb-3 sm:gap-3 sm:px-4 sm:pb-4 md:gap-4 md:pb-6 lg:pb-8">
          <a
            href={slide.cta.href}
            // Ronda 103: Golácticos es una promo con landing propia fuera
            // del sitio (golacticosbarcel.com) — se abre en pestaña nueva
            // para no sacar al usuario de la navegación del home.
            {...(slide.cta.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={`flex min-h-[44px] items-center justify-center gap-1 bg-white px-4 py-2 text-center font-display text-[11px] font-extrabold uppercase tracking-wide shadow-md transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-black active:scale-95 xs:px-5 xs:text-xs sm:px-5 sm:py-3 md:px-7 md:text-base ${slide.cta.variant}`}
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
      </div>
    </section>
  );
}
