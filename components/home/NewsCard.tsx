"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TiltCard from "@/components/motion/TiltCard";
import { HOME_NEWS_PREVIEW_PLACEHOLDER } from "@/lib/media";

/**
 * Discriminated union — `real` cards are full Sanity posts that link to
 * `/news/[slug]`, `placeholder` cards display the on-brand "Coming Soon"
 * state when the CMS is empty. Both variants are rendered through this one
 * component so the layout, padding, typography, and hover animations are
 * guaranteed identical.
 */
export type NewsCardItem =
  | {
      kind: "real";
      slug: string;
      category: string;
      date: string;
      title: string;
      excerpt: string;
      thumbnail?: { url: string; alt: string; lqip?: string };
    }
  | {
      kind: "placeholder";
      id: string;
      title: string;
      hue: string;
    };

const PLACEHOLDER_BODY =
  "We are preparing the next set of newsroom updates, brand stories, and editorial announcements.";

export default function NewsCard({ item }: { item: NewsCardItem }) {
  // Card hover effects are now driven entirely by TiltCard (3D rotate +
  // gentle scale) plus CSS transitions on the image and ancillary elements.
  // The previous parallax-on-thumb approach fought TiltCard's rotation —
  // see TiltCard.tsx for the full pairing rule.

  if (item.kind === "placeholder") {
    return (
      <TiltCard angle="gentle" scale={1.01} className="h-full">
        <div
          aria-disabled="true"
          className="group/card relative flex flex-col h-full border border-black/10 bg-white"
          style={{ cursor: "default" }}
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-bg-elevated)]">
            {/*
             * P01-S08 News / Press preview placeholder thumbnail. Final
             * Option_A asset renders behind the dark hue tint, so each
             * "Coming Soon" card still reads as editorial photography.
             */}
            {HOME_NEWS_PREVIEW_PLACEHOLDER.src && (
              <Image
                src={HOME_NEWS_PREVIEW_PLACEHOLDER.src}
                alt={HOME_NEWS_PREVIEW_PLACEHOLDER.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-700 group-hover/card:scale-[1.04]"
              />
            )}
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-multiply opacity-80 transition-opacity duration-700 group-hover/card:opacity-70"
              style={{
                background: `linear-gradient(135deg, ${item.hue} 0%, #050A14 100%)`,
              }}
            />
          </div>

          <div className="p-6 flex flex-col gap-3 flex-1">
            <div className="flex items-center gap-3 text-[0.7rem] tracking-[0.14em] uppercase">
              <span className="text-[var(--color-accent-primary)] font-medium">
                Coming Soon
              </span>
              <span className="text-[var(--color-text-muted)]">·</span>
              <span className="text-[var(--color-text-muted)] font-[family-name:var(--font-mono)]">
                In Progress
              </span>
            </div>
            <h3
              className="text-[var(--color-text-primary)] mt-1 min-h-[3.75rem]"
              style={{ fontSize: "1.25rem", lineHeight: 1.25, fontWeight: 500 }}
            >
              {item.title}
            </h3>
            <p className="text-[var(--color-text-body)] text-[0.9rem] leading-relaxed">
              {PLACEHOLDER_BODY}
            </p>
            <span className="mt-auto pt-4 inline-flex items-center gap-2 text-[var(--color-text-muted)] text-[0.85rem] font-medium">
              Coming Soon
              <ArrowRight
                size={14}
                strokeWidth={1.5}
                className="opacity-50"
              />
            </span>
          </div>
        </div>
      </TiltCard>
    );
  }

  return (
    <TiltCard angle="gentle" scale={1.01} className="h-full">
      <Link
        href={`/news/${item.slug}`}
        className="group/card relative flex flex-col h-full border border-black/10 hover:border-transparent transition-[border-color,box-shadow] duration-300 ease-out hover:shadow-[0_24px_48px_-24px_rgba(11,20,38,0.18)] bg-white"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-bg-elevated)]">
          {item.thumbnail ? (
            <Image
              src={item.thumbnail.url}
              alt={item.thumbnail.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              placeholder={item.thumbnail.lqip ? "blur" : "empty"}
              blurDataURL={item.thumbnail.lqip}
              className="object-cover object-center transition-transform duration-[600ms] ease-out group-hover/card:scale-[1.04]"
            />
          ) : (
            <div
              className="w-full h-full transition-transform duration-[600ms] ease-out group-hover/card:scale-[1.04]"
              style={{
                background:
                  "linear-gradient(135deg, #2a3552 0%, #050A14 100%)",
              }}
            />
          )}
        </div>

        {/* Sequential Electric Blue border draw on hover (top → right → bottom → left) */}
        <span className="pointer-events-none absolute top-0 left-0 h-px bg-[var(--color-accent-primary)] w-0 group-hover/card:w-full transition-[width] duration-100 ease-out" />
        <span className="pointer-events-none absolute top-0 right-0 w-px bg-[var(--color-accent-primary)] h-0 group-hover/card:h-full transition-[height] duration-100 ease-out delay-100" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-px bg-[var(--color-accent-primary)] w-0 group-hover/card:w-full transition-[width] duration-100 ease-out delay-200" />
        <span className="pointer-events-none absolute bottom-0 left-0 w-px bg-[var(--color-accent-primary)] h-0 group-hover/card:h-full transition-[height] duration-100 ease-out delay-300" />

        <div className="p-6 flex flex-col gap-3 flex-1 bg-white">
          <div className="flex items-center gap-3 text-[0.7rem] tracking-[0.14em] uppercase">
            <span className="text-[var(--color-accent-primary)] font-medium transition-transform duration-200 group-hover/card:-translate-y-0.5">
              {item.category}
            </span>
            <span className="text-[var(--color-text-muted)]">·</span>
            <span className="text-[var(--color-text-muted)] font-[family-name:var(--font-mono)]">
              {item.date}
            </span>
          </div>
          <h3
            className="text-[var(--color-text-primary)] mt-1 min-h-[3.75rem]"
            style={{ fontSize: "1.25rem", lineHeight: 1.25, fontWeight: 500 }}
          >
            {item.title}
          </h3>
          <p className="text-[var(--color-text-body)] text-[0.9rem] leading-relaxed line-clamp-2">
            {item.excerpt}
          </p>
          <span className="mt-auto pt-4 inline-flex items-center gap-2 text-[var(--color-accent-primary)] text-[0.85rem] font-medium">
            Read
            <ArrowRight
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover/card:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}
