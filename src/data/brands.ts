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
  hoverBg: string; // tailwind "hover:bg-..." — color de la marca para estados hover (SKUs, selector de otras marcas)
  hoverText: string; // tailwind "hover:text-..." — contraste AA verificado contra hoverBg
  heroText: string; // tailwind "text-..." — mismo par de contraste que hoverText/hoverBg, sin el prefijo hover: (texto directo sobre bg en el hero de marca)
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
      "Chip's se distingue por su corte grueso y su proceso de freído lento, que le dan una textura y sabor únicos. Descubre sus variantes icónicas de Jalapeño y de Fuego, además del NUEVO Crema y Especias, sin olvidar los clásicos Sal y Chipotle para disfrutar cada antojo.",
    bg: "bg-chips-green",
    logoText: "text-chips-brown",
    textOnBg: "text-chips-green-700",
    hoverBg: "hover:bg-chips-green",
    hoverText: "hover:text-barcel-black", // 9.1:1 sobre chips-green — AA
    heroText: "text-barcel-black",
    imageFirst: true,
    logo: "/logos/chips.png",
    logoHover: "/logos/chips-hover.png",
    heroImage: "/products/chips/hero-jalapeno.png",
    flavors: [
      { name: "Jalapeño", image: "/products/chips/flavors/jalapeno.png" },
      { name: "Fuego", image: "/products/chips/flavors/fuego.png" },
      { name: "Sal", image: "/products/chips/flavors/sal.png" },
      { name: "Crema y Especias", image: "/products/chips/flavors/crema-especias.png" },
      { name: "Toque Maestro Al Parmesano", image: "/products/chips/flavors/tm-parmesano.png" },
      { name: "Toque Maestro Sal y Pimienta", image: "/products/chips/flavors/tm-sal-pimienta.png" },
    ],
  },
  {
    slug: "takis",
    name: "Takis",
    tagline: "Fuego y sabor sin límites",
    description:
      "Takis es una botana de maíz reconocida por sus sabores intensos y su experiencia única. Desde opciones sin picante hasta propuestas extremas, su portafolio ofrece botanas crujientes pensadas para quienes buscan intensidad y sabor en cada mordida.",
    bg: "bg-takis-purple",
    logoText: "text-takis-yellow",
    textOnBg: "text-takis-purple",
    hoverBg: "hover:bg-takis-purple",
    hoverText: "hover:text-white", // 6.75:1 sobre takis-purple — AA
    heroText: "text-white",
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
      "Runners es la botana que enciende la diversión en cualquier momento. Con su icónica forma de coche, textura crujiente y variedad de sabores, convierte cualquier momento en un juego. Porque con Runners no hay que esperar: abres la bolsa y la diversión arranca.",
    bg: "bg-runners-pink",
    logoText: "text-runners-yellow",
    textOnBg: "text-runners-pink",
    hoverBg: "hover:bg-runners-pink",
    hoverText: "hover:text-barcel-black", // 4.6:1 sobre runners-pink — AA
    heroText: "text-barcel-black",
    imageFirst: true,
    logo: "/logos/runners.png",
    logoHover: "/logos/runners-hover.png",
    heroImage: "/products/runners/hero-chile-limon.png",
    flavors: [
      { name: "Chile Limón", image: "/products/runners/flavors/chile-limon.png" },
      { name: "Fuego", image: "/products/runners/flavors/fuego.png" },
    ],
  },
  {
    slug: "big-mix",
    name: "Big Mix",
    tagline: "Mezcla, la fiesta y compartir",
    description:
      "Big Mix es la botana ideal para los que quieren todo en un solo snack. Disfruta sabores como Queso, Fuego e Inglesa limón, en una mezcla crujiente, deliciosa y surtida para compartir o disfrutar en cualquier momento. Elige Big Mix y piensa en Big.",
    bg: "bg-bigmix-blue",
    logoText: "text-bigmix-yellow",
    textOnBg: "text-bigmix-blue",
    hoverBg: "hover:bg-bigmix-blue",
    hoverText: "hover:text-barcel-black", // 5.25:1 sobre bigmix-blue — AA
    heroText: "text-barcel-black",
    imageFirst: false,
    logo: "/logos/big-mix.png",
    logoHover: "/logos/big-mix-hover.png",
    heroImage: "/products/big-mix/hero-queso.png",
    flavors: [
      { name: "Queso", image: "/products/big-mix/flavors/queso.png" },
      { name: "Fuego", image: "/products/big-mix/flavors/fuego.png" },
      { name: "Inglesa Limón", image: "/products/big-mix/flavors/inglesa-limon.png" },
    ],
  },
  {
    slug: "hot-nuts",
    name: "Hot Nuts",
    tagline: "Picante que engancha",
    description:
      "Hot Nuts® Original: cacahuates picositos con capa crujiente que truenan justo como te gustan. Si va a tronar, ¡que truene bien!",
    bg: "bg-hotnuts-orange",
    logoText: "text-white",
    textOnBg: "text-hotnuts-orange",
    hoverBg: "hover:bg-hotnuts-orange",
    hoverText: "hover:text-barcel-black", // 6:1 sobre hotnuts-orange — AA
    heroText: "text-barcel-black",
    imageFirst: true,
    logo: "/logos/hot-nuts.png",
    logoHover: "/logos/hot-nuts-hover.png",
    heroImage: "/products/hot-nuts/hero-original.png",
    flavors: [
      { name: "Original", image: "/products/hot-nuts/flavors/original.png" },
      { name: "Fuego", image: "/products/hot-nuts/flavors/fuego.png" },
      { name: "Enigma", image: "/products/hot-nuts/flavors/enigma.png" },
    ],
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
    hoverBg: "hover:bg-goldennuts-gold",
    hoverText: "hover:text-barcel-black", // 8.1:1 sobre goldennuts-gold — AA
    heroText: "text-barcel-black",
    imageFirst: false,
    // Sin logo real todavía — usa el placeholder de texto hasta que se comparta el asset.
  },
];
