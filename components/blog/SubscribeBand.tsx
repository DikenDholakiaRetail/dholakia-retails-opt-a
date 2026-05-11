"use client";

import { useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Check, AlertCircle, Loader2 } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import { EASE_STANDARD } from "@/lib/motion";
import { validateEmail } from "@/lib/email-validation";

/**
 * P18-S05 / P19-S05 Subscribe Band — wired to /api/newsletter.
 *
 * Behaviour:
 *   • Real-time email validation (format + disposable-domain check).
 *     Errors render below the input in red, only AFTER the user has touched
 *     the field, so first paint is silent.
 *   • Subscribe button stays disabled until the email is valid.
 *   • Rapid double-submits are blocked client-side AND rate-limited server-side.
 *   • Honeypot field (display:none input named "website") deters bots.
 *   • `source` (current pathname) is sent so editors can see where signups
 *     originated from in Studio.
 *
 * Visual design — UI is preserved exactly as the original P18 spec:
 *   eyebrow / display heading / lead / inline form / fine print.
 */
export default function SubscribeBand({
  heading = "Subscribe to the journal",
  body = "Quarterly long-form essays, delivered to your inbox. No marketing, no noise.",
}: {
  heading?: string;
  body?: string;
}) {
  const pathname = usePathname() ?? "unknown";
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  // Hidden honeypot field. Bots autofill every input; humans never see this.
  const [honeypot, setHoneypot] = useState("");
  // Guards a rapid double-submit at the click handler level (in addition to
  // the disabled-button + server rate-limit).
  const submittingRef = useRef(false);

  const validation = useMemo(() => validateEmail(email), [email]);
  const showInlineError = touched && email.length > 0 && !validation.ok;
  const inlineErrorMessage =
    showInlineError && !validation.ok ? validation.message : null;

  const isSubmittable = validation.ok && status !== "loading";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return; // belt-and-braces against rapid clicks
    if (!validation.ok) {
      setTouched(true);
      return;
    }

    submittingRef.current = true;
    setStatus("loading");
    setServerMessage(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: pathname,
          website: honeypot, // honeypot — must be ""
        }),
      });
      const json = (await res.json()) as {
        ok: boolean;
        message?: string;
        alreadySubscribed?: boolean;
      };
      if (!res.ok || !json.ok) {
        throw new Error(
          json.message ?? "Subscription failed. Please try again."
        );
      }
      setAlreadySubscribed(!!json.alreadySubscribed);
      setStatus("success");
      setEmail("");
      setTouched(false);
    } catch (err) {
      setStatus("error");
      setServerMessage((err as Error).message);
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <section
      data-header-theme="dark"
      className="bg-[var(--color-bg-inverse)] text-white"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="container-editorial">
        <div className="max-w-[640px] mx-auto text-center">
          <motion.p
            className="eyebrow mb-6"
            style={{ color: "var(--color-accent-soft)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            The Journal
          </motion.p>

          <RevealText
            text={heading}
            as="h2"
            className="text-white mb-6 font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(1.875rem, 3.4vw, 3rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              fontWeight: 500,
            }}
            staggerMs={50}
            durationMs={650}
          />

          <motion.p
            className="text-white/75 mb-10 max-w-md mx-auto"
            style={{ fontSize: "1.0625rem", lineHeight: 1.6, fontWeight: 300 }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_STANDARD }}
          >
            {body}
          </motion.p>

          {status === "success" ? (
            <motion.div
              role="status"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_STANDARD }}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-[2px] bg-[rgba(59,111,255,0.12)] border border-[var(--color-accent-soft)]"
            >
              <Check
                size={18}
                strokeWidth={1.5}
                className="text-[var(--color-accent-soft)]"
              />
              <span className="text-white">
                {alreadySubscribed
                  ? "You're already subscribed. Thank you."
                  : "Thank you. Your subscription has been recorded."}
              </span>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={onSubmit}
              noValidate
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE_STANDARD }}
            >
              <label className="sr-only" htmlFor="journal-email">
                Email address
              </label>
              <input
                id="journal-email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="you@email.com"
                className={`flex-1 h-12 px-4 bg-transparent border focus:border-[var(--color-accent-soft)] text-white placeholder:text-white/40 outline-none rounded-[2px] transition-colors duration-[240ms] ${
                  showInlineError
                    ? "border-[#ff7a90]"
                    : "border-white/30"
                }`}
                aria-invalid={showInlineError}
                aria-describedby={
                  inlineErrorMessage ? "journal-email-error" : undefined
                }
              />
              {/* Honeypot — visually hidden, off-screen, invisible to humans. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  opacity: 0,
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              />
              <button
                type="submit"
                disabled={!isSubmittable}
                className="group/cta inline-flex items-center justify-center gap-2 h-12 px-7 rounded-[2px] bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-deep)] transition-colors duration-[240ms] text-[0.95rem] tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2
                      size={16}
                      strokeWidth={1.8}
                      className="animate-spin"
                    />
                    Subscribing…
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight
                      size={16}
                      strokeWidth={1.5}
                      className="transition-transform duration-[240ms] group-hover/cta:translate-x-1"
                    />
                  </>
                )}
              </button>
            </motion.form>
          )}

          {/* Real-time validation error — shown only after the field is touched. */}
          {inlineErrorMessage && status !== "loading" && (
            <motion.p
              id="journal-email-error"
              role="alert"
              className="mt-3 inline-flex items-center gap-2 text-[0.875rem] text-[#ff7a90]"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AlertCircle size={14} strokeWidth={1.5} />
              {inlineErrorMessage}
            </motion.p>
          )}

          {/* Server / network error — separate slot so it doesn't conflict
              with the live validation hint above. */}
          {status === "error" && serverMessage && (
            <motion.p
              role="alert"
              className="mt-4 inline-flex items-center gap-2 text-[0.875rem] text-[#ff7a90]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={14} strokeWidth={1.5} />
              {serverMessage}
            </motion.p>
          )}

          <p className="text-[0.75rem] text-white/50 mt-6">
            One email per quarter. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
