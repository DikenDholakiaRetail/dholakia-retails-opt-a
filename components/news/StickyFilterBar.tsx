"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * Sticky filter bar wrapper for P09-S02.
 *
 * Visual contract — matches the global header exactly so the two read as a
 * single continuous glass surface when stacked. The bar entry slides up
 * from below 200ms after the hero animation; once the user starts scrolling
 * (≥24px) the same clean light glassmorphism the navbar uses fades in:
 *   • rgba(255,255,255,0.08) wash
 *   • backdrop-blur(16px) saturate(140%)
 *   • subtle navy hairline border-bottom on light pages
 *
 * Sticks to the top under the global header (88px desktop / 64px mobile)
 * so content scrolls beneath the combined header + filter plate.
 */
export default function StickyFilterBar({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Match the global header's 24px threshold so both glass surfaces
    // activate together — no visual desync as the user starts scrolling.
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="sticky z-30 xl:top-[88px] top-[64px] transition-[background-color,backdrop-filter,border-color] duration-[280ms]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: EASE_STANDARD }}
      style={{
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 0.08)"
          : "rgba(255, 255, 255, 0)",
        backdropFilter: scrolled ? "blur(16px) saturate(140%)" : "blur(0px)",
        WebkitBackdropFilter: scrolled
          ? "blur(16px) saturate(140%)"
          : "blur(0px)",
        borderBottom: scrolled
          ? "1px solid rgba(11, 20, 38, 0.10)"
          : "1px solid transparent",
      }}
    >
      <div className="container-editorial py-4">{children}</div>
    </motion.div>
  );
}
