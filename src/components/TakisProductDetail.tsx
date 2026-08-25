import Link from "next/link";
import type { Brand, Flavor } from "@/data/brands";
import Accordion from "./Accordion";
import SizePicker from "./SizePicker";
import Picometro from "./Picometro";
import WhereToBuyModal from "./WhereToBuyModal";
import RelatedProductsSlider from "./RelatedProductsSlider";

// Ronda 64: el cliente marcó que Ronda 62/63 seguían sin aplicar la
// estructura que compartió (referencia de Chip's Fuego) y mandó, además,
// los assets oficiales que faltaban para construirla de verdad:
// - carpeta "NOMBRES PNG": el manchón amarillo con el nombre de cada
//   sabor ya recortado (reemplaza el intento anterior de recrearlo con
//   TakisTape.tsx + font-takisMark — "utiliza los nombres que te
//   compartí en la carpeta (PNG), estos están mal").
// - bg.jpg: la textura morada oficial para el fondo de esta sección
//   (reemplaza el bg-barcel-cream plano de Ronda 63 — "te comparto el
//   Background para reemplazar ese color crema plano que le pusiste").
// Estructura 1:1 con la referencia: breadcrumb sobre el fondo de color,
// tres columnas (Sellos + Ingredientes / producto / nombre + descripción
// + picómetro), Presentación centrada abajo, y una flecha grande a cada
// lado de la sección para saltar al sabor anterior/siguiente (NO son
// flechas de presentación — ese fue el error de Ronda 63, ya revertido
// en SizePicker.tsx). Componente separado (no una rama más dentro de
// ProductDetail.tsx) porque esta estructura de 3 columnas con fondo de
// marca no tiene nada en común con el layout de galería+specs que usan
// las otras 5 marcas — evita repetir el error de Ronda 54 de forzar todo
// dentro de un solo componente con ramas cada vez más enredadas.
export default function TakisProductDetail({
  brand,
  flavor,
  related,
}: {
  brand: Brand;
  flavor: Flavor;
  related: Flavor[];
}) {
  const fullName = `${brand.name} ${flavor.name}`;
  const galleryFlavors = (brand.flavors ?? []).filter((f) => f.slug);
  const currentIndex = galleryFlavors.findIndex((f) => f.slug === flavor.slug);
  const prevFlavor =
    galleryFlavors[(currentIndex - 1 + galleryFlavors.length) % galleryFlavors.length];
  const nextFlavor = galleryFlavors[(currentIndex + 1) % galleryFlavors.length];

  return (
    <>
      <section
        className="relative bg-barcel-black bg-cover bg-center"
        style={{ backgroundImage: "url(/products/takis/bg.jpg)" }}
      >
        <nav
          aria-label="Ruta de navegación"
          className="container-page relative z-10 flex flex-wrap items-center gap-1.5 pb-2 pt-8 font-body text-xs text-white/85 md:text-sm"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Inicio
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/marcas/${brand.slug}`}
            className="transition-colors hover:text-white"
          >
            {brand.name}
            <sup className="text-[0.7em]">®</sup>
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-white">{fullName}</span>
        </nav>

        {/* Ronda 64: navegación entre sabores (no entre presentaciones,
            ver nota arriba) — oculta en mobile para no competir por
            espacio con las 3 columnas apiladas; en mobile el usuario
            vuelve al hub para cambiar de sabor, igual que antes. */}
        {galleryFlavors.length > 1 && (
          <>
            <Link
              href={`/marcas/takis/${prevFlavor.slug}`}
              aria-label={`Ver ${brand.name} ${prevFlavor.name}`}
              className="absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center bg-white font-display text-xl font-bold text-barcel-black shadow-lg transition-transform hover:scale-105 sm:flex md:left-6"
            >
              <span aria-hidden="true">←</span>
            </Link>
            <Link
              href={`/marcas/takis/${nextFlavor.slug}`}
              aria-label={`Ver ${brand.name} ${nextFlavor.name}`}
              className="absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center bg-white font-display text-xl font-bold text-barcel-black shadow-lg transition-transform hover:scale-105 sm:flex md:right-6"
            >
              <span aria-hidden="true">→</span>
            </Link>
          </>
        )}

        <div className="container-page relative z-10 grid gap-8 pb-12 pt-6 md:grid-cols-[1fr_1.15fr_1fr] md:items-center md:gap-6 md:pb-16">
          <div className="order-3 flex flex-col gap-3 md:order-1">
            <Accordion title="Sellos" defaultOpen>
              {flavor.nutrition ? (
                <div className="flex flex-col gap-2">
                  <p className="mb-1 text-xs uppercase tracking-wide text-barcel-black/50">
                    Información por cada 100 g
                  </p>
                  <div className="flex flex-col divide-y divide-barcel-black/10">
                    {[
                      ["Calorías", `${flavor.nutrition.kcal100g} kcal`],
                      ["Azúcar", `${flavor.nutrition.azucares100g}%`],
                      ["Grasas saturadas", `${flavor.nutrition.grasasSat100g}%`],
                      [
                        "Grasas trans",
                        `${(flavor.nutrition.grasasTrans100gMg / 1000).toFixed(1)}%`,
                      ],
                      ["Sodio", `${flavor.nutrition.sodio100gMg} mg`],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between py-2">
                        <span className="text-barcel-black/70">{label}</span>
                        <span className="font-display font-bold text-barcel-black">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  Contenido de ejemplo — pendiente de recibir los sellos oficiales de{" "}
                  {fullName}® para reemplazar este texto.
                </>
              )}
            </Accordion>
            <Accordion title="Ingredientes">
              {flavor.ingredients ? (
                <div className="flex flex-col gap-3">
                  <p className="uppercase">{flavor.ingredients}</p>
                  {flavor.allergens && <p className="font-bold">{flavor.allergens}</p>}
                </div>
              ) : (
                <>
                  Contenido de ejemplo — pendiente de recibir la lista de ingredientes
                  oficial de {fullName}® para reemplazar este texto.
                </>
              )}
            </Accordion>
          </div>

          <div className="order-1 flex justify-center md:order-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flavor.image}
              alt={`${fullName}®`}
              className="h-auto w-full max-w-[220px] drop-shadow-2xl sm:max-w-xs md:max-w-sm"
            />
          </div>

          <div className="order-2 flex flex-col items-start gap-4 bg-white/95 p-6 md:order-3 md:p-8">
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-takis-purple">
              {brand.name}
            </p>
            {flavor.nameImage ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={flavor.nameImage}
                alt={fullName}
                className="h-auto w-full max-w-[240px]"
              />
            ) : (
              <h1 className="font-teko text-6xl font-bold uppercase leading-[0.9] text-barcel-black">
                {fullName}
              </h1>
            )}
            {(flavor.description ?? brand.description) && (
              <p className="font-takisBody text-base leading-relaxed text-barcel-black/70">
                {flavor.description ?? brand.description}
              </p>
            )}
            {flavor.spiceLevel && (
              <div className="w-full border-t border-black/10 pt-4">
                <Picometro level={flavor.spiceLevel} />
                {!flavor.spiceLevelConfirmed && (
                  <p className="mt-3 font-body text-xs text-barcel-black/70">
                    * Nivel de picante estimado — pendiente de confirmar con Barcel
                    (sin equivalente en el Takis Global Brandbook 2025).
                  </p>
                )}
              </div>
            )}
            <WhereToBuyModal />
          </div>
        </div>

        {flavor.sizes && flavor.sizes.length > 0 && (
          <div className="container-page relative z-10 flex flex-col items-center gap-2.5 pb-12 md:flex-row md:justify-center md:pb-16">
            <p className="font-display text-sm font-bold text-white">Presentación:</p>
            <SizePicker sizes={flavor.sizes} />
            {!flavor.nutrition && (
              <p className="font-body text-xs text-white/70">
                * Presentaciones de ejemplo — pendientes de confirmar con Barcel.
              </p>
            )}
          </div>
        )}
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
