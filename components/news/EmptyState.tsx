import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "No stories yet",
  body = "Check back soon — new editorial coming.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-white" style={{ paddingTop: "80px", paddingBottom: "120px" }}>
      <div className="container-editorial flex flex-col items-center text-center text-[var(--color-text-muted)]">
        <Inbox size={32} strokeWidth={1.5} className="text-[var(--color-text-muted)] mb-4" />
        <h2
          className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-3"
          style={{ fontSize: "1.5rem", fontWeight: 500 }}
        >
          {title}
        </h2>
        <p className="max-w-md leading-relaxed">{body}</p>
      </div>
    </section>
  );
}
