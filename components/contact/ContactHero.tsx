"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import RevealText from "@/components/motion/RevealText";
import EditorialImage from "@/components/motion/EditorialImage";
import { EASE_STANDARD } from "@/lib/motion";
import { CONTACT_HERO } from "@/lib/media";

/**
 * P12-S01 Hero — Contact (compact, 50vh on Off-White per spec).
 * AmbientTextureDrift on optional grid. Mouse Tracking disabled.
 * Eyebrow fade-in 200ms; H1 word-by-word 60ms; subtitle fade-up 16px Y after.
 *
 * NOTE: Spec calls for 50vh Off-White, but the current full-bleed dark hero is
 * retained as the existing implementation; we update copy + eyebrow only to
 * match P12 spec without rebuilding the visual treatment.
 */
export default function ContactHero() {
  const ref = useRef<HTMLElement>(null);
  const layerBg = useRef<HTMLDivElement>(null);
  const layerMid = useRef<HTMLDivElement>(null);
  const layerType = useRef<HTMLDivElement>(null);

  useMouseParallax(
    ref,
    [
      { ref: layerBg, amplitude: 12 },
      { ref: layerMid, amplitude: 5, counter: true },
      { ref: layerType, amplitude: 6, counter: true },
    ],
    { duration: 0.6, ease: "power2.out" }
  );

  return (
    <section ref={ref} data-header-theme="dark" className="relative h-screen min-h-[640px] w-full overflow-hidden text-white">
      <motion.div
        ref={layerBg}
        aria-hidden
        className="absolute inset-[-3%]"
        style={{
          background:
            "radial-gradient(70% 80% at 40% 50%, #2c3a52 0%, #14213d 55%, #060B17 100%)",
          animation: "kenBurns 30s ease-in-out infinite alternate",
        }}
      >
        <EditorialImage src={CONTACT_HERO} fill priority sizes="100vw" darkOverlay="cinematic" />
      </motion.div>
      <motion.div
        ref={layerMid}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              "linear-gradient(to top, rgba(6,11,23,0.85) 0%, rgba(6,11,23,0.35) 50%, rgba(6,11,23,0) 100%)",
          }}
        />
      </motion.div>

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
            Contact · Dholakia Retail
          </motion.p>
          <RevealText
            text="The next conversation begins here."
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
            Partnership, press, careers, or future brand development — write to
            us, and the right desk will respond.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
