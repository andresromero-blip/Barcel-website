import Link from "next/link";
import type { Brand } from "@/data/brands";

// Ronda 116: rediseño Figma 1:1 MOBILE del grid de familia (Home >
// Categorías, "Card categoria", nodes 1:10502–1:10509) — tarjeta apilada:
// franja de color arriba (h-[200px], logo centrado) y bloque de texto
// blanco abajo. Ronda 117 la deja SOLO para mobile/tablet (md:hidden):
// el usuario reportó que el desktop en vivo no se parecía en nada al
// Figma real (https://.../node-id=1-3134) — Ronda 116 había estirado
// este mismo patrón apilado a un grid de 4 columnas en desktop
// ("provisional"), pero el Figma desktop real (node 1:3202,
// "Cards Categorías") es un patrón completamente distinto: una sola
// columna de 8 filas full-width, cada una con la franja de color y el
// bloque de texto LADO A LADO (no apilados) y alternando de lado en cada
// fila. Ver <DesktopCard> más abajo para ese layout, verificado 1:1
// contra get_design_context de cada fila real (I1:3202;205:3057 para
// Chip's [logo-izq], I1:3202;205:3144 para Takis [texto-izq]).
function MobileCard({ brand }: { brand: Brand }) {
  return (
    <div className="flex flex-col overflow-hidden md:hidden">
      {/* Logo marca: franja de color, h-200px en Figma.
          Ronda 138: el cliente pidió que en mobile el logo se vea siempre
          "con producto" — el mismo asset que DesktopCard (más abajo) solo
          muestra al hacer :hover (brand.logoHover, "logo real con
          microinteracción de hover: producto asomando", ver brands.ts).
          En mobile no existe hover real (dispositivo táctil), así que ese
          estado pasa a ser el default: brand.logoHover ?? brand.logo, con
          fallback al logo simple para cualquier marca que no tenga
          logoHover cargado todavía. */}
      <div
        className={`relative flex h-[200px] items-center justify-center overflow-hidden p-8 ${brand.familyCardBg}`}
      >
        {brand.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brand.logoHover ?? brand.logo}
            alt={`Logo ${brand.name}`}
            className="h-full w-full max-w-[70%] object-contain"
          />
        ) : (
          <span
            className={`font-display text-3xl font-black uppercase tracking-tight ${brand.logoText}`}
          >
            {brand.name}
            <sup className="ml-1 text-[0.4em]">®</sup>
          </span>
        )}
      </div>

      {/* Card text: bloque blanco con título, tag, descripción y CTA */}
      <div className="flex flex-col gap-4 bg-white px-4 py-6">
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-2xl font-bold text-barcel-black">
            {brand.name}
            <sup className="text-[0.45em]">®</sup>
          </h3>
          <p className={`font-display text-base font-semibold ${brand.familyCardText}`}>
            {brand.tagline}
          </p>
        </div>
        <p className="font-body text-sm leading-[1.3] text-barcel-black/70">
          {brand.description}
        </p>
        <Link
          href={`/marcas/${brand.slug}`}
          className="group mt-1 inline-flex w-fit items-center gap-1.5 font-body text-sm font-semibold text-barcel-black underline"
        >
          Ver todos los productos
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

// Ronda 117: fila desktop 1:1 con Figma (node 1:3202 "Cards Categorías",
// 8 instancias "Card categoria" full-width de 1440x650 apiladas SIN gap
// — no un grid de columnas). Cada fila = franja de color (mitad) + bloque
// de texto blanco (mitad), lado a lado, alternando qué mitad va primero
// según brand.imageFirst (ya existía en brands.ts, verificado 1:1 contra
// Figma: chips=true→logo-izq, takis=false→texto-izq, y así sucesivamente
// en alternancia estricta — coincide con el patrón real de las 8 filas).
// Tamaños de fuente/padding replican los valores literales de Figma
// (64px título, 36px tag, 24px descripción, px-80/gap-48 del bloque de
// texto) en el breakpoint xl (pantallas ≥1280px, el ancho real del
// frame); en md/lg se escalan hacia abajo para no romper en laptops más
// angostas — Figma no define un breakpoint intermedio propio.
function DesktopCard({ brand }: { brand: Brand }) {
  // Ronda 118 (parte 2): dos fixes.
  //
  // 1) Seam de subpíxel: antes el orden lógico/izq-der se resolvía con
  //    flex-row-reverse (mismo DOM, dirección visual invertida por CSS).
  //    Eso deja el split 50/50 de cada fila a merced del redondeo de
  //    flex-grow, y como cada fila es un contenedor flex INDEPENDIENTE,
  //    a ciertos anchos (zoom del navegador, DPI no entero) el punto de
  //    corte de una fila puede caer medio píxel distinto al de la fila
  //    de abajo — se ve como una rendija blanca justo en la esquina
  //    donde se tocan las 4 zonas (logo/texto de una fila con la
  //    siguiente). Fix: el orden ahora se resuelve intercambiando el
  //    JSX real (no CSS), y el elemento que queda SEGUNDO en el DOM
  //    (sea logo o texto, según el lado) se monta con -ml-px para
  //    solaparse un hair sobre su vecino — como pinta después, tapa
  //    cualquier rendija de redondeo sin que se note. md:-mt-px en el
  //    contenedor de la fila hace lo mismo en el eje vertical (con la
  //    fila anterior).
  // 2) Hover del logo: Figma trae una interacción "Logo marca · Hover ·
  //    Change to" en cada una de las 8 filas — mismo patrón de crossfade
  //    ya usado en ProductSlider.tsx (flavor.image → flavor.hoverImage
  //    con group-hover:opacity), aplicado aquí a brand.logo/logoHover
  //    (campo que ya existía en brands.ts pero no se usaba en ningún
  //    hover real, solo como fallback de brand.logo).
  const textIsSecond = brand.imageFirst;

  const logoBox = (
    <div
      className={`group/logo relative flex flex-1 items-center justify-center overflow-hidden p-10 lg:p-14 xl:p-16 ${brand.familyCardBg} ${
        textIsSecond ? "" : "-ml-px"
      }`}
    >
      {brand.logo ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brand.logo}
            alt={`Logo ${brand.name}`}
            className={`h-full max-h-[420px] w-full max-w-[420px] object-contain ${
              brand.logoHover ? "transition-opacity duration-300 ease-out group-hover/logo:opacity-0" : ""
            }`}
          />
          {brand.logoHover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brand.logoHover}
              alt=""
              aria-hidden="true"
              className="absolute h-full max-h-[420px] w-full max-w-[420px] object-contain opacity-0 transition-opacity duration-300 ease-out group-hover/logo:opacity-100"
            />
          )}
        </>
      ) : (
        <span
          className={`font-display text-6xl font-black uppercase tracking-tight ${brand.logoText}`}
        >
          {brand.name}
          <sup className="ml-1 text-[0.4em]">®</sup>
        </span>
      )}
    </div>
  );

  const textBox = (
    <Link
      href={`/marcas/${brand.slug}`}
      className={`flex flex-1 flex-col justify-center gap-6 bg-white px-8 py-10 lg:gap-8 lg:px-12 xl:gap-12 xl:px-20 ${
        textIsSecond ? "-ml-px" : ""
      }`}
    >
      <div className="flex flex-col gap-4 xl:gap-6">
        <div className="flex items-start gap-3 xl:gap-4">
          <h3 className="font-display text-3xl font-bold leading-none text-barcel-black lg:text-5xl xl:text-[64px]">
            {brand.name}
          </h3>
          <sup className="mt-1 text-base text-barcel-black lg:text-xl xl:text-2xl">®</sup>
        </div>
        <p className={`font-display text-lg font-semibold lg:text-2xl xl:text-[36px] ${brand.familyCardText}`}>
          {brand.tagline}
        </p>
      </div>
      <p className="font-body text-sm leading-[1.3] text-barcel-black/70 lg:text-base xl:text-[24px]">
        {brand.description}
      </p>
      <span className="group inline-flex w-fit items-center gap-2 py-2 font-body text-sm font-medium text-barcel-black underline xl:gap-4 xl:py-3 xl:text-lg">
        Ver todos los productos
        <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </span>
    </Link>
  );

  return (
    <div className="hidden md:flex md:min-h-[360px] md:-mt-px lg:min-h-[460px] xl:min-h-[650px]">
      {brand.imageFirst ? (
        <>
          {logoBox}
          {textBox}
        </>
      ) : (
        <>
          {textBox}
          {logoBox}
        </>
      )}
    </div>
  );
}

export default function BrandCard({
  brand,
  dimmed,
  highlighted,
}: {
  brand: Brand;
  dimmed: boolean;
  highlighted: boolean;
}) {
  return (
    <article
      id={brand.slug}
      className={`transition-all duration-500 ${
        dimmed ? "opacity-30 saturate-50" : "opacity-100"
      } ${highlighted ? "ring-4 ring-barcel-red ring-offset-2" : ""}`}
    >
      <MobileCard brand={brand} />
      <DesktopCard brand={brand} />
    </article>
  );
}
