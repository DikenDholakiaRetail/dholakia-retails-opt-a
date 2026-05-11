"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import Hairline from "@/components/motion/Hairline";
import EditorialImage from "@/components/motion/EditorialImage";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { EASE_STANDARD } from "@/lib/motion";
import { BLOG_HERO_PATTERN } from "@/lib/media";

/**
 * P18-S01 Journal Hero — image backdrop + cinematic dark overlay + content.
 * Layer 0 — editorial photograph with cinematic gradient.
 * Layer 1 — extra Midnight Navy mask for legibility.
 * Layer 2 — facet pattern.
 * Layer 10 — content (white type).
 */
export default function JournalHero({
  onSubscribe,
}: {
  onSubscribe?: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const textureRef = useRef<HTMLDivElement>(null);

  useMouseParallax(sectionRef, [{ ref: textureRef, amplitude: 4 }], {
    duration: 0.8,
    ease: "power2.out",
  });

  // Default behaviour for the "Subscribe to the journal" CTA — scroll to the
  // SubscribeBand at the bottom of the page and focus its email input. Pages
  // can still override via the `onSubscribe` prop.
  const handleSubscribeClick = () => {
    if (onSubscribe) {
      onSubscribe();
      return;
    }
    const target = document.getElementById("journal-email");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      // Defer focus until the smooth scroll has had a chance to settle.
      window.setTimeout(() => target.focus({ preventScroll: true }), 600);
    }
  };

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className="relative bg-[var(--color-bg-inverse)] overflow-hidden flex flex-col items-center justify-center text-white"
      style={{ minHeight: "70vh", paddingTop: "160px", paddingBottom: "60px" }}
    >
      {/* Layer 0 — editorial photograph + cinematic overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <EditorialImage
          src={BLOG_HERO_PATTERN}
          fill
          priority
          sizes="100vw"
          darkOverlay="cinematic"
        />
      </div>

      {/* Layer 1 — additional Midnight Navy mask 50% for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(11,20,38,0.50)" }}
      />

      {/* Layer 2 — facet pattern at 6% opacity (white over the dark mask) */}
      {/* <motion.div
        ref={textureRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE_STANDARD }}
        style={{
          backgroundImage:
            "linear-gradient(45deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%), linear-gradient(45deg, #FFFFFF 25%, transparent 25%, transparent 75%, #FFFFFF 75%)",
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px",
        }}
      /> */}

      <div className="relative z-10 container-editorial flex flex-col items-center text-center max-w-[880px]">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE_STANDARD }}
          style={{ color: "var(--color-accent-soft)" }}
        >
          The Journal
        </motion.p>

        <RevealText
          text="Notes from the house."
          as="h1"
          className="text-white mb-7 font-[family-name:var(--font-display)]"
          style={{
            fontSize: "clamp(2.5rem, 5.2vw, 5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            fontWeight: 500,
          }}
          staggerMs={60}
          durationMs={800}
          delay={200}
          triggerOnView={false}
        />

        <motion.p
          className="text-white/80 max-w-[640px] mb-10"
          style={{
            fontSize: "clamp(1.125rem, 1.8vw, 1.5rem)",
            fontWeight: 300,
            lineHeight: 1.55,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: EASE_STANDARD }}
        >
          Long-form writing on craft, materials, philosophy, and the people
          behind Dholakia Retail&apos;s work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2, ease: EASE_STANDARD }}
          className="mb-10"
        >
          <button
            type="button"
            onClick={handleSubscribeClick}
            className="group/cta inline-flex items-center gap-2 h-12 px-7 rounded-[2px] border border-white/60 text-white hover:bg-white hover:text-[var(--color-text-primary)] transition-colors duration-[240ms] text-[0.95rem] tracking-wide"
          >
            Subscribe to the journal
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-[240ms] group-hover/cta:translate-x-1"
            />
          </button>
        </motion.div>

        <Hairline width={240} color="rgba(255,255,255,0.55)" durationMs={800} delay={1400} />
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.8 }}
      >
        <motion.span
          animate={{ y: [2, 6, 2] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block"
        >
          <ChevronDown size={24} strokeWidth={1.5} />
        </motion.span>
      </motion.div>
    </section>
  );
}
