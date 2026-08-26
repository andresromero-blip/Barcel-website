import Link from "next/link";
import { BRAND_SOCIALS, type Brand } from "@/data/brands";
import ProductSlider from "./ProductSlider";
import TakisHero from "./TakisHero";
import ChipsHero from "./ChipsHero";
import OtherBrandsGrid from "./OtherBrandsGrid";

// Ronda 49: el cliente pidió el fondo 1:1 con el asset real del
// brandbook — las Rondas 45/46 lo habían reconstruido a mano (clip-path +
// espirales + puntos de halftone en JS) y el resultado no calzaba bien
// ("muy mal finalizado"). Se reemplaza todo eso por la FOTO real que
// mandó el cliente (recorte de la portada "04 BRAND ASSETS &
// APPLICATIONS" del Takis Global Brandbook 2025: diagonal morado/amarillo,
// costura de halftone y espirales, todo ya resuelto en el archivo) usada
// directo como imagen de fondo — 1:1 real, no una aproximación.
//
// Ronda 53: el cliente reportó que el hero de Ronda 52 quedaba con el
// logo TAKIS duplicado y mal posicionado. Causa real: la Ronda 52 ya
// traía el logo horneado en el fondo, pero el componente seguía
// ejecutando la rama heroVisual==="logo" de más abajo, que superpone
// OTRA copia de brand.logo (más brand.heroImage rotado) encima del
// fondo — de ahí el logo repetido. Este archivo de Ronda 53 es una sola
// pieza (1920x1080, un solo TAKIS, personaje + banda amarilla a la
// derecha, morado vacío a la izquierda ya pensado para el texto) que
// reemplaza las dos piezas de la Ronda 52 — ya no hace falta <picture>
// con <source> por breakpoint: un solo <img> con object-position
// responsivo (ver JSX) resuelve mobile y desktop. La rama heroVisual
// también se desactiva para Takis (ver isTakis más abajo) para que no
// vuelva a duplicarse si brand.logo cambia en el futuro.
export default function BrandPage({
  brand,
  otherBrands,
}: {
  brand: Brand;
  otherBrands: Brand[];
}) {
  // Composición 1:1 con el referente compartido (banner Lay's): sin logo
  // en el hero — el producto (empaque real) es el protagonista, en dos
  // piezas apiladas/inclinadas, con 1-2 fotos sueltas de más sabores
  // flotando alrededor a modo de acento. heroImage suele repetir el
  // mismo sabor que flavors[0] (mismo pack, archivo distinto pensado
  // para otro tamaño) — se detecta y se salta para no mostrar el mismo
  // sabor dos veces.
  const heroFlavorStem = brand.heroImage?.match(/hero-([a-z0-9-]+)\.png$/)?.[1];
  const remainingFlavors = heroFlavorStem
    ? (brand.flavors ?? []).filter((f) => !f.image.endsWith(`/${heroFlavorStem}.png`))
    : brand.flavors ?? [];
  const bagImages = [brand.heroImage, remainingFlavors[0]?.image].filter(
    (src): src is string => Boolean(src)
  );
  const accentImages = remainingFlavors.slice(1, 3).map((f) => f.image);
  // Ronda 36: antes se inferia de heroText === "text-white", pero ahora
  // heroText puede ser un acento de marca (café, amarillo...) para el H1
  // sin que eso signifique que el texto de apoyo (párrafo/redes/
  // breadcrumb) también deba ser claro — ese texto exige 4.5:1 (no 3:1) y
  // sigue el campo explícito lightHero, no el color del H1.
  const isLightText = brand.lightHero;
  const isTakis = brand.slug === "takis";
  // Ronda 93: mismo patrón que isTakis — Chip's ahora tiene su propio
  // hero de foto real (ChipsHero.tsx, mecanismo responsive clonado de
  // TakisHero.tsx) en vez de la sección genérica de color sólido de más
  // abajo. Las otras 4 marcas siguen con el hero genérico — no hubo
  // pedido de cambiarlas.
  const isChips = brand.slug === "chips";

  return (
    <>
      {/* Hero — color sólido de marca con formas decorativas sutiles de
          fondo (mismo tono, solo una capa translúcida más para dar
          textura, igual que el referente). El texto va directo sobre el
          color de marca (sin tarjeta blanca) usando heroText — mismo par
          de contraste AA ya verificado para hoverText/hoverBg. Sin logo
          ni nombre de marca como texto: el producto real (con su propio
          empaque impreso) es quien comunica la marca.

          ALTURA — ajustada en la Ronda 26 (el cliente la sintió muy alta
          incluso ya sin CTA/logo gigante): mismo mecanismo min-height +
          clamp() de la Ronda 20, solo que con valores más bajos. Sigue
          siendo min-height (no height fija) a propósito: WCAG 1.4.4
          (Resize Text) y 1.4.10 (Reflow) exigen que el contenido nunca se
          recorte ni se superponga al agrandar el texto o achicar el
          viewport — si la descripción de una marca es más larga, la
          sección crece, nunca recorta.
            - Piso 400px: nunca se ve aplastado en celulares en horizontal.
            - Medio 46dvh (antes 60dvh): bajamos el peso del viewport real
              para que el hero ya no domine la pantalla completa en la
              mayoría de celulares/laptops.
            - Techo 600px (antes 760px): en monitores grandes ocupa
              claramente menos que la mitad de la pantalla.
          `flex flex-col justify-center` centra el contenido verticalmente
          en ese espacio en vez de dejarlo pegado arriba cuando el
          contenido es más corto que el mínimo garantizado.

          Ronda 54: el hero de Takis vive ahora en TakisHero.tsx (lo
          reutiliza también la página de detalle de sabor, ver
          ProductDetail.tsx, para que ambas queden 1:1 según el mockup
          del cliente). Las otras 5 marcas siguen con el hero armado
          aquí mismo — no había pedido de cambiarlas. */}
      {isTakis ? (
        <TakisHero brand={brand} />
      ) : isChips ? (
        <ChipsHero brand={brand} />
      ) : (
      <section
        className={`relative flex min-h-[clamp(400px,46dvh,600px)] flex-col justify-center overflow-hidden ${brand.bg}`}
      >
        {/* Ronda 54: esta rama solo se ejecuta para las 5 marcas que NO
            son Takis (el caso Takis ahora es <TakisHero /> arriba, ver el
            isTakis ? ... : ( de más arriba) — se quita el branching
            interno isTakis que quedaba muerto y solo agregaba ruido. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 800 500"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <g
            className={isLightText ? "stroke-white/10" : "stroke-black/10"}
            fill="none"
            strokeWidth="60"
            strokeLinecap="round"
          >
            <path d="M-50 420 C 200 320, 350 480, 620 360 S 900 260, 900 260" />
            <path d="M-80 120 C 150 40, 300 180, 560 80 S 880 -20, 880 -20" />
          </g>
        </svg>

        <div className="container-page relative grid gap-8 py-14 md:grid-cols-2 md:items-center md:gap-12 md:py-20">
          {/* Ronda 48 (bug reportado por el cliente): el fondo diagonal de
              Ronda 46 usa un clip-path en % — que asume una altura de
              contenido "típica". Con una descripción más larga (o con
              zoom/reflow de WCAG 1.4.10, que agranda el texto), la columna
              de texto crece más de lo previsto y el bloque "Síguelos" +
              iconos termina cayendo sobre la franja AMARILLA del fondo,
              mientras el texto sigue pintado en blanco (isLightText, pensado
              para el morado) — el amarillo se vuelve invisible. La causa de
              fondo es que el contraste dependía de una posición en % de un
              fondo decorativo, no del contenido real: cualquier texto más
              largo que el "caso típico" puede volver a romperlo.
              Fix: en vez de perseguir el % exacto, la columna de texto de
              Takis lleva su propio respaldo sólido bg-takis-purple (con
              padding), por ENCIMA de la capa decorativa (z-10) — así el
              contraste queda garantizado sin importar cuántas líneas mida
              la descripción real, sea cual sea el idioma o el zoom del
              usuario. El morado sólido además es fiel al color base del
              brandbook (mismo tono que ya usa la mitad superior). */}
          <div
            className={`relative z-10 order-2 ${
              isTakis ? "bg-takis-purple px-4 py-5 sm:px-6 sm:py-6" : ""
            } ${brand.imageFirst ? "md:order-2" : "md:order-1"}`}
          >
            {/* Ronda 35: contraste AA. El link y el label "Síguelos" iban a
                /50 (dark) o /60 (light) de opacidad — contra un fondo de
                marca saturado eso cae a ~2.3–3.3:1, muy por debajo del
                4.5:1 que exige AA para texto normal. Como el texto ya usa
                el negro/blanco más oscuro/claro disponible, no hay margen
                para "atenuar" con opacidad: baja de 100% (dark) u 80%
                (light) y deja de pasar en casi todas las marcas (medido
                contra cada color real, no aproximado). La jerarquía visual
                con el heading ahora viene del tamaño/peso, no del color; el
                hover usa underline en vez de "oscurecer más" (ya no hay a
                dónde oscurecer). */}
            <Link
              href="/"
              className={`mb-6 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wide transition-colors hover:underline ${
                isLightText ? "text-white/80 hover:text-white" : "text-black"
              }`}
            >
              <span aria-hidden>←</span> Volver al inicio
            </Link>
            {/* Ronda 44: Takis usa font-takisDisplay (sustituto libre de
                Veneer, ver globals.css) en vez de la Teko compartida por
                el resto del sitio — así el manual de marca diferencia su
                tipografía de comunicación sin tocar las otras 5 marcas.
                Ronda 45: cambia de Bungee a Anton (ver globals.css) y se
                le suma un leve -2° de inclinación + text-shadow doble
                (offset sólido, sin blur — imita el efecto de una segunda
                pasada de pincel/impresión ligeramente desfasada, no un
                drop-shadow difuminado) para acercarse a la pincelada de
                alto impacto de la portada del brandbook (pág. 4). Solo en
                Takis: las otras 5 marcas mantienen Teko sin inclinar. */}
            <h1
              className={`${
                brand.slug === "takis"
                  ? "font-takisDisplay text-4xl leading-[1.05] tracking-wide sm:text-5xl md:text-6xl"
                  : "font-teko text-5xl leading-[0.9] sm:text-6xl md:text-7xl"
              } font-bold uppercase ${brand.heroText}`}
              style={
                brand.slug === "takis"
                  ? {
                      transform: "rotate(-2deg)",
                      textShadow: "3px 3px 0 rgba(87, 15, 139, 0.5)",
                    }
                  : undefined
              }
            >
              {brand.tagline}
            </h1>
            {/* Ronda 37: el ratio de contraste (4.5:1+, ya verificado en la
                Ronda 35) es una condición NECESARIA pero no SUFICIENTE
                para que el texto se lea bien — un peso regular (400) a
                14px sobre un color de marca muy saturado (sobre todo
                rosa/magenta, el caso de Runners) es perceptualmente
                difícil de leer aunque el número pase AA: los trazos
                finos "vibran" ópticamente contra el color de fondo. Se
                sube a font-medium (500, cargado en layout.tsx — no es
                bold falso del navegador) + text-base (antes text-sm),
                igual para las 6 marcas ya que es el mismo componente. */}
            {/* Ronda 47: cuerpo de texto de Takis usa font-takisBody (Acumin
                Pro real, vía kit de Adobe Fonts del cliente — ver
                globals.css/layout.tsx) en vez de la Raleway compartida por
                el resto del sitio, igual que el H1 ya usa font-takisDisplay
                solo para Takis. */}
            <p
              className={`mt-4 max-w-sm text-base font-medium leading-relaxed ${
                isTakis ? "font-takisBody" : "font-body"
              } ${isLightText ? "text-white/80" : "text-black"}`}
            >
              {brand.description}
            </p>

            {/* Redes de la marca — distintas a las corporativas de Barcel
                del Footer. */}
            <div
              className={`mt-6 border-t pt-5 ${isLightText ? "border-white/20" : "border-barcel-black/15"}`}
            >
              <p
                className={`mb-3 font-display text-[11px] font-bold uppercase tracking-wide ${
                  isLightText ? "text-white/80" : "text-black"
                }`}
              >
                Síguelos
              </p>
              {/* Ronda 38: los botones de redes con caja al 10% de opacidad
                  pasaban desapercibidos — se resolvió con caja sólida
                  negra/blanca (ver historial). Ronda 39: el cliente pidió
                  ir más lejos — que la caja "resalte con el color del
                  logo" en vez de negro genérico (ej. amarillo en Runners).
                  Se usa brand.socialBg/socialIcon (mismo acento que
                  heroText, ver Ronda 36), cada par con su propio
                  contraste AA-gráfico verificado contra ESE fondo
                  específico — no es el mismo negro/blanco reciclado de
                  antes, cada marca tiene su combo propio. */}
              <div className="flex items-center gap-2.5">
                {BRAND_SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={`${social.label} de ${brand.name}`}
                    className={`flex h-9 w-9 items-center justify-center shadow-sm transition-transform hover:scale-110 ${brand.socialBg} ${brand.socialIcon}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Productos reales, apilados e inclinados — mismo esquema que
              el referente (dos empaques superpuestos, uno atrás/chico y
              otro al frente/grande), con 1-2 sabores más flotando
              sueltos en las esquinas si hay assets disponibles.

              Ronda 53: esta columna entera se salta para Takis. Causa del
              bug reportado ("logo duplicado, mal posicionado"): el fondo
              del hero (arriba) ya trae horneados el logo TAKIS y el
              personaje, pero esta columna seguía dibujando OTRA copia de
              brand.logo (rama heroVisual==="logo", pensada para la Ronda
              57 cuando el fondo era solo morado liso) encima — de ahí la
              duplicación. Con el hero nuevo la imagen de fondo ya es la
              composición completa; no hay nada que esta columna deba
              aportar para Takis. */}
          {!isTakis && (
          <div
            className={`relative order-1 flex items-center justify-center py-10 md:py-0 ${
              brand.imageFirst ? "md:order-1" : "md:order-2"
            }`}
          >
            {/* Los assets (logo/producto) se ajustan al espacio del hero
                (arriba) con max-height en dvh — nunca al revés. Así un
                logo o una foto grande nunca vuelve a inflar la sección,
                pase lo que pase con el asset de cada marca. */}
            {brand.heroVisual === "logo" ? (
              // Logo protagonista + producto SUELTO (heroImage — sin
              // empaque) tilteado junto a él. Sin bagImages/accentImages:
              // esa composición de empaques es para las marcas que sí
              // tienen fotografía de bolsa.
              <div className="relative z-10 flex items-center justify-center">
                {(brand.logo ?? brand.logoHover) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={brand.logo ?? brand.logoHover}
                    alt={`${brand.name}®`}
                    className="h-auto max-h-[clamp(220px,42dvh,460px)] w-auto max-w-[85%] object-contain drop-shadow-2xl"
                  />
                )}
                {brand.heroImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={brand.heroImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute bottom-2 right-2 z-20 h-auto max-h-[clamp(90px,16dvh,180px)] w-auto rotate-[24deg] object-contain drop-shadow-2xl sm:bottom-4 sm:right-4"
                  />
                )}
              </div>
            ) : (
              // Caja con tamaño explícito (a diferencia de la rama del
              // logo): cuando hay 2 empaques, AMBOS quedan posicionados en
              // absolute (para apilarlos/inclinarlos), así que ninguno
              // aporta tamaño natural al contenedor — necesita uno propio
              // para que el posicionamiento por porcentaje tenga sentido.
              <div className="relative z-10 flex h-[clamp(240px,44dvh,440px)] w-[clamp(240px,44dvh,440px)] items-center justify-center">
                {bagImages.length >= 2 ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={bagImages[0]}
                      alt=""
                      aria-hidden="true"
                      className="absolute left-[8%] top-[10%] z-0 h-auto max-h-[clamp(140px,26dvh,260px)] w-auto -rotate-6 object-contain opacity-90 drop-shadow-2xl"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={bagImages[1]}
                      alt={`${brand.name}®`}
                      className="absolute bottom-[6%] right-[4%] z-10 h-auto max-h-[clamp(170px,32dvh,320px)] w-auto rotate-6 object-contain drop-shadow-2xl"
                    />
                  </>
                ) : (
                  bagImages[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={bagImages[0]}
                      alt={`${brand.name}®`}
                      className="h-auto max-h-[clamp(180px,34dvh,340px)] w-auto object-contain drop-shadow-2xl"
                    />
                  )
                )}
                {accentImages[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={accentImages[0]}
                    alt=""
                    aria-hidden="true"
                    className="absolute right-[2%] top-[2%] z-20 h-auto max-h-[clamp(70px,14dvh,140px)] w-auto rotate-[18deg] object-contain drop-shadow-xl"
                  />
                )}
                {accentImages[1] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={accentImages[1]}
                    alt=""
                    aria-hidden="true"
                    className="absolute bottom-[2%] left-[2%] z-20 h-auto max-h-[clamp(70px,14dvh,140px)] w-auto rotate-[-20deg] object-contain drop-shadow-xl"
                  />
                )}
              </div>
            )}
          </div>
          )}
        </div>
      </section>
      )}

      {/* Portafolio de productos — protagonista de la página, no escondido
          en un acordeón: es la razón por la que alguien entra a esta
          página de marca. Slider continuo (mismo mecanismo que el
          marquee de logos del Home), pausa al pasar el cursor para poder
          hacer clic con calma sobre cualquier SKU. */}
      <section id="portafolio" className="scroll-mt-20 bg-white py-16 md:py-20">
        <div className="container-page">
          <h2 className="font-teko text-3xl font-bold uppercase text-barcel-red md:text-4xl">
            Portafolio de productos
          </h2>
          {brand.flavors && brand.flavors.length > 0 ? (
            <p className="mt-2 max-w-xl font-body text-sm text-barcel-black/70 md:text-base">
              Pasa el cursor para pausar el carrusel y haz clic en tu sabor
              favorito para verlo de cerca.
            </p>
          ) : (
            <p className="mt-2 max-w-xl font-body text-sm text-barcel-black/70 md:text-base">
              Muy pronto vas a poder ver aquí todas las presentaciones de{" "}
              {brand.name}
              <sup>®</sup>.
            </p>
          )}
        </div>

        {brand.flavors && brand.flavors.length > 0 && (
          <div className="container-page mt-8">
            <ProductSlider
              brandName={brand.name}
              brandSlug={brand.slug}
              flavors={brand.flavors}
              hoverBg={brand.hoverBg}
              hoverText={brand.hoverText}
            />
          </div>
        )}
      </section>

      {/* Explora otras marcas — reemplaza al hub: cada página de marca
          enlaza directo a las demás, sin pasar por una pantalla intermedia.
          Ronda 30: se eliminó la sección "Dónde encontrarla" que vivía
          aquí (quedaba duplicada con el modal "¿Dónde comprar?" de la
          página de producto, y con contenido más pobre — un párrafo
          genérico contra tiendas reales con link). Con esa sección fuera,
          "Explora otras marcas" pasa a ser el cierre de la página, así
          que se le subió la jerarquía (encabezado tipo Teko, igual que
          "Portafolio de productos" y "También te puede antojar", en vez
          del label chiquito que tenía antes) y fondo cream para separarla
          visualmente del blanco del portafolio de arriba. */}
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
