"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSearch } from "./SearchContext";
import { brands } from "@/data/brands";

// Rutas raíz-relativas (no fragmentos sueltos) para que la nav funcione
// igual desde cualquier página: "/#seccion" navega al Home y baja al
// anchor. "Marcas" no es un link directo — es un desplegable con acceso a
// cada marca (/marcas/[slug]); no existe una página "hub" intermedia.
const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre nosotros", href: "/#sobre-nosotros" },
  { label: "Novedades", href: "/#novedades" },
];

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [marcasOpen, setMarcasOpen] = useState(false);
  const [mobileMarcasOpen, setMobileMarcasOpen] = useState(false);
  const { query, setQuery } = useSearch();
  const pathname = usePathname();
  const marcasRef = useRef<HTMLDivElement>(null);

  // Solo las páginas reales (sin #) marcan el subrayado activo — los
  // anchors de sección (Sobre nosotros, Novedades) no hacen scroll-spy.
  const isActive = (href: string) => !href.includes("#") && pathname === href;
  const marcasActive = pathname.startsWith("/marcas");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Cierra el desplegable de Marcas al hacer clic afuera o al navegar.
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (marcasRef.current && !marcasRef.current.contains(e.target as Node)) {
        setMarcasOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    setMarcasOpen(false);
    setMenuOpen(false);
    setMobileMarcasOpen(false);
  }, [pathname]);

  const handleNavClick = () => {
    setMenuOpen(false);
    setMobileMarcasOpen(false);
  };

  return (
    <header
      id="inicio"
      className={`sticky top-0 z-50 w-full bg-barcel-red transition-shadow ${
        scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.25)]" : ""
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/barcel-logo-horizontal.png"
            alt="Barcel®"
            className="h-8 w-auto object-contain object-left md:h-9"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          <a
            href={NAV_LINKS[0].href}
            className="group relative font-body text-sm font-semibold text-white/90 transition-colors hover:text-white"
          >
            {NAV_LINKS[0].label}
            <span
              className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full ${
                isActive(NAV_LINKS[0].href) ? "w-full" : "w-0"
              }`}
            />
          </a>
          <a
            href={NAV_LINKS[1].href}
            className="group relative font-body text-sm font-semibold text-white/90 transition-colors hover:text-white"
          >
            {NAV_LINKS[1].label}
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-200 group-hover:w-full" />
          </a>

          {/* Marcas — desplegable, no un link directo (no hay página hub) */}
          <div ref={marcasRef} className="relative">
            <button
              type="button"
              onClick={() => setMarcasOpen((v) => !v)}
              aria-expanded={marcasOpen}
              className="group relative flex items-center gap-1 font-body text-sm font-semibold text-white/90 transition-colors hover:text-white"
            >
              Marcas
              <ChevronDownIcon open={marcasOpen} />
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full ${
                  marcasActive ? "w-full" : "w-0"
                }`}
              />
            </button>
            <div
              className={`absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 bg-white shadow-xl transition-all duration-200 ${
                marcasOpen ? "opacity-100" : "pointer-events-none translate-y-1 opacity-0"
              }`}
            >
              {brands.map((brand) => (
                <a
                  key={brand.slug}
                  href={`/marcas/${brand.slug}`}
                  className="flex items-center justify-between gap-2 px-4 py-3 font-display text-sm font-semibold text-barcel-black transition-colors hover:bg-barcel-cream"
                >
                  {brand.name}
                  <sup className="text-[0.6em]">®</sup>
                </a>
              ))}
            </div>
          </div>

          <a
            href={NAV_LINKS[2].href}
            className="group relative font-body text-sm font-semibold text-white/90 transition-colors hover:text-white"
          >
            {NAV_LINKS[2].label}
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-200 group-hover:w-full" />
          </a>
        </nav>

        {/* Desktop right side */}
        <div className="hidden items-center gap-3 lg:flex">
          <div className="relative flex items-center">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
              placeholder="Buscar"
              className={`h-10 border border-white/20 bg-white pl-4 pr-10 text-sm text-barcel-black outline-none transition-all duration-300 placeholder:text-barcel-black/40 ${
                searchOpen || query ? "w-56" : "w-40"
              }`}
            />
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute right-3 h-4 w-4 text-barcel-black/60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <a
            href="#contacto"
            className="flex items-center gap-2 bg-barcel-black px-5 py-2.5 font-display text-sm font-bold text-white transition-transform hover:scale-[1.04] hover:bg-black active:scale-95"
          >
            Contáctanos
            <MailIcon />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
        >
          <div className="flex h-4 w-6 flex-col justify-between">
            <span
              className={`h-0.5 w-full origin-left bg-white transition-transform duration-300 ${
                menuOpen ? "translate-x-0.5 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-white transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-full origin-left bg-white transition-transform duration-300 ${
                menuOpen ? "translate-x-0.5 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-0 top-16 z-40 origin-top overflow-hidden bg-white transition-all duration-300 ease-out lg:hidden ${
          menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-page flex flex-col gap-1 py-4">
          <div className="relative mb-2 flex items-center">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar tu marca favorita..."
              className="h-11 w-full border border-black/10 bg-barcel-cream/70 pl-4 pr-10 text-sm outline-none focus:border-barcel-red/40"
            />
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute right-4 h-4 w-4 text-barcel-black/60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <a
            href={NAV_LINKS[0].href}
            onClick={handleNavClick}
            className="px-2 py-3 font-display text-base font-semibold text-barcel-black active:bg-barcel-cream"
          >
            {NAV_LINKS[0].label}
          </a>
          <a
            href={NAV_LINKS[1].href}
            onClick={handleNavClick}
            className="px-2 py-3 font-display text-base font-semibold text-barcel-black active:bg-barcel-cream"
          >
            {NAV_LINKS[1].label}
          </a>

          {/* Marcas — acordeón con las 6 marcas (no hay página hub) */}
          <button
            type="button"
            onClick={() => setMobileMarcasOpen((v) => !v)}
            aria-expanded={mobileMarcasOpen}
            className="flex items-center justify-between px-2 py-3 font-display text-base font-semibold text-barcel-black active:bg-barcel-cream"
          >
            Marcas
            <ChevronDownIcon open={mobileMarcasOpen} />
          </button>
          <div
            className={`grid overflow-hidden transition-all duration-300 ${
              mobileMarcasOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="flex min-h-0 flex-col">
              {brands.map((brand) => (
                <a
                  key={brand.slug}
                  href={`/marcas/${brand.slug}`}
                  onClick={handleNavClick}
                  className="px-6 py-2.5 font-display text-sm font-semibold text-barcel-black/70 active:bg-barcel-cream"
                >
                  {brand.name}
                  <sup className="text-[0.6em]">®</sup>
                </a>
              ))}
            </div>
          </div>

          <a
            href={NAV_LINKS[2].href}
            onClick={handleNavClick}
            className="px-2 py-3 font-display text-base font-semibold text-barcel-black active:bg-barcel-cream"
          >
            {NAV_LINKS[2].label}
          </a>
          <a
            href="#contacto"
            onClick={handleNavClick}
            className="mt-2 flex items-center justify-center gap-2 bg-barcel-black px-5 py-3 text-center font-display text-sm font-bold text-white"
          >
            Contáctanos
            <MailIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
