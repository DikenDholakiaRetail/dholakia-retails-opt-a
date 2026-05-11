"use client";

import { motion, useMotionValue, useSpring, useReducedMotion as fmReducedMotion } from "framer-motion";
import { useRef } from "react";
import { SPRING_TILT } from "@/lib/motion";

type Angle = "gentle" | "standard" | "expressive";
const ANGLE: Record<Angle, number> = { gentle: 2, standard: 3, expressive: 4 };

type Props = {
  angle?: Angle;
  scale?: number;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "article" | "li";
};

/**
 * Card3DTilt — spec §1.4. Cursor offset normalised, applied as rotateX/rotateY.
 *
 * Stability notes:
 *   • The element is hinted as a GPU composited layer via `willChange` and
 *     `backfaceVisibility: hidden`. Without this, the spring updates can
 *     trigger paint on descendants, producing visible jitter when paired
 *     with parallax-driven inner movement.
 *   • A `transformPerspective` makes the rotation read as depth without
 *     requiring a parent `perspective` container.
 *   • `prefers-reduced-motion` degrades to a soft 1.01 hover scale.
 *
 * Pairing rules:
 *   • Don't put `useMouseParallax` on a child of a TiltCard — the parallax
 *     reads cursor position from a child whose bounding rect changes as the
 *     parent rotates, creating a feedback loop. Use one or the other.
 */
export default function TiltCard({
  angle = "standard",
  scale = 1.02,
  className,
  children,
  as = "div",
}: Props) {
  const reduced = fmReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sc = useMotionValue(1);
  const srx = useSpring(rx, SPRING_TILT);
  const sry = useSpring(ry, SPRING_TILT);
  const ssc = useSpring(sc, SPRING_TILT);

  const max = ANGLE[angle];

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    ry.set(nx * max);
    rx.set(-ny * max);
    sc.set(scale);
  };

  const onLeave = () => {
    rx.set(0); ry.set(0); sc.set(1);
  };

  const sharedProps = {
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className,
    style: reduced
      ? undefined
      : {
          rotateX: srx,
          rotateY: sry,
          scale: ssc,
          transformPerspective: 1200,
          transformStyle: "preserve-3d" as const,
          willChange: "transform" as const,
          backfaceVisibility: "hidden" as const,
        },
    whileHover: reduced ? { scale: 1.01, transition: { duration: 0.3 } } : undefined,
  };

  const setRef = (el: HTMLElement | null) => { ref.current = el; };

  if (as === "article") {
    return (
      <motion.article ref={setRef} {...sharedProps}>
        {children}
      </motion.article>
    );
  }
  if (as === "li") {
    return (
      <motion.li ref={setRef} {...sharedProps}>
        {children}
      </motion.li>
    );
  }
  return (
    <motion.div ref={setRef} {...sharedProps}>
      {children}
    </motion.div>
  );
}
