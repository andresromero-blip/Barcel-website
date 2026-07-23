const FOOTER_LINKS = [
  { label: "Contáctanos", href: "#contacto" },
  { label: "Términos y condiciones", href: "#terminos" },
  { label: "Políticas de tratamientos de Datos personales", href: "#privacidad" },
  { label: "Política de cookies", href: "#cookies" },
];

// Nota: por indicación del cliente ya no se incluye el ícono de Twitter/X
// (ver AJUSTES BARCEL, punto 2 — la marca ya no tiene esas cuentas activas).
const SOCIALS = [
  {
    label: "Facebook",
    href: "#",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.5.5.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53C6.09.28 6.82.11 7.88.06 8.94.01 9.28 0 12 0Zm0 5.35A6.65 6.65 0 1 0 12 18.65 6.65 6.65 0 0 0 12 5.35Zm0 10.97A4.32 4.32 0 1 1 12 7.68a4.32 4.32 0 0 1 0 8.64ZM18.9 5.1a1.56 1.56 0 1 1-3.12 0 1.56 1.56 0 0 1 3.12 0Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.4 3.6-6.4 3.6Z",
  },
];

export default function Footer() {
  return (
    <footer id="contacto" className="bg-barcel-black text-white">
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <a href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/barcel-logo-horizontal.png"
            alt="Barcel®"
            className="h-9 w-auto object-contain object-left"
          />
        </a>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 font-body text-sm text-white/70">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="flex h-9 w-9 items-center justify-center bg-white/10 transition-colors hover:bg-barcel-red"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-page text-center font-body text-xs text-white/50">
          © {new Date().getFullYear()} BARCEL® - Grupo Bimbo. Todos los
          derechos reservados.
        </p>
      </div>
    </footer>
  );
}
