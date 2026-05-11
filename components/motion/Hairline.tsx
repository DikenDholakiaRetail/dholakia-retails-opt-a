"use client";

import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";
import { EASE_STANDARD } from "@/lib/motion";

type Props = {
  width?: number | string;
  className?: string;
  durationMs?: number;
  color?: string;
  delay?: number;
  orientation?: "horizontal" | "vertical";
};

/** SVG draw-in hairline. Spec: 800ms left-to-right (or top-to-bottom). */
export default function Hairline({
  width = 80,
  className = "",
  durationMs = 800,
  color = "currentColor",
  delay = 0,
  orientation = "horizontal",
}: Props) {
  const reduced = fmReducedMotion();

  if (orientation === "vertical") {
    return (
      <motion.span
        aria-hidden
        className={`block ${className}`}
        style={{ width: 1, background: color }}
        initial={{ height: 0 }}
        whileInView={{ height: typeof width === "number" ? width : "100%" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: durationMs / 1000, delay: delay / 1000, ease: EASE_STANDARD }
        }
      />
    );
  }

  return (
    <motion.span
      aria-hidden
      className={`block ${className}`}
      style={{ height: 1, background: color }}
      initial={{ width: 0 }}
      whileInView={{ width }}
      viewport={{ once: true, amount: 0.6 }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: durationMs / 1000, delay: delay / 1000, ease: EASE_STANDARD }
      }
    />
  );
}
