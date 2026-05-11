"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  Heart,
  Plane,
  Calendar,
  Hammer,
  type LucideIcon,
} from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import TiltCard from "@/components/motion/TiltCard";
import { EASE_STANDARD } from "@/lib/motion";
import ApplicationModal from "./ApplicationModal";

type Benefit = { icon?: string; label?: string };

type Props = {
  slug: string;
  title: string;
  compensationSummary?: string | null;
  benefits?: Benefit[] | null;
  applicationInstructions?: string | null;
  closingDate?: string | null;
};

const ICON_MAP: Record<string, LucideIcon> = {
  heart: Heart,
  plane: Plane,
  calendar: Calendar,
  hammer: Hammer,
};

function formatDate(iso?: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * P11-S04 Compensation & How to Apply.
 * 100vh band on Off-White, centered 720px column.
 * Compensation summary → 2×2 benefits grid (Card3DTilt 2°) → How to apply H4 → instructions →
 * full-width Apply CTA → helper text.
 * ButtonHoverFill on Apply. Benefit cards stagger 80ms; icons subtle scale pulse on hover.
 */
export default function CompensationAndApply({
  slug,
  title,
  compensationSummary,
  benefits,
  applicationInstructions,
  closingDate,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        className="bg-[var(--color-bg-elevated)]"
        style={{ paddingTop: "120px", paddingBottom: "120px" }}
      >
        <div className="container-editorial">
          <div className="max-w-[720px] mx-auto">
            <motion.p
              className="eyebrow mb-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: EASE_STANDARD }}
            >
              Compensation
            </motion.p>
            <RevealText
              text="Compensation and what to expect."
              as="h2"
              className="text-[var(--color-text-primary)] mb-8 font-[family-name:var(--font-display)]"
              style={{
                fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.015em",
                fontWeight: 500,
              }}
              staggerMs={60}
              durationMs={650}
            />

            {compensationSummary && (
              <motion.p
                className="text-[var(--color-text-body)] mb-12"
                style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE_STANDARD }}
              >
                {compensationSummary}
              </motion.p>
            )}

            {benefits && benefits.length > 0 && (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14 items-stretch"
                style={{ perspective: "1000px" }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
              >
                {benefits.map((b, i) => {
                  const Icon =
                    (b.icon && ICON_MAP[b.icon]) || Heart;
                  return (
                    <motion.div
                      key={i}
                      className="h-full"
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.5, ease: EASE_STANDARD },
                        },
                      }}
                    >
                      <TiltCard angle="gentle" scale={1.005} className="h-full">
                        <div className="group/benefit h-full flex items-start gap-4 p-5 bg-white border border-[rgba(11,20,38,0.10)]">
                          <span className="shrink-0 text-[var(--color-accent-primary)] transition-transform duration-[400ms] group-hover/benefit:scale-110">
                            <Icon size={24} strokeWidth={1.5} />
                          </span>
                          <span className="text-[var(--color-text-body)] text-[0.95rem] leading-relaxed">
                            {b.label}
                          </span>
                        </div>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* How to apply */}
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
                text="How to apply."
                as="h3"
                className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)]"
                style={{ fontSize: "1.5rem", fontWeight: 500, lineHeight: 1.25 }}
                staggerMs={60}
                durationMs={600}
              />
            </div>

            {applicationInstructions && (
              <motion.p
                className="text-[var(--color-text-body)] mb-8"
                style={{ fontSize: "1rem", lineHeight: 1.7 }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE_STANDARD }}
              >
                {applicationInstructions}
              </motion.p>
            )}

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group/cta inline-flex items-center justify-center gap-3 w-full h-14 px-8 rounded-[2px] bg-[var(--color-accent-primary)] text-white text-[1rem] tracking-wide hover:bg-[var(--color-accent-deep)] transition-colors duration-[240ms]"
            >
              Apply for this role
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-[240ms] group-hover/cta:translate-x-1"
              />
            </button>

            {closingDate && (
              <p className="text-[0.85rem] text-center text-[var(--color-text-muted)] mt-4">
                Applications close {formatDate(closingDate)}.
              </p>
            )}
          </div>
        </div>
      </section>

      <ApplicationModal
        open={open}
        onClose={() => setOpen(false)}
        roleSlug={slug}
        roleTitle={title}
      />
    </>
  );
}
