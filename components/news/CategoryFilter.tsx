"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { EASE_STANDARD } from "@/lib/motion";
import type { Category } from "@/sanity/lib/queries";

/**
 * P09-S02 Categories — horizontal pill row, URL-synced via searchParams.
 * Active state: Electric Blue fill + white type. Hover: 1px Electric Blue border.
 * Pure CSS hover-fill (no magnetic). Pills fade-in stagger 60ms.
 *
 * Includes year dropdown + search input per spec §P09-S01 filter row.
 */

const SPEC_CATEGORIES = [
  "Company Updates",
  "Brand Launches",
  "Sustainability",
  "Leadership",
  "Press Resources",
];

export default function CategoryFilter({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const active = params.get("category");
  const activeYear = params.get("year");

  const buildHref = (slug: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (slug) next.set("category", slug);
    else next.delete("category");
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  // Show CMS-driven categories; fall back to spec list if none configured yet.
  const cmsList = categories
    .filter((c) => Boolean(c.slug))
    .map((c) => ({ _id: c._id, title: c.title, slug: c.slug as string }));
  const fallback = SPEC_CATEGORIES.map((title) => ({
    _id: title,
    title,
    slug: title.toLowerCase().replace(/\s+/g, "-"),
  }));
  const list = cmsList.length > 0 ? cmsList : fallback;

  const ALL: { _id: string; title: string; slug: string | null }[] = [
    { _id: "all", title: "All", slug: null },
    ...list,
  ];

  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
      {/* Pill row */}
      <motion.div
        className="flex flex-wrap items-center gap-2"
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
              key={c._id}
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
                  "inline-flex items-center px-5 h-10 rounded-full text-[0.825rem] tracking-wide border transition-[background-color,color,border-color] duration-[240ms]",
                  isActive
                    ? "bg-[var(--color-accent-primary)] text-white border-[var(--color-accent-primary)]"
                    : "bg-white text-[var(--color-text-primary)] border-transparent hover:border-[var(--color-accent-primary)]",
                ].join(" ")}
              >
                {c.title}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Right cluster — year dropdown + search */}
      <div className="flex items-center gap-3 lg:ml-auto w-full lg:w-auto">
        <YearDropdown years={years} active={activeYear} />
        <SearchInput initialQ={params.get("q") ?? ""} />
      </div>
    </div>
  );
}

function YearDropdown({
  years,
  active,
}: {
  years: number[];
  active: string | null;
}) {
  const pathname = usePathname();
  const params = useSearchParams();

  return (
    <form method="get" action={pathname} className="relative">
      {Array.from(params.entries()).map(([k, v]) =>
        k === "year" ? null : <input key={k} type="hidden" name={k} value={v} />
      )}
      <select
        name="year"
        defaultValue={active ?? ""}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        aria-label="Filter by year"
        className="appearance-none bg-white border border-black/10 hover:border-[var(--color-accent-primary)] focus:border-[var(--color-accent-primary)] outline-none h-10 pl-4 pr-10 rounded-full text-[0.825rem] text-[var(--color-text-primary)] cursor-pointer transition-colors duration-[240ms]"
      >
        <option value="">All years</option>
        {years.map((y) => (
          <option key={y} value={String(y)}>
            {y}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        strokeWidth={1.5}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
      />
    </form>
  );
}

function SearchInput({ initialQ }: { initialQ: string }) {
  const pathname = usePathname();
  const params = useSearchParams();
  return (
    <form
      method="get"
      action={pathname}
      className="flex-1 lg:flex-initial flex items-center gap-2 h-10 pl-3 pr-1 rounded-full border border-black/10 focus-within:border-[var(--color-accent-primary)] transition-colors duration-[240ms] bg-white min-w-[200px]"
    >
      {Array.from(params.entries()).map(([k, v]) =>
        k === "q" ? null : <input key={k} type="hidden" name={k} value={v} />
      )}
      <Search size={20} strokeWidth={1.5} className="text-[var(--color-text-muted)]" />
      <input
        type="search"
        name="q"
        defaultValue={initialQ}
        placeholder="Search"
        aria-label="Search news"
        className="flex-1 bg-transparent outline-none text-[0.875rem] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
      />
    </form>
  );
}
