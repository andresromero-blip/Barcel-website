# Barcel — Prototipo Home (1:1)

Prototipo en código del Home de Barcel, construido a partir del Home aprobado
con stakeholders. Next.js 14 (App Router) + TypeScript + Tailwind CSS, listo
para subir a GitHub y desplegar en Vercel.

## Stack

- **Next.js 14** (App Router, React 18)
- **TypeScript**
- **Tailwind CSS**
- Sin dependencias de UI externas (componentes e iconos hechos a mano) para
  mantener el bundle liviano y 100% personalizable.

## Cómo correrlo localmente

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

Para build de producción:

```bash
npm run build
npm start
```

## Estructura

```
src/
  app/
    layout.tsx      # layout raíz, metadata, fuente Raleway vía Google Fonts link
    page.tsx         # ensambla el Home
    globals.css       # tailwind + estilos base
  components/
    Header.tsx        # nav sticky, buscador funcional, menú móvil
    Hero.tsx           # carrusel con los 3 banners reales (public/hero) + CTA como componente
    LogoMarquee.tsx      # scroll infinito de marcas
    BrandIntro.tsx        # sección "Sabor y calidad, ¡Así es Barcel!"
    FamilyGrid.tsx          # "Conoce toda nuestra familia" (grid de marcas)
    BrandCard.tsx             # tarjeta individual de marca
    NewsSection.tsx            # "Nuestras Novedades" con modal al hacer clic
    Footer.tsx                  # footer con links legales y redes
    SearchContext.tsx            # estado global del buscador (React Context)
  data/
    brands.ts          # contenido de las 6 marcas
    news.ts              # contenido de la grilla de novedades
```

## Ajustes incorporados (según doc "AJUSTES Y NEXTSTEPS BARCEL")

- Nav: "Marcas" en vez de "Productos" + sección "Novedades" agregada.
- ® agregado en todos los nombres de marca escritos como texto (Barcel®,
  Chip's®, Takis®, Big Mix®, Runners®, Hot Nuts®, Golden Nuts®).
- Se agregaron **Hot Nuts** y **Golden Nuts** al grid de marcas y al marquee.
- Se quitó el ícono de Twitter/X del footer (la marca ya no tiene esas
  cuentas activas).
- "Chip's" con apóstrofe correcto en todo el sitio.
- Los íconos de redes sociales por marca se dejaron **fuera** del Home (van
  en las páginas internas de cada marca, según lo acordado en next steps).

## Ronda de feedback visual (revisión sobre el diseño aprobado)

- **Corner radius 0**: todos los CTAs y elementos interactivos (botones,
  buscador, tarjetas de marca, tiles de Novedades, dots del hero, íconos
  sociales) pasaron a esquinas rectas.
- **Bug de colores corregido**: `tailwind.config.ts` solo escaneaba
  `src/app` y `src/components`, así que las clases de color definidas en
  `src/data/brands.ts` (`bg-chips-green`, `bg-takis-purple`, etc.) nunca se
  generaban y no se veían. Se amplió el `content` a `./src/**/*.{ts,tsx}` y
  se ajustaron los hex de Chip's/Takis/Big Mix/Runners para que coincidan
  con el diseño aprobado.
- **Marquee de logos**: ya no incluye el placeholder de texto de Golden Nuts
  — solo se muestran las marcas con logo real confirmado.
- **Novedades 1:1**: grid de 5 tiles (reutilizando la foto del influencer
  dos veces, igual que el diseño aprobado), sin tags ni texto superpuesto
  inventados — solo el ícono de play en las piezas que son video.
- **Header**: ahora usa fondo rojo + el logo horizontal real de Barcel®
  (antes estaba con fondo blanco y un logo armado a mano).

## Assets reales de Figma

- **Colores y tipografía**: extraídos con `get_variable_defs` del archivo de
  Figma (fuente única: Raleway; rojo primario `#ff2d50`/`#f5173c`/`#ce0728`,
  verde Chip's `#02e55b`, morado Takis `#ac43ff`, azul Big Mix `#0a8ced`,
  escala de grises, etc.) y aplicados en `tailwind.config.ts`.
- **Hero (`public/hero/`)**: los 3 banners del slider (`slide-bienvenido.jpg`,
  `slide-golden-nuts.jpg`, `slide-wapas.jpg`) son los assets reales
  exportados del prototipo. El texto y el arte ya vienen resueltos en la
  imagen; el CTA de cada slide se renderiza aparte como componente real
  (`<a>` posicionado sobre el banner con `left/top/width/height` en %, con
  estados hover/focus) en vez de venir quemado en el jpg.
- **Logos de marca (`public/logos/`)**: Chip's, Takis, Big Mix, Runners y Hot
  Nuts ya usan sus logos reales en `FamilyGrid`/`BrandCard` y en el marquee.
  Cada uno tiene microinteracción de hover: el logo por default hace fade-out
  y el asset "hover" (logo + producto asomando) hace fade-in con un pequeño
  scale — 100% CSS (`group-hover`), sin JS. **Golden Nuts** sigue con el
  placeholder de texto porque todavía no hay logo exportado para esa marca.
- **Sabor y calidad (`public/sabor/`)**: imagen real de las papas cayendo en
  `BrandIntro.tsx`.
- **Novedades (`public/novedades/`)**: las 4 piezas reales (influencer con
  stickers, Papas Barcel, comunidad Barcel, campaña de la mascota zorro) en
  `NewsSection.tsx`, con ícono de play en las que son video y modal al hacer
  clic.
- **Footer**: logo horizontal real de Barcel® (blanco, pensado para fondo
  oscuro).
- **Páginas internas**: este repo está preparado para escalar a Inicio →
  Marcas → Sobre nosotros → Novedades (próximo orden de prioridad según el
  cliente), agregando rutas dentro de `src/app/`. **`/marcas` ya existe**
  (ver ronda 7 más abajo); Sobre nosotros y Novedades siguen siendo
  secciones ancla dentro del Home.
- **Página de detalle de producto**: pendiente de construir.
- Revisar el build de producción (`npm run build`) en un entorno con
  recursos completos — se verificó tipado con `tsc --noEmit` (sin errores) y
  compilación exitosa del bundle de la página; el pipeline completo de
  `next build` no se pudo correr de punta a punta dentro del sandbox de este
  entorno por límite de tiempo, pero no hay motivo para que falle en
  Vercel o en una máquina local.

## Ronda 4 de feedback: Hero verdaderamente mobile-first

- **Causa raíz del banner "roto" en mobile**: los 3 slides son imágenes de
  1440×900 (proporción 1.6:1) con el contenido —headline, empaques,
  producto— repartido en **todo el ancho**. El Hero usaba una altura fija en
  px por breakpoint (ej. 420px en mobile) independiente del ancho real de la
  pantalla; con `object-cover`, eso forzaba a recortar ~44% de cada lado de
  la imagen en un teléfono angosto, cortando literalmente la mitad del
  headline y de los productos — de ahí que la información se viera
  desorganizada.
- **Fix**: el contenedor del Hero ahora usa `aspect-[1440/900]` — la misma
  proporción de la imagen — como única regla, sin excepciones por
  breakpoint. Así la imagen se ve **siempre completa, sin recortes**, en
  cualquier ancho de pantalla; el alto simplemente escala junto con el
  ancho. Es mobile-first en el sentido estricto: una sola regla que funciona
  en todos los tamaños, no un valor pensado para desktop y "parcheado" hacia
  abajo.
- Se agregó un breakpoint adicional `xs` (400px) para escalar el tamaño del
  CTA y los dots de forma proporcional a la altura, más baja en mobile por
  el cambio anterior — manteniendo siempre el tap target mínimo accesible
  de 44px.
- Se corrigió una inconsistencia en las flechas de navegación: antes solo
  la flecha "Anterior" se ocultaba en mobile y "Siguiente" quedaba visible;
  ahora ambas se ocultan de forma consistente por debajo de `md` (los dots
  y el autoplay cubren la navegación en pantallas chicas).

## Ronda 5 y 6: orden de marcas y fix de orden en mobile

- Se reordenaron las marcas en "Conoce toda nuestra familia": Chip's, Takis,
  Runners, Big Mix, Hot Nuts, Golden Nuts.
- **Bug encontrado al reordenar**: `BrandCard` decidía el orden del tile de
  color/logo vs. el tile de texto en el DOM según `brand.imageFirst`, y esa
  alternancia también aplicaba en mobile (una sola columna), así que las
  marcas con `imageFirst: false` mostraban el texto **antes** que el tile de
  color — rompiendo el patrón consistente del diseño aprobado ("tile de
  color siempre primero" en mobile).
- **Fix**: el DOM ahora siempre renderiza el tile de color antes que el de
  texto. `imageFirst` solo controla qué lado (izquierda/derecha) ocupa cada
  tile en el grid de 2 columnas de desktop, vía `md:order-1`/`md:order-2` —
  sin tocar el orden real en mobile.

## Ronda 7: página `/marcas` y coherencia del CTA "Nuestras botanas"

- **Problema detectado**: el botón "Nuestras botanas" en "Conoce toda
  nuestra familia" apuntaba a `#marcas`, el mismo `id` de la sección donde
  ya estaba — un anchor que se referencia a sí mismo, así que el clic no
  hacía nada. Además usaba una flecha hacia abajo (⌄, lenguaje de
  "expandir"), inconsistente con la flecha → que usa "Ver todos los
  productos" en cada tarjeta de marca para la misma acción de navegar.
- **Fix**: se construyó la página `/marcas` (`src/app/marcas/page.tsx` +
  `src/components/MarcasCatalog.tsx`) — un catálogo completo reutilizando
  `BrandCard` (mismos estilos, hover, orden), con el mismo buscador del
  Header filtrando en vivo. El botón "Nuestras botanas" y el "Ver todos los
  productos →" de cada tarjeta ahora usan `next/link` hacia `/marcas`, con
  ícono de flecha → coherente en ambos.
- **Nav global actualizada para funcionar entre páginas**: antes los links
  del Header eran fragmentos sueltos (`#inicio`, `#marcas`, etc.), que solo
  funcionan correctamente estando ya en el Home. Ahora son rutas
  raíz-relativas: `Inicio` → `/`, `Marcas` → `/marcas` (página real),
  `Sobre nosotros`/`Novedades` → `/#seccion` (navegan al Home y bajan al
  anchor). El subrayado activo del nav ahora se calcula con `usePathname()`
  en vez de estar fijo en "Inicio".

## Ronda 8: rediseño de `/marcas` (referente Pinterest)

- **Feedback**: `/marcas` replicaba literalmente el mismo layout de "Conoce
  toda nuestra familia" en el Home — un paso extra sin aportar nada nuevo,
  confuso para el usuario. Se compartió como referente la landing animada
  de "Domingo" (Pinterest): secciones a pantalla casi completa, una por
  producto, con el nombre en tipografía gigante de fondo, foto de producto
  flotando en grande, color sólido distinto por producto y un panel de
  detalle tipo acordeón en vez de texto siempre visible.
- **Nuevo componente `BrandShowcase.tsx`** reemplaza `BrandCard` dentro de
  `/marcas` (Home sigue usando `BrandCard`/`FamilyGrid` sin cambios — son
  vistas distintas a propósito: preview curado en Home, catálogo inmersivo
  en `/marcas`):
  - Fondo a color sólido de marca + wordmark gigante del nombre en
    `font-teko` al 15% de opacidad (puramente decorativo/textura).
  - Todo el texto legible (nombre, tagline, descripción, acordeón) vive
    dentro de una tarjeta blanca — así el contraste es siempre AA sin
    importar qué tan claro u oscuro sea el color de cada marca (evita tener
    que calcular contraste caso por caso contra 6 colores distintos).
  - Foto de producto grande flotando directamente sobre el color de fondo,
    alternando de lado con `imageFirst` (mismo mecanismo que ya usa
    `BrandCard`).
  - Acordeón con "Presentaciones" (si hay fotos reales de sabores) y "Dónde
    encontrarla".
  - Numeración 01→06 con índice de salto rápido arriba de la página.
- **Assets reales de Takis**: se recibió la carpeta completa de producto
  (`ASSETS PROTOTIPO/ASSETS PRODUCTOS/1) Takis`). Se usó
  `TAKIS DRAGON.png` (pieza suelta) como foto hero de la sección, y las 8
  fotos 3D de bolsa (`3D TAKIS FUEGO/ORIGINAL/SALSA BRAVA/RANCH/CHILE
  LIMÓN/HUACAMOLES/BLUE HEAT/INTENSE NACHO.png`) para el acordeón de
  "Presentaciones" — copiadas a `public/products/takis/` redimensionadas y
  optimizadas (originales pesaban ~6MB c/u).
- **Las otras 5 marcas** (sin fotografía de producto real todavía) usan el
  mismo layout pero con fallback: la imagen hero es `logoHover` (el asset
  de logo+producto asomando que ya existía) y sin acordeón de
  "Presentaciones". En cuanto se comparta fotografía de producto de cada
  marca, `brands.ts` solo necesita un `heroImage`/`flavors` por marca para
  que se vean igual de completas que Takis — no hace falta tocar el
  componente.
- Se agregaron los campos opcionales `heroImage` y `flavors` al tipo
  `Brand` (`src/data/brands.ts`), sin afectar el Home.

## Ronda 9: se elimina el hub /marcas — página individual por marca

- **Feedback**: el hub `/marcas` (ronda 8) seguía sin convencer a nivel de
  UX — el Home ya da acceso a las 6 marcas, así que un catálogo intermedio
  es un paso redundante. Decisión: no debe existir un "hub"; cada marca
  tiene su propia entrada directa con su portafolio de productos, y el nav
  "Marcas" del Header debe ser un desplegable con acceso a cada una.
- **Ruta dinámica `/marcas/[slug]`** (`src/app/marcas/[slug]/page.tsx`,
  `generateStaticParams` para las 6 marcas) reemplaza la página única de
  catálogo. `src/components/BrandPage.tsx` es el contenido: hero a color
  sólido de marca (igual que antes), y debajo una sección "Portafolio de
  productos" siempre visible —ya no escondida en un acordeón, porque en
  una página dedicada a una sola marca el portafolio es el contenido
  principal, no un detalle secundario—, más "Dónde encontrarla" y una
  franja "Explora otras marcas" al final (así cada página de marca conecta
  con las demás sin necesitar un hub intermedio).
- **`/marcas` a secas** ahora hace `redirect()` a la primera marca en vez
  de un catálogo, por si queda algún link viejo.
- **Header**: "Marcas" dejó de ser un link — ahora es un botón con
  desplegable (clic, con cierre al hacer clic afuera o cambiar de página)
  listando las 6 marcas, tanto en desktop como en el menú mobile
  (acordeón). El subrayado activo usa `pathname.startsWith("/marcas")`.
- **Home**: se quitó el botón "Nuestras botanas" de "Conoce toda nuestra
  familia" — ya no hay a dónde mandarlo que no sea redundante con las
  tarjetas de abajo. Cada tarjeta de marca ahora enlaza su "Ver todos los
  productos →" directo a `/marcas/[slug]` de esa marca en particular (antes
  todas apuntaban al mismo catálogo genérico).
- `MarcasCatalog.tsx` y `BrandShowcase.tsx` (el hub y su sección) quedan
  deprecados/vacíos en el repo — el sandbox de este entorno no permite
  borrar archivos entre pasos, así que no se eliminaron físicamente, pero
  ya no se importan desde ningún lado.
- Se empezó por **Takis**, la única marca con fotografía de producto real
  compartida hasta ahora — su página muestra el portafolio completo de 8
  presentaciones. Las otras 5 ya tienen su página (el dropdown del nav no
  lleva a ningún link roto) pero con el mismo fallback de rondas
  anteriores hasta que se comparta su fotografía de producto.

## Ronda 10: slider de portafolio, logo en el hero, redes de marca

- **Portafolio en slider** (`src/components/ProductSlider.tsx`): el grid
  estático de SKUs se reemplazó por un carrusel continuo con el mismo
  mecanismo que el marquee de logos del Home (`animate-marquee`, loop
  vía CSS, sin JS) y la misma velocidad — "mismo comportamiento" pedido
  explícitamente. Se pausa por completo al pasar el cursor
  (`hover:[animation-play-state:paused]`), así el usuario tiene todo el
  tiempo que necesite para hacer clic sobre el SKU que le interesa antes
  de que el carrusel siga moviéndose.
  - **Microinteracción por SKU**: al hover, la tarjeta se eleva
    (`-translate-y-1`), la imagen del producto escala 110% y aparece un
    "Ver detalle →" en rojo Barcel — solo entonces, guiando al usuario a
    que ahí puede hacer clic.
  - Al hacer clic se abre un modal con el producto en grande y su nombre
    (mismo patrón que ya usa la sección Novedades del Home) — todavía no
    existe una página de detalle de producto por SKU.
  - Texto UX writing arriba del carrusel: "Pasa el cursor para pausar el
    carrusel y haz clic en tu sabor favorito para verlo de cerca." Para
    las marcas sin fotos de producto real todavía, un mensaje honesto en
    vez de una sección vacía: "Muy pronto vas a poder ver aquí todas las
    presentaciones de [Marca]."
- **Logo real en la esquina superior derecha del hero** de cada marca
  (`brand.logo`, sobre el color sólido de fondo).
- **Redes sociales propias de cada marca** (Instagram, TikTok, Facebook)
  dentro de la tarjeta blanca del hero, bajo un rótulo "Síguelos" —
  deliberadamente NO en el Footer, que ya tiene las redes corporativas de
  Barcel. Son placeholders (`href="#"`) hasta contar con las cuentas
  reales de cada marca; el diseño y la ubicación ya quedan resueltos para
  cuando se compartan los links.

## Deploy en Vercel

1. Subir este repo a GitHub.
2. Importar el repo en [vercel.com/new](https://vercel.com/new).
3. Vercel detecta Next.js automáticamente — no se requiere configuración
   adicional.
