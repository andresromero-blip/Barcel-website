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
          problema en desktop). */}
      <div className="relative aspect-[4/3] max-h-[85vh] min-h-[200px] w-full sm:aspect-[3/2] md:aspect-[2048/768]">
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
    </section>
  );
}
