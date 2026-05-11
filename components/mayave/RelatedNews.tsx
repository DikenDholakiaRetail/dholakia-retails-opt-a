"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import Hairline from "@/components/motion/Hairline";
import EditorialImage from "@/components/motion/EditorialImage";
import { EASE_STANDARD } from "@/lib/motion";
import { MAYAVE_RELATED_NEWS } from "@/lib/media";

/**
 * P04-S06 Related News (Mayavé in the news).
 * 80vh band on White. Top: heading (left) + 'View all Mayavé press →' link (right).
 * Vertical list of 3 news rows, hairline-divided, each 80px tall.
 * Row: 160×90 thumbnail + content block + arrow-up-right.
 * Mouse Parallax disabled. RowSubtleHighlight on hover (+8px left padding,
 * thumbnail scale 1.04, hairline edge in Electric Blue).
 * Rows stagger 60ms, fade-up 8px Y. Hairlines draw L→R 600ms.
 */

type NewsItem = {
  slug: string;
  title: string;
  meta: string;
  src: { id: string; alt: string };
};

const NEWS: NewsItem[] = [
  {
    slug: "couture-design-prize-asha",
    title: "Mayavé awarded the 2026 Couture Design Prize for the Asha collection",
    meta: "Awards · 18 March 2026",
    src: MAYAVE_RELATED_NEWS[0],
  },
  {
    slug: "private-salon-outside-surat",
    title: "Mayavé opens its first private salon outside Surat",
    meta: "Brand Launch · 5 February 2026",
    src: MAYAVE_RELATED_NEWS[1],
  },
  {
    slug: "vogue-india-heritage-houses",
    title: "Mayavé featured in Vogue India's Heritage Houses 2026 issue",
    meta: "Press · 22 January 2026",
    src: MAYAVE_RELATED_NEWS[2],
  },
];

export default function RelatedNews() {
  return (
    <section className="bg-white" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <motion.p
              className="eyebrow mb-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: EASE_STANDARD }}
            >
              Press
            </motion.p>
            <RevealText
              text="Mayavé in the news"
              as="h2"
              className="text-[var(--color-text-primary)] font-[family-name:var(--font-display)]"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.015em",
                fontWeight: 500,
              }}
              staggerMs={50}
              durationMs={650}
            />
          </div>
          <Link
            href="/news?category=mayave"
            className="group/cta inline-flex items-center gap-2 text-[var(--color-accent-primary)] text-[0.9rem] font-medium self-start md:self-end"
          >
            View all Mayavé press
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-[240ms] group-hover/cta:translate-x-1"
            />
          </Link>
        </div>

        <motion.ol
          className="list-none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          <Hairline width="100%" color="rgba(11,20,38,0.10)" durationMs={600} />
          {NEWS.map((n, i) => (
            <motion.li
              key={n.slug}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE_STANDARD },
                },
              }}
            >
              <Link
                href={`/news/${n.slug}`}
                className="group/row relative flex items-center gap-5 py-6 transition-[background-color,padding] duration-200 hover:bg-[var(--color-bg-elevated)]/40 hover:pl-3"
              >
                {/* Left edge accent */}
                <span className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-[var(--color-accent-primary)] origin-top scale-y-0 group-hover/row:scale-y-100 transition-transform duration-200 ease-out" />

                {/* Thumbnail 160x90 */}
                <div
                  className="relative shrink-0 overflow-hidden"
                  style={{
                    width: "160px",
                    height: "90px",
                  }}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover/row:scale-[1.04]"
                    style={{
                      background:
                        "linear-gradient(135deg, #1a2b4f 0%, #050A14 100%)",
                    }}
                  >
                    <EditorialImage src={n.src} fill sizes="160px" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-[0.65rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] font-medium font-[family-name:var(--font-mono)] mb-2 hidden sm:block">
                    {n.meta}
                  </p>
                  <h3
                    className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] line-clamp-2 transition-transform duration-[240ms] group-hover/row:translate-x-1"
                    style={{
                      fontSize: "1.0625rem",
                      lineHeight: 1.3,
                      fontWeight: 500,
                    }}
                  >
                    {n.title}
                  </h3>
                  <p className="text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] font-medium mt-2 sm:hidden">
                    {n.meta}
                  </p>
                </div>

                {/* Arrow */}
                <span className="shrink-0 text-[var(--color-text-muted)] group-hover/row:text-[var(--color-accent-primary)] transition-colors duration-[240ms]">
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.5}
                    className="transition-transform duration-[240ms] group-hover/row:translate-x-1 group-hover/row:-translate-y-1"
                  />
                </span>
              </Link>
              <Hairline width="100%" color="rgba(11,20,38,0.10)" durationMs={600} />
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
