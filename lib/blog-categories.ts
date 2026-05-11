/**
 * P18-S03 Categories — locked spec list of 6.
 * URL filter pattern: /blog?category=craft
 */
export const BLOG_CATEGORIES = [
  { slug: "craft", label: "Craft" },
  { slug: "materials", label: "Materials" },
  { slug: "philosophy", label: "Philosophy" },
  { slug: "conversations", label: "Conversations" },
  { slug: "atelier", label: "Atelier" },
  { slug: "sustainability", label: "Sustainability" },
] as const;

export const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  BLOG_CATEGORIES.map((c) => [c.slug, c.label])
);

export const VALID_CATEGORY_SLUGS: Set<string> = new Set(
  BLOG_CATEGORIES.map((c) => c.slug)
);
