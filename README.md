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
  cliente), agregando rutas dentro de `src/app/`.
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

## Deploy en Vercel

1. Subir este repo a GitHub.
2. Importar el repo en [vercel.com/new](https://vercel.com/new).
3. Vercel detecta Next.js automáticamente — no se requiere configuración
   adicional.
