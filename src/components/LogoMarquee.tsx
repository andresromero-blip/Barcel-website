import { brands } from "@/data/brands";

export default function LogoMarquee() {
  const loop = [...brands, ...brands];

  return (
    <div className="overflow-hidden border-y border-black/5 bg-white py-4">
      <div className="group flex w-max animate-marquee items-center gap-4 hover:[animation-play-state:paused]">
        {loop.map((brand, i) =>
          brand.logo ? (
            <span
              key={`${brand.slug}-${i}`}
              className={`flex shrink-0 items-center rounded-full px-5 py-2 ${brand.bg}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={brand.logo} alt={brand.name} className="h-6 w-auto object-contain" />
            </span>
          ) : (
            <span
              key={`${brand.slug}-${i}`}
              className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2 font-display text-sm font-extrabold uppercase tracking-wide text-white ${brand.bg}`}
            >
              {brand.name}
              <sup className="text-[0.6em]">®</sup>
            </span>
          )
        )}
      </div>
    </div>
  );
}
