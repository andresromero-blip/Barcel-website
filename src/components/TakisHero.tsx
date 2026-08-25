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

export default function TakisHero({ brand }: { brand: Brand }) {
  return (
    <section className="relative flex min-h-[clamp(440px,40vw,680px)] flex-col justify-center overflow-hidden bg-takis-purple">
      {/* Ronda 55 (revertido en Ronda 57): object-contain no recorta,
          pero cuando el contenedor no calza con el aspect ratio real de
          la imagen (1920x1080) deja una franja sólida a un lado — esa
          franja no tiene la textura/degradado del JPG, así que se ve
          como una costura/corte visible (reportado por el cliente).
          Ronda 57: se vuelve a object-cover (sin costura, siempre
          full-bleed) y en vez de pelear con el alto en vh (que no
          escala con el ancho de pantalla), el alto mínimo ahora es
          proporcional al ANCHO (40vw) — así el recorte vertical que
          exige object-cover en una sección tan ancha y corta siempre
          cae por DEBAJO del logo (recorta cuerpo del personaje/textura
          sobrante, nunca el arte de marca), sin importar qué tan ancha
          sea la pantalla. object-position "right top" fija el recorte
          horizontal a la derecha (donde vive el logo/personaje) y el
          vertical arriba (0%, nunca se come el logo). */}
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
        </div>
      </div>
    </section>
  );
}
