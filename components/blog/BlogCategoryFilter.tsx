"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { EASE_STANDARD } from "@/lib/motion";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";

/**
 * P18-S03 Categories Filter — horizontal pill row, URL-synced.
 * Pure CSS pills (no magnetic). Pills fade-in stagger 60ms.
 *
 * Visual states:
 *   • Default: white fill, transparent border. Numeric type kept tight.
 *   • Hover  : Electric Blue 1px border, subtle 4% wash, type lifts -1px.
 *   • Active : Electric Blue fill + white type + 0 8px 24px navy/12% lift.
 *
 * `align` controls flexbox justification — defaults to "start" so the row
 * sits flush with the editorial container's left edge (matching the grid).
 */
export default function BlogCategoryFilter({
  align = "start",
}: {
  align?: "start" | "center" | "end";
}) {
  const pathname = usePathname();
  const params = useSearchParams();
  const active = params.get("category");

  const buildHref = (slug: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (slug) next.set("category", slug);
    else next.delete("category");
    next.delete("cursor"); // reset pagination on category change
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  const ALL: { slug: string | null; label: string }[] = [
    { slug: null, label: "All" },
    ...BLOG_CATEGORIES.map((c) => ({ slug: c.slug, label: c.label })),
  ];

  const justify =
    align === "center"
      ? "justify-center"
      : align === "end"
        ? "justify-end"
        : "justify-start";

  return (
    <motion.nav
      aria-label="Blog categories"
      className={`flex flex-wrap items-center gap-2 ${justify}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } },
      }}
    >
      {ALL.map((c) => {
        const isActive = (c.slug ?? null) === (active ?? null);
        return (
          <motion.div
            key={c.slug ?? "all"}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: EASE_STANDARD },
              },
            }}
          >
            <Link
              href={buildHref(c.slug)}
              aria-pressed={isActive}
              className={[
                "group/pill inline-flex items-center px-5 h-10 rounded-full text-[0.825rem] tracking-wide border transition-[background-color,color,border-color,box-shadow,transform] duration-[240ms] ease-out",
                isActive
                  ? "bg-[var(--color-accent-primary)] text-white border-[var(--color-accent-primary)] shadow-[0_8px_24px_-12px_rgba(11,20,38,0.40)]"
                  : "bg-white text-[var(--color-text-primary)] border-[rgba(11,20,38,0.10)] hover:border-[var(--color-accent-primary)] hover:bg-[rgba(59,111,255,0.04)] hover:-translate-y-[1px]",
              ].join(" ")}
            >
              {c.label}
            </Link>
          </motion.div>
        );
      })}
    </motion.nav>
  );
}
