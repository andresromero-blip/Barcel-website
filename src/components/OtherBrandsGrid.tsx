import Link from "next/link";
import type { Brand } from "@/data/brands";

// Ronda 54: extraído de BrandPage.tsx ("Explora otras marcas") para
// reutilizarlo tal cual en la página de detalle de sabor de Takis
// ("También te puede antojar" del mockup — mismas 5 marcas, mismo
// diseño de pill con cuadro de color, no el slider de sabores del
// mismo brand que usaba antes RelatedProductsSlider).
export default function OtherBrandsGrid({
  brands,
  heading,
  subheading,
}: {
  brands: Brand[];
  heading: string;
  subheading?: string;
}) {
  return (
    <div className="container-page">
      <h2 className="font-teko text-3xl font-bold uppercase text-barcel-black md:text-4xl">
        {heading}
      </h2>
      {subheading && (
        <p className="mt-1 font-body text-sm text-barcel-black/60">{subheading}</p>
      )}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {brands.map((b) => (
          <Link
            key={b.slug}
            href={`/marcas/${b.slug}`}
            className={`group flex items-center gap-3 border-2 border-barcel-black/10 bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-md ${b.hoverBg} ${b.hoverText}`}
          >
            <span aria-hidden="true" className={`h-3 w-3 shrink-0 ${b.bg}`} />
            <span className="font-display text-sm font-bold uppercase tracking-wide">
              {b.name}
              <sup className="text-[0.6em]">®</sup>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
