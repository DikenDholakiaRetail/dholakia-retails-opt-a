"use client";

import { motion } from "framer-motion";
import { Route, Leaf, Eye, Award, ArrowRight } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import TiltCard from "@/components/motion/TiltCard";
import Hairline from "@/components/motion/Hairline";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P06-S02 Responsibility Pillars — 4-col grid on Off-White (despite spec heading "Three").
 * Each pillar: 40×40 Electric Blue Lucide icon → Syne H4 → 60-word body → 'Learn more' link.
 * 1px Midnight Navy hairline border. 200px vertical padding.
 * CardSubtleLift on group-hover. Card3DTilt 4° (expressive).
 * Pillars stagger-enter 100ms, fade-up 16px Y.
 * Icon scale 0→1 + rotate -5deg→0deg, 400ms.
 */

type Pillar = {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    Icon: Route,
    title: "Traceability",
    body:
      "Every stone and material is tracked from origin through production, so each piece carries verifiable history.",
  },
  {
    Icon: Leaf,
    title: "Responsible Creation",
    body:
      "Lab-grown diamonds and ethically sourced materials reduce environmental and human cost without compromising beauty.",
  },
  {
    Icon: Eye,
    title: "Transparency",
    body:
      "Clear, accessible information on certifications, processes, and standards is part of the product, not a separate document.",
  },
  {
    Icon: Award,
    title: "Long-Term Value",
    body:
      "Pieces are designed and made to outlast trends — durable, repairable, and built to be inherited.",
  },
];

export default function PillarGrid() {
  return (
    <section
      className="bg-[var(--color-bg-elevated)]"
      style={{ paddingTop: "200px", paddingBottom: "200px" }}
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
            Responsibility Pillars
          </motion.p>
          <RevealText
            text="The standards we hold ourselves to."
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
          className="group/grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
          style={{ perspective: "1000px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              className="h-full"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE_STANDARD },
                },
              }}
            >
              <TiltCard angle="expressive" scale={1.015} as="article" className="h-full">
                <div className="group/card relative bg-white border border-[rgba(11,20,38,0.10)] p-8 h-full flex flex-col transition-[transform,opacity] duration-300 ease-out group-hover/grid:[&:not(:hover)]:opacity-70 hover:!opacity-100 hover:!translate-y-[-6px] hover:border-[var(--color-accent-primary)]">
                  {/* Top hairline draw */}
                  <div className="absolute top-0 left-0 right-0">
                    <Hairline
                      width="100%"
                      color="var(--color-accent-primary)"
                      durationMs={800}
                      delay={i * 100}
                    />
                  </div>

                  {/* Icon — scale 0→1 + rotate -5°→0° on hover */}
                  <motion.div
                    className="text-[var(--color-accent-primary)] mb-6"
                    initial={{ scale: 0, rotate: -5 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + i * 0.1,
                      ease: EASE_STANDARD,
                    }}
                  >
                    <p.Icon size={40} strokeWidth={1.5} />
                  </motion.div>

                  <h3
                    className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-4 min-h-[3.75rem]"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 500,
                      lineHeight: 1.25,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-[var(--color-text-body)] text-[0.95rem] leading-relaxed mb-6 flex-1">
                    {p.body}
                  </p>

                  <span className="group/link inline-flex items-center gap-2 text-[var(--color-accent-primary)] text-[0.85rem] font-medium mt-auto">
                    <span className="relative inline-block">
                      Learn more
                      <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-[var(--color-accent-primary)] origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-[240ms] ease-out" />
                    </span>
                    <ArrowRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform duration-[240ms] group-hover/card:translate-x-1"
                    />
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
