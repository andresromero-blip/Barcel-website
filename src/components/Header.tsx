"use client";

import { useEffect, useState } from "react";
import { useSearch } from "./SearchContext";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Marcas", href: "#marcas" },
  { label: "Novedades", href: "#novedades" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { query, setQuery } = useSearch();

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

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      id="inicio"
      className={`sticky top-0 z-50 w-full bg-white transition-shadow ${
        scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Logo */}
        <a href="#inicio" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-barcel-red font-display text-lg font-extrabold text-white md:h-10 md:w-10">
            B
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-barcel-black md:text-xl">
            BARCEL<sup className="text-[0.5em] font-semibold">®</sup>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-body text-sm font-semibold text-barcel-black/80 transition-colors hover:text-barcel-red"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-barcel-red transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
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
              placeholder="Buscar tu marca favorita..."
              className={`h-10 rounded-full border border-black/10 bg-barcel-cream/70 pl-4 pr-10 text-sm outline-none transition-all duration-300 focus:border-barcel-red/40 ${
                searchOpen || query ? "w-56" : "w-11 cursor-pointer pl-0 text-transparent"
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
            className="rounded-full bg-barcel-red px-5 py-2.5 font-display text-sm font-bold text-white transition-transform hover:scale-[1.04] hover:bg-barcel-red-dark active:scale-95"
          >
            Contáctanos
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-barcel-black lg:hidden"
        >
          <div className="flex h-4 w-6 flex-col justify-between">
            <span
              className={`h-0.5 w-full origin-left bg-barcel-black transition-transform duration-300 ${
                menuOpen ? "translate-x-0.5 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full bg-barcel-black transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-full origin-left bg-barcel-black transition-transform duration-300 ${
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
              className="h-11 w-full rounded-full border border-black/10 bg-barcel-cream/70 pl-4 pr-10 text-sm outline-none focus:border-barcel-red/40"
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
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="rounded-lg px-2 py-3 font-display text-base font-semibold text-barcel-black active:bg-barcel-cream"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={handleNavClick}
            className="mt-2 rounded-full bg-barcel-red px-5 py-3 text-center font-display text-sm font-bold text-white"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </header>
  );
}
