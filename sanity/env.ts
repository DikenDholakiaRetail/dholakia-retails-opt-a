export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
export const readToken = process.env.SANITY_API_READ_TOKEN;
// Write token used by /api/contact; falls back to read token if it has Editor scope.
export const writeToken = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;

export const studioBasePath = "/studio";

/** True only when project is configured — guards CMS reads at build time. */
export const isSanityConfigured = projectId.length > 0 && projectId !== "your-project-id";
