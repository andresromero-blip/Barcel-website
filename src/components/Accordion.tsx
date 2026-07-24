"use client";

import { useState } from "react";

// Mismo mecanismo grid-rows-[0fr]→[1fr] que el acordeón de Marcas del
// menú mobile del Header — reutilizado aquí para no introducir un
// segundo patrón de acordeón en el sitio.
export default function Accordion({
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
    <div className="w-full border-2 border-barcel-black/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-5 text-left font-display text-base font-bold text-barcel-black md:p-6 md:text-lg"
      >
        {title}
        <span className="relative h-6 w-6 shrink-0" aria-hidden="true">
          <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 bg-barcel-black" />
          <span
            className={`absolute left-1/2 top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-barcel-black transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div className="px-5 pb-5 font-body text-sm leading-relaxed text-barcel-black/70 md:px-6 md:pb-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
