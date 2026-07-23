"use client";

import Link from "next/link";
import { brands } from "@/data/brands";
import BrandShowcase from "./BrandShowcase";
import { useSearch } from "./SearchContext";

export default function MarcasCatalog() {
  const { query } = useSearch();
  const normalized = query.trim().toLowerCase();
  const hasQuery = normalized.length > 0;
  const matchCount = hasQuery
    ? brands.filter((b) => b.name.toLowerCase().includes(normalized)).length
    : brands.length;

  return (
    <div className="bg-white">
      <div className="container-page flex flex-col gap-6 pb-8 pt-10 md:flex-row md:items-end md:justify-between md:pt-14">
        <div>
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

        {/* Índice de salto rápido — mismo lenguaje del referente (números
            grandes por producto), pero como navegación real entre secciones. */}
        <nav className="flex flex-wrap gap-2 md:justify-end">
          {brands.map((brand, i) => (
            <a
              key={brand.slug}
              href={`#${brand.slug}`}
              className="flex h-9 w-9 items-center justify-center border border-barcel-black/15 font-display text-xs font-bold text-barcel-black/60 transition-colors hover:border-barcel-black hover:text-barcel-black"
              aria-label={brand.name}
              title={brand.name}
            >
              {String(i + 1).padStart(2, "0")}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-col">
        {brands.map((brand, i) => {
          const isMatch = brand.name.toLowerCase().includes(normalized);
          return (
            <BrandShowcase
              key={brand.slug}
              brand={brand}
              index={i}
              dimmed={hasQuery && !isMatch}
              highlighted={hasQuery && isMatch}
            />
          );
        })}
      </div>
    </div>
  );
}
