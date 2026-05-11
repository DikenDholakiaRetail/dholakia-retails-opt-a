"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import Hairline from "@/components/motion/Hairline";
import EditorialImage from "@/components/motion/EditorialImage";
import { EASE_STANDARD } from "@/lib/motion";
import { SUSTAINABILITY_MANIFESTO } from "@/lib/media";

/**
 * P06-S04 Manifesto.
 * Layer 0 — editorial backdrop + cinematic dark overlay.
 * Layer 1 — Midnight Navy mask 55%.
 * Layer 10 — heading + body in white between hairlines.
 */
export default function Manifesto() {
  return (
    <section
      data-header-theme="dark"
      className="relative bg-[var(--color-bg-inverse)] flex flex-col items-center justify-center overflow-hidden text-white"
      style={{ minHeight: "100vh", paddingTop: "200px", paddingBottom: "200px" }}
    >
      {/* Layer 0 — editorial backdrop + cinematic overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <EditorialImage
          src={SUSTAINABILITY_MANIFESTO}
          fill
          sizes="100vw"
          darkOverlay="cinematic"
        />
      </div>

      {/* Layer 1 — additional Midnight Navy mask 55% */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(11,20,38,0.55)" }}
      />

      <div className="relative z-10 container-editorial flex flex-col items-center text-center">
        <div className="w-full max-w-[640px]">
          <Hairline
            width="100%"
            color="rgba(255,255,255,0.30)"
            durationMs={800}
          />
        </div>

        <div className="max-w-[640px] py-16 md:py-20">
          <motion.p
            className="eyebrow mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
            style={{ color: "var(--color-accent-soft)" }}
          >
            Manifesto
          </motion.p>

          <RevealText
            text="Responsibility should feel precise, not performative."
            as="h2"
            className="text-white mb-10 font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 3.25rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
            staggerMs={80}
            durationMs={800}
          />

          <motion.p
            className="body-lead text-white/80"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.8, ease: EASE_STANDARD }}
          >
            We measure what matters and report it plainly. Certifications,
            audited supply chains, and verifiable processes are how we work — not
            how we market. The goal is a record that holds up to inspection,
            year after year.
          </motion.p>
        </div>

        <div className="w-full max-w-[640px]">
          <Hairline
            width="100%"
            color="rgba(255,255,255,0.30)"
            durationMs={800}
            delay={200}
          />
        </div>
      </div>
    </section>
  );
}
