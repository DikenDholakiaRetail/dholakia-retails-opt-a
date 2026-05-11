"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import TiltCard from "@/components/motion/TiltCard";
import { EASE_STANDARD } from "@/lib/motion";
import type { CareerListItem } from "@/sanity/lib/queries";

const FUNCTION_LABELS: Record<string, string> = {
  design: "Design",
  brand: "Brand",
  merchandising: "Merchandising",
  retail: "Retail",
  operations: "Operations",
  corporate: "Corporate Functions",
};

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * P11-S05 Related Roles.
 * 100vh on White, 3-col responsive grid.
 * Card hover: title drops 4px, hairline border draws on edge, arrow translates 4px right.
 * Cards stagger 80ms.
 */
export default function RelatedRoles({
  roles,
  functionLabel,
}: {
  roles: CareerListItem[];
  functionLabel: string;
}) {
  if (!roles || roles.length === 0) return null;

  return (
    <section className="bg-white" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
      <div className="container-editorial">
        <div className="max-w-2xl mb-12">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            Related
          </motion.p>
          <RevealText
            text={`Other open roles in ${functionLabel}.`}
            as="h2"
            className="text-[var(--color-text-primary)] font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              fontWeight: 500,
            }}
            staggerMs={50}
            durationMs={650}
          />
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          style={{ perspective: "1000px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {roles.map((r) => (
            <motion.div
              key={r._id}
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
              <TiltCard angle="standard" scale={1.005} className="h-full">
                <Link
                  href={`/careers/${r.slug}`}
                  className="group/card relative h-full flex flex-col p-7 bg-white border border-[rgba(11,20,38,0.10)] transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1.5 hover:border-transparent"
                >
                  {/* Sequential edge draw */}
                  <span className="pointer-events-none absolute top-0 left-0 h-px bg-[var(--color-accent-primary)] w-0 group-hover/card:w-full transition-[width] duration-100 ease-out" />
                  <span className="pointer-events-none absolute top-0 right-0 w-px bg-[var(--color-accent-primary)] h-0 group-hover/card:h-full transition-[height] duration-100 ease-out delay-100" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-px bg-[var(--color-accent-primary)] w-0 group-hover/card:w-full transition-[width] duration-100 ease-out delay-200" />
                  <span className="pointer-events-none absolute bottom-0 left-0 w-px bg-[var(--color-accent-primary)] h-0 group-hover/card:h-full transition-[height] duration-100 ease-out delay-300" />

                  <p className="text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-accent-primary)] font-medium mb-4">
                    {FUNCTION_LABELS[r.functionArea] ?? r.functionArea}
                  </p>
                  <h3
                    className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-3 transition-transform duration-[240ms] group-hover/card:translate-y-1 min-h-[3.5rem]"
                    style={{ fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.25 }}
                  >
                    {r.title}
                  </h3>
                  <p className="text-[0.8rem] text-[var(--color-text-muted)] mb-6 flex-1">
                    {r.location} · {r.employmentType} · Posted {formatDate(r.publishDate)}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[var(--color-accent-primary)] text-[0.85rem] font-medium mt-auto">
                    View role
                    <ArrowRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform duration-[240ms] group-hover/card:translate-x-1"
                    />
                  </span>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_STANDARD }}
        >
          <Link
            href="/careers#open-roles"
            className="group/cta inline-flex items-center gap-2 text-[var(--color-accent-primary)] text-[0.9rem] font-medium"
          >
            View all open roles
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-[240ms] group-hover/cta:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
