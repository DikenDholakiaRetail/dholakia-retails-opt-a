"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Hash, FileText, MapPin, Calendar, Copy, Check } from "lucide-react";
import Hairline from "@/components/motion/Hairline";
import { EASE_STANDARD } from "@/lib/motion";
import { COMPANY } from "@/lib/nav";

/**
 * P02-S02 Corporate Identity.
 * Off-White; 5-row table-style hairline-divided list.
 * RowSubtleHighlight: hovered row gains 1px Electric Blue left border (200ms draw-in)
 *   + 4px increase in left padding. Background tints to Off-White at 50% opacity.
 * Mouse Parallax: Disabled (data must be still).
 * Rows stagger-enter 60ms apart, fade-up 8px Y, 400ms each.
 * Hairline dividers: SVG draw-in left to right, 600ms.
 * Copy-on-click: small Lucide copy icon appears on hover.
 */

type Row = {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  value: string;
  mono?: boolean;
};

const ROWS: Row[] = [
  { Icon: Building2, label: "Company Name", value: COMPANY.legalName },
  { Icon: Hash, label: "CIN", value: COMPANY.cin, mono: true },
  { Icon: FileText, label: "ROC", value: "Ahmedabad" },
  { Icon: MapPin, label: "Registered Office", value: COMPANY.address, mono: true },
  { Icon: Calendar, label: "Established", value: COMPANY.established },
];

export default function CorporateIdentity() {
  return (
    <section className="bg-[var(--color-bg-elevated)]" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
      <div className="container-editorial">
        <div className="max-w-2xl mb-14">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Corporate Identity
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
            The facts of record.
          </motion.h2>
        </div>

        <dl className="relative">
          {/* Top hairline */}
          <Hairline width="100%" color="rgba(11,20,38,0.10)" durationMs={600} />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
          >
            {ROWS.map((r, i) => (
              <motion.div
                key={r.label}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_STANDARD } },
                }}
              >
                <IdentityRow {...r} />
                {i < ROWS.length - 1 && (
                  <Hairline width="100%" color="rgba(11,20,38,0.10)" durationMs={600} />
                )}
              </motion.div>
            ))}
          </motion.div>
          <Hairline width="100%" color="rgba(11,20,38,0.10)" durationMs={600} />
        </dl>
      </div>
    </section>
  );
}

function IdentityRow({ Icon, label, value, mono }: Row) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 md:py-7 transition-colors duration-200 hover:bg-white/50">
      {/* RowSubtleHighlight: 1px left border draws in 200ms + 8px padding shift */}
      <span className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-[var(--color-accent-primary)] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-200 ease-out" />

      <dt
        className="md:col-span-4 flex items-center gap-3 text-[var(--color-text-muted)] transition-[padding] duration-200 group-hover:pl-2"
      >
        <span className="text-[var(--color-accent-primary)]">
          <Icon size={16} strokeWidth={1.5} />
        </span>
        <span className="text-[0.7rem] tracking-[0.14em] uppercase font-medium">{label}</span>
      </dt>
      <dd
        className={[
          "md:col-span-7 text-[var(--color-text-primary)] flex items-center justify-between gap-3",
          mono ? "font-[family-name:var(--font-mono)] text-[0.95rem]" : "font-[family-name:var(--font-display)] text-[1.125rem] italic",
        ].join(" ")}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        <span>{value}</span>
        <button
          type="button"
          aria-label={`Copy ${label}`}
          onClick={onCopy}
          className="md:col-span-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)]"
        >
          {copied ? <Check size={16} strokeWidth={1.5} /> : <Copy size={16} strokeWidth={1.5} />}
        </button>
      </dd>
    </div>
  );
}
