"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import TiltCard from "@/components/motion/TiltCard";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { EASE_STANDARD } from "@/lib/motion";
import type { PostListItem } from "@/sanity/lib/queries";

/**
 * P09-S03 Featured Story — full-width 50/50 split.
 * Left 16:9 thumbnail with EditorialImageDrift (±10px, scale 1.04 base).
 * Right: category tag → date → Playfair H2 → 60-word excerpt → 'Read Story →' link.
 * Card3DTilt 3°. Stagger-reveal of right pane.
 */
export default function FeaturedStory({ post }: { post: PostListItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useMouseParallax(ref, [{ ref: imgRef, amplitude: 10 }], {
    duration: 0.5,
    ease: "power2.out",
  });

  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  return (
    <section className="bg-white" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="container-editorial">
        <TiltCard angle="standard" scale={1.005}>
          <Link href={`/news/${post.slug}`} className="block group">
            <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden border border-black/10">
              {/* LEFT — thumbnail.
                  Mobile: 16:9 ratio for a natural image card.
                  Desktop: drop the ratio and stretch to the row height
                  (`lg:h-full` + `lg:aspect-auto`) so the image and the right
                  text pane share the same height — the previous `aspect-16/9`
                  forced the image taller than the content card and bled
                  outside the visual balance. `lg:min-h-[420px]` keeps a
                  premium presence on shorter excerpts. */}
              <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[420px] overflow-hidden bg-[var(--color-bg-elevated)]">
                <motion.div
                  ref={imgRef}
                  className="absolute inset-0 will-change-transform"
                  style={{ transform: "scale(1.04)" }}
                >
                  {post.thumbnail?.asset && (
                    <Image
                      src={urlFor(post.thumbnail).width(1600).height(900).url()}
                      alt={post.thumbnail.alt ?? post.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      placeholder={post.thumbnail.metadata?.lqip ? "blur" : "empty"}
                      blurDataURL={post.thumbnail.metadata?.lqip}
                      className="object-cover object-center transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                      priority
                    />
                  )}
                </motion.div>
              </div>

              {/* RIGHT — content */}
              <motion.div
                className="bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12 } },
                }}
              >
                <motion.div
                  className="flex items-center gap-3 text-[0.7rem] tracking-[0.14em] uppercase mb-5"
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_STANDARD } },
                  }}
                >
                  {post.category && (
                    <>
                      <span className="text-[var(--color-accent-primary)] font-medium">
                        {post.category.title}
                      </span>
                      <span className="text-[var(--color-text-muted)]">·</span>
                    </>
                  )}
                  <span className="text-[var(--color-text-muted)] font-[family-name:var(--font-mono)]">
                    {date}
                  </span>
                </motion.div>

                <motion.h2
                  className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-5"
                  style={{
                    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.015em",
                    fontWeight: 500,
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
                  }}
                >
                  {post.title}
                </motion.h2>

                <motion.p
                  className="text-[var(--color-text-body)] leading-relaxed mb-8"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
                  }}
                >
                  {post.excerpt}
                </motion.p>

                <motion.span
                  className="inline-flex items-center gap-2 text-[var(--color-accent-primary)] font-medium tracking-wide"
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_STANDARD } },
                  }}
                >
                  Read Story
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.span>
              </motion.div>
            </div>
          </Link>
        </TiltCard>
      </div>
    </section>
  );
}
