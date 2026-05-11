"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import Hairline from "@/components/motion/Hairline";
import EditorialImage from "@/components/motion/EditorialImage";
import { EASE_STANDARD } from "@/lib/motion";
import { GLOBAL_PARTNERSHIPS } from "@/lib/media";

/**
 * P08-S03 Partnerships — Designed for future collaboration.
 * Layer 0 — architectural backdrop + cinematic dark overlay.
 * Layer 1 — Midnight Navy mask 55%.
 * Layer 10 — heading + body in white between hairlines.
 */
export default function Partnerships() {
  return (
    <section
      data-header-theme="dark"
      className="relative bg-[var(--color-bg-inverse)] flex items-center overflow-hidden text-white"
      style={{ minHeight: "100vh", paddingTop: "200px", paddingBottom: "200px" }}
    >
      {/* Layer 0 — architectural backdrop + cinematic overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <EditorialImage
          src={GLOBAL_PARTNERSHIPS}
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

      <div className="relative z-10 container-editorial w-full">
        <div className="max-w-[640px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            <Hairline
              width={80}
              className="mb-8 mx-auto"
              color="rgba(255,255,255,0.55)"
            />
          </motion.div>

          <motion.p
            className="eyebrow mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
            style={{ color: "var(--color-accent-soft)" }}
          >
            Partnerships
          </motion.p>

          <RevealText
            text="Designed for future collaboration."
            as="h2"
            className="text-white mb-8 font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 3.25rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              fontWeight: 500,
            }}
            staggerMs={60}
            durationMs={800}
          />

          <motion.p
            className="body-lead text-white/80"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE_STANDARD }}
          >
            The platform is built to support partnerships across retail
            development, strategic growth, and brand expansion conversations.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
