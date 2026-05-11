"use client";

import { motion } from "framer-motion";
import { EASE_STANDARD } from "@/lib/motion";
import type { CookieRecord } from "@/lib/legal-content";

/**
 * P16-S02 Cookie inventory table.
 * 4 columns: Cookie name · Category · Purpose · Duration.
 * 1px Soft Sky borders. Header row Midnight Navy + white. Alternating row backgrounds.
 * Rows fade-in stagger 40ms apart on viewport entry. RowSubtleHighlight on hover.
 */
export default function CookieInventoryTable({ rows }: { rows: CookieRecord[] }) {
  return (
    <motion.div
      className="my-12 overflow-x-auto"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE_STANDARD }}
    >
      <table className="w-full border-collapse text-left text-[0.875rem]">
        <thead>
          <tr style={{ background: "var(--color-bg-inverse)" }}>
            {["Cookie", "Category", "Purpose", "Duration"].map((h) => (
              <th
                key={h}
                scope="col"
                className="px-4 py-3 text-white font-medium tracking-[0.04em]"
                style={{ fontSize: "0.8rem" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <motion.tbody
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04 } },
          }}
        >
          {rows.map((r, i) => (
            <motion.tr
              key={r.name}
              variants={{
                hidden: { opacity: 0, y: 6 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_STANDARD } },
              }}
              style={{
                background:
                  i % 2 === 0
                    ? "var(--color-bg-elevated)"
                    : "var(--color-bg-primary)",
              }}
              className="transition-colors duration-[200ms] hover:bg-[rgba(59,111,255,0.04)]"
            >
              <td
                className="px-4 py-3 align-top border-b border-[rgba(107,138,201,0.30)] font-[family-name:var(--font-mono)] text-[var(--color-text-primary)]"
                style={{ fontSize: "0.85rem" }}
              >
                {r.name}
              </td>
              <td className="px-4 py-3 align-top border-b border-[rgba(107,138,201,0.30)]">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.7rem] tracking-[0.04em] border border-[var(--color-accent-soft)] text-[var(--color-accent-deep)] bg-white">
                  {r.category}
                </span>
              </td>
              <td className="px-4 py-3 align-top border-b border-[rgba(107,138,201,0.30)] text-[var(--color-text-body)]">
                {r.purpose}
              </td>
              <td
                className="px-4 py-3 align-top border-b border-[rgba(107,138,201,0.30)] font-[family-name:var(--font-mono)] tabular-nums text-[var(--color-text-muted)]"
                style={{ fontSize: "0.85rem" }}
              >
                {r.duration}
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </motion.div>
  );
}
