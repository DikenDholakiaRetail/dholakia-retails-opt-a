"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Hash, MapPin, AtSign, Copy, Check } from "lucide-react";
import Hairline from "@/components/motion/Hairline";
import { EASE_STANDARD } from "@/lib/motion";
import { COMPANY } from "@/lib/nav";

/**
 * P12-S03 Corporate Contact Details — editorial band on Off-White.
 * 4-row hairline-divided list. JetBrains Mono for CIN + email.
 * RowSubtleHighlight on hover (1px Electric Blue left border + 4px padding shift).
 * Rows stagger 60ms. Click-to-copy on CIN + Email.
 */

type Row = {
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  value: string;
  mono?: boolean;
  copyable?: boolean;
};

const ROWS: Row[] = [
  { Icon: Building2, label: "Legal name", value: COMPANY.legalName },
  { Icon: Hash, label: "CIN", value: COMPANY.cin, mono: true, copyable: true },
  { Icon: MapPin, label: "Registered Office", value: COMPANY.address },
  { Icon: AtSign, label: "Email", value: COMPANY.email, mono: true, copyable: true },
];

export default function CorporateContactDetails() {
  return (
    <section className="bg-[var(--color-bg-elevated)]" style={{ paddingTop: "60px", paddingBottom: "100px" }}>
      <div className="container-editorial">
        <Hairline width="100%" color="rgba(11,20,38,0.10)" durationMs={600} />
        <motion.dl
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
              <Row {...r} />
              {i < ROWS.length - 1 && <Hairline width="100%" color="rgba(11,20,38,0.10)" durationMs={600} />}
            </motion.div>
          ))}
        </motion.dl>
        <Hairline width="100%" color="rgba(11,20,38,0.10)" durationMs={600} />
      </div>
    </section>
  );
}

function Row({ Icon, label, value, mono }: Row) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* unavailable */
    }
  };
  return (
    <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 md:py-7 transition-colors duration-200 hover:bg-white/50">
      <span className="pointer-events-none absolute left-0 top-0 bottom-0 w-px bg-[var(--color-accent-primary)] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-200 ease-out" />
      <dt className="md:col-span-4 flex items-center gap-3 text-[var(--color-text-muted)] transition-[padding] duration-200 group-hover:pl-2">
        <span className="text-[var(--color-accent-primary)]">
          <Icon size={16} strokeWidth={1.5} />
        </span>
        <span className="text-[0.7rem] tracking-[0.14em] uppercase font-medium">{label}</span>
      </dt>
      <dd
        className={[
          "md:col-span-7 text-[var(--color-text-primary)] flex items-center justify-between gap-3",
          mono ? "font-[family-name:var(--font-mono)] text-[0.95rem]" : "text-[1rem]",
        ].join(" ")}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        <span>{value}</span>
        <button
          type="button"
          aria-label={`Copy ${label}`}
          onClick={onCopy}
          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)]"
        >
          {copied ? <Check size={16} strokeWidth={1.5} /> : <Copy size={16} strokeWidth={1.5} />}
        </button>
      </dd>
    </div>
  );
}
