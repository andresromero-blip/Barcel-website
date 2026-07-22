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
      <div className="container-page mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-2xl font-extrabold uppercase text-barcel-red md:text-3xl">
            Conoce toda nuestra familia
          </h2>
          <p className="mt-2 max-w-xl font-body text-sm text-barcel-black/70 md:text-base">
            Explora nuestros productos y encuentra nuevos antojos de
            Barcel<sup>®</sup>. Haz clic en &ldquo;Nuestras Botanas&rdquo; para
            conocer todas las opciones llenas de sabor.
          </p>
          {hasQuery && (
            <p className="mt-2 font-display text-xs font-bold uppercase tracking-wide text-barcel-red">
              {matchCount > 0
                ? `${matchCount} marca${matchCount > 1 ? "s" : ""} encontrada${matchCount > 1 ? "s" : ""} para "${query}"`
                : `Sin resultados para "${query}"`}
            </p>
          )}
        </div>
        <a
          href="#marcas"
          className="shrink-0 rounded-full bg-barcel-red px-5 py-2.5 font-display text-sm font-bold text-white transition-transform hover:scale-[1.04] active:scale-95"
        >
          Nuestras botanas
        </a>
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
