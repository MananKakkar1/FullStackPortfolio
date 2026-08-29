import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { profile, socials } from "../constants";
import { gsap, useGSAP, withMotion } from "../lib/scroll";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { ArrowUpRight } from "../lib/icons";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

type Status = "idle" | "sending" | "sent" | "error";
type Field = "from_name" | "reply_to" | "message";

const fieldClass =
  "w-full rounded-[var(--radius-input)] border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors focus:border-border-strong";

function validate(name: Field, value: string): string {
  const v = value.trim();
  if (!v) return "Required";
  if (name === "reply_to" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
    return "Enter a valid email";
  return "";
}

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  useGSAP(
    () => {
      if (!configured) return;
      withMotion(
        () => {
          gsap.from(".contact-field", {
            y: 18,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: { trigger: ".contact-form", start: "top 80%" },
          });
        },
        () => gsap.set(".contact-field", { autoAlpha: 1 }),
      );
    },
    { scope: root },
  );

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as Field;
    setErrors((prev) => ({ ...prev, [name]: validate(name, e.target.value) }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const next: Partial<Record<Field, string>> = {};
    (["from_name", "reply_to", "message"] as Field[]).forEach((f) => {
      const msg = validate(f, String(data.get(f) ?? ""));
      if (msg) next[f] = msg;
    });
    setErrors(next);
    if (Object.keys(next).length || !configured) return;

    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID!, TEMPLATE_ID!, formRef.current, {
        publicKey: PUBLIC_KEY!,
      });
      setStatus("sent");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={root} className="section-gap">
      <div className="shell">
        <SectionHeading
          title="Get in touch."
          lead="Open to internships, collaborations, and interesting problems."
        />

        <div className="mt-[var(--space-block)] grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <Reveal className="space-y-6">
            <p className="type-lead text-muted">
              The fastest way to reach me is email.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline block font-display text-2xl font-medium text-ink"
            >
              {profile.email}
            </a>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target={s.url.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
                  >
                    {s.label}
                    <ArrowUpRight size={12} weight="bold" className="translate-y-px" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80}>
            {configured ? (
              <form ref={formRef} onSubmit={onSubmit} noValidate className="contact-form space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="contact-field block">
                    <span className="mb-1.5 block text-sm text-muted">Name</span>
                    <input
                      name="from_name"
                      onBlur={onBlur}
                      className={fieldClass}
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.from_name)}
                    />
                    {errors.from_name && (
                      <span className="mt-1 block text-xs text-danger">{errors.from_name}</span>
                    )}
                  </label>
                  <label className="contact-field block">
                    <span className="mb-1.5 block text-sm text-muted">Email</span>
                    <input
                      type="email"
                      name="reply_to"
                      onBlur={onBlur}
                      className={fieldClass}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.reply_to)}
                    />
                    {errors.reply_to && (
                      <span className="mt-1 block text-xs text-danger">{errors.reply_to}</span>
                    )}
                  </label>
                </div>
                <label className="contact-field block">
                  <span className="mb-1.5 block text-sm text-muted">Message</span>
                  <textarea
                    name="message"
                    onBlur={onBlur}
                    rows={5}
                    className={`${fieldClass} resize-y`}
                    placeholder="What are you working on?"
                    aria-invalid={Boolean(errors.message)}
                  />
                  {errors.message && (
                    <span className="mt-1 block text-xs text-danger">{errors.message}</span>
                  )}
                </label>
                <div className="contact-field flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="pressable inline-flex min-h-11 items-center rounded-[var(--radius-input)] bg-ink px-5 text-sm font-medium text-bg hover:bg-ink/90 disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>
                  <p
                    role="status"
                    className="text-sm"
                    style={{ color: status === "error" ? "var(--danger)" : "var(--muted)" }}
                  >
                    {status === "sent" && "Sent. Thanks, I'll be in touch."}
                    {status === "error" && "Something went wrong. Email me directly?"}
                  </p>
                </div>
              </form>
            ) : (
              <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 text-sm text-muted">
                <p>
                  The contact form uses EmailJS. Add{" "}
                  <code className="font-mono text-xs text-ink">VITE_EMAILJS_SERVICE_ID</code>,{" "}
                  <code className="font-mono text-xs text-ink">VITE_EMAILJS_TEMPLATE_ID</code>, and{" "}
                  <code className="font-mono text-xs text-ink">VITE_EMAILJS_PUBLIC_KEY</code> to{" "}
                  <code className="font-mono text-xs text-ink">.env</code> to enable it. Until then,
                  reach me at{" "}
                  <a href={`mailto:${profile.email}`} className="link-underline text-ink">
                    {profile.email}
                  </a>
                  .
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
