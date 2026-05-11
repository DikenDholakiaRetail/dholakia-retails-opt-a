import type { Metadata } from "next";
import { Suspense } from "react";
import ContactHero from "@/components/contact/ContactHero";
import RoutingCards from "@/components/contact/RoutingCards";
import CorporateContactDetails from "@/components/contact/CorporateContactDetails";
import InquiryForm from "@/components/contact/InquiryForm";
import ClosingStatement from "@/components/contact/ClosingStatement";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Partnership, press, careers, or future brand development — write to us, and the right desk will respond.",
};

/**
 * Page 12 — Contact (`/contact`).
 * Per spec §P12: Contact and Careers are now SPLIT into distinct pages.
 *   S01 Hero
 *   S02 Inquiry Routing (4-card grid → pre-fills form via ?type=…)
 *   S03 Corporate Contact Details
 *   S04 Inquiry Form (Sanity-backed)
 *   S05 Closing Statement (direct emails)
 */
export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <RoutingCards />
      <CorporateContactDetails />
      <Suspense fallback={null}>
        <InquiryForm />
      </Suspense>
      <ClosingStatement />
    </>
  );
}
