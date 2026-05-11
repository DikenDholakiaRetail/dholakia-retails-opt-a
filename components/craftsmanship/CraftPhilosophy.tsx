"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import RevealText from "@/components/motion/RevealText";
import EditorialImage from "@/components/motion/EditorialImage";
import { EASE_STANDARD } from "@/lib/motion";
import { CRAFT_PHILOSOPHY_MACRO } from "@/lib/media";

/**
 * P05-S02 Craft Philosophy.
 * 100vh editorial band on Off-White; centered narrow column 640px max-width.
 * Heading → body → optional macro insert (single image).
 *
 * Motion · Parallax · Tracking
 *   Mouse Parallax: EditorialImageDrift on macro insert (±10px, scale 1.04 base).
 *   Mouse Tracking: Disabled.
 *
 * Motion timeline
 *   → Word-by-word heading reveal
 *   → Body fade-up
 *   → Macro insert fades in 800ms after body
 */
export default function CraftPhilosophy() {
  const ref = useRef<HTMLElement>(null);
  const macroRef = useRef<HTMLDivElement>(null);

  // EditorialImageDrift on macro: ±10px, scale 1.04 base
  useMouseParallax(ref, [{ ref: macroRef, amplitude: 10 }], {
    duration: 0.5,
    ease: "power2.out",
  });

  return (
    <section
      ref={ref}
      className="relative bg-[var(--color-bg-elevated)] flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="container-editorial flex flex-col items-center text-center" style={{ maxWidth: "640px" }}>
        <motion.p
          className="mb-6"
          style={{
            color: "var(--color-accent-primary)",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE_STANDARD }}
        >
          Craft Philosophy
        </motion.p>

        <RevealText
          text="Every detail must earn its place."
          as="h2"
          className="text-[var(--color-text-primary)] mb-8 font-[family-name:var(--font-display)]"
          style={{
            fontSize: "clamp(1.875rem, 3.4vw, 3rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
            fontWeight: 500,
          }}
          staggerMs={60}
          durationMs={700}
        />

        <motion.p
          className="body-lead text-[var(--color-text-body)]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE_STANDARD }}
        >
          Proportion, polish, setting, and finish are never accidental. They are
          the result of disciplined craft decisions made with patience and care.
        </motion.p>

        {/* Optional macro insert (3:2) — fades in 800ms after body */}
        <motion.div
          className="mt-16 w-full overflow-hidden rounded-sm"
          style={{ aspectRatio: "3 / 2", maxWidth: "560px" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 1.4, ease: EASE_STANDARD }}
        >
          <motion.div
            ref={macroRef}
            className="relative w-full h-full"
            style={{
              transform: "scale(1.04)",
              background:
                "radial-gradient(60% 60% at 55% 50%, #1f2c4d 0%, #0B1426 60%, #050A14 100%)",
            }}
            aria-label={CRAFT_PHILOSOPHY_MACRO.alt}
          >
            <EditorialImage
              src={CRAFT_PHILOSOPHY_MACRO}
              fill
              sizes="(min-width: 768px) 560px, 90vw"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
