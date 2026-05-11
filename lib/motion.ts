// Shared motion constants for GSAP + Framer Motion.
// Single source of truth: cubic-bezier(0.65, 0, 0.35, 1) — expo-out.

export const EASE_STANDARD: [number, number, number, number] = [0.65, 0, 0.35, 1];
export const GSAP_EASE = "expo.out"; // closest GSAP equivalent for compound timelines
export const GSAP_EASE_CSS = "cubic-bezier(0.65, 0, 0.35, 1)";

export const SPRING_MAGNETIC = { stiffness: 150, damping: 15 } as const;
export const SPRING_TILT = { stiffness: 100, damping: 20 } as const;
