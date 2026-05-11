"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import { EASE_STANDARD } from "@/lib/motion";
import type { Author } from "@/sanity/lib/queries";

type Props = {
  description?: string | null;
  values?: string[] | null;
  manager?: Author | null;
};

/**
 * P11-S03 About the Team.
 * 100vh on White, centered 880px max-width.
 * 60/40 split: left team description + values pills · right manager card.
 * Manager card: 1px Soft Sky border with 1px Electric Blue 8px-wide left accent.
 * Section title word-by-word; values pills stagger 80ms; manager card scale 0.96→1.0 fade-in.
 * Left-edge accent SVG draws top-to-bottom 1.2s. Bio fades in last 300ms after card settles.
 */
export default function TeamSection({ description, values, manager }: Props) {
  if (!description && !values?.length && !manager) return null;

  return (
    <section className="bg-white" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
      <div className="container-editorial">
        <div className="max-w-[880px] mx-auto">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            Team
          </motion.p>
          <RevealText
            text="Who you'll work with."
            as="h2"
            className="text-[var(--color-text-primary)] mb-12 font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              fontWeight: 500,
            }}
            staggerMs={60}
            durationMs={650}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* LEFT 60% — description + values pills */}
            <div className="lg:col-span-3">
              {description && (
                <motion.p
                  className="text-[var(--color-text-body)] leading-relaxed mb-8"
                  style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: EASE_STANDARD }}
                >
                  {description}
                </motion.p>
              )}

              {values && values.length > 0 && (
                <>
                  <p className="text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] mb-3">
                    Team values
                  </p>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.08 } },
                    }}
                  >
                    {values.map((v, i) => (
                      <motion.span
                        key={i}
                        className="inline-flex items-center h-8 px-4 rounded-full border border-[rgba(11,20,38,0.15)] text-[0.8rem] tracking-[0.04em] text-[var(--color-text-primary)] bg-white"
                        variants={{
                          hidden: { opacity: 0, y: 8 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_STANDARD } },
                        }}
                      >
                        {v}
                      </motion.span>
                    ))}
                  </motion.div>
                </>
              )}
            </div>

            {/* RIGHT 40% — manager card */}
            {manager && (
              <motion.div
                className="lg:col-span-2 relative bg-white border border-[var(--color-accent-soft)] p-7 group/manager"
                initial={{ scale: 0.96, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: EASE_STANDARD }}
              >
                {/* Left-edge Electric Blue accent — 8px wide, draws top-to-bottom */}
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 origin-top"
                  style={{ width: "8px", background: "var(--color-accent-primary)" }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.2, delay: 0.4, ease: EASE_STANDARD }}
                />

                <div className="pl-3">
                  {/* Round portrait placeholder — silhouette if no picture */}
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-5 bg-[var(--color-bg-elevated)] border border-transparent group-hover/manager:border-[rgba(59,111,255,0.6)] transition-colors duration-[240ms]">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(70% 70% at 50% 40%, #2a3a5c 0%, #14213d 100%)",
                        filter: "grayscale(0.5)",
                      }}
                    />
                    <svg
                      aria-hidden
                      viewBox="0 0 100 100"
                      className="absolute inset-0 w-full h-full opacity-40"
                    >
                      <ellipse cx="50" cy="38" rx="18" ry="22" stroke="#cdd9f0" strokeWidth="1" fill="none" />
                      <path d="M18 100c0-26 14-44 32-48 18 4 32 22 32 48" stroke="#cdd9f0" strokeWidth="1" fill="none" />
                    </svg>
                  </div>

                  <h3
                    className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-1"
                    style={{ fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.25 }}
                  >
                    {manager.name}
                  </h3>
                  {manager.role && (
                    <p className="text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] mb-4">
                      {manager.role}
                    </p>
                  )}
                  {manager.bio && (
                    <motion.p
                      className="text-[var(--color-text-body)] text-[0.9rem] leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.5, delay: 1.4, ease: EASE_STANDARD }}
                    >
                      {manager.bio}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
