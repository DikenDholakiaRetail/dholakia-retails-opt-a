import type { MetadataRoute } from "next";

/**
 * robots.txt.
 *
 *   • Public pages are crawlable.
 *   • /studio is the Sanity Studio embed; we don't want it indexed.
 *   • /api routes are server endpoints with no value to crawlers.
 *   • Sitemap link points crawlers at app/sitemap.ts so they discover all
 *     dynamic CMS-backed routes (news, blog, careers).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/", "/api"],
      },
    ],
    sitemap: "https://dholakiaretail.com/sitemap.xml",
    host: "https://dholakiaretail.com",
  };
}
