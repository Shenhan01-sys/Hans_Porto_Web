import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useRevealGroup } from "@/components/fx/reveal";
import { ScrambleHeading } from "@/components/fx/text";
import { ScrambleLabel } from "@/components/site/scramble-label";
import { contact, person, socials } from "@/content/site";

export function Contact() {
  const group = useRevealGroup<HTMLDivElement>();

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-section">
      <div ref={group} className="wrap">
        <ScrambleHeading id="contact-title" className="font-display text-[clamp(48px,9vw,340px)] leading-[.9] tracking-[-0.045em]">
          {contact.headline}
        </ScrambleHeading>
        <p data-reveal className="mt-s-3 max-w-measure text-lede text-ink-2">
          {contact.intro}
        </p>

        <EmailRow />

        <ul className="mt-s-8 grid gap-x-s-6 gap-y-s-4 md:grid-cols-2">
          {contact.audiences.map((a, i) => (
            <li key={a.who} data-reveal data-reveal-index={i} className="grid gap-1">
              <h3 className="text-ink">{a.who}</h3>
              <p className="text-ink-2">{a.ask}</p>
            </li>
          ))}
        </ul>

        <div className="mt-s-8 grid gap-s-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div data-reveal className="grid content-start gap-3">
            <h3 className="font-display text-h3">Elsewhere</h3>
            <ul className="grid gap-1">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-[44px] items-center font-mono text-small">
                    <ScrambleLabel text={s.label} />
                    <span aria-hidden="true">&nbsp;↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={person.cv} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-[44px] items-center font-mono text-small">
                  <ScrambleLabel text="CV" />
                  <span aria-hidden="true">&nbsp;↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function EmailRow() {
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");
  const button = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  // The page's one spring: the copy button leans toward the pointer (magnet), stiffness 100, damping 18.
  const mx = useSpring(0, { stiffness: 100, damping: 18, mass: 1 });
  const my = useSpring(0, { stiffness: 100, damping: 18, mass: 1 });

  useEffect(() => {
    const el = button.current;
    if (!el || reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const reach = Math.max(r.width, r.height) * 1.2;
      if (Math.hypot(dx, dy) < reach) {
        mx.set(dx * 0.25);
        my.set(dy * 0.35);
      } else {
        mx.set(0);
        my.set(0);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
    window.setTimeout(() => setCopied("idle"), 2400);
  };

  return (
    <div data-reveal className="mt-s-6 flex flex-wrap items-center gap-x-s-4 gap-y-s-2">
      <a href={`mailto:${person.email}`} className="break-all font-display text-[clamp(22px,3.2vw,122px)] leading-tight text-ink underline decoration-line underline-offset-[0.2em] transition-colors duration-fade ease-inout hover:text-arrive hover:decoration-arrive">
        {person.email}
      </a>
      <motion.span ref={button} className="inline-block" style={{ x: mx, y: my }}>
        <button type="button" onClick={copy} className="btn">
          <ScrambleLabel text={copied === "done" ? "Copied" : copied === "failed" ? "Select the address" : "Copy email"} />
        </button>
      </motion.span>
      <p className="sr-only" aria-live="polite">
        {copied === "done" ? "Email address copied." : copied === "failed" ? "Copy did not work. Select the address to copy it." : ""}
      </p>
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      setSent(true);
      reset();
    },
  });

  return (
    <form data-reveal noValidate onSubmit={handleSubmit((d) => mutation.mutate(d))} className="grid gap-s-2" aria-labelledby="form-title">
      <h3 id="form-title" className="font-display text-h3">
        Or leave a message
      </h3>
      <div className="grid gap-s-2 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name?.message}>
          <input id="name" autoComplete="name" className="field" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
        </Field>
        <Field id="email" label="Your email" error={errors.email?.message}>
          <input id="email" type="email" autoComplete="email" className="field" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
        </Field>
      </div>
      <Field id="message" label="Message" error={errors.message?.message}>
        <textarea id="message" rows={5} className="field resize-y" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} />
      </Field>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn" disabled={mutation.isPending}>
          <ScrambleLabel text={mutation.isPending ? "Sending" : "Send message"} />
        </button>
        <p role="status" className="text-ink-2">
          {sent && !mutation.isPending ? "Sent. I will reply by email." : ""}
          {mutation.isError ? <span className="text-danger">The message did not go through. Email me directly instead.</span> : null}
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid content-start gap-2">
      <label htmlFor={id} className="font-mono text-small text-ink-2">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex gap-2 text-[14px] text-danger">
          <span aria-hidden="true" className="font-mono">!</span>
          {error}
        </p>
      )}
    </div>
  );
}
