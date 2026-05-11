"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import TiltCard from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P10-S03 Roles / Functions — 6-tile grid (3-col desktop, 2-col tablet, 1-col mobile).
 * Each tile: function name → arrow. Single CTA below grid: 'Share Your Profile'.
 * CardGroupAttention; Card3DTilt 3°. Tiles stagger 80ms; hover lift +6px, arrow slides right.
 */

const FUNCTIONS = ["Design", "Brand", "Merchandising", "Retail", "Operations", "Corporate Functions"];

export default function FunctionGrid() {
  return (
    <section id="careers" className="bg-[var(--color-bg-elevated)]" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
      <div className="container-editorial">
        <div className="max-w-2xl mb-14 md:mb-16">
          <motion.p
            className="mb-5"
            style={{
              color: "var(--color-accent-primary)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            Roles &amp; Functions
          </motion.p>
          <RevealText
            text="Where you can join the platform."
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

        <motion.div
          className="group/grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ perspective: "1000px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {FUNCTIONS.map((label) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
              }}
            >
              <TiltCard angle="standard" scale={1.005}>
                <a
                  href={`#careers-${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group/tile relative flex items-center justify-between gap-4 p-7 bg-white border border-black/10 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-[var(--color-accent-primary)]"
                >
                  <span className="flex items-center gap-4">
                    <Briefcase size={24} strokeWidth={1.5} className="text-[var(--color-accent-primary)]" />
                    <span
                      className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)]"
                      style={{ fontSize: "1.125rem", fontWeight: 500 }}
                    >
                      {label}
                    </span>
                  </span>
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="text-[var(--color-text-muted)] transition-transform duration-300 group-hover/tile:translate-x-1 group-hover/tile:text-[var(--color-accent-primary)]"
                  />
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_STANDARD }}
        >
          <MagneticButton
            href="#contact-form"
            strength="standard"
            className="group/cta inline-flex items-center gap-2 h-12 px-7 rounded-[2px] border border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)] hover:text-white transition-colors duration-[240ms] text-[0.95rem] tracking-wide"
          >
            Share Your Profile
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-[240ms] group-hover/cta:translate-x-1"
            />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
