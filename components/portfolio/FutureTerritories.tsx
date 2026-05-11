"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion as fmReducedMotion,
} from "framer-motion";
import TiltCard from "@/components/motion/TiltCard";
import { EASE_STANDARD, SPRING_TILT } from "@/lib/motion";

type Territory = { num: string; name: string; description: string };

const TERRITORIES: Territory[] = [
  { num: "01", name: "Bespoke Fine Jewellery", description: "Private commissions; deeply individual." },
  { num: "02", name: "Bridal & Commitment", description: "Ceremony pieces built to be inherited." },
  { num: "03", name: "Everyday Luxury", description: "Wearable refinement for daily presence." },
  { num: "04", name: "High Jewellery Editions", description: "Rare, museum-grade compositions." },
];

/**
 * P03-S04 Future Territories.
 * Cards stagger 100ms, fade-up 16px Y. Numerals scale 1.4 → 1.0.
 * Hover: card lifts +6px, Electric Blue hairline draws around edges.
 */
export default function FutureTerritories() {
  return (
    <section id="future" className="bg-[var(--color-bg-elevated)] py-28 md:py-36">
      <div className="container-editorial">
        <div className="max-w-2xl mb-14 md:mb-16">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            Future Territories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE_STANDARD }}
            className="font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(1.875rem, 3.4vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              fontWeight: 500,
            }}
          >
            A forward-pointing portfolio.
          </motion.h2>
        </div>

        <motion.ol
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {TERRITORIES.map((t) => (
            <motion.li
              key={t.num}
              className="list-none h-full"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
              }}
            >
              <TerritoryCard t={t} />
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

function TerritoryCard({ t }: { t: Territory }) {
  const reduced = fmReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const numRx = useMotionValue(0);
  const numRy = useMotionValue(0);
  const sNumRx = useSpring(numRx, SPRING_TILT);
  const sNumRy = useSpring(numRy, SPRING_TILT);

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    numRy.set(nx * 4);
    numRx.set(-ny * 4);
  };

  const onLeave = () => {
    numRx.set(0);
    numRy.set(0);
  };

  return (
    <TiltCard angle="standard" scale={1.01} className="h-full">
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative bg-white border border-black/10 p-7 md:p-8 h-full flex flex-col transition-transform duration-500 ease-out hover:-translate-y-1.5"
        style={{ perspective: 1000 }}
      >
        <span className="pointer-events-none absolute top-0 left-0 h-px bg-[var(--color-accent-primary)] w-0 group-hover:w-full transition-[width] duration-300 ease-out" />
        <span className="pointer-events-none absolute top-0 right-0 w-px bg-[var(--color-accent-primary)] h-0 group-hover:h-full transition-[height] duration-300 ease-out delay-75" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-px bg-[var(--color-accent-primary)] w-0 group-hover:w-full transition-[width] duration-300 ease-out delay-150" />
        <span className="pointer-events-none absolute bottom-0 left-0 w-px bg-[var(--color-accent-primary)] h-0 group-hover:h-full transition-[height] duration-300 ease-out delay-200" />

        <span className="absolute top-5 right-5 text-[0.6rem] tracking-[0.16em] uppercase text-[var(--color-text-muted)]">
          In development
        </span>

        <motion.span
          className="block font-[family-name:var(--font-display)] italic text-[var(--color-accent-primary)] mb-6"
          style={
            reduced
              ? { fontSize: "clamp(2.5rem, 4vw, 3.5rem)", lineHeight: 1, fontWeight: 500 }
              : {
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  lineHeight: 1,
                  fontWeight: 500,
                  rotateX: sNumRx,
                  rotateY: sNumRy,
                  transformStyle: "preserve-3d",
                }
          }
          initial={{ scale: 1.4, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_STANDARD }}
        >
          {t.num}
        </motion.span>

        <h3
          className="text-[var(--color-text-primary)] mb-3 min-h-[3.5rem]"
          style={{ fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.25 }}
        >
          {t.name}
        </h3>
        <p className="text-[var(--color-text-body)] text-[0.95rem] leading-relaxed flex-1">
          {t.description}
        </p>
      </div>
    </TiltCard>
  );
}
