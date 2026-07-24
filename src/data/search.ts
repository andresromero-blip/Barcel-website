import { brands, type Brand, type Flavor } from "./brands";

// Índice de búsqueda del buscador (overlay de Figma, node 107:2968) —
// aplana marca + sabor en resultados navegables reales, en vez del
// placeholder del wireframe. Si el sabor tiene página propia (slug)
// enlaza ahí; si no, enlaza a la página de la marca (todavía no todas
// las marcas tienen ficha de producto individual, ver brands.ts).
export type SearchResult = {
  key: string;
  brand: Brand;
  flavor: Flavor;
  href: string;
  title: string;
  subtitle: string;
};

const DIACRITICS_RANGE = new RegExp("[\\u0300-\\u036f]", "g");

function normalize(value: string) {
  // Quita acentos (NFD + strip de marcas combinantes) para que
  // "jalapeño" y "jalapeno" matcheen igual al buscar.
  return value.toLowerCase().normalize("NFD").replace(DIACRITICS_RANGE, "");
}

function resultFor(brand: Brand, flavor: Flavor): SearchResult {
  const href = flavor.slug
    ? `/marcas/${brand.slug}/${flavor.slug}`
    : `/marcas/${brand.slug}`;
  const subtitle = flavor.sizes?.[0]
    ? `${brand.name} · Bolsa ${flavor.sizes[0]}`
    : brand.name;
  return {
    key: `${brand.slug}-${flavor.name}`,
    brand,
    flavor,
    href,
    title: `${brand.name} ${flavor.name}`.toUpperCase(),
    subtitle,
  };
}

const ALL_RESULTS: SearchResult[] = brands.flatMap((brand) =>
  (brand.flavors ?? []).map((flavor) => resultFor(brand, flavor))
);

// Texto completo por resultado para matchear también contra tagline y
// descripción (así "picante"/"cacahuates" encuentran marcas relevantes,
// no solo coincidencias literales de nombre).
const SEARCHABLE_TEXT = new Map(
  ALL_RESULTS.map((r) => [
    r.key,
    normalize(
      [
        r.brand.name,
        r.flavor.name,
        r.brand.tagline,
        r.brand.description,
        r.flavor.description ?? "",
      ].join(" ")
    ),
  ])
);

export function searchProducts(query: string, limit = 3): SearchResult[] {
  const q = normalize(query.trim());
  if (!q) return DEFAULT_QUICK_RESULTS;
  const matches = ALL_RESULTS.filter((r) =>
    (SEARCHABLE_TEXT.get(r.key) ?? "").includes(q)
  );
  // Prioriza coincidencias en el nombre (marca o sabor) sobre las que
  // solo matchean en tagline/descripción.
  matches.sort((a, b) => {
    const aNameMatch = normalize(a.title).includes(q) ? 0 : 1;
    const bNameMatch = normalize(b.title).includes(q) ? 0 : 1;
    return aNameMatch - bNameMatch;
  });
  return matches.slice(0, limit);
}

function findResult(brandSlug: string, flavorName: string): SearchResult | undefined {
  return ALL_RESULTS.find(
    (r) => r.brand.slug === brandSlug && r.flavor.name === flavorName
  );
}

// Resultados por defecto al abrir el buscador (sin escribir todavía) —
// mismos 3 ejemplos del wireframe de Figma, tomados de datos reales.
export const DEFAULT_QUICK_RESULTS: SearchResult[] = [
  findResult("takis", "Fuego"),
  findResult("chips", "Jalapeño"),
  findResult("big-mix", "Queso"),
].filter((r): r is SearchResult => Boolean(r));

// Chips de "Búsquedas populares" — mezcla de productos (Takis Fuego),
// marcas (Chip's, Big Mix, Runners) y categorías (Picante, Cacahuates)
// como en el wireframe; al tocar uno se usa como término de búsqueda.
export const POPULAR_SEARCHES = [
  "Takis Fuego",
  "Chip's",
  "Big Mix",
  "Picante",
  "Cacahuates",
  "Runners",
];
