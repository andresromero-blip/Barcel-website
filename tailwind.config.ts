import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  // Ronda 58: en touch (celular/tablet) no existe un mouse que "salga" de
  // la tarjeta — el navegador simula :hover en el primer tap y recién
  // sigue el link en un SEGUNDO tap. Como el CTA/composición del slider
  // de productos vive detrás de group-hover:opacity, en la práctica el
  // primer tap del cliente "no hacía nada" (activaba el hover, no
  // navegaba) y parecía que el CTA estaba roto. Esta flag (recomendada
  // por los docs de Tailwind desde 3.4) hace que TODAS las variantes
  // hover:/group-hover:/peer-hover: del sitio solo apliquen en
  // dispositivos con hover real + puntero fino (mouse/trackpad). En
  // touch, el estado hover nunca se "finge": el navegador va directo al
  // click en el primer tap, así que el link navega de inmediato. El
  // único costo es cosmético (en touch no se ve la revelación animada
  // de la composición/CTA), pero el tap para entrar al producto ya
  // funciona en un solo toque.
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      screens: {
        // Breakpoint extra angosto (mobile-first) para graduar el tamaño
        // del CTA/dots del Hero entre el mínimo (320px) y sm (640px).
        xs: "400px",
      },
      colors: {
        // Tokens reales extraidos de Figma (get_variable_defs) — Prototipo Barcel
        barcel: {
          red: "#ff2d50", // Colors base/Primary/500 · Red/500
          "red-600": "#f5173c", // Colors base/Primary/600*
          "red-dark": "#ce0728", // Colors base/Primary/700 · Red/700
          "red-900": "#8c1025", // Red/900 — banner "Orgullosamente botaneros" en /sobre-nosotros (Figma 117:2810)
          "red-950": "#4d020f", // Red/950
          black: "#0f0f0f", // Grey/950
          cream: "#FFF7EC",
        },
        grey: {
          50: "#f6f6f6",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          700: "#4f4f4f",
          950: "#262626", // Colors base/Grey/950
        },
        chips: {
          // Chip's Manual de Marca 2025 (03. Recursos Gráficos, pág. 10-11)
          // — reemplaza los tonos "de referencia visual" aprobados en Figma
          // por los valores OFICIALES del manual, mismo criterio que Takis
          // en la Ronda 44. Hallazgo clave: el color PRIMARIO de Chip's NO
          // es verde — la paleta principal es un trío café/terracota (PMS
          // 483 C base + PMS 484 C reflejos + blanco stroke). El verde es
          // apenas el color SECUNDARIO del sabor Jalapeño, uno de tres
          // acentos por sabor (Sal/Jalapeño/Fuego) — nunca el color de
          // marca a nivel de sitio.
          brown: "#663025", // PMS 483 C — base/primario. 10.42:1 sobre blanco y con blanco encima — AA de sobra en ambas direcciones.
          terracotta: "#AF5141", // PMS 484 C — reflejos/secundario de marca. 5.15:1 con blanco encima — AA.
          // Paleta secundaria por sabor (pág. 11) — NO son el color de
          // marca, solo acentos puntuales si se necesita distinguir un
          // sabor específico (ej. un badge). Se documentan aquí por si se
          // usan más adelante, igual que "purple-600" en Takis.
          sal: "#FFD100", // PMS 109 C
          green: "#00953B", // PMS 355 C — Jalapeño
          fuego: "#5C0F8B", // PMS 2597 C — Fuego (mismo morado que Takis, coincidencia del manual, no relacionado)
        },
        takis: {
          // Ronda 44: reemplaza el morado/amarillo "de referencia visual"
          // aprobados en Figma por los valores OFICIALES del Takis Global
          // Brandbook 2025 (03.2 Brand Color Palette, pág. 28): PMS 2597
          // (#570f8b) y amarillo #fff200. El cambio en realidad SUBE el
          // contraste en todos los usos existentes (texto/fondo blanco):
          // 6.74:1 → 11.37:1 — sigue AA (de sobra) sin tocar ningún par
          // texto/fondo.
          purple: "#570f8b", // PMS 2597 — Takis Global Brandbook 2025, pág. 28
          "purple-600": "#4a0d78", // variante -600 derivada, sin uso actual
          yellow: "#fff200", // Takis Global Brandbook 2025, pág. 28
        },
        bigmix: {
          blue: "#1E7FE8", // color de marca (referencia visual del diseño aprobado)
          "blue-600": "#1569C4",
          "blue-700": "#1A6ECA", // 5.09:1 sobre blanco — AA (blue-base solo da 4.00:1, no pasa)
          yellow: "#FCE838",
        },
        runners: {
          pink: "#E8144C", // color de marca (referencia visual del diseño aprobado)
          "pink-700": "#DA1347", // 5.04:1 sobre blanco — AA (pink-base da 4.53:1, muy al límite; en cream baja a 4.26:1 y ya no pasa)
          yellow: "#FCE838",
        },
        hotnuts: {
          orange: "#E85D0E",
          "orange-700": "#BC4B0B", // 5.06:1 sobre blanco — AA (orange-base solo da 3.50:1, no pasa)
        },
        goldennuts: {
          gold: "#C79A2E",
          "gold-700": "#896A20", // 5.06:1 sobre blanco — AA (gold-base solo da 2.60:1, no pasa)
        },
      },
      fontFamily: {
        // Text/Family/Text = Raleway (nav, botones, párrafos, nombres de marca)
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        // Teko: fuente condensada para los títulos de sección (H2)
        teko: ["var(--font-teko)", "sans-serif"],
        // Ronda 44: tipografía exclusiva de Takis (Brandbook 03.4) — ver
        // nota completa en globals.css. Solo se usa dentro de la sección
        // Takis, nunca en el resto del sitio.
        takisDisplay: ["var(--font-takis-display)", "sans-serif"],
        takisBody: ["var(--font-takis-body)", "sans-serif"],
        takisMark: ["var(--font-takis-mark)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Efecto de fuego (hero de Takis): las llamas "respiran" con un
        // ligero cambio de escala/opacidad, las chispas suben y se
        // desvanecen, el humo se dispersa lento. Todas con
        // motion-safe: para respetar prefers-reduced-motion.
        flame: {
          "0%, 100%": { transform: "scaleY(1) scaleX(1)", opacity: "0.9" },
          "50%": { transform: "scaleY(1.08) scaleX(0.97)", opacity: "1" },
        },
        "flame-fast": {
          "0%, 100%": { transform: "scaleY(1) translateY(0)", opacity: "0.85" },
          "50%": { transform: "scaleY(1.14) translateY(-4px)", opacity: "1" },
        },
        spark: {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
          "15%": { opacity: "1" },
          "100%": { transform: "translateY(-140px) translateX(10px)", opacity: "0" },
        },
        smoke: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.16" },
          "100%": { transform: "translateY(-60px) scale(1.7)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        flame: "flame 3.2s ease-in-out infinite",
        "flame-fast": "flame-fast 2.4s ease-in-out infinite",
        spark: "spark 2.6s ease-in infinite",
        smoke: "smoke 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
