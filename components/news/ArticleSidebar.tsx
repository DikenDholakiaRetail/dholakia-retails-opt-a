"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Link as LinkIcon, Check } from "lucide-react";

// Lucide React 1.x removed brand glyphs — inline SVGs match the rest of the project.
const Linkedin = ({ size = 20, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const Twitter = ({ size = 20, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M22 4.01c-.77.35-1.6.59-2.46.7a4.27 4.27 0 0 0 1.88-2.36 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 11.4 7.5c0 .34.04.66.11.97A12.13 12.13 0 0 1 3 4.7a4.28 4.28 0 0 0 1.32 5.71 4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97A8.59 8.59 0 0 1 2 18.97 12.13 12.13 0 0 0 8.56 21c7.88 0 12.18-6.52 12.18-12.18 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 22 4.01z" />
  </svg>
);
import { urlFor } from "@/sanity/lib/image";
import { EASE_STANDARD } from "@/lib/motion";
import type { Author } from "@/sanity/lib/queries";

/**
 * P13-S03 ArticleSidebar.
 * Desktop: sticky left-margin rail, 240px wide, 120px top offset.
 * Mobile: stacks horizontally below body as a full-width row.
 * 64×64 round portrait → name → role → date → 1px hairline → share row
 * (LinkedIn · X · Email · Copy link). Slides in from left 16px X, 600ms ease-out.
 * Share icons stagger 60ms. Copy-link click swaps icon to Lucide check (300ms,
 * reverts after 2s).
 */
type Props = {
  author: Author | null;
  publishedAt: string;
  title: string;
  shareUrl: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleSidebar({ author, publishedAt, title, shareUrl }: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* unavailable */
    }
  };

  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const twitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
  const mailto = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl)}`;

  return (
    <motion.aside
      className="lg:sticky lg:top-32 lg:self-start lg:w-[240px] flex flex-col"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE_STANDARD }}
    >
      {author && (
        <div className="flex flex-col items-start gap-3">
          {author.picture?.asset ? (
            <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden bg-[var(--color-bg-elevated)]">
              <Image
                src={urlFor(author.picture).width(128).height(128).url()}
                alt={author.picture.alt ?? author.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          ) : (
            <div
              className="w-16 h-16 shrink-0 rounded-full"
              style={{
                background:
                  "radial-gradient(70% 70% at 50% 40%, #2a3a5c 0%, #14213d 100%)",
              }}
            />
          )}
          <div>
            <p
              className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)]"
              style={{ fontSize: "1rem", fontWeight: 500, lineHeight: 1.25 }}
            >
              {author.name}
            </p>
            {author.role && (
              <p className="text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] mt-1">
                {author.role}
              </p>
            )}
          </div>
          <p className="text-[0.8rem] text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] tabular-nums">
            {formatDate(publishedAt)}
          </p>
        </div>
      )}

      <div className="my-6 h-px w-full bg-[rgba(11,20,38,0.10)]" />

      <p className="text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] mb-3">
        Share this article
      </p>
      <motion.div
        className="flex items-center gap-2 lg:gap-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        <ShareLink href={linkedin} label="Share on LinkedIn" Icon={Linkedin} />
        <ShareLink href={twitter} label="Share on X" Icon={Twitter} />
        <ShareLink href={mailto} label="Share via email" Icon={Mail} />
        <motion.button
          type="button"
          onClick={onCopy}
          aria-label="Copy link"
          className="inline-flex items-center justify-center w-8 h-8 text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors duration-[240ms]"
          variants={{
            hidden: { opacity: 0, y: 6 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_STANDARD } },
          }}
        >
          {copied ? (
            <Check size={20} strokeWidth={1.5} className="text-[var(--color-accent-primary)]" />
          ) : (
            <LinkIcon size={20} strokeWidth={1.5} />
          )}
        </motion.button>
      </motion.div>
    </motion.aside>
  );
}

function ShareLink({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center w-8 h-8 text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors duration-[240ms]"
      variants={{
        hidden: { opacity: 0, y: 6 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_STANDARD } },
      }}
    >
      <Icon size={20} strokeWidth={1.5} />
    </motion.a>
  );
}
