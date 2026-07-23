import { brands } from "@/data/brands";

export default function LogoMarquee() {
  // Solo marcas con logo real confirmado — Golden Nuts se agrega cuando llegue su asset.
  const withLogo = brands.filter((b) => b.logo);
  const loop = [...withLogo, ...withLogo];

  return (
    <div className="overflow-hidden border-y border-black/5 bg-white py-4">
      <div className="group flex w-max animate-marquee items-center gap-4 hover:[animation-play-state:paused]">
        {loop.map((brand, i) => (
          <span
            key={`${brand.slug}-${i}`}
            className={`flex shrink-0 items-center px-5 py-2 ${brand.bg}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.logo} alt={brand.name} className="h-6 w-auto object-contain" />
          </span>
        ))}
      </div>
    </div>
  );
}
