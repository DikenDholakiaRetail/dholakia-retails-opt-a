"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import EditorialImage from "@/components/motion/EditorialImage";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { EASE_STANDARD } from "@/lib/motion";
import { NEWS_HERO } from "@/lib/media";

/**
 * P09-S01 Newsroom Hero.
 * Layer 0 — editorial photograph + cinematic dark overlay.
 * Layer 1 — extra dark mask for legibility.
 * Layer 2 — paper-grain texture.
 * Layer 10 — content (white type).
 */
export default function NewsroomHero() {
  const ref = useRef<HTMLElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);

  useMouseParallax(ref, [{ ref: grainRef, amplitude: 4 }], {
    duration: 0.8,
    ease: "power2.out",
  });

  return (
    <section
      ref={ref}
      data-header-theme="dark"
      className="relative bg-[var(--color-bg-inverse)] overflow-hidden flex flex-col items-center justify-center text-white"
      style={{ minHeight: "70vh", paddingTop: "160px", paddingBottom: "80px" }}
    >
      {/* Layer 0 — editorial photograph + cinematic dark overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <EditorialImage
          src={NEWS_HERO}
          fill
          priority
          sizes="100vw"
          darkOverlay="cinematic"
        />
      </div>

      {/* Layer 1 — additional Midnight Navy mask 50% for stronger legibility */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(11,20,38,0.50)" }}
      />

      {/* Layer 2 — paper grain texture */}
      <motion.div
        ref={grainRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE_STANDARD }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative z-10 container-editorial flex flex-col items-center text-center max-w-[820px]">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE_STANDARD }}
          style={{ color: "var(--color-accent-soft)" }}
        >
          Newsroom
        </motion.p>

        <RevealText
          text="A Record of What We Build — and Believe"
          as="h1"
          className="text-white mb-7 font-[family-name:var(--font-display)]"
          style={{
            fontSize: "clamp(2.5rem, 5.2vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            fontWeight: 500,
          }}
          staggerMs={60}
          durationMs={700}
        />

        <motion.p
          className="body-lead text-white/85 max-w-[640px]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE_STANDARD }}
        >
          A space for company updates, brand launches, sustainability
          narratives, leadership perspectives, and press resources.
        </motion.p>
      </div>
    </section>
  );
}
