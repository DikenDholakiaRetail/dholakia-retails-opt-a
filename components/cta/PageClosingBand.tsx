"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { EASE_STANDARD } from "@/lib/motion";

type Variant = "navy" | "off-white";

type Props = {
  heading: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
  variant?: Variant;
  /** Magnetic strength */
  strength?: "gentle" | "standard" | "strong";
};

/**
 * P01-S09 / P03-S05 / P04-S05 / P07-S05 / P08-S04 — reusable PageClosingBand.
 * Mouse Parallax: AmbientTextureDrift (texture only, foreground static).
 * Mouse Tracking: MagneticCTA at full strength (140px proximity, 0.5).
 * Motion: heading word-by-word reveal on scroll-trigger; CTA fade-up + magnetic activation.
 */
export default function PageClosingBand({
  heading,
  body,
  ctaLabel,
  ctaHref,
  variant = "navy",
  strength = "strong",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const textureRef = useRef<HTMLDivElement>(null);

  useMouseParallax(ref, [{ ref: textureRef, amplitude: 6 }], {
    duration: 0.8,
    ease: "power2.out",
  });

  const isNavy = variant === "navy";

  return (
    <section
      ref={ref}
      data-header-theme={isNavy ? "dark" : "light"}
      className={[
        "relative overflow-hidden",
        isNavy ? "bg-[var(--color-bg-inverse)] text-white" : "bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)]",
        "py-32 md:py-44",
      ].join(" ")}
    >
      {/* AmbientTextureDrift layer — facet outline at edges */}
      <motion.div
        ref={textureRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: isNavy ? 0.08 : 0.05,
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 28px), repeating-linear-gradient(-45deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 28px)",
        }}
      />

      <div className="relative container-editorial flex flex-col items-center text-center max-w-3xl">
        <RevealText
          text={heading}
          as="h2"
          className={isNavy ? "text-white mb-7" : "text-[var(--color-text-primary)] mb-7"}
          style={{
            fontSize: "clamp(1.875rem, 3.6vw, 3rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
          }}
          staggerMs={60}
          durationMs={700}
        />

        {body && (
          <motion.p
            className={[
              "body-lead mb-12 max-w-xl",
              isNavy ? "text-white/75" : "text-[var(--color-text-body)]",
            ].join(" ")}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE_STANDARD }}
          >
            {body}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.8, ease: EASE_STANDARD }}
        >
          <MagneticButton
            href={ctaHref}
            strength={strength}
            className={[
              "group/cta inline-flex items-center gap-3 h-14 px-8 text-[1rem] tracking-wide transition-colors duration-[320ms]",
              "rounded-[2px]",
              isNavy
                ? "bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-deep)]"
                : "border border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)] hover:text-white",
            ].join(" ")}
          >
            {ctaLabel}
            <ArrowRight
              size={18}
              strokeWidth={1.5}
              className="transition-transform duration-[240ms] group-hover/cta:translate-x-1"
            />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
