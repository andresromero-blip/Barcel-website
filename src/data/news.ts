export type NewsItem = {
  id: string;
  image: string;
  label: string;
  isVideo: boolean;
  span: string; // tailwind grid span classes
  href: string; // publicación real de Instagram
};

// Ronda 163: el cliente reportó (captura de mobile) que la retícula dejaba un
// "espacio muerto" — la cuadrícula anterior tenía 5 tiles (1 grande con
// md:row-span-2 + 4 regulares) pensada para un grid de 3 columnas x 2 filas
// en desktop; ese row-span solo aplica desde md, así que en mobile
// (grid-cols-2, sin row-span) los 5 items caían en un grid de 2 columnas
// dejando el quinto tile solo en su fila, con medio hueco vacío a su lado.
// El cliente además compartió contenido real nuevo (6 piezas, con su
// publicación de Instagram cada una) para reemplazar el set anterior. Se
// aprovecha el cambio para resolver la causa raíz del hueco: en vez del
// patrón asimétrico "1 grande + 4 chicos" (que solo cuadra en un múltiplo
// específico), ahora las 6 piezas son del mismo tamaño en un grid uniforme
// 2 columnas (mobile) / 3 columnas (desktop) — 6 es múltiplo exacto de
// ambos, así que no puede quedar ningún tile huérfano en ninguna de las dos
// cuadrículas. Cada tile ahora enlaza a su publicación real de Instagram
// (antes solo abrían un modal interno con la imagen ampliada, sin salida a
// la red social real).
export const news: NewsItem[] = [
  {
    id: "n1",
    image: "/novedades/pasen-a-confesarse.jpg",
    label: "Pasen a confesarse con el Tío Takis (tranquilos, aquí sí los vamos a juzgar)",
    isVideo: false,
    span: "",
    href: "https://www.instagram.com/p/DcmSb0inf1s/",
  },
  {
    id: "n2",
    image: "/novedades/no-es-cumple-sin-fiesta.jpg",
    label: "No es un cumpleaños sin una fiesta — Chip's® Jalapeño",
    isVideo: false,
    span: "",
    href: "https://www.instagram.com/p/DcwC1UJoOmE/",
  },
  {
    id: "n3",
    image: "/novedades/disfruta-tu-mix.jpg",
    label: "Disfruta tu Mix — Big Mix®",
    isVideo: false,
    span: "",
    href: "https://www.instagram.com/p/Dc62XrsoDgf/",
  },
  {
    id: "n4",
    image: "/novedades/hot-nuts-enigma.jpg",
    label: "Hot Nuts® Enigma — nuevo",
    isVideo: false,
    span: "",
    href: "https://www.instagram.com/p/DdMoiBllKdq/",
  },
  {
    id: "n5",
    image: "/novedades/runners-juegalos.jpg",
    label: "Runners® — Juégalos",
    isVideo: false,
    span: "",
    href: "https://www.instagram.com/p/DdMoiBllKdq/",
  },
  {
    id: "n6",
    image: "/novedades/el-emoji-que-tenemos.jpg",
    label: "El emoji que tenemos vs. los que merecemos — POP®",
    isVideo: false,
    span: "",
    href: "https://www.instagram.com/p/DbL3rOrE1G6/",
  },
];
