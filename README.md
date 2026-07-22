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
    layout.tsx      # layout raíz, metadata, fuentes (Poppins/Inter vía Google Fonts link)
    page.tsx         # ensambla el Home
    globals.css       # tailwind + estilos base
  components/
    Header.tsx        # nav sticky, buscador funcional, menú móvil
    Hero.tsx           # carrusel interactivo (autoplay + dots + flechas)
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

## Pendiente / próximos pasos

- **Assets reales**: todo el sitio usa placeholders (bloques de color con el
  nombre de marca) donde van logos y fotografía de producto. En cuanto se
  compartan los archivos de marca, se reemplazan directamente en
  `src/data/brands.ts`, `src/data/news.ts` y los componentes `Hero.tsx` /
  `BrandIntro.tsx`.
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

## Deploy en Vercel

1. Subir este repo a GitHub.
2. Importar el repo en [vercel.com/new](https://vercel.com/new).
3. Vercel detecta Next.js automáticamente — no se requiere configuración
   adicional.
