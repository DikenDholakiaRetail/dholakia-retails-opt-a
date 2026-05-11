import type { Metadata } from "next";
import PageTheme from "@/components/PageTheme";
import LegalHero from "@/components/legal/LegalHero";
import LegalDocumentBody from "@/components/legal/LegalDocumentBody";
import LegalCloser from "@/components/legal/LegalCloser";
import CookieInventoryTable from "@/components/legal/CookieInventoryTable";
import {
  LEGAL_LAST_UPDATED,
  COOKIES_LEAD,
  COOKIES_SECTIONS,
  COOKIE_INVENTORY,
} from "@/lib/legal-content";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Which cookies dholakiaretail.com uses, what they do, and how you can manage your consent.",
};

/**
 * Page 16 — Cookie Policy (`/legal/cookies`).
 * Spec P16-S01..S03 — adds the cookie inventory table after Section 2.
 * Closer routes to Cookie Settings panel via `open-cookie-settings` window event,
 * picked up by the consent banner library.
 */
export default function CookiesPage() {
  return (
    <>
      <PageTheme value="light" />
      <LegalHero
        title="Cookie Policy"
        lastUpdated={LEGAL_LAST_UPDATED}
        lead={COOKIES_LEAD}
      />
      <LegalDocumentBody
        sections={COOKIES_SECTIONS}
        afterSection={{
          id: 2,
          node: <CookieInventoryTable rows={COOKIE_INVENTORY} />,
        }}
      />
      <LegalCloser
        heading="Manage your cookie preferences."
        body="Update your consent at any time. Changes apply immediately and persist across sessions on this device."
        primaryLabel="Open Cookie Settings"
        primaryAction="open-cookie-settings"
        variant="cookies"
      />
    </>
  );
}
