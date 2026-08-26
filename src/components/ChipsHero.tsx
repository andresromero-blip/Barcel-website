import Link from "next/link";
import { BRAND_SOCIALS, type Brand } from "@/data/brands";

// Ronda 93: "todo mal, vamos por pasos — usa esta imagen para el hero
// banner y replica todo lo aplicado a responsive que hicimos en Takis".
// Este componente clona el MECANISMO responsive de TakisHero.tsx (ver esa
// nota completa para el razonamiento original) — no su tratamiento
// tipográfico (Takis usa font-takisDisplay + rotación -2° + text-shadow
// como acento de marca propio del brandbook; Chip's se queda con su
// propio font-teko sin inclinar, igual que ya usaba en BrandPage.tsx).
//
// El mecanismo que SÍ se replica 1:1:
//   - Desktop (md+): imagen de fondo full-bleed (absolute inset-0,
//     object-cover) dentro de una sección con aspect-ratio fijo (evita que
//     el fondo compita por altura con el texto — ver nota Ronda 69/70 en
//     TakisHero.tsx), con una tarjeta de texto opaca (bg-chips-brown, no
//     transparente) posicionada con padding en PORCENTAJE del ancho
//     (px-[4%]/[5%], no píxeles fijos) para que el borde de la tarjeta
//     escale 1:1 con la imagen en cualquier ancho de viewport (fix del
//     bug de Ronda 71 en Takis: en monitores ultra anchos un padding fijo
//     deja un hueco enorme entre el texto y el sujeto de la foto).
//   - Mobile (debajo de md): SIN overlay — la imagen va apilada arriba
//     (img normal, w-full h-auto, respeta su aspect ratio real) y el
//     bloque de texto va debajo en un fondo sólido, nunca superpuesto.
//     Así la imagen nunca se recorta sin importar cuánto texto traiga la
//     descripción.
//
// Solo hay UN asset ("Hero banner.png" del cliente, mesa de madera +
// tazón de Chip's, 1372x768) — a diferencia de Takis (que tiene dos
// composiciones distintas, una recortada a propósito para mobile), aquí
// se reutiliza la misma imagen en los dos layouts. object-right-bottom
// mantiene visible el tazón (esquina inferior derecha de la foto) tanto
// en el crop de escritorio como en el ancho completo de mobile.
const CHIPS_HERO_BG = "/products/chips/hero-banner.jpg";

// Ronda 94: "suma el logo al hero banner manteniendo la misma proporción
// y ubicación que el de Takis". A diferencia de Chip's, el TAKIS del
// hero de Takis no es un <img> aparte — viene horneado directo en el
// pixel del banner (ver nota Ronda 53 en TakisHero.tsx: "una sola pieza
// ... personaje + banda amarilla a la derecha"). Como Chip's no tiene esa
// composición pre-armada, el logo real (brand.logo, PNG transparente) se
// agrega aquí como overlay — calcado (en su momento) al recuadro que
// ocupa el wordmark TAKIS dentro de SU banner. Mobile no recibió ajustes
// en la Ronda 95 (ver abajo), así que conserva ese valor original.
const LOGO_BOX_MOBILE =
  "absolute right-[8%] top-[9%] w-[40%] h-auto object-contain drop-shadow-2xl";

// Ronda 95: el cliente mandó una captura del hero de escritorio EN VIVO
// con 3 anotaciones dibujadas a mano (rectángulo violeta = logo,
// rectángulo blanco = contenedor de texto, círculo = dónde debe
// "sobresalir" el tazón de papas) y pidió mover el logo y el contenedor
// de info a esos recuadros. Las posiciones no se estimaron a ojo: la
// captura (2042x902) se analizó con Python/PIL+scipy (detección de
// blobs por color + bounding box) para sacar coordenadas exactas:
//   - Rectángulo violeta (logo):   x=[755,1519] y=[86,605]  → left 37.0%,
//     top 9.5%, ancho 37.4% del recuadro de la sección.
//   - Rectángulo blanco (info):    x=[104,665]  y=[84,777]  → left 5.1%,
//     top 9.3%, ancho 27.5% (ese ancho YA coincidía con el max-w-[420px]
//     actual, así que solo cambia la posición, no el tamaño).
//   - Círculo (tazón de papas):    centro ~(88%, 89%), ya cubierto por
//     object-right-bottom sin cambios — confirmado con screenshot en
//     vivo antes de tocar código (el tazón ya sobresale en esa esquina).
// El logo se movió de left~52%/w-40% a left~37%/w-37% (top se queda en
// 9%, ya coincidía). Como el rectángulo blanco solo aplica al layout de
// ESCRITORIO (la captura del cliente es 2042x902, claramente desktop),
// se separa LOGO_BOX_DESKTOP de LOGO_BOX_MOBILE en vez de reusar una
// sola constante — mobile no se tocó.
const LOGO_BOX_DESKTOP =
  "absolute left-[37%] top-[9%] w-[37%] h-auto object-contain drop-shadow-2xl";

export default function ChipsHero({ brand }: { brand: Brand }) {
  const followText = (
    <div className="mt-6 border-t border-white/20 pt-5">
      <p className="mb-3 font-display text-[11px] font-bold uppercase tracking-wide text-white/80">
        Síguelos
      </p>
      <div className="flex items-center gap-2.5">
        {BRAND_SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={`${social.label} de ${brand.name}`}
            className="flex h-9 w-9 items-center justify-center bg-chips-terracotta text-white shadow-sm transition-transform hover:scale-110"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d={social.path} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile (debajo de md): imagen apilada arriba, sin overlay — ver
          nota completa arriba. */}
      <section className="relative overflow-hidden bg-chips-brown md:hidden">
        {/* Envoltura propia (relative) para que el % del logo se calcule
            contra el alto de la IMAGEN, no contra el alto de toda la
            sección (que en mobile también incluye el bloque de texto de
            abajo) — si el logo se posicionara contra la sección completa,
            "top-[9%]" caería mucho más abajo de lo esperado. */}
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CHIPS_HERO_BG}
            alt=""
            aria-hidden="true"
            className="block h-auto w-full"
          />
          {brand.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={brand.logo} alt={`${brand.name}®`} className={LOGO_BOX_MOBILE} />
          )}
        </div>
        <div className="px-4 py-6 sm:px-6">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wide text-white/80 transition-colors hover:text-white hover:underline"
          >
            <span aria-hidden>←</span> Volver al inicio
          </Link>
          <h1 className="font-introhead text-5xl font-bold uppercase leading-[0.9] text-white">
            {brand.tagline}
          </h1>
          <p className="mt-4 max-w-sm font-body text-base font-medium leading-relaxed text-white/80">
            {brand.description}
          </p>
          {followText}
        </div>
      </section>

      {/* Desktop (md+): Ronda 95 — logo y contenedor de info ahora se
          posicionan con "position: absolute" + %, calcados a los
          recuadros de la anotación del cliente (ver nota completa
          arriba). Se abandona el wrapper "flex items-center" que
          centraba verticalmente el contenedor de info — el cliente pidió
          explícitamente que quede arriba (top~9%), alineado con el
          logo, no centrado. Padding-percentage no sirve aquí porque el
          spec CSS calcula "padding-top: %" contra el ANCHO del
          contenedor, no el alto — por eso se usa "top-[%]" en un
          elemento absolute (igual que ya hace LOGO_BOX), que sí calcula
          contra el alto real de la sección. */}
      <section className="relative hidden overflow-hidden bg-chips-brown md:block md:aspect-[1920/1080]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CHIPS_HERO_BG}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-right-bottom"
        />
        {/* El % se calcula contra la sección completa a propósito — en
            desktop la sección entera tiene el aspect-ratio fijo de la
            imagen (md:aspect-[1920/1080]), así que sección e imagen
            miden exactamente lo mismo y el % cae en el lugar correcto
            sin envoltura extra. */}
        {brand.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={brand.logo} alt={`${brand.name}®`} className={LOGO_BOX_DESKTOP} />
        )}

        <div className="absolute left-[5%] top-[9%] z-10 w-full max-w-[420px] bg-chips-brown px-4 py-5 sm:max-w-[460px] sm:px-6 sm:py-6">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wide text-white/80 transition-colors hover:text-white hover:underline"
          >
            <span aria-hidden>←</span> Volver al inicio
          </Link>
          <h1 className="font-teko text-5xl font-bold uppercase leading-[0.9] text-white sm:text-6xl md:text-7xl">
            {brand.tagline}
          </h1>
          <p className="mt-4 max-w-sm font-body text-base font-medium leading-relaxed text-white/80">
            {brand.description}
          </p>
          {followText}
        </div>
      </section>
    </>
  );
}
