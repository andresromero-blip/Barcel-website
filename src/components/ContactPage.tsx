"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

// Ronda 168: iteración 1:1 de /contacto con los pantallazos de desarrollo
// (hero centrado + tarjetas blancas sobre fondo gris + formulario con
// selector toggle Personas / Empresas).
//
// Cambios respecto a la Ronda 146:
// - Hero: título y bajada centrados; el breadcrumb queda a la izquierda
//   con "Contáctanos" subrayado.
// - Fondo de la sección en gris claro; "Líneas de atención", "Horario de
//   atención", "Redes sociales" y el formulario son tarjetas blancas.
// - Datos reales de contacto (teléfono, WhatsApp, correo) y texto de
//   redes "Encuéntranos como @barcel en todas las redes".
// - Formulario con toggle "¿Nos escribes como persona o como empresa?":
//   · Personas: nombre, correo, teléfono (opcional), asunto, mensaje.
//   · Empresas: agrega Empresa, Cargo (opcional), Ciudad / estado
//     (opcional) y Giro del negocio (opcional).
//   El toggle son dos <input type="radio"> dentro de un <fieldset>, así
//   funciona con teclado (flechas) y lectores de pantalla sin ARIA extra.
// - Campos cuadrados (radio 0), etiqueta bold arriba, botón "Enviar
//   mensaje" centrado y sin flecha.
// - Se mantiene el orden mobile: Líneas → Formulario → Horario → Redes.
//
// Contraste: el degradado del hero arranca en #e0102f (no en red-600) para
// que el breadcrumb y la bajada en blanco pasen AA (≥ 4.5:1).
const CONTACT_CHANNELS = [
  {
    label: "Tel: 55 4746 9720",
    href: "tel:+525547469720",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    ),
  },
  {
    label: "WhatsApp: 55 9156 9402",
    href: "https://wa.me/525591569402",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    ),
  },
  {
    label: "Correo: servicioalcliente@barcel.com.mx",
    href: "mailto:servicioalcliente@barcel.com.mx",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    ),
  },
];

const OPENING_HOURS = [
  { day: "Lunes a viernes", hours: "8:00am - 5:00pm" },
  { day: "Sábados", hours: "8:00am - 12:00pm" },
  { day: "Domingos", hours: "Cerrado" },
];

// Mismos glifos oficiales (Simple Icons) que ya usa Footer.tsx. Orden del
// diseño: Instagram, Facebook, YouTube.
const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

// Campos cuadrados (radio 0) como en el diseño de desarrollo.
const INPUT_CLASSNAME =
  "h-12 w-full rounded-none border-[1.5px] border-grey-300 bg-white px-4 font-body text-base text-barcel-black placeholder:text-grey-400 focus:border-barcel-black focus:outline-none focus:ring-2 focus:ring-barcel-black/20";

const LABEL_CLASSNAME = "font-display text-sm font-bold text-grey-950";

const MENSAJE_MAX = 1000;
const ASUNTO_MAX = 100;

// Opciones de "Giro del negocio": propuesta, pendiente de validar con el
// cliente (el diseño solo muestra el valor por defecto "Ninguno").
const BUSINESS_TYPES = [
  "Tienda de abarrotes / conveniencia",
  "Autoservicio / supermercado",
  "Distribución / mayoreo",
  "Restaurante / cafetería",
  "Eventos / catering",
  "Otro",
];

type ContactKind = "persona" | "empresa";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  city: string;
  industry: string;
  subject: string;
  message: string;
};

const EMPTY_FORM: ContactForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  city: "",
  industry: "",
  subject: "",
  message: "",
};

const KINDS: { value: ContactKind; label: string }[] = [
  { value: "persona", label: "Personas" },
  { value: "empresa", label: "Empresas" },
];

export default function ContactPage() {
  const [kind, setKind] = useState<ContactKind>("persona");
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isCompany = kind === "empresa";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) return;
    // Nota para el equipo de desarrollo: este formulario todavía NO está
    // conectado a un backend/servicio de email. Por ahora el submit solo
    // valida y muestra la confirmación en pantalla, sin enviar el mensaje
    // a ningún lado. Al conectarlo, enviar `kind` y, si es "empresa",
    // también company, role, city e industry.
    setSubmitted(true);
  };

  const cardClassName = "bg-white p-5 md:p-6";
  const headingClassName =
    "font-teko text-4xl font-bold uppercase leading-none text-grey-950 sm:text-5xl";

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#e0102f] to-barcel-red-dark px-5 py-12 text-center text-white sm:py-16 md:py-20">
        <div className="container-page flex flex-col items-center gap-4 sm:gap-6">
          <nav
            aria-label="Ruta de navegación"
            className="flex w-full flex-wrap items-center gap-2 text-left font-body text-sm text-white md:text-base"
          >
            <Link href="/" className="transition-opacity hover:opacity-80">
              Inicio
            </Link>
            <span aria-hidden="true">→</span>
            <span
              aria-current="page"
              className="underline underline-offset-2"
            >
              Contáctanos
            </span>
          </nav>
          <h1 className="font-teko text-6xl font-bold uppercase leading-[0.9] sm:text-7xl md:text-8xl lg:text-[96px]">
            ¡Hablemos!
          </h1>
          <p className="max-w-2xl font-body text-base font-medium leading-relaxed sm:text-lg">
            ¿Dudas, ideas, alianzas o simplemente mucho antojo? Escríbenos y
            te respondemos.
          </p>
        </div>
      </section>

      {/* Líneas de atención + formulario + horario + redes */}
      <section className="bg-grey-50 px-5 py-10 md:py-16">
        <div className="container-page grid gap-5 md:grid-cols-[minmax(0,7fr)_minmax(0,10fr)] md:grid-rows-[auto_auto_1fr] md:items-start md:gap-6">
          {/* Líneas de atención */}
          <div
            className={`${cardClassName} flex flex-col gap-4 md:col-start-1 md:row-start-1`}
          >
            <h2 className={headingClassName}>Líneas de atención</h2>
            <ul className="flex flex-col gap-3">
              {CONTACT_CHANNELS.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    className="flex items-center gap-3 font-body text-base text-grey-700 hover:text-barcel-red-dark"
                  >
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
                    <span className="break-words">{channel.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Formulario */}
          {submitted ? (
            <div
              role="status"
              className={`${cardClassName} flex flex-col items-start gap-3 sm:p-8 md:col-start-2 md:row-start-1 md:row-span-3`}
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
              className={`${cardClassName} flex flex-col gap-4 md:col-start-2 md:row-start-1 md:row-span-3`}
            >
              {/* Toggle Personas / Empresas */}
              <fieldset className="flex flex-col gap-2">
                <legend className={`${LABEL_CLASSNAME} mb-2`}>
                  ¿Nos escribes como persona o como empresa?
                </legend>
                <div className="grid grid-cols-2 gap-1 border-2 border-grey-300 bg-white p-1">
                  {KINDS.map((option) => (
                    <label key={option.value} className="relative block">
                      <input
                        type="radio"
                        name="contact-kind"
                        value={option.value}
                        checked={kind === option.value}
                        onChange={() => setKind(option.value)}
                        className="peer sr-only"
                      />
                      <span className="flex h-10 cursor-pointer items-center justify-center bg-white font-display text-sm font-bold text-grey-700 transition-colors hover:bg-grey-50 peer-checked:bg-barcel-red-dark peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-barcel-black">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className={LABEL_CLASSNAME}>
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

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className={LABEL_CLASSNAME}>
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

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-phone" className={LABEL_CLASSNAME}>
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

              {isCompany && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-company" className={LABEL_CLASSNAME}>
                      Empresa
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      required
                      placeholder="Nombre de tu empresa"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      className={INPUT_CLASSNAME}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-role" className={LABEL_CLASSNAME}>
                        Cargo (Opcional)
                      </label>
                      <input
                        id="contact-role"
                        type="text"
                        placeholder="Tu puesto en la empresa"
                        value={form.role}
                        onChange={(e) =>
                          setForm({ ...form, role: e.target.value })
                        }
                        className={INPUT_CLASSNAME}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="contact-city" className={LABEL_CLASSNAME}>
                        Ciudad / estado (Opcional)
                      </label>
                      <input
                        id="contact-city"
                        type="text"
                        placeholder="Ej: Monterrey, Nuevo León"
                        value={form.city}
                        onChange={(e) =>
                          setForm({ ...form, city: e.target.value })
                        }
                        className={INPUT_CLASSNAME}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-industry"
                      className={LABEL_CLASSNAME}
                    >
                      Giro del negocio (Opcional)
                    </label>
                    <div className="relative">
                      <select
                        id="contact-industry"
                        value={form.industry}
                        onChange={(e) =>
                          setForm({ ...form, industry: e.target.value })
                        }
                        className={`${INPUT_CLASSNAME} appearance-none pr-10`}
                      >
                        <option value="">Ninguno</option>
                        {BUSINESS_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-grey-950"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </div>
                  </div>
                </>
              )}

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-subject" className={LABEL_CLASSNAME}>
                  Asunto
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="Escribe tu asunto"
                  maxLength={ASUNTO_MAX}
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className={INPUT_CLASSNAME}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className={LABEL_CLASSNAME}>
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  required
                  placeholder="Escribe aquí tu duda, sugerencia o si solo quieres contactarnos"
                  maxLength={MENSAJE_MAX}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  rows={5}
                  className={`${INPUT_CLASSNAME} h-28 resize-none py-3`}
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
                  className="mt-0.5 h-4 w-4 shrink-0 rounded-none border-[1.5px] border-grey-400 text-barcel-red-dark focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-barcel-red-dark"
                />
                {/* Mismo placeholder "#privacidad" que ya usa el Footer. */}
                <span>
                  Autorizo el tratamiento de mis datos personales según la{" "}
                  <a
                    href="#privacidad"
                    className="text-barcel-red-dark underline hover:text-barcel-black"
                  >
                    política de privacidad
                  </a>
                  .
                </span>
              </label>

              <button
                type="submit"
                className="mx-auto mt-1 inline-flex items-center justify-center bg-barcel-red-dark px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-barcel-red-dark active:scale-95"
              >
                Enviar mensaje
              </button>
            </form>
          )}

          {/* Horario de atención */}
          <div
            className={`${cardClassName} flex flex-col gap-4 md:col-start-1 md:row-start-2`}
          >
            <h2 className={headingClassName}>Horario de atención</h2>
            <div className="flex flex-col gap-3">
              {OPENING_HOURS.map((row) => (
                <div
                  key={row.day}
                  className="flex items-center justify-between gap-4 font-body text-base"
                >
                  <span className="text-grey-700">{row.day}</span>
                  <span className="font-semibold text-barcel-red-dark">
                    {row.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Redes sociales */}
          <div
            className={`${cardClassName} flex flex-col gap-4 md:col-start-1 md:row-start-3`}
          >
            <h2 className={headingClassName}>Redes sociales</h2>
            <p className="font-body text-base text-grey-700">
              Encuéntranos como{" "}
              <span className="text-barcel-red-dark">@barcel</span> en todas
              las redes
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
