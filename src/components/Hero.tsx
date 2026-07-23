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
      {/* Alturas fijas por breakpoint (no aspect-ratio) para que el banner
          nunca se deforme ni el contenido se desborde en mobile. */}
      <div className="relative h-[420px] w-full sm:h-[480px] md:h-[560px] lg:h-[640px] xl:h-[700px]">
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

        {/* arrow nav */}
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
          className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-4 md:h-11 md:w-11"
        >
          ›
        </button>

        {/* CTA + dots apilados en flujo normal — nunca se solapan ni se
            deforman, sin importar el tamaño de pantalla. */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-4 pb-4 sm:gap-4 sm:pb-6 md:pb-8">
          <a
            href={slide.cta.href}
            className={`flex min-h-[44px] items-center justify-center gap-1.5 bg-white px-5 py-3 text-center font-display text-xs font-extrabold uppercase tracking-wide shadow-md transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-black active:scale-95 sm:text-sm md:px-7 md:text-base ${slide.cta.variant}`}
          >
            {slide.cta.label}
            <span aria-hidden>↗</span>
          </a>

          {/* dots — único elemento interactivo con corner radius (1:1 con el diseño) */}
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm md:gap-2.5 md:rounded-2xl md:px-5 md:py-4">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Ir al slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 md:h-2.5 ${
                  i === index
                    ? "w-8 bg-barcel-red md:w-10"
                    : "w-2 bg-grey-200 hover:bg-grey-300 md:w-2.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
