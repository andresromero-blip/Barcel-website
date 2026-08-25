"use client";

import { useState } from "react";

// Ronda 63: el cliente compartió una referencia (Chip's Fuego) donde el
// selector de "Presentación" trae flechas prev/next además de las
// pastillas — útil cuando hay más de 2-3 tamaños (algunos sabores de
// Takis ya traen 3 presentaciones reales, ver brands.ts). Las flechas
// mueven el mismo estado `active` que las pastillas (una sola fuente de
// verdad), se deshabilitan en los extremos y no se muestran si solo hay
// un tamaño.
export default function SizePicker({ sizes }: { sizes: string[] }) {
  const [active, setActive] = useState(0);

  const goPrev = () => setActive((i) => Math.max(0, i - 1));
  const goNext = () => setActive((i) => Math.min(sizes.length - 1, i + 1));

  return (
    <div className="flex items-center gap-2.5" role="group" aria-label="Presentaciones">
      {sizes.length > 1 && (
        <button
          type="button"
          onClick={goPrev}
          disabled={active === 0}
          aria-label="Presentación anterior"
          className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-barcel-black/15 text-barcel-black transition-colors hover:border-barcel-black/40 disabled:opacity-30 disabled:hover:border-barcel-black/15"
        >
          <span aria-hidden="true">←</span>
        </button>
      )}

      <div className="flex flex-wrap gap-2.5">
        {sizes.map((size, i) => (
          <button
            key={size}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`min-h-[44px] border-2 px-5 py-2.5 font-display text-sm font-bold transition-colors ${
              active === i
                ? "border-barcel-black bg-barcel-black text-white"
                : "border-barcel-black/15 bg-white text-barcel-black hover:border-barcel-black/40"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {sizes.length > 1 && (
        <button
          type="button"
          onClick={goNext}
          disabled={active === sizes.length - 1}
          aria-label="Siguiente presentación"
          className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-barcel-black/15 text-barcel-black transition-colors hover:border-barcel-black/40 disabled:opacity-30 disabled:hover:border-barcel-black/15"
        >
          <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  );
}
