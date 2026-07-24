import { SearchProvider } from "@/components/SearchContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import BrandIntro from "@/components/BrandIntro";
import FamilyGrid from "@/components/FamilyGrid";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SearchProvider>
      <Header />
      <main>
        <Hero />
        <LogoMarquee />
        <BrandIntro />
        <FamilyGrid />
        <NewsSection />
      </main>
      <Footer />
    </SearchProvider>
  );
}
