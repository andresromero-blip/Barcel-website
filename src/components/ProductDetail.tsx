import Link from "next/link";
import type { Brand, Flavor } from "@/data/brands";
import ProductGallery from "./ProductGallery";
import SizePicker from "./SizePicker";
import Accordion from "./Accordion";
import RelatedProductsSlider from "./RelatedProductsSlider";
import WhereToBuyModal from "./WhereToBuyModal";
import Picometro from "./Picometro";
import TakisProductDetail from "./TakisProductDetail";

// Página de detalle de producto — 1:1 con el wireframe de Figma
// (node 107:2838) para las 5 marcas sin mockup propio, adaptado a los
// tokens/patrones ya establecidos en el sitio (fuentes, colores de
// marca, sin corner-radius en CTAs, mismo mecanismo de acordeón que el
// menú Marcas del Header).
//
// Historial de esta página para Takis, porque ya van tres rondas:
// - Ronda 54: reutilizaba el hero de marca + el slider del portafolio
//   completo (el mismo contenido del hub /marcas/takis) — el cliente lo
//   marcó como el error de raíz: "cada página de producto debe ser
//   independiente... está el hub de marca y la página de detalle de
//   cada producto", y compartió una referencia (Chip's Fuego).
// - Ronda 62: se eliminó esa rama y Takis pasó por este mismo layout de
//   dos columnas (galería + specs) — pero esta referencia en realidad
//   describe una estructura DISTINTA (fondo de color de marca, tres
//   columnas: sellos+ingredientes / producto / nombre+descripción,
//   flechas entre sabores), que Ronda 62/63 no habían aplicado.
// - Ronda 64: el cliente lo marcó de nuevo y compartió los assets que
//   faltaban para construirla de verdad — la carpeta "NOMBRES PNG"
//   (manchón oficial con el nombre de cada sabor) y bg.jpg (textura de
//   fondo). Con esos dos assets ya es posible construir la estructura
//   real solo para Takis, en TakisProductDetail.tsx — un componente
//   aparte, no una rama más aquí adentro (evita repetir el enredo de la
//   Ronda 54). Las otras 5 marcas no tienen su propio bg.jpg/NOMBRES
//   PNG todavía, así que se quedan con el layout de abajo hasta que
//   Barcel comparta esos assets para ellas también.
// - Ronda 99: "replica la misma estructura de las páginas de producto
//   de Takis, con los assets de Chip's y color" — Chip's ya tiene su
//   propio "NOMBRES PNG" (las etiquetas de yute recortadas en la Ronda
//   98, guardadas en flavor.nameImage) aunque todavía no tiene bg.jpg
//   propio; TakisProductDetail.tsx se generalizó para caer a un fondo
//   sólido con brand.bg cuando no hay textura (ver brand.productDetailBg
//   en brands.ts), así que Chip's puede sumarse a esta lista sin
//   esperar un asset que no existe todavía.
const BRANDS_WITH_DETAIL_LAYOUT = ["takis", "chips"];

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
  if (BRANDS_WITH_DETAIL_LAYOUT.includes(brand.slug)) {
    // Ronda 68: otherBrands se quedaba afuera al hacer este early-return
    // (ya lo recibe este componente como prop, solo faltaba reenviarlo) —
    // causa raíz de "el selector de marcas que había antes" ausente en la
    // página de sabor de Takis. Ver nota completa en TakisProductDetail.tsx.
    return (
      <TakisProductDetail
        brand={brand}
        flavor={flavor}
        related={related}
        otherBrands={otherBrands}
      />
    );
  }

  const galleryImages = [flavor.image, flavor.hoverImage].filter(
    (src): src is string => Boolean(src)
  );
  const fullName = `${brand.name} ${flavor.name}`;

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

  // Ronda 63: referencia del cliente (Chip's Fuego) mostraba la galería +
  // specs sobre una banda de fondo de color, separada del resto de la
  // página. Se usa barcel-cream (no un color saturado de marca): es el
  // mismo fondo que ya usa "también te puede antojar" más abajo, con
  // contraste AA ya verificado contra texto negro — un fondo saturado por
  // marca (ej. takis-purple) obligaría a revisar de nuevo el contraste de
  // cada texto de esta sección para las 6 marcas, fuera de alcance de
  // esta ronda.
  return (
    <>
      {breadcrumb}

      <section className="bg-barcel-cream">
        <div className="container-page grid gap-10 py-10 md:grid-cols-2 md:gap-16 md:py-16">
        <ProductGallery images={galleryImages} alt={`${fullName}®`} />

        <div className="flex flex-col items-start gap-4">
          <p
            className={`font-display text-sm font-bold uppercase tracking-[0.2em] ${brand.textOnBg}`}
          >
            {brand.name}
          </p>
          {/* Ronda 64: Takis ya no llega a este componente (early-return
              arriba, ver TakisProductDetail.tsx) — se quita la rama
              condicional isTakis que quedaba muerta aquí, este H1
              siempre es font-teko para las 5 marcas restantes. */}
          <h1 className="font-teko text-6xl font-bold uppercase leading-[0.9] text-barcel-black sm:text-7xl md:text-8xl">
            {fullName}
          </h1>
          {(flavor.description ?? brand.description) && (
            <p className="max-w-md font-body text-base leading-relaxed text-barcel-black/70">
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
              {/* Ronda 63: los 7 sabores con etiqueta real (nutrition
                  presente) ya traen presentaciones reales — la nota de
                  "ejemplo, pendiente de confirmar" solo aplica a Salsa
                  Brava (única sin etiqueta, ver nota arriba). Ronda 35:
                  /40 sobre blanco da 2.65:1 — no pasa AA. /70 (7.0:1+)
                  igual que el resto de texto secundario de esta página. */}
              {!flavor.nutrition && (
                <p className="mt-2 font-body text-xs text-barcel-black/70">
                  * Presentaciones de ejemplo — pendientes de confirmar con
                  Barcel.
                </p>
              )}
            </div>
          )}

          <div className="mt-2 flex w-full flex-col gap-3">
            <Accordion title="Ingredientes">
              {flavor.ingredients ? (
                <div className="flex flex-col gap-3">
                  <p className="uppercase">{flavor.ingredients}</p>
                  {flavor.allergens && (
                    <p className="font-bold">{flavor.allergens}</p>
                  )}
                </div>
              ) : (
                <>
                  Contenido de ejemplo — pendiente de recibir la lista de
                  ingredientes oficial de {fullName}® para reemplazar este
                  texto.
                </>
              )}
            </Accordion>
            <Accordion title="Información nutrimental">
              {flavor.nutrition ? (
                <div className="flex flex-col gap-3">
                  <p className="text-xs text-barcel-black/70">
                    Porción: {flavor.nutrition.porcionG} g ·{" "}
                    {flavor.nutrition.porcionesEnvase} porciones por envase.
                  </p>
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-barcel-black/20 text-left">
                        <th className="py-1.5 font-display font-bold">
                          Nutrimento
                        </th>
                        <th className="py-1.5 text-right font-display font-bold">
                          Por porción
                        </th>
                        <th className="py-1.5 text-right font-display font-bold">
                          Por 100 g
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "Contenido energético",
                          `${flavor.nutrition.kcalPorcion} kcal`,
                          `${flavor.nutrition.kcal100g} kcal`,
                        ],
                        [
                          "Proteínas",
                          `${flavor.nutrition.proteinasPorcion} g`,
                          `${flavor.nutrition.proteinas100g} g`,
                        ],
                        [
                          "Grasas totales",
                          `${flavor.nutrition.grasasTotalesPorcion} g`,
                          `${flavor.nutrition.grasasTotales100g} g`,
                        ],
                        [
                          "· Grasas saturadas",
                          `${flavor.nutrition.grasasSatPorcion} g`,
                          `${flavor.nutrition.grasasSat100g} g`,
                        ],
                        [
                          "· Grasas trans",
                          `${flavor.nutrition.grasasTransPorcionMg} mg`,
                          `${flavor.nutrition.grasasTrans100gMg} mg`,
                        ],
                        [
                          "Colesterol",
                          `${flavor.nutrition.colesterolPorcionMg} mg`,
                          `${flavor.nutrition.colesterol100gMg} mg`,
                        ],
                        [
                          "Hidratos de carbono disponibles",
                          `${flavor.nutrition.hidratosPorcion} g`,
                          `${flavor.nutrition.hidratos100g} g`,
                        ],
                        [
                          "· Azúcares",
                          `${flavor.nutrition.azucaresPorcion} g`,
                          `${flavor.nutrition.azucares100g} g`,
                        ],
                        [
                          "· Azúcares añadidos",
                          `${flavor.nutrition.azucaresAnadidosPorcion} g`,
                          `${flavor.nutrition.azucaresAnadidos100g} g`,
                        ],
                        [
                          "Fibra dietética",
                          `${flavor.nutrition.fibraPorcion} g`,
                          `${flavor.nutrition.fibra100g} g`,
                        ],
                        [
                          "Sodio",
                          `${flavor.nutrition.sodioPorcionMg} mg`,
                          `${flavor.nutrition.sodio100gMg} mg`,
                        ],
                      ].map(([label, porcion, cien]) => (
                        <tr key={label} className="border-b border-barcel-black/10">
                          <td className="py-1.5 pr-2 text-barcel-black/80">
                            {label}
                          </td>
                          <td className="py-1.5 text-right">{porcion}</td>
                          <td className="py-1.5 text-right">{cien}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <>
                  Contenido de ejemplo — pendiente de recibir la tabla
                  nutrimental oficial de {fullName}® para reemplazar este
                  texto.
                </>
              )}
            </Accordion>
          </div>

          <WhereToBuyModal />
        </div>
      </div>
      </section>

      {related.length > 0 && (
        <section className="bg-barcel-cream py-14 md:py-20">
          <div className="container-page">
            <h2 className="font-teko text-4xl font-bold uppercase text-barcel-black md:text-5xl">
              También te puede antojar
            </h2>
            {/* Ronda 88: subtítulo invitando a explorar, mismo patrón
                (tamaño/color/max-w) que ya usa "Portafolio de productos"
                en BrandPage.tsx — consistencia entre los dos sliders de
                producto del sitio. */}
            <p className="mt-2 max-w-xl font-body text-sm text-barcel-black/70 md:text-base">
              Explora más sabores y arma tu próximo antojo.
            </p>
          </div>
          <div className="container-page mt-8">
            <RelatedProductsSlider brand={brand} items={related} />
          </div>
        </section>
      )}
    </>
  );
}
