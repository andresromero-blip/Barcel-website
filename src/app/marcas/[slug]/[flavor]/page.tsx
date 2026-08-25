import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SearchProvider } from "@/components/SearchContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { brands } from "@/data/brands";

// Solo genera páginas para los sabores que ya tienen slug (Ronda 27:
// los 8 sabores de Takis por ahora) — el resto de marcas sigue usando
// el modal rápido del slider hasta que se construya su propia página.
export function generateStaticParams() {
  return brands.flatMap((brand) =>
    (brand.flavors ?? [])
      .filter((f) => f.slug)
      .map((f) => ({ slug: brand.slug, flavor: f.slug as string }))
  );
}

export function generateMetadata({
  params,
}: {
  params: { slug: string; flavor: string };
}): Metadata {
  const brand = brands.find((b) => b.slug === params.slug);
  const flavor = brand?.flavors?.find((f) => f.slug === params.flavor);
  if (!brand || !flavor) return { title: "Producto no encontrado | Barcel" };
  return {
    title: `${brand.name} ${flavor.name} | Barcel`,
    description: flavor.description ?? brand.description,
  };
}

export default function ProductRoute({
  params,
}: {
  params: { slug: string; flavor: string };
}) {
  const brand = brands.find((b) => b.slug === params.slug);
  const flavor = brand?.flavors?.find((f) => f.slug === params.flavor);
  if (!brand || !flavor) notFound();

  // Ronda 28: slider infinito (mismo mecanismo que el portafolio), así
  // que ya no hace falta limitar a 3 — se muestran todos los demás
  // sabores con página propia.
  const related = (brand.flavors ?? []).filter(
    (f) => f.slug && f.slug !== flavor.slug
  );
  // Ronda 54: la página de detalle de Takis reemplaza "también te puede
  // antojar" (antes: otros sabores del mismo Takis) por las otras 5
  // marcas del portafolio Barcel — mismo dato que ya usa /marcas/[slug].
  const otherBrands = brands.filter((b) => b.slug !== brand.slug);

  return (
    <SearchProvider>
      <Header />
      <main>
        <ProductDetail
          brand={brand}
          flavor={flavor}
          related={related}
          otherBrands={otherBrands}
        />
      </main>
      <Footer />
    </SearchProvider>
  );
}
