import type { ReactNode } from "react";
import type { LegalSection } from "@/components/legal/LegalDocumentBody";

/**
 * Locked legal copy from spec §P14, §P15, §P16, §P17.
 * Edit only when legal team approves changes; same `lastUpdated` stamp used everywhere.
 */

export const LEGAL_LAST_UPDATED = "14 March 2026";

const p = (...children: ReactNode[]): ReactNode => <p>{children}</p>;

export const PRIVACY_LEAD =
  "Dholakia Retail Private Limited respects the privacy of every visitor to dholakiaretail.com. This document explains what we collect, why we collect it, how we use it, and the rights you retain over your personal data.";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "information-we-collect",
    number: 1,
    heading: "1. Information we collect",
    body: p(
      "We collect information you provide directly (such as your name, email, organisation, and inquiry message via the contact form), information collected automatically (IP address, device, browser, page-level analytics), and information from third parties (where you choose to authenticate via LinkedIn or share content)."
    ),
  },
  {
    id: "how-we-use-your-information",
    number: 2,
    heading: "2. How we use your information",
    body: p(
      "Personal data is used solely to respond to your inquiries, process partnership or career applications, send opt-in newsletters, improve site performance, and meet legal obligations. We do not sell, rent, or share your personal data with advertisers."
    ),
  },
  {
    id: "cookies-and-analytics",
    number: 3,
    heading: "3. Cookies and analytics",
    body: p(
      "Refer to the Cookie Policy for full details. In summary: essential cookies always run; analytics and preference cookies require your consent via the cookie banner."
    ),
  },
  {
    id: "data-retention",
    number: 4,
    heading: "4. Data retention",
    body: p(
      "Inquiry records are retained for 36 months from last contact; analytics data for 26 months; newsletter subscriptions until you unsubscribe. Records may be retained longer where law requires."
    ),
  },
  {
    id: "your-rights",
    number: 5,
    heading: "5. Your rights",
    body: (
      <p>
        You may request access, correction, deletion, or export of your personal data, or
        object to specific processing. Email{" "}
        <a
          href="mailto:privacy@dholakiaretail.com"
          className="text-[var(--color-accent-primary)] hover:text-[var(--color-accent-deep)] underline-offset-4 hover:underline"
        >
          privacy@dholakiaretail.com
        </a>{" "}
        — we respond within 30 days.
      </p>
    ),
  },
  {
    id: "contact",
    number: 6,
    heading: "6. Contact",
    body: (
      <p>
        Data Protection Officer · Dholakia Retail Private Limited · Dholakia Ventures, Plot No. D-02 and D-11, Gem & Jewellery Park, GHB, Ichchhapor, Surat, Gujarat 394510, India ·{" "}
        <a
          href="mailto:privacy@dholakiaretail.com"
          className="text-[var(--color-accent-primary)] hover:text-[var(--color-accent-deep)] underline-offset-4 hover:underline"
        >
          privacy@dholakiaretail.com
        </a>
      </p>
    ),
  },
];

export const TERMS_LEAD =
  "These terms govern your use of dholakiaretail.com. By accessing the site you accept these terms. If you do not accept them, please discontinue use.";

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "acceptance-of-terms",
    number: 1,
    heading: "1. Acceptance of terms",
    body: p(
      "By accessing or using dholakiaretail.com you agree to be bound by these Terms & Conditions and by all applicable laws and regulations. If you disagree with any of these terms, you are prohibited from using or accessing this site."
    ),
  },
  {
    id: "use-license",
    number: 2,
    heading: "2. Use license",
    body: p(
      "Permission is granted to view and download materials from this site for personal, non-commercial reference only. This license does not grant ownership and may be terminated at any time."
    ),
  },
  {
    id: "intellectual-property",
    number: 3,
    heading: "3. Intellectual property",
    body: p(
      "All content, brand marks (including 'Dholakia Retail' and 'Mayavé'), logos, photography, copy, and designs are the intellectual property of Dholakia Retail Private Limited and protected under Indian and international copyright and trademark law. Unauthorised reproduction is prohibited."
    ),
  },
  {
    id: "disclaimer",
    number: 4,
    heading: "4. Disclaimer",
    body: p(
      "Materials on this site are provided 'as is'. Dholakia Retail makes no warranties, expressed or implied, regarding accuracy, completeness, or fitness for purpose. Refer to the Disclaimer document for full terms."
    ),
  },
  {
    id: "limitations",
    number: 5,
    heading: "5. Limitations",
    body: p(
      "In no event shall Dholakia Retail or its affiliates be liable for damages (including loss of data, business interruption, or profit) arising from use or inability to use this site, even if Dholakia Retail has been notified of the possibility of such damage."
    ),
  },
  {
    id: "governing-law",
    number: 6,
    heading: "6. Governing law",
    body: p(
      "These terms are governed by the laws of India. Any disputes are subject to the exclusive jurisdiction of the courts of Surat, Gujarat."
    ),
  },
];

export const COOKIES_LEAD =
  "Cookies are small text files placed on your device when you visit a website. This page explains which cookies dholakiaretail.com uses, what they do, and how you can manage your consent.";

export const COOKIES_SECTIONS: LegalSection[] = [
  {
    id: "what-are-cookies",
    number: 1,
    heading: "1. What are cookies?",
    body: p(
      "Cookies are small text files stored by your browser when you visit a site. They allow sites to remember information about your visit — preferences, login state, analytics — across pages and sessions."
    ),
  },
  {
    id: "cookies-we-use",
    number: 2,
    heading: "2. Cookies we use",
    body: p(
      "We use four categories: essential cookies (required for site function — e.g. session, CSRF token), preference cookies (e.g. language toggle), analytics cookies (e.g. PostHog, anonymised), and marketing cookies (none currently active)."
    ),
  },
  {
    id: "managing-your-consent",
    number: 3,
    heading: "3. Managing your consent",
    body: p(
      "On your first visit, a cookie consent banner offers Accept All / Reject All / Customise. You can revisit your preferences any time via the Cookie Settings link in the footer."
    ),
  },
  {
    id: "third-party-cookies",
    number: 4,
    heading: "4. Third-party cookies",
    body: p(
      "Some embedded content (such as YouTube video players or Vimeo embeds) may set their own cookies when you interact with them. These are governed by the third party's policy and are loaded only when you engage with that content."
    ),
  },
];

export type CookieRecord = {
  name: string;
  category: "Essential" | "Preference" | "Analytics" | "Marketing";
  purpose: string;
  duration: string;
};

export const COOKIE_INVENTORY: CookieRecord[] = [
  {
    name: "session",
    category: "Essential",
    purpose: "Maintains your session across pages.",
    duration: "Session",
  },
  {
    name: "csrf-token",
    category: "Essential",
    purpose: "Protects forms against cross-site request forgery.",
    duration: "Session",
  },
  {
    name: "cookie-consent",
    category: "Essential",
    purpose: "Remembers your cookie consent choices.",
    duration: "12 months",
  },
  {
    name: "lang",
    category: "Preference",
    purpose: "Stores language preference.",
    duration: "12 months",
  },
  {
    name: "ph_*",
    category: "Analytics",
    purpose: "PostHog anonymised page-level analytics (consent-gated).",
    duration: "26 months",
  },
];

export const DISCLAIMER_LEAD =
  "The following disclaimers govern the use of information presented on this site. Read each section carefully before relying on any content.";

export const DISCLAIMER_SECTIONS: LegalSection[] = [
  {
    id: "general-disclaimer",
    number: 1,
    heading: "1. General disclaimer",
    body: p(
      "The information on this site is provided in good faith for general informational purposes only. Dholakia Retail Private Limited makes no representations or warranties, expressed or implied, about the completeness, accuracy, reliability, suitability, or availability of any information, products, services, or related graphics."
    ),
  },
  {
    id: "external-links",
    number: 2,
    heading: "2. External links",
    body: p(
      "This site may contain links to external websites that are not under our control. The inclusion of such links does not imply endorsement of the views expressed therein. Dholakia Retail is not responsible for the content of external sites."
    ),
  },
  {
    id: "forward-looking-statements",
    number: 3,
    heading: "3. Forward-looking statements",
    body: p(
      "Sustainability targets, product launch timelines, and roadmap items reflect current plans and assumptions. Actual outcomes may differ. Investors and partners should not rely solely on forward-looking statements when making decisions."
    ),
  },
  {
    id: "professional-advice",
    number: 4,
    heading: "4. Professional advice",
    body: p(
      "Information presented on this site does not constitute professional, legal, financial, or investment advice. For advice on any matter, please consult a qualified professional."
    ),
  },
];
