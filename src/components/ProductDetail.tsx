import Link from "next/link";
import type { Brand, Flavor } from "@/data/brands";
import ProductGallery from "./ProductGallery";
import SizePicker from "./SizePicker";
import Accordion from "./Accordion";
import RelatedProductsSlider from "./RelatedProductsSlider";
import WhereToBuyModal from "./WhereToBuyModal";
import Picometro from "./Picometro";
import TakisTape from "./TakisTape";
import TakisHero from "./TakisHero";
import ProductSlider from "./ProductSlider";
import OtherBrandsGrid from "./OtherBrandsGrid";

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
//
// Ronda 54: el cliente mandó un mockup para esta página SOLO para
// Takis — layout completamente distinto (hero de marca + slider del
// portafolio con badge de Picómetro por tarjeta + "también te puede
// antojar" con las otras marcas) en vez de la galería + specs de dos
// columnas de abajo. Confirmado explícitamente por el cliente: para
// Takis esto REEMPLAZA tamaños/ingredientes/información nutrimental/
// "¿Dónde comprar?" (el mockup corregido, con Picómetro agregado, no
// los traía). Las otras 5 marcas no tienen mockup — se quedan con el
// layout de abajo sin tocar.
export default function ProductDetail({
  brand,
  flavor,
  related,
  otherBrands,
}: {
  brand: Brand;
  flavor: Flavor;
  related: Flavor[];
  otherBrands: Brand[];
}) {
  const galleryImages = [flavor.image, flavor.hoverImage].filter(
    (src): src is string => Boolean(src)
  );
  const fullName = `${brand.name} ${flavor.name}`;
  const isTakis = brand.slug === "takis";

  // Ronda 35: contraste AA. /50 sobre blanco da 3.59:1 — no pasa el
  // 4.5:1 que exige AA para texto normal. /70 (mismo valor que ya usa
  // la descripción de abajo, igual de "secundaria" en jerarquía) da
  // 7.0:1+, con margen de sobra. Se comparte entre las dos ramas —
  // el breadcrumb es igual para Takis y el resto de marcas, solo
  // cambia lo que va debajo.
  const breadcrumb = (
    <nav
      aria-label="Ruta de navegación"
      className="container-page flex flex-wrap items-center gap-1.5 pb-2 pt-8 font-body text-xs text-barcel-black/70 md:text-sm"
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
  );

  if (isTakis) {
    return (
      <>
        {breadcrumb}
        <TakisHero brand={brand} />

        <section className="bg-white py-16 md:py-20">
          <div className="container-page">
            <h2 className="font-teko text-3xl font-bold uppercase text-barcel-red md:text-4xl">
              Productos
            </h2>
            <p className="mt-2 max-w-xl font-body text-sm text-barcel-black/70 md:text-base">
              Pasa el cursor para pausar el carrusel y haz clic en tu sabor
              favorito para verlo de cerca.
            </p>
          </div>
          <div className="container-page mt-8">
            <ProductSlider
              brandName={brand.name}
              brandSlug={brand.slug}
              flavors={brand.flavors ?? []}
              hoverBg={brand.hoverBg}
              hoverText={brand.hoverText}
            />
          </div>
        </section>

        {/* Ronda 61: el cliente reportó que no podía "acceder a la
            información del producto" — con razón: Ronda 54 había
            quitado por completo tamaños/ingredientes/información
            nutrimental/"¿Dónde comprar?" para Takis (registrado en el
            comentario de arriba como confirmado por el cliente en su
            momento), dejando la página de cada sabor sin ningún dato
            propio del producto, solo el hero genérico de marca + el
            mismo slider. Se restaura aquí, mismo criterio/copy
            placeholder que las otras 5 marcas (ver rama de abajo),
            para el sabor actualmente activo ({fullName}). */}
        <section className="bg-barcel-cream py-14 md:py-20">
          <div className="container-page max-w-2xl">
            <h2 className="font-teko text-3xl font-bold uppercase text-barcel-black md:text-4xl">
              Información de {flavor.name}
            </h2>
            <p className="mt-2 font-takisBody text-sm text-barcel-black/70 md:text-base">
              Todo lo que necesitas saber sobre {fullName}®.
            </p>

            {flavor.sizes && flavor.sizes.length > 0 && (
              <div className="mt-6 w-full">
                <p className="mb-2.5 font-display text-sm font-bold text-barcel-black">
                  Presentaciones
                </p>
                <SizePicker sizes={flavor.sizes} />
                <p className="mt-2 font-body text-xs text-barcel-black/70">
                  * Presentaciones de ejemplo — pendientes de confirmar con
                  Barcel.
                </p>
              </div>
            )}

            <div className="mt-6 flex w-full flex-col gap-3">
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

            <div className="mt-6">
              <WhereToBuyModal />
            </div>
          </div>
        </section>

        {otherBrands.length > 0 && (
          <section className="bg-barcel-cream py-14 md:py-20">
            <OtherBrandsGrid
              brands={otherBrands}
              heading="También te puede antojar"
              subheading="Descubre el resto del portafolio Barcel."
            />
          </section>
        )}
      </>
    );
  }

  return (
    <>
      {breadcrumb}

      <section className="container-page grid gap-10 pb-16 pt-6 md:grid-cols-2 md:gap-16 md:pb-24">
        <ProductGallery images={galleryImages} alt={`${fullName}®`} />

        <div className="flex flex-col items-start gap-4">
          <p
            className={`font-display text-sm font-bold uppercase tracking-[0.2em] ${brand.textOnBg}`}
          >
            {brand.name}
          </p>
          {/* Ronda 44: nombre de sabor con font-takisMark (sustituto libre
              de la "TAKIS® Font" del brandbook — pág. 37, ese asset SÍ
              está pensado exactamente para nombrar variedades de producto)
              en vez de Teko, solo para Takis. Permanent Marker es de un
              solo peso (no hay bold real) — se quita font-bold para no
              forzar un bold sintético del navegador, y baja 1-2 escalones
              de tamaño porque el trazo es visualmente más pesado que Teko
              a igual tamaño de fuente.
              Ronda 45: el manual exige el nombre de sabor SIEMPRE dentro
              del manchón amarillo (TakisTape) — el H1 se divide en dos
              nodos (marca visualmente oculta porque ya la muestra el
              label de arriba + el sabor en la cinta) pero fullName se
              mantiene como texto accesible para lectores de pantalla. */}
          {brand.slug === "takis" ? (
            <h1 className="text-4xl uppercase leading-tight text-barcel-black sm:text-5xl md:text-6xl">
              <span className="sr-only">{fullName}</span>
              <TakisTape aria-hidden="true" className="px-4 py-1.5">
                <span className="font-takisMark">{flavor.name}</span>
              </TakisTape>
            </h1>
          ) : (
            <h1 className="font-teko text-6xl font-bold uppercase leading-[0.9] text-barcel-black sm:text-7xl md:text-8xl">
              {fullName}
            </h1>
          )}
          {(flavor.description ?? brand.description) && (
            <p
              className={`max-w-md text-base leading-relaxed text-barcel-black/70 ${
                brand.slug === "takis" ? "font-takisBody" : "font-body"
              }`}
            >
              {flavor.description ?? brand.description}
            </p>
          )}

          {flavor.spiceLevel && (
            <div className="w-full border-y border-black/10 py-4">
              <Picometro level={flavor.spiceLevel} />
              {/* Ronda 44: el Takis Global Brandbook 2025 (subido por el cliente)
                  trae el Heat-o-Meter oficial y varias páginas (74, 82, 96)
                  muestran el nivel real ya aplicado a Fuego, Blue Heat, Original,
                  Chile Limón, Huakamoles e Intense Nacho — para esos 6 el dato
                  queda confirmado, sin nota. Salsa Brava no tiene equivalente en
                  el portafolio global del manual, así que se queda como
                  estimación marcada (mismo criterio que "Presentaciones de
                  ejemplo" abajo). */}
              {!flavor.spiceLevelConfirmed && (
                <p className="mt-3 font-body text-xs text-barcel-black/70">
                  * Nivel de picante estimado — pendiente de confirmar con Barcel
                  (sin equivalente en el Takis Global Brandbook 2025).
                </p>
              )}
            </div>
          )}

          {flavor.sizes && flavor.sizes.length > 0 && (
            <div className="w-full">
              <p className="mb-2.5 font-display text-sm font-bold text-barcel-black">
                Presentaciones
              </p>
              <SizePicker sizes={flavor.sizes} />
              {/* Ronda 35: /40 sobre blanco da 2.65:1 — muy por debajo de
                  AA. Sube a /70 (7.0:1+) igual que el resto de texto
                  secundario de esta página. */}
              <p className="mt-2 font-body text-xs text-barcel-black/70">
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
