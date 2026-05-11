"use client";

import { motion } from "framer-motion";
import TiltCard from "@/components/motion/TiltCard";
import CountUp from "@/components/motion/CountUp";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P10-S02 Culture pillars.
 * 3-col pillar grid; each: numeral 01–03 → Playfair statement.
 * CardSubtleLift via group hover (CSS); Card3DTilt 3°.
 * Stagger 100ms; numerals count-up.
 */

const PILLARS = [
  { num: 1, statement: "Ambition With Discipline" },
  { num: 2, statement: "Craft With Modernity" },
  { num: 3, statement: "Ownership With Integrity" },
];

export default function Culture() {
  return (
    <section className="bg-white" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
      <div className="container-editorial">
        <motion.div
          className="group/grid grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
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
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
              }}
            >
              <TiltCard angle="standard" scale={1.005}>
                <div className="group/card relative pt-8 transition-transform duration-300 ease-out group-hover/grid:[&:not(:hover)]:opacity-70 hover:!opacity-100">
                  <span className="absolute top-0 left-0 right-0 h-px bg-[var(--color-text-primary)]/15 group-hover/card:bg-[var(--color-accent-primary)] transition-colors duration-500" />
                  <p
                    className="font-[family-name:var(--font-display)] italic text-[var(--color-accent-primary)] mb-5"
                    style={{ fontSize: "2.5rem", fontWeight: 500, lineHeight: 1 }}
                  >
                    <CountUp to={p.num} pad={2} durationMs={600} />
                  </p>
                  <h3
                    className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)]"
                    style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", fontWeight: 500, lineHeight: 1.2 }}
                  >
                    {p.statement}
                  </h3>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
