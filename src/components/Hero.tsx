"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Banners 1:1 desde Figma (public/hero). El texto/arte ya viene resuelto en la
// imagen; el CTA de cada slide se renderiza aparte como componente real
// (clickeable, accesible, con estados hover/focus) posicionado sobre el
// banner en vez de venir "quemado" en el jpg.
const SLIDES = [
  {
    id: "bienvenido",
    image: "/hero/slide-bienvenido.jpg",
    alt: "¡Bienvenido al universo Barcel! — mix de botanas y frutos secos Barcel",
    cta: {
      label: "Explora todas las categorías",
      href: "#marcas",
      variant: "outline-light" as const,
      // posición del botón como % del banner (1440x900), medida sobre el diseño
      box: { left: 36.5, top: 76.5, width: 27, height: 8.2 },
    },
  },
  {
    id: "golden-nuts",
    image: "/hero/slide-golden-nuts.jpg",
    alt: "Golden Nuts Select — más que premium, select",
    cta: {
      label: "Conócelos ahora",
      href: "#marcas",
      variant: "solid-gold" as const,
      box: { left: 40.5, top: 76.5, width: 19, height: 8.2 },
    },
  },
  {
    id: "wapas",
    image: "/hero/slide-wapas.jpg",
    alt: "Nuevas Wapas Fuego — 100% onda fuego",
    cta: {
      label: "Listo para el reto",
      href: "#marcas",
      variant: "outline-purple" as const,
      box: { left: 40.8, top: 76.3, width: 18.5, height: 8.4 },
    },
  },
];

const CTA_VARIANTS = {
  "outline-light":
    "border-2 border-white text-white hover:bg-white hover:text-barcel-red focus-visible:bg-white focus-visible:text-barcel-red",
  "solid-gold":
    "border-2 border-goldennuts-gold bg-goldennuts-gold text-barcel-black hover:brightness-110 focus-visible:brightness-110",
  "outline-purple":
    "border-2 border-takis-purple text-white hover:bg-takis-purple/90 focus-visible:bg-takis-purple/90",
};

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

  return (
    <section
      className="relative overflow-hidden bg-barcel-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* aspect-ratio fijo (1440x900) para que el botón overlay quede siempre
          alineado con el banner, en cualquier viewport */}
      <div className="relative aspect-[1440/900] w-full">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />

            {/* CTA real como componente, posicionado sobre el banner */}
            <a
              href={slide.cta.href}
              tabIndex={i === index ? 0 : -1}
              className={`absolute flex items-center justify-center gap-1.5 font-display text-[clamp(0.6rem,1.4vw,0.95rem)] font-extrabold uppercase tracking-wide transition-all duration-200 active:scale-95 ${
                CTA_VARIANTS[slide.cta.variant]
              }`}
              style={{
                left: `${slide.cta.box.left}%`,
                top: `${slide.cta.box.top}%`,
                width: `${slide.cta.box.width}%`,
                height: `${slide.cta.box.height}%`,
              }}
            >
              {slide.cta.label}
              <span aria-hidden>↗</span>
            </a>
          </div>
        ))}

        {/* arrow nav */}
        <button
          type="button"
          aria-label="Anterior"
          onClick={prev}
          className="absolute left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/35 md:flex md:h-11 md:w-11"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={next}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/35 md:h-11 md:w-11"
        >
          ›
        </button>

        {/* dots — único elemento interactivo con corner radius (1:1 con el diseño) */}
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center md:bottom-6">
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm md:gap-2.5 md:rounded-2xl md:px-5 md:py-4">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Ir al slide ${i + 1}`}
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
