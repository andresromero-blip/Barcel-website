import type { Metadata } from "next";
import { SearchProvider } from "@/components/SearchContext";
import Header from "@/components/Header";
import MarcasCatalog from "@/components/MarcasCatalog";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nuestras marcas | Barcel",
  description:
    "Descubre todas las marcas del universo Barcel: Chip's, Takis, Big Mix, Runners, Hot Nuts y Golden Nuts.",
};

export default function MarcasPage() {
  return (
    <SearchProvider>
      <Header />
      <main>
        <MarcasCatalog />
      </main>
      <Footer />
    </SearchProvider>
  );
}
