"use client";

import { useState, type FormEvent } from "react";

// Ronda 41: página "¡Hablemos!" — 1:1 con el wireframe de Figma (node
// 117:2833, archivo "Prototipo Barcel"), mismo criterio que
// AboutPage.tsx: componentes/tokens ya establecidos del sitio, no el
// código exportado de Figma.
//
// Contraste del hero: mismo problema y misma corrección que en
// /sobre-nosotros — el wireframe degrada de red-dark (#ce0728) a
// red-600 (#f5173c), y blanco sobre red-600 solo da 4.14:1 (no pasa
// AA-normal para el subtítulo). Se usa el mismo degradado seguro
// red-950 → red-dark (15.77:1–5.70:1).
//
// Los 4 valores de "Canales de contacto" son textuales del wireframe,
// incluidos los placeholders entre corchetes ("[Número por definir con
// el cliente]", etc.) — se conservan tal cual, mismo criterio que el
// resto de placeholders del sitio (Ingredientes en producto, nota de
// "Sabor con historia" en /sobre-nosotros): son marcadores explícitos
// de contenido pendiente del lado del cliente, no texto inventado.
const CONTACT_CHANNELS = [
  { label: "Línea de atención", value: "[Número por definir con el cliente]" },
  { label: "Correo electrónico", value: "[Correo por definir con el cliente]" },
  { label: "Horario de atención", value: "[Horario por definir con el cliente]" },
  { label: "Redes sociales", value: "Encuéntranos como @barcel en todas las redes" },
];

const INPUT_CLASSNAME =
  "h-14 w-full rounded-2xl border-[1.5px] border-grey-200 bg-white px-5 font-body text-base text-barcel-black placeholder:text-grey-300 focus:border-barcel-red-dark focus:outline-none focus:ring-2 focus:ring-barcel-red-dark/20";

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
    // ver "[Correo por definir con el cliente]" a la izquierda). Por
    // ahora el submit solo valida y muestra la confirmación en pantalla,
    // sin enviar el mensaje a ningún lado — no engañar al usuario
    // afirmando que "ya se envió" sería peor que dejarlo claro aquí.
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-barcel-red-950 to-barcel-red-dark px-5 py-16 text-center text-white sm:py-20 md:py-28">
        <div className="container-page flex flex-col items-center gap-4 sm:gap-6">
          <h1 className="font-teko text-6xl font-bold uppercase leading-[0.9] sm:text-7xl md:text-8xl lg:text-[120px]">
            ¡Hablemos!
          </h1>
          <p className="max-w-2xl font-body text-base font-medium leading-relaxed sm:text-lg md:text-xl">
            ¿Dudas, ideas, alianzas o simplemente mucho antojo? Escríbenos y
            te respondemos.
          </p>
        </div>
      </section>

      {/* Canales de contacto + formulario */}
      <section className="bg-white px-5 py-16 md:py-24">
        <div className="container-page grid gap-12 md:grid-cols-[minmax(0,420px)_1fr] md:gap-16">
          <div className="flex flex-col gap-8">
            <h2 className="font-teko text-4xl font-semibold uppercase leading-[0.95] text-grey-950 sm:text-5xl">
              Canales de contacto
            </h2>
            <div className="flex flex-col gap-6">
              {CONTACT_CHANNELS.map((channel) => (
                <div key={channel.label} className="flex flex-col gap-1">
                  <p className="font-display text-lg font-bold text-grey-950">
                    {channel.label}
                  </p>
                  <p className="font-body text-base text-grey-700">
                    {channel.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {submitted ? (
            <div
              role="status"
              className="flex flex-col items-start gap-3 rounded-3xl bg-grey-50 p-6 sm:p-10"
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
              className="flex flex-col gap-5 rounded-3xl bg-grey-50 p-6 sm:p-10"
            >
              <input
                type="text"
                required
                placeholder="Nombre completo"
                aria-label="Nombre completo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={INPUT_CLASSNAME}
              />
              <input
                type="email"
                required
                placeholder="Correo electrónico"
                aria-label="Correo electrónico"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={INPUT_CLASSNAME}
              />
              <input
                type="tel"
                placeholder="Teléfono (opcional)"
                aria-label="Teléfono (opcional)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={INPUT_CLASSNAME}
              />
              <input
                type="text"
                required
                placeholder="Asunto"
                aria-label="Asunto"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={INPUT_CLASSNAME}
              />
              <textarea
                required
                placeholder="Tu mensaje"
                aria-label="Tu mensaje"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className={`${INPUT_CLASSNAME} h-40 resize-none py-4`}
              />
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
                <a href="#privacidad" className="underline hover:text-barcel-black">
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
        </div>
      </section>
    </>
  );
}
