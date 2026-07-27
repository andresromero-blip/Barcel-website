import type { Metadata } from "next";
import { SearchProvider } from "@/components/SearchContext";
import Header from "@/components/Header";
import AboutPage from "@/components/AboutPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Quiénes somos | Barcel",
  description:
    "La marca que convirtió el antojo en actitud. Conoce la historia de Barcel: sabor, crunch y cero aburrimiento.",
};

export default function SobreNosotrosRoute() {
  return (
    <SearchProvider>
      <Header />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </SearchProvider>
  );
}
