import Image from "next/image";
import Link from "next/link";
import {
  FOOTER_NAV,
  COMPANY,
  COMPLIANCE,
  SOCIAL_LINKS,
  LEGAL_LINKS,
} from "@/lib/nav";

/**
 * Global Footer — spec §1.9.
 * Inverted Deep Navy slab (#0A0E1F). Four hairline-separated blocks:
 *   1. Brand + 4-col link grid
 *   2. Corporate Identity (CIN + Registered Office)
 *   3. Compliance badges
 *   4. Copyright + legal links
 * Foundation: max-width 1440px · 80/48/24px h-padding · 96px top / 32px bottom.
 * Server Component (static markup, no client interactivity needed).
 */

const LinkedinIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const SOCIAL_ICONS: Record<string, () => React.JSX.Element> = {
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
};

const COLUMNS = [
  { title: "The Group", links: FOOTER_NAV.group },
  { title: "Brands", links: FOOTER_NAV.brands },
  { title: "Responsibility", links: FOOTER_NAV.responsibility },
  { title: "Contact", links: FOOTER_NAV.contact },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--footer-bg)",
        color: "var(--footer-text-primary)",
      }}
    >
      <div
        className="px-6 md:px-12 lg:px-20"
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          paddingTop: "96px",
          paddingBottom: "32px",
        }}
      >
        {/* Block 1 — Brand + Navigation (asymmetric 30/70 split, 64px gap) */}
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[3fr_7fr]">
          <div className="flex flex-col items-start">
            {/* Logo wordmark — white-ink variant on the inverted Deep-Navy
                footer slab (spec §1.9). */}
            <Image
              src="/brand/dr-logo/dr_logo_dark.svg"
              alt="Dholakia Retail"
              width={150}
              height={36}
              style={{
                height: "32px",
                width: "auto",
              }}
            />

            {/* Tagline — max 320px, 15px regular, line-height 1.55 */}
            <p
              style={{
                marginTop: "24px",
                maxWidth: "320px",
                fontSize: "15px",
                lineHeight: 1.55,
                color: "var(--footer-text-muted)",
                fontWeight: 400,
              }}
            >
              The corporate foundation for a portfolio of luxury jewellery
              brands. Headquartered in Surat. Built for long-term relevance.
            </p>

            {/* Social cluster — 28px below tagline, 36px circular outlined */}
            <div
              style={{ marginTop: "28px" }}
              className="flex items-center gap-3"
            >
              {SOCIAL_LINKS.map(({ label, href }) => {
                const Icon = SOCIAL_ICONS[label];
                if (!Icon) return null;
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="footer-social inline-flex items-center justify-center transition-[border-color,background-color] duration-150 ease-out"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border:
                        "1px solid var(--footer-border-subtle)",
                      borderColor: "rgba(42, 53, 72, 0.5)",
                      color: "var(--footer-text-primary)",
                    }}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns — 4-col equal widths, 32px gutter (spec §1.9) */}
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ columnGap: "32px", rowGap: "40px" }}
          >
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--footer-accent)",
                    marginBottom: "24px",
                  }}
                >
                  {col.title}
                </h4>
                <ul className="flex flex-col" style={{ gap: "16px" }}>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="footer-link transition-colors duration-150 ease-out"
                        style={{
                          fontSize: "15px",
                          fontWeight: 400,
                          color: "var(--footer-text-primary)",
                        }}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Hairline divider above Block 2 (64px above corporate identity) */}
        <div
          aria-hidden
          style={{
            marginTop: "64px",
            height: "1px",
            background: "var(--footer-divider)",
          }}
        />

        {/* Block 2 — Corporate Identity (30/70 split) */}
        <div
          className="grid gap-8 md:grid-cols-[3fr_7fr]"
          style={{ marginTop: "64px", marginBottom: "48px" }}
        >
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--footer-accent)",
                marginBottom: "8px",
              }}
            >
              CIN
            </p>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 400,
                color: "var(--footer-text-primary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {COMPANY.cin}
            </p>
          </div>
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--footer-accent)",
                marginBottom: "8px",
              }}
            >
              Registered Office
            </p>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 400,
                color: "var(--footer-text-primary)",
                lineHeight: 1.55,
              }}
            >
              {COMPANY.address}
            </p>
          </div>
        </div>

        {/* Hairline divider above Block 3 */}
        <div
          aria-hidden
          style={{ height: "1px", background: "var(--footer-divider)" }}
        />

        {/* Block 3 — Compliance badges (48px above) */}
        <div
          className="flex flex-wrap items-center"
          style={{ marginTop: "48px", gap: "16px" }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--footer-accent)",
              marginRight: "16px",
            }}
          >
            Compliance
          </span>
          {COMPLIANCE.map((label) => (
            <span
              key={label}
              className="footer-badge inline-flex items-center transition-[border-color] duration-150 ease-out"
              style={{
                height: "40px",
                padding: "0 20px",
                borderRadius: "999px",
                border: "1px solid var(--footer-border-subtle)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: "var(--footer-text-primary)",
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Hairline divider above Block 4 */}
        <div
          aria-hidden
          style={{
            marginTop: "48px",
            height: "1px",
            background: "var(--footer-divider)",
          }}
        />

        {/* Block 4 — Copyright + legal (32px above) */}
        <div
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          style={{ marginTop: "32px" }}
        >
          <p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: "var(--footer-text-muted)",
            }}
          >
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </p>
          <div
            className="flex items-center justify-start sm:justify-end"
            style={{ gap: "32px" }}
          >
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="footer-link transition-colors duration-150 ease-out"
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "var(--footer-text-muted)",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Hover styles — kept here because Server Component cannot use onMouseEnter. */}
      <style>{`
        .footer-link:hover { color: #FFFFFF !important; }
        .footer-social:hover { border-color: rgba(42, 53, 72, 1) !important; background: var(--footer-surface-hover); }
        .footer-badge:hover { border-color: var(--footer-accent) !important; }
      `}</style>
    </footer>
  );
}
