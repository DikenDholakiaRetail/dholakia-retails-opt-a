"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import RevealText from "@/components/motion/RevealText";
import TiltCard from "@/components/motion/TiltCard";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { EASE_STANDARD } from "@/lib/motion";
import { CATEGORY_LABELS } from "@/lib/blog-categories";
import type { BlogPostListItem } from "@/sanity/lib/queries";

/**
 * P19-S04 Related Posts.
 * Same structural pattern as P13-S04 but pulls from blogPost in same category.
 * 3-col grid. Card3DTilt 3°. Stagger 80ms, fade-up 16px Y.
 */
export default function RelatedBlogPosts({
  posts,
  category,
}: {
  posts: BlogPostListItem[];
  category: string;
}) {
  if (!posts || posts.length === 0) return null;

  const categoryLabel = CATEGORY_LABELS[category] ?? category;

  return (
    <section
      className="bg-white"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
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
            text={`More from ${categoryLabel}.`}
            as="h2"
            className="text-[var(--color-text-primary)] font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              fontWeight: 500,
            }}
            staggerMs={50}
            durationMs={650}
          />
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
          {posts.map((p) => (
            <RelatedCard key={p._id} post={p} />
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
            href="/blog"
            className="group/cta inline-flex items-center gap-2 text-[var(--color-accent-primary)] text-[0.9rem] font-medium"
          >
            All journal entries
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

function RelatedCard({ post }: { post: BlogPostListItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useMouseParallax(cardRef, [{ ref: thumbRef, amplitude: 10 }], {
    duration: 0.5,
    ease: "power2.out",
  });

  const date = new Date(post.publishDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
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
              style={{ transform: "scale(1.04)" }}
            >
              {post.thumbnail?.asset && (
                <Image
                  src={urlFor(post.thumbnail).width(800).height(450).url()}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  placeholder={post.thumbnail.metadata?.lqip ? "blur" : "empty"}
                  blurDataURL={post.thumbnail.metadata?.lqip}
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover/card:scale-[1.04]"
                />
              )}
            </motion.div>
          </div>

          <span className="pointer-events-none absolute top-0 left-0 h-px bg-[var(--color-accent-primary)] w-0 group-hover/card:w-full transition-[width] duration-100 ease-out" />
          <span className="pointer-events-none absolute top-0 right-0 w-px bg-[var(--color-accent-primary)] h-0 group-hover/card:h-full transition-[height] duration-100 ease-out delay-100" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-px bg-[var(--color-accent-primary)] w-0 group-hover/card:w-full transition-[width] duration-100 ease-out delay-200" />
          <span className="pointer-events-none absolute bottom-0 left-0 w-px bg-[var(--color-accent-primary)] h-0 group-hover/card:h-full transition-[height] duration-100 ease-out delay-300" />

          <div className="p-6 flex flex-col gap-3 flex-1">
            <p className="text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-accent-primary)] font-medium">
              {CATEGORY_LABELS[post.category] ?? post.category}
            </p>
            <h3
              className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] line-clamp-3 transition-transform duration-[240ms] group-hover/card:translate-y-1 min-h-[4rem]"
              style={{ fontSize: "1.25rem", lineHeight: 1.25, fontWeight: 500 }}
            >
              {post.title}
            </h3>
            <p className="text-[0.8rem] text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] tabular-nums mt-auto pt-3">
              {date}
              {post.readTime ? ` · ${post.readTime} min read` : ""}
            </p>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}
