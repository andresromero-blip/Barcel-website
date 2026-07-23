"use client";

import { useEffect, useState } from "react";
import { useSearch } from "./SearchContext";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Marcas", href: "#marcas" },
  { label: "Novedades", href: "#novedades" },
];

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

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
      className={`sticky top-0 z-50 w-full bg-barcel-red transition-shadow ${
        scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.25)]" : ""
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Logo */}
        <a href="#inicio" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/barcel-logo-horizontal.png"
            alt="Barcel®"
            className="h-8 w-auto object-contain object-left md:h-9"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-body text-sm font-semibold text-white/90 transition-colors hover:text-white"
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full ${
                  i === 0 ? "w-full" : "w-0"
                }`}
              />
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
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="px-2 py-3 font-display text-base font-semibold text-barcel-black active:bg-barcel-cream"
            >
              {link.label}
            </a>
          ))}
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
