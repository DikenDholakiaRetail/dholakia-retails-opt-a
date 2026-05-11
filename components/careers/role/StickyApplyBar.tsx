"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EASE_STANDARD } from "@/lib/motion";

type Props = {
  title: string;
  functionLabel: string;
  location: string;
  onApply: () => void;
};

/**
 * P11-S01 Sticky Apply Bar — slides down from top on scroll past 80vh threshold.
 * Sits below the global header (which is 88px desktop / 64px mobile).
 */
export default function StickyApplyBar({ title, functionLabel, location, onApply }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-apply"
          className="fixed left-0 right-0 z-40"
          style={{ top: "var(--header-h-mobile)" }}
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ duration: 0.32, ease: EASE_STANDARD }}
        >
          <div
            className="bg-white border-b border-[rgba(11,20,38,0.10)]"
            style={{
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(255,255,255,0.94)",
            }}
          >
            <div className="container-editorial flex items-center justify-between gap-6 py-3 md:py-4 xl:[--top-offset:88px] [--top-offset:64px]">
              <div className="min-w-0 flex-1">
                <p className="text-[0.65rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] mb-0.5">
                  {functionLabel} · {location}
                </p>
                <h2
                  className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] truncate"
                  style={{ fontSize: "1rem", fontWeight: 500 }}
                >
                  {title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onApply}
                className="group/cta shrink-0 inline-flex items-center gap-2 h-10 px-5 rounded-[2px] bg-[var(--color-accent-primary)] text-white text-[0.85rem] tracking-wide hover:bg-[var(--color-accent-deep)] transition-colors duration-[240ms]"
              >
                Apply
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-[240ms] group-hover/cta:translate-x-1"
                />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
