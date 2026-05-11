"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import RevealText from "@/components/motion/RevealText";
import EditorialImage from "@/components/motion/EditorialImage";
import { EASE_STANDARD } from "@/lib/motion";
import { CRAFTSMANSHIP_HERO } from "@/lib/media";

/**
 * P05-S01 Hero.
 * 100vh full-bleed; extreme close-up of artisan's hands at work.
 * Lower-left content stack: eyebrow → H1 → 30-word sub. Subtle film-grain overlay.
 *
 * Motion · Parallax · Tracking
 *   Mouse Parallax: Hero3LayerParallax with portrait tuning (±10px) — hands solid, environment shifts more.
 *   Mouse Tracking: Disabled. Faces and hands deserve stillness.
 *
 * Motion timeline
 *   → Subtle Ken-Burns scale 1.0 → 1.04 over 30s
 *   → H1 word-by-word reveal
 */
export default function CraftsmanshipHero() {
  const ref = useRef<HTMLElement>(null);
  const layerEnv = useRef<HTMLDivElement>(null);
  const layerHands = useRef<HTMLDivElement>(null);
  const layerType = useRef<HTMLDivElement>(null);

  // Portrait tuning ±10px; environment drifts slightly more than the subject.
  useMouseParallax(
    ref,
    [
      { ref: layerEnv, amplitude: 10 },
      { ref: layerHands, amplitude: 4 },
      { ref: layerType, amplitude: 5, counter: true },
    ],
    { duration: 0.6, ease: "power2.out" }
  );

  return (
    <section ref={ref} data-header-theme="dark" className="relative h-screen min-h-[640px] w-full overflow-hidden text-white">
      {/* Layer 1 — environment: artisan-hands editorial photograph with Ken-Burns 30s */}
      <motion.div
        ref={layerEnv}
        aria-hidden
        className="absolute inset-[-2%]"
        style={{
          background:
            "radial-gradient(60% 80% at 40% 60%, #2c3a52 0%, #14213d 55%, #060B17 100%)",
          animation: "kenBurns 30s ease-in-out infinite alternate",
        }}
      >
        <EditorialImage src={CRAFTSMANSHIP_HERO} fill priority sizes="100vw" darkOverlay="cinematic" />
      </motion.div>

      {/* Layer 2 — hands subtle parallax (the photo carries the subject;
          this layer just gives extra depth via a counter-drifting accent). */}
      <div ref={layerHands} aria-hidden className="absolute inset-0" />

      {/* Film grain overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Lower-left gradient for legibility */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(6,11,23,0.85) 0%, rgba(6,11,23,0.35) 50%, rgba(6,11,23,0) 100%)",
        }}
      />

      {/* Lower-left content stack — eyebrow + H1 + 30-word sub */}
      <div ref={layerType} className="relative z-10 h-full container-editorial flex items-end pb-24 md:pb-32 pt-32">
        <div className="max-w-3xl">
          <motion.p
            className="mb-6"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE_STANDARD }}
          >
            Craftsmanship
          </motion.p>

          <RevealText
            text="The Hand Behind the Brilliance"
            as="h1"
            className="text-white mb-7 font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(2.5rem, 5.2vw, 5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
            staggerMs={60}
            durationMs={800}
            delay={400}
            triggerOnView={false}
          />

          <motion.p
            className="body-lead text-white/80 max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4, ease: EASE_STANDARD }}
          >
            Luxury jewellery is defined by detail, balance, finish, and the
            intelligence of skilled hands.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
