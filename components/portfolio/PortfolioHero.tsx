"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import EditorialImage from "@/components/motion/EditorialImage";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { EASE_STANDARD } from "@/lib/motion";
import { PORTFOLIO_HERO_PATTERN } from "@/lib/media";

/**
 * P03-S01 Hero — typographic hero with editorial photo backdrop.
 * Layer order: image (z-0) → cinematic dark overlay (z-1) → content (z-10).
 * Optional 12-column hairline grid SVG at 4% opacity with AmbientTextureDrift (±4px).
 */
export default function PortfolioHero() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useMouseParallax(containerRef, [{ ref: gridRef, amplitude: 4 }], { duration: 0.8 });

  return (
    <section
      ref={containerRef}
      data-header-theme="dark"
      className="relative bg-[var(--color-bg-inverse)] pt-40 pb-24 md:pt-48 md:pb-32 min-h-screen flex items-center overflow-hidden text-white"
    >
      {/* Layer 0 — editorial photograph + built-in cinematic overlay
          (top 60% · mid 30% · bottom 70% Midnight Navy) */}
      <div className="absolute inset-0 pointer-events-none">
        <EditorialImage
          src={PORTFOLIO_HERO_PATTERN}
          fill
          priority
          sizes="100vw"
          darkOverlay="cinematic"
        />
      </div>

      {/* Layer 1 — additional 50% Midnight Navy mask for stronger text legibility */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(11,20,38,0.50)" }}
      />

      {/* Optional 12-column hairline grid */}
      <motion.div
        ref={gridRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE_STANDARD }}
      >
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1200 100" aria-hidden>
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={i}
              x1={(i * 1200) / 12}
              y1={0}
              x2={(i * 1200) / 12}
              y2={100}
              stroke="#FFFFFF"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </motion.div>

      {/* Layer 2 — content */}
      <div className="relative z-10 container-editorial flex flex-col items-center text-center max-w-[820px]">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: EASE_STANDARD }}
          style={{ color: "var(--color-accent-soft)" }}
        >
          The Portfolio
        </motion.p>

        <RevealText
          text="A House of Distinct Brand Expressions"
          as="h1"
          className="text-white mb-8 font-[family-name:var(--font-display)]"
          style={{
            fontSize: "clamp(3rem, 5.6vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            fontWeight: 500,
          }}
          staggerMs={60}
          durationMs={800}
        />

        <motion.p
          className="body-lead text-white/85 max-w-[720px]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.55, ease: EASE_STANDARD }}
        >
          Each brand is designed to serve a specific audience and emotional
          territory while benefiting from a shared standard of quality and
          trust.
        </motion.p>
      </div>
    </section>
  );
}
