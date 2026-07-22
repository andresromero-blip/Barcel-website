"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    eyebrow: "Universo Barcel",
    title: "¡Bienvenido al universo Barcel!",
    copy: "Antojos con actitud: descubre todas nuestras marcas en un solo lugar.",
    cta: "Explora todas las categorías",
    ctaHref: "#marcas",
    shape: "bg-barcel-red",
  },
  {
    eyebrow: "Nuevo lanzamiento",
    title: "Hot Nuts® ya está aquí",
    copy: "El picante que engancha llegó para quedarse. Pruébalo antes que nadie.",
    cta: "Conoce Hot Nuts®",
    ctaHref: "#marcas",
    shape: "bg-hotnuts-orange",
  },
  {
    eyebrow: "Promoción activa",
    title: "Suma papas, gana premios",
    copy: "Participa con tus empaques Barcel y llévate stickers coleccionables.",
    cta: "Ver novedades",
    ctaHref: "#novedades",
    shape: "bg-takis-purple",
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
      <div
        className={`diagonal-clip relative min-h-[560px] w-full transition-colors duration-700 md:min-h-[640px] ${slide.shape}`}
      >
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

        <div className="container-page relative flex h-full flex-col items-center justify-center gap-8 py-20 text-center md:py-28">
          <span className="rounded-full bg-white/15 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
            {slide.eyebrow}
          </span>

          <h1 className="max-w-3xl font-display text-4xl font-extrabold uppercase leading-[1.05] text-white sm:text-5xl md:text-6xl">
            {slide.title}
          </h1>

          <p className="max-w-lg font-body text-base text-white/90 md:text-lg">
            {slide.copy}
          </p>

          {/* product image placeholders */}
          <div className="flex items-end justify-center gap-4 py-2 md:gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`flex items-center justify-center rounded-[2rem] border-2 border-dashed border-white/40 bg-white/10 font-display text-[10px] font-semibold uppercase tracking-wide text-white/70 backdrop-blur-sm transition-transform duration-500 hover:-translate-y-2 ${
                  i === 1 ? "h-32 w-24 md:h-40 md:w-32" : "h-24 w-20 md:h-32 md:w-28"
                }`}
              >
                producto
              </div>
            ))}
          </div>

          <a
            href={slide.ctaHref}
            className="rounded-full bg-white px-7 py-3.5 font-display text-sm font-extrabold uppercase tracking-wide text-barcel-red shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            {slide.cta} ↗
          </a>
        </div>

        {/* arrow nav */}
        <button
          type="button"
          aria-label="Anterior"
          onClick={prev}
          className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/35 md:flex"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={next}
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/35"
        >
          ›
        </button>
      </div>

      {/* dots */}
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
