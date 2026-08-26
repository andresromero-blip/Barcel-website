"use client";

import { useState } from "react";

// Mismo mecanismo grid-rows-[0fr]→[1fr] que el acordeón de Marcas del
// menú mobile del Header — reutilizado aquí para no introducir un
// segundo patrón de acordeón en el sitio.
//
// Ronda 78: el cliente marcó que el desplegable quedó "demasiado
// grande" dentro de la tarjeta combinada de TakisProductDetail.tsx
// (Ronda 77). Se agrega la variante `compact` (padding, tipografía e
// ícono más chicos) en vez de reducir los valores por default, porque
// este mismo componente también vive en ProductDetail.tsx para las
// otras 5 marcas, donde el tamaño actual no fue objetado — cambiar el
// default ahí habría sido un efecto colateral no pedido.
export default function Accordion({
  title,
  children,
  defaultOpen = false,
  compact = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`w-full border-barcel-black/10 ${compact ? "border" : "border-2"}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={
          compact
            ? "flex w-full items-center justify-between gap-3 p-3 text-left font-display text-sm font-bold text-barcel-black md:p-4 md:text-base"
            : "flex w-full items-center justify-between gap-4 p-5 text-left font-display text-base font-bold text-barcel-black md:p-6 md:text-lg"
        }
      >
        {title}
        <span
          className={`relative shrink-0 ${compact ? "h-4 w-4" : "h-6 w-6"}`}
          aria-hidden="true"
        >
          <span
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-barcel-black ${
              compact ? "h-0.5 w-3" : "h-0.5 w-4"
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-barcel-black transition-opacity duration-200 ${
              compact ? "h-3 w-0.5" : "h-4 w-0.5"
            } ${open ? "opacity-0" : "opacity-100"}`}
          />
        </span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div
            className={
              compact
                ? "px-3 pb-3 font-body text-xs leading-relaxed text-barcel-black/70 md:px-4 md:pb-4 md:text-sm"
                : "px-5 pb-5 font-body text-sm leading-relaxed text-barcel-black/70 md:px-6 md:pb-6"
            }
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
