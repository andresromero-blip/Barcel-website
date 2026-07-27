export type Flavor = {
  name: string;
  image: string; // empaque/bolsa — estado default de la tarjeta SKU
  hoverImage?: string; // producto suelto real — microinteracción de hover (igual a logo/logoHover del Home), solo si existe el asset
  slug?: string; // segmento de URL para /marcas/[marca]/[slug] — la página de detalle de producto. Sin slug = ese sabor todavía no tiene página propia (el SKU sigue abriendo el modal rápido del slider).
  description?: string; // copy real del producto para la página de detalle (Ronda 27, wireframe de Figma).
  sizes?: string[]; // presentaciones/peso — EJEMPLO pendiente de confirmar con Barcel, ver nota en ProductDetail.tsx.
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
  hoverText: string; // tailwind "hover:text-..." — contraste AA verificado contra hoverBg, para cuando el hover va en el MISMO elemento que el texto
  groupHoverText: string; // tailwind "group-hover:text-..." — mismo par de contraste, para textos hijos con color propio (ej. label de marca) dentro de una tarjeta que solo tiene `group` + hoverBg en el contenedor
  heroText: string; // tailwind "text-..." — mismo par de contraste que hoverText/hoverBg, sin el prefijo hover: (texto directo sobre bg en el hero de marca)
  imageFirst: boolean; // whether the color tile is on the left (desktop)
  logo?: string; // logo real (estado default)
  logoHover?: string; // logo real con microinteracción de hover (producto asomando)
  heroImage?: string; // foto de producto suelto a gran escala — usada en /marcas
  flavors?: Flavor[]; // presentaciones/sabores con foto real de empaque — usada en /marcas
  heroVisual?: "logo"; // si está presente, el hero muestra el logo (no el producto) — por ahora solo Takis
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
    hoverText: "hover:text-black", // 9.07:1 sobre chips-green — AA (negro puro, no barcel-black — ver nota en Runners)
    groupHoverText: "group-hover:text-black",
    heroText: "text-black",
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
    hoverText: "hover:text-white", // 6.74:1 sobre takis-purple — AA
    groupHoverText: "group-hover:text-white",
    heroText: "text-white",
    imageFirst: false,
    logo: "/logos/takis.png",
    logoHover: "/logos/takis-hover.png",
    heroImage: "/products/takis/hero-dragon.png",
    heroVisual: "logo",
    // sizes: mismo set de 3 presentaciones (62 g / 90 g / 280 g) para los
    // 8 sabores — son gramajes reales típicos de Takis, pero se reutilizan
    // como EJEMPLO por ahora: falta que Barcel confirme qué presentaciones
    // existen realmente por sabor. description: copy real de la Ronda 27
    // (el de Fuego viene textual del wireframe de Figma; el resto se
    // escribió en el mismo tono de marca para completar los 8).
    flavors: [
      {
        name: "Fuego",
        image: "/products/takis/flavors/fuego.png",
        hoverImage: "/products/takis/flavors-hover/fuego.png",
        slug: "fuego",
        description:
          "El rolling picante que encendió a toda una generación. Sabor intenso a chile y limón, crunch inconfundible y cero medias tintas. Si puedes con el fuego, este es tu antojo.",
        sizes: ["62 g", "90 g", "280 g"],
      },
      {
        name: "Original",
        image: "/products/takis/flavors/original.png",
        hoverImage: "/products/takis/flavors-hover/original.png",
        slug: "original",
        description:
          "El clásico que lo empezó todo. Chile y limón en su punto justo, con el crunch que hizo famosos a los rollos más picosos del mercado.",
        sizes: ["62 g", "90 g", "280 g"],
      },
      {
        name: "Salsa Brava",
        image: "/products/takis/flavors/salsa-brava.png",
        hoverImage: "/products/takis/flavors-hover/salsa-brava.png",
        slug: "salsa-brava",
        description:
          "Un toque de salsa picante que sube la temperatura desde el primer bocado. Para quienes ya se les quedó chico el picante normal.",
        sizes: ["62 g", "90 g", "280 g"],
      },
      // Ranch, Chile Limón e Intense Nacho: sin hoverImage — el material
      // compartido no incluye render de producto suelto para estos 3
      // sabores (solo existe la bolsa). La tarjeta del slider funciona
      // igual, solo sin la microinteracción de producto asomando; la
      // página de detalle sí existe para los 8 (galería sin thumbnails
      // extra cuando solo hay una imagen real).
      {
        name: "Ranch",
        image: "/products/takis/flavors/ranch.png",
        slug: "ranch",
        description:
          "El cremoso encuentro entre el picante y el ranch. Un giro distinto al Takis de siempre, sin perder el crunch que los caracteriza.",
        sizes: ["62 g", "90 g", "280 g"],
      },
      {
        name: "Chile Limón",
        image: "/products/takis/flavors/chile-limon.png",
        slug: "chile-limon",
        description:
          "Ácido, salado y picoso en un solo rollo. La combinación clásica de chile y limón llevada al extremo.",
        sizes: ["62 g", "90 g", "280 g"],
      },
      {
        name: "Huacamoles",
        image: "/products/takis/flavors/huacamoles.png",
        hoverImage: "/products/takis/flavors-hover/huacamoles.png",
        slug: "huacamoles",
        description:
          "Sabor a guacamole con el picor de siempre. Una mezcla fresca y picante que rompe con lo esperado.",
        sizes: ["62 g", "90 g", "280 g"],
      },
      {
        name: "Blue Heat",
        image: "/products/takis/flavors/blue-heat.png",
        hoverImage: "/products/takis/flavors-hover/blue-heat.png",
        slug: "blue-heat",
        description:
          "Picante azul, intensidad real. Un sabor atrevido para quienes buscan algo distinto sin bajarle al fuego.",
        sizes: ["62 g", "90 g", "280 g"],
      },
      {
        name: "Intense Nacho",
        image: "/products/takis/flavors/intense-nacho.png",
        slug: "intense-nacho",
        description:
          "Todo el sabor del nacho con la intensidad picante de Takis. Queso, especias y crunch en cada mordida.",
        sizes: ["62 g", "90 g", "280 g"],
      },
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
    // Ronda 35: runners-pink es la marca con menos margen de contraste del
    // sitio. text-barcel-black (#0f0f0f) sobre runners-pink solo da
    // 4.23:1 — no pasa el 4.5:1 que exige AA para texto normal (el
    // comentario original decía "4.6:1", pero medido correctamente con la
    // fórmula WCAG da menos). Con negro puro (#000, text-black) sube a
    // 4.64:1 y sí pasa. Mismo motivo para textOnBg: el rosa base solo da
    // 4.53:1 sobre blanco (4.26:1 sobre cream, ya no pasa) — se usa
    // runners-pink-700, un tono más oscuro con 5.04:1 garantizado.
    textOnBg: "text-runners-pink-700",
    hoverBg: "hover:bg-runners-pink",
    hoverText: "hover:text-black", // 4.64:1 sobre runners-pink — AA (negro puro, ver nota arriba)
    groupHoverText: "group-hover:text-black",
    heroText: "text-black",
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
    // Ronda 35: bigmix-blue base solo da 4.00:1 sobre blanco (no pasa
    // AA) — se usa bigmix-blue-700 (5.09:1) para textOnBg.
    textOnBg: "text-bigmix-blue-700",
    hoverBg: "hover:bg-bigmix-blue",
    hoverText: "hover:text-black", // 5.26:1 sobre bigmix-blue — AA
    groupHoverText: "group-hover:text-black",
    heroText: "text-black",
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
    // Ronda 35: hotnuts-orange base solo da 3.50:1 sobre blanco (no pasa
    // AA) — se usa hotnuts-orange-700 (5.06:1) para textOnBg.
    textOnBg: "text-hotnuts-orange-700",
    hoverBg: "hover:bg-hotnuts-orange",
    hoverText: "hover:text-black", // 6.00:1 sobre hotnuts-orange — AA
    groupHoverText: "group-hover:text-black",
    heroText: "text-black",
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
    // Ronda 35: goldennuts-gold base solo da 2.60:1 sobre blanco (no pasa
    // AA, ni siquiera para texto grande) — se usa goldennuts-gold-700
    // (5.06:1) para textOnBg.
    textOnBg: "text-goldennuts-gold-700",
    hoverBg: "hover:bg-goldennuts-gold",
    hoverText: "hover:text-black", // 8.09:1 sobre goldennuts-gold — AA
    groupHoverText: "group-hover:text-black",
    heroText: "text-black",
    imageFirst: false,
    // Ronda 31: logo real + portafolio (carpeta "7) Golden Nuts 2" del
    // material compartido). logo = wordmark negro limpio (GN_LOGO_SIN_SOMBRA,
    // buen contraste sobre goldennuts-gold); logoHover = versión blanca con
    // resplandor rojo (GN_LOGO_SOMBRA_ROJA) — no hay un asset de "logo +
    // producto asomando" como en las demás marcas, así que el hover usa las
    // dos variantes reales que sí existen para dar el mismo efecto de "pop".
    // flavors/heroImage: fotografía real de producto (carpeta "4) Imágenes
    // acompañamiento") en vez de renders de bolsa — es lo que existe para
    // esta marca; incluye un artefacto de franjas de color en píxeles de
    // alpha muy bajo (mismo caso que los assets de Takis en rondas
    // anteriores), limpiado con el mismo criterio.
    logo: "/logos/golden-nuts.png",
    logoHover: "/logos/golden-nuts-hover.png",
    heroImage: "/products/golden-nuts/hero-japones.png",
    flavors: [
      { name: "Japonés", image: "/products/golden-nuts/flavors/japones.png" },
      { name: "Salados", image: "/products/golden-nuts/flavors/salados.png" },
      { name: "Enchilados", image: "/products/golden-nuts/flavors/enchilados.png" },
      { name: "Fuego", image: "/products/golden-nuts/flavors/fuego.png" },
      { name: "Mix Botanero", image: "/products/golden-nuts/flavors/mix-botanero.png" },
      { name: "Pepitas", image: "/products/golden-nuts/flavors/pepitas.png" },
      { name: "Sazón Maestro", image: "/products/golden-nuts/flavors/sazon-maestro.png" },
    ],
  },
];
