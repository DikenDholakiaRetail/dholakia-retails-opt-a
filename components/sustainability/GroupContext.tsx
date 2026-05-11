"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import RevealText from "@/components/motion/RevealText";
import EditorialImage from "@/components/motion/EditorialImage";
import { EASE_STANDARD } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SUSTAINABILITY_GROUP_CONTEXT } from "@/lib/media";

/**
 * P06-S03 Wider Group Context.
 * 100vh full-bleed parallax. Background: solar array / lab facility imagery.
 * Foreground editorial content stack lower-left.
 * DocumentaryDeepParallax (heavy amplitude). Mouse Tracking disabled.
 * Slow zoom on background; word-by-word heading reveal.
 */
export default function GroupContext() {
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
      xBg(nx * (rect.width * 0.1));
      xFg(-nx * 6);
      yFg(-ny * 6);
    };
    const onLeave = () => { xBg(0); xFg(0); yFg(0); };

    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseleave", onLeave);

    // Scroll parallax — bg moves at 30% scroll speed
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const yOffset = progress * 0.3 * rect.height * -0.5;
      gsap.set(bg, { y: yOffset });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden text-white"
    >
      <motion.div
        ref={bgRef}
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(150deg, #0B1426 0%, #14275C 55%, #08203D 100%)",
          transform: "scale(1.2)",
          willChange: "transform",
        }}
      >
        <EditorialImage src={SUSTAINABILITY_GROUP_CONTEXT} fill sizes="100vw" darkOverlay="cinematic" />
        <div
          className="absolute inset-0"
          style={{ animation: "kenBurns 30s ease-in-out infinite alternate" }}
        />
        {/* facet pattern (solar-array-like) */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(255,255,255,0.10) 0px, rgba(255,255,255,0.10) 1px, transparent 1px, transparent 120px)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(5,10,20,0.85) 0%, rgba(5,10,20,0) 100%)",
          }}
        />
      </motion.div>

      <div
        ref={fgRef}
        className="relative z-10 h-full container-editorial flex items-center justify-center"
        style={{ willChange: "transform" }}
      >
        <div
          className="max-w-2xl text-center px-8 py-10 md:px-12 md:py-14 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <motion.p
            className="eyebrow mb-6"
            style={{ color: "var(--color-accent-soft)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            Group Context
          </motion.p>
          <RevealText
            text="A broader sustainability narrative."
            as="h2"
            className="text-white mb-7"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
            staggerMs={60}
            durationMs={700}
            delay={200}
          />
          <motion.p
            className="text-white/75 body-lead max-w-xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE_STANDARD }}
          >
            The wider Dholakia Group publicly describes its lab-grown diamond
            production as solar-powered and certified under SCS 007, reinforcing
            a more accountable model of diamond creation.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
