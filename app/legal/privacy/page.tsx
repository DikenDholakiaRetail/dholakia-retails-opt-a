import type { Metadata } from "next";
import PageTheme from "@/components/PageTheme";
import LegalHero from "@/components/legal/LegalHero";
import LegalDocumentBody from "@/components/legal/LegalDocumentBody";
import LegalCloser from "@/components/legal/LegalCloser";
import {
  LEGAL_LAST_UPDATED,
  PRIVACY_LEAD,
  PRIVACY_SECTIONS,
} from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Dholakia Retail collects, uses, and protects your personal data — and the rights you retain over it.",
};

/**
 * Page 14 — Privacy Policy (`/legal/privacy`).
 * Spec P14-S01..S03:
 *   S01 Legal Hero — eyebrow, H1, last-updated, lead, hairline rule
 *   S02 Policy Body — sticky TOC + 6 numbered sections
 *   S03 Legal Closer — Data Protection Officer mailto
 */
export default function PrivacyPage() {
  return (
    <>
      <PageTheme value="light" />
      <LegalHero
        title="Privacy Policy"
        lastUpdated={LEGAL_LAST_UPDATED}
        lead={PRIVACY_LEAD}
      />
      <LegalDocumentBody sections={PRIVACY_SECTIONS} />
      <LegalCloser
        heading="Questions about your data?"
        body="Reach the Data Protection Officer directly. We commit to a 30-day response window for any privacy-related inquiry."
        primaryLabel="Contact privacy@dholakiaretail.com"
        primaryHref="mailto:privacy@dholakiaretail.com"
      />
    </>
  );
}
