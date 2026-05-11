"use client";

import { motion } from "framer-motion";
import { Sprout, FlaskConical, Hexagon, Scissors, Gem } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import CountUp from "@/components/motion/CountUp";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P07-S03 Process Explainer.
 * Horizontal 5-column flowchart desktop / vertical stack mobile.
 * Steps: Diamond Seed → Controlled Growth → Crystal Development → Cutting & Polishing → Jewellery Application.
 * Electric Blue connecting lines with arrowheads, draw L→R via stroke-dashoffset on scroll.
 * Card3DTilt 2°. Steps stagger-enter. Icons rotate-in subtly.
 */

type Step = {
  num: number;
  label: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

const STEPS: Step[] = [
  { num: 1, label: "Diamond Seed", description: "A pure carbon seed crystal initiates the growth process.", Icon: Sprout },
  { num: 2, label: "Controlled Growth", description: "Plasma chamber conditions are tuned with precision.", Icon: FlaskConical },
  { num: 3, label: "Crystal Development", description: "Atom-by-atom layering forms the structured crystal.", Icon: Hexagon },
  { num: 4, label: "Cutting & Polishing", description: "Facets are cut and polished to optical tolerances.", Icon: Scissors },
  { num: 5, label: "Jewellery Application", description: "The finished stone is set into the final piece.", Icon: Gem },
];

export default function ProcessFlowchart() {
  return (
    <section
      className="bg-[#f3f4f6]"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="container-editorial">
        <div className="max-w-2xl mb-16 md:mb-20">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            Process Explainer
          </motion.p>
          <RevealText
            text="From seed to jewellery, in five precise stages."
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

        <div>
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
                <FlowStep step={s} />
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

function FlowStep({ step }: { step: Step }) {
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
