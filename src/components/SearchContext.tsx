"use client";

import { createContext, useContext, useState, useMemo } from "react";

type SearchContextValue = {
  query: string;
  setQuery: (value: string) => void;
  // Ronda 33: estado del buscador overlay (Figma node 107:2968) —
  // compartido para que tanto el trigger de desktop como el de mobile
  // (dentro del menú hamburguesa) abran la misma experiencia.
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(
    () => ({
      query,
      setQuery,
      isOpen,
      openSearch: () => setIsOpen(true),
      closeSearch: () => setIsOpen(false),
    }),
    [query, isOpen]
  );
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return ctx;
}
