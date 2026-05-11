"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Share2,
  Check,
} from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import Hairline from "@/components/motion/Hairline";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { EASE_STANDARD } from "@/lib/motion";
import ApplicationModal from "./ApplicationModal";
import StickyApplyBar from "./StickyApplyBar";

type Props = {
  slug: string;
  title: string;
  functionArea: string;
  functionLabel: string;
  location: string;
  employmentType: string;
  subtitle: string;
  publishDate: string;
  closingDate?: string | null;
};

function formatDate(iso?: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * P11-S01 Role Hero.
 * 60vh band on Off-White, centered 880px max-width, left-aligned.
 * AmbientTextureDrift on grid pattern (±4px). ButtonHoverFill on Apply.
 * Breadcrumb fade-in 200ms; eyebrow 300ms; H1 word-by-word 60ms; subtitle fade-up;
 * meta strip stagger 80ms; CTAs stagger 80ms.
 * Sticky Apply bar slides down on scroll past 80vh.
 */
export default function RoleHero(props: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [shared, setShared] = useState(false);

  useMouseParallax(sectionRef, [{ ref: gridRef, amplitude: 4 }], {
    duration: 0.8,
    ease: "power2.out",
  });

  const onShare = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/careers/${props.slug}`
        : `/careers/${props.slug}`;
    try {
      if (typeof navigator !== "undefined" && (navigator as any).share) {
        await (navigator as any).share({
          title: props.title,
          text: `${props.title} — Dholakia Retail`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        data-header-theme="light"
        className="relative bg-[var(--color-bg-elevated)] overflow-hidden"
        style={{ minHeight: "60vh", paddingTop: "140px", paddingBottom: "80px" }}
      >
        {/* Optional 4%-opacity grid pattern */}
        <motion.div
          ref={gridRef}
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(11,20,38,0.4) 0px, rgba(11,20,38,0.4) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(11,20,38,0.4) 0px, rgba(11,20,38,0.4) 1px, transparent 1px, transparent 40px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          transition={{ duration: 1.2, ease: EASE_STANDARD }}
        />

        <div className="relative container-editorial">
          <div className="max-w-[880px]">
            {/* Breadcrumb */}
            <motion.nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2, ease: EASE_STANDARD }}
            >
              <Link
                href="/careers"
                className="text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors duration-200"
              >
                Careers
              </Link>
              <ChevronRight
                size={12}
                strokeWidth={1.5}
                className="text-[var(--color-text-muted)]"
              />
              <span className="text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)]">
                {props.functionLabel}
              </span>
            </motion.nav>

            {/* Eyebrow */}
            <motion.p
              className="eyebrow mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: EASE_STANDARD }}
            >
              {props.functionLabel} · {props.location} · {props.employmentType}
            </motion.p>

            {/* H1 */}
            <RevealText
              text={props.title}
              as="h1"
              className="text-[var(--color-text-primary)] mb-7 font-[family-name:var(--font-display)] italic"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
              staggerMs={60}
              durationMs={800}
              delay={400}
              triggerOnView={false}
            />

            {/* Subtitle */}
            <motion.p
              className="body-lead text-[var(--color-text-body)] max-w-[600px] mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: EASE_STANDARD }}
            >
              {props.subtitle}
            </motion.p>

            {/* Meta strip — posted · closing */}
            <motion.div
              className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 pb-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 1.5 } },
              }}
            >
              <motion.span
                className="text-[0.85rem] text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] tabular-nums"
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_STANDARD } },
                }}
              >
                Posted {formatDate(props.publishDate)}
              </motion.span>
              {props.closingDate && (
                <>
                  <span aria-hidden className="w-px h-4 bg-[var(--color-text-muted)]/30" />
                  <motion.span
                    className="text-[0.85rem] text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] tabular-nums"
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_STANDARD } },
                    }}
                  >
                    Applications close {formatDate(props.closingDate)}
                  </motion.span>
                </>
              )}
            </motion.div>

            <Hairline width="100%" color="rgba(11,20,38,0.10)" durationMs={800} />

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 1.7 } },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="group/cta inline-flex items-center gap-2 h-12 px-7 rounded-[2px] bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-deep)] transition-colors duration-[240ms] text-[0.95rem] tracking-wide"
                >
                  Apply for this role
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-[240ms] group-hover/cta:translate-x-1"
                  />
                </button>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
                }}
              >
                <button
                  type="button"
                  onClick={onShare}
                  className="group/cta inline-flex items-center gap-2 h-12 px-7 rounded-[2px] border border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)] hover:text-white transition-[background-color,color,transform] duration-[240ms] hover:scale-[1.02] text-[0.95rem] tracking-wide"
                >
                  {shared ? (
                    <>
                      <Check size={16} strokeWidth={1.5} />
                      Link copied
                    </>
                  ) : (
                    <>
                      <Share2 size={16} strokeWidth={1.5} />
                      Share this role
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <StickyApplyBar
        title={props.title}
        functionLabel={props.functionLabel}
        location={props.location}
        onApply={() => setOpen(true)}
      />
      <ApplicationModal
        open={open}
        onClose={() => setOpen(false)}
        roleSlug={props.slug}
        roleTitle={props.title}
      />
    </>
  );
}
