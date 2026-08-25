import Link from "next/link";
import { BRAND_SOCIALS, type Brand } from "@/data/brands";

// Ronda 54: el cliente mandó un mockup pidiendo que la página de
// detalle de sabor (/marcas/takis/[flavor]) reutilice EXACTAMENTE el
// mismo hero de la página de marca (/marcas/takis) — mismo fondo, mismo
// tagline de marca (no un H1 con el nombre del sabor), misma
// descripción, mismo bloque "Síguelos". En vez de duplicar ~100 líneas
// de JSX entre BrandPage.tsx y ProductDetail.tsx, se extrae aquí como
// componente compartido; BrandPage.tsx también lo usa ahora para
// garantizar que ambas páginas queden 1:1 sin poder desincronizarse.
const TAKIS_HERO_BG = "/takis/hero-banner.jpg";
// Ronda 70: asset dedicado para mobile (1200x900, 4:3) — mismo arte,
// recompuesto por el cliente para verse bien en un layout apilado.
const TAKIS_HERO_BG_MOBILE = "/takis/hero-banner-mobile.jpg";

export default function TakisHero({ brand }: { brand: Brand }) {
  // Ronda 70: el cliente marcó "el hero banner en pantallas mobile no
  // es funcional" y pidió no tocar NADA de cómo se ve en desktop.
  //
  // Causa raíz real del problema en mobile: la versión de escritorio
  // (Ronda 69) resolvió el recorte poniendo la imagen de fondo en
  // position:absolute cubriendo TODA la sección, con el texto
  // (tagline/descripción/Síguelos) flotando ENCIMA en un segundo layer
  // — eso obliga a que la sección tenga una sola altura que sirva para
  // dos cosas a la vez: mostrar la imagen completa (aspect-ratio fijo,
  // 1920x1080) Y darle espacio al bloque de texto (que varía según el
  // tagline/descripción de cada marca). Esas dos necesidades de altura
  // compiten: si la sección crece para que quepa el texto, la imagen de
  // fondo (h-full, object-cover) se estira/recorta para cubrir esa
  // altura extra — literalmente el mismo bug que Ronda 69 arregló para
  // desktop, pero ahora causado por el texto en vez de por un clamp fijo.
  //
  // En vez de intentar exprimir ese mismo mecanismo (overlay absoluto)
  // para mobile con un segundo aspect-ratio, se separa el layout de
  // mobile en dos bloques apilados normales, sin overlay ni position:
  // absolute — la imagen (<img> con w-full h-auto, que respeta su
  // aspect ratio real de forma nativa sin ninguna regla CSS especial)
  // arriba, y el bloque de texto (fondo sólido morado, sin transparencia
  // que dependa de la imagen) debajo. Así la imagen NUNCA compite por
  // altura con nada — es imposible que se recorte, sin importar cuánto
  // texto traiga el tagline/descripción de cada sabor.
  //
  // El bloque <section> de desktop (md:) se deja completamente intacto,
  // tal cual quedó en Ronda 69 — solo se le agrega "hidden md:flex" para
  // alternar con el bloque de mobile, ninguna otra clase cambia.
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
            className="flex h-9 w-9 items-center justify-center bg-white text-barcel-black shadow-sm transition-transform hover:scale-110"
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
      {/* Mobile (debajo de md): imagen apilada arriba, sin overlay —
          ver nota completa arriba. */}
      <section className="relative overflow-hidden bg-takis-purple md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TAKIS_HERO_BG_MOBILE}
          alt=""
          aria-hidden="true"
          className="block h-auto w-full"
        />
        <div className="px-4 py-6 sm:px-6">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wide text-white/80 transition-colors hover:text-white hover:underline"
          >
            <span aria-hidden>←</span> Volver al inicio
          </Link>
          <h1
            className="font-takisDisplay text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white"
            style={{
              transform: "rotate(-2deg)",
              textShadow: "3px 3px 0 rgba(87, 15, 139, 0.5)",
            }}
          >
            {brand.tagline}
          </h1>
          <p className="mt-4 max-w-sm font-takisBody text-base font-medium leading-relaxed text-white/80">
            {brand.description}
          </p>
          {followText}
        </div>
      </section>

      {/* Desktop (md+): igual que en Ronda 69, sin ningún cambio. */}
      <section className="relative hidden flex-col justify-center overflow-hidden bg-takis-purple md:flex md:aspect-[1920/1080]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TAKIS_HERO_BG}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-right-top"
        />

        <div className="container-page relative grid gap-8 py-14 md:grid-cols-2 md:items-center md:gap-12 md:py-20">
          <div className="relative z-10 order-2 bg-takis-purple px-4 py-5 sm:px-6 sm:py-6 md:order-1">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wide text-white/80 transition-colors hover:text-white hover:underline"
            >
              <span aria-hidden>←</span> Volver al inicio
            </Link>
            <h1
              className="font-takisDisplay text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white sm:text-5xl md:text-6xl"
              style={{
                transform: "rotate(-2deg)",
                textShadow: "3px 3px 0 rgba(87, 15, 139, 0.5)",
              }}
            >
              {brand.tagline}
            </h1>
            <p className="mt-4 max-w-sm font-takisBody text-base font-medium leading-relaxed text-white/80">
              {brand.description}
            </p>
            {followText}
          </div>
        </div>
      </section>
    </>
  );
}
