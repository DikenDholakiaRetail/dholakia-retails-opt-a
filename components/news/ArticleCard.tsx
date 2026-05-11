"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import TiltCard from "@/components/motion/TiltCard";
import { EASE_STANDARD } from "@/lib/motion";
import type { PostListItem } from "@/sanity/lib/queries";

/**
 * News card — Card3DTilt 3°. Hover: thumbnail scale 1.04 over 600ms;
 * sequential Electric Blue border draw on edges.
 *
 * The previous implementation paired TiltCard with `useMouseParallax` on the
 * thumb, which produced visible jitter: TiltCard rotates the wrapper, which
 * shifts the cardRef's bounding rect, which retriggers parallax with a new
 * cursor offset, in a feedback loop. The 3D tilt alone is the premium
 * effect; parallax was an extra flourish that conflicted with it.
 */
export default function ArticleCard({ post }: { post: PostListItem }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
      }}
      className="break-inside-avoid mb-6 transition-opacity duration-[240ms] group-hover/grid:[&:not(:hover)]:opacity-70"
    >
      <TiltCard angle="gentle" scale={1.01}>
        <Link
          href={`/news/${post.slug}`}
          className="group/card relative flex flex-col border border-[rgba(11,20,38,0.10)] hover:border-transparent transition-[border-color,box-shadow] duration-300 ease-out hover:shadow-[0_24px_48px_-24px_rgba(11,20,38,0.18)] bg-white"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-bg-elevated)]">
            {post.thumbnail?.asset && (
              <Image
                src={urlFor(post.thumbnail).width(1600).height(900).url()}
                alt={post.thumbnail.alt ?? post.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                placeholder={post.thumbnail.metadata?.lqip ? "blur" : "empty"}
                blurDataURL={post.thumbnail.metadata?.lqip}
                className="object-cover object-center transition-transform duration-[600ms] ease-out group-hover/card:scale-[1.04]"
              />
            )}
          </div>

          {/* Sequential Electric Blue border draw (top → right → bottom → left) */}
          <span className="pointer-events-none absolute top-0 left-0 h-px bg-[var(--color-accent-primary)] w-0 group-hover/card:w-full transition-[width] duration-100 ease-out" />
          <span className="pointer-events-none absolute top-0 right-0 w-px bg-[var(--color-accent-primary)] h-0 group-hover/card:h-full transition-[height] duration-100 ease-out delay-100" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-px bg-[var(--color-accent-primary)] w-0 group-hover/card:w-full transition-[width] duration-100 ease-out delay-200" />
          <span className="pointer-events-none absolute bottom-0 left-0 w-px bg-[var(--color-accent-primary)] h-0 group-hover/card:h-full transition-[height] duration-100 ease-out delay-300" />

          <div className="p-6 flex flex-col gap-3 flex-1">
            <div className="flex items-center gap-3 text-[0.7rem] tracking-[0.14em] uppercase">
              {post.category && (
                <>
                  <span className="text-[var(--color-accent-primary)] font-medium transition-transform duration-200 group-hover/card:-translate-y-0.5">
                    {post.category.title}
                  </span>
                  <span className="text-[var(--color-text-muted)]">·</span>
                </>
              )}
              <span className="text-[var(--color-text-muted)] font-[family-name:var(--font-mono)]">
                {date}
              </span>
            </div>
            <h3
              className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mt-1"
              style={{ fontSize: "1.25rem", lineHeight: 1.25, fontWeight: 500 }}
            >
              {post.title}
            </h3>
            <p className="text-[var(--color-text-body)] text-[0.9rem] leading-relaxed line-clamp-2">
              {post.excerpt}
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
    </motion.div>
  );
}
