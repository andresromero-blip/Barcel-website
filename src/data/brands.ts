// Redes propias de cada marca (NO las corporativas de Barcel, que ya
// viven en el Footer). Placeholders (#) hasta contar con las cuentas
// reales de cada marca — el diseño y la ubicación ya quedan resueltos.
//
// Ronda 31: paths reemplazados por los oficiales de Simple Icons
// (simple-icons, MIT — glifos de marca verificados 1:1 con el logo real
// de cada red), en vez de las aproximaciones dibujadas a mano que había
// antes.
//
// Ronda 54: vivía como const local en BrandPage.tsx. Se mueve a la capa
// de datos porque ahora TakisHero.tsx (usado por BrandPage Y
// ProductDetail para que el hero de marca y el de sabor queden 1:1)
// también lo necesita — evita un import circular entre esos dos
// componentes.
export const BRAND_SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  },
  {
    label: "TikTok",
    href: "#",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
];

export type Flavor = {
  name: string;
  image: string; // empaque/bolsa — estado default de la tarjeta SKU
  // Ronda 101: el cliente mandó 9 fotos de "estilo de vida" (bolsa +
  // bowl sobre una mesa, con ambiente/fondo real) para el slider de la
  // marca en /marcas/chips — pidió reemplazar ahí el recorte de
  // producto sobre blanco por la foto completa. De las 9, 6 coinciden
  // 1:1 con los sabores que ya existen aquí; las otras 3 (Toque Maestro
  // al Cilantro y Limón, Chipotle Limón, Habanero) no tienen sabor
  // creado todavía — el cliente confirmó dejarlas fuera por ahora
  // (mismo criterio que Ronda 97 con la 7ma etiqueta de yute). Es un
  // campo aparte de "image" (no lo reemplaza): "image" se sigue usando
  // en la página de detalle de producto (BrandProductDetail) y en el
  // modal rápido de marcas sin página propia — el pedido del cliente
  // fue explícito ("en este slider"), así que solo ProductSlider.tsx
  // consume "sliderImage", y únicamente cuando existe.
  sliderImage?: string;
  // Ronda 51: era "producto suelto real" (cutout transparente que se
  // asomaba encima de la bolsa). El cliente pidió que el hover use la
  // imagen del Takis Global Brandbook 2025 (composición oficial:
  // fondo de color de marca + swirl + producto + garnish, recortada
  // del panel "04.3 Variety Assets" de cada sabor, sin el logo TAKIS
  // para no duplicar la marca). Ahora es un fondo full-bleed que se
  // revela detrás de la bolsa al hacer hover, no un cutout superpuesto.
  hoverImage?: string;
  slug?: string; // segmento de URL para /marcas/[marca]/[slug] — la página de detalle de producto. Sin slug = ese sabor todavía no tiene página propia (el SKU sigue abriendo el modal rápido del slider).
  // Ronda 64: asset oficial del nombre de sabor (carpeta "NOMBRES PNG"
  // que compartió el cliente) — el manchón amarillo con el nombre en
  // pincel, ya recortado con fondo transparente. Reemplaza el intento
  // anterior de recrear ese mismo look con TakisTape.tsx + texto en
  // font-takisMark: el cliente marcó explícitamente "utiliza los
  // nombres que te compartí en la carpeta (PNG), estos están mal"
  // sobre esa recreación. Solo Takis tiene esta carpeta por ahora.
  nameImage?: string;
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
  // Ronda 63: declaración real de ingredientes, tal cual el archivo fuente
  // NPAR-FO-03/09 "ETIQUETA NUTRIMENTAL Y DECLARACIÓN DE INGREDIENTES MX"
  // que Barcel compartió (una etiqueta xlsx por sabor, con una hoja por
  // presentación). MAYÚSCULAS y puntuación tal cual el documento oficial —
  // no se reescribe el copy, es texto regulatorio.
  ingredients?: string;
  // "PUEDE CONTENER: ..." / "CONTIENE: ..." — mismo archivo fuente, texto
  // regulatorio tal cual.
  allergens?: string;
  // Tabla nutrimental real. El "porción"/"por 100 g" de cada nutrimento NO
  // cambia entre presentaciones (50 g, 240 g, 700 g, etc. son el mismo
  // producto embolsado en distinto gramaje) — por eso es un solo bloque
  // por sabor, tomado de la hoja "70g" de cada etiqueta (presentación
  // individual, la más comparable entre los 7 sabores que sí tienen
  // etiqueta). Salsa Brava se queda sin este campo: su etiqueta llegó
  // protegida con IRM/DRM (Microsoft Rights Management, cuenta corporativa
  // de Bimbo) y no pudo abrirse — ProductDetail.tsx cae al placeholder
  // anterior para ese único sabor.
  nutrition?: {
    porcionG: number;
    porcionesEnvase: string;
    kcalPorcion: number;
    kcal100g: number;
    proteinasPorcion: number;
    proteinas100g: number;
    grasasTotalesPorcion: number;
    grasasTotales100g: number;
    grasasSatPorcion: number;
    grasasSat100g: number;
    grasasTransPorcionMg: number;
    grasasTrans100gMg: number;
    colesterolPorcionMg: number;
    colesterol100gMg: number;
    hidratosPorcion: number;
    hidratos100g: number;
    azucaresPorcion: number;
    azucares100g: number;
    azucaresAnadidosPorcion: number;
    azucaresAnadidos100g: number;
    fibraPorcion: number;
    fibra100g: number;
    sodioPorcionMg: number;
    sodio100gMg: number;
  };
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
  // Ronda 99: textura de fondo para la página de detalle de producto
  // (BrandProductDetail.tsx, antes "TakisProductDetail" — generalizado
  // para que cualquier marca con sabores propios pueda usar esa misma
  // estructura de 2 columnas). Solo Takis tiene un asset de marca
  // dedicado para esto (el diagonal morado/amarillo con espirales del
  // Global Brandbook). Si una marca no define este campo, el componente
  // cae a un fondo sólido con su color de marca (brand.bg) en vez de
  // dejar un hueco o forzar un asset que no existe — así Chip's (sin
  // textura propia todavía) usa directamente bg-chips-brown.
  productDetailBg?: string;
};

export const brands: Brand[] = [
  {
    slug: "chips",
    name: "Chip's",
    tagline: "Antojo picosito",
    description:
      "Chip's se distingue por su corte grueso y su proceso de freído lento, que le dan una textura y sabor únicos. Descubre sus variantes icónicas de Jalapeño y de Fuego, además del NUEVO Crema y Especias, sin olvidar los clásicos Sal y Chipotle para disfrutar cada antojo.",
    // Chip's: color de marca corregido al manual oficial (café/terracota
    // PMS 483/484 C, ver nota completa en tailwind.config.ts) — el verde
    // que usaba el sitio era solo una referencia visual de Figma y además
    // corresponde al secundario de Jalapeño, no al color de marca.
    bg: "bg-chips-brown",
    logoText: "text-chips-brown",
    // 10.42:1 sobre blanco — AA de sobra (mejor que el 5.06:1 que daba el
    // verde-700 anterior).
    textOnBg: "text-chips-brown",
    hoverBg: "hover:bg-chips-brown",
    hoverText: "hover:text-white", // 10.42:1 sobre chips-brown — AA
    groupHoverText: "group-hover:text-white",
    // El fondo del hero ahora es el café oscuro de marca (antes era verde
    // brillante) — igual que Takis, un café tan oscuro solo deja blanco
    // como opción de texto legible encima (mismo criterio que Ronda 36,
    // pero aquí ya no hay margen para un acento de color: café sobre café
    // da 2.02:1, no pasa ni el umbral de texto grande).
    heroText: "text-white",
    lightHero: true,
    // Ronda 39 (mismo criterio, adaptado): ya no hay margen para "blanco
    // genérico" cuando heroText ya es blanco por necesidad de contraste —
    // se usa el segundo color oficial de marca (terracota/reflejos, PMS
    // 484 C) para que la caja de redes SÍ sea un acento real de marca en
    // vez de cualquiera de los dos neutros. 5.15:1 con ícono blanco — AA.
    socialBg: "bg-chips-terracotta",
    socialIcon: "text-white",
    imageFirst: true,
    logo: "/logos/chips.png",
    logoHover: "/logos/chips-hover.png",
    heroImage: "/products/chips/hero-jalapeno.png",
    // Ronda 100: el cliente mandó una foto de textura de madera para
    // reemplazar el fondo café sólido de la página de detalle de
    // producto (ver brand.productDetailBg en el tipo Brand — hasta
    // ahora Chip's caía al fondo sólido bg-chips-brown por no tener
    // asset propio, igual que definía la nota original de ese campo).
    productDetailBg: "/products/chips/product-bg.jpg",
    // Ronda 97: el cliente mandó 7 etiquetas de yute con los nombres
    // "oficiales" para el slider. De esas, 6 corresponden 1:1 a los 6
    // sabores que ya existen aquí — se actualiza el texto exacto,
    // sobre todo los dos "Toque Maestro" (pierden ese prefijo: la
    // etiqueta real dice solo "AL PARMESANO" / "A LA SAL Y PIMIENTA",
    // no el nombre completo de la sub-línea). La 7ma etiqueta ("Al
    // cilantro y limón") no tiene sabor ni foto de bolsa existente —
    // el cliente confirmó explícitamente NO incluirla todavía.
    //
    // Ronda 98: el cliente marcó "no están aplicados los nombres que
    // te compartí" — la Ronda 97 solo había tomado el TEXTO de esas 6
    // etiquetas para renombrar el campo "name" (usado en un <span> de
    // texto plano), pero el pedido real era usar las etiquetas mismas
    // como asset gráfico — se agregó "nameImage" apuntando a las 6
    // etiquetas recortadas.
    //
    // Ronda 99: se agrega "slug" a los 6 sabores — es lo único que
    // ProductSlider.tsx necesita para dejar de abrir el modal rápido y
    // navegar en su lugar a /marcas/chips/[slug] (BrandProductDetail,
    // misma estructura que ya usa Takis). Todavía no hay descripción,
    // nutrición ni ingredientes propios por sabor (Barcel no ha
    // compartido esas etiquetas para Chip's) — el componente ya sabe
    // mostrar "contenido de ejemplo, pendiente de confirmar" en esos
    // casos (mismo criterio que Salsa Brava en Takis), y mientras tanto
    // cae a la descripción general de la marca (brand.description).
    //
    // Ronda 100: el cliente pidió revertir la Ronda 98 — "vamos a
    // quitar las imágenes con el nombre de producto ... y vamos a
    // volver a tener el nombre del producto en texto" tanto en el
    // slider de marca como en la página de producto. Se quita
    // "nameImage" de los 6 sabores: como ProductSlider.tsx y
    // BrandProductDetail.tsx (antes TakisProductDetail.tsx) ya caen a
    // texto cuando este campo no existe, alcanza con borrarlo aquí
    // (no hace falta tocar esos componentes) — el nombre vuelve a
    // salir de "name" de abajo, ahora en fuente Introhead (ver
    // ProductSlider.tsx/BrandProductDetail.tsx).
    flavors: [
      {
        name: "Jalapeño",
        image: "/products/chips/flavors/jalapeno.png",
        sliderImage: "/products/chips/lifestyle/jalapeno.jpg",
        slug: "jalapeno",
      },
      {
        name: "Fuego",
        image: "/products/chips/flavors/fuego.png",
        sliderImage: "/products/chips/lifestyle/fuego.jpg",
        slug: "fuego",
      },
      {
        name: "Sal",
        image: "/products/chips/flavors/sal.png",
        sliderImage: "/products/chips/lifestyle/sal.jpg",
        slug: "sal",
      },
      {
        name: "Crema y Especias",
        image: "/products/chips/flavors/crema-especias.png",
        sliderImage: "/products/chips/lifestyle/crema-especias.jpg",
        slug: "crema-especias",
      },
      {
        name: "Al Parmesano",
        image: "/products/chips/flavors/tm-parmesano.png",
        sliderImage: "/products/chips/lifestyle/al-parmesano.jpg",
        slug: "al-parmesano",
      },
      {
        name: "A la Sal y Pimienta",
        image: "/products/chips/flavors/tm-sal-pimienta.png",
        sliderImage: "/products/chips/lifestyle/a-la-sal-y-pimienta.jpg",
        slug: "a-la-sal-y-pimienta",
      },
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
    // Ronda 99: textura oficial del Global Brandbook (diagonal morado/
    // amarillo con espirales) — ver nota completa del campo en el tipo
    // Brand más arriba. Antes vivía hardcodeada dentro del propio
    // componente de la página de detalle; ahora es un dato de marca
    // como cualquier otro, para que ese mismo componente sirva a otras
    // marcas sin tocar su código.
    productDetailBg: "/products/takis/bg.jpg",
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
        // Ronda 73: el cliente mandó el asset oficial de esta composición
        // (fondo transparente, mismo criterio que las otras 5 nuevas) —
        // reemplaza al "-brand.jpg" anterior (fondo opaco a sangre).
        hoverImage: "/products/takis/flavors-hover/fuego-hover.png",
        slug: "fuego",
        nameImage: "/products/takis/nombres/fuego.png",
        description:
          "El rolling picante que encendió a toda una generación. Sabor intenso a chile y limón, crunch inconfundible y cero medias tintas. Si puedes con el fuego, este es tu antojo.",
        sizes: ["70 g", "240 g", "700 g"],
        spiceLevel: "extremo",
        spiceLevelConfirmed: true,
        ingredients:
          "HARINA DE MAÍZ, ACEITE VEGETAL, SAZONADOR (SAL YODADA, MALTODEXTRINA, AZÚCARES AÑADIDOS (AZÚCAR), ÁCIDO CÍTRICO, GMS, PROTEÍNA VEGETAL, ANTOCIANINAS, CEBOLLA, BICARBONATO DE SODIO, EXTRACTO DE LEVADURA, ACEITE VEGETAL, SABORIZANTES NATURALES E IDÉNTICOS AL NATURAL, EXTRACTO DE CHILE).",
        allergens: "PUEDE CONTENER: SOYA, LECHE, GLUTEN Y CACAHUATE",
        nutrition: {
          porcionG: 30,
          porcionesEnvase: "Aprox. 2",
          kcalPorcion: 149,
          kcal100g: 495,
          proteinasPorcion: 1.71,
          proteinas100g: 5.7,
          grasasTotalesPorcion: 8.82,
          grasasTotales100g: 29.4,
          grasasSatPorcion: 1.26,
          grasasSat100g: 4.2,
          grasasTransPorcionMg: 81,
          grasasTrans100gMg: 270,
          colesterolPorcionMg: 0,
          colesterol100gMg: 0,
          hidratosPorcion: 15.54,
          hidratos100g: 51.8,
          azucaresPorcion: 0.96,
          azucares100g: 3.2,
          azucaresAnadidosPorcion: 0.45,
          azucaresAnadidos100g: 1.5,
          fibraPorcion: 1.35,
          fibra100g: 4.5,
          sodioPorcionMg: 446.7,
          sodio100gMg: 1489,
        },
      },
      {
        name: "Original",
        image: "/products/takis/flavors/original.png",
        hoverImage: "/products/takis/flavors-hover/original-hover.png",
        slug: "original",
        nameImage: "/products/takis/nombres/original.png",
        description:
          "El clásico que lo empezó todo. Chile y limón en su punto justo, con el crunch que hizo famosos a los rollos más picosos del mercado.",
        sizes: ["70 g", "240 g", "700 g"],
        spiceLevel: "bajo",
        spiceLevelConfirmed: true,
        ingredients:
          "HARINA DE MAÍZ, ACEITE VEGETAL, SAZONADOR [MALTODEXTRINA, SAL YODADA, ALMIDÓN, GMS, ÁCIDO CÍTRICO, CHILE POBLANO, CEBOLLA EN POLVO, ALMIDON MODIFICADO, ANTOCIANINAS, EXTRACTO DE PAPRIKA, AZÚCARES AÑADIDOS (AZÚCAR), SABORIZANTES NATURALES E IDÉNTICOS AL NATURAL, GOMA ACACIA].",
        allergens: "PUEDE CONTENER: SOYA, LECHE, GLUTEN, CACAHUATE",
        nutrition: {
          porcionG: 30,
          porcionesEnvase: "Aprox. 2",
          kcalPorcion: 152,
          kcal100g: 507,
          proteinasPorcion: 1.8,
          proteinas100g: 6,
          grasasTotalesPorcion: 9,
          grasasTotales100g: 30,
          grasasSatPorcion: 1.32,
          grasasSat100g: 4.4,
          grasasTransPorcionMg: 82.5,
          grasasTrans100gMg: 275,
          colesterolPorcionMg: 0,
          colesterol100gMg: 0,
          hidratosPorcion: 15.96,
          hidratos100g: 53.2,
          azucaresPorcion: 0.57,
          azucares100g: 1.9,
          azucaresAnadidosPorcion: 0.03,
          azucaresAnadidos100g: 0.1,
          fibraPorcion: 1.44,
          fibra100g: 4.8,
          sodioPorcionMg: 254.1,
          sodio100gMg: 847,
        },
      },
      {
        name: "Salsa Brava",
        image: "/products/takis/flavors/salsa-brava.png",
        // Ronda 51: Salsa Brava no tiene página propia en el Takis Global
        // Brandbook 2025 (mismo hueco ya documentado para spiceLevel más
        // abajo — no es una variedad del portafolio global), así que no
        // hay una composición oficial del cliente para el hover.
        // Ronda 73: se probó componer un hover propio (fondo de color +
        // producto suelto + cinta + picómetro) a partir de la imagen
        // suelta de producto, por pedido explícito del cliente.
        // Ronda 74: el cliente revisó el resultado y lo rechazó ("quedaron
        // horrendos") — se revierte: sin hoverImage, la tarjeta vuelve a
        // caer al mismo fondo sólido de marca que ya usan Ranch/Chile
        // Limón/Intense Nacho antes de tener composición propia.
        slug: "salsa-brava",
        nameImage: "/products/takis/nombres/salsa-brava.png",
        description:
          "Un toque de salsa picante que sube la temperatura desde el primer bocado. Para quienes ya se les quedó chico el picante normal.",
        // Ronda 63: el resto de los 7 sabores ya tiene sizes/ingredients/
        // allergens/nutrition reales (etiquetas NPAR-FO-03/09 que Barcel
        // compartió). La de Salsa Brava llegó protegida con IRM/DRM
        // (Microsoft Rights Management, cuenta corporativa de Bimbo) — ni
        // openpyxl ni LibreOffice pudieron abrirla sin las credenciales
        // de esa cuenta. Se queda con el placeholder anterior (ejemplo,
        // pendiente de confirmar) hasta que Barcel comparta una copia sin
        // proteger.
        sizes: ["62 g", "90 g", "280 g"],
        spiceLevel: "picante",
      },
      {
        name: "Ranch",
        image: "/products/takis/flavors/ranch.png",
        // Ronda 51: mapeado a "Buckin' Ranch" del Global Brandbook 2025
        // (04.3 Variety Assets) — la variedad más cercana con asset
        // oficial disponible para "Ranch".
        hoverImage: "/products/takis/flavors-hover/ranch-hover.png",
        slug: "ranch",
        nameImage: "/products/takis/nombres/ranch.png",
        description:
          "El cremoso encuentro entre el picante y el ranch. Un giro distinto al Takis de siempre, sin perder el crunch que los caracteriza.",
        sizes: ["70 g", "240 g", "700 g"],
        spiceLevel: "cero",
        spiceLevelConfirmed: true,
        ingredients:
          "HARINA DE MAÍZ, ACEITE VEGETAL, SAZONADOR [SÓLIDOS DE LA LECHE, MALTODEXTRINA, SAL YODADA, ACEITE VEGETAL, TOMATE Y CEBOLLA EN POLVO (0,5%), AZÚCARES AÑADIDOS (GLUCOSA, AZÚCAR, JARABE DE MAÍZ), GMS, SABORIZANTES NATURALES Y ARTIFICIALES, ALMIDÓN MODIFICADO, AJO EN POLVO, ÁCIDO LÁCTICO, LECHE, ESPECIAS, CURCUMINA, VINAGRE, ÁCIDO MÁLICO, ÁCIDO CÍTRICO, OLEORRESINA DE PAPRIKA].",
        allergens: "CONTIENE: LECHE",
        nutrition: {
          porcionG: 30,
          porcionesEnvase: "Aprox. 2",
          kcalPorcion: 153,
          kcal100g: 511,
          proteinasPorcion: 1.92,
          proteinas100g: 6.4,
          grasasTotalesPorcion: 9.12,
          grasasTotales100g: 30.4,
          grasasSatPorcion: 1.38,
          grasasSat100g: 4.6,
          grasasTransPorcionMg: 81,
          grasasTrans100gMg: 270,
          colesterolPorcionMg: 0.3,
          colesterol100gMg: 1,
          hidratosPorcion: 15.87,
          hidratos100g: 52.9,
          azucaresPorcion: 1.2,
          azucares100g: 4,
          azucaresAnadidosPorcion: 0.12,
          azucaresAnadidos100g: 0.4,
          fibraPorcion: 1.41,
          fibra100g: 4.7,
          sodioPorcionMg: 208.8,
          sodio100gMg: 696,
        },
      },
      {
        name: "Chile Limón",
        image: "/products/takis/flavors/chile-limon.png",
        hoverImage: "/products/takis/flavors-hover/chile-limon-hover.png",
        slug: "chile-limon",
        nameImage: "/products/takis/nombres/chile-limon.png",
        description:
          "Ácido, salado y picoso en un solo rollo. La combinación clásica de chile y limón llevada al extremo.",
        sizes: ["70 g", "240 g", "700 g"],
        spiceLevel: "bajo",
        spiceLevelConfirmed: true,
        ingredients:
          "HARINA DE MAÍZ, ACEITE VEGETAL, SAZONADOR [MALTODEXTRINA, SAL YODADA, GMS, ÁCIDO CÍTRICO, PROTEINA VEGETAL, AZÚCARES AÑADIDOS (AZÚCAR), CLORURO DE POTASIO, SABORIZANTES NATURALES, ANTOCIANINAS, ALMIDÓN MODIFICADO, EXTRACTO DE PAPRIKA].",
        allergens: "CONTIENE: LECHE",
        nutrition: {
          porcionG: 30,
          porcionesEnvase: "Aprox. 2",
          kcalPorcion: 151,
          kcal100g: 504,
          proteinasPorcion: 1.83,
          proteinas100g: 6.1,
          grasasTotalesPorcion: 8.79,
          grasasTotales100g: 29.3,
          grasasSatPorcion: 1.26,
          grasasSat100g: 4.2,
          grasasTransPorcionMg: 81,
          grasasTrans100gMg: 270,
          colesterolPorcionMg: 0,
          colesterol100gMg: 0,
          hidratosPorcion: 16.2,
          hidratos100g: 54,
          azucaresPorcion: 0.72,
          azucares100g: 2.4,
          azucaresAnadidosPorcion: 0.12,
          azucaresAnadidos100g: 0.4,
          fibraPorcion: 1.35,
          fibra100g: 4.5,
          sodioPorcionMg: 190.2,
          sodio100gMg: 634,
        },
      },
      {
        name: "Huacamoles",
        image: "/products/takis/flavors/huacamoles.png",
        // Ronda 51: mismo caso que Salsa Brava — Huacamoles tampoco
        // aparece en el Global Brandbook 2025.
        // Ronda 73/74: mismo criterio que Salsa Brava — se probó una
        // composición propia y el cliente la rechazó; se revierte sin
        // hoverImage (ver nota completa en Salsa Brava más arriba).
        slug: "huacamoles",
        nameImage: "/products/takis/nombres/huacamoles.png",
        description:
          "Sabor a guacamole con el picor de siempre. Una mezcla fresca y picante que rompe con lo esperado.",
        sizes: ["70 g", "240 g"],
        spiceLevel: "picante",
        spiceLevelConfirmed: true,
        ingredients:
          "HARINA DE MAÍZ, ACEITE VEGETAL, SAZONADOR [SAL YODADA, SÓLIDOS DE LA LECHE, MALTODEXTRINA, GMS, ACEITE VEGETAL, CEBOLLA EN POLVO, ÁCIDO CÍTRICO, AJO EN POLVO, TOMATE EN POLVO, ÁCIDO ACÉTICO, AZÚCARES AÑADIDOS (AZÚCAR), SABORIZANTES NATURALES E IDÉNTICOS A LOS NATURALES, ESPECIAS, GUANILATO DE SODIO, INOSINATO DE SODIO, EXTRACTO DE ESPIRULINA, MONO Y DIGLICÉRIDOS DE ÁCIDOS GRASOS, CURCUMINA].",
        allergens: "CONTIENE: LECHE",
        nutrition: {
          porcionG: 30,
          porcionesEnvase: "Aprox. 2",
          kcalPorcion: 154,
          kcal100g: 512,
          proteinasPorcion: 1.92,
          proteinas100g: 6.4,
          grasasTotalesPorcion: 9.21,
          grasasTotales100g: 30.7,
          grasasSatPorcion: 1.41,
          grasasSat100g: 4.7,
          grasasTransPorcionMg: 83.7,
          grasasTrans100gMg: 279,
          colesterolPorcionMg: 0,
          colesterol100gMg: 0,
          hidratosPorcion: 15.72,
          hidratos100g: 52.4,
          azucaresPorcion: 0.9,
          azucares100g: 3,
          azucaresAnadidosPorcion: 0.15,
          azucaresAnadidos100g: 0.5,
          fibraPorcion: 1.44,
          fibra100g: 4.8,
          sodioPorcionMg: 256.2,
          sodio100gMg: 854,
        },
      },
      {
        name: "Blue Heat",
        image: "/products/takis/flavors/blue-heat.png",
        hoverImage: "/products/takis/flavors-hover/blue-heat-hover.png",
        slug: "blue-heat",
        nameImage: "/products/takis/nombres/blue-heat.png",
        description:
          "Picante azul, intensidad real. Un sabor atrevido para quienes buscan algo distinto sin bajarle al fuego.",
        sizes: ["70 g", "240 g"],
        spiceLevel: "extremo",
        spiceLevelConfirmed: true,
        ingredients:
          "HARINA DE MAÍZ, ACEITE VEGETAL, SAZONADOR (MALTODEXTRINA, ÁCIDO CÍTRICO, AZÚCARES AÑADIDOS (AZÚCAR), SAL YODADA, CLORURO DE POTASIO, GMS, EXTRACTO DE ESPIRULINA, PROTEÍNA VEGETAL, EXTRACTO DE LEVADURA, CEBOLLA EN POLVO, ACEITE VEGETAL, BICARBONATO DE SODIO, SABORIZANTE NATURAL).",
        allergens: "PUEDE CONTENER: SOYA, LECHE, CACAHUATE, GLUTEN",
        nutrition: {
          porcionG: 30,
          porcionesEnvase: "Aprox. 2",
          kcalPorcion: 149,
          kcal100g: 496,
          proteinasPorcion: 1.68,
          proteinas100g: 5.6,
          grasasTotalesPorcion: 8.85,
          grasasTotales100g: 29.5,
          grasasSatPorcion: 1.26,
          grasasSat100g: 4.2,
          grasasTransPorcionMg: 81,
          grasasTrans100gMg: 270,
          colesterolPorcionMg: 0,
          colesterol100gMg: 0,
          hidratosPorcion: 15.63,
          hidratos100g: 52.1,
          azucaresPorcion: 0.93,
          azucares100g: 3.1,
          azucaresAnadidosPorcion: 0.42,
          azucaresAnadidos100g: 1.4,
          fibraPorcion: 1.38,
          fibra100g: 4.6,
          sodioPorcionMg: 192.3,
          sodio100gMg: 641,
        },
      },
      {
        name: "Intense Nacho",
        image: "/products/takis/flavors/intense-nacho.png",
        hoverImage: "/products/takis/flavors-hover/intense-nacho-hover.png",
        slug: "intense-nacho",
        nameImage: "/products/takis/nombres/intense-nacho.png",
        description:
          "Todo el sabor del queso nacho, sin nada de picor. Intenso en sabor, no en picante — crunch inconfundible para quienes quieren todo el antojo de Takis sin el fuego.",
        sizes: ["70 g", "240 g", "700 g"],
        spiceLevel: "cero",
        spiceLevelConfirmed: true,
        ingredients:
          "HARINA DE MAÍZ, ACEITE VEGETAL, SAZONADOR [SÓLIDOS DE LA LECHE, MALTODEXTRINA, SAL YODADA, ACEITE VEGETAL, SABORIZANTES NATURALES Y ARTIFICIALES, TOMATE EN POLVO, CEBOLLA EN POLVO, GMS, QUESO, LECHE, AZÚCARES AÑADIDOS (DEXTROSA, AZÚCAR), PROTEÍNA VEGETAL, EXTRACTO DE PAPRIKA, CURCUMINA, ÁCIDO LÁCTICO, ÁCIDO CÍTRICO, ESPECIAS, INOSINATO DE SODIO, GUANILATO DE SODIO].",
        allergens: "CONTIENE: LECHE",
        nutrition: {
          porcionG: 30,
          porcionesEnvase: "Aprox. 2",
          kcalPorcion: 154,
          kcal100g: 513,
          proteinasPorcion: 1.98,
          proteinas100g: 6.6,
          grasasTotalesPorcion: 9.24,
          grasasTotales100g: 30.8,
          grasasSatPorcion: 1.47,
          grasasSat100g: 4.9,
          grasasTransPorcionMg: 88.5,
          grasasTrans100gMg: 295,
          colesterolPorcionMg: 0.3,
          colesterol100gMg: 1,
          hidratosPorcion: 15.72,
          hidratos100g: 52.4,
          azucaresPorcion: 1.14,
          azucares100g: 3.8,
          azucaresAnadidosPorcion: 0.03,
          azucaresAnadidos100g: 0.1,
          fibraPorcion: 1.38,
          fibra100g: 4.6,
          sodioPorcionMg: 240.9,
          sodio100gMg: 803,
        },
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
