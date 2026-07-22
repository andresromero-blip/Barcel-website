export type Brand = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  bg: string; // tailwind bg class for the logo tile
  logoText: string; // tailwind text color class for logo placeholder
  textOnBg: string; // tailwind text color for tagline on white tile
  imageFirst: boolean; // whether the color tile is on the left (desktop)
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
    textOnBg: "text-chips-brown",
    imageFirst: true,
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
    imageFirst: true,
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
    imageFirst: false,
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
  },
];
