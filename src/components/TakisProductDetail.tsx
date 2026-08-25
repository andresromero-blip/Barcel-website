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
//
// Ronda 65: el cliente marcó (con captura) que la columna de Sellos/
// Ingredientes era "imposible de leer" — causa raíz real: Accordion.tsx
// no trae fondo propio (mismo componente que usa ProductDetail.tsx, pero
// ahí vive sobre bg-barcel-cream, un fondo claro). Aquí vivía flotando
// directo sobre bg.jpg (morado oscuro/texturizado), así que su texto
// negro quedaba con muy poco contraste — no pasa AA. Fix: se envuelve esa
// columna en la misma tarjeta blanca sólida que ya usa la columna de
// nombre+descripción (bg-white/95), en vez de dejarla transparente sobre
// el fondo. El breadcrumb y "Presentación:" (texto blanco) tenían el
// mismo riesgo de raíz — dependían de que el fondo fuera oscuro en ese
// punto exacto — así que también pasan a vivir sobre una barra sólida
// (bg-barcel-black) en vez de flotar directo sobre la imagen. Además se
// reemplaza bg.jpg por el fondo oficial nuevo que compartió el cliente
// (BG Takis.pdf: diagonal morado/amarillo con espirales de marca).
//
// Ronda 66: tres correcciones del cliente sobre esta misma tarjeta:
// 1) La etiqueta "TAKIS" se quita — competía en peso visual con el
//    nombre real del sabor. Los PNG oficiales de nombres además traían
//    ~35-45% de margen transparente alrededor del manchón (verificado
//    con getbbox()), así que el <img> se veía chico y con huecos raros
//    arriba/abajo aunque el contenedor fuera grande — se recortaron los
//    8 PNG a su contenido real (+12px de aire) antes de esta ronda, y
//    ahora el nombre crece de max-w-[240px] a max-w-sm/md: es el
//    elemento más grande de la tarjeta, como pidió el cliente.
// 2) "Todo tiene el mismo peso": se agrupa nombre+descripción,
//    picómetro y CTA en bloques con su propio spacing (gap-6 entre
//    bloques en vez de un gap-4 plano en 5 elementos sueltos) y se baja
//    la descripción a text-sm/60% para que no compita con el nombre.
// 3) La barra negra sólida de "Presentación" (fix de contraste de la
//    Ronda 65) rompía el borde de las pastillas inactivas de
//    SizePicker (border-barcel-black/15 es invisible sobre fondo
//    negro) — "el color negro hace difícil la interacción con el
//    selector". Pasa a bg-white/95, igual que el resto de tarjetas de
//    esta página y que el selector de las otras 5 marcas (mismo
//    componente SizePicker, mismo contraste, "el selector de las demás
//    marcas" que el cliente pidió recuperar).
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
        {/* Ronda 65: barra sólida (no texto flotando sobre la imagen) —
            garantiza contraste AA sin importar qué parte del fondo
            (morado o amarillo) quede detrás. Blanco puro (no /85) sobre
            barcel-black da 19.6:1. */}
        <div className="relative z-10 bg-barcel-black">
          <nav
            aria-label="Ruta de navegación"
            className="container-page flex flex-wrap items-center gap-1.5 py-3 font-body text-xs text-white md:text-sm"
          >
            <Link href="/" className="text-white/80 transition-colors hover:text-white">
              Inicio
            </Link>
            <span aria-hidden="true" className="text-white/50">
              /
            </span>
            <Link
              href={`/marcas/${brand.slug}`}
              className="text-white/80 transition-colors hover:text-white"
            >
              {brand.name}
              <sup className="text-[0.7em]">®</sup>
            </Link>
            <span aria-hidden="true" className="text-white/50">
              /
            </span>
            <span className="text-white">{fullName}</span>
          </nav>
        </div>

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
          {/* Ronda 65: tarjeta blanca sólida (antes flotaba transparente
              sobre bg.jpg) — mismo tratamiento que la tarjeta de
              nombre+descripción de la derecha, así el texto negro de los
              acordeones vuelve a tener contraste AA real. */}
          <div className="order-3 flex flex-col gap-3 bg-white/95 p-6 md:order-1 md:p-8">
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

          <div className="order-2 flex flex-col items-start gap-6 bg-white/95 p-6 md:order-3 md:p-8">
            {/* Ronda 66: nombre+descripción agrupados como un solo bloque
                (gap-3) — el nombre es el elemento más grande de toda la
                tarjeta, sin la etiqueta "TAKIS" compitiendo arriba. */}
            <div className="flex flex-col gap-3">
              {flavor.nameImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={flavor.nameImage}
                  alt={fullName}
                  className="h-auto w-full max-w-[280px] sm:max-w-sm md:max-w-[22rem]"
                />
              ) : (
                <h1 className="font-teko text-6xl font-bold uppercase leading-[0.9] text-barcel-black">
                  {fullName}
                </h1>
              )}
              {(flavor.description ?? brand.description) && (
                <p className="max-w-sm font-takisBody text-sm leading-relaxed text-barcel-black/60">
                  {flavor.description ?? brand.description}
                </p>
              )}
            </div>

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
          // Ronda 66: la barra negra sólida (fix de contraste de la Ronda
          // 65) tapaba el borde border-barcel-black/15 de las pastillas
          // inactivas de SizePicker — quedaban sin borde visible, sin
          // affordance de que son botones. Pasa a bg-white/95: mismo
          // fondo claro que ya usan Sellos/Ingredientes y nombre+
          // descripción, y el mismo contraste con el que este selector
          // ya funciona bien en las otras 5 marcas.
          <div className="relative z-10 bg-white/95 py-5">
            <div className="container-page flex flex-col items-center gap-2.5 md:flex-row md:justify-center">
              <p className="font-display text-sm font-bold text-barcel-black">Presentación:</p>
              <SizePicker sizes={flavor.sizes} />
              {!flavor.nutrition && (
                <p className="font-body text-xs text-barcel-black/60">
                  * Presentaciones de ejemplo — pendientes de confirmar con Barcel.
                </p>
              )}
            </div>
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
