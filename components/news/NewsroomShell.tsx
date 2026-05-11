"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import StickyFilterBar from "./StickyFilterBar";
import CategoryFilter from "./CategoryFilter";
import FeaturedStory from "./FeaturedStory";
import ArticleGrid from "./ArticleGrid";
import EmptyState from "./EmptyState";
import { EASE_STANDARD } from "@/lib/motion";
import type { Category, PostListItem } from "@/sanity/lib/queries";

/**
 * Newsroom shell — owns the filter UX and conditional sections.
 *
 * Why client-side: the previous server-rendered approach used `searchParams`
 * + `<Link>` navigation. Next.js's Router Cache reused the prior RSC payload
 * when only the query string changed (worst when returning to `/news` from
 * a category — same pathname, fewer params), producing "switch back to All
 * and the list is wrong" symptoms. Filtering in a `useMemo` driven by
 * `useSearchParams()` makes filter swaps instant and side-steps the cache.
 *
 * Filters applied (case-insensitive where relevant):
 *   • category — exact slug match against `post.category?.slug`
 *   • year     — `publishedAt` starts with the year string
 *   • q        — substring match on title or excerpt
 *
 * The featured story slot only renders when NO filter is active. When the
 * featured slot is active, its post is excluded from the grid below to avoid
 * duplication — unless excluding it would empty the grid (e.g. featured is
 * the only post), in which case it stays so the page is never misleadingly
 * empty.
 *
 * Animation: the filtered grid is keyed by the active filter signature so
 * AnimatePresence + framer-motion stagger reveal fires fresh on each filter
 * change. No flash of empty state, no skeleton needed.
 */
export default function NewsroomShell({
  categories,
  allPosts,
  featured,
}: {
  categories: Category[];
  allPosts: PostListItem[];
  featured: PostListItem | null;
}) {
  const params = useSearchParams();
  const category = params.get("category");
  const year = params.get("year");
  const q = (params.get("q") ?? "").trim().toLowerCase();

  const hasFilter = Boolean(category || year || q);

  const filtered = useMemo(() => {
    let posts = allPosts;
    if (category) {
      const c = category.toLowerCase();
      posts = posts.filter((p) => (p.category?.slug ?? "").toLowerCase() === c);
    }
    if (year) {
      posts = posts.filter((p) => p.publishedAt?.startsWith(year));
    }
    if (q) {
      posts = posts.filter((p) => {
        const title = (p.title ?? "").toLowerCase();
        const excerpt = (p.excerpt ?? "").toLowerCase();
        return title.includes(q) || excerpt.includes(q);
      });
    }
    return posts;
  }, [allPosts, category, year, q]);

  // Featured spotlight only when unfiltered — same rule as before.
  const showFeatured = !hasFilter && !!featured;

  // When the featured spotlight renders, hide it from the grid so the same
  // post doesn't appear twice. If hiding it would leave the grid empty
  // (e.g. featured is the only post), keep it in so the page never reads
  // as "no content" while a post is sitting right there.
  const gridPosts = useMemo(() => {
    if (!showFeatured || !featured) return filtered;
    const withoutFeatured = filtered.filter((p) => p._id !== featured._id);
    return withoutFeatured.length > 0 ? withoutFeatured : filtered;
  }, [filtered, showFeatured, featured]);

  const hasContent = showFeatured || gridPosts.length > 0;

  // Stable key for the section block so AnimatePresence treats each filter
  // combination as a fresh mount.
  const stateKey = `${category ?? "all"}|${year ?? "all"}|${q || "noq"}`;

  return (
    <>
      <StickyFilterBar>
        <CategoryFilter categories={categories} />
      </StickyFilterBar>

      <AnimatePresence mode="wait">
        {!hasContent ? (
          <motion.div
            key={`empty-${stateKey}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: EASE_STANDARD }}
          >
            <EmptyState
              title="No stories match those filters."
              body="Try a different category or year, or clear the filters to see everything."
            />
          </motion.div>
        ) : (
          <motion.div
            key={`content-${stateKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.25, ease: EASE_STANDARD } }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
          >
            {showFeatured && featured && <FeaturedStory post={featured} />}
            {gridPosts.length > 0 && <ArticleGrid posts={gridPosts} />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
