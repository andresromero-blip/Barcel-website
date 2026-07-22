import { brands } from "@/data/brands";

export default function LogoMarquee() {
  const loop = [...brands, ...brands];

  return (
    <div className="overflow-hidden border-y border-black/5 bg-white py-4">
      <div className="group flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
        {loop.map((brand, i) => (
          <span
            key={`${brand.slug}-${i}`}
            className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2 font-display text-sm font-extrabold uppercase tracking-wide text-white ${brand.bg} ${
              brand.slug === "hot-nuts" || brand.slug === "golden-nuts" ? "" : ""
            }`}
          >
            {brand.name}
            <sup className="text-[0.6em]">®</sup>
          </span>
        ))}
      </div>
    </div>
  );
}
