export default function BrandIntro() {
  return (
    <section id="sobre-nosotros" className="bg-white py-16 md:py-24">
      <div className="container-page flex flex-col items-center gap-6 text-center">
        <h2 className="font-teko text-4xl font-bold uppercase text-barcel-red md:text-5xl">
          Sabor y calidad,
          <br className="hidden sm:block" /> ¡así es Barcel<sup className="text-[0.5em]">®</sup>!
        </h2>
        <p className="max-w-xl font-display text-base font-semibold italic text-barcel-black/80 md:text-lg">
          Prepárate para entrar al lado de las botanas con verdadera actitud.
        </p>
        <p className="max-w-2xl font-body text-sm leading-relaxed text-barcel-black/70 md:text-base">
          Aquí no venimos a lo básico. Venimos a antojos que se sienten, a
          combinaciones que sorprenden y a ese crunch que hace que cada
          momento valga más. Desde los clásicos que nunca fallan hasta
          mezclas nuevas que se vuelven favoritas desde la primera probada,
          en Barcel<sup>®</sup> cada producto tiene algo que decir.
        </p>
        <p className="font-display text-sm font-bold uppercase tracking-wide text-barcel-black">
          Explora, elige y encuentra tu próximo antojo.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sabor/sabor-calidad.png"
          alt="Papas Barcel cayendo"
          className="mt-4 h-auto w-full max-w-md md:max-w-lg"
        />
      </div>
    </section>
  );
}
