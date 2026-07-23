export type Flavor = {
  name: string;
  image: string;
};

export type Brand = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  bg: string; // tailwind bg class for the logo tile
  logoText: string; // tailwind text color class — usado solo si no hay logo real (fallback)
  textOnBg: string; // tailwind text color for tagline on white tile
  imageFirst: boolean; // whether the color tile is on the left (desktop)
  logo?: string; // logo real (estado default)
  logoHover?: string; // logo real con microinteracción de hover (producto asomando)
  heroImage?: string; // foto de producto suelto a gran escala — usada en /marcas
  flavors?: Flavor[]; // presentaciones/sabores con foto real de empaque — usada en /marcas
};

export const brands: Brand[] = [
  {
    slug: "chips",
    name: "Chip's",
    tagline: "Antojo picosito",
    description:
      "Chip's es sabor sin filtro. Una marca intensa, juvenil y explosiva que convierte cada papa en una experiencia llena de crunch, picante y actitud mexicana.",
    bg: "bg-chips-green",
    logoText: "text-chips-brown",
    textOnBg: "text-chips-green-700",
    imageFirst: true,
    logo: "/logos/chips.png",
    logoHover: "/logos/chips-hover.png",
  },
  {
    slug: "takis",
    name: "Takis",
    tagline: "Fuego y sabor sin límites",
    description:
      "En un mundo obsesionado con la aprobación externa, Takis alimenta el fuego interior de quienes se mantienen fieles a sí mismos. La vida es mejor cuando abres tu propio camino.",
    bg: "bg-takis-purple",
    logoText: "text-takis-yellow",
    textOnBg: "text-takis-purple",
    imageFirst: false,
    logo: "/logos/takis.png",
    logoHover: "/logos/takis-hover.png",
    heroImage: "/products/takis/hero-dragon.png",
    flavors: [
      { name: "Fuego", image: "/products/takis/flavors/fuego.png" },
      { name: "Original", image: "/products/takis/flavors/original.png" },
      { name: "Salsa Brava", image: "/products/takis/flavors/salsa-brava.png" },
      { name: "Ranch", image: "/products/takis/flavors/ranch.png" },
      { name: "Chile Limón", image: "/products/takis/flavors/chile-limon.png" },
      { name: "Huacamoles", image: "/products/takis/flavors/huacamoles.png" },
      { name: "Blue Heat", image: "/products/takis/flavors/blue-heat.png" },
      { name: "Intense Nacho", image: "/products/takis/flavors/intense-nacho.png" },
    ],
  },
  {
    slug: "runners",
    name: "Runners",
    tagline: "Acelera tu emoción",
    description:
      "Runners combina crunch, sabor y energía. Una botana dinámica y divertida creada para acompañar momentos rápidos, espontáneos y llenos de emoción con actitud y mucho antojo.",
    bg: "bg-runners-pink",
    logoText: "text-runners-yellow",
    textOnBg: "text-runners-pink",
    imageFirst: true,
    logo: "/logos/runners.png",
    logoHover: "/logos/runners-hover.png",
  },
  {
    slug: "big-mix",
    name: "Big Mix",
    tagline: "Mezcla, la fiesta y compartir",
    description:
      "Big Mix mezcla sabor, diversión y actitud. Una botana explosiva y social creada para compartir, botanear y prender cualquier momento con variedad y crunch.",
    bg: "bg-bigmix-blue",
    logoText: "text-bigmix-yellow",
    textOnBg: "text-bigmix-blue",
    imageFirst: false,
    logo: "/logos/big-mix.png",
    logoHover: "/logos/big-mix-hover.png",
  },
  {
    slug: "hot-nuts",
    name: "Hot Nuts",
    tagline: "Picante que engancha",
    description:
      "Hot Nuts trae el calor directo a tu antojo. Cacahuates cubiertos con un toque picante y crocante, perfectos para quienes buscan intensidad en cada puñado.",
    bg: "bg-hotnuts-orange",
    logoText: "text-white",
    textOnBg: "text-hotnuts-orange",
    imageFirst: true,
    logo: "/logos/hot-nuts.png",
    logoHover: "/logos/hot-nuts-hover.png",
  },
  {
    slug: "golden-nuts",
    name: "Golden Nuts",
    tagline: "Sabor clásico, crunch dorado",
    description:
      "Golden Nuts es el clásico que nunca falla. Cacahuates japoneses con el crunch perfecto para disfrutar solos, en mezcla o para compartir en cualquier momento.",
    bg: "bg-goldennuts-gold",
    logoText: "text-white",
    textOnBg: "text-goldennuts-gold",
    imageFirst: false,
    // Sin logo real todavía — usa el placeholder de texto hasta que se comparta el asset.
  },
];
