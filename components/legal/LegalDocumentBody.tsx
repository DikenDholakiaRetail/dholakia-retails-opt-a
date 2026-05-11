"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import Hairline from "@/components/motion/Hairline";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P14-S02 / P15-S02 / P16-S02 — Shared Legal Document Body.
 * Two-column desktop: 240px sticky TOC + 720px content body.
 * Mobile: TOC collapses to a horizontal pill row at the top, sticky beneath header.
 * Active-section detection via IntersectionObserver.
 * RowSubtleHighlight on TOC links.
 * "Back to top" affordance fixed bottom-right when scrolled past 30vh.
 *
 * Animations:
 *  → Section headings: word-by-word reveal as they enter viewport
 *  → Horizontal dividers: SVG draw L→R, 600ms
 *  → Active-section underline transitions 300ms
 */

export type LegalSection = {
  id: string;
  number: number;
  heading: string;
  body: ReactNode;
};

type Props = {
  sections: LegalSection[];
  /** If provided, rendered after the matching section number (e.g. cookie inventory table after section 2). */
  afterSection?: { id: number; node: ReactNode };
};

export default function LegalDocumentBody({ sections, afterSection }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    observerRef.current = obs;
    return () => obs.disconnect();
  }, [sections]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > window.innerHeight * 0.3);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onTopClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section
      className="bg-[var(--color-bg-elevated)] relative"
      style={{ paddingTop: "80px", paddingBottom: "80px", scrollBehavior: "smooth" }}
    >
      <div className="container-editorial">
        {/* Mobile TOC — sticky horizontal pill row */}
        <nav
          aria-label="Document sections"
          className="lg:hidden sticky z-20 -mx-6 px-6 lg:mx-0 lg:px-0 py-3 bg-[var(--color-bg-elevated)]/92 backdrop-blur border-b border-[rgba(11,20,38,0.10)] mb-8 overflow-x-auto top-[64px]"
        >
          <ul className="flex items-center gap-2 whitespace-nowrap">
            {sections.map((s) => {
              const isActive = activeId === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "inline-flex items-center px-4 h-8 rounded-full text-[0.75rem] tracking-wide border transition-[background-color,color,border-color] duration-[240ms]",
                      isActive
                        ? "bg-[var(--color-accent-primary)] text-white border-[var(--color-accent-primary)]"
                        : "bg-white text-[var(--color-text-primary)] border-[rgba(11,20,38,0.10)] hover:border-[var(--color-accent-primary)]",
                    ].join(" ")}
                  >
                    {s.number}. {s.heading.replace(/^\d+\.\s*/, "")}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="lg:grid lg:grid-cols-[240px_minmax(0,720px)] lg:gap-16 lg:justify-center">
          {/* Desktop sticky TOC */}
          <aside
            aria-label="Document sections"
            className="hidden lg:block lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] font-medium mb-5">
              On this page
            </p>
            <ul className="flex flex-col gap-3">
              {sections.map((s) => {
                const isActive = activeId === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={[
                        "group/toc relative block py-1 pl-3 transition-[padding-left,color] duration-[240ms]",
                        isActive
                          ? "text-[var(--color-accent-primary)] pl-4"
                          : "text-[var(--color-text-body)] hover:text-[var(--color-accent-primary)] hover:pl-4",
                      ].join(" ")}
                      style={{ fontSize: "0.875rem", lineHeight: 1.4 }}
                    >
                      <span
                        aria-hidden
                        className={[
                          "absolute left-0 top-0 bottom-0 w-px transition-[transform,background-color] duration-[300ms]",
                          isActive
                            ? "bg-[var(--color-accent-primary)] scale-y-100"
                            : "bg-[var(--color-text-muted)]/30 scale-y-100",
                        ].join(" ")}
                      />
                      <span className="font-[family-name:var(--font-mono)] tabular-nums mr-2">
                        {String(s.number).padStart(2, "0")}
                      </span>
                      {s.heading.replace(/^\d+\.\s*/, "")}
                    </a>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Content body */}
          <article className="prose-legal max-w-[720px] mx-auto lg:mx-0 w-full">
            {sections.map((s, i) => (
              <SectionBlock key={s.id} section={s} isFirst={i === 0}>
                {afterSection?.id === s.number && afterSection.node}
              </SectionBlock>
            ))}
          </article>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        type="button"
        onClick={onTopClick}
        aria-label="Back to top"
        initial={{ opacity: 0, y: 16 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          y: showBackToTop ? 0 : 16,
          pointerEvents: showBackToTop ? "auto" : "none",
        }}
        transition={{ duration: 0.32, ease: EASE_STANDARD }}
        className="fixed bottom-8 right-8 z-30 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-deep)] transition-colors duration-[240ms] shadow-lg"
      >
        <ChevronUp size={16} strokeWidth={1.5} />
      </motion.button>
    </section>
  );
}

function SectionBlock({
  section,
  isFirst,
  children,
}: {
  section: LegalSection;
  isFirst: boolean;
  children?: ReactNode;
}) {
  return (
    <div id={section.id} className="scroll-mt-32">
      {!isFirst && (
        <div className="my-12">
          <Hairline width="100%" color="rgba(107, 138, 201, 0.4)" durationMs={600} />
        </div>
      )}
      <motion.h2
        className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-6"
        style={{
          fontSize: "clamp(1.375rem, 2vw, 1.75rem)",
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          fontWeight: 500,
        }}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: EASE_STANDARD }}
      >
        {section.heading}
      </motion.h2>
      <motion.div
        className="text-[var(--color-text-body)] space-y-4"
        style={{ fontSize: "1rem", lineHeight: 1.7 }}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE_STANDARD }}
      >
        {section.body}
      </motion.div>
      {children}
    </div>
  );
}
