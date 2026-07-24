import Link from "next/link";
import type { Brand } from "@/data/brands";
import ProductSlider from "./ProductSlider";

// Redes propias de cada marca (NO las corporativas de Barcel, que ya
// viven en el Footer). Placeholders (#) hasta contar con las cuentas
// reales de cada marca — el diseño y la ubicación ya quedan resueltos.
const BRAND_SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    path: "M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.5.5.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53C6.09.28 6.82.11 7.88.06 8.94.01 9.28 0 12 0Zm0 5.35A6.65 6.65 0 1 0 12 18.65 6.65 6.65 0 0 0 12 5.35Zm0 10.97A4.32 4.32 0 1 1 12 7.68a4.32 4.32 0 0 1 0 8.64ZM18.9 5.1a1.56 1.56 0 1 1-3.12 0 1.56 1.56 0 0 1 3.12 0Z",
  },
  {
    label: "TikTok",
    href: "#",
    path: "M16.6 5.82c-.9-.79-1.5-1.9-1.6-3.15V2h-3.4v13.4a2.6 2.6 0 1 1-2.15-2.56v-3.44a5.99 5.99 0 0 0-1.05-.09A6.01 6.01 0 1 0 14.4 15.4V9.13a8.9 8.9 0 0 0 5.2 1.67V7.4a5.6 5.6 0 0 1-2.99-1.58z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
  },
];

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
  const isLightText = brand.heroText === "text-white";

  return (
    <>
      {/* Hero — color sólido de marca con formas decorativas sutiles de
          fondo (mismo tono, solo una capa translúcida más para dar
          textura, igual que el referente). El texto va directo sobre el
          color de marca (sin tarjeta blanca) usando heroText — mismo par
          de contraste AA ya verificado para hoverText/hoverBg. Sin logo
          ni nombre de marca como texto: el producto real (con su propio
          empaque impreso) es quien comunica la marca.

          ALTURA — regla definida y validada con el cliente (no volver a
          cambiar sin acordarlo de nuevo): min-height fluido con clamp(),
          NUNCA 100vh/100dvh completo ni una altura fija en px.
            - Piso 480px: nunca se ve aplastado en celulares en horizontal.
            - Medio 60dvh: se adapta al viewport real (dvh, no vh — vh
              "salta" en mobile cuando aparece/desaparece la barra de
              direcciones del navegador).
            - Techo 760px: en monitores grandes no ocupa toda la pantalla
              ni esconde la señal de que hay más contenido abajo.
          Es min-height (no height fija) a propósito: WCAG 1.4.4 (Resize
          Text) y 1.4.10 (Reflow) exigen que el contenido nunca se
          recorte ni se superponga al agrandar el texto o achicar el
          viewport — si la descripción de una marca es más larga, la
          sección crece, nunca recorta. `flex flex-col justify-center`
          centra el contenido verticalmente en ese espacio en vez de
          dejarlo pegado arriba cuando el contenido es más corto que el
          mínimo garantizado. */}
      <section
        className={`relative flex min-h-[clamp(480px,60dvh,760px)] flex-col justify-center overflow-hidden ${brand.bg}`}
      >
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
          <div
            className={`relative z-10 ${brand.imageFirst ? "md:order-2" : "md:order-1"}`}
          >
            <Link
              href="/"
              className={`mb-6 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wide transition-colors ${
                isLightText
                  ? "text-white/60 hover:text-white"
                  : "text-barcel-black/50 hover:text-barcel-black"
              }`}
            >
              <span aria-hidden>←</span> Volver al inicio
            </Link>
            <h1
              className={`font-teko text-5xl font-bold uppercase leading-[0.9] sm:text-6xl md:text-7xl ${brand.heroText}`}
            >
              {brand.tagline}
            </h1>
            <p
              className={`mt-4 max-w-sm font-body text-sm leading-relaxed ${
                isLightText ? "text-white/80" : "text-barcel-black/70"
              }`}
            >
              {brand.description}
            </p>

            {brand.flavors && brand.flavors.length > 0 && (
              <a
                href="#portafolio"
                className={`mt-6 inline-flex min-h-[44px] items-center gap-1.5 bg-white px-6 py-3 font-display text-xs font-extrabold uppercase tracking-wide shadow-md transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 ${brand.textOnBg}`}
              >
                Ver portafolio
                <span aria-hidden>→</span>
              </a>
            )}

            {/* Redes de la marca — distintas a las corporativas de Barcel
                del Footer. */}
            <div
              className={`mt-6 border-t pt-5 ${isLightText ? "border-white/20" : "border-barcel-black/15"}`}
            >
              <p
                className={`mb-3 font-display text-[11px] font-bold uppercase tracking-wide ${
                  isLightText ? "text-white/60" : "text-barcel-black/50"
                }`}
              >
                Síguelos
              </p>
              <div className="flex items-center gap-2.5">
                {BRAND_SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={`${social.label} de ${brand.name}`}
                    className={
                      isLightText
                        ? "flex h-9 w-9 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white hover:text-barcel-black"
                        : "flex h-9 w-9 items-center justify-center bg-barcel-black/10 text-barcel-black transition-colors hover:bg-barcel-black hover:text-white"
                    }
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
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
              sueltos en las esquinas si hay assets disponibles. */}
          <div
            className={`relative flex items-center justify-center py-10 md:py-0 ${
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
        </div>
      </section>

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
              flavors={brand.flavors}
              hoverBg={brand.hoverBg}
              hoverText={brand.hoverText}
            />
          </div>
        )}
      </section>

      {/* Dónde encontrarla */}
      <section className="bg-barcel-cream py-10">
        <div className="container-page">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-barcel-black">
            Dónde encontrarla
          </h2>
          <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-barcel-black/70">
            Disponible en tiendas de conveniencia, supermercados y
            autoservicios a nivel nacional.
          </p>
        </div>
      </section>

      {/* Explora otras marcas — reemplaza al hub: cada página de marca
          enlaza directo a las demás, sin pasar por una pantalla intermedia. */}
      <section className="bg-white py-12">
        <div className="container-page">
          <h2 className="font-display text-xs font-bold uppercase tracking-wide text-barcel-black/50">
            Explora otras marcas
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {otherBrands.map((b) => (
              <Link
                key={b.slug}
                href={`/marcas/${b.slug}`}
                className={`border border-barcel-black/15 px-4 py-2 font-display text-sm font-bold text-barcel-black transition-colors hover:border-transparent ${b.hoverBg} ${b.hoverText}`}
              >
                {b.name}
                <sup className="text-[0.6em]">®</sup>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
