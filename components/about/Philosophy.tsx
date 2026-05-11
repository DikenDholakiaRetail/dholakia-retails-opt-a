"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import RevealText from "@/components/motion/RevealText";
import EditorialImage from "@/components/motion/EditorialImage";
import { EASE_STANDARD } from "@/lib/motion";
import { ABOUT_PHILOSOPHY } from "@/lib/media";

/**
 * P02-S04 Philosophy.
 * Layer 0 — editorial photograph backdrop + cinematic dark overlay.
 * Layer 1 — additional Midnight Navy mask 50% for legibility.
 * Layer 2 — oversized opening quote glyph (Electric Blue 8% over the dark).
 * Layer 10 — quote + body in white.
 */
export default function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const glyphRef = useRef<HTMLSpanElement>(null);

  useMouseParallax(ref, [{ ref: glyphRef as unknown as React.RefObject<HTMLElement>, amplitude: 8 }], {
    duration: 0.8,
    ease: "power2.out",
  });

  return (
    <section
      ref={ref}
      data-header-theme="dark"
      className="relative bg-[var(--color-bg-inverse)] overflow-hidden text-white"
      style={{ paddingTop: "180px", paddingBottom: "180px" }}
    >
      {/* Layer 0 — editorial backdrop + cinematic overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <EditorialImage
          src={ABOUT_PHILOSOPHY}
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

      {/* Layer 2 — quote glyph background ornament (Soft Sky over dark) */}
      <motion.span
        ref={glyphRef}
        aria-hidden
        className="absolute select-none pointer-events-none font-[family-name:var(--font-display)]"
        style={{
          fontSize: "clamp(10rem, 22vw, 22rem)",
          lineHeight: 1,
          top: "12%",
          left: "8%",
          color: "var(--color-accent-soft)",
        }}
        initial={{ scale: 0.96, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.18 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: EASE_STANDARD }}
      >
        &ldquo;
      </motion.span>

      <div className="relative z-10 container-editorial flex flex-col items-center justify-center text-center max-w-[760px] mx-auto">
        <motion.p
          className="eyebrow mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          style={{ color: "var(--color-accent-soft)" }}
        >
          Philosophy
        </motion.p>

        <blockquote>
          <RevealText
            text="The parent company exists to give every brand more room to become itself."
            as="p"
            className="text-white mb-10 font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 3.25rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
            }}
            staggerMs={80}
            durationMs={800}
          />
        </blockquote>

        <motion.p
          className="body-lead text-white/80 max-w-[560px]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.8, ease: EASE_STANDARD }}
        >
          Its purpose is to provide clarity, direction, and discipline without
          diminishing the individuality of the brands it supports.
        </motion.p>
      </div>
    </section>
  );
}
