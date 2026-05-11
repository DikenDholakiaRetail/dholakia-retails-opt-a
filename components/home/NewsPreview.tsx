import { getPosts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import NewsPreviewClient, { type NewsCardItem } from "./NewsPreviewClient";

/**
 * P01-S08 News / Press Preview — server shell.
 *
 * Fetches the latest 3 posts from Sanity (descending by publishedAt) and
 * hands them to <NewsPreviewClient/>. When the CMS has nothing yet we send
 * three on-brand "Coming Soon" placeholders instead, so the section never
 * renders empty or broken on a fresh deploy.
 *
 * The query layer (`getPosts`) already returns `[]` on Sanity outage, so this
 * component degrades safely without an extra try/catch.
 */

const PLACEHOLDER_ITEMS: NewsCardItem[] = [
  {
    kind: "placeholder",
    id: "soon-1",
    title: "New stories from the house are arriving soon.",
    hue: "#2a3552",
  },
  {
    kind: "placeholder",
    id: "soon-2",
    title: "Editorial updates and announcements in progress.",
    hue: "#08203D",
  },
  {
    kind: "placeholder",
    id: "soon-3",
    title: "Insights, launches, and milestones coming shortly.",
    hue: "#14275C",
  },
];

export default async function NewsPreview() {
  const posts = await getPosts({ limit: 3 });

  const items: NewsCardItem[] =
    posts.length > 0
      ? posts.map((p) => ({
          kind: "real" as const,
          slug: p.slug,
          category: p.category?.title ?? "Editorial",
          date: new Date(p.publishedAt).toLocaleDateString("en-GB", {
            month: "short",
            year: "numeric",
          }),
          title: p.title,
          excerpt: p.excerpt,
          thumbnail: p.thumbnail?.asset
            ? {
                url: urlFor(p.thumbnail).width(1600).height(900).url(),
                alt: p.thumbnail.alt ?? p.title,
                lqip: p.thumbnail.metadata?.lqip,
              }
            : undefined,
        }))
      : PLACEHOLDER_ITEMS;

  return <NewsPreviewClient items={items} />;
}
