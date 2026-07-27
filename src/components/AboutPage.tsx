import { brands } from "@/data/brands";

// Ronda 40: página "Quiénes somos" — 1:1 con el wireframe de Figma
// (node 117:2789, archivo "Prototipo Barcel"), adaptada a los
// componentes/tokens ya establecidos del sitio (Header/Footer reales,
// fuentes Teko/Raleway, paleta barcel-red/grey).
//
// Contraste del hero: el wireframe original usa un degradado de
// red-dark (#ce0728) a red-600 (#f5173c). Verificado con la fórmula
// WCAG: texto blanco sobre red-dark da 5.70:1 (AA), pero sobre red-600
// solo da 4.14:1 — no pasa el 4.5:1 que exige AA para el subtítulo
// (texto normal; el H1 sí calificaría como texto grande, pero el
// subtítulo no). Se cambia el extremo claro del degradado a red-dark
// mismo (de red-950 a red-dark) para que TODO el rango del degradado
// quede en zona segura (15.77:1 – 5.70:1), sin perder el efecto de
// degradado del diseño original.
//
// "Marcas icónicas": el wireframe trae "5" como copy de ejemplo, pero
// el sitio ya tiene 6 marcas reales cargadas en brands.ts — se usa
// brands.length en vez del número fijo del wireframe para que nunca
// quede desactualizado si se agrega o quita una marca.
const STATS = [
  { value: "+45", label: "Años de sabor" },
  { value: String(brands.length), label: "Marcas icónicas" },
  { value: "+20", label: "Categorías de botanas" },
  { value: "1", label: "Antojo infinito" },
];

// Acentos decorativos del banner final: en vez de replicar el
// ilustración de Figma (assets no descargables, solo disponibles vía
// URLs temporales de Figma), se reutilizan fotos reales de producto ya
// existentes en el proyecto — mismo espíritu ("orgullosamente
// botaneros", mostrar el portafolio real) sin depender de assets
// externos con vencimiento de 7 días.
const BANNER_ACCENTS = [
  { src: "/products/chips/flavors/fuego.png", className: "left-[2%] top-[10%] w-24 -rotate-12 sm:w-32 md:w-40" },
  { src: "/products/runners/flavors/fuego.png", className: "right-[3%] top-[6%] w-20 rotate-12 sm:w-28 md:w-36" },
  { src: "/products/golden-nuts/flavors/japones.png", className: "bottom-[6%] left-[6%] w-16 rotate-6 sm:w-24 md:w-28" },
  { src: "/products/big-mix/flavors/queso.png", className: "bottom-[8%] right-[4%] w-20 -rotate-6 sm:w-28 md:w-32" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-barcel-red-950 to-barcel-red-dark px-5 py-16 text-center text-white sm:py-20 md:py-28">
        <div className="container-page flex flex-col items-center gap-4 sm:gap-6">
          <h1 className="font-teko text-6xl font-bold uppercase leading-[0.9] sm:text-7xl md:text-8xl lg:text-[120px]">
            Quiénes somos
          </h1>
          <p className="max-w-2xl font-body text-base font-medium leading-relaxed sm:text-lg md:text-xl">
            La marca que convirtió el antojo en actitud. Esto es Barcel:
            sabor, crunch y cero aburrimiento.
          </p>
        </div>
      </section>

      {/* Historia */}
      <section className="bg-white px-5 py-16 text-center md:py-24">
        <div className="container-page mx-auto flex max-w-3xl flex-col items-center gap-6">
          <h2 className="font-teko text-4xl font-semibold uppercase leading-[0.95] text-grey-950 sm:text-5xl md:text-6xl">
            Sabor con historia, actitud de hoy
          </h2>
          <p className="font-body text-base leading-relaxed text-grey-700 md:text-lg">
            Barcel, parte de Grupo Bimbo, nació para llevar botanas con
            personalidad a cada rincón. Detrás de cada bolsa hay décadas
            de saber botanero, marcas que se volvieron íconos y una
            obsesión: que cada crunch valga la pena. No hacemos botanas
            básicas. Hacemos antojos con actitud, combinaciones que
            sorprenden y sabores que se quedan en la memoria.
          </p>
          {/* Nota del wireframe original — se conserva visible a
              propósito (mismo criterio que los placeholders de
              Ingredientes/Información nutrimental en la página de
              producto): marca claramente que este copy es de ejemplo y
              falta validación del equipo de marca. Color: text-barcel-black/70
              (ya verificado ≥7:1 sobre blanco), no el gris claro del
              wireframe que no pasaría AA. */}
          <p className="font-body text-sm italic text-barcel-black/70">
            [Contenido referencial — pendiente de validar y reemplazar
            por el equipo de marca]
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white px-5 pb-16 md:pb-24">
        <div className="container-page grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-3xl bg-grey-50 px-4 py-8 sm:gap-2 md:py-10"
            >
              <p className="font-teko text-6xl font-bold leading-[0.9] text-barcel-red-dark sm:text-7xl md:text-8xl">
                {stat.value}
              </p>
              <p className="text-center font-display text-xs font-semibold text-grey-950 sm:text-sm md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Banner "¡Orgullosamente botaneros!" */}
      <section className="relative overflow-hidden border-y-2 border-barcel-black bg-barcel-red-900 px-5 py-20 md:py-28">
        {BANNER_ACCENTS.map((accent) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={accent.src}
            src={accent.src}
            alt=""
            aria-hidden="true"
            className={`pointer-events-none absolute z-0 h-auto object-contain opacity-90 drop-shadow-2xl ${accent.className}`}
          />
        ))}
        <h2 className="relative z-10 mx-auto max-w-4xl text-center font-teko text-5xl font-semibold uppercase leading-[0.85] text-white sm:text-7xl md:text-8xl lg:text-9xl">
          ¡Orgullosamente botaneros!
        </h2>
      </section>
    </>
  );
}
