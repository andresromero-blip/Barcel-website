import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SearchProvider } from "@/components/SearchContext";
import Header from "@/components/Header";
import BrandPage from "@/components/BrandPage";
import Footer from "@/components/Footer";
import { brands } from "@/data/brands";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const brand = brands.find((b) => b.slug === params.slug);
  if (!brand) return { title: "Marca no encontrada | Barcel" };
  return {
    title: `${brand.name} | Barcel`,
    description: brand.description,
  };
}

export default function BrandRoute({ params }: { params: { slug: string } }) {
  const brand = brands.find((b) => b.slug === params.slug);
  if (!brand) notFound();

  const otherBrands = brands.filter((b) => b.slug !== brand.slug);

  return (
    <SearchProvider>
      <Header />
      <main>
        <BrandPage brand={brand} otherBrands={otherBrands} />
      </main>
      <Footer />
    </SearchProvider>
  );
}
