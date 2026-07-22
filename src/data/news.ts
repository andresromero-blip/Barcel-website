export type NewsItem = {
  id: string;
  label: string;
  tag: string;
  bg: string;
  span: string; // tailwind grid span classes
};

export const news: NewsItem[] = [
  {
    id: "n1",
    label: "Últimos días: corre por tus stickers coleccionables",
    tag: "Promoción",
    bg: "bg-barcel-red",
    span: "md:row-span-2",
  },
  {
    id: "n2",
    label: "Suma papas Barcel® y gana",
    tag: "Novedad",
    bg: "bg-chips-green",
    span: "",
  },
  {
    id: "n3",
    label: "Nueva textura, mismo sabor picoso",
    tag: "Lanzamiento",
    bg: "bg-takis-purple",
    span: "",
  },
  {
    id: "n4",
    label: "Antójate con la comunidad Barcel®",
    tag: "Comunidad",
    bg: "bg-bigmix-blue",
    span: "md:col-span-2",
  },
  {
    id: "n5",
    label: "Reto de octubre: fox mode on",
    tag: "Reto",
    bg: "bg-runners-pink",
    span: "",
  },
  {
    id: "n6",
    label: "Últimos días para tus stickers",
    tag: "Promoción",
    bg: "bg-hotnuts-orange",
    span: "",
  },
];
