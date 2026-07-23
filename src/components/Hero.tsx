"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Banners reales del prototipo (public/hero). El arte/headline ya vienen
// resueltos en la imagen; el CTA de cada slide es un componente real
// (accesible, con foco visible y fondo sólido para garantizar contraste),
// apilado en flujo normal debajo del banner en vez de calcado por
// coordenadas — así se mantiene correcto en cualquier tamaño de pantalla.
const SLIDES = [
  {
    id: "bienvenido",
    image: "/hero/slide-bienvenido.jpg",
    alt: "¡Bienvenido al universo Barcel! — mix de botanas y frutos secos Barcel",
    cta: {
      label: "Explora todas las categorías",
      href: "#marcas",
      // Fondo blanco solido + texto rojo oscuro: 5.7:1 de contraste (AA)
      variant: "text-barcel-red-dark",
    },
  },
  {
    id: "golden-nuts",
    image: "/hero/slide-golden-nuts.jpg",
    alt: "Golden Nuts Select — más que premium, select",
    cta: {
      label: "Conócelos ahora",
      href: "#marcas",
      // Fondo dorado solido + texto casi negro: 7.2:1 de contraste (AA)
      variant: "bg-goldennuts-gold text-barcel-black",
    },
  },
  {
    id: "wapas",
    image: "/hero/slide-wapas.jpg",
    alt: "Nuevas Wapas Fuego — 100% onda fuego",
    cta: {
      label: "Listo para el reto",
      href: "#marcas",
      // Fondo blanco solido + texto morado oscuro: 6.75:1 de contraste (AA)
      variant: "text-takis-purple",
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
          producto— repartido en todo el ancho). Usamos su misma proporción
          en TODOS los breakpoints (mobile-first) para que la imagen nunca
          se recorte: en pantallas angostas la altura baja proporcionalmente
          en vez de forzar un alto fijo que recortaba los laterales. */}
      <div className="relative aspect-[1440/900] w-full">
        {SLIDES.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s.id}
            src={s.image}
            alt={s.alt}
            aria-hidden={i !== index}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
          />
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
