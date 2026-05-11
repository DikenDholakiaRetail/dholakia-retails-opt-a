"use client";

import { motion } from "framer-motion";
import { ArrowDown, Check, CircleDot } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import { EASE_STANDARD } from "@/lib/motion";

type Props = {
  leadParagraph?: string | null;
  responsibilities?: string[] | null;
  requirements?: string[] | null;
  successMetrics?: string | null;
};

/**
 * P11-S02 Role Body.
 * Centered 720px column on Off-White, 80px top/bottom padding.
 * H4 sub-headings with arrow-down glyph (rotating subtly on entry).
 * Responsibilities use Lucide check; requirements use Lucide circle-dot.
 * Lead paragraph fade-up; H4 word-by-word at 80% viewport; list items stagger 60ms.
 * Mouse Parallax / Tracking disabled.
 */
export default function RoleBody({
  leadParagraph,
  responsibilities,
  requirements,
  successMetrics,
}: Props) {
  return (
    <section className="bg-[var(--color-bg-elevated)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="container-editorial">
        <div className="max-w-[720px] mx-auto">
          {/* Section title */}
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            About the Role
          </motion.p>

          {/* Lead paragraph */}
          {leadParagraph && (
            <motion.p
              className="text-[var(--color-text-primary)] mb-12"
              style={{
                fontSize: "1.125rem",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE_STANDARD }}
            >
              {leadParagraph}
            </motion.p>
          )}

          {/* Responsibilities */}
          {responsibilities && responsibilities.length > 0 && (
            <SubSection title="What you will do" items={responsibilities} bullet="check" />
          )}

          {/* Requirements */}
          {requirements && requirements.length > 0 && (
            <SubSection title="What we are looking for" items={requirements} bullet="circle" />
          )}

          {/* Success metrics */}
          {successMetrics && (
            <div className="mb-12">
              <SubHeading text="What success looks like in 12 months" />
              <motion.p
                className="text-[var(--color-text-body)] leading-relaxed"
                style={{ fontSize: "1rem", lineHeight: 1.7 }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE_STANDARD }}
              >
                {successMetrics}
              </motion.p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SubSection({
  title,
  items,
  bullet,
}: {
  title: string;
  items: string[];
  bullet: "check" | "circle";
}) {
  const Icon = bullet === "check" ? Check : CircleDot;
  return (
    <div className="mb-12">
      <SubHeading text={title} />
      <motion.ul
        className="flex flex-col gap-3 list-none"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {items.map((item, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3 text-[var(--color-text-body)]"
            style={{ fontSize: "1rem", lineHeight: 1.7 }}
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_STANDARD } },
            }}
          >
            <span className="shrink-0 mt-1.5 text-[var(--color-accent-primary)]">
              <Icon size={12} strokeWidth={2} />
            </span>
            <span>{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

function SubHeading({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <motion.span
        className="text-[var(--color-accent-primary)] inline-flex"
        initial={{ rotate: 0 }}
        whileInView={{ rotate: [0, 90, 0] }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: EASE_STANDARD }}
      >
        <ArrowDown size={12} strokeWidth={1.5} />
      </motion.span>
      <RevealText
        text={text}
        as="h3"
        className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)]"
        style={{ fontSize: "1.5rem", fontWeight: 500, lineHeight: 1.25 }}
        staggerMs={60}
        durationMs={600}
      />
    </div>
  );
}
