import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { profile, socials } from "@/constants";
import { gsap, useGSAP, withMotion } from "@/lib/scroll";
import { revealDelay } from "@/lib/reveal";
import { ArrowUpRight } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

type FieldName = "from_name" | "reply_to" | "message";

const inputClass = "h-11 rounded-lg bg-card px-4 shadow-none dark:bg-card";

function validate(name: FieldName, value: string): string {
  const v = value.trim();
  if (!v) return "Required";
  if (name === "reply_to" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email";
  return "";
}

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

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
    const name = e.target.name as FieldName;
    setErrors((prev) => ({ ...prev, [name]: validate(name, e.target.value) }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const next: Partial<Record<FieldName, string>> = {};
    (["from_name", "reply_to", "message"] as FieldName[]).forEach((f) => {
      const msg = validate(f, String(data.get(f) ?? ""));
      if (msg) next[f] = msg;
    });
    setErrors(next);
    if (Object.keys(next).length || !configured) return;

    setSending(true);
    try {
      await emailjs.sendForm(SERVICE_ID!, TEMPLATE_ID!, formRef.current, { publicKey: PUBLIC_KEY! });
      toast.success("Sent. Thanks, I'll be in touch.");
      formRef.current.reset();
    } catch {
      toast.error("Something went wrong.", { description: `Email me directly at ${profile.email}.` });
    } finally {
      setSending(false);
    }
  };

  const err = (name: FieldName) => (errors[name] ? [{ message: errors[name] }] : undefined);

  return (
    <section id="contact" ref={root} className="section-gap">
      <div className="shell">
        <div data-reveal>
          <h2 className="type-display-l max-w-[20ch] text-foreground">Get in touch.</h2>
          <p className="type-lead mt-5 max-w-[48ch] text-muted-foreground">
            Open to research collaborations, open source, and interesting problems.
          </p>
        </div>

        <div
          className={cn(
            "mt-[var(--space-block)] grid gap-12 md:gap-16",
            configured && "md:grid-cols-[1fr_1.1fr]",
          )}
        >
          <div data-reveal className="space-y-6">
            <p className="type-lead text-muted-foreground">The fastest way to reach me is email.</p>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline block font-display text-2xl font-medium break-all text-foreground"
            >
              {profile.email}
            </a>
            <ul className="-ml-3 flex flex-wrap gap-x-1 gap-y-2 pt-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <Button
                    asChild
                    variant="link"
                    className="gap-1 font-normal text-muted-foreground hover:text-foreground hover:no-underline"
                  >
                    <a
                      href={s.url}
                      target={s.url.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      {s.label}
                      <ArrowUpRight size={12} weight="bold" className="translate-y-px" />
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {configured && (
            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              data-reveal
              style={revealDelay(80)}
              className="contact-form"
            >
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field className="contact-field" data-invalid={Boolean(errors.from_name)}>
                    <FieldLabel htmlFor="from_name" className="font-normal text-muted-foreground">
                      Name
                    </FieldLabel>
                    <Input
                      id="from_name"
                      name="from_name"
                      onBlur={onBlur}
                      className={inputClass}
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.from_name)}
                    />
                    <FieldError errors={err("from_name")} />
                  </Field>
                  <Field className="contact-field" data-invalid={Boolean(errors.reply_to)}>
                    <FieldLabel htmlFor="reply_to" className="font-normal text-muted-foreground">
                      Email
                    </FieldLabel>
                    <Input
                      id="reply_to"
                      type="email"
                      name="reply_to"
                      onBlur={onBlur}
                      className={inputClass}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.reply_to)}
                    />
                    <FieldError errors={err("reply_to")} />
                  </Field>
                </div>
                <Field className="contact-field" data-invalid={Boolean(errors.message)}>
                  <FieldLabel htmlFor="message" className="font-normal text-muted-foreground">
                    Message
                  </FieldLabel>
                  <Textarea
                    id="message"
                    name="message"
                    onBlur={onBlur}
                    rows={5}
                    className="min-h-32 resize-y rounded-lg bg-card px-4 py-3 shadow-none dark:bg-card"
                    placeholder="What are you working on?"
                    aria-invalid={Boolean(errors.message)}
                  />
                  <FieldError errors={err("message")} />
                </Field>
                <Field orientation="horizontal" className="contact-field">
                  <Button type="submit" size="lg" disabled={sending} className="h-11 w-fit rounded-lg px-5">
                    {sending && <Spinner />}
                    {sending ? "Sending…" : "Send message"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
