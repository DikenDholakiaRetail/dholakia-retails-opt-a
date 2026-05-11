"use client";

import { motion } from "framer-motion";
import { Pencil, Gem, Grid3x3, Wrench, Package } from "lucide-react";
import CountUp from "@/components/motion/CountUp";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P05-S04 Process Timeline.
 * Horizontal 5-column layout desktop / vertical stack mobile.
 * Each step: numeral (Playfair Italic Electric Blue) → icon → label → 2-line description.
 * 1px Electric Blue connector line linking all steps; draws left-to-right on scroll-trigger.
 *
 * Motion · Parallax · Tracking
 *   Mouse Parallax: Subtle ImageDrift on per-step macros (if used, ±4px) — not used here.
 *   Mouse Tracking: Card3DTilt at 2°. Connector line stays straight.
 *
 * Motion timeline
 *   → Connector line: SVG path stroke-dashoffset animated on scroll-trigger, 1.4s
 *   → Steps stagger-enter: 100ms apart, fade-up 12px Y
 *   → Numerals: count-up '01' → final, 600ms
 *   → Icons: scale 0 → 1 + rotate -5deg → 0deg, 400ms
 */

type Step = {
  num: number;
  label: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

const STEPS: Step[] = [
  { num: 1, label: "Concept", description: "Idea, audience, and emotional intent shaped on paper.", Icon: Pencil },
  { num: 2, label: "Material Understanding", description: "Stone, metal, and origin examined for fit.", Icon: Gem },
  { num: 3, label: "Design Development", description: "Proportion, balance, and silhouette refined.", Icon: Grid3x3 },
  { num: 4, label: "Setting & Finishing", description: "Setting, polish, and detail brought to discipline.", Icon: Wrench },
  { num: 5, label: "Presentation", description: "The piece readied for its private debut.", Icon: Package },
];

export default function ProcessTimeline() {
  return (
    <section className="bg-[#faf9f7]" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
      <div className="container-editorial">
        <div className="max-w-2xl mb-16 md:mb-20">
          <motion.p
            className="mb-5"
            style={{
              color: "var(--color-accent-primary)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            Process Timeline
          </motion.p>
          <motion.h2
            className="font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(1.875rem, 3.4vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              fontWeight: 500,
            }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE_STANDARD }}
          >
            Five steps from concept to presentation.
          </motion.h2>
        </div>

        <div>
          {/* Steps */}
          <motion.ol
            className="grid grid-cols-1 lg:grid-cols-5 gap-y-12 gap-x-6 list-none items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {STEPS.map((s) => (
              <motion.li
                key={s.num}
                className="h-full"
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
                }}
              >
                <ProcessStep step={s} />
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step }: { step: Step }) {
  const { num, label, description, Icon } = step;
  return (
    <div className="relative h-full group">
      <div className="relative h-full bg-white rounded-xl border border-[rgba(0,0,0,0.06)] p-7 pt-8 flex flex-col transition-all duration-300 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] group-hover:-translate-y-1 group-hover:border-[rgba(0,0,0,0.10)]">
        {/* Numeral — inside a circular badge */}
        <div
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] mb-5 font-[family-name:var(--font-display)] italic"
          style={{ fontSize: "0.875rem", fontWeight: 500, lineHeight: 1 }}
        >
          <CountUp to={num} pad={2} durationMs={600} />
        </div>

        {/* Icon */}
        <motion.span
          className="inline-flex text-[var(--color-accent-primary)] mb-5 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scale: 0, rotate: -5 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease: EASE_STANDARD }}
        >
          <Icon size={28} strokeWidth={1.5} />
        </motion.span>

        <h3
          className="text-[var(--color-text-primary)] mb-3 font-[family-name:var(--font-display)]"
          style={{ fontSize: "1.125rem", fontWeight: 500, lineHeight: 1.25 }}
        >
          {label}
        </h3>
        <p className="text-[var(--color-text-body)] text-[0.9rem] leading-relaxed flex-1">
          {description}
        </p>
      </div>
    </div>
  );
}
