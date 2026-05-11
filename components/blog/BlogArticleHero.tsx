"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import RevealText from "@/components/motion/RevealText";
import Hairline from "@/components/motion/Hairline";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { EASE_STANDARD } from "@/lib/motion";
import { CATEGORY_LABELS } from "@/lib/blog-categories";
import type { BlogPost } from "@/sanity/lib/queries";

/**
 * P19-S01 Blog Article Hero — typography-led editorial.
 * Unlike news (full-bleed image), blog leads with title + breadcrumb + author meta.
 * Optional 4:3 hero image rendered below as an editorial inset, not full-bleed.
 * EditorialImageDrift on optional image (±10px). H1 word-by-word.
 */
export default function BlogArticleHero({ post }: { post: BlogPost }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useMouseParallax(sectionRef, [{ ref: imgRef, amplitude: 10 }], {
    duration: 0.5,
    ease: "power2.out",
  });

  const date = new Date(post.publishDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const heroImg = post.heroImage ?? post.featuredImage ?? post.thumbnail;
  const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category;

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      className="bg-[var(--color-bg-elevated)] relative overflow-hidden"
      style={{ paddingTop: "160px", paddingBottom: "60px" }}
    >
      <div className="container-editorial">
        <div className="max-w-[820px] mx-auto">
          {/* Breadcrumb */}
          <motion.nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 mb-6 text-[var(--color-text-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2, ease: EASE_STANDARD }}
          >
            <Link
              href="/blog"
              className="text-[0.7rem] tracking-[0.14em] uppercase hover:text-[var(--color-accent-primary)] transition-colors duration-200"
            >
              Journal
            </Link>
            <ChevronRight size={12} strokeWidth={1.5} />
            <Link
              href={`/blog?category=${post.category}`}
              className="text-[0.7rem] tracking-[0.14em] uppercase hover:text-[var(--color-accent-primary)] transition-colors duration-200"
            >
              {categoryLabel}
            </Link>
          </motion.nav>

          {/* Eyebrow CATEGORY · DATE · READ TIME */}
          <motion.p
            className="eyebrow mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3, ease: EASE_STANDARD }}
          >
            {categoryLabel}
            <span className="mx-3 text-[var(--color-text-muted)]">·</span>
            <span className="font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
              {date}
            </span>
            {post.readTime && (
              <>
                <span className="mx-3 text-[var(--color-text-muted)]">·</span>
                <span className="font-[family-name:var(--font-mono)] text-[var(--color-text-muted)]">
                  {post.readTime} min read
                </span>
              </>
            )}
          </motion.p>

          {/* H1 word-by-word */}
          <RevealText
            text={post.title}
            as="h1"
            className="text-[var(--color-text-primary)] mb-6 font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
            staggerMs={60}
            durationMs={700}
            delay={400}
            triggerOnView={false}
          />

          {/* Subtitle */}
          {post.excerpt && (
            <motion.p
              className="body-lead text-[var(--color-text-body)] mb-8 max-w-[640px]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: EASE_STANDARD }}
            >
              {post.excerpt}
            </motion.p>
          )}

          {/* Author meta */}
          {post.author && (
            <motion.p
              className="text-[0.85rem] text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] mb-10"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5, ease: EASE_STANDARD }}
            >
              By {post.author.name}
              {post.author.role ? ` · ${post.author.role}` : ""}
            </motion.p>
          )}

          <Hairline width={240} color="var(--color-accent-primary)" durationMs={800} delay={1700} />
        </div>

        {/* Optional hero image — editorial inset, max 880px wide */}
        {heroImg?.asset && (
          <motion.div
            ref={imgRef}
            className="relative aspect-[16/9] max-w-[880px] mx-auto mt-16 overflow-hidden"
            style={{
              boxShadow: "0 30px 60px -30px rgba(11, 20, 38, 0.25)",
              transform: "scale(1.04)",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE_STANDARD }}
          >
            <Image
              src={urlFor(heroImg).width(2400).height(1350).url()}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 880px, 100vw"
              placeholder={heroImg.metadata?.lqip ? "blur" : "empty"}
              blurDataURL={heroImg.metadata?.lqip}
              className="object-cover"
              priority
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
