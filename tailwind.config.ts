import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
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
          green: "#02e55b", // Complementary Colors/Green/500
          "green-600": "#00bf47", // Complementary Colors/Green/600
          brown: "#5A3A22",
        },
        takis: {
          purple: "#ac43ff", // Complementary Colors/Purple/500
          "purple-600": "#981eff", // Complementary Colors/Purple/600
          yellow: "#FBE733",
        },
        bigmix: {
          blue: "#0a8ced", // Complementary Colors/Blue/500
          "blue-600": "#006dcb", // Complementary Colors/Blue/600
          yellow: "#FCE838",
        },
        runners: {
          pink: "#f5173c", // Colors base/Primary/600*
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
        // Text/Family/Text = Raleway (única familia usada en el sistema de diseño)
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
