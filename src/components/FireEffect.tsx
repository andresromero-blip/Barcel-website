// Efecto de fuego decorativo para el hero de marca — por ahora, solo
// Takis lo usa (ver brand.heroEffect === "fire" en BrandPage.tsx).
//
// V2: buscando un fuego más realista que la V1 (que se veía como una
// "duna" plana). Dos cambios clave respecto a la primera versión:
// 1) Filtro SVG de turbulencia (feTurbulence + feDisplacementMap) que
//    rompe el borde liso de las curvas bezier en algo irregular, como
//    lengüetas de fuego reales — mucho más confiable que afinar puntos
//    de control a mano sin poder previsualizar.
// 2) Tres capas de llama (ancha/oscura atrás, media/naranja, angosta
//    con núcleo amarillo-blanco al frente) en vez de dos, con más
//    contraste de color entre capas.
//
// Config de chispas fija (no Math.random): el HTML que arma el
// servidor debe coincidir exactamente con el del cliente al hidratar,
// sin parpadeos ni warnings de hidratación.
const SPARKS = [
  { left: "4%", bottom: "10%", size: 4, delay: "0s", duration: "2.6s" },
  { left: "10%", bottom: "34%", size: 3, delay: "0.9s", duration: "2.2s" },
  { left: "17%", bottom: "4%", size: 5, delay: "0.3s", duration: "2.9s" },
  { left: "24%", bottom: "22%", size: 3, delay: "1.4s", duration: "2.1s" },
  { left: "31%", bottom: "0%", size: 6, delay: "0.6s", duration: "2.4s" },
  { left: "39%", bottom: "30%", size: 4, delay: "1.8s", duration: "2.7s" },
  { left: "47%", bottom: "6%", size: 3, delay: "0.2s", duration: "2.3s" },
  { left: "55%", bottom: "26%", size: 5, delay: "1.1s", duration: "2.5s" },
  { left: "63%", bottom: "2%", size: 4, delay: "0.5s", duration: "3s" },
  { left: "70%", bottom: "18%", size: 3, delay: "1.6s", duration: "2.2s" },
  { left: "78%", bottom: "8%", size: 6, delay: "0.8s", duration: "2.8s" },
  { left: "85%", bottom: "28%", size: 4, delay: "0.1s", duration: "2.4s" },
  { left: "91%", bottom: "12%", size: 3, delay: "1.3s", duration: "2.6s" },
  { left: "96%", bottom: "36%", size: 5, delay: "1.9s", duration: "2.1s" },
];

// Chispas con estela (rectángulos angostos y girados) — dan la
// sensación de movimiento/velocidad que tienen en el referente.
const TRAILS = [
  { left: "14%", bottom: "40%", rotate: "-24deg", delay: "0.4s" },
  { left: "58%", bottom: "46%", rotate: "-30deg", delay: "1.5s" },
  { left: "82%", bottom: "42%", rotate: "-18deg", delay: "0.9s" },
];

export default function FireEffect() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-y-14 inset-x-0 z-0 overflow-visible"
    >
      {/* resplandor cálido general, más intenso y más grande que la V1 */}
      <div className="absolute bottom-0 left-1/2 h-full w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,150,20,0.55),rgba(255,60,0,0.25)_45%,transparent_72%)] blur-2xl motion-safe:animate-flame" />

      {/* llamas — tres capas con un filtro de turbulencia para que el
          borde se vea irregular (lengüetas), no una curva lisa */}
      <svg
        className="absolute inset-x-0 bottom-0 h-4/5 w-full"
        viewBox="0 0 500 340"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="fireRough1" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="2" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="26" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="fireRough2" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.07" numOctaves="2" seed="9" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="20" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <linearGradient id="flameBack" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#8A0E00" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#E8420A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF8A00" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="flameMid" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FF3D00" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FF9500" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFC400" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="flameCore" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FF8A00" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#FFD400" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFF6D6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* capa trasera — ancha, baja, la más oscura */}
        <path
          filter="url(#fireRough1)"
          d="M-20,340 C40,300 20,250 90,235 C150,222 130,160 210,150 C280,142 265,220 330,225 C390,230 400,170 460,180 C490,186 510,260 520,340 Z"
          fill="url(#flameBack)"
          className="origin-bottom motion-safe:animate-flame"
        />
        {/* capa media — naranja, más angosta y alta */}
        <path
          filter="url(#fireRough2)"
          d="M30,340 C70,280 55,220 110,200 C160,183 148,120 205,100 C255,83 248,160 295,175 C345,192 355,240 410,250 C450,258 460,200 495,210 C505,213 515,280 515,340 Z"
          fill="url(#flameMid)"
          className="origin-bottom motion-safe:animate-flame-fast"
        />
        {/* núcleo — amarillo/blanco, la más angosta y alta, casi al centro */}
        <path
          filter="url(#fireRough1)"
          d="M140,340 C165,290 155,240 195,215 C230,195 222,140 265,110 C300,86 296,160 330,180 C365,201 372,250 410,262 C435,270 445,225 470,235 C480,239 485,290 485,340 Z"
          fill="url(#flameCore)"
          className="origin-bottom motion-safe:animate-flame-fast"
        />
      </svg>

      {/* chispas ascendentes */}
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gradient-to-t from-orange-500 to-yellow-200 shadow-[0_0_8px_3px_rgba(255,190,60,0.85)] motion-safe:animate-spark"
          style={{
            left: s.left,
            bottom: s.bottom,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}

      {/* chispas con estela — dan sensación de velocidad */}
      {TRAILS.map((t, i) => (
        <span
          key={`trail-${i}`}
          className="absolute h-[2px] w-6 rounded-full bg-gradient-to-r from-transparent via-yellow-200 to-orange-400 motion-safe:animate-spark"
          style={{
            left: t.left,
            bottom: t.bottom,
            transform: `rotate(${t.rotate})`,
            animationDelay: t.delay,
            animationDuration: "2.4s",
          }}
        />
      ))}

      {/* humo — visible, saliendo desde la zona superior (detrás del ícono) */}
      <div className="absolute top-0 left-[42%] h-28 w-28 rounded-full bg-white/15 blur-xl motion-safe:animate-smoke" />
      <div
        className="absolute top-6 left-[52%] h-24 w-24 rounded-full bg-white/15 blur-xl motion-safe:animate-smoke"
        style={{ animationDelay: "1.3s" }}
      />
      <div
        className="absolute top-2 left-[47%] h-20 w-20 rounded-full bg-white/10 blur-xl motion-safe:animate-smoke"
        style={{ animationDelay: "2.4s" }}
      />
    </div>
  );
}
