import Link from "next/link";
import type { Brand } from "@/data/brands";

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
          página de marca. */}
      {brand.flavors && brand.flavors.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="container-page">
            <h2 className="font-teko text-3xl font-bold uppercase text-barcel-red md:text-4xl">
              Portafolio de productos
            </h2>
            <p className="mt-2 max-w-xl font-body text-sm text-barcel-black/70 md:text-base">
              Todas las presentaciones de {brand.name}
              <sup>®</sup> disponibles hoy.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
              {brand.flavors.map((flavor) => (
                <div
                  key={flavor.name}
                  className={`flex flex-col items-center gap-3 border border-barcel-black/10 p-5 text-center`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={flavor.image}
                    alt={`${brand.name}® ${flavor.name}`}
                    className="h-32 w-auto object-contain sm:h-36"
                  />
                  <span className="font-display text-xs font-bold uppercase leading-tight text-barcel-black">
                    {flavor.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
