"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Settings } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import Hairline from "@/components/motion/Hairline";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P14-S03 / P15-S03 / P16-S03 / P17-S02 — Shared Legal Closer.
 * 60vh band on Off-White. Centered 540px column.
 * 160px Electric Blue hairline above heading.
 * Heading word-by-word; CTAs stagger.
 * ButtonHoverFill on primary CTA.
 */

type Variant = "email" | "cookies";

type Props = {
  heading: string;
  body: string;
  primaryLabel: string;
  /** mailto:/https URL — rendered as <a>. Mutually exclusive with `primaryAction`. */
  primaryHref?: string;
  /** Predefined client-only action — keeps Server Component boundaries clean. */
  primaryAction?: "open-cookie-settings";
  variant?: Variant;
};

export default function LegalCloser({
  heading,
  body,
  primaryLabel,
  primaryHref,
  primaryAction,
  variant = "email",
}: Props) {
  const Icon = variant === "cookies" ? Settings : Mail;
  const handlePrimaryAction = () => {
    if (primaryAction === "open-cookie-settings" && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-settings"));
    }
  };

  return (
    <section
      className="bg-[var(--color-bg-elevated)] flex items-center"
      style={{ minHeight: "60vh", paddingTop: "100px", paddingBottom: "100px" }}
    >
      <div className="container-editorial w-full">
        <div className="max-w-[540px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            <Hairline
              width={160}
              className="mx-auto mb-8"
              color="var(--color-accent-primary)"
              durationMs={600}
            />
          </motion.div>

          <RevealText
            text={heading}
            as="h2"
            className="text-[var(--color-text-primary)] mb-5 font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              fontWeight: 500,
            }}
            staggerMs={50}
            durationMs={650}
          />

          <motion.p
            className="text-[var(--color-text-body)] leading-relaxed mb-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE_STANDARD }}
          >
            {body}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
              }}
            >
              {primaryHref ? (
                <a
                  href={primaryHref}
                  className="group/cta inline-flex items-center gap-2 h-12 px-7 rounded-[2px] bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-deep)] transition-colors duration-[240ms] text-[0.95rem] tracking-wide"
                >
                  <Icon size={16} strokeWidth={1.5} />
                  {primaryLabel}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={handlePrimaryAction}
                  className="group/cta inline-flex items-center gap-2 h-12 px-7 rounded-[2px] bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-deep)] transition-colors duration-[240ms] text-[0.95rem] tracking-wide"
                >
                  <Icon size={16} strokeWidth={1.5} />
                  {primaryLabel}
                </button>
              )}
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
              }}
            >
              <Link
                href="/"
                className="group/cta inline-flex items-center gap-2 h-12 px-7 rounded-[2px] border border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)] hover:text-white transition-colors duration-[240ms] text-[0.95rem] tracking-wide"
              >
                <ArrowLeft size={16} strokeWidth={1.5} />
                Back to home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
