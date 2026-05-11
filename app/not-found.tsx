import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageTheme from "@/components/PageTheme";

export default function NotFound() {
  return (
    <section
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--color-bg-elevated)" }}
    >
      <PageTheme value="light" />
      <div className="container-editorial max-w-xl text-center py-32">
        <p
          className="eyebrow mb-5"
          style={{ color: "var(--color-accent-primary)" }}
        >
          404 · Not Found
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
          That page doesn&apos;t exist.
        </h1>
        <p className="text-[var(--color-text-body)] body-lead mb-8">
          The link may have moved, or the role may no longer be open.
        </p>
        <Link
          href="/"
          className="group/cta inline-flex items-center gap-2 h-12 px-7 rounded-[2px] bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-deep)] transition-colors duration-[240ms] text-[0.95rem] tracking-wide"
        >
          Back to home
          <ArrowRight
            size={16}
            strokeWidth={1.5}
            className="transition-transform duration-[240ms] group-hover/cta:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
