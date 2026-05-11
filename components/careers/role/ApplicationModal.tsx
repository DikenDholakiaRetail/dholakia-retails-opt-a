"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ApplicationForm from "./ApplicationForm";
import { EASE_STANDARD } from "@/lib/motion";

type Props = {
  open: boolean;
  onClose: () => void;
  roleSlug: string;
  roleTitle: string;
};

/**
 * P11-S04 Application modal — Radix-style dialog (custom, focus-trapped via tabIndex).
 * Esc to close. Body scroll locked while open.
 */
export default function ApplicationModal({ open, onClose, roleSlug, roleTitle }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="application-modal"
          className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Application form"
          initial={{ background: "rgba(11,20,38,0)" }}
          animate={{ background: "rgba(11,20,38,0.85)" }}
          exit={{ background: "rgba(11,20,38,0)" }}
          transition={{ duration: 0.24, ease: EASE_STANDARD }}
        >
          {/* Backdrop click closes */}
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 cursor-default"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-[600px] bg-white rounded-sm overflow-y-auto max-h-[92vh]"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_STANDARD }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-10 h-10 rounded-full text-[var(--color-text-primary)] inline-flex items-center justify-center hover:bg-black/5 transition-colors"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="px-8 pt-12 pb-10">
              <h2
                className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-8"
                style={{
                  fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}
              >
                Apply for this role.
              </h2>
              <ApplicationForm roleSlug={roleSlug} roleTitle={roleTitle} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
