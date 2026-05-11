"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CircleDot } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "@/components/motion/CountUp";
import EditorialImage from "@/components/motion/EditorialImage";
import TiltCard from "@/components/motion/TiltCard";
import { EASE_STANDARD } from "@/lib/motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { GROUP_TIMELINE } from "@/lib/media";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * P02-S05 Timeline — per Build Spec page 51–52.
 *
 * Layout:
 *   • Center-aligned 1px Soft Sky vertical rail, full section height
 *   • Lucide circle-dot nodes (12px, Electric Blue), illuminated sequentially
 *   • Zigzag rhythm: odd left, even right
 *   • Year (Syne italic, Electric Blue) → H3 → 60–80 word body
 *   • Optional 4:5 archival photograph alongside each milestone
 *
 * Motion:
 *   • Rail: SVG <line> with stroke-dashoffset 1→0 scrubbed via ScrollTrigger
 *     (pathLength="1" + non-scaling-stroke avoids the prior viewBox-units bug)
 *   • Node: scale 0→1 + Electric Blue glow pulse
 *   • Block: fade-up 24px Y, 600ms, after node illumination
 *   • Year: count-up animation on first appearance
 *   • Mouse Parallax: PortraitSubtleDrift on each photo (8px amplitude)
 *   • Mouse Tracking: Card3DTilt at 2° on milestone photos
 */

type Milestone = { yearLabel: string; yearCount?: number; title: string; body: string };

const MILESTONES: Milestone[] = [
  {
    yearLabel: "2024",
    yearCount: 2024,
    title: "Dholakia Retail is incorporated.",
    body:
      "Dholakia Retail Private Limited is incorporated in 2024, establishing the corporate vehicle through which a new generation of Indian luxury jewellery brands will be conceived, capitalised, and stewarded. The company is structured from inception with institutional governance, long-horizon ownership, and the operating discipline required to build a multi-house portfolio with patience and precision.",
  },
  {
    yearLabel: "Foundation",
    title: "Corporate identity and registered office established in Surat.",
    body:
      "Corporate identity, governance frameworks, and the registered office at the Gem & Jewellery Park, Ichhapore are formally established — placing the platform inside Surat's centre of cutting, polishing, and craft expertise. Reporting structures, financial controls, and brand-stewardship protocols are codified to support a portfolio designed to operate across multiple price points, design territories, and audiences.",
  },
  {
    yearLabel: "Next chapter",
    title: "Portfolio expansion and retail brand development.",
    body:
      "The platform begins building out its first house — Mayavé — and architects future territories spanning bespoke fine jewellery, bridal, everyday luxury, and high-jewellery editions. Each future house is designed to serve a specific audience and emotional register while drawing on a shared standard of provenance, governance, and craft. The roadmap is deliberately patient: brands launch only when their foundations meet the standard.",
  },
];

function MilestonePhoto({
  src,
  sectionRef,
}: {
  src: (typeof GROUP_TIMELINE)[number];
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  // PortraitSubtleDrift — translate the *wrapper*, not the TiltCard child,
  // so the rotating element is not the parallax target (avoids the
  // bounding-rect feedback loop the TiltCard pairing-rules call out).
  const driftRef = useRef<HTMLDivElement>(null);
  useMouseParallax(sectionRef, [{ ref: driftRef, amplitude: 8 }], {
    duration: 0.8,
    ease: "power2.out",
  });

  return (
    <div ref={driftRef} style={{ willChange: "transform" }}>
      <TiltCard angle="gentle" scale={1.015}>
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-elevated)]">
          <EditorialImage
            src={src}
            fill
            sizes="(min-width: 768px) 240px, 90vw"
            darkOverlay="strong"
          />
        </div>
      </TiltCard>
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const railFillRef = useRef<SVGLineElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const fill = railFillRef.current;
    const section = sectionRef.current;
    if (!fill || !section) return;

    if (reduced) {
      fill.setAttribute("stroke-dashoffset", "0");
      return;
    }

    gsap.set(fill, { attr: { "stroke-dashoffset": 1 } });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "bottom 30%",
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.set(fill, { attr: { "stroke-dashoffset": 1 - self.progress } });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [reduced]);

  return (
    <section ref={sectionRef} className="bg-white" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
      <div className="container-editorial">
        <div className="max-w-2xl mb-16 md:mb-24">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Timeline
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE_STANDARD }}
            style={{
              fontSize: "clamp(1.875rem, 3.4vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
            }}
          >
            From incorporation to future portfolio growth
          </motion.h2>
        </div>

        <div className="relative">
          {/* Rail — SVG <line> per spec. pathLength="1" + non-scaling-stroke +
              preserveAspectRatio="none" lets the line stretch to the section's
              full height while keeping stroke-dashoffset in normalised units
              (1 = fully hidden, 0 = fully drawn). Track and fill stack within
              the same SVG so they share geometry exactly. */}
          <svg
            aria-hidden
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0"
            width="1"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 1 100"
            style={{ overflow: "visible" }}
          >
            <line
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="100"
              stroke="rgba(107, 138, 201, 0.30)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            <line
              ref={railFillRef}
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="100"
              stroke="var(--color-accent-primary)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
              style={{ willChange: "stroke-dashoffset" }}
            />
          </svg>

          <ol className="relative space-y-12 md:space-y-16">
            {MILESTONES.map((m, i) => {
              const isRight = i % 2 === 1;
              const photo = GROUP_TIMELINE[i];
              return (
                <motion.li
                  key={m.title}
                  className="relative"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: EASE_STANDARD }}
                >
                  {/* Node — Lucide circle-dot, 12px Electric Blue, with glow pulse */}
                  <motion.span
                    aria-hidden
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 -translate-y-1 inline-flex items-center justify-center z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  >
                    <span
                      className="absolute w-6 h-6 rounded-full bg-[var(--color-accent-primary)] opacity-25"
                      style={{ animation: "pulseGlow 2s ease-out 0.4s 1 both" }}
                    />
                    <span className="relative inline-flex items-center justify-center bg-white rounded-full">
                      <CircleDot
                        size={12}
                        strokeWidth={2.5}
                        className="text-[var(--color-accent-primary)]"
                      />
                    </span>
                  </motion.span>

                  <div
                    className={[
                      "ml-16 md:ml-0 md:w-[46%]",
                      isRight ? "md:ml-auto md:pl-14" : "md:mr-auto md:pr-14",
                    ].join(" ")}
                  >
                    {/* Photo + text alongside one another within the milestone
                        block (per spec: "4:5 archival photograph alongside
                        each milestone"). Photo sits on the outer edge so the
                        text sits closer to the rail. Mobile: photo stacks above. */}
                    <div
                      className={[
                        "flex flex-col gap-6 md:gap-8",
                        photo
                          ? isRight
                            ? "md:flex-row-reverse md:items-start"
                            : "md:flex-row md:items-start"
                          : "",
                      ].join(" ")}
                    >
                      {photo && (
                        <div className="md:w-[42%] md:shrink-0">
                          <MilestonePhoto src={photo} sectionRef={sectionRef} />
                        </div>
                      )}

                      <div className={photo ? "md:flex-1" : ""}>
                        <p
                          className="font-[family-name:var(--font-display)] italic text-[var(--color-accent-primary)] mb-3"
                          style={{ fontSize: "1.5rem", lineHeight: 1 }}
                        >
                          {m.yearCount ? <CountUp to={m.yearCount} durationMs={1000} /> : m.yearLabel}
                        </p>
                        <h3
                          className="text-[var(--color-text-primary)] mb-4"
                          style={{ fontSize: "1.5rem", lineHeight: 1.25, fontWeight: 500 }}
                        >
                          {m.title}
                        </h3>
                        <p className="text-[var(--color-text-body)] leading-relaxed">
                          {m.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulseGlow {
          0% { transform: scale(0.6); opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
