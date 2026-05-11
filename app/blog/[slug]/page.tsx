import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import BlogArticleHero from "@/components/blog/BlogArticleHero";
import RelatedBlogPosts from "@/components/blog/RelatedBlogPosts";
import SubscribeBand from "@/components/blog/SubscribeBand";
import ArticleSidebar from "@/components/news/ArticleSidebar";
import PortableTextBody from "@/components/news/PortableTextBody";

// Force per-request rendering — see /app/blog/page.tsx for rationale.
// generateStaticParams is left out: with `dynamic = "force-dynamic"` it would
// not pre-render anything anyway, and removing it avoids one extra Sanity
// fetch at build time.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Essay not found" };

  const og = post.heroImage ?? post.featuredImage ?? post.thumbnail;
  const ogImage = og?.asset
    ? urlFor(og).width(1200).height(630).url()
    : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${slug}`,
      publishedTime: post.publishDate,
      authors: post.author?.name ? [post.author.name] : undefined,
      section: post.category,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

/**
 * Page 19 — Single Blog Post (`/blog/[slug]`).
 * Spec P19-S01..S05:
 *   S01 BlogArticleHero — typography-led, breadcrumb, eyebrow, H1, subtitle, author meta, optional inset image.
 *   S02 ArticleBody — PortableText rendering on Off-White, 720px column.
 *   S03 ArticleSidebar — sticky author + share rail (LinkedIn · X · Email · Copy link). Reused from news.
 *   S04 RelatedBlogPosts — same-category 3-col grid.
 *   S05 SubscribeBand — Midnight Navy newsletter closer.
 */
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedBlogPosts(post.slug, post.category);
  const shareUrl = `https://dholakiaretail.com/blog/${post.slug}`;

  // Article JSON-LD — long-form Journal entries qualify as Article (not
  // NewsArticle). Same publisher entity as the brand Organization in the
  // root layout for consistent Knowledge-Graph linkage.
  const heroImg = post.heroImage ?? post.featuredImage ?? post.thumbnail;
  const articleImage = heroImg?.asset
    ? urlFor(heroImg).width(1200).height(630).url()
    : undefined;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    image: articleImage ? [articleImage] : undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": shareUrl },
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
    articleSection: post.category,
    ...(post.readTime ? { timeRequired: `PT${post.readTime}M` } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogArticleHero post={post} />

      {/* S02 + S03 — body + sticky sidebar */}
      <article
        className="bg-[var(--color-bg-elevated)]"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div className="container-editorial">
          <div className="lg:grid lg:grid-cols-[240px_minmax(0,720px)] lg:gap-16 lg:justify-center">
            <ArticleSidebar
              author={post.author ?? null}
              publishedAt={post.publishDate}
              title={post.title}
              shareUrl={shareUrl}
            />

            <div className="prose-editorial mx-auto w-full max-w-[720px] lg:mx-0 mt-10 lg:mt-0">
              <PortableTextBody value={post.body} />
            </div>
          </div>
        </div>
      </article>

      <RelatedBlogPosts posts={related} category={post.category} />

      <SubscribeBand
        heading="Keep reading the journal."
        body="Quarterly long-form essays from the desks of Dholakia Retail. No marketing, no noise."
      />
    </>
  );
}
