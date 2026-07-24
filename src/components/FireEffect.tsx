// Efecto de fuego decorativo para el hero de marca — por ahora, solo
// Takis lo usa (ver brand.heroEffect === "fire" en BrandPage.tsx).
// Config de chispas fija (no Math.random) a propósito: así el HTML que
// arma el servidor coincide exactamente con el del cliente al hidratar,
// sin parpadeos ni warnings de hidratación.
//
// Se monta DENTRO de la columna de producto (no de todo el hero) para
// que las llamas nunca invadan la columna de texto — el contraste AA ya
// verificado del texto sobre el color de marca se mantiene intacto.
const SPARKS = [
  { left: "6%", bottom: "8%", size: 5, delay: "0s", duration: "2.6s" },
  { left: "16%", bottom: "2%", size: 3, delay: "0.6s", duration: "2.2s" },
  { left: "26%", bottom: "14%", size: 4, delay: "1.1s", duration: "2.9s" },
  { left: "38%", bottom: "0%", size: 6, delay: "0.3s", duration: "2.4s" },
  { left: "48%", bottom: "10%", size: 3, delay: "1.6s", duration: "2.1s" },
  { left: "58%", bottom: "4%", size: 5, delay: "0.9s", duration: "2.7s" },
  { left: "68%", bottom: "16%", size: 4, delay: "0.2s", duration: "2.3s" },
  { left: "78%", bottom: "6%", size: 3, delay: "1.4s", duration: "2.5s" },
  { left: "88%", bottom: "1%", size: 6, delay: "0.7s", duration: "3s" },
  { left: "95%", bottom: "12%", size: 4, delay: "1.9s", duration: "2.2s" },
];

export default function FireEffect() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-y-10 inset-x-0 z-0 overflow-visible"
    >
      {/* resplandor cálido detrás del producto */}
      <div className="absolute bottom-0 right-0 h-3/4 w-3/4 rounded-full bg-[radial-gradient(closest-side,rgba(255,138,0,0.5),rgba(255,45,0,0.22)_55%,transparent_75%)] blur-2xl motion-safe:animate-flame" />

      {/* llamas — dos capas superpuestas para dar profundidad y calor */}
      <svg
        className="absolute inset-x-0 bottom-0 h-3/5 w-full"
        viewBox="0 0 500 300"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flameOuter" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FF2D00" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#FF8A00" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFD400" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="flameInner" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FFD400" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#FF8A00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF8A00" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-10,300 C30,240 15,190 55,165 C90,145 75,105 115,80 C155,55 150,120 185,140 C230,165 220,215 265,230 C310,245 320,190 360,200 C405,212 395,255 445,262 C480,267 500,290 500,300 Z"
          fill="url(#flameOuter)"
          className="origin-bottom motion-safe:animate-flame"
        />
        <path
          d="M60,300 C90,250 78,210 110,190 C140,172 128,138 165,118 C200,99 192,150 222,167 C258,187 253,230 292,242 C325,252 335,208 370,216 C400,223 392,258 430,264 C455,268 465,290 465,300 Z"
          fill="url(#flameInner)"
          className="origin-bottom motion-safe:animate-flame-fast"
        />
      </svg>

      {/* chispas ascendentes */}
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gradient-to-t from-orange-500 to-yellow-300 shadow-[0_0_6px_2px_rgba(255,180,0,0.8)] motion-safe:animate-spark"
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

      {/* humo sutil disipándose hacia arriba */}
      <div className="absolute top-4 left-1/3 h-24 w-24 rounded-full bg-white/10 blur-xl motion-safe:animate-smoke" />
      <div
        className="absolute top-10 left-1/2 h-20 w-20 rounded-full bg-white/10 blur-xl motion-safe:animate-smoke"
        style={{ animationDelay: "1.2s" }}
      />
    </div>
  );
}
