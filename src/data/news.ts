export type NewsItem = {
  id: string;
  image: string;
  label: string;
  tag: string;
  isVideo: boolean;
  span: string; // tailwind grid span classes
};

// Assets reales del prototipo (public/novedades)
export const news: NewsItem[] = [
  {
    id: "n1",
    image: "/novedades/1.jpg",
    label: "Le pegas pero con ganas — ¡Últimos días! Corre por tus stickers coleccionables",
    tag: "Promoción",
    isVideo: false,
    span: "md:row-span-2",
  },
  {
    id: "n2",
    image: "/novedades/2.png",
    label: "Somos Papas Barcel®",
    tag: "Novedad",
    isVideo: true,
    span: "",
  },
  {
    id: "n3",
    image: "/novedades/3.png",
    label: "Antójate con la comunidad Barcel®",
    tag: "Video",
    isVideo: true,
    span: "",
  },
  {
    id: "n4",
    image: "/novedades/4.png",
    label: "Ya hace falta un diciembre de lokiar, ¿no? Yo picho las Papas Barcel®",
    tag: "Campaña",
    isVideo: false,
    span: "md:col-span-2",
  },
];
