import type { Metadata } from "next";
import NewsroomHero from "@/components/news/NewsroomHero";
import NewsroomShell from "@/components/news/NewsroomShell";
import PressKitCTA from "@/components/news/PressKitCTA";
import EmptyState from "@/components/news/EmptyState";
import { getCategories, getFeaturedPost, getPosts } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/env";

// Force per-request rendering — see /app/blog/page.tsx for rationale.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "A space for company updates, brand launches, sustainability narratives, leadership perspectives, and press resources.",
};

/**
 * Page 9 — Newsroom (`/news`).
 *
 * Filtering is fully client-side (see <NewsroomShell/>). The server fetches
 * all news posts up to a generous limit, the categories list, and the
 * editorial featured post. The shell reads category/year/q from
 * useSearchParams() and applies them in a useMemo so filter swaps are
 * instant — sidesteps the Router Cache that previously caused "switch back
 * to All and the list is stale" symptoms.
 */
export default async function NewsroomPage() {
  if (!isSanityConfigured) {
    return (
      <>
        <NewsroomHero />
        <EmptyState
          title="Newsroom is awaiting CMS configuration"
          body="Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local and reload — content will appear automatically."
        />
        <PressKitCTA />
      </>
    );
  }

  const [categories, featured, allPosts] = await Promise.all([
    getCategories(),
    getFeaturedPost(),
    getPosts({ limit: 200 }),
  ]);

  return (
    <>
      <NewsroomHero />
      <NewsroomShell
        categories={categories}
        allPosts={allPosts}
        featured={featured}
      />
      <PressKitCTA />
    </>
  );
}
