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

          Ronda 165b (segundo intento, TAMPOCO alcanzó): se normalizaron los
          6 archivos a ratio 4:5 exacto agregando RELLENO de color
          (ImageMagick -extent con fondo #FFF7EC) a las 2 imágenes casi
          cuadradas. Las cajas quedaron idénticas, pero con object-cover
          sobre un archivo cuyo ratio ya es exactamente 4:5 no hay recorte —
          o sea, el relleno que se acababa de agregar se veía completo,
          como franjas cream visibles arriba/abajo DENTRO de esas 2 fotos.
          El cliente lo reportó correctamente: "Pasen a confesarse" (sin
          relleno) se veía con la foto a bandera completa, mientras
          "No es un cumpleaños" y "Juégalos" (con relleno) se veían con su
          foto real comprimida en el centro — mismo problema de fondo que
          Ronda 165, solo que ahora el margen quedó "horneado" en el archivo
          en vez de ser transparente.

          Fix real (confirmado con el cliente vía pregunta directa: recortar
          un poco los bordes es preferible a que se siga viendo asimétrico):
          para las 2 imágenes casi cuadradas (no-es-cumple-sin-fiesta
          1200x1196 y runners-juegalos 1194x1196, ambas ratio ≈1.0) se
          recortan los COSTADOS (no arriba/abajo) con ImageMagick -gravity
          center -crop hasta llegar a 957x1196 (ratio 0.8002, igual que las
          otras 4) — el recorte solo quita fondo/follaje de los bordes
          laterales, nunca el texto principal (centrado horizontalmente en
          ambas piezas) ni el producto. Las otras 4 imágenes ya estaban a
          ~0.75–0.80 de aspecto real (mucho más cerca de 4:5) y se dejan con
          su relleno mínimo previo (1–6px, imperceptible) porque recortarles
          ALTURA sí arriesgaba cortar texto pegado a los bordes (el problema
          original de Ronda 164). Resultado: las 6 imágenes miden
          exactamente ratio 0.8 en disco — con object-cover llenan la caja
          de borde a borde, sin ninguna banda de color visible y sin tocar
          nunca texto ni producto. */}
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
