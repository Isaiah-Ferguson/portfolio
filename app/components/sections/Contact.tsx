"use client";

import { useState } from "react";
import { contact } from "../../data/profile";
import { SectionShell, Panel } from "./SectionShell";

const PROJECT_TYPES = [
  "Software development",
  "Speaking or workshop",
  "Education partnership",
  "Mentorship or advocacy",
  "Something else",
];

interface FormState {
  name: string;
  email: string;
  organization: string;
  projectType: string;
  message: string;
}

const EMPTY: FormState = { name: "", email: "", organization: "", projectType: "", message: "" };

/**
 * Optional real delivery via Web3Forms (free): create an access key at
 * https://web3forms.com, then set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local.
 * Without a key the form falls back to composing an email in the
 * visitor's own mail client.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const inputClass =
  "w-full rounded-sm border border-rule bg-void/60 px-4 py-3 text-ink placeholder:text-ink-soft transition-colors focus:border-rule-strong";

/** The journey's end: a calm communications station on the horizon. */
export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "composed" | "failed">("idle");

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [key]: e.target.value });
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please share your name.";
    if (!form.email.trim()) next.email = "An email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "That email address doesn't look right.";
    if (!form.projectType) next.projectType = "Choose the closest fit.";
    if (form.message.trim().length < 10)
      next.message = "Tell me a little more — at least a sentence.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) return;
    setStatus("sending");

    if (WEB3FORMS_KEY) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `${form.projectType} — inquiry from ${form.name}`,
            name: form.name,
            email: form.email,
            organization: form.organization || "—",
            project_type: form.projectType,
            message: form.message,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setStatus("sent");
          setForm(EMPTY);
        } else {
          setStatus("failed");
        }
      } catch {
        setStatus("failed");
      }
      return;
    }

    // No delivery key configured: compose in the visitor's own mail client.
    const subject = encodeURIComponent(`${form.projectType} — inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nOrganization: ${form.organization || "—"}\nProject type: ${form.projectType}\n\n${form.message}`,
    );
    window.setTimeout(() => {
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setStatus("composed");
    }, 400);
  };

  return (
    <SectionShell id="contact" label="Contact" side="center" wide>
      <Panel>
        <p className="microlabel mb-3 text-sun">End of the journey · Communications station</p>
        <h2 className="font-display text-4xl leading-tight text-ink sm:text-6xl">
          Let&apos;s build something <em className="text-sun-bright">meaningful</em>.
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-ink-muted">
          Whether it&apos;s an engineering role, a student who needs a mentor, a community
          partnership, or a stage that needs someone to talk about code — the channel is open.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-1">
            <p className="microlabel mb-3 text-ink-soft">Direct channels</p>
            {[
              { label: "Email", href: `mailto:${contact.email}`, text: contact.email, external: false },
              { label: "LinkedIn", href: contact.linkedin, text: "in/isaiah-ferguson", external: true },
              { label: "GitHub", href: contact.github, text: "Isaiah-Ferguson", external: true },
              { label: "Résumé", href: contact.resume, text: "Download PDF", external: true },
              {
                label: "Professional inquiries",
                href: `mailto:${contact.email}?subject=${encodeURIComponent("Professional inquiry")}`,
                text: "Start a conversation",
                external: false,
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex min-h-12 items-center justify-between gap-4 border-b border-rule py-3"
              >
                <span className="microlabel text-ink-soft transition-colors group-hover:text-sun">
                  {c.label}
                </span>
                <span className="font-mono text-sm text-ink-muted transition-colors group-hover:text-ink">
                  {c.text} <span aria-hidden>↗</span>
                </span>
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="microlabel mb-2 block text-ink-soft">
                  Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={set("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={inputClass}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p id="contact-name-error" role="alert" className="mt-1.5 text-sm text-rose">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="microlabel mb-2 block text-ink-soft">
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={set("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={inputClass}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p id="contact-email-error" role="alert" className="mt-1.5 text-sm text-rose">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-org" className="microlabel mb-2 block text-ink-soft">
                  Organization
                </label>
                <input
                  id="contact-org"
                  type="text"
                  autoComplete="organization"
                  value={form.organization}
                  onChange={set("organization")}
                  className={inputClass}
                  placeholder="Company, school, or community org"
                />
              </div>
              <div>
                <label htmlFor="contact-type" className="microlabel mb-2 block text-ink-soft">
                  Project type *
                </label>
                <select
                  id="contact-type"
                  value={form.projectType}
                  onChange={set("projectType")}
                  aria-invalid={!!errors.projectType}
                  aria-describedby={errors.projectType ? "contact-type-error" : undefined}
                  className={`${inputClass} appearance-none ${form.projectType ? "" : "text-ink-soft"}`}
                >
                  <option value="" disabled>
                    Choose one…
                  </option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-space text-ink">
                      {t}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p id="contact-type-error" role="alert" className="mt-1.5 text-sm text-rose">
                    {errors.projectType}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="microlabel mb-2 block text-ink-soft">
                Message *
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={form.message}
                onChange={set("message")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`${inputClass} resize-y`}
                placeholder="What are we building together?"
              />
              {errors.message && (
                <p id="contact-message-error" role="alert" className="mt-1.5 text-sm text-rose">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="microlabel flex min-h-12 items-center gap-2 rounded-sm bg-sun px-7 text-void transition-all hover:bg-sun-bright disabled:opacity-60"
              >
                {status === "sending" ? "Transmitting…" : "Send transmission"}
              </button>
              {status === "sent" && (
                <p role="status" className="text-sm leading-relaxed text-teal">
                  Transmission received — thank you. Isaiah will reply to the address you shared.
                </p>
              )}
              {status === "composed" && (
                <p role="status" className="text-sm leading-relaxed text-teal">
                  Transmission prepared — your email app should be open. If not, write to{" "}
                  <a href={`mailto:${contact.email}`} className="underline">
                    {contact.email}
                  </a>{" "}
                  directly.
                </p>
              )}
              {status === "failed" && (
                <p role="alert" className="text-sm leading-relaxed text-rose">
                  The transmission didn&apos;t go through. Please email{" "}
                  <a href={`mailto:${contact.email}`} className="underline">
                    {contact.email}
                  </a>{" "}
                  directly.
                </p>
              )}
            </div>
          </form>
        </div>

        <footer className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
          <p className="font-mono text-xs text-ink-soft" suppressHydrationWarning>
            © {new Date().getFullYear()} Isaiah Ferguson · Stockton, California
          </p>
          <a href="#hero" className="microlabel flex min-h-11 items-center gap-2 text-ink-soft transition-colors hover:text-sun">
            <span aria-hidden>↑</span> Return to the beginning
          </a>
        </footer>
      </Panel>
    </SectionShell>
  );
}
