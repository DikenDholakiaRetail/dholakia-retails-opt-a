import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getPostBySlug, getRelatedPosts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import PortableTextBody from "@/components/news/PortableTextBody";
import ArticleCard from "@/components/news/ArticleCard";
import ArticleSidebar from "@/components/news/ArticleSidebar";
import NewsHero from "@/components/news/NewsHero";
import RevealText from "@/components/motion/RevealText";
import PageClosingBand from "@/components/cta/PageClosingBand";

// Force per-request rendering — see /app/blog/page.tsx for rationale.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Story not found" };

  const title = post.seo?.metaTitle ?? post.title;
  const description = post.seo?.metaDescription ?? post.excerpt;
  const og = post.seo?.ogImage ?? post.coverImage ?? post.thumbnail;
  const ogImage = og?.asset
    ? urlFor(og).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/news/${slug}`,
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      section: post.category?.title,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

/**
 * Page 13 — Single News Article (`/news/[slug]`).
 * Spec P13-S01..S05:
 *   S01 ArticleHero — full-bleed bg image, breadcrumb, eyebrow CATEGORY · DATE,
 *       Display H1, subtitle, author meta. Hero3LayerParallax.
 *   S02 ArticleBody — centered 720px column on Off-White (DM Sans Light 18px).
 *   S03 ArticleSidebar — sticky left rail (desktop) with author + share row.
 *   S04 Related — More from {Category}, 3-col grid.
 *   S05 ArticleCloser — closing band.
 */
export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = post.category
    ? await getRelatedPosts(post.slug, post.category._id)
    : [];

  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const heroImage = post.coverImage ?? post.thumbnail;
  const shareUrl = `https://dholakiaretail.com/news/${post.slug}`;

  // NewsArticle JSON-LD — turns this page into a Google Search rich result
  // candidate (article rich snippet, Top Stories carousel, etc.).
  const articleImage =
    (post.coverImage ?? post.thumbnail)?.asset
      ? urlFor(post.coverImage ?? post.thumbnail).width(1200).height(630).url()
      : undefined;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: articleImage ? [articleImage] : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": shareUrl,
    },
    author: post.author?.name
      ? {
          "@type": "Person",
          name: post.author.name,
          ...(post.author.role ? { jobTitle: post.author.role } : {}),
        }
      : { "@type": "Organization", name: "Dholakia Retail" },
    publisher: {
      "@type": "Organization",
      name: "Dholakia Retail Private Limited",
      logo: {
        "@type": "ImageObject",
        url: "https://dholakiaretail.com/brand/dr-logo/dr_logo_light.svg",
      },
    },
    articleSection: post.category?.title,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* S01 — Article Hero */}
      <NewsHero
        image={
          heroImage?.asset
            ? {
                src: urlFor(heroImage).width(2880).height(1620).url(),
                alt: heroImage.alt ?? post.title,
                blurDataURL: heroImage.metadata?.lqip,
              }
            : null
        }
      >
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 mb-6 text-white/80"
        >
          <Link
            href="/news"
            className="text-[0.7rem] tracking-[0.14em] uppercase hover:text-white transition-colors duration-200"
          >
            Newsroom
          </Link>
          <ChevronRight size={12} strokeWidth={1.5} className="text-white/60" />
          <span className="text-[0.7rem] tracking-[0.14em] uppercase">
            {post.category?.title ?? "Story"}
          </span>
        </nav>

        {/* Eyebrow — CATEGORY · DATE */}
        <p
          className="mb-6"
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {post.category?.title}
          <span className="mx-3 text-white/40">·</span>
          <span className="font-[family-name:var(--font-mono)]">
            {date}
          </span>
        </p>

        {/* H1 word-by-word reveal */}
        <RevealText
          text={post.title}
          as="h1"
          className="text-white max-w-[880px] mb-6 font-[family-name:var(--font-display)]"
          style={{
            fontSize: "clamp(2rem, 4.4vw, 4rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            fontWeight: 500,
          }}
          staggerMs={60}
          durationMs={700}
          delay={300}
          triggerOnView={false}
        />

        {/* Subtitle */}
        {post.excerpt && (
          <p
            className="text-white/75 max-w-[600px] mb-5"
            style={{ fontSize: "1.125rem", fontWeight: 300, lineHeight: 1.55 }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Author meta */}
        {post.author && (
          <p className="text-[0.85rem] text-white/70 font-[family-name:var(--font-mono)]">
            By {post.author.name}
            {post.author.role ? ` · ${post.author.role}` : ""}
          </p>
        )}
      </NewsHero>

      {/* S02 + S03 — Article Body with sticky sidebar */}
      <article
        className="bg-[var(--color-bg-elevated)]"
        style={{ paddingTop: "120px", paddingBottom: "80px" }}
      >
        <div className="container-editorial">
          <div className="lg:grid lg:grid-cols-[240px_minmax(0,720px)] lg:gap-16 lg:justify-center">
            <ArticleSidebar
              author={post.author ?? null}
              publishedAt={post.publishedAt}
              title={post.title}
              shareUrl={shareUrl}
            />

            <div className="prose-editorial mx-auto w-full max-w-[720px] lg:mx-0 mt-10 lg:mt-0">
              <PortableTextBody value={post.body} />
            </div>
          </div>
        </div>
      </article>

      {/* S04 — Related */}
      {related.length > 0 && (
        <section
          className="bg-white"
          style={{ paddingTop: "120px", paddingBottom: "120px" }}
        >
          <div className="container-editorial">
            <h2
              className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-12"
              style={{
                fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
              }}
            >
              More from {post.category?.title ?? "the Newsroom"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 group/grid">
              {related.map((p) => (
                <ArticleCard key={p._id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* S05 — Article Closer */}
      <PageClosingBand
        heading="Stay informed."
        body="Quarterly updates from the desks of Dholakia Retail. No marketing, no noise — only the record."
        ctaLabel="Back to Newsroom"
        ctaHref="/news"
        variant="navy"
      />
    </>
  );
}
