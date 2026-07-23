import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
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
          green: "#28C445", // color de marca (referencia visual del diseño aprobado)
          "green-600": "#1FA036",
          "green-700": "#14802A", // 5.06:1 sobre blanco — AA para texto normal
          brown: "#5A3A22",
        },
        takis: {
          purple: "#7B1FE0", // color de marca (referencia visual del diseño aprobado)
          "purple-600": "#6B1FD0",
          yellow: "#FBE733",
        },
        bigmix: {
          blue: "#1E7FE8", // color de marca (referencia visual del diseño aprobado)
          "blue-600": "#1569C4",
          yellow: "#FCE838",
        },
        runners: {
          pink: "#E8144C", // color de marca (referencia visual del diseño aprobado)
          yellow: "#FCE838",
        },
        hotnuts: {
          orange: "#E85D0E",
        },
        goldennuts: {
          gold: "#C79A2E",
        },
      },
      fontFamily: {
        // Text/Family/Text = Raleway (nav, botones, párrafos, nombres de marca)
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        // Teko: fuente condensada para los títulos de sección (H2)
        teko: ["var(--font-teko)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
