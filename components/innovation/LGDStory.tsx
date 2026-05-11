"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import EditorialImage from "@/components/motion/EditorialImage";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import CursorPerspective from "@/components/motion/CursorPerspective";
import { EASE_STANDARD } from "@/lib/motion";
import { INNOVATION_LGD } from "@/lib/media";

/**
 * P07-S02 Lab-Grown Diamond Story.
 * Editorial split-screen 60/40.
 * Left: Hero3LayerParallax (image side); CursorPerspective ±2°.
 * Right: stagger-reveal heading + body.
 */
export default function LGDStory() {
  const containerRef = useRef<HTMLElement>(null);
  const layerImage = useRef<HTMLDivElement>(null);
  const layerOverlay = useRef<HTMLDivElement>(null);

  useMouseParallax(
    containerRef,
    [
      { ref: layerImage, amplitude: 15 },
      { ref: layerOverlay, amplitude: 5, counter: true },
    ],
    { duration: 0.6, ease: "power2.out" }
  );

  return (
    <section ref={containerRef} className="relative bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-5" style={{ minHeight: "90vh" }}>
        {/* LEFT 60% — scientific illustration / lab visual */}
        <div className="lg:col-span-3 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
          <CursorPerspective maxAngle={2} className="absolute inset-0">
            <motion.div
              ref={layerImage}
              className="absolute inset-[-3%]"
              initial={{ scale: 1.04, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, ease: EASE_STANDARD }}
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, #1a2e55 0%, #0e1c3a 55%, #060B17 100%)",
              }}
            >
              <EditorialImage
                src={INNOVATION_LGD}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                darkOverlay="cinematic"
              />
              {/* CVD chamber abstract illustration */}
              <svg
                aria-hidden
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 800 600"
              >
                <defs>
                  <linearGradient id="lgd-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#9bb5ff" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#3B6FFF" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                {/* CVD chamber outer ring */}
                <circle cx="400" cy="300" r="220" stroke="url(#lgd-g)" strokeWidth="1.2" fill="none" />
                <circle cx="400" cy="300" r="170" stroke="url(#lgd-g)" strokeWidth="0.8" fill="none" opacity="0.7" />
                {/* seed crystal */}
                <polygon
                  points="380,320 420,320 440,290 420,260 380,260 360,290"
                  fill="url(#lgd-g)"
                  opacity="0.75"
                />
                {/* growth rays */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <line
                    key={i}
                    x1={400}
                    y1={290}
                    x2={400 + Math.cos((i * Math.PI) / 6) * 200}
                    y2={290 + Math.sin((i * Math.PI) / 6) * 200}
                    stroke="url(#lgd-g)"
                    strokeWidth="0.6"
                    opacity="0.4"
                  />
                ))}
                {/* horizontal scale ticks */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <line
                    key={`t-${i}`}
                    x1={140 + i * 65}
                    y1={560}
                    x2={140 + i * 65}
                    y2={570}
                    stroke="#9bb5ff"
                    strokeOpacity="0.5"
                    strokeWidth="0.6"
                  />
                ))}
                <line x1="140" y1="570" x2="660" y2="570" stroke="#9bb5ff" strokeOpacity="0.4" strokeWidth="0.5" />
              </svg>
            </motion.div>
            <motion.div
              ref={layerOverlay}
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }}
            />
          </CursorPerspective>
        </div>

        {/* RIGHT 40% — content stack */}
        <div className="lg:col-span-2 bg-[var(--color-bg-elevated)] flex items-center">
          <motion.div
            className="px-6 sm:px-10 lg:px-14 py-20 lg:py-28 max-w-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.p
              className="eyebrow mb-5"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_STANDARD } },
              }}
            >
              Lab-Grown Diamond Story
            </motion.p>

            <RevealText
              text="Technology as controlled brilliance."
              as="h2"
              className="text-[var(--color-text-primary)] mb-6"
              style={{
                fontSize: "clamp(1.875rem, 3.2vw, 2.75rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
              staggerMs={60}
              durationMs={700}
            />

            <motion.p
              className="text-[var(--color-text-body)] leading-relaxed body-lead"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
              }}
            >
              Public Dholakia Group messaging describes advanced CVD processes
              refined to reduce colour and defects while recreating the natural
              conditions that form diamond.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
