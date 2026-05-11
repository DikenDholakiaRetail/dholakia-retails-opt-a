import type { Metadata } from "next";
import PageTheme from "@/components/PageTheme";
import LegalHero from "@/components/legal/LegalHero";
import LegalCloser from "@/components/legal/LegalCloser";
import DisclaimerBody from "@/components/legal/DisclaimerBody";
import {
  LEGAL_LAST_UPDATED,
  DISCLAIMER_LEAD,
  DISCLAIMER_SECTIONS,
} from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclaimers governing the use of information presented on dholakiaretail.com.",
};

/**
 * Page 17 — Disclaimer (`/legal/disclaimer`).
 * Spec P17-S01..S02:
 *   S01 Combined hero + body (no sticky TOC — document is short)
 *   S02 Legal closer routing to ir@dholakiaretail.com
 */
export default function DisclaimerPage() {
  return (
    <>
      <PageTheme value="light" />
      <LegalHero
        title="Disclaimer"
        lastUpdated={LEGAL_LAST_UPDATED}
        lead={DISCLAIMER_LEAD}
        compact
      />
      <DisclaimerBody sections={DISCLAIMER_SECTIONS} />
      <LegalCloser
        heading="Questions about specific statements?"
        body="For inquiries about forward-looking statements, investor materials, or any other content, reach our investor relations or legal team."
        primaryLabel="Contact ir@dholakiaretail.com"
        primaryHref="mailto:ir@dholakiaretail.com"
      />
    </>
  );
}
