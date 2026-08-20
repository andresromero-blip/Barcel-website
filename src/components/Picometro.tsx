// Picómetro — indicador de nivel de picante, feedback de cliente (Ronda 43):
// "Los productos de Takis tienen un 'Picómetro' que determina el nivel de
// picante". Assets reales entregados por el cliente vía Drive: 5 termómetros
// (uno por nivel), cada uno con el label horneado en el propio PNG.
//
// Nivel por sabor: el cliente compartió los 5 niveles del picómetro pero NO
// una tabla oficial de qué sabor de Takis cae en qué nivel. Para no inventar
// un dato de producto real (mismo criterio que ingredientes/nutrimental/
// presentaciones en ProductDetail.tsx), el nivel asignado a cada sabor en
// brands.ts es una ESTIMACIÓN a partir del copy de marca ya aprobado y la
// posición pública de cada sabor (ej. Blue Heat/Fuego como los más picosos).
// Se marca visualmente como pendiente de confirmar — ver nota debajo del
// componente en ProductDetail.tsx.
export const SPICE_LEVELS = {
  cero: { label: "Cero picante", image: "/picometro/cero-picante.png" },
  bajo: { label: "Bajo picante", image: "/picometro/bajo-picante.png" },
  medio: { label: "Medio", image: "/picometro/medio.png" },
  picante: { label: "Picante", image: "/picometro/picante.png" },
  extremo: { label: "Extremo", image: "/picometro/extremo.png" },
} as const;

export type SpiceLevel = keyof typeof SPICE_LEVELS;

export default function Picometro({ level }: { level: SpiceLevel }) {
  const info = SPICE_LEVELS[level];

  return (
    <div className="flex items-center gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={info.image}
        alt={`Picómetro — nivel de picante: ${info.label}`}
        className="h-28 w-auto object-contain md:h-32"
      />
      <div className="flex flex-col gap-1">
        <p className="font-display text-xs font-bold uppercase tracking-[0.15em] text-barcel-black/50">
          Picómetro
        </p>
        <p className="font-teko text-3xl font-bold uppercase leading-none text-barcel-black md:text-4xl">
          {info.label}
        </p>
      </div>
    </div>
  );
}
