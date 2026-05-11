"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import TiltCard from "@/components/motion/TiltCard";
import { EASE_STANDARD } from "@/lib/motion";
import {
  BLOG_CATEGORIES,
  CATEGORY_LABELS,
  VALID_CATEGORY_SLUGS,
} from "@/lib/blog-categories";
import BlogCategoryFilter from "./BlogCategoryFilter";
import type { BlogPostListItem } from "@/sanity/lib/queries";

const PAGE_SIZE = 9;

/**
 * P18-S03 + P18-S04 — Categories filter + posts grid, fully client-side.
 *
 * Why client-side:
 *   The previous server-rendered approach relied on `searchParams` + `<Link>`
 *   navigation. Next.js's Router Cache could reuse the prior RSC payload
 *   when only the query string changed, which surfaced as "click pill, URL
 *   updates, list doesn't" — particularly when returning to "All" (same
 *   pathname, no params). Lifting the filter into a `useMemo` driven by
 *   `useSearchParams()` makes filtering instant and side-steps the cache
 *   entirely.
 *
 * Filter rules:
 *   • Category param is read via `useSearchParams()` so URL navigation and
 *     in-page clicks are unified.
 *   • Match is case-insensitive (slug normalised on both sides).
 *   • An unknown / empty / "all" / null category → unfiltered.
 *   • The featured post is always shown above the grid as the editorial
 *     highlight; we exclude its id from the grid to avoid duplication,
 *     regardless of which category is active.
 *
 * Pagination:
 *   • In-memory slice (`visibleCount`, default 9, +9 per Load-more click).
 *   • Resets to 9 the moment the active category changes.
 *
 * Animation:
 *   • The grid container is keyed by the active category slug so framer-
 *     motion treats each filter change as a fresh mount, retriggering the
 *     stagger reveal. AnimatePresence handles a soft 200ms fade between
 *     filter states so there is never a blank pop.
 */
export default function BlogGrid({
  allPosts,
}: {
  allPosts: BlogPostListItem[];
}) {
  const params = useSearchParams();
  const rawCategory = params.get("category");
  const normalisedCategory = rawCategory ? rawCategory.toLowerCase() : null;
  const activeCategory =
    normalisedCategory && VALID_CATEGORY_SLUGS.has(normalisedCategory)
      ? normalisedCategory
      : null;

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset pagination whenever the filter changes — otherwise switching to a
  // category that has fewer posts than the current `visibleCount` would
  // render the same shorter list as before but feel "stuck".
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory]);

  const filteredPosts = useMemo(() => {
    if (activeCategory) {
      return allPosts.filter(
        (p) => (p.category ?? "").toLowerCase() === activeCategory
      );
    }
    // "All" view — return every post. The featured spotlight above is a
    // separate editorial element; the archive grid is a full listing and
    // must never silently hide a post.
    return allPosts;
  }, [allPosts, activeCategory]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = filteredPosts.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((c) => c + PAGE_SIZE);
  };

  const matchingLabel =
    (activeCategory && CATEGORY_LABELS[activeCategory]) ||
    BLOG_CATEGORIES.find((c) => c.slug === activeCategory)?.label ||
    null;

  const headingText = matchingLabel ? `${matchingLabel} essays` : "All essays";

  const totalForCategory = filteredPosts.length;
  const countLabel =
    totalForCategory === 0
      ? "No essays yet"
      : `${totalForCategory} ${totalForCategory === 1 ? "essay" : "essays"}`;

  return (
    <section
      id="more"
      className="bg-[var(--color-bg-elevated)]"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="container-editorial">
        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE_STANDARD }}
          className="mb-10"
        >
          <p
            className="eyebrow mb-4"
            style={{ color: "var(--color-accent-primary)" }}
          >
            The Archive
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10">
            <div>
              <h2
                className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)]"
                style={{
                  fontSize: "clamp(1.625rem, 2.6vw, 2.25rem)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.015em",
                  fontWeight: 500,
                }}
              >
                {headingText}
              </h2>
              <p className="mt-2 text-[0.825rem] tracking-[0.04em] text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] tabular-nums">
                {countLabel}
                <span aria-hidden className="mx-2">
                  ·
                </span>
                Sorted by date, newest first
              </p>
            </div>
            <div className="md:max-w-[60%]">
              <BlogCategoryFilter align="start" />
            </div>
          </div>
        </motion.div>

        {/* ── Hairline divider — bonds the header to the grid ─────────────── */}
        <motion.div
          aria-hidden
          className="h-px w-full bg-[rgba(11,20,38,0.12)] origin-left mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE_STANDARD }}
        />

        {/* ── Grid / empty-state — keyed by category for clean re-mount ─── */}
        <AnimatePresence mode="wait">
          {visiblePosts.length === 0 ? (
            <motion.div
              key={`empty-${activeCategory ?? "all"}`}
              className="text-center py-24 md:py-32 flex flex-col items-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: EASE_STANDARD }}
            >
              <div
                aria-hidden
                className="h-px w-12 bg-[var(--color-accent-soft)] mb-8"
              />
              <p
                className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-3"
                style={{ fontSize: "1.5rem", lineHeight: 1.3, fontWeight: 500 }}
              >
                No essays in this category yet.
              </p>
              <p className="text-[var(--color-text-body)] max-w-md mx-auto">
                Try another category, or visit{" "}
                <Link
                  href="/blog"
                  className="text-[var(--color-accent-primary)] underline-offset-4 hover:underline"
                >
                  all journal entries
                </Link>
                .
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`grid-${activeCategory ?? "all"}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 group/grid items-stretch"
              style={{ perspective: "1000px" }}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.18 } }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {visiblePosts.map((p) => (
                <BlogCard key={p._id} post={p} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {hasMore && (
          <motion.div
            className="mt-14 flex justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: EASE_STANDARD }}
          >
            <button
              type="button"
              onClick={handleLoadMore}
              className="group/cta inline-flex items-center gap-2 h-12 px-8 rounded-[2px] border border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)] hover:text-white transition-colors duration-[240ms] text-[0.95rem] tracking-wide"
            >
              Load more essays
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-[240ms] group-hover/cta:translate-x-1"
              />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: BlogPostListItem }) {
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
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
      }}
    >
      <TiltCard angle="gentle" scale={1.01} className="h-full">
        <Link
          href={`/blog/${post.slug}`}
          className="group/card relative h-full flex flex-col bg-white border border-[rgba(11,20,38,0.10)] hover:border-transparent transition-[border-color,box-shadow] duration-300 ease-out hover:shadow-[0_24px_48px_-24px_rgba(11,20,38,0.18)]"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-bg-elevated)]">
            {post.thumbnail?.asset && (
              <Image
                src={urlFor(post.thumbnail).width(800).height(450).url()}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                placeholder={post.thumbnail.metadata?.lqip ? "blur" : "empty"}
                blurDataURL={post.thumbnail.metadata?.lqip}
                className="object-cover object-center transition-transform duration-[600ms] ease-out group-hover/card:scale-[1.04]"
              />
            )}
          </div>

          {/* Sequential Electric Blue border draw on hover */}
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
            <span className="inline-flex items-center gap-2 text-[var(--color-accent-primary)] text-[0.85rem] font-medium">
              Read
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-[240ms] group-hover/card:translate-x-1"
              />
            </span>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}
