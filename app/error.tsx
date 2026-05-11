"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCcw, Home } from "lucide-react";

/**
 * Root error boundary — shown for any runtime error in any route segment.
 * Replaces the bare "Internal Server Error" with a recoverable UI.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <section
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--color-bg-elevated)" }}
    >
      <div className="container-editorial max-w-xl text-center py-32">
        <p
          className="eyebrow mb-5"
          style={{ color: "var(--color-accent-primary)" }}
        >
          Something went wrong
        </p>
        <h1
          className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-5"
          style={{
            fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
            fontWeight: 500,
          }}
        >
          We hit a temporary issue.
        </h1>
        <p className="text-[var(--color-text-body)] body-lead mb-8">
          The page failed to load. Try again — most issues clear on a refresh.
        </p>
        {process.env.NODE_ENV === "development" && (
          <pre className="text-left text-[0.75rem] bg-white border border-black/10 p-4 mb-8 overflow-auto max-h-48 font-[family-name:var(--font-mono)]">
            {error.message}
            {error.digest ? `\n\ndigest: ${error.digest}` : ""}
          </pre>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="group/cta inline-flex items-center gap-2 h-12 px-7 rounded-[2px] bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-deep)] transition-colors duration-[240ms] text-[0.95rem] tracking-wide"
          >
            <RefreshCcw size={16} strokeWidth={1.5} />
            Try again
          </button>
          <Link
            href="/"
            className="group/cta inline-flex items-center gap-2 h-12 px-7 rounded-[2px] border border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)] hover:text-white transition-colors duration-[240ms] text-[0.95rem] tracking-wide"
          >
            <Home size={16} strokeWidth={1.5} />
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
