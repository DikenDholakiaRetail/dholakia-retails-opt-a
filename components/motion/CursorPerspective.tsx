"use client";

import { motion, useMotionValue, useSpring, useReducedMotion as fmReducedMotion } from "framer-motion";
import { useRef } from "react";
import { SPRING_TILT } from "@/lib/motion";

type Props = {
  maxAngle?: number;
  perspective?: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * CursorPerspective — spec §1.4. Image rotates ±maxAngle (default 2°) toward cursor.
 * perspective(1500px) on parent. Framer Motion spring (stiffness 100, damping 20).
 */
export default function CursorPerspective({
  maxAngle = 2,
  perspective = 1500,
  className,
  children,
}: Props) {
  const reduced = fmReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, SPRING_TILT);
  const sry = useSpring(ry, SPRING_TILT);

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    ry.set(nx * maxAngle);
    rx.set(-ny * maxAngle);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ perspective: `${perspective}px` }}
    >
      <motion.div
        style={
          reduced
            ? { width: "100%", height: "100%" }
            : { rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", width: "100%", height: "100%" }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
