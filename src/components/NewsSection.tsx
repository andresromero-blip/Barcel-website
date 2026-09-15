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
          en vez de verse como una caja de letterbox.

          Ronda 165 (primer intento, INSUFICIENTE — se deja documentado
          porque explica por qué el fix real es otro): "todos los
          contenedores sean simétricos en mobile" (aclarado: de esta
          sección). La medición de la CAJA (getBoundingClientRect de cada
          <a>) ya daba 164x204px idénticas en las 6 — el problema no estaba
          ahí. Un primer intento agregó padding uniforme (p-3) a las 6 cajas,
          pero eso NO arregla nada real: con object-contain, 2 de las 6
          imágenes (casi cuadradas: no-es-cumple-sin-fiesta 1200x1196≈1.003,
          runners-juegalos 1194x1196≈0.998) seguían dejando ~20% de banda
          vacía arriba/abajo DENTRO de su propia área de imagen, mientras las
          otras 4 (≈0.75–0.80 de aspecto) casi no dejaban banda — el padding
          extra solo encogió todo por igual sin igualar esa banda, así que el
          cliente siguió viendo fotos de alto visual distinto entre tiles de
          la misma fila (correcto — "una más alta que otra").

          Fix real: en vez de pelear con el CSS en el navegador, se
          normalizan los ARCHIVOS de imagen a la proporción exacta 4:5 antes
          de servirlos (ImageMagick -gravity center -background "#FFF7EC"
          -extent, mismo tono que bg-barcel-cream) — se les agrega relleno
          real en los márgenes más cortos (arriba/abajo o izq/der según cada
          caso) hasta que el archivo mismo mide exactamente ratio 0.8, igual
          que el contenedor. Con eso, cualquier object-fit (se usa cover)
          llena la caja de borde a borde en las 6 por igual, sin banda
          visible y sin recortar ni un píxel de la foto original — el
          "recorte" de cover como mucho toca el relleno cream que se acaba de
          agregar, nunca el contenido real (Ronda 164 se respeta). Esto
          resuelve la causa raíz en vez de compensarla con CSS: las 6 fotos
          ahora tienen literalmente la misma proporción en disco, así que se
          ven con el mismo "peso" visual en cualquier breakpoint. */}
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
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {item.isVideo && <PlayIcon />}
          </a>
        ))}
      </div>
    </section>
  );
}
