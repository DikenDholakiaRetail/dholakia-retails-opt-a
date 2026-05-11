"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";
import EditorialImage from "@/components/motion/EditorialImage";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { EASE_STANDARD } from "@/lib/motion";
import { GLOBAL_HERO } from "@/lib/media";

/**
 * P08-S01 Global Presence Hero — Built in Surat. Positioned for Broader Markets.
 * 100vh full-bleed. Background: stylised world map illustration with key markers.
 * Hero3LayerParallax with map-specific tuning. Map markers pulse on enter.
 * Mouse over a marker enlarges it and reveals city name.
 * H1 word-by-word.
 */

type Marker = {
  id: string;
  city: string;
  // SVG viewBox coords (1600 × 800 equirectangular-ish stylised)
  x: number;
  y: number;
};

const MARKERS: Marker[] = [
  { id: "surat", city: "Surat", x: 1080, y: 360 },
  { id: "mumbai", city: "Mumbai", x: 1060, y: 380 },
  { id: "antwerp", city: "Antwerp", x: 800, y: 250 },
  { id: "newyork", city: "New York", x: 430, y: 290 },
  { id: "hongkong", city: "Hong Kong", x: 1240, y: 360 },
  { id: "dubai", city: "Dubai", x: 950, y: 340 },
];

export default function PresenceHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerBg = useRef<HTMLDivElement>(null);
  const layerOverlay = useRef<HTMLDivElement>(null);
  const layerType = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useMouseParallax(
    sectionRef,
    [
      { ref: layerBg, amplitude: 12 },
      { ref: layerOverlay, amplitude: 4, counter: true },
      { ref: layerType, amplitude: 6, counter: true },
    ],
    { duration: 0.6, ease: "power2.out" }
  );

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className="relative h-screen min-h-[640px] w-full overflow-hidden text-white"
    >
      {/* Layer 1 — Surat-architecture / world-map photograph backdrop +
          SVG dotted-map overlay (kept on-spec). */}
      <motion.div
        ref={layerBg}
        aria-hidden
        className="absolute inset-[-2%]"
        style={{
          background:
            "radial-gradient(70% 80% at 50% 50%, #14213d 0%, #0B1426 55%, #050A14 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE_STANDARD }}
      >
        {/* Photograph layer at low opacity — subtle architectural depth */}
        <div className="absolute inset-0 opacity-[0.45]">
          <EditorialImage src={GLOBAL_HERO} fill priority sizes="100vw" darkOverlay="cinematic" />
        </div>
        {/* Stylised dotted-grid world map */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1600 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B6FFF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          {/* Continent silhouettes — abstract dotted */}
          <g fill="#9bb5ff" opacity="0.18">
            {/* North America */}
            {Array.from({ length: 90 }).map((_, i) => {
              const cx = 250 + (i * 13) % 280;
              const cy = 200 + Math.floor(i / 22) * 30 + ((i * 7) % 18);
              return <circle key={`na-${i}`} cx={cx} cy={cy} r="1.2" />;
            })}
            {/* South America */}
            {Array.from({ length: 50 }).map((_, i) => {
              const cx = 480 + (i * 9) % 130;
              const cy = 420 + Math.floor(i / 12) * 30 + ((i * 5) % 14);
              return <circle key={`sa-${i}`} cx={cx} cy={cy} r="1.1" />;
            })}
            {/* Europe */}
            {Array.from({ length: 70 }).map((_, i) => {
              const cx = 720 + (i * 11) % 200;
              const cy = 200 + Math.floor(i / 18) * 26 + ((i * 4) % 15);
              return <circle key={`eu-${i}`} cx={cx} cy={cy} r="1.1" />;
            })}
            {/* Africa */}
            {Array.from({ length: 90 }).map((_, i) => {
              const cx = 800 + (i * 9) % 200;
              const cy = 320 + Math.floor(i / 18) * 26 + ((i * 5) % 16);
              return <circle key={`af-${i}`} cx={cx} cy={cy} r="1.1" />;
            })}
            {/* Asia */}
            {Array.from({ length: 130 }).map((_, i) => {
              const cx = 1000 + (i * 13) % 380;
              const cy = 220 + Math.floor(i / 26) * 28 + ((i * 5) % 18);
              return <circle key={`as-${i}`} cx={cx} cy={cy} r="1.2" />;
            })}
            {/* Oceania */}
            {Array.from({ length: 30 }).map((_, i) => {
              const cx = 1300 + (i * 11) % 140;
              const cy = 540 + Math.floor(i / 10) * 24 + ((i * 4) % 12);
              return <circle key={`oc-${i}`} cx={cx} cy={cy} r="1.1" />;
            })}
          </g>

          {/* Connection lines from Surat hub to each marker */}
          {MARKERS.filter((m) => m.id !== "surat").map((m) => (
            <motion.path
              key={`line-${m.id}`}
              d={`M ${1080} ${360} Q ${(1080 + m.x) / 2} ${Math.min(360, m.y) - 60} ${m.x} ${m.y}`}
              stroke="#3B6FFF"
              strokeOpacity="0.35"
              strokeWidth="0.6"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.35 }}
              transition={{ duration: 1.6, delay: 1.2, ease: EASE_STANDARD }}
            />
          ))}

          {/* Markers */}
          {MARKERS.map((m, i) => {
            const isActive = active === m.id;
            const isHub = m.id === "surat";
            return (
              <g
                key={m.id}
                transform={`translate(${m.x} ${m.y})`}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setActive(m.id)}
                onMouseLeave={() => setActive(null)}
              >
                {/* Pulsing halo */}
                <motion.circle
                  r={isActive ? 18 : isHub ? 14 : 8}
                  fill="url(#map-glow)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 0, 0.6] }}
                  transition={{
                    duration: 3,
                    delay: 1.5 + i * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.circle
                  r={isActive ? 6 : isHub ? 5 : 3.5}
                  fill="#3B6FFF"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.4 + i * 0.1,
                    ease: EASE_STANDARD,
                  }}
                />
                <motion.circle
                  r={isActive ? 11 : isHub ? 9 : 6}
                  fill="none"
                  stroke="#3B6FFF"
                  strokeWidth="0.8"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.7 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.5 + i * 0.1,
                    ease: EASE_STANDARD,
                  }}
                />
                {/* City label revealed on hover OR for hub */}
                {(isActive || isHub) && (
                  <motion.g
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, ease: EASE_STANDARD }}
                  >
                    <rect
                      x={-40}
                      y={-32}
                      width={80}
                      height={20}
                      rx={2}
                      fill="#0B1426"
                      stroke="#3B6FFF"
                      strokeWidth="0.6"
                      strokeOpacity="0.6"
                    />
                    <text
                      x={0}
                      y={-18}
                      fontSize="11"
                      fill="#FFFFFF"
                      textAnchor="middle"
                      style={{
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {m.city}
                    </text>
                  </motion.g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
            backgroundSize: "3px 3px",
          }}
        />
      </motion.div>

      {/* Layer 2 — bottom gradient for legibility */}
      <motion.div
        ref={layerOverlay}
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(5,10,20,0.9) 0%, rgba(5,10,20,0.4) 50%, rgba(5,10,20,0) 100%)",
        }}
      />

      {/* Layer 3 — typography lower-left */}
      <div
        ref={layerType}
        className="relative z-10 h-full container-editorial flex items-end pb-24 md:pb-32 pt-32"
      >
        <div className="max-w-3xl">
          <motion.p
            className="eyebrow mb-6"
            style={{ color: "var(--color-accent-soft)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE_STANDARD }}
          >
            Global Presence
          </motion.p>
          <RevealText
            text="Built in Surat. Positioned for Broader Markets."
            as="h1"
            className="text-white mb-7"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
            staggerMs={60}
            durationMs={800}
            delay={400}
            triggerOnView={false}
          />
          <motion.p
            className="body-lead text-white/80 max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4, ease: EASE_STANDARD }}
          >
            Dholakia Retail draws strength from Surat&apos;s place within the
            diamond ecosystem while aligning to a broader global growth story.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
