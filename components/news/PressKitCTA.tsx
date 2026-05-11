"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P09-S05 Press Kit — editorial band on Off-White; centered Heading + Electric Blue filled magnetic CTA.
 */
export default function PressKitCTA() {
  return (
    <section
      className="bg-[var(--color-bg-elevated)]"
      id="press-kit"
      style={{ paddingTop: "100px", paddingBottom: "100px" }}
    >
      <div className="container-editorial flex flex-col items-center text-center max-w-3xl">
        <RevealText
          text="Need corporate information or brand assets?"
          as="h2"
          className="text-[var(--color-text-primary)] mb-10 font-[family-name:var(--font-display)]"
          style={{
            fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            fontWeight: 500,
          }}
          staggerMs={50}
          durationMs={650}
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE_STANDARD }}
        >
          <MagneticButton
            href="/press-kit.zip"
            strength="standard"
            className="inline-flex items-center gap-3 h-12 px-8 rounded-[2px] bg-[var(--color-accent-primary)] text-white text-[0.95rem] tracking-wide hover:bg-[var(--color-accent-deep)] transition-colors duration-[240ms]"
          >
            <Download size={16} strokeWidth={1.5} />
            Request the Press Kit
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
