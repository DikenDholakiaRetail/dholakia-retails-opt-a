"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Gem, ArrowRight } from "lucide-react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import RevealText from "@/components/motion/RevealText";
import EditorialImage from "@/components/motion/EditorialImage";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { EASE_STANDARD } from "@/lib/motion";
import { MAYAVE_SPOTLIGHT } from "@/lib/media";

const PROOFS = [
  { Icon: Award, title: "Heritage", body: "Drawing on a deep diamond ecosystem heritage." },
  { Icon: ShieldCheck, title: "Ethics", body: "Verifiable sourcing and responsible creation." },
  { Icon: Gem, title: "Bespoke", body: "Designed for intimacy, rarity, and refined detail." },
];

/**
 * P03-S03 Featured Brand — Mayavé.
 * 100vh editorial. Top half (60vh) cinematic with Hero3LayerParallax.
 * Bottom half (40vh) Off-White content stack.
 */
export default function MayaveSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);
  const layer3 = useRef<HTMLDivElement>(null);

  useMouseParallax(
    containerRef,
    [
      { ref: layer1, amplitude: 15 },
      { ref: layer2, amplitude: 5, counter: true },
      { ref: layer3, amplitude: 8, counter: true },
    ],
    { duration: 0.6 }
  );

  return (
    <section className="bg-white">
      <div ref={containerRef} className="relative w-full h-[60vh] min-h-[420px] overflow-hidden text-white">
        <motion.div
          ref={layer1}
          aria-hidden
          className="absolute inset-[-3%]"
          initial={{ scale: 1.04, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: EASE_STANDARD }}
          // style={{ background: "radial-gradient(70% 70% at 55% 45%, #2a3552 0%, #14193a 55%, #08081A 100%)" }}
        >
          <EditorialImage src={MAYAVE_SPOTLIGHT} fill sizes="100vw" darkOverlay="cinematic" />
        </motion.div>
        <motion.div
          ref={layer2}
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          // style={{ background: "radial-gradient(80% 60% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)" }}
        />
        {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg width="320" height="380" viewBox="0 0 240 300" fill="none" aria-hidden className="opacity-90">
            <defs>
              <linearGradient id="ms-facet" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#cdd9f0" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#3B6FFF" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#0B1426" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path d="M120 30L210 110L165 270H75L30 110L120 30Z" stroke="url(#ms-facet)" strokeWidth="1.2" fill="none" />
            <path d="M120 30L120 270M30 110L210 110M75 270L120 110L165 270M120 110L210 110M120 110L30 110" stroke="url(#ms-facet)" strokeWidth="0.8" opacity="0.7" />
          </svg>
        </div> */}
        <motion.div
          ref={layer3}
          className="absolute inset-0 flex items-center justify-center pb-10 md:pb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, delay: 0.6, ease: EASE_STANDARD }}
        >
          <span
            className="font-[family-name:var(--font-display)] text-white"
            style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)", letterSpacing: "0.04em", lineHeight: 1 }}
          >
            Mayavé
          </span>
        </motion.div>
      </div>

      <div className="bg-[var(--color-bg-elevated)] py-20 md:py-28">
        <div className="container-editorial flex flex-col items-center text-center max-w-[820px]">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            Signature House
          </motion.p>

          <RevealText
            text="Where Silence Becomes Jewellery"
            as="h2"
            className="text-[var(--color-text-primary)] mb-7 font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(1.875rem, 3.6vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              fontWeight: 500,
            }}
            staggerMs={60}
            durationMs={700}
          />

          <motion.p
            className="text-[var(--color-text-body)] body-lead max-w-xl mb-12"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_STANDARD }}
          >
            Mayavé represents a more intimate expression of luxury, built around
            refinement, emotion, and the beauty of restraint.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
            }}
          >
            {PROOFS.map(({ Icon, title, body }) => (
              <motion.div
                key={title}
                className="text-center md:text-left flex flex-col items-center md:items-start"
                variants={{
                  hidden: { opacity: 0, y: 16, scale: 0.92 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE_STANDARD } },
                }}
              >
                <Icon size={28} strokeWidth={1.5} className="text-[var(--color-accent-primary)] mb-4" />
                <h3
                  className="text-[var(--color-text-primary)] font-[family-name:var(--font-display)] mb-2"
                  style={{ fontSize: "1.125rem", fontWeight: 500 }}
                >
                  {title}
                </h3>
                <p className="text-[var(--color-text-body)] text-[0.9rem] leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_STANDARD }}
          >
            <MagneticButton
              href="/portfolio/mayave"
              strength="standard"
              className="group/cta inline-flex items-center gap-3 h-12 px-8 rounded-[2px] bg-[var(--color-accent-primary)] text-white text-[0.95rem] tracking-wide hover:bg-[var(--color-accent-deep)] transition-colors duration-[240ms]"
            >
              Explore Mayavé
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-[240ms] group-hover/cta:translate-x-1"
              />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
