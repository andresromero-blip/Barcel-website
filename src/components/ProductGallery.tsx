"use client";

import { useState } from "react";

// Solo se muestran thumbnails reales (bolsa + producto suelto, cuando
// existe ese segundo asset) — nunca duplicados/inventados nada más para
// llenar espacio. Con 1 sola imagen no hay fila de thumbnails.
export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-[420px] items-center justify-center bg-barcel-cream sm:h-[480px] md:h-[560px]">
        {main && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={main} alt={alt} className="h-[85%] w-auto object-contain drop-shadow-xl" />
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1} de ${images.length}`}
              aria-pressed={active === i}
              className={`flex h-20 w-20 shrink-0 items-center justify-center bg-barcel-cream transition-shadow sm:h-24 sm:w-24 ${
                active === i ? "ring-2 ring-barcel-black" : "ring-1 ring-barcel-black/10"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" aria-hidden="true" className="h-[80%] w-auto object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
