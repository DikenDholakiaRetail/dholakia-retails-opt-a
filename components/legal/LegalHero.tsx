"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import Hairline from "@/components/motion/Hairline";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P14-S01 / P15-S01 / P16-S01 / P17-S01 — Shared Legal Hero.
 * 60vh band on Off-White (40vh for the combined Disclaimer variant).
 * Centered narrow column, 720px max-width.
 * Eyebrow LEGAL → Syne H1 → Last updated → lead paragraph → 240px Electric Blue hairline.
 *
 * Animations (subtle):
 *  → Eyebrow fade-in 200ms
 *  → H1 word-by-word reveal (60ms stagger)
 *  → Last-updated fades 400ms after H1
 *  → Lead paragraph fade-up 12px Y, 600ms after H1
 *  → Hairline rule SVG draws L→R 800ms
 *
 * Mouse Parallax / Tracking: Disabled (legal documents are read, not experienced).
 */

type Props = {
  title: string;
  lastUpdated: string; // pre-formatted, e.g. "14 March 2026"
  lead: string;
  compact?: boolean; // 40vh (Disclaimer combined variant)
};

export default function LegalHero({ title, lastUpdated, lead, compact = false }: Props) {
  return (
    <section
      data-header-theme="light"
      className="bg-[var(--color-bg-elevated)] relative overflow-hidden"
      style={{
        minHeight: compact ? "40vh" : "60vh",
        paddingTop: "160px",
        paddingBottom: "60px",
      }}
    >
      <div className="container-editorial">
        <div className="max-w-[720px] mx-auto text-center">
          <motion.p
            className="eyebrow mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE_STANDARD }}
          >
            Legal
          </motion.p>

          <RevealText
            text={title}
            as="h1"
            className="text-[var(--color-text-primary)] mb-6 font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              fontWeight: 500,
            }}
            staggerMs={60}
            durationMs={700}
            delay={200}
            triggerOnView={false}
          />

          <motion.p
            className="text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] tabular-nums mb-8 text-[0.875rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6, ease: EASE_STANDARD }}
          >
            Last updated: {lastUpdated}
          </motion.p>

          <motion.p
            className="body-lead text-[var(--color-text-body)] mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: EASE_STANDARD }}
          >
            {lead}
          </motion.p>

          <Hairline
            width={240}
            className="mx-auto"
            color="var(--color-accent-primary)"
            durationMs={800}
            delay={400}
          />
        </div>
      </div>
    </section>
  );
}
