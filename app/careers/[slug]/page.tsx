import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoleHero from "@/components/careers/role/RoleHero";
import RoleBody from "@/components/careers/role/RoleBody";
import TeamSection from "@/components/careers/role/TeamSection";
import CompensationAndApply from "@/components/careers/role/CompensationAndApply";
import RelatedRoles from "@/components/careers/role/RelatedRoles";
import {
  getCareerBySlug,
  getRelatedCareers,
  getAllCareerSlugs,
} from "@/sanity/lib/queries";

const FUNCTION_LABELS: Record<string, string> = {
  design: "Design",
  brand: "Brand",
  merchandising: "Merchandising",
  retail: "Retail",
  operations: "Operations",
  corporate: "Corporate Functions",
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllCareerSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = await getCareerBySlug(slug);
  if (!role) return { title: "Role not found" };
  return {
    title: role.title,
    description: role.shortDescription,
    openGraph: {
      title: role.title,
      description: role.shortDescription,
      type: "article",
    },
  };
}

/**
 * Page 11 — Single Career (`/careers/[slug]`).
 * Spec P11-S01..S05:
 *   S01 Role Hero (sticky Apply bar)
 *   S02 Role Body (lead, responsibilities, requirements, success metrics)
 *   S03 Team (description, values pills, manager card)
 *   S04 Compensation & How to Apply (benefits grid, application modal)
 *   S05 Related Roles
 */
export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const role = await getCareerBySlug(slug);
  if (!role) notFound();

  const related = await getRelatedCareers(role.slug, role.functionArea);
  const functionLabel = FUNCTION_LABELS[role.functionArea] ?? role.functionArea;

  // schema.org JobPosting structured data — Google for Jobs
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.shortDescription,
    datePosted: role.publishDate,
    validThrough: role.closingDate ?? undefined,
    employmentType: role.employmentType?.toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: "Dholakia Retail Private Limited",
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: role.location },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RoleHero
        slug={role.slug}
        title={role.title}
        functionArea={role.functionArea}
        functionLabel={functionLabel}
        location={role.location}
        employmentType={role.employmentType}
        subtitle={role.shortDescription}
        publishDate={role.publishDate}
        closingDate={role.closingDate}
      />
      <RoleBody
        leadParagraph={role.leadParagraph}
        responsibilities={role.responsibilities}
        requirements={role.requirements}
        successMetrics={role.successMetrics}
      />
      <TeamSection
        description={role.teamDescription}
        values={role.teamValues}
        manager={role.manager}
      />
      <CompensationAndApply
        slug={role.slug}
        title={role.title}
        compensationSummary={role.compensationSummary}
        benefits={role.benefits}
        applicationInstructions={role.applicationInstructions}
        closingDate={role.closingDate}
      />
      <RelatedRoles roles={related} functionLabel={functionLabel} />
    </>
  );
}
