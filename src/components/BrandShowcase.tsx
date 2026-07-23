"use client";

import { useState } from "react";
import type { Brand } from "@/data/brands";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-barcel-black/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left font-display text-sm font-bold uppercase tracking-wide text-barcel-black"
      >
        {title}
        <ChevronIcon open={open} />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">{children}</div>
      </div>
    </div>
  );
}

export default function BrandShowcase({
  brand,
  index,
  dimmed,
  highlighted,
}: {
  brand: Brand;
  index: number;
  dimmed: boolean;
  highlighted: boolean;
}) {
  const heroSrc = brand.heroImage ?? brand.logoHover ?? brand.logo;
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <section
      id={brand.slug}
      className={`relative overflow-hidden transition-all duration-500 ${brand.bg} ${
        dimmed ? "opacity-30 saturate-50" : "opacity-100"
      }`}
    >
      {/* Wordmark gigante de fondo — puramente decorativo/textura, no
          compite con el contenido legible (que vive en la tarjeta blanca). */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-1/2 w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-teko text-[22vw] font-bold uppercase leading-none text-white/15 md:-bottom-10"
      >
        {brand.name}
      </span>

      <div className="container-page relative grid gap-8 py-14 md:min-h-[560px] md:grid-cols-2 md:items-center md:gap-12 md:py-20">
        {/* Tarjeta blanca — todo el texto legible vive aquí, así el
            contraste es siempre AA sin importar el color de la marca. */}
        <div
          className={`relative bg-white p-7 shadow-xl md:p-10 ${
            brand.imageFirst ? "md:order-2" : "md:order-1"
          } ${highlighted ? "ring-4 ring-barcel-black" : ""}`}
        >
          <span className="mb-4 inline-flex h-8 w-8 items-center justify-center bg-barcel-black font-display text-xs font-bold text-white">
            {indexLabel}
          </span>
          <h2 className="font-display text-3xl font-black text-barcel-black md:text-4xl">
            {brand.name}
            <sup className="ml-1 text-[0.4em]">®</sup>
          </h2>
          <p className={`mt-2 font-display text-sm font-bold md:text-base ${brand.textOnBg}`}>
            {brand.tagline}
          </p>
          <p className="mt-4 font-body text-sm leading-relaxed text-barcel-black/70">
            {brand.description}
          </p>

          <div className="mt-6">
            {brand.flavors && brand.flavors.length > 0 && (
              <AccordionItem title={`Presentaciones (${brand.flavors.length})`} defaultOpen>
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-4">
                  {brand.flavors.map((flavor) => (
                    <div key={flavor.name} className="flex flex-col items-center gap-1.5 text-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={flavor.image}
                        alt={`Takis® ${flavor.name}`}
                        className="h-16 w-auto object-contain sm:h-20"
                      />
                      <span className="font-display text-[10px] font-bold uppercase leading-tight text-barcel-black/70">
                        {flavor.name}
                      </span>
                    </div>
                  ))}
                </div>
              </AccordionItem>
            )}
            <AccordionItem title="Dónde encontrarla">
              <p className="font-body text-sm leading-relaxed text-barcel-black/70">
                Disponible en tiendas de conveniencia, supermercados y
                autoservicios a nivel nacional.
              </p>
            </AccordionItem>
          </div>
        </div>

        {/* Producto flotando sobre el color de marca */}
        <div
          className={`relative flex items-center justify-center py-6 md:py-0 ${
            brand.imageFirst ? "md:order-1" : "md:order-2"
          }`}
        >
          {heroSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroSrc}
              alt={`${brand.name}®`}
              className="h-56 w-auto max-w-[75%] object-contain drop-shadow-2xl sm:h-72 md:h-[26rem]"
            />
          )}
        </div>
      </div>
    </section>
  );
}
