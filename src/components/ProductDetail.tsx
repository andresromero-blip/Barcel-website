import Link from "next/link";
import type { Brand, Flavor } from "@/data/brands";
import ProductGallery from "./ProductGallery";
import SizePicker from "./SizePicker";
import Accordion from "./Accordion";
import RelatedProductsSlider from "./RelatedProductsSlider";
import WhereToBuyModal from "./WhereToBuyModal";

// Página de detalle de producto — 1:1 con el wireframe de Figma
// (node 107:2838), adaptado a los tokens/patrones ya establecidos en
// el sitio (fuentes, colores de marca, sin corner-radius en CTAs,
// mismo mecanismo de acordeón que el menú Marcas del Header).
//
// Ingredientes / Información nutrimental: el wireframe los pide, pero
// ese contenido no existe todavía en ningún asset del proyecto —por
// indicación del cliente se deja como placeholder MARCADO (no se
// inventan cifras/listas reales) hasta recibir el copy oficial de
// Barcel.
export default function ProductDetail({
  brand,
  flavor,
  related,
}: {
  brand: Brand;
  flavor: Flavor;
  related: Flavor[];
}) {
  const galleryImages = [flavor.image, flavor.hoverImage].filter(
    (src): src is string => Boolean(src)
  );
  const fullName = `${brand.name} ${flavor.name}`;

  return (
    <>
      <nav
        aria-label="Ruta de navegación"
        className="container-page flex flex-wrap items-center gap-1.5 pb-2 pt-8 font-body text-xs text-barcel-black/50 md:text-sm"
      >
        <Link href="/" className="transition-colors hover:text-barcel-black">
          Inicio
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href={`/marcas/${brand.slug}`}
          className="transition-colors hover:text-barcel-black"
        >
          {brand.name}
          <sup className="text-[0.7em]">®</sup>
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-barcel-black">{fullName}</span>
      </nav>

      <section className="container-page grid gap-10 pb-16 pt-6 md:grid-cols-2 md:gap-16 md:pb-24">
        <ProductGallery images={galleryImages} alt={`${fullName}®`} />

        <div className="flex flex-col items-start gap-4">
          <p
            className={`font-display text-sm font-bold uppercase tracking-[0.2em] ${brand.textOnBg}`}
          >
            {brand.name}
          </p>
          <h1 className="font-teko text-6xl font-bold uppercase leading-[0.9] text-barcel-black sm:text-7xl md:text-8xl">
            {fullName}
          </h1>
          {(flavor.description ?? brand.description) && (
            <p className="max-w-md font-body text-base leading-relaxed text-barcel-black/70">
              {flavor.description ?? brand.description}
            </p>
          )}

          {flavor.sizes && flavor.sizes.length > 0 && (
            <div className="w-full">
              <p className="mb-2.5 font-display text-sm font-bold text-barcel-black">
                Presentaciones
              </p>
              <SizePicker sizes={flavor.sizes} />
              <p className="mt-2 font-body text-xs text-barcel-black/40">
                * Presentaciones de ejemplo — pendientes de confirmar con
                Barcel.
              </p>
            </div>
          )}

          <div className="mt-2 flex w-full flex-col gap-3">
            <Accordion title="Ingredientes">
              Contenido de ejemplo — pendiente de recibir la lista de
              ingredientes oficial de {fullName}® para reemplazar este
              texto.
            </Accordion>
            <Accordion title="Información nutrimental">
              Contenido de ejemplo — pendiente de recibir la tabla
              nutrimental oficial de {fullName}® para reemplazar este
              texto.
            </Accordion>
          </div>

          <WhereToBuyModal />
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-barcel-cream py-14 md:py-20">
          <div className="container-page">
            <h2 className="font-teko text-4xl font-bold uppercase text-barcel-black md:text-5xl">
              También te puede antojar
            </h2>
          </div>
          <div className="container-page mt-8">
            <RelatedProductsSlider brand={brand} items={related} />
          </div>
        </section>
      )}
    </>
  );
}
