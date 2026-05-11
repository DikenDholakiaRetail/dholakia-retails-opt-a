"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import RevealText from "@/components/motion/RevealText";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { EASE_STANDARD } from "@/lib/motion";
import { CATEGORY_LABELS } from "@/lib/blog-categories";
import type { BlogPost } from "@/sanity/lib/queries";

/**
 * P18-S02 Featured Post.
 * 100vh on Off-White. 1080px max, 50/50 split, vertically centred.
 * Left 50%: 4:3 editorial image (max 480px).
 * Right 50%: eyebrow (FEATURED · CATEGORY) → Syne H2 → excerpt → author meta → CTA.
 * EditorialImageDrift on left (±10px). Stagger-reveal of right pane.
 */
export default function FeaturedPost({ post }: { post: BlogPost }) {
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

  const image = post.featuredImage ?? post.thumbnail;
  const categoryLabel = CATEGORY_LABELS[post.category] ?? post.category;

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--color-bg-elevated)] flex items-center"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="container-editorial w-full">
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
          {/* LEFT — image with subtle drop-shadow */}
          <Link
            href={`/blog/${post.slug}`}
            className="block group/img"
            aria-label={post.title}
          >
            <motion.div
              ref={imgRef}
              className="relative aspect-[4/3] max-w-[480px] mx-auto lg:mx-0 overflow-hidden bg-white"
              style={{
                boxShadow: "0 30px 60px -30px rgba(11, 20, 38, 0.25)",
              }}
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: EASE_STANDARD }}
            >
              {image?.asset && (
                <Image
                  src={urlFor(image).width(960).height(720).url()}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  placeholder={image.metadata?.lqip ? "blur" : "empty"}
                  blurDataURL={image.metadata?.lqip}
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover/img:scale-[1.04]"
                />
              )}
            </motion.div>
          </Link>

          {/* RIGHT — content */}
          <motion.div
            className="flex flex-col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.p
              className="mb-5"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-accent-primary)",
                fontWeight: 500,
              }}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
              }}
            >
              Featured
              <span className="mx-2 text-[var(--color-text-muted)]">·</span>
              {categoryLabel}
            </motion.p>

            <RevealText
              text={post.title}
              as="h2"
              className="text-[var(--color-text-primary)] mb-6 font-[family-name:var(--font-display)]"
              style={{
                fontSize: "clamp(1.875rem, 3.4vw, 3rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
                fontWeight: 500,
              }}
              staggerMs={50}
              durationMs={650}
            />

            <motion.p
              className="text-[var(--color-text-body)] body-lead mb-8 max-w-[560px]"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
              }}
            >
              {post.excerpt}
            </motion.p>

            <motion.div
              className="flex items-center gap-3 text-[0.85rem] text-[var(--color-text-muted)] mb-8 font-[family-name:var(--font-mono)] tabular-nums"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
              }}
            >
              {post.author?.name && <span>By {post.author.name}</span>}
              {post.author?.name && <span aria-hidden>·</span>}
              <span>{date}</span>
              {post.readTime && (
                <>
                  <span aria-hidden>·</span>
                  <span>{post.readTime} min read</span>
                </>
              )}
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group/cta inline-flex items-center gap-2 h-12 px-7 rounded-[2px] bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-deep)] transition-colors duration-[240ms] text-[0.95rem] tracking-wide"
              >
                Read the essay
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-[240ms] group-hover/cta:translate-x-1"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
