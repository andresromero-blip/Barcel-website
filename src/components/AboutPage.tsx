import Link from "next/link";
import { brands } from "@/data/brands";

// Ronda 166: rediseño Figma 1:1 de /sobre-nosotros ("Quiénes somos"),
// reemplazando la versión wireframe de la Ronda 40 (node 117:2789,
// archivo "Prototipo Barcel", ya superado). Referencia real: archivo
// "Barce site", node-id=1-3482 (desktop) y node-id=1-10769 (mobile) —
// mismo patrón "Figma real reemplaza wireframe" ya aplicado en Home
// (Rondas 201-203) y Contacto (Ronda 146).
//
// El copy completo de este frame (incluye emojis, saltos de línea y los
// 3 bloques "Espacio para imagen/video X — Puede o no ir, tener en
// cuenta que es referencia de contenido") es contenido de mockup
// explícitamente marcado como tal por el propio Figma, con una nota al
// pie ("Este contenido es un texto mockup de referencia para diseño
// UX/UI y debe ser revisado y aprobado") — se implementa tal cual,
// incluyendo esa nota y los 3 placeholders de imagen/video vacíos (no
// se inventa ni se reemplaza contenido que el propio diseño marca como
// pendiente de validar por el equipo de marca).
//
// El banner "¡Orgullosamente botaneros!" de la Ronda 40 no existe en
// ninguno de los dos frames de este rediseño — se elimina, mismo
// criterio de reemplazo completo (no merge) ya usado en Home/Contacto.
//
// "Marcas icónicas": se usa brands.length en vez del "8" fijo del
// diseño para que nunca quede desactualizado si se agrega o quita una
// marca (hoy coincide: 8).
//
// Breadcrumb: el frame mobile NO lo incluye (mismo patrón ya usado en
// la página de producto, Ronda 158) — solo se muestra desde md:.
//
// Nota de contenido (node 1:10820, "Este contenido es un texto
// mockup..."): el frame mobile la trae a 32px, idéntico al desktop —
// inconsistencia del archivo de Figma (se ve claramente sobredimensionada
// contra el resto de la tipografía mobile de 16-24px). Se implementa a
// un tamaño proporcional (text-sm/md:text-lg) en vez de replicar ese
// valor literal, que rompería el layout mobile.
const STATS = [
  { value: "+45", label: "Años de sabor" },
  { value: String(brands.length), label: "Marcas icónicas" },
  { value: "+40", label: "Productos" },
];

// Los 3 bloques "Formatos" del Figma son placeholders explícitos de
// contenido futuro (imagen/video real aún no definido) — se replican
// como cajas vacías con el mismo texto de referencia, no como imágenes
// inventadas.
function ImagePlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full items-center justify-center border border-grey-400 bg-white px-6 py-10 text-center ${className ?? ""}`}
    >
      <p className="font-display text-sm font-semibold leading-normal text-grey-700 md:text-2xl">
        {label}
        <br />
        <span className="font-normal">
          — Puede o no ir, tener en cuenta que es referencia de contenido.
        </span>
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-barcel-red-950 to-barcel-red-dark px-5 py-16 text-center text-white sm:py-20 md:py-28">
        <div className="container-page flex flex-col items-center gap-4 sm:gap-6">
          <nav
            aria-label="Ruta de navegación"
            className="hidden w-full items-center gap-1.5 text-left font-body text-sm text-white/80 md:flex"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Inicio
            </Link>
            <span aria-hidden="true" className="text-white/50">
              /
            </span>
            <span className="text-white underline underline-offset-2">
              Sobre nosotros
            </span>
          </nav>
          <h1 className="font-teko text-6xl font-bold uppercase leading-[0.9] sm:text-7xl md:text-8xl lg:text-[100px]">
            Sobre nosotros
          </h1>
          <p className="max-w-2xl font-body text-base font-medium leading-relaxed sm:text-lg md:text-xl">
            La marca que convirtió el antojo en actitud. Esto es Barcel:
            sabor, crunch y cero aburrimiento.
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="bg-grey-50 px-5 py-16 md:py-24">
        <div className="container-page mx-auto flex max-w-3xl flex-col items-center gap-8 text-center md:gap-10">
          <div className="font-teko text-5xl font-semibold uppercase leading-[0.9] text-barcel-red sm:text-6xl md:text-7xl">
            <p>El antojo no pide permiso.</p>
            <p>Se disfruta.</p>
          </div>
          <p className="font-body text-base leading-[1.2] text-grey-700 md:text-2xl">
            Somos una marca nacida para ponerle sabor, actitud y mucho
            crunch a esos momentos que merecen algo más. Desde nuestros
            primeros pasos, hemos creado botanas para quienes disfrutan
            probar, compartir y descubrir nuevos sabores.
          </p>

          <ImagePlaceholder
            label="Espacio para imagen 16:9 o video 16:9"
            className="aspect-video max-w-4xl"
          />

          <div className="grid w-full grid-cols-3 gap-3 md:gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 border border-grey-50 bg-white p-4 md:gap-4 md:p-10"
              >
                <p className="font-teko text-4xl font-semibold uppercase leading-[0.9] text-barcel-red md:text-7xl">
                  {stat.value}
                </p>
                <p className="text-center font-body text-xs font-medium text-grey-700 md:text-2xl">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl font-semibold text-grey-950 md:text-4xl">
            Aquí el sabor juega en grande
          </h2>
          <p className="font-body text-base leading-[1.2] text-grey-700 md:text-2xl">
            <span className="font-bold text-barcel-red">
              Nos gustan las ideas intensas,
            </span>{" "}
            las combinaciones inesperadas y ese momento en el que abres una
            bolsa y sabes que será difícil comer solo una. Por eso creamos
            un universo de botanas con personalidades distintas, desde las
            más picositas hasta las que conquistan con su crunch.
          </p>

          <h2 className="font-display text-2xl font-semibold text-grey-950 md:text-4xl">
            Una botana para cada antojo
          </h2>
          <p className="font-body text-base leading-[1.2] text-grey-700 md:text-2xl">
            ¿Eres de fuego? 🌶️
            <br />
            ¿De queso? 🧀
            <br />
            ¿De algo dulce? 🍿
            <br />
            ¿O de los que dicen &ldquo;solo una&rdquo; y terminan buscando
            hasta la última migaja? 👀
            <br />
            <br />
            Aquí hay espacio para todos los antojos.
          </p>

          <ImagePlaceholder
            label="Espacio para imagen 1:1"
            className="aspect-square max-w-md"
          />

          <h2 className="font-display text-2xl font-semibold text-grey-950 md:text-4xl">
            Más que botanas, momentos para compartir
          </h2>
          <p className="font-body text-base leading-[1.2] text-grey-700 md:text-2xl">
            Una película, una reunión, el partido, una tarde con amigos o
            ese antojo que apareció sin avisar. Creamos productos para
            acompañar esos momentos y convertirlos en experiencias llenas
            de sabor.
          </p>

          <ImagePlaceholder
            label="Espacio para post o video 9:16"
            className="aspect-[9/16] max-w-xs"
          />

          <h2 className="font-display text-2xl font-semibold text-grey-950 md:text-4xl">
            Nuestro ingrediente secreto: la actitud
          </h2>
          <p className="font-body text-base leading-[1.2] text-grey-700 md:text-2xl">
            Nos gusta hacer las cosas diferentes, experimentar con sabores
            y mantenernos cerca de quienes convierten cualquier momento en
            una buena historia.
            <br />
            <br />
            Porque si algo hemos aprendido es que el antojo puede aparecer
            en cualquier momento.
            <br />
            <br />
            Y cuando llega, más vale tener una bolsa cerca.
          </p>

          <h2 className="font-display text-2xl font-semibold text-grey-950 md:text-4xl">
            Descubre nuestro universo de sabores
          </h2>
          <p className="font-body text-base leading-[1.2] text-grey-700 md:text-2xl">
            Explora nuestras marcas, conoce nuestros productos y encuentra
            la botana que va contigo.
          </p>

          <Link
            href="/#marcas"
            className="inline-flex items-center gap-3 border-2 border-white bg-barcel-red-dark px-6 py-4 font-display text-sm font-bold text-white transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-red-dark active:scale-95 md:text-base"
          >
            Explora todas nuestras botanas
            <span aria-hidden="true">→</span>
          </Link>

          <p className="font-body text-sm italic text-grey-700 md:text-lg">
            Este contenido es un texto mockup de referencia para diseño
            UX/UI y debe ser revisado y aprobado.
          </p>
        </div>
      </section>
    </>
  );
}
