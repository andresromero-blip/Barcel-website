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
  const heroSrc = brand.heroImage ?? brand.logoHover ?? brand.logo;

  return (
    <>
      {/* Hero — color sólido de marca, wordmark gigante de textura, texto
          legible siempre dentro de una tarjeta blanca (contraste AA
          garantizado sin importar el color de cada marca). */}
      <section className={`relative overflow-hidden ${brand.bg}`}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 left-1/2 w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-teko text-[22vw] font-bold uppercase leading-none text-white/15 md:-bottom-10"
        >
          {brand.name}
        </span>

        {/* Logo real de la marca, esquina superior derecha del banner */}
        {brand.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={brand.logo}
            alt={`${brand.name}®`}
            className="absolute right-5 top-5 z-10 h-8 w-auto object-contain drop-shadow-md sm:right-8 sm:top-8 sm:h-10 md:h-12"
          />
        )}

        <div className="container-page relative grid gap-8 py-14 md:min-h-[520px] md:grid-cols-2 md:items-center md:gap-12 md:py-20">
          <div
            className={`relative bg-white p-7 shadow-xl md:p-10 ${
              brand.imageFirst ? "md:order-2" : "md:order-1"
            }`}
          >
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wide text-barcel-black/50 transition-colors hover:text-barcel-red"
            >
              <span aria-hidden>←</span> Volver al inicio
            </Link>
            <h1 className="font-display text-3xl font-black text-barcel-black md:text-4xl">
              {brand.name}
              <sup className="ml-1 text-[0.4em]">®</sup>
            </h1>
            <p className={`mt-2 font-display text-sm font-bold md:text-base ${brand.textOnBg}`}>
              {brand.tagline}
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-barcel-black/70">
              {brand.description}
            </p>

            {/* Redes de la marca — distintas a las corporativas de Barcel
                del Footer. */}
            <div className="mt-6 border-t border-barcel-black/10 pt-5">
              <p className="mb-3 font-display text-[11px] font-bold uppercase tracking-wide text-barcel-black/50">
                Síguelos
              </p>
              <div className="flex items-center gap-2.5">
                {BRAND_SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={`${social.label} de ${brand.name}`}
                    className="flex h-9 w-9 items-center justify-center bg-barcel-black/5 text-barcel-black transition-colors hover:bg-barcel-black hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`relative flex items-center justify-center py-6 md:py-0 ${
              brand.imageFirst ? "md:order-1" : "md:order-2"
            }`}
          >
            {heroSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroSrc}
                alt={`${brand.name}®`}
                className="h-56 w-auto max-w-[75%] object-contain drop-shadow-2xl sm:h-72 md:h-[26rem]"
              />
            )}
          </div>
        </div>
      </section>

      {/* Portafolio de productos — protagonista de la página, no escondido
          en un acordeón: es la razón por la que alguien entra a esta
          página de marca. Slider continuo (mismo mecanismo que el
          marquee de logos del Home), pausa al pasar el cursor para poder
          hacer clic con calma sobre cualquier SKU. */}
      <section className="bg-white py-16 md:py-20">
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
            <ProductSlider brandName={brand.name} flavors={brand.flavors} />
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
                className="border border-barcel-black/15 px-4 py-2 font-display text-sm font-bold text-barcel-black transition-colors hover:border-barcel-black"
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
