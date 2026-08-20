export type Flavor = {
  name: string;
  image: string; // empaque/bolsa — estado default de la tarjeta SKU
  hoverImage?: string; // producto suelto real — microinteracción de hover (igual a logo/logoHover del Home), solo si existe el asset
  slug?: string; // segmento de URL para /marcas/[marca]/[slug] — la página de detalle de producto. Sin slug = ese sabor todavía no tiene página propia (el SKU sigue abriendo el modal rápido del slider).
  description?: string; // copy real del producto para la página de detalle (Ronda 27, wireframe de Figma).
  sizes?: string[]; // presentaciones/peso — EJEMPLO pendiente de confirmar con Barcel, ver nota en ProductDetail.tsx.
  // Ronda 43/44: nivel del "Picómetro" (feedback de cliente + Takis Global
  // Brandbook 2025, subido en Ronda 44). El brandbook trae el Heat-o-Meter
  // oficial (04.4) con la escala Cero Picante/Bajo Picante/Medio/Picante/
  // Extremo, y varias páginas (74 Zero Heat Products, 82 Key Visual, 96
  // Ecommerce) muestran el nivel real ya aplicado sobre el empaque de
  // Fuego, Blue Heat, Original, Chile Limón, Huakamoles e Intense Nacho —
  // esos 6 quedan con el valor CONFIRMADO por el manual. Salsa Brava no
  // tiene equivalente en el portafolio global del brandbook (parece
  // exclusivo de México), así que se queda como estimación a partir del
  // copy de marca, pendiente de confirmar con Barcel (ver nota en
  // ProductDetail.tsx).
  spiceLevel?: "cero" | "bajo" | "medio" | "picante" | "extremo";
  // true = nivel confirmado por el Takis Global Brandbook 2025 (páginas 74,
  // 82, 96). false/undefined = estimación propia (solo Salsa Brava, sin
  // equivalente en el brandbook global) — ver nota en ProductDetail.tsx.
  spiceLevelConfirmed?: boolean;
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
  heroText: string; // tailwind "text-..." — color del H1 del hero. A diferencia de hoverText/groupHoverText, este SÍ puede usar el umbral de "texto grande" de WCAG (3:1 en vez de 4.5:1: el H1 es font-teko text-5xl+ bold, muy por encima del piso de 24px) — por eso puede ser un acento de marca en vez de negro/blanco plano. Ver nota Ronda 36 más abajo.
  lightHero: boolean; // true si el hero usa texto/elementos claros (blanco) en vez de oscuros — controla párrafo, "Volver al inicio", "Síguelos" y las formas decorativas del fondo (todo texto DE APOYO, que sí necesita 4.5:1 y por eso se queda en blanco/negro puro, nunca en un acento de color)
  socialBg: string; // tailwind "bg-..." — caja de los íconos de redes. Ronda 39: mismo acento de marca que heroText (no negro/blanco genérico) para que "resalte con el color del logo" — el ícono SÍ es un elemento gráfico pequeño así que necesita su propio par de contraste (socialIcon) verificado aparte del texto.
  socialIcon: string; // tailwind "text-..." — color del ícono (glifo) dentro de socialBg, con contraste AA-gráfico (3:1+) verificado contra ese fondo específico
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
    // Ronda 36: negro plano le quitaba personalidad al H1 (feedback del
    // cliente — la marca es dinámica, dirigida a audiencia adolescente).
    // El H1 es texto grande (WCAG 3:1, no 4.5:1), así que hay margen para
    // usar el mismo café de la marca (ya usado en logoText) en vez de
    // negro puro: 4.40:1 sobre chips-green — AA-grande con margen de
    // sobra, y es color real de marca, no negro genérico.
    heroText: "text-chips-brown",
    lightHero: false,
    // Ronda 39: caja de redes con el mismo café que el H1 (no negro
    // genérico) — 4.40:1 contra chips-green (igual que heroText, mismo
    // color) y el ícono blanco da 10.18:1 contra esa caja.
    socialBg: "bg-chips-brown",
    socialIcon: "text-white",
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
    lightHero: true,
    // Ronda 39: Takis ya usaba blanco como su propio acento (heroText),
    // así que la caja de redes se queda igual — blanco (6.74:1 contra
    // takis-purple) con ícono oscuro (19.17:1 contra la caja).
    socialBg: "bg-white",
    socialIcon: "text-barcel-black",
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
        spiceLevel: "extremo",
        spiceLevelConfirmed: true,
      },
      {
        name: "Original",
        image: "/products/takis/flavors/original.png",
        hoverImage: "/products/takis/flavors-hover/original.png",
        slug: "original",
        description:
          "El clásico que lo empezó todo. Chile y limón en su punto justo, con el crunch que hizo famosos a los rollos más picosos del mercado.",
        sizes: ["62 g", "90 g", "280 g"],
        spiceLevel: "bajo",
        spiceLevelConfirmed: true,
      },
      {
        name: "Salsa Brava",
        image: "/products/takis/flavors/salsa-brava.png",
        hoverImage: "/products/takis/flavors-hover/salsa-brava.png",
        slug: "salsa-brava",
        description:
          "Un toque de salsa picante que sube la temperatura desde el primer bocado. Para quienes ya se les quedó chico el picante normal.",
        sizes: ["62 g", "90 g", "280 g"],
        spiceLevel: "picante",
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
        spiceLevel: "cero",
        spiceLevelConfirmed: true,
      },
      {
        name: "Chile Limón",
        image: "/products/takis/flavors/chile-limon.png",
        slug: "chile-limon",
        description:
          "Ácido, salado y picoso en un solo rollo. La combinación clásica de chile y limón llevada al extremo.",
        sizes: ["62 g", "90 g", "280 g"],
        spiceLevel: "bajo",
        spiceLevelConfirmed: true,
      },
      {
        name: "Huacamoles",
        image: "/products/takis/flavors/huacamoles.png",
        hoverImage: "/products/takis/flavors-hover/huacamoles.png",
        slug: "huacamoles",
        description:
          "Sabor a guacamole con el picor de siempre. Una mezcla fresca y picante que rompe con lo esperado.",
        sizes: ["62 g", "90 g", "280 g"],
        spiceLevel: "picante",
        spiceLevelConfirmed: true,
      },
      {
        name: "Blue Heat",
        image: "/products/takis/flavors/blue-heat.png",
        hoverImage: "/products/takis/flavors-hover/blue-heat.png",
        slug: "blue-heat",
        description:
          "Picante azul, intensidad real. Un sabor atrevido para quienes buscan algo distinto sin bajarle al fuego.",
        sizes: ["62 g", "90 g", "280 g"],
        spiceLevel: "extremo",
        spiceLevelConfirmed: true,
      },
      {
        name: "Intense Nacho",
        image: "/products/takis/flavors/intense-nacho.png",
        slug: "intense-nacho",
        description:
          "Todo el sabor del queso nacho, sin nada de picor. Intenso en sabor, no en picante — crunch inconfundible para quienes quieren todo el antojo de Takis sin el fuego.",
        sizes: ["62 g", "90 g", "280 g"],
        spiceLevel: "cero",
        spiceLevelConfirmed: true,
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
    // Ronda 36: negro plano en el H1 no encajaba con una marca pensada
    // para audiencia adolescente. El H1 es texto grande (WCAG 3:1), así
    // que se usa el amarillo de marca (ya usado en logoText) en vez de
    // negro: 3.61:1 sobre runners-pink — AA-grande con margen cómodo.
    heroText: "text-runners-yellow",
    lightHero: false,
    // Ronda 39: caja de redes con el amarillo de marca (mismo que el H1)
    // en vez de negro genérico — 3.61:1 contra runners-pink, e ícono
    // negro da 16.74:1 contra esa caja.
    socialBg: "bg-runners-yellow",
    socialIcon: "text-black",
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
    // Ronda 36: mismo criterio que Chip's/Runners — el H1 es texto grande
    // (WCAG 3:1), así que usa el amarillo de marca (ya usado en logoText)
    // en vez de negro plano: 3.18:1 sobre bigmix-blue — AA-grande.
    heroText: "text-bigmix-yellow",
    lightHero: false,
    // Ronda 39: mismo criterio — amarillo de marca en vez de negro:
    // 3.18:1 contra bigmix-blue, ícono negro da 16.74:1 contra la caja.
    socialBg: "bg-bigmix-yellow",
    socialIcon: "text-black",
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
    // Ronda 36: blanco (ya usado en logoText de esta marca) en vez de
    // negro para el H1 — texto grande (WCAG 3:1): 3.50:1 sobre
    // hotnuts-orange — AA-grande, y más "picante"/dinámico sobre el
    // naranja que el negro plano. OJO: blanco NO alcanza para el texto
    // de apoyo (párrafo/redes/breadcrumb) — ahí exige 4.5:1 normal y
    // blanco solo da 3.50:1. Por eso lightHero se queda en false: el H1
    // usa blanco, pero el texto de apoyo se queda en negro (6.00:1 —
    // única opción que sí pasa AA-normal en este fondo).
    heroText: "text-white",
    lightHero: false,
    // Ronda 39: la caja de redes pasa a blanco (el acento real de esta
    // marca, igual que heroText) en vez del negro que usaba el texto de
    // apoyo — 3.50:1 contra hotnuts-orange, ícono oscuro da 19.17:1
    // contra la caja. OJO: esto es distinto de lightHero (que sigue en
    // false porque el párrafo/redes-label sí necesitan quedarse en negro,
    // ver nota de heroText arriba) — socialBg es solo la caja del ícono.
    socialBg: "bg-white",
    socialIcon: "text-barcel-black",
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
    // Ronda 36: a diferencia de las otras marcas, aquí SÍ se deja negro
    // en el H1 — no es un negro genérico "por default", es el color real
    // del wordmark de Golden Nuts (logo negro limpio, ver nota más abajo),
    // así que negro es el tratamiento más fiel a la marca, no un
    // compromiso. 8.09:1 sobre goldennuts-gold — AA con margen de sobra.
    heroText: "text-black",
    lightHero: false,
    // Ronda 39: caja de redes negra (igual que heroText — el negro real
    // del wordmark, no genérico) — 8.09:1 contra goldennuts-gold, ícono
    // blanco da 21:1 contra la caja.
    socialBg: "bg-black",
    socialIcon: "text-white",
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
