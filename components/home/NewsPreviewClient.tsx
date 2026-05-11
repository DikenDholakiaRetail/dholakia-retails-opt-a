"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import { EASE_STANDARD } from "@/lib/motion";
import NewsCard, { type NewsCardItem } from "./NewsCard";

export type { NewsCardItem };

/**
 * Client wrapper for the home Newsroom preview.
 *
 * Owns the section heading, "View All News" link, the Framer Motion staggered
 * grid container, and the per-card reveal variants. The actual card mark-up
 * (real vs. placeholder) lives in <NewsCard/>, which keeps both modes 1:1 in
 * spacing, typography, and hover behaviour.
 *
 * All design tokens (16:9 thumbnail, 80ms stagger, 16px Y fade-up,
 * Card3DTilt 3°, hover lift +6px, sequential border draw) are preserved
 * exactly as the original P01-S08 spec.
 */
export default function NewsPreviewClient({ items }: { items: NewsCardItem[] }) {
  return (
    <section
      data-header-theme="light"
      className="bg-white"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <motion.p
              className="eyebrow mb-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              Newsroom
            </motion.p>
            <RevealText
              text="Stories, milestones, and perspectives from the house."
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
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-[var(--color-accent-primary)] font-medium tracking-wide self-start md:self-end"
          >
            View All News
            <ArrowUpRight
              size={20}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 group/grid items-stretch"
          style={{ perspective: "1000px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {items.map((item) => (
            <motion.div
              key={item.kind === "real" ? item.slug : item.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: EASE_STANDARD },
                },
              }}
              className="h-full group-hover/grid:[&:not(:hover)]:opacity-70 transition-opacity duration-240 ease-out"
            >
              <NewsCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
