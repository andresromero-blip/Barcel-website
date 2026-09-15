import { news } from "@/data/news";

function PlayIcon() {
  return (
    <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-white/90 text-barcel-black shadow-sm md:h-9 md:w-9">
      <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5 fill-current">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

export default function NewsSection() {
  return (
    <section id="novedades" className="bg-barcel-cream py-16 md:py-24">
      <div className="container-page mb-10">
        <h2 className="font-teko text-3xl font-bold uppercase text-barcel-red md:text-4xl">
          Nuestras novedades
        </h2>
        <p className="mt-2 max-w-2xl font-body text-sm text-barcel-black/70 md:text-base">
          Lo más nuevo de Barcel<sup>®</sup> está aquí. Mira las últimas
          publicaciones, lanzamientos, retos, sabores y momentos que están
          prendiendo las redes. Porque el antojo también se comparte.
        </p>
      </div>

      {/* Ronda 163: grid uniforme de 6 tiles del mismo tamaño — 2 columnas en
          mobile, 3 en desktop (6 es múltiplo exacto de ambas, así que nunca
          queda un tile solo en su fila con espacio vacío al lado, a
          diferencia del patrón anterior "1 grande + 4 chicos" pensado solo
          para 5 items). Cada tile ahora es un <a> real hacia la publicación
          de Instagram (antes solo abría un modal interno).

          Ronda 164: el cliente reportó que las imágenes se veían "cortadas"
          dentro del tile — con object-cover sobre una caja de proporción fija
          (min-h fijo + ancho fluido de la columna), cualquier imagen cuya
          proporción real no coincidiera exactamente con la caja perdía
          contenido por los bordes (en estas 6 piezas reales de Instagram el
          texto vive pegado arriba/abajo del post, así que el recorte se
          notaba mucho). Las 6 imágenes actuales son retrato ~4:5 (2 de ellas
          casi 1:1) — se fija esa proporción real en el tile (aspect-[4/5],
          en vez de un min-h arbitrario) y se cambia a object-contain: la
          imagen completa siempre es visible, sin recortar ningún borde. Para
          las 2 imágenes casi cuadradas esto deja un margen mínimo arriba/
          abajo dentro del tile — se usa bg-barcel-cream (mismo tono que el
          fondo de la sección) para que ese margen se mimetice con la página
          en vez de verse como una caja de letterbox. */}
      <div className="container-page grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
        {news.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex aspect-[4/5] overflow-hidden bg-barcel-cream text-left transition-transform duration-300 hover:-translate-y-1 ${item.span}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.label}
              className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
            {item.isVideo && <PlayIcon />}
          </a>
        ))}
      </div>
    </section>
  );
}
