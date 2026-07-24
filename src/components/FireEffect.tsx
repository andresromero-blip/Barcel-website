// Efecto de fuego decorativo para el hero de marca — por ahora, solo
// Takis lo usa (ver brand.heroEffect === "fire" en BrandPage.tsx).
//
// V3: la V1/V2 dibujaban el fuego a mano con paths de SVG — se veía
// "de caricatura" (feedback del cliente). El cliente compartió un
// asset real de fotografía de fuego (public/effects/takis/flame-a.jpg
// y flame-b.jpg, recortados de ese asset). Estas fotos tienen fondo
// negro puro por diseño: se superponen con `mix-blend-mode: screen`,
// una técnica estándar de composición de VFX/motion graphics donde el
// negro se vuelve transparente y solo la luz/color del fuego se
// mezcla con el fondo — así el fuego se integra de forma natural
// sobre el morado de la marca sin necesidad de una máscara alpha.
//
// Se combinan 3 instancias (2 fotos distintas + una espejada) para
// una base de fuego más ancha y sin repetición obvia, más un resplandor
// cálido detrás y chispas/humo animados en CSS como acento adicional
// (las fotos ya traen chispas propias, pero estáticas).
//
// Config de chispas fija (no Math.random): el HTML que arma el
// servidor debe coincidir exactamente con el del cliente al hidratar.
const SPARKS = [
  { left: "8%", bottom: "30%", size: 4, delay: "0s", duration: "2.6s" },
  { left: "20%", bottom: "50%", size: 3, delay: "0.9s", duration: "2.2s" },
  { left: "33%", bottom: "20%", size: 5, delay: "0.3s", duration: "2.9s" },
  { left: "46%", bottom: "55%", size: 3, delay: "1.4s", duration: "2.1s" },
  { left: "58%", bottom: "25%", size: 4, delay: "0.6s", duration: "2.4s" },
  { left: "70%", bottom: "48%", size: 3, delay: "1.8s", duration: "2.7s" },
  { left: "82%", bottom: "18%", size: 5, delay: "0.2s", duration: "2.3s" },
  { left: "92%", bottom: "40%", size: 4, delay: "1.1s", duration: "2.5s" },
];

export default function FireEffect() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-y-14 inset-x-0 z-0 overflow-visible"
    >
      {/* resplandor cálido detrás de las fotos de fuego */}
      <div className="absolute bottom-0 left-1/2 h-full w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,150,20,0.5),rgba(255,60,0,0.22)_45%,transparent_72%)] blur-2xl motion-safe:animate-flame" />

      {/* fuego real (foto), compuesto con screen para que el negro
          desaparezca y solo quede la llama sobre el morado de marca */}
      <div className="absolute inset-x-0 bottom-0 h-4/5 w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/effects/takis/flame-b.jpg"
          alt=""
          className="absolute bottom-0 left-0 h-full w-2/3 origin-bottom object-cover object-left-bottom mix-blend-screen motion-safe:animate-flame"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/effects/takis/flame-a.jpg"
          alt=""
          className="absolute bottom-0 right-0 h-[85%] w-2/3 origin-bottom scale-x-[-1] object-cover object-right-bottom mix-blend-screen motion-safe:animate-flame-fast"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/effects/takis/flame-b.jpg"
          alt=""
          className="absolute bottom-0 left-1/2 h-[70%] w-1/2 origin-bottom -translate-x-1/2 scale-x-[-1] object-cover object-bottom opacity-80 mix-blend-screen motion-safe:animate-flame-fast"
        />
      </div>

      {/* chispas ascendentes — acento animado extra sobre las de la foto */}
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gradient-to-t from-orange-500 to-yellow-200 shadow-[0_0_8px_3px_rgba(255,190,60,0.85)] mix-blend-screen motion-safe:animate-spark"
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
