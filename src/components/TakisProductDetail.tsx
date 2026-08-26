import Link from "next/link";
import type { Brand, Flavor } from "@/data/brands";
import Accordion from "./Accordion";
import SizePicker from "./SizePicker";
import Picometro from "./Picometro";
import WhereToBuyModal from "./WhereToBuyModal";
import RelatedProductsSlider from "./RelatedProductsSlider";
import OtherBrandsGrid from "./OtherBrandsGrid";

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
//
// Ronda 67: el modal "¿Dónde comprar?" (WhereToBuyModal, position:fixed
// z-[60]) no cubría toda la página al abrirse — Sellos, la tarjeta de
// nombre y la barra de Presentación se veían encima del backdrop, y de
// paso el selector de Presentación se veía "flotando" suelto, como si
// no estuviera integrado a la página. Causa raíz: el breadcrumb, el
// grid de 3 columnas y la barra de Presentación tenían "relative z-10"
// (agregado en Ronda 65 para asegurar que el texto quedara sobre
// bg.jpg — innecesario, un elemento en flujo normal SIEMPRE pinta
// encima del background-image de su propio padre, con o sin z-index).
// Ese z-10 no era decorativo: creaba un contexto de apilamiento propio
// para cada uno de esos tres bloques. El modal vive dentro del
// contexto del grid, así que su z-[60] queda acotado ahí adentro — no
// se compara nunca contra el contexto de la barra de Presentación (que
// es un hermano posterior, mismo z-10, y por orden en el DOM gana el
// pintado). Se quitan los z-10 sobrantes: sin contextos intermedios,
// el modal fixed vuelve a compararse contra la raíz real de la página
// y cubre todo, incluida la barra de Presentación.
//
// Ronda 68: el cliente mandó nueva evidencia — el fix de z-index de la
// Ronda 67 no fue suficiente, el modal seguía cortado. Fix definitivo
// en WhereToBuyModal.tsx: el modal ahora se monta con createPortal
// directo en document.body, así que ya no es descendiente del árbol de
// esta tarjeta y ningún ancestro (presente o futuro) puede volver a
// atraparlo. Además, "el selector de marcas que había antes": Ronda 54
// había extraído OtherBrandsGrid específicamente para que "también te
// puede antojar" en la página de sabor de Takis mostrara las otras 5
// marcas del portafolio (ver comentario en OtherBrandsGrid.tsx) — al
// separar esta página en su propio componente (Ronda 64) esa sección
// se armó solo con el slider de sabores (related) y el selector de
// marcas se quedó afuera sin querer. Se reintegra aquí, mismo patrón
// que BrandPage.tsx ("Explora otras marcas").
export default function TakisProductDetail({
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
            barcel-black da 19.6:1. Ronda 67: sin z-10 — un elemento en
            flujo normal ya pinta encima del background-image del padre;
            el z-10 solo creaba un contexto de apilamiento que atrapaba
            el modal "¿Dónde comprar?" (ver nota arriba). */}
        <div className="bg-barcel-black">
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

        {/* Ronda 77: el cliente pidió optimizar espacio y lectura —
            de 3 columnas (nutrición | producto | info+CTA) a 2 columnas.
            El producto se mueve al centro-izquierda y toda la información
            (nombre, descripción, picómetro, CTA) se combina en una sola
            tarjeta a la derecha; Información Nutrimental e Ingredientes
            ya no tienen columna propia, viven como acordeones colapsados
            dentro de esa misma tarjeta, debajo del CTA. Menos bloques
            visuales compitiendo entre sí y menos scroll en mobile, donde
            el orden se mantiene: imagen primero, tarjeta completa
            después. Sin z-10 en el grid (Ronda 67) para no volver a
            atrapar el modal "¿Dónde comprar?". */}
        <div className="container-page grid gap-8 pb-12 pt-6 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-10 md:pb-16">
          <div className="order-1 flex justify-center md:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flavor.image}
              alt={`${fullName}®`}
              className="h-auto w-full max-w-[260px] drop-shadow-2xl sm:max-w-sm md:max-w-md"
            />
          </div>

          <div className="order-2 flex flex-col items-start gap-6 bg-white/95 p-6 md:order-2 md:p-8">
            {/* Ronda 66: el nombre es el elemento más grande de toda la
                tarjeta, sin la etiqueta "TAKIS" compitiendo arriba.
                Ronda 79: la descripción se saca de este bloque — ahora
                comparte fila con el Picómetro (ver abajo) en vez de ir
                apilada debajo del nombre. */}
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
            </div>

            {/* Ronda 79: dos pedidos del cliente sobre este bloque —
                1) "el picómetro debería estar al lado izquierdo del
                texto 'Picante azul, intensidad...'": Picometro y la
                descripción pasan de ser dos bloques apilados a compartir
                una sola fila (se apilan de nuevo solo en mobile, donde
                el ancho no alcanza para los dos lado a lado).
                2) "la tipografía de 'Picante azul, intensidad....' debe
                ser la misma del cuerpo de texto de la información
                nutrimental": la descripción pasa de font-takisBody
                text-sm text-barcel-black/60 a font-body text-xs/sm
                text-barcel-black/70 — exactamente las clases que usa el
                cuerpo de los acordeones compact de abajo (ver
                Accordion.tsx).
                Ronda 80: tres pedidos más del cliente sobre este bloque —
                1) "el picómetro y el texto deben estar alineados":
                vuelve a items-center (la Ronda 79 lo había puesto en
                items-start para evitar que la descripción chocara con el
                número grande de "Extremo"; con el Picómetro más chico
                que trae este mismo cambio ese choque ya no pasa, así que
                items-center ahora sí alinea bien ambos elementos por su
                centro vertical).
                2) "reduce el tamaño del picómetro": se pasa la nueva
                variante compact (ver Picometro.tsx) — imagen y
                tipografía más chicas, pensadas para vivir al lado de un
                párrafo en vez de solo en su propia fila.
                3) "aumenta el peso tipográfico ya que es difícil
                leerlo": la descripción pasa de peso normal (400) a
                font-medium (500). Verificación de accesibilidad: el
                color no cambia (text-barcel-black/70 = #0f0f0f al 70%
                sobre blanco ≈ #575757), contraste 7.23:1 — pasa AA
                (4.5:1) y AAA (7:1) para texto normal; subir el peso solo
                mejora la legibilidad, no la arriesga. */}
            {(flavor.spiceLevel || flavor.description || brand.description) && (
              <div className="flex w-full flex-col gap-3 border-t border-black/10 pt-4 sm:flex-row sm:items-center sm:gap-4">
                {flavor.spiceLevel && (
                  <div className="shrink-0">
                    <Picometro level={flavor.spiceLevel} compact />
                  </div>
                )}
                {(flavor.description ?? brand.description) && (
                  <p className="min-w-0 flex-1 font-body text-xs font-medium leading-relaxed text-barcel-black/70 md:text-sm">
                    {flavor.description ?? brand.description}
                  </p>
                )}
              </div>
            )}
            {flavor.spiceLevel && !flavor.spiceLevelConfirmed && (
              <p className="-mt-3 font-body text-xs text-barcel-black/70">
                * Nivel de picante estimado — pendiente de confirmar con Barcel
                (sin equivalente en el Takis Global Brandbook 2025).
              </p>
            )}

            {/* Ronda 77: Información Nutrimental + Ingredientes, antes en
                su propia columna, ahora como acordeones colapsados dentro
                de esta misma tarjeta — ver nota arriba.
                Ronda 78: "el desplegable es demasiado grande" — se pasa
                compact (ver Accordion.tsx) y se baja el gap entre los dos
                de gap-3 a gap-2, así ocupan menos alto sin perder
                legibilidad.
                Ronda 81: "iguala los textos Calorías/Azúcar/Grasas
                saturadas/Grasas trans/Sodio y los ingredientes en
                fuente, peso, tamaño, estilo y color al texto 'Picante
                azul, intensidad...'" — las etiquetas de la tabla y el
                párrafo de ingredientes pasan a usar exactamente la misma
                clase que la descripción (font-body text-xs font-medium
                leading-relaxed text-barcel-black/70 md:text-sm) en vez
                de heredar el default sin peso del Accordion compact.
                Ingredientes además pierde el uppercase que tenía, para
                igualar también el estilo (mayúsculas/minúsculas) de la
                descripción. Los valores (496 kcal, 3.1%, etc.) y
                alérgenos NO se tocan — el cliente solo pidió igualar las
                etiquetas y el texto de ingredientes, no los datos que sí
                deben destacar. */}
            <div className="flex w-full flex-col gap-2 border-t border-black/10 pt-4">
              <Accordion title="Información Nutrimental" compact>
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
                        <div key={label} className="flex items-center justify-between py-1.5">
                          <span className="font-body text-xs font-medium leading-relaxed text-barcel-black/70 md:text-sm">
                            {label}
                          </span>
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
              <Accordion title="Ingredientes" compact>
                {flavor.ingredients ? (
                  <div className="flex flex-col gap-3">
                    {/* Ronda 82: "los ingredientes no deben ir en altas" —
                        quitar la clase uppercase (Ronda 81) no alcanzaba
                        porque el dato en brands.ts está escrito en
                        mayúsculas de origen (es el texto legal tal cual
                        lo compartió el cliente, igual que en
                        ProductDetail.tsx de las otras 5 marcas, donde SÍ
                        se pidió mantenerlo así). Como no hay que tocar
                        ese dato compartido (perdería las mayúsculas
                        también en las otras marcas), se resuelve solo
                        para esta tarjeta con lowercase +
                        first-letter:uppercase: pasa todo a minúsculas y
                        recapitaliza únicamente la primera letra, como una
                        oración normal. */}
                    <p className="lowercase first-letter:uppercase font-body text-xs font-medium leading-relaxed text-barcel-black/70 md:text-sm">
                      {flavor.ingredients}
                    </p>
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

            {/* Ronda 79: "el CTA debe ser la acción, por ende debe estar
                al final" — WhereToBuyModal pasa de vivir antes de los
                acordeones a ser el último elemento de la tarjeta. */}
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
          <div className="bg-white/95 py-5">
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

      {/* Ronda 68: selector de marcas reintegrado — ver nota arriba. */}
      <section className="bg-barcel-cream py-14 md:py-16">
        <OtherBrandsGrid
          brands={otherBrands}
          heading="Explora otras marcas"
          subheading="Descubre el resto del portafolio Barcel."
        />
      </section>
    </>
  );
}
