"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import TiltCard from "@/components/motion/TiltCard";
import CountUp from "@/components/motion/CountUp";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P10-S02 Culture Pillars.
 * 3-col pillar grid; each: numeral 01–03 → Syne statement → 1-line body.
 * CardSubtleLift via group hover; Card3DTilt 3°.
 * Pillars stagger 100ms apart; numerals count-up.
 */

const PILLARS = [
  {
    num: 1,
    title: "Ambition With Discipline",
    body: "We set high standards and meet them through process, not heroics.",
  },
  {
    num: 2,
    title: "Craft With Modernity",
    body:
      "We honour traditional jewellery craft while adopting precision technology where it improves outcomes.",
  },
  {
    num: 3,
    title: "Ownership With Integrity",
    body:
      "We trust our teams with consequential decisions and hold them accountable for outcomes.",
  },
];

export default function CulturePillars() {
  return (
    <section className="bg-white" style={{ paddingTop: "160px", paddingBottom: "160px" }}>
      <div className="container-editorial">
        <div className="max-w-2xl mb-16 md:mb-20">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            Culture Pillars
          </motion.p>
          <RevealText
            text="How we work."
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
          className="group/grid grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-stretch"
          style={{ perspective: "1000px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {PILLARS.map((p) => (
            <motion.div
              key={p.num}
              className="h-full"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
              }}
            >
              <TiltCard angle="standard" scale={1.005} className="h-full">
                <div className="group/card relative h-full pt-8 flex flex-col transition-transform duration-300 ease-out group-hover/grid:[&:not(:hover)]:opacity-70 hover:!opacity-100">
                  <span className="absolute top-0 left-0 right-0 h-px bg-[var(--color-text-primary)]/15 group-hover/card:bg-[var(--color-accent-primary)] transition-colors duration-500" />
                  <p
                    className="font-[family-name:var(--font-display)] italic text-[var(--color-accent-primary)] mb-5"
                    style={{ fontSize: "2.5rem", fontWeight: 500, lineHeight: 1 }}
                  >
                    <CountUp to={p.num} pad={2} durationMs={600} />
                  </p>
                  <h3
                    className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-4 min-h-[4rem]"
                    style={{
                      fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                      fontWeight: 500,
                      lineHeight: 1.2,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-[var(--color-text-body)] leading-relaxed flex-1">
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
