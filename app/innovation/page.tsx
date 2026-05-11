import type { Metadata } from "next";
import InnovationHero from "@/components/innovation/InnovationHero";
import LGDStory from "@/components/innovation/LGDStory";
import ProcessFlowchart from "@/components/innovation/ProcessFlowchart";
import QualityRelevance from "@/components/innovation/QualityRelevance";
import PageClosingBand from "@/components/cta/PageClosingBand";

export const metadata: Metadata = {
  title: "Innovation",
  description:
    "Innovation makes luxury more consistent, more scalable, and more relevant to the next generation of consumers.",
};

/**
 * Page 7 — Innovation (`/innovation`).
 * Spec P07-S01..S05:
 *   S01 Hero — Precision Is the New Luxury (Hero3LayerParallax + cursor-reveal)
 *   S02 Lab-Grown Diamond Story — split-screen 60/40 (CursorPerspective on left)
 *   S03 Process Explainer — 5-step flowchart with SVG connector (Card3DTilt 2°)
 *   S04 Quality & Relevance — editorial band on Off-White
 *   S05 CTA — PageClosingBand
 */
export default function InnovationPage() {
  return (
    <>
      <InnovationHero />
      <LGDStory />
      <ProcessFlowchart />
      <QualityRelevance />
      <PageClosingBand
        heading="Explore the wider Dholakia approach."
        body="See how innovation, sustainability, and craft intersect across the corporate platform."
        ctaLabel="Explore the wider approach"
        ctaHref="/the-group"
        variant="navy"
      />
    </>
  );
}
