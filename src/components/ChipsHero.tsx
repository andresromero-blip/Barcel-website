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
// agrega aquí como overlay — pero calcado al mismo recuadro que ocupa el
// wordmark TAKIS dentro de SU banner (medido a mano sobre
// public/takis/hero-banner.jpg, 1920x1080): arranca a ~52% del ancho y
// ~9% del alto, y ocupa ~40% del ancho de la sección. Mismo par de
// valores para desktop Y mobile (ambos layouts comparten la misma imagen
// de fondo con la misma proporción, así que el % cae en el mismo lugar
// visual en los dos).
const LOGO_BOX =
  "absolute right-[8%] top-[9%] w-[40%] h-auto object-contain drop-shadow-2xl";

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
            <img src={brand.logo} alt={`${brand.name}®`} className={LOGO_BOX} />
          )}
        </div>
        <div className="px-4 py-6 sm:px-6">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wide text-white/80 transition-colors hover:text-white hover:underline"
          >
            <span aria-hidden>←</span> Volver al inicio
          </Link>
          <h1 className="font-teko text-5xl font-bold uppercase leading-[0.9] text-white">
            {brand.tagline}
          </h1>
          <p className="mt-4 max-w-sm font-body text-base font-medium leading-relaxed text-white/80">
            {brand.description}
          </p>
          {followText}
        </div>
      </section>

      {/* Desktop (md+): mismo fix de porcentaje que Ronda 71 de Takis —
          ver nota arriba. */}
      <section className="relative hidden flex-col justify-center overflow-hidden bg-chips-brown md:flex md:aspect-[1920/1080]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CHIPS_HERO_BG}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-right-bottom"
        />
        {/* Ronda 94: aquí el % SÍ se calcula contra la sección completa a
            propósito — a diferencia de mobile, en desktop la sección
            entera tiene el aspect-ratio fijo de la imagen (md:aspect-
            [1920/1080]), así que sección e imagen miden exactamente lo
            mismo y el % cae en el lugar correcto sin envoltura extra. */}
        {brand.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={brand.logo} alt={`${brand.name}®`} className={LOGO_BOX} />
        )}

        <div className="relative flex w-full items-center px-5 py-14 sm:px-10 md:px-[4%] md:py-20 lg:px-[5%]">
          <div className="relative z-10 w-full max-w-[420px] bg-chips-brown px-4 py-5 sm:max-w-[460px] sm:px-6 sm:py-6">
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
        </div>
      </section>
    </>
  );
}
