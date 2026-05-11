"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import RevealText from "@/components/motion/RevealText";
import EditorialImage from "@/components/motion/EditorialImage";
import { EASE_STANDARD } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SUSTAINABILITY_HERO } from "@/lib/media";

/**
 * P06-S01 Hero — Luxury, Reconsidered.
 * 100vh full-bleed. Documentary monochrome image (solar field / lab interior).
 * Section palette shifts toward Ocean (#08203D).
 * DocumentaryDeepParallax: bg ±20% of overflow on cursor X (image scaled 1.2× base);
 *   foreground typography drifts ±6px counter. GSAP power3.out, 0.8s.
 * Slow 30s Ken-Burns zoom.
 * H1 word-by-word reveal. Mouse Tracking disabled.
 */
export default function SustainabilityHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const section = sectionRef.current;
    const bg = bgRef.current;
    const fg = fgRef.current;
    if (!section || !bg || !fg) return;

    const xBg = gsap.quickTo(bg, "x", { duration: 0.8, ease: "power3.out" });
    const xFg = gsap.quickTo(fg, "x", { duration: 0.8, ease: "power3.out" });
    const yFg = gsap.quickTo(fg, "y", { duration: 0.8, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      // bg ±20% overflow (image scaled 1.2× → 10% overflow each side)
      xBg(nx * (rect.width * 0.1));
      // fg ±6px counter
      xFg(-nx * 6);
      yFg(-ny * 6);
    };
    const onLeave = () => { xBg(0); xFg(0); yFg(0); };

    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className="relative h-screen min-h-[640px] w-full overflow-hidden text-white"
      style={{ background: "var(--color-bg-deep)" }}
    >
      {/* Layer 1 — solar field / lab interior photograph, scaled 1.2× for overflow */}
      <motion.div
        ref={bgRef}
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #08203D 0%, #0e2e57 45%, #14275C 100%)",
          transform: "scale(1.2)",
          willChange: "transform",
        }}
      >
        <EditorialImage src={SUSTAINABILITY_HERO} fill priority sizes="100vw" darkOverlay="cinematic" />
        <div
          className="absolute inset-0"
          style={{ animation: "kenBurns 30s ease-in-out infinite alternate" }}
        />
        {/* topographic line pattern subtle */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 88px), repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 88px)",
          }}
        />
        {/* film grain */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
            backgroundSize: "3px 3px",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{
            background:
              "linear-gradient(to top, rgba(8,32,61,0.9) 0%, rgba(8,32,61,0.3) 60%, rgba(8,32,61,0) 100%)",
          }}
        />
      </motion.div>

      {/* Layer 3 — foreground typography, lower-left */}
      <div
        ref={fgRef}
        className="relative z-10 h-full container-editorial flex items-end pb-24 md:pb-32 pt-32"
        style={{ willChange: "transform" }}
      >
        <div className="max-w-3xl">
          <motion.p
            className="eyebrow mb-6"
            style={{ color: "var(--color-accent-soft)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE_STANDARD }}
          >
            Sustainability
          </motion.p>
          <RevealText
            text="Luxury, Reconsidered"
            as="h1"
            className="text-white mb-7"
            style={{
              fontSize: "clamp(2.5rem, 5.2vw, 5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
            staggerMs={60}
            durationMs={800}
            delay={400}
            triggerOnView={false}
          />
          <motion.p
            className="body-lead text-white/80 max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4, ease: EASE_STANDARD }}
          >
            The future of jewellery must consider not only beauty, but how it is
            created, verified, and carried forward.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
