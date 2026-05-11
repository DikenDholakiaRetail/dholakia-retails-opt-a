"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import RevealText from "@/components/motion/RevealText";
import EditorialImage from "@/components/motion/EditorialImage";
import { EASE_STANDARD } from "@/lib/motion";
import { ABOUT_HERO } from "@/lib/media";

/**
 * P02-S01 About Hero.
 * 100vh full-bleed, B&W cool-cast portrait, lower-left content stack.
 * Hero3LayerParallax with 'portrait mode' tuning — translate ±10px (faces solid, not floaty).
 *   Background details drift slightly more than face.
 * Mouse Tracking: Disabled.
 * Subtle Ken-Burns 1.0→1.04 over 30s, infinite reverse.
 * Eyebrow fades 200ms before H1 word-by-word; sub-statement fade-up 12px Y after.
 */
export default function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const layerBg = useRef<HTMLDivElement>(null);
  const layerSubject = useRef<HTMLDivElement>(null);
  const layerType = useRef<HTMLDivElement>(null);

  // Background drifts more than subject; faces feel solid (smaller amplitude on subject)
  useMouseParallax(
    ref,
    [
      { ref: layerBg, amplitude: 10 },
      { ref: layerSubject, amplitude: 5 },
      { ref: layerType, amplitude: 6, counter: true },
    ],
    { duration: 0.6, ease: "power2.out" }
  );

  return (
    <section ref={ref} data-header-theme="dark" className="relative h-screen min-h-[640px] w-full overflow-hidden text-white">
      {/* Layer 1 — environmental B&W portrait with Ken-Burns 30s */}
      <motion.div
        ref={layerBg}
        aria-hidden
        className="absolute inset-[-2%]"
        style={{
          background:
            "radial-gradient(70% 80% at 35% 45%, #2a3a5c 0%, #14213d 50%, #060B17 100%)",
          animation: "kenBurns 30s ease-in-out infinite alternate",
        }}
      >
        <EditorialImage src={ABOUT_HERO} fill priority sizes="100vw" darkOverlay="cinematic" />
      </motion.div>

      {/* Layer 2 — subject (silhouette placeholder; smaller drift) */}
      {/* <div ref={layerSubject} aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 flex items-end justify-end pr-[6%] pb-[6%]">
          <svg width="46%" height="78%" viewBox="0 0 400 600" fill="none" aria-hidden className="opacity-40">
            <ellipse cx="200" cy="160" rx="78" ry="92" stroke="#cdd9f0" strokeWidth="1" />
            <path
              d="M70 600c0-130 60-220 130-240 70 20 130 110 130 240"
              stroke="#cdd9f0"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div> */}

      {/* Film grain overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* Top-left gradient for legibility */}
      <div
        className="absolute inset-x-0 top-0 h-2/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,11,23,0.85) 0%, rgba(6,11,23,0.35) 50%, rgba(6,11,23,0) 100%)",
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

      {/* Layer 3 — typography */}
      <div ref={layerType} className="relative z-10 h-full container-editorial flex items-end pb-24 md:pb-32 pt-32">
        <div className="max-w-3xl">
          <motion.p
            className="eyebrow text-white/70 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE_STANDARD }}
          >
            The Group
          </motion.p>
          <RevealText
            text="A New Corporate Chapter"
            as="h1"
            className="text-white mb-7"
            style={{
              fontSize: "clamp(2.5rem, 5.2vw, 5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
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
            Established in 2024, Dholakia Retail was created to build, guide,
            and grow luxury jewellery brands with governance, precision, and
            long-term vision.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
