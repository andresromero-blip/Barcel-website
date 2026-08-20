// Ronda 45: ícono de la espiral Takis (el mismo motivo que corona la "i" del
// logo) para replicar el "TAKIS® Swirl Pattern" del brandbook (04.1) — ahí
// se usa como patrón repetido de fondo (ver imagen de portada de la sección
// 04, morado/amarillo con espirales). Trazo generado como espiral de
// Arquímedes (2.6 vueltas) en vez de un ícono importado: no hay un asset
// vectorial de la espiral sola entregado por el cliente (el logo completo sí,
// pero recortar solo el ícono de un PNG del wordmark se ve mal al repetirlo
// en mosaico) — esta es una aproximación geométrica fiel al mismo trazo.
export default function TakisSwirl({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
    >
      <path d="M 42.0 40.0 L 42.4 40.7 L 42.6 41.6 L 42.5 42.6 L 41.9 43.7 L 41.0 44.6 L 39.7 45.2 L 38.1 45.4 L 36.4 45.1 L 34.8 44.3 L 33.3 43.0 L 32.2 41.1 L 31.7 38.9 L 31.8 36.5 L 32.6 34.1 L 34.1 31.9 L 36.3 30.1 L 39.1 29.0 L 42.2 28.6 L 45.4 29.1 L 48.5 30.6 L 51.1 32.9 L 53.1 36.0 L 54.3 39.7 L 54.3 43.7 L 53.3 47.7 L 51.1 51.3 L 47.9 54.4 L 43.9 56.5 L 39.3 57.5 L 34.4 57.1 L 29.7 55.4 L 25.6 52.5 L 22.3 48.3 L 20.1 43.4 L 19.4 37.8 L 20.3 32.2 L 22.7 26.9 L 26.5 22.3 L 31.6 18.8 L 37.6 16.8 L 44.0 16.5 L 50.4 17.9 L 56.3 21.1 L 61.2 25.9 L 64.7 32.0 L 66.5 38.9 L 66.4 46.2 L 64.2 53.3 L 60.1 59.7 L 54.3 64.8 L 47.3 68.3 L 39.4 69.7 L 31.3 69.0 L 23.5 66.0 L 16.7 61.0 L 11.5 54.2 L 8.2 46.1 L 7.2 37.2 L 8.6 28.3 L 12.5 20.0" />
    </svg>
  );
}
