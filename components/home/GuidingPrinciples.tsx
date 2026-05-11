"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Gem } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import TiltCard from "@/components/motion/TiltCard";
import Hairline from "@/components/motion/Hairline";
import CountUp from "@/components/motion/CountUp";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P01-S03 Guiding Principles.
 * Asymmetric 3-col on White: Innovation top-left, Integrity drops 80px, Craftsmanship top-right.
 * Card3DTilt 4° (expressive). CardSubtleLift via group-hover (CSS).
 * Cards stagger-enter 100ms apart (fade-up 24px Y, 600ms each, expo-out).
 * Eyebrow numbers 01/02/03: count-up animation on entry.
 * Hairline separator at top of each card: SVG draw-in 800ms left-to-right.
 * Icon micro: 200ms scale 1→1.1 + rotate -5°→0° on hover.
 */

type Principle = {
  num: number;
  title: string;
  body: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

const PRINCIPLES: Principle[] = [
  {
    num: 1,
    title: "Innovation",
    body:
      "We combine modern retail thinking, evolving consumer insight, and future-ready systems to shape brands that remain relevant as luxury changes.",
    Icon: Sparkles,
  },
  {
    num: 2,
    title: "Integrity",
    body: "Trust is built through transparency, governance, and responsible brand stewardship.",
    Icon: ShieldCheck,
  },
  {
    num: 3,
    title: "Craftsmanship",
    body:
      "Luxury begins in detail, proportion, material understanding, and the discipline to protect quality at every stage.",
    Icon: Gem,
  },
];

export default function GuidingPrinciples() {
  return (
    <section
      data-header-theme="light"
      className="bg-white"
      style={{ paddingTop: "160px", paddingBottom: "160px" }}
    >
      <div className="container-editorial">
        <div className="max-w-2xl mb-16 md:mb-24">
          <RevealText
            text="The standards behind every brand we build."
            as="h2"
            className="text-[var(--color-text-primary)]"
            style={{
              fontSize: "clamp(1.875rem, 3.4vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
            }}
            staggerMs={50}
            durationMs={650}
          />
        </div>

        <motion.div
          className="group/grid grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-10"
          style={{ perspective: "1000px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.num}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
              }}
              // className={i === 1 ? "md:translate-y-20" : ""}
            >
              <TiltCard angle="expressive" scale={1.02} as="article">
                <div
                  className="group/card relative pt-8 will-change-transform transition-[transform,opacity] duration-300 ease-out group-hover/grid:[&:not(:hover)]:opacity-70 hover:!opacity-100 hover:!translate-y-[-6px]"
                >
                  {/* Hairline draw-in */}
                  <div className="absolute top-0 left-0 right-0">
                    <Hairline width="100%" color="rgba(11,20,38,0.15)" durationMs={800} />
                  </div>

                  <p className="font-[family-name:var(--font-mono)] text-[0.8rem] text-[var(--color-text-muted)] mb-3">
                    <CountUp to={p.num} pad={2} durationMs={600} />
                  </p>

                  <div className="text-[var(--color-accent-primary)] mb-6 transition-transform duration-200 group-hover/card:[&>*]:scale-110 group-hover/card:[&>*]:-rotate-[5deg]">
                    <p.Icon size={40} strokeWidth={1.5} />
                  </div>

                  <h3
                    className="text-[var(--color-text-primary)] mb-4"
                    style={{ fontSize: "1.625rem", fontWeight: 500 }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-[var(--color-text-body)] text-[0.95rem] leading-relaxed max-w-sm">
                    {p.body}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
