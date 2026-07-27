import type { Metadata } from "next";
import { SearchProvider } from "@/components/SearchContext";
import Header from "@/components/Header";
import ContactPage from "@/components/ContactPage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contacto | Barcel",
  description:
    "¿Dudas, ideas, alianzas o simplemente mucho antojo? Escríbenos y te respondemos.",
};

export default function ContactoRoute() {
  return (
    <SearchProvider>
      <Header />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </SearchProvider>
  );
}
