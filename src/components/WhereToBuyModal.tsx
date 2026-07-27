"use client";

import { useEffect, useState } from "react";

// Ronda 30: "¿Dónde comprar?" pasa de ser un link-ancla a "Dónde
// encontrarla" (sección eliminada de la página de marca, quedaba
// duplicada) a un modal con tiendas reales y cross-link a su sitio
// oficial. Ejemplo con 3 cadenas con presencia real en México.
//
// Nota sobre los logos: no existe ningún asset de estas 3 tiendas en
// el material compartido del proyecto, y no corresponde descargar/usar
// los logos oficiales de terceros sin permiso — se usa en su lugar un
// wordmark de texto con el color de marca real de cada tienda. Fácil
// de reemplazar por el logo oficial en cuanto Barcel confirme el
// acuerdo con cada retailer.
const RETAILERS = [
  { name: "Walmart", href: "https://www.walmart.com.mx/", color: "#0071CE" },
  { name: "Costco", href: "https://www.costco.com.mx/", color: "#E31837" },
  { name: "OXXO", href: "https://www.oxxo.com/", color: "#DA291C" },
];

export default function WhereToBuyModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2 inline-flex min-h-[44px] items-center gap-2 bg-barcel-red px-6 py-3.5 font-display text-sm font-extrabold uppercase tracking-wide text-white transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-red active:scale-95"
      >
        ¿Dónde comprar?
        <span aria-hidden="true">→</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Dónde comprar"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-barcel-black/5 text-barcel-black transition-colors hover:bg-barcel-black/10"
            >
              ✕
            </button>

            <h3 className="font-teko text-3xl font-bold uppercase text-barcel-black">
              ¿Dónde comprar?
            </h3>
            <p className="mt-1 font-body text-sm text-barcel-black/60">
              Encuéntralo en estas tiendas con presencia en México.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {RETAILERS.map((retailer) => (
                <a
                  key={retailer.name}
                  href={retailer.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border-2 border-barcel-black/10 px-5 py-4 transition-colors hover:border-barcel-black/30"
                >
                  <span
                    className="font-display text-lg font-extrabold uppercase tracking-wide"
                    style={{ color: retailer.color }}
                  >
                    {retailer.name}
                  </span>
                  {/* Ronda 35: /40 sobre blanco da 2.65:1, por debajo del
                      3:1 mínimo para elementos gráficos (WCAG 1.4.11).
                      /60 (5.0:1+, igual que el párrafo de arriba) sí pasa. */}
                  <span aria-hidden="true" className="text-barcel-black/60">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
