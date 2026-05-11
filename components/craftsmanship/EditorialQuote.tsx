"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P05-S05 Editorial Quote.
 * 120vh band on Off-White; centered Playfair quote (clamp 2.5–4rem).
 * Optional oversized opening quote glyph behind in Electric Blue at 8% opacity.
 *
 * Motion · Parallax · Tracking
 *   Mouse Parallax: QuoteGlyphDrift on the optional background (±8px).
 *   Mouse Tracking: Disabled.
 *
 * Motion timeline
 *   → Word-by-word reveal at 80ms stagger (slow, weighty)
 */
export default function EditorialQuote() {
  const ref = useRef<HTMLElement>(null);
  const glyphRef = useRef<HTMLSpanElement>(null);

  // QuoteGlyphDrift ±8px on the glyph
  useMouseParallax(
    ref,
    [{ ref: glyphRef as unknown as React.RefObject<HTMLElement>, amplitude: 8 }],
    { duration: 0.8, ease: "power2.out" }
  );

  return (
    <section
      ref={ref}
      className="relative bg-[var(--color-bg-elevated)] overflow-hidden flex items-center justify-center"
      style={{ paddingTop: "180px", paddingBottom: "180px" }}
    >
      {/* Oversized opening quote glyph — Electric Blue 8% opacity */}
      <motion.span
        ref={glyphRef}
        aria-hidden
        className="absolute select-none pointer-events-none font-[family-name:var(--font-display)] text-[var(--color-accent-primary)]"
        style={{
          fontSize: "clamp(10rem, 22vw, 22rem)",
          lineHeight: 1,
          top: "12%",
          left: "8%",
        }}
        initial={{ scale: 0.96, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.08 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: EASE_STANDARD }}
      >
        &ldquo;
      </motion.span>

      <div className="relative container-editorial flex flex-col items-center text-center max-w-[820px]">
        <blockquote>
          <RevealText
            text="Craft is not a style. It is a discipline of attention."
            as="p"
            className="text-[var(--color-text-primary)] font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(2.5rem, 4vw, 4rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              fontWeight: 500,
            }}
            staggerMs={80}
            durationMs={800}
          />
        </blockquote>
      </div>
    </section>
  );
}
