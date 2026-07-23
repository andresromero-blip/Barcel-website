import { brands } from "@/data/brands";

export default function LogoMarquee() {
  // Solo marcas con logo real confirmado — Golden Nuts se agrega cuando llegue su asset.
  const withLogo = brands.filter((b) => b.logo);
  // Se repite 8x (ancho fijo por logo) para garantizar que la tira cubra de
  // sobra hasta monitores ultra anchos y el loop -50% nunca deje un hueco en
  // blanco visible, sin depender del ancho real del viewport.
  const loop = Array.from({ length: 8 }, () => withLogo).flat();

  return (
    <div className="overflow-hidden border-y border-black/5 bg-white">
      <div className="flex w-max animate-marquee items-center py-5 hover:[animation-play-state:paused]">
        {loop.map((brand, i) => (
          <span
            key={`${brand.slug}-${i}`}
            className="flex w-32 shrink-0 items-center justify-center md:w-40"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.logo} alt={brand.name} className="h-7 w-auto object-contain md:h-8" />
          </span>
        ))}
      </div>
    </div>
  );
}
