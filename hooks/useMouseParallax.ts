"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "./useReducedMotion";

export type ParallaxLayer = {
  ref: React.RefObject<HTMLElement | null>;
  /** translation amplitude in px, applied to both axes */
  amplitude: number;
  /** if true, moves opposite to cursor (creates true depth illusion) */
  counter?: boolean;
};

/**
 * Mouse Parallax engine — Hero3LayerParallax / EditorialImageDrift / DocumentaryDeepParallax.
 * Uses gsap.quickTo for 60fps performance. Disabled below 768px and on prefers-reduced-motion.
 */
export function useMouseParallax(
  containerRef: React.RefObject<HTMLElement | null>,
  layers: ParallaxLayer[],
  options: { duration?: number; ease?: string } = {}
) {
  const reduced = useReducedMotion();
  const optsRef = useRef(options);
  optsRef.current = options;

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    const container = containerRef.current;
    if (!container) return;

    const duration = optsRef.current.duration ?? 0.6;
    const ease = optsRef.current.ease ?? "power2.out";

    const setters = layers
      .filter((l) => l.ref.current)
      .map((l) => ({
        layer: l,
        x: gsap.quickTo(l.ref.current!, "x", { duration, ease }),
        y: gsap.quickTo(l.ref.current!, "y", { duration, ease }),
      }));

    let raf = 0;
    let pendingX = 0;
    let pendingY = 0;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // -1..+1 normalized cursor position relative to container center
      pendingX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pendingY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          setters.forEach(({ layer, x, y }) => {
            const dir = layer.counter ? -1 : 1;
            x(pendingX * layer.amplitude * dir);
            y(pendingY * layer.amplitude * dir);
          });
        });
      }
    };

    const onLeave = () => {
      setters.forEach(({ x, y }) => {
        x(0);
        y(0);
      });
    };

    container.addEventListener("mousemove", onMove, { passive: true });
    container.addEventListener("mouseleave", onLeave);

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
    // layers identity is stable per-render in callers; intentionally not deep-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, containerRef]);
}
