"use client";

import { useState } from "react";

export default function SizePicker({ sizes }: { sizes: string[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-wrap gap-2.5" role="group" aria-label="Presentaciones">
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
  );
}
