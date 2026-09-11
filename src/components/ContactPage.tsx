"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

// Ronda 146: rediseño Figma 1:1 de /contacto ("¡Hablemos!"), reemplazando
// la versión wireframe de la Ronda 41 (node 117:2833, archivo "Prototipo
// Barcel", ya superado). Referencia real: archivo "Barce site",
// node-id=1-3269 (desktop) y node-id=1-10672 (mobile) — el mismo patrón
// de "Figma real reemplaza wireframe" que ya se aplicó en Home (Rondas
// 201-203).
//
// Cambios de fondo respecto a la versión anterior:
// - El hero ya NO está centrado — título y subtítulo van alineados a la
//   izquierda, con un breadcrumb "Inicio → Contáctanos" arriba (mismo
//   patrón ya usado en ProductDetail.tsx/TakisProductDetail.tsx, con "→"
//   en vez de "/" como separador, que es el que usa este frame).
// - La columna izquierda ya no es una lista plana de "Canales de
//   contacto": son TRES bloques reales con su propio heading —
//   "Líneas de atención" (con ícono por renglón), "Horario de atención"
//   (datos reales del Figma, ya no placeholder) y "Redes sociales" (con
//   los íconos reales, no solo texto).
// - Cada campo del formulario ahora lleva su propia etiqueta visible
//   arriba (antes solo vivía como placeholder/aria-label), y Asunto/
//   Mensaje llevan su límite de caracteres real (60 y 1000) reflejado en
//   maxLength + el texto de ayuda del Figma.
// - Mobile vs. desktop no es el mismo layout con las columnas apiladas:
//   en mobile "Horario de atención" y "Redes sociales" van DESPUÉS del
//   formulario completo (no antes, como en desktop). Como el formulario
//   tiene estado de React compartido, no se puede duplicar ese bloque —
//   se resuelve con un solo grid: en mobile los 4 bloques siguen el
//   orden real del DOM (Líneas → Form → Horario → Redes); desde md: se
//   reposicionan con grid-column/grid-row explícitos a las dos columnas
//   del Figma desktop (Líneas/Horario/Redes apilados a la izquierda,
//   Form a la derecha ocupando las 3 filas).
//
// Contraste del hero: mismo degradado seguro ya usado en el resto del
// sitio (red-950 → red-dark, 15.77:1–5.70:1) en vez del red-dark→red-600
// del wireframe original (blanco sobre red-600 da 4.14:1, no pasa AA
// para texto normal).
const CONTACT_CHANNELS = [
  {
    label: "[Pendiente por definir con el cliente]",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    ),
  },
  {
    label: "[Pendiente por definir con el cliente]",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    ),
  },
  {
    label: "[Pendiente por definir con el cliente]",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </>
    ),
  },
];

const OPENING_HOURS = [
  { day: "Lunes a viernes", hours: "8:00am - 5:00pm" },
  { day: "Sábados", hours: "8:00am - 12:00pm" },
  { day: "Domingos", hours: "Cerrado" },
];

// Mismos glifos oficiales (Simple Icons) que ya usa Footer.tsx — se
// duplican aquí en vez de importarlos porque Footer.tsx no los exporta,
// mismo criterio que el resto del sitio (cada sección define su propio
// set si el componente de origen no lo expone).
const SOCIALS = [
  {
    label: "Facebook",
    href: "#",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

const INPUT_CLASSNAME =
  "h-14 w-full rounded-lg border-[1.5px] border-grey-200 bg-white px-5 font-body text-base text-barcel-black placeholder:text-grey-300 focus:border-barcel-red-dark focus:outline-none focus:ring-2 focus:ring-barcel-red-dark/20";

const ASUNTO_MAX = 60;
const MENSAJE_MAX = 1000;

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const EMPTY_FORM: ContactForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) return;
    // Nota para el equipo de desarrollo: este formulario todavía NO está
    // conectado a un backend/servicio de email — falta dar de alta un
    // API route (o un proveedor tipo Resend/Formspree) que reciba estos
    // datos y los envíe al correo real de Barcel (hoy tampoco definido,
    // ver "[Pendiente por definir con el cliente]" a la izquierda). Por
    // ahora el submit solo valida y muestra la confirmación en pantalla,
    // sin enviar el mensaje a ningún lado — no engañar al usuario
    // afirmando que "ya se envió" sería peor que dejarlo claro aquí.
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-barcel-red-950 to-barcel-red-dark px-5 py-12 text-white sm:py-16 md:py-20">
        <div className="container-page flex flex-col gap-4 sm:gap-6">
          <nav
            aria-label="Ruta de navegación"
            className="flex flex-wrap items-center gap-1.5 font-body text-xs text-white/80 md:text-sm"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Inicio
            </Link>
            <span aria-hidden="true" className="text-white/50">
              →
            </span>
            <span className="text-white">Contáctanos</span>
          </nav>
          <div className="flex flex-col gap-3 sm:gap-4">
            <h1 className="font-teko text-6xl font-bold uppercase leading-[0.9] sm:text-7xl md:text-8xl lg:text-[96px]">
              ¡Hablemos!
            </h1>
            <p className="max-w-2xl font-body text-base font-medium leading-relaxed sm:text-lg">
              ¿Dudas, ideas, alianzas o simplemente mucho antojo? Escríbenos
              y te respondemos.
            </p>
          </div>
        </div>
      </section>

      {/* Líneas de atención + formulario + horario + redes */}
      <section className="bg-white px-5 py-16 md:py-24">
        <div className="container-page grid gap-12 md:grid-cols-[minmax(0,420px)_1fr] md:items-start md:gap-x-16 md:gap-y-14">
          {/* Líneas de atención */}
          <div className="flex flex-col gap-6 md:col-start-1 md:row-start-1">
            <h2 className="font-teko text-4xl font-semibold uppercase leading-[0.95] text-grey-950 sm:text-5xl">
              Líneas de atención
            </h2>
            <div className="flex flex-col gap-4">
              {CONTACT_CHANNELS.map((channel, i) => (
                <div key={i} className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-barcel-red-dark"
                  >
                    {channel.icon}
                  </svg>
                  <p className="font-body text-base text-grey-700">
                    {channel.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario */}
          {submitted ? (
            <div
              role="status"
              className="flex flex-col items-start gap-3 rounded-3xl bg-grey-50 p-6 sm:p-10 md:col-start-2 md:row-start-1 md:row-span-3"
            >
              <p className="font-teko text-3xl font-bold uppercase text-barcel-red-dark sm:text-4xl">
                ¡Gracias!
              </p>
              <p className="font-body text-base text-grey-700">
                Recibimos tu mensaje. En cuanto el equipo de Barcel tenga un
                canal de contacto activo, te responderemos por ahí.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForm(EMPTY_FORM);
                  setConsent(false);
                  setSubmitted(false);
                }}
                className="mt-2 font-display text-sm font-bold uppercase text-barcel-red-dark underline underline-offset-2"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 md:col-start-2 md:row-start-1 md:row-span-3"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  className="font-display text-sm font-bold text-grey-950"
                >
                  Nombre completo
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Ingresa tu nombre"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={INPUT_CLASSNAME}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-email"
                  className="font-display text-sm font-bold text-grey-950"
                >
                  Correo electrónico
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="Ej: info@barcel.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={INPUT_CLASSNAME}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-phone"
                  className="font-display text-sm font-bold text-grey-950"
                >
                  Teléfono (Opcional)
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="Digita tu número de teléfono"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={INPUT_CLASSNAME}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-subject"
                  className="font-display text-sm font-bold text-grey-950"
                >
                  Asunto
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="Escribe tu asunto"
                  maxLength={ASUNTO_MAX}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={INPUT_CLASSNAME}
                />
                <p className="font-body text-xs text-grey-400">
                  Máximo {ASUNTO_MAX} caracteres
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-message"
                  className="font-display text-sm font-bold text-grey-950"
                >
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  required
                  placeholder="Escribe aquí tu duda, sugerencia o si solo quieres contactarnos"
                  maxLength={MENSAJE_MAX}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className={`${INPUT_CLASSNAME} h-36 resize-none py-4`}
                />
                <div className="flex items-center justify-between">
                  <p className="font-body text-xs text-grey-400">
                    Máximo {MENSAJE_MAX} caracteres
                  </p>
                  <p className="font-body text-xs text-grey-400">
                    {form.message.length}/{MENSAJE_MAX}
                  </p>
                </div>
              </div>

              <label className="flex items-start gap-3 font-body text-sm leading-relaxed text-grey-700">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-[1.5px] border-grey-400 text-barcel-red-dark focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-barcel-red-dark"
                />
                {/* Mismo placeholder "#privacidad" que ya usa el Footer
                    (Políticas de tratamiento de Datos personales) — no
                    existe todavía una página real de política de
                    privacidad en el sitio. */}
                Autorizo el tratamiento de mis datos personales según la{" "}
                <a
                  href="#privacidad"
                  className="text-barcel-red-dark underline hover:text-barcel-black"
                >
                  política de privacidad
                </a>
                .
              </label>

              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center gap-3 bg-barcel-red-dark px-6 py-4 font-display text-base font-bold uppercase tracking-wide text-white transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-red-dark active:scale-95"
              >
                Enviar mensaje
                <span aria-hidden>→</span>
              </button>
            </form>
          )}

          {/* Horario de atención */}
          <div className="flex flex-col gap-6 md:col-start-1 md:row-start-2">
            <h2 className="font-teko text-4xl font-semibold uppercase leading-[0.95] text-grey-950 sm:text-5xl">
              Horario de atención
            </h2>
            <div className="flex flex-col gap-3">
              {OPENING_HOURS.map((row) => (
                <div
                  key={row.day}
                  className="flex items-center justify-between gap-4 font-body text-base"
                >
                  <span className="text-grey-950">{row.day}</span>
                  <span className="font-semibold text-barcel-red-dark">
                    {row.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Redes sociales */}
          <div className="flex flex-col gap-4 md:col-start-1 md:row-start-3">
            <h2 className="font-teko text-4xl font-semibold uppercase leading-[0.95] text-grey-950 sm:text-5xl">
              Redes sociales
            </h2>
            <p className="font-body text-base text-grey-700">
              Síguenos en nuestras redes sociales
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-barcel-black text-white transition-transform hover:scale-110"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
