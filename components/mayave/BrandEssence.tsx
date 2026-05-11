"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P04-S02 Brand Essence.
 * 120vh band on Off-White. Centered narrow column 640px max-width.
 * Vertical hairline rule on left of column draws top-to-bottom over 1s.
 * AmbientTextureDrift on optional background texture (±4px). Mouse Tracking disabled.
 * Heading word-by-word reveal at 80ms stagger. Body fade-up 12px Y.
 */
export default function BrandEssence() {
  const sectionRef = useRef<HTMLElement>(null);
  const textureRef = useRef<HTMLDivElement>(null);

  useMouseParallax(sectionRef, [{ ref: textureRef, amplitude: 4 }], {
    duration: 0.8,
    ease: "power2.out",
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-bg-elevated)] overflow-hidden flex items-center"
      style={{ minHeight: "120vh", paddingTop: "200px", paddingBottom: "200px" }}
    >
      {/* Optional ambient texture — paper grain at 6% opacity */}
      <motion.div
        ref={textureRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE_STANDARD }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #0B1426 1px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      <div className="relative container-editorial">
        <div className="relative max-w-[640px] mx-auto pl-8">
          {/* Vertical hairline on left, draws top-to-bottom 1s */}
          <motion.span
            aria-hidden
            className="absolute left-0 top-0 w-px origin-top"
            style={{ background: "var(--color-text-muted)" }}
            initial={{ scaleY: 0, height: "100%" }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: EASE_STANDARD }}
          />

          <motion.p
            className="eyebrow mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            Brand Essence
          </motion.p>

          <RevealText
            text="A language of restraint, intimacy, and rare detail."
            as="h2"
            className="text-[var(--color-text-primary)] mb-10 font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(1.75rem, 3.6vw, 3rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              fontWeight: 500,
            }}
            staggerMs={80}
            durationMs={800}
          />

          <motion.p
            className="body-lead text-[var(--color-text-body)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.8, ease: EASE_STANDARD }}
          >
            Mayavé should feel like a private room rather than a public display
            — considered, quiet, and emotionally resonant.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
