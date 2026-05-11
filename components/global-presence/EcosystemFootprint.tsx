"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import TiltCard from "@/components/motion/TiltCard";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P08-S02 Ecosystem Footprint.
 * 3-column location card grid. Each card: city → role.
 * SVG connector lines between cities draw L→R on entry.
 * Optional simplified map SVG behind cards at 6% opacity.
 * CardSubtleLift on group hover. Card3DTilt 3°. Cards stagger 100ms.
 */

const LOCATIONS = [
  {
    city: "Surat",
    role: "Headquarters and diamond ecosystem base",
  },
  {
    city: "Mumbai",
    role: "Commercial and brand activation hub",
  },
  {
    city: "New York-linked group presence",
    role: "Wider Dholakia Group context",
  },
];

export default function EcosystemFootprint() {
  return (
    <section
      className="relative bg-white overflow-hidden"
      style={{ paddingTop: "160px", paddingBottom: "160px" }}
    >
      {/* Optional simplified map background at 6% opacity */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE_STANDARD }}
      >
        <svg
          aria-hidden
          className="w-full h-full"
          viewBox="0 0 1600 800"
          preserveAspectRatio="xMidYMid meet"
        >
          <g fill="#0B1426">
            {Array.from({ length: 280 }).map((_, i) => {
              const cx = 200 + (i * 17) % 1200;
              const cy = 180 + Math.floor(i / 28) * 28 + ((i * 9) % 18);
              return <circle key={i} cx={cx} cy={cy} r="1.4" />;
            })}
          </g>
        </svg>
      </motion.div>

      <div className="relative container-editorial">
        <div className="max-w-2xl mb-16 md:mb-20">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            Ecosystem Footprint
          </motion.p>
          <RevealText
            text="From Surat outward."
            as="h2"
            className="text-[var(--color-text-primary)] font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(1.875rem, 3.4vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              fontWeight: 500,
            }}
            staggerMs={50}
            durationMs={650}
          />
        </div>

        <div className="relative">
          {/* SVG connector line between the 3 cards (desktop) */}
          <svg
            aria-hidden
            className="hidden lg:block absolute left-0 right-0 top-[60px] pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 1000 12"
            style={{ height: 12, width: "100%" }}
          >
            <defs>
              <marker
                id="ec-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M0 0 L10 5 L0 10 Z" fill="var(--color-accent-primary)" />
              </marker>
            </defs>
            <motion.path
              d="M120 6 L880 6"
              stroke="var(--color-accent-primary)"
              strokeWidth="1"
              fill="none"
              vectorEffect="non-scaling-stroke"
              markerEnd="url(#ec-arrow)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.4, ease: EASE_STANDARD }}
            />
          </svg>

          <motion.ol
            className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none items-stretch group/grid"
            style={{ perspective: "1000px" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {LOCATIONS.map((loc, i) => (
              <motion.li
                key={loc.city}
                className="h-full"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE_STANDARD },
                  },
                }}
              >
                <TiltCard angle="standard" scale={1.005} className="h-full">
                  <div className="group/card relative bg-white border border-[rgba(11,20,38,0.10)] p-7 h-full flex flex-col transition-[transform,opacity,border-color] duration-300 ease-out group-hover/grid:[&:not(:hover)]:opacity-70 hover:!opacity-100 hover:!translate-y-[-6px] hover:border-[var(--color-accent-primary)]">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[var(--color-accent-primary)]">
                        <MapPin size={24} strokeWidth={1.5} />
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] tabular-nums">
                        0{i + 1}
                      </span>
                    </div>

                    <h3
                      className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-4 min-h-[3.5rem]"
                      style={{
                        fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)",
                        fontWeight: 500,
                        lineHeight: 1.25,
                      }}
                    >
                      {loc.city}
                    </h3>
                    <p className="text-[var(--color-text-body)] leading-relaxed flex-1">
                      {loc.role}
                    </p>
                  </div>
                </TiltCard>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
