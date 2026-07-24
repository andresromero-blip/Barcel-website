"use client";

import { brands } from "@/data/brands";
import BrandCard from "./BrandCard";
import { useSearch } from "./SearchContext";

export default function FamilyGrid() {
  const { query } = useSearch();
  const normalized = query.trim().toLowerCase();
  const hasQuery = normalized.length > 0;
  const matchCount = hasQuery
    ? brands.filter((b) => b.name.toLowerCase().includes(normalized)).length
    : brands.length;

  return (
    <section id="marcas" className="bg-white py-16 md:py-20">
      {/* Sin CTA "Nuestras botanas": ya no hay un catálogo/hub al que
          llevar — cada tarjeta de abajo enlaza directo a la página de esa
          marca con "Ver todos los productos →". */}
      <div className="container-page mb-10">
        <h2 className="font-teko text-3xl font-bold uppercase text-barcel-red md:text-4xl">
          Conoce toda nuestra familia
        </h2>
        <p className="mt-2 max-w-xl font-body text-sm text-barcel-black/70 md:text-base">
          Explora nuestros productos y encuentra nuevos antojos de
          Barcel<sup>®</sup>. Elige una marca para ver todo su portafolio.
        </p>
        {hasQuery && (
          <p className="mt-2 font-display text-xs font-bold uppercase tracking-wide text-barcel-red">
            {matchCount > 0
              ? `${matchCount} marca${matchCount > 1 ? "s" : ""} encontrada${matchCount > 1 ? "s" : ""} para "${query}"`
              : `Sin resultados para "${query}"`}
          </p>
        )}
      </div>

      <div className="flex flex-col divide-y divide-black/5">
        {brands.map((brand) => {
          const isMatch = brand.name.toLowerCase().includes(normalized);
          return (
            <BrandCard
              key={brand.slug}
              brand={brand}
              dimmed={hasQuery && !isMatch}
              highlighted={hasQuery && isMatch}
            />
          );
        })}
      </div>
    </section>
  );
}
