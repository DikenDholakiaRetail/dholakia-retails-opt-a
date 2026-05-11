import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[var(--color-text-body)] leading-[1.8] mb-6 text-[1.0625rem]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2
        className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mt-12 mb-5"
        style={{ fontSize: "1.875rem", lineHeight: 1.2, fontWeight: 500 }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mt-10 mb-4"
        style={{ fontSize: "1.375rem", fontWeight: 500 }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="my-10 pl-6 border-l-2 border-[var(--color-accent-primary)] font-[family-name:var(--font-display)] italic text-[var(--color-text-primary)]"
        style={{ fontSize: "1.5rem", lineHeight: 1.4 }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = (value as { href?: string })?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent-primary)] underline-offset-4 hover:underline"
        >
          {children}
        </a>
      ) : (
        <Link
          href={href}
          className="text-[var(--color-accent-primary)] underline-offset-4 hover:underline"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const v = value as { alt?: string; caption?: string; asset?: { _ref: string } };
      if (!v?.asset) return null;
      return (
        <figure className="my-10">
          <div className="relative w-full overflow-hidden rounded-sm" style={{ aspectRatio: "16 / 9" }}>
            <Image
              src={urlFor(value).width(1600).url()}
              alt={v.alt ?? ""}
              fill
              sizes="(min-width: 768px) 720px, 100vw"
              className="object-cover"
            />
          </div>
          {v.caption && (
            <figcaption className="mt-3 text-[0.875rem] text-[var(--color-text-muted)] italic">
              {v.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function PortableTextBody({ value }: { value: unknown[] }) {
  return <PortableText value={value as never} components={components} />;
}
