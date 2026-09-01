import Link from "next/link";
import { BRAND_SOCIALS, type Brand } from "@/data/brands";

// Ronda 54: el cliente mandó un mockup pidiendo que la página de
// detalle de sabor (/marcas/takis/[flavor]) reutilice EXACTAMENTE el
// mismo hero de la página de marca (/marcas/takis) — mismo fondo, mismo
// tagline de marca (no un H1 con el nombre del sabor), misma
// descripción, mismo bloque "Síguelos". En vez de duplicar ~100 líneas
// de JSX entre BrandPage.tsx y ProductDetail.tsx, se extrae aquí como
// componente compartido; BrandPage.tsx también lo usa ahora para
// garantizar que ambas páginas queden 1:1 sin poder desincronizarse.
const TAKIS_HERO_BG = "/takis/hero-banner.jpg";
// Ronda 70: asset dedicado para mobile (1200x900, 4:3) — mismo arte,
// recompuesto por el cliente para verse bien en un layout apilado.
const TAKIS_HERO_BG_MOBILE = "/takis/hero-banner-mobile.jpg";

export default function TakisHero({ brand }: { brand: Brand }) {
  // Ronda 70: el cliente marcó "el hero banner en pantallas mobile no
  // es funcional" y pidió no tocar NADA de cómo se ve en desktop.
  //
  // Causa raíz real del problema en mobile: la versión de escritorio
  // (Ronda 69) resolvió el recorte poniendo la imagen de fondo en
  // position:absolute cubriendo TODA la sección, con el texto
  // (tagline/descripción/Síguelos) flotando ENCIMA en un segundo layer
  // — eso obliga a que la sección tenga una sola altura que sirva para
  // dos cosas a la vez: mostrar la imagen completa (aspect-ratio fijo,
  // 1920x1080) Y darle espacio al bloque de texto (que varía según el
  // tagline/descripción de cada marca). Esas dos necesidades de altura
  // compiten: si la sección crece para que quepa el texto, la imagen de
  // fondo (h-full, object-cover) se estira/recorta para cubrir esa
  // altura extra — literalmente el mismo bug que Ronda 69 arregló para
  // desktop, pero ahora causado por el texto en vez de por un clamp fijo.
  //
  // En vez de intentar exprimir ese mismo mecanismo (overlay absoluto)
  // para mobile con un segundo aspect-ratio, se separa el layout de
  // mobile en dos bloques apilados normales, sin overlay ni position:
  // absolute — la imagen (<img> con w-full h-auto, que respeta su
  // aspect ratio real de forma nativa sin ninguna regla CSS especial)
  // arriba, y el bloque de texto (fondo sólido morado, sin transparencia
  // que dependa de la imagen) debajo. Así la imagen NUNCA compite por
  // altura con nada — es imposible que se recorte, sin importar cuánto
  // texto traiga el tagline/descripción de cada sabor.
  //
  // El bloque <section> de desktop (md:) se deja completamente intacto,
  // tal cual quedó en Ronda 69 — solo se le agrega "hidden md:flex" para
  // alternar con el bloque de mobile, ninguna otra clase cambia.
  const followText = (
    <div className="mt-6 border-t border-white/20 pt-5">
      <p className="mb-3 font-display text-[11px] font-bold uppercase tracking-wide text-white/80">
        Síguelos
      </p>
      <div className="flex items-center gap-2.5">
        {BRAND_SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={`${social.label} de ${brand.name}`}
            className="flex h-9 w-9 items-center justify-center bg-white text-barcel-black shadow-sm transition-transform hover:scale-110"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d={social.path} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile (debajo de md): imagen apilada arriba, sin overlay —
          ver nota completa arriba. */}
      <section className="relative overflow-hidden bg-takis-purple md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TAKIS_HERO_BG_MOBILE}
          alt=""
          aria-hidden="true"
          className="block h-auto w-full"
        />
        <div className="px-4 py-6 sm:px-6">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wide text-white/80 transition-colors hover:text-white hover:underline"
          >
            <span aria-hidden>←</span> Volver al inicio
          </Link>
          {/* Ronda 112: el cliente pidió que el tagline se vea RECTO, sin
              inclinación, por temas de SEO — un H1 rotado con CSS
              transform sigue siendo texto real en el DOM (no afecta
              indexación), pero visualmente un heading torcido puede leerse
              como decorativo/menos "oficial" en capturas o previews que SEO
              suele evaluar. Se quita el transform: rotate(-2deg) y se deja
              el text-shadow (offset simple, no depende de la inclinación)
              como único acento de "doble impresión" del brandbook. */}
          <h1
            className="font-takisDisplay text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white"
            style={{
              textShadow: "3px 3px 0 rgba(87, 15, 139, 0.5)",
            }}
          >
            {brand.tagline}
          </h1>
          <p className="mt-4 max-w-sm font-takisBody text-base font-medium leading-relaxed text-white/80">
            {brand.description}
          </p>
          {followText}
        </div>
      </section>

      {/* Desktop (md+): Ronda 71 — el fondo (h-full w-full object-cover,
          Ronda 69) siempre ocupa el 100% del ancho de la sección, así que
          escala 1:1 con el viewport en CUALQUIER ancho. El texto, en
          cambio, vivía dentro de "container-page" (max-width fijo de
          1280px, Ronda 1) + una grid de 2 columnas — un mecanismo que
          solo imita el ancho real del personaje/logo de la imagen
          mientras el viewport mide ~768–1280px. Pasado ese punto,
          container-page se centra y dispara márgenes laterales que
          crecen sin límite (640px de por lado a 2560px), mientras la
          imagen de fondo sigue creciendo 1:1 con el viewport — el texto
          y el personaje se despegan cada vez más, dejando un vacío
          morado enorme en medio (reportado por el cliente a 2560px:
          "se ve mal y desorganizado").
          Fix: se cambia el padding del texto de píxeles fijos (o un
          max-width fijo) a un porcentaje del ancho de la sección
          (px-[4%]/[5%]) — con eso el borde izquierdo de la tarjeta de
          texto queda siempre al mismo % del ancho de la imagen, sin
          importar si la pantalla mide 768px o 3440px, porque ambos
          (imagen y padding) escalan con el mismo factor. El ancho de la
          tarjeta se limita con max-w explícito (no con una grid-column)
          para que no se vuelva gigante en monitores ultra anchos. */}
      <section className="relative hidden flex-col justify-center overflow-hidden bg-takis-purple md:flex md:aspect-[1920/1080]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TAKIS_HERO_BG}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-right-top"
        />

        <div className="relative flex w-full items-center px-5 py-14 sm:px-10 md:px-[4%] md:py-20 lg:px-[5%]">
          <div className="relative z-10 w-full max-w-[420px] bg-takis-purple px-4 py-5 sm:max-w-[460px] sm:px-6 sm:py-6">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wide text-white/80 transition-colors hover:text-white hover:underline"
            >
              <span aria-hidden>←</span> Volver al inicio
            </Link>
            {/* Ronda 112: mismo fix que el H1 de mobile — se quita el
                transform: rotate(-2deg), queda solo el text-shadow. */}
            <h1
              className="font-takisDisplay text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white sm:text-5xl md:text-6xl"
              style={{
                textShadow: "3px 3px 0 rgba(87, 15, 139, 0.5)",
              }}
            >
              {brand.tagline}
            </h1>
            <p className="mt-4 max-w-sm font-takisBody text-base font-medium leading-relaxed text-white/80">
              {brand.description}
            </p>
            {followText}
          </div>
        </div>
      </section>
    </>
  );
}
