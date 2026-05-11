"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, FileText, MapPin, Briefcase } from "lucide-react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import RevealText from "@/components/motion/RevealText";
import EditorialImage from "@/components/motion/EditorialImage";
import CountUp from "@/components/motion/CountUp";
import Hairline from "@/components/motion/Hairline";
import TiltCard from "@/components/motion/TiltCard";
import CursorPerspective from "@/components/motion/CursorPerspective";
import { EASE_STANDARD } from "@/lib/motion";
import { COMPANY } from "@/lib/nav";
import { HOME_CORPORATE_SNAPSHOT } from "@/lib/media";

/**
 * P01-S04 Corporate Snapshot.
 * Bento, 4 cells, Off-White.
 * Cell 1 (60% × full): video loop placeholder. EditorialImageDrift ±8px, 1.03 scale.
 *   CursorPerspective ±2°.
 * Cells 2–4: Card3DTilt 3° (subtler, numbers must stay readable).
 * Counters: 2024 count-up over 1.4s, ease-out.
 * CIN: typewriter 30ms/char.
 * Address: word-by-word stagger 40ms.
 * Industry tag: scale 0→1 + rotate -8°→0°, 600ms spring.
 * Hairline dividers SVG draw-in 600ms, staggered 100ms.
 */

function Typewriter({ text, charMs = 30 }: { text: string; charMs?: number }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", whiteSpace: "pre" }}>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.01, delay: (i * charMs) / 1000 }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

function AddressReveal({ text }: { text: string }) {
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04 } },
      }}
    >
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_STANDARD } },
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {w}{i < text.split(" ").length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function CorporateSnapshot() {
  const sectionRef = useRef<HTMLElement>(null);
  const cellVideoRef = useRef<HTMLDivElement>(null);

  // EditorialImageDrift on Cell 1 only — ±8px, scale 1.03 base.
  useMouseParallax(sectionRef, [{ ref: cellVideoRef, amplitude: 8 }], {
    duration: 0.5,
    ease: "power2.out",
  });

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      className="bg-[var(--color-bg-elevated)]"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="container-editorial">
        <div className="max-w-2xl mb-14">
          <RevealText
            text="A young company with a clear mandate."
            as="h2"
            className="text-[var(--color-text-primary)]"
            style={{
              fontSize: "clamp(1.875rem, 3.4vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
            }}
            staggerMs={50}
            durationMs={650}
          />
        </div>

        {/* Bento: image left (~60%), all 4 metric cards stacked right column (~40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:items-stretch">
          {/* LEFT — featured visual, full height of column */}
          <CursorPerspective maxAngle={2} className="lg:col-span-3">
            <motion.div
              ref={cellVideoRef}
              className="relative h-full min-h-[360px] aspect-[16/10] lg:aspect-auto rounded-sm overflow-hidden"
              style={{ background: "#0B1426", transform: "scale(1.03)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE_STANDARD }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(80% 80% at 70% 40%, #1a3a78 0%, #0B1426 60%, #050A14 100%)",
                  animation: "kenBurns 30s ease-in-out infinite alternate",
                }}
              >
                <EditorialImage
                  src={HOME_CORPORATE_SNAPSHOT}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  darkOverlay="cinematic"
                />
              </div>
              {/* <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, rgba(255,255,255,0.4) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.4) 75%), linear-gradient(45deg, rgba(255,255,255,0.4) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.4) 75%)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 10px 10px",
                }}
              /> */}
              <div className="absolute bottom-6 left-6 right-6 text-white/70 text-[0.7rem] tracking-[0.16em] uppercase font-[family-name:var(--font-mono)]">
                Gem &amp; Jewellery Park · Surat
              </div>
            </motion.div>
          </CursorPerspective>

          {/* RIGHT — single column, 4 stacked metric cells */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <MetricCell
              Icon={Calendar}
              label="Established"
              staggerDelay={0}
              valueNode={
                <span
                  className="font-[family-name:var(--font-display)] italic"
                  style={{ fontSize: "2.5rem", color: "var(--color-text-primary)", fontVariantNumeric: "tabular-nums" }}
                >
                  <CountUp to={2024} durationMs={1400} />
                </span>
              }
            />
            <MetricCell
              Icon={Briefcase}
              label="Industry"
              staggerDelay={100}
              valueNode={
                <motion.span
                  className="font-[family-name:var(--font-display)]"
                  style={{ fontSize: "1.25rem", color: "var(--color-text-primary)", display: "inline-block" }}
                  initial={{ scale: 0, rotate: -8 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.2 }}
                >
                  Luxury Retail &amp; Jewellery
                </motion.span>
              }
            />
            <MetricCell
              Icon={FileText}
              label="Corporate Identity Number"
              staggerDelay={200}
              valueNode={
                <span style={{ fontSize: "1rem", color: "var(--color-text-primary)" }}>
                  <Typewriter text={COMPANY.cin} charMs={30} />
                </span>
              }
            />
            <MetricCell
              Icon={MapPin}
              label="Registered Office"
              staggerDelay={300}
              valueNode={
                <span style={{ fontSize: "0.95rem", color: "var(--color-text-primary)", lineHeight: 1.6 }}>
                  <AddressReveal text={COMPANY.address} />
                </span>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCell({
  Icon,
  label,
  valueNode,
  staggerDelay = 0,
}: {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  valueNode: React.ReactNode;
  staggerDelay?: number;
}) {
  return (
    <TiltCard angle="standard" scale={1.01} className="flex-1">
      <div className="relative bg-white p-7 h-full will-change-transform">
        {/* Hairline divider top — SVG draw-in 600ms, staggered */}
        <div className="absolute top-0 left-0 right-0">
          <Hairline
            width="100%"
            color="var(--color-accent-primary)"
            durationMs={600}
            delay={staggerDelay}
          />
        </div>
        <div className="flex items-center gap-2 text-[var(--color-text-muted)] mb-3 pt-1">
          <span className="text-[var(--color-accent-primary)]">
            <Icon size={16} strokeWidth={1.5} />
          </span>
          <span className="text-[0.7rem] tracking-[0.14em] uppercase font-medium">{label}</span>
        </div>
        <div>{valueNode}</div>
      </div>
    </TiltCard>
  );
}
