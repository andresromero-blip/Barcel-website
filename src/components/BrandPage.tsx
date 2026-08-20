import Link from "next/link";
import type { Brand } from "@/data/brands";
import ProductSlider from "./ProductSlider";

// Ronda 49: el cliente pidió el fondo 1:1 con el asset real del
// brandbook — las Rondas 45/46 lo habían reconstruido a mano (clip-path +
// espirales + puntos de halftone en JS) y el resultado no calzaba bien
// ("muy mal finalizado"). Se reemplaza todo eso por la FOTO real que
// mandó el cliente (recorte de la portada "04 BRAND ASSETS &
// APPLICATIONS" del Takis Global Brandbook 2025: diagonal morado/amarillo,
// costura de halftone y espirales, todo ya resuelto en el archivo) usada
// directo como imagen de fondo — 1:1 real, no una aproximación.
const TAKIS_HERO_BG = "/takis/hero-bg-v2.jpg";

// Redes propias de cada marca (NO las corporativas de Barcel, que ya
// viven en el Footer). Placeholders (#) hasta contar con las cuentas
// reales de cada marca — el diseño y la ubicación ya quedan resueltos.
//
// Ronda 31: paths reemplazados por los oficiales de Simple Icons
// (simple-icons, MIT — glifos de marca verificados 1:1 con el logo real
// de cada red), en vez de las aproximaciones dibujadas a mano que había
// antes.
const BRAND_SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  },
  {
    label: "TikTok",
    href: "#",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
];

export default function BrandPage({
  brand,
  otherBrands,
}: {
  brand: Brand;
  otherBrands: Brand[];
}) {
  // Composición 1:1 con el referente compartido (banner Lay's): sin logo
  // en el hero — el producto (empaque real) es el protagonista, en dos
  // piezas apiladas/inclinadas, con 1-2 fotos sueltas de más sabores
  // flotando alrededor a modo de acento. heroImage suele repetir el
  // mismo sabor que flavors[0] (mismo pack, archivo distinto pensado
  // para otro tamaño) — se detecta y se salta para no mostrar el mismo
  // sabor dos veces.
  const heroFlavorStem = brand.heroImage?.match(/hero-([a-z0-9-]+)\.png$/)?.[1];
  const remainingFlavors = heroFlavorStem
    ? (brand.flavors ?? []).filter((f) => !f.image.endsWith(`/${heroFlavorStem}.png`))
    : brand.flavors ?? [];
  const bagImages = [brand.heroImage, remainingFlavors[0]?.image].filter(
    (src): src is string => Boolean(src)
  );
  const accentImages = remainingFlavors.slice(1, 3).map((f) => f.image);
  // Ronda 36: antes se inferia de heroText === "text-white", pero ahora
  // heroText puede ser un acento de marca (café, amarillo...) para el H1
  // sin que eso signifique que el texto de apoyo (párrafo/redes/
  // breadcrumb) también deba ser claro — ese texto exige 4.5:1 (no 3:1) y
  // sigue el campo explícito lightHero, no el color del H1.
  const isLightText = brand.lightHero;
  const isTakis = brand.slug === "takis";

  return (
    <>
      {/* Hero — color sólido de marca con formas decorativas sutiles de
          fondo (mismo tono, solo una capa translúcida más para dar
          textura, igual que el referente). El texto va directo sobre el
          color de marca (sin tarjeta blanca) usando heroText — mismo par
          de contraste AA ya verificado para hoverText/hoverBg. Sin logo
          ni nombre de marca como texto: el producto real (con su propio
          empaque impreso) es quien comunica la marca.

          ALTURA — ajustada en la Ronda 26 (el cliente la sintió muy alta
          incluso ya sin CTA/logo gigante): mismo mecanismo min-height +
          clamp() de la Ronda 20, solo que con valores más bajos. Sigue
          siendo min-height (no height fija) a propósito: WCAG 1.4.4
          (Resize Text) y 1.4.10 (Reflow) exigen que el contenido nunca se
          recorte ni se superponga al agrandar el texto o achicar el
          viewport — si la descripción de una marca es más larga, la
          sección crece, nunca recorta.
            - Piso 400px: nunca se ve aplastado en celulares en horizontal.
            - Medio 46dvh (antes 60dvh): bajamos el peso del viewport real
              para que el hero ya no domine la pantalla completa en la
              mayoría de celulares/laptops.
            - Techo 600px (antes 760px): en monitores grandes ocupa
              claramente menos que la mitad de la pantalla.
          `flex flex-col justify-center` centra el contenido verticalmente
          en ese espacio en vez de dejarlo pegado arriba cuando el
          contenido es más corto que el mínimo garantizado. */}
      <section
        className={`relative flex min-h-[clamp(400px,46dvh,600px)] flex-col justify-center overflow-hidden ${
          isTakis ? "bg-takis-purple" : brand.bg
        }`}
      >
        {isTakis ? (
          // Ronda 49: la foto real del cliente (ver TAKIS_HERO_BG arriba)
          // reemplaza toda la reconstrucción a mano de las Rondas 45/46 —
          // 1:1 real, no una aproximación con clip-path/espirales/puntos.
          // object-cover + una posición por breakpoint para que la diagonal
          // y las espirales queden encuadradas tanto en mobile (recorte más
          // angosto) como en desktop (imagen casi completa). El fondo
          // bg-takis-purple del <section> es solo el color de "carga" antes
          // de que la imagen esté lista — nunca se ve el salto de color
          // porque coincide con la esquina superior-izquierda de la foto.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={TAKIS_HERO_BG}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[85%_50%] md:object-center"
          />
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 800 500"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <g
              className={isLightText ? "stroke-white/10" : "stroke-black/10"}
              fill="none"
              strokeWidth="60"
              strokeLinecap="round"
            >
              <path d="M-50 420 C 200 320, 350 480, 620 360 S 900 260, 900 260" />
              <path d="M-80 120 C 150 40, 300 180, 560 80 S 880 -20, 880 -20" />
            </g>
          </svg>
        )}

        <div className="container-page relative grid gap-8 py-14 md:grid-cols-2 md:items-center md:gap-12 md:py-20">
          {/* Ronda 48 (bug reportado por el cliente): el fondo diagonal de
              Ronda 46 usa un clip-path en % — que asume una altura de
              contenido "típica". Con una descripción más larga (o con
              zoom/reflow de WCAG 1.4.10, que agranda el texto), la columna
              de texto crece más de lo previsto y el bloque "Síguelos" +
              iconos termina cayendo sobre la franja AMARILLA del fondo,
              mientras el texto sigue pintado en blanco (isLightText, pensado
              para el morado) — el amarillo se vuelve invisible. La causa de
              fondo es que el contraste dependía de una posición en % de un
              fondo decorativo, no del contenido real: cualquier texto más
              largo que el "caso típico" puede volver a romperlo.
              Fix: en vez de perseguir el % exacto, la columna de texto de
              Takis lleva su propio respaldo sólido bg-takis-purple (con
              padding), por ENCIMA de la capa decorativa (z-10) — así el
              contraste queda garantizado sin importar cuántas líneas mida
              la descripción real, sea cual sea el idioma o el zoom del
              usuario. El morado sólido además es fiel al color base del
              brandbook (mismo tono que ya usa la mitad superior). */}
          <div
            className={`relative z-10 order-2 ${
              isTakis ? "bg-takis-purple px-4 py-5 sm:px-6 sm:py-6" : ""
            } ${brand.imageFirst ? "md:order-2" : "md:order-1"}`}
          >
            {/* Ronda 35: contraste AA. El link y el label "Síguelos" iban a
                /50 (dark) o /60 (light) de opacidad — contra un fondo de
                marca saturado eso cae a ~2.3–3.3:1, muy por debajo del
                4.5:1 que exige AA para texto normal. Como el texto ya usa
                el negro/blanco más oscuro/claro disponible, no hay margen
                para "atenuar" con opacidad: baja de 100% (dark) u 80%
                (light) y deja de pasar en casi todas las marcas (medido
                contra cada color real, no aproximado). La jerarquía visual
                con el heading ahora viene del tamaño/peso, no del color; el
                hover usa underline en vez de "oscurecer más" (ya no hay a
                dónde oscurecer). */}
            <Link
              href="/"
              className={`mb-6 inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wide transition-colors hover:underline ${
                isLightText ? "text-white/80 hover:text-white" : "text-black"
              }`}
            >
              <span aria-hidden>←</span> Volver al inicio
            </Link>
            {/* Ronda 44: Takis usa font-takisDisplay (sustituto libre de
                Veneer, ver globals.css) en vez de la Teko compartida por
                el resto del sitio — así el manual de marca diferencia su
                tipografía de comunicación sin tocar las otras 5 marcas.
                Ronda 45: cambia de Bungee a Anton (ver globals.css) y se
                le suma un leve -2° de inclinación + text-shadow doble
                (offset sólido, sin blur — imita el efecto de una segunda
                pasada de pincel/impresión ligeramente desfasada, no un
                drop-shadow difuminado) para acercarse a la pincelada de
                alto impacto de la portada del brandbook (pág. 4). Solo en
                Takis: las otras 5 marcas mantienen Teko sin inclinar. */}
            <h1
              className={`${
                brand.slug === "takis"
                  ? "font-takisDisplay text-4xl leading-[1.05] tracking-wide sm:text-5xl md:text-6xl"
                  : "font-teko text-5xl leading-[0.9] sm:text-6xl md:text-7xl"
              } font-bold uppercase ${brand.heroText}`}
              style={
                brand.slug === "takis"
                  ? {
                      transform: "rotate(-2deg)",
                      textShadow: "3px 3px 0 rgba(87, 15, 139, 0.5)",
                    }
                  : undefined
              }
            >
              {brand.tagline}
            </h1>
            {/* Ronda 37: el ratio de contraste (4.5:1+, ya verificado en la
                Ronda 35) es una condición NECESARIA pero no SUFICIENTE
                para que el texto se lea bien — un peso regular (400) a
                14px sobre un color de marca muy saturado (sobre todo
                rosa/magenta, el caso de Runners) es perceptualmente
                difícil de leer aunque el número pase AA: los trazos
                finos "vibran" ópticamente contra el color de fondo. Se
                sube a font-medium (500, cargado en layout.tsx — no es
                bold falso del navegador) + text-base (antes text-sm),
                igual para las 6 marcas ya que es el mismo componente. */}
            {/* Ronda 47: cuerpo de texto de Takis usa font-takisBody (Acumin
                Pro real, vía kit de Adobe Fonts del cliente — ver
                globals.css/layout.tsx) en vez de la Raleway compartida por
                el resto del sitio, igual que el H1 ya usa font-takisDisplay
                solo para Takis. */}
            <p
              className={`mt-4 max-w-sm text-base font-medium leading-relaxed ${
                isTakis ? "font-takisBody" : "font-body"
              } ${isLightText ? "text-white/80" : "text-black"}`}
            >
              {brand.description}
            </p>

            {/* Redes de la marca — distintas a las corporativas de Barcel
                del Footer. */}
            <div
              className={`mt-6 border-t pt-5 ${isLightText ? "border-white/20" : "border-barcel-black/15"}`}
            >
              <p
                className={`mb-3 font-display text-[11px] font-bold uppercase tracking-wide ${
                  isLightText ? "text-white/80" : "text-black"
                }`}
              >
                Síguelos
              </p>
              {/* Ronda 38: los botones de redes con caja al 10% de opacidad
                  pasaban desapercibidos — se resolvió con caja sólida
                  negra/blanca (ver historial). Ronda 39: el cliente pidió
                  ir más lejos — que la caja "resalte con el color del
                  logo" en vez de negro genérico (ej. amarillo en Runners).
                  Se usa brand.socialBg/socialIcon (mismo acento que
                  heroText, ver Ronda 36), cada par con su propio
                  contraste AA-gráfico verificado contra ESE fondo
                  específico — no es el mismo negro/blanco reciclado de
                  antes, cada marca tiene su combo propio. */}
              <div className="flex items-center gap-2.5">
                {BRAND_SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={`${social.label} de ${brand.name}`}
                    className={`flex h-9 w-9 items-center justify-center shadow-sm transition-transform hover:scale-110 ${brand.socialBg} ${brand.socialIcon}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Productos reales, apilados e inclinados — mismo esquema que
              el referente (dos empaques superpuestos, uno atrás/chico y
              otro al frente/grande), con 1-2 sabores más flotando
              sueltos en las esquinas si hay assets disponibles. */}
          <div
            className={`relative order-1 flex items-center justify-center py-10 md:py-0 ${
              brand.imageFirst ? "md:order-1" : "md:order-2"
            }`}
          >
            {/* Los assets (logo/producto) se ajustan al espacio del hero
                (arriba) con max-height en dvh — nunca al revés. Así un
                logo o una foto grande nunca vuelve a inflar la sección,
                pase lo que pase con el asset de cada marca. */}
            {brand.heroVisual === "logo" ? (
              // Logo protagonista + producto SUELTO (heroImage — sin
              // empaque) tilteado junto a él. Sin bagImages/accentImages:
              // esa composición de empaques es para las marcas que sí
              // tienen fotografía de bolsa.
              <div className="relative z-10 flex items-center justify-center">
                {(brand.logo ?? brand.logoHover) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={brand.logo ?? brand.logoHover}
                    alt={`${brand.name}®`}
                    className="h-auto max-h-[clamp(220px,42dvh,460px)] w-auto max-w-[85%] object-contain drop-shadow-2xl"
                  />
                )}
                {brand.heroImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={brand.heroImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute bottom-2 right-2 z-20 h-auto max-h-[clamp(90px,16dvh,180px)] w-auto rotate-[24deg] object-contain drop-shadow-2xl sm:bottom-4 sm:right-4"
                  />
                )}
              </div>
            ) : (
              // Caja con tamaño explícito (a diferencia de la rama del
              // logo): cuando hay 2 empaques, AMBOS quedan posicionados en
              // absolute (para apilarlos/inclinarlos), así que ninguno
              // aporta tamaño natural al contenedor — necesita uno propio
              // para que el posicionamiento por porcentaje tenga sentido.
              <div className="relative z-10 flex h-[clamp(240px,44dvh,440px)] w-[clamp(240px,44dvh,440px)] items-center justify-center">
                {bagImages.length >= 2 ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={bagImages[0]}
                      alt=""
                      aria-hidden="true"
                      className="absolute left-[8%] top-[10%] z-0 h-auto max-h-[clamp(140px,26dvh,260px)] w-auto -rotate-6 object-contain opacity-90 drop-shadow-2xl"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={bagImages[1]}
                      alt={`${brand.name}®`}
                      className="absolute bottom-[6%] right-[4%] z-10 h-auto max-h-[clamp(170px,32dvh,320px)] w-auto rotate-6 object-contain drop-shadow-2xl"
                    />
                  </>
                ) : (
                  bagImages[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={bagImages[0]}
                      alt={`${brand.name}®`}
                      className="h-auto max-h-[clamp(180px,34dvh,340px)] w-auto object-contain drop-shadow-2xl"
                    />
                  )
                )}
                {accentImages[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={accentImages[0]}
                    alt=""
                    aria-hidden="true"
                    className="absolute right-[2%] top-[2%] z-20 h-auto max-h-[clamp(70px,14dvh,140px)] w-auto rotate-[18deg] object-contain drop-shadow-xl"
                  />
                )}
                {accentImages[1] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={accentImages[1]}
                    alt=""
                    aria-hidden="true"
                    className="absolute bottom-[2%] left-[2%] z-20 h-auto max-h-[clamp(70px,14dvh,140px)] w-auto rotate-[-20deg] object-contain drop-shadow-xl"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Portafolio de productos — protagonista de la página, no escondido
          en un acordeón: es la razón por la que alguien entra a esta
          página de marca. Slider continuo (mismo mecanismo que el
          marquee de logos del Home), pausa al pasar el cursor para poder
          hacer clic con calma sobre cualquier SKU. */}
      <section id="portafolio" className="scroll-mt-20 bg-white py-16 md:py-20">
        <div className="container-page">
          <h2 className="font-teko text-3xl font-bold uppercase text-barcel-red md:text-4xl">
            Portafolio de productos
          </h2>
          {brand.flavors && brand.flavors.length > 0 ? (
            <p className="mt-2 max-w-xl font-body text-sm text-barcel-black/70 md:text-base">
              Pasa el cursor para pausar el carrusel y haz clic en tu sabor
              favorito para verlo de cerca.
            </p>
          ) : (
            <p className="mt-2 max-w-xl font-body text-sm text-barcel-black/70 md:text-base">
              Muy pronto vas a poder ver aquí todas las presentaciones de{" "}
              {brand.name}
              <sup>®</sup>.
            </p>
          )}
        </div>

        {brand.flavors && brand.flavors.length > 0 && (
          <div className="container-page mt-8">
            <ProductSlider
              brandName={brand.name}
              brandSlug={brand.slug}
              flavors={brand.flavors}
              hoverBg={brand.hoverBg}
              hoverText={brand.hoverText}
            />
          </div>
        )}
      </section>

      {/* Explora otras marcas — reemplaza al hub: cada página de marca
          enlaza directo a las demás, sin pasar por una pantalla intermedia.
          Ronda 30: se eliminó la sección "Dónde encontrarla" que vivía
          aquí (quedaba duplicada con el modal "¿Dónde comprar?" de la
          página de producto, y con contenido más pobre — un párrafo
          genérico contra tiendas reales con link). Con esa sección fuera,
          "Explora otras marcas" pasa a ser el cierre de la página, así
          que se le subió la jerarquía (encabezado tipo Teko, igual que
          "Portafolio de productos" y "También te puede antojar", en vez
          del label chiquito que tenía antes) y fondo cream para separarla
          visualmente del blanco del portafolio de arriba. */}
      <section className="bg-barcel-cream py-14 md:py-16">
        <div className="container-page">
          <h2 className="font-teko text-3xl font-bold uppercase text-barcel-black md:text-4xl">
            Explora otras marcas
          </h2>
          <p className="mt-1 font-body text-sm text-barcel-black/60">
            Descubre el resto del portafolio Barcel.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {otherBrands.map((b) => (
              <Link
                key={b.slug}
                href={`/marcas/${b.slug}`}
                className={`group flex items-center gap-3 border-2 border-barcel-black/10 bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-md ${b.hoverBg} ${b.hoverText}`}
              >
                <span aria-hidden="true" className={`h-3 w-3 shrink-0 ${b.bg}`} />
                <span className="font-display text-sm font-bold uppercase tracking-wide">
                  {b.name}
                  <sup className="text-[0.6em]">®</sup>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
