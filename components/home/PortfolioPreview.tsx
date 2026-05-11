"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import RevealText from "@/components/motion/RevealText";
import EditorialImage from "@/components/motion/EditorialImage";
import { MagneticButton } from "@/components/motion/MagneticButton";
import CursorPerspective from "@/components/motion/CursorPerspective";
import { EASE_STANDARD } from "@/lib/motion";
import { HOME_PORTFOLIO_PREVIEW } from "@/lib/media";

/**
 * P01-S05 Portfolio Preview.
 * 90vh full-bleed split 60/40.
 * Left 60%: cinematic Mayavé piece. Hero3LayerParallax (image side only).
 *   Velvet shadow drifts opposite to piece (counter cursor).
 * Right 40%: Off-White content stack — static (preserves reading hierarchy).
 * MagneticCTA on 'Discover Mayavé'. CursorPerspective ±2° on image.
 * Image entry scale 1.04→1.0 over 1.2s. Wordmark 400ms after. H2 word-by-word. Body fade-up.
 */
export default function PortfolioPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const layerImage = useRef<HTMLDivElement>(null);
  const layerShadow = useRef<HTMLDivElement>(null);

  useMouseParallax(
    containerRef,
    [
      { ref: layerImage, amplitude: 15 },
      { ref: layerShadow, amplitude: 8, counter: true },
    ],
    { duration: 0.6, ease: "power2.out" }
  );

  return (
    <section ref={containerRef} data-header-theme="light" className="relative bg-white" style={{ minHeight: "90vh" }}>
      <div className="grid grid-cols-1 lg:grid-cols-5" style={{ minHeight: "90vh" }}>
        {/* Image side (60%) */}
        <div className="lg:col-span-3 relative aspect-[4/5] lg:aspect-auto overflow-hidden">
          <CursorPerspective maxAngle={2} className="absolute inset-0">
            <motion.div
              ref={layerImage}
              className="absolute inset-[-3%]"
              initial={{ scale: 1.04, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE_STANDARD }}
              // style={{
              //   background:
              //     "radial-gradient(60% 60% at 50% 45%, #2a3552 0%, #14193a 55%, #08081A 100%)",
              // }}
            >
              <EditorialImage
                src={HOME_PORTFOLIO_PREVIEW}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                // darkOverlay="cinematic"
              />
            </motion.div>
            {/* <motion.div
              ref={layerShadow}
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }}
            /> */}
          </CursorPerspective>
        </div>

        {/* Content side (40%) */}
        <div className="lg:col-span-2 bg-[var(--color-bg-elevated)] flex items-center">
          <div className="px-6 sm:px-10 lg:px-14 py-20 lg:py-28 max-w-xl">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE_STANDARD }}
              className="h-px bg-[var(--color-accent-primary)] mb-6"
            />
            <motion.p
              className="eyebrow mb-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: EASE_STANDARD }}
            >
              The Portfolio
            </motion.p>

            <RevealText
              text="A curated house of distinct voices."
              as="h2"
              className="text-[var(--color-text-primary)] mb-6"
              style={{
                fontSize: "clamp(1.875rem, 3.2vw, 2.75rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
              staggerMs={60}
              durationMs={700}
            />

            <motion.p
              className="text-[var(--color-text-body)] leading-relaxed mb-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE_STANDARD }}
            >
              Each brand within the portfolio is shaped for a specific audience,
              emotional world, and market position, while drawing from a shared
              foundation of trust and excellence.
            </motion.p>

            <motion.div
              className="border-t border-black/10 pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] mb-3">
                Signature Brand
              </p>
              <h3
                className="mb-4 font-[family-name:var(--font-display)]"
                style={{ fontSize: "2rem", letterSpacing: "0.01em" }}
              >
                Mayavé
              </h3>
              <p className="text-[var(--color-text-body)] leading-relaxed mb-7 max-w-md">
                Where silence becomes jewellery. A refined expression of bespoke
                luxury, Mayavé is crafted for those who seek rarity, intimacy,
                and quiet beauty.
              </p>
              <MagneticButton
                href="/portfolio/mayave"
                strength="standard"
                className="inline-flex items-center gap-2 text-[var(--color-accent-primary)] font-medium tracking-wide"
              >
                Discover Mayavé
                <ArrowRight size={16} strokeWidth={1.5} />
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
