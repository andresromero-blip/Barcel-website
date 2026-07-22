import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        barcel: {
          red: "#E1122A",
          "red-dark": "#B80E22",
          black: "#141414",
          cream: "#FFF7EC",
        },
        chips: {
          green: "#28C445",
          brown: "#5A3A22",
        },
        takis: {
          purple: "#7B1FE0",
          yellow: "#FBE733",
        },
        bigmix: {
          blue: "#1E7FE8",
          yellow: "#FCE838",
        },
        runners: {
          pink: "#E8144C",
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
