import { brands } from "@/data/brands";

export default function LogoMarquee() {
  // Solo marcas con logo real confirmado — Golden Nuts se agrega cuando llegue su asset.
  const withLogo = brands.filter((b) => b.logo);
  // Se repite varias veces (no solo x2) para que la tira nunca se quede sin
  // logos visibles en pantallas anchas, sin romper el loop -50% sin costuras.
  const loop = [...withLogo, ...withLogo, ...withLogo, ...withLogo];

  return (
    <div className="overflow-hidden border-y border-black/5 bg-white py-0">
      <div className="group flex w-max animate-marquee items-stretch hover:[animation-play-state:paused]">
        {loop.map((brand, i) => (
          <span
            key={`${brand.slug}-${i}`}
            className={`flex shrink-0 items-center justify-center px-8 py-5 ${brand.bg}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.logo} alt={brand.name} className="h-8 w-auto object-contain md:h-9" />
          </span>
        ))}
      </div>
    </div>
  );
}
