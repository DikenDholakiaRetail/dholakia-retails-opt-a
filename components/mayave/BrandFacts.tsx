"use client";

import { motion } from "framer-motion";
import Hairline from "@/components/motion/Hairline";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P04-S03 Brand Facts.
 * 4-column horizontal (2-col tablet, 1-col mobile).
 * Each cell: label (Electric Blue caps eyebrow) → value (Syne Italic Midnight Navy).
 * 1px muted blue-grey vertical hairline rule between cells.
 * Mouse Parallax disabled. Subtle row highlight on hover — Electric Blue underline draws under value.
 * Cells stagger 80ms, fade-up 8px Y.
 */

const FACTS = [
  { label: "Audience", value: "Private luxury clientele" },
  { label: "Segment", value: "Bespoke fine jewellery" },
  { label: "Tone", value: "Quiet, poetic, precise" },
  { label: "Positioning", value: "Intimate modern elegance" },
];

export default function BrandFacts() {
  return (
    <section
      className="bg-white"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="container-editorial">
        <Hairline width="100%" color="rgba(11,20,38,0.10)" durationMs={800} />
        <motion.dl
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {FACTS.map((f, i) => (
            <motion.div
              key={f.label}
              className="group/cell relative px-6 py-12 lg:px-8 lg:py-16"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE_STANDARD },
                },
              }}
            >
              {/* Vertical hairline between cells (desktop) */}
              {i > 0 && (
                <span
                  aria-hidden
                  className="hidden lg:block absolute left-0 top-1/4 bottom-1/4 w-px"
                  style={{ background: "rgba(107, 138, 201, 0.3)" }}
                />
              )}

              <dt className="text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-accent-primary)] font-medium mb-3">
                {f.label}
              </dt>
              <dd
                className="font-[family-name:var(--font-display)] italic text-[var(--color-text-primary)] relative inline-block"
                style={{
                  fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)",
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}
              >
                {f.value}
                {/* Electric Blue underline draws on hover */}
                <span
                  aria-hidden
                  className="absolute left-0 right-0 -bottom-1 h-px bg-[var(--color-accent-primary)] origin-left scale-x-0 group-hover/cell:scale-x-100 transition-transform duration-[240ms] ease-out"
                />
              </dd>
            </motion.div>
          ))}
        </motion.dl>
        <Hairline width="100%" color="rgba(11,20,38,0.10)" durationMs={800} />
      </div>
    </section>
  );
}
