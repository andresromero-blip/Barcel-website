export type NewsItem = {
  id: string;
  image: string;
  label: string;
  isVideo: boolean;
  span: string; // tailwind grid span classes
};

// Assets reales del prototipo (public/novedades). El diseño de referencia
// reutiliza la foto 1 dos veces (tile grande + tile pequeño) — se replica 1:1.
export const news: NewsItem[] = [
  {
    id: "n1",
    image: "/novedades/1.jpg",
    label: "Le pegas pero con ganas — ¡Últimos días! Corre por tus stickers coleccionables",
    isVideo: false,
    span: "md:row-span-2",
  },
  {
    id: "n2",
    image: "/novedades/2.png",
    label: "Somos Papas Barcel®",
    isVideo: true,
    span: "",
  },
  {
    id: "n3",
    image: "/novedades/3.png",
    label: "Antójate con la comunidad Barcel®",
    isVideo: true,
    span: "",
  },
  {
    id: "n4",
    image: "/novedades/4.png",
    label: "Ya hace falta un diciembre de lokiar, ¿no? Yo picho las Papas Barcel®",
    isVideo: false,
    span: "",
  },
  {
    id: "n5",
    image: "/novedades/1.jpg",
    label: "¡Últimos días! Corre por tus stickers coleccionables",
    isVideo: false,
    span: "",
  },
];
