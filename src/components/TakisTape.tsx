// Ronda 45: "manchón" amarillo — el brandbook (03.4 Typography, pág. 37)
// exige que la TAKIS® Font (nombres de sabor) SIEMPRE vaya dentro de esta
// forma de cinta/pincelada amarilla, nunca directo sobre el fondo. Se
// aproxima con clip-path (muescas triangulares en las 4 esquinas, imitando
// el borde irregular de la cinta) en vez de un SVG con el texto adentro,
// para que el texto siga siendo texto real (accesible, seleccionable, y
// que hace reflow normal si el nombre del sabor es largo).
export default function TakisTape({
  children,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className={`inline-block -rotate-1 bg-takis-yellow text-takis-purple ${className}`}
      style={{
        clipPath:
          "polygon(0% 14%, 6% 0%, 12% 14%, 88% 14%, 94% 0%, 100% 14%, 100% 86%, 94% 100%, 88% 86%, 12% 86%, 6% 100%, 0% 86%)",
      }}
    >
      {children}
    </span>
  );
}
