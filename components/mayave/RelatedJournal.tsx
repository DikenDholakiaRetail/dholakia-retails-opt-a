"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import TiltCard from "@/components/motion/TiltCard";
import EditorialImage from "@/components/motion/EditorialImage";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { EASE_STANDARD } from "@/lib/motion";
import { MAYAVE_RELATED_JOURNAL } from "@/lib/media";

/**
 * P04-S05 Related Blog (From the Mayavé journal).
 * 100vh on Off-White. Top split: section heading (left) + section deck (right, max 480px).
 * 3-col responsive grid (1-col mobile, 2-col tablet, 3-col desktop).
 * Each card: 16:9 thumbnail → category eyebrow → Syne H4 (3-line clamp) → meta.
 * EditorialImageDrift on thumbnails (±10px). Card3DTilt 3°.
 * Cards stagger 80ms, fade-up 16px Y. Hover: thumb scale 1.04, title +4px, arrow translates.
 * Below grid: ghost-outline 'Read the full journal →' CTA centered → /blog?category=mayave.
 */

type Post = {
  slug: string;
  category: string;
  title: string;
  meta: string;
  src: { id: string; alt: string };
};

const POSTS: Post[] = [
  {
    slug: "restraint-and-embellishment",
    category: "Craft",
    title: "On the tension between restraint and embellishment",
    meta: "Craft · 8 min read · 3 April 2026",
    src: MAYAVE_RELATED_JOURNAL[0],
  },
  {
    slug: "polishing-nine-hours",
    category: "Atelier",
    title: "Why we polish for nine hours when six would suffice",
    meta: "Atelier · 6 min read · 12 March 2026",
    src: MAYAVE_RELATED_JOURNAL[1],
  },
  {
    slug: "asha-collection-dialogue",
    category: "Conversations",
    title: "A dialogue with the diamond cutter behind the Asha collection",
    meta: "Conversations · 12 min read · 24 February 2026",
    src: MAYAVE_RELATED_JOURNAL[2],
  },
];

export default function RelatedJournal() {
  return (
    <section
      className="bg-[var(--color-bg-elevated)] flex items-center"
      style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="container-editorial w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14">
          <div className="md:col-span-7">
            <motion.p
              className="eyebrow mb-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: EASE_STANDARD }}
            >
              Mayavé Journal
            </motion.p>
            <RevealText
              text="From the Mayavé journal"
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
          <motion.div
            className="md:col-span-5 md:flex md:items-end"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE_STANDARD }}
          >
            <p className="text-[var(--color-text-body)] leading-relaxed max-w-[480px]">
              Long-form notes on craft, materials, and the philosophy behind the
              house.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 group/grid items-stretch"
          style={{ perspective: "1000px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {POSTS.map((p) => (
            <JournalCard key={p.slug} post={p} />
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
            href="/blog?category=mayave"
            className="group/cta inline-flex items-center gap-2 h-12 px-8 rounded-[2px] border border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)] hover:text-white transition-colors duration-[240ms] text-[0.95rem] tracking-wide"
          >
            Read the full journal
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-[240ms] group-hover/cta:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function JournalCard({ post }: { post: Post }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useMouseParallax(cardRef, [{ ref: thumbRef, amplitude: 10 }], {
    duration: 0.5,
    ease: "power2.out",
  });

  return (
    <motion.div
      className="h-full transition-opacity duration-[240ms] group-hover/grid:[&:not(:hover)]:opacity-70"
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
      }}
    >
      <TiltCard angle="standard" scale={1.005} className="h-full">
        <Link
          href={`/blog/${post.slug}`}
          className="group/card relative h-full flex flex-col bg-white border border-[rgba(11,20,38,0.10)] hover:border-transparent transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1.5"
        >
          <div ref={cardRef} className="relative aspect-[16/9] overflow-hidden bg-[var(--color-bg-elevated)]">
            <motion.div
              ref={thumbRef}
              className="absolute inset-0 will-change-transform"
              style={{
                background: "linear-gradient(135deg, #1a2b4f 0%, #050A14 100%)",
                transform: "scale(1.04)",
              }}
            >
              <div className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover/card:scale-[1.04]">
                <EditorialImage
                  src={post.src}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div
                className="absolute inset-0 opacity-15 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
                  backgroundSize: "3px 3px",
                }}
              />
            </motion.div>
          </div>

          {/* Sequential Electric Blue border draw on hover */}
          <span className="pointer-events-none absolute top-0 left-0 h-px bg-[var(--color-accent-primary)] w-0 group-hover/card:w-full transition-[width] duration-100 ease-out" />
          <span className="pointer-events-none absolute top-0 right-0 w-px bg-[var(--color-accent-primary)] h-0 group-hover/card:h-full transition-[height] duration-100 ease-out delay-100" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-px bg-[var(--color-accent-primary)] w-0 group-hover/card:w-full transition-[width] duration-100 ease-out delay-200" />
          <span className="pointer-events-none absolute bottom-0 left-0 w-px bg-[var(--color-accent-primary)] h-0 group-hover/card:h-full transition-[height] duration-100 ease-out delay-300" />

          <div className="p-6 flex flex-col gap-3 flex-1">
            <p className="text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-accent-primary)] font-medium">
              {post.category}
            </p>
            <h3
              className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] line-clamp-3 transition-transform duration-[240ms] group-hover/card:translate-y-1 min-h-[4rem]"
              style={{ fontSize: "1.125rem", lineHeight: 1.25, fontWeight: 500 }}
            >
              {post.title}
            </h3>
            <p className="text-[0.8rem] text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] tabular-nums mt-auto pt-2">
              {post.meta}
            </p>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}
