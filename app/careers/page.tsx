import type { Metadata } from "next";
import CareersHero from "@/components/careers/CareersHero";
import CulturePillars from "@/components/careers/CulturePillars";
import FunctionsGrid from "@/components/careers/FunctionsGrid";
import OpenRoles from "@/components/careers/OpenRoles";
import CareersCloser from "@/components/careers/CareersCloser";
import { getCareers } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "We hire people who care about craft, who think clearly, and who treat the discipline of luxury as a long-term commitment.",
};

export const revalidate = 60;

const VALID_FUNCTIONS = new Set([
  "design",
  "brand",
  "merchandising",
  "retail",
  "operations",
  "corporate",
]);

type SearchParams = { function?: string };

/**
 * Page 10 — Careers (`/careers`).
 * Spec P10-S01..S04 + dynamic open-roles list (Sanity-backed).
 * Supports `?function=…` query-param filter (linked from FunctionsGrid tiles).
 * Each role card on the listing routes to `/careers/[slug]` (proper dynamic
 * routing — no hash navigation).
 */
export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { function: fnParam } = await searchParams;
  const fn = fnParam && VALID_FUNCTIONS.has(fnParam) ? fnParam : undefined;

  const roles = await getCareers({ functionArea: fn, limit: 50 });

  return (
    <>
      <CareersHero />
      <CulturePillars />
      <FunctionsGrid />
      <OpenRoles roles={roles} activeFunction={fn} />
      <CareersCloser />
    </>
  );
}
