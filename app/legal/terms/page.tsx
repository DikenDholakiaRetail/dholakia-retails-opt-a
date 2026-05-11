import type { Metadata } from "next";
import PageTheme from "@/components/PageTheme";
import LegalHero from "@/components/legal/LegalHero";
import LegalDocumentBody from "@/components/legal/LegalDocumentBody";
import LegalCloser from "@/components/legal/LegalCloser";
import {
  LEGAL_LAST_UPDATED,
  TERMS_LEAD,
  TERMS_SECTIONS,
} from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions that govern your use of dholakiaretail.com.",
};

/**
 * Page 15 — Terms & Conditions (`/legal/terms`).
 * Spec P15-S01..S03 — reuses the same Legal* shell with Terms-specific copy.
 */
export default function TermsPage() {
  return (
    <>
      <PageTheme value="light" />
      <LegalHero
        title="Terms & Conditions"
        lastUpdated={LEGAL_LAST_UPDATED}
        lead={TERMS_LEAD}
      />
      <LegalDocumentBody sections={TERMS_SECTIONS} />
      <LegalCloser
        heading="Questions about these terms?"
        body="For clarifications regarding our terms of service, partnership agreements, or commercial use, contact our legal team directly."
        primaryLabel="Contact legal@dholakiaretail.com"
        primaryHref="mailto:legal@dholakiaretail.com"
      />
    </>
  );
}
