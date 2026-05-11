"use client";

import { motion } from "framer-motion";
import Hairline from "@/components/motion/Hairline";
import { EASE_STANDARD } from "@/lib/motion";
import type { LegalSection } from "./LegalDocumentBody";

/**
 * P17-S01 Disclaimer body (no sticky TOC variant).
 * Centered narrow column, 720px max-width on Off-White.
 * 4 numbered sections, each H3 + paragraph + 1px Soft Sky horizontal divider.
 * Sections fade-up 12px Y on scroll, stagger 200ms.
 * Horizontal dividers SVG draw L→R.
 */
export default function DisclaimerBody({ sections }: { sections: LegalSection[] }) {
  return (
    <section
      className="bg-[var(--color-bg-elevated)]"
      style={{ paddingTop: "60px", paddingBottom: "80px" }}
    >
      <div className="container-editorial">
        <article className="max-w-[720px] mx-auto">
          {sections.map((s, i) => (
            <motion.div
              key={s.id}
              id={s.id}
              className="scroll-mt-32"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.2,
                ease: EASE_STANDARD,
              }}
            >
              {i > 0 && (
                <div className="my-12">
                  <Hairline
                    width="100%"
                    color="rgba(107, 138, 201, 0.4)"
                    durationMs={600}
                  />
                </div>
              )}
              <h2
                className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-6"
                style={{
                  fontSize: "clamp(1.375rem, 2vw, 1.75rem)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  fontWeight: 500,
                }}
              >
                {s.heading}
              </h2>
              <div
                className="text-[var(--color-text-body)] space-y-4"
                style={{ fontSize: "1rem", lineHeight: 1.7 }}
              >
                {s.body}
              </div>
            </motion.div>
          ))}
        </article>
      </div>
    </section>
  );
}
