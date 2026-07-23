"use client";

import Link from "next/link";
import { brands } from "@/data/brands";
import BrandCard from "./BrandCard";
import { useSearch } from "./SearchContext";

export default function MarcasCatalog() {
  const { query } = useSearch();
  const normalized = query.trim().toLowerCase();
  const hasQuery = normalized.length > 0;
  const matchCount = hasQuery
    ? brands.filter((b) => b.name.toLowerCase().includes(normalized)).length
    : brands.length;

  return (
    <section className="bg-white pb-16 pt-10 md:pb-20 md:pt-14">
      <div className="container-page mb-10">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wide text-barcel-black/60 transition-colors hover:text-barcel-red"
        >
          <span aria-hidden>←</span> Volver al inicio
        </Link>

        <h1 className="font-teko text-4xl font-bold uppercase text-barcel-red md:text-5xl">
          Nuestras marcas
        </h1>
        <p className="mt-2 max-w-2xl font-body text-sm text-barcel-black/70 md:text-base">
          Seis personalidades distintas, un mismo compromiso con el sabor.
          Explora el universo Barcel<sup>®</sup> completo y encuentra tu
          próximo antojo.
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
