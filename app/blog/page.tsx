import type { Metadata } from "next";
import JournalHero from "@/components/blog/JournalHero";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogGrid from "@/components/blog/BlogGrid";
import SubscribeBand from "@/components/blog/SubscribeBand";
import { getBlogPosts, getFeaturedBlogPost } from "@/sanity/lib/queries";

// Route-level dynamic rendering. Combined with `cache: "no-store"` on the
// Sanity fetches and `useCdn: false` on the Sanity client, this guarantees
// every request reads the latest published content with no stale layer
// anywhere along the path.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Long-form writing on craft, materials, philosophy, and the people behind Dholakia Retail's work.",
};

/**
 * Page 18 — Blog (`/blog`).
 *
 * Filtering is fully client-side. Reasons:
 *   • The Next.js Router Cache aggressively reuses RSC payloads when only
 *     searchParams change, which produced "click pill → no update without
 *     refresh" symptoms on this page.
 *   • In-memory filtering on a moderate dataset is faster than the
 *     navigation+RSC round-trip and removes any race-condition surface.
 *   • Pagination is also client-side (slice growth via state) — the URL no
 *     longer needs ?cursor= because there is no server filter to coordinate.
 *
 * Server-side here:
 *   • Fetch the editorial Featured Post (rendered above the grid).
 *   • Fetch up to 200 posts in publish-date desc order.
 * The 200 ceiling is generous for a quarterly journal; revisit only when
 * the archive grows past it.
 */
export default async function BlogPage() {
  const [featured, allPosts] = await Promise.all([
    getFeaturedBlogPost(),
    getBlogPosts({ limit: 200 }),
  ]);

  return (
    <>
      <JournalHero />
      {featured && <FeaturedPost post={featured} />}

      <BlogGrid allPosts={allPosts} />

      <SubscribeBand />
    </>
  );
}
