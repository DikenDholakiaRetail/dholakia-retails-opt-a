import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, readToken, isSanityConfigured } from "../env";

/**
 * Read client — `useCdn: false` is intentional.
 *
 * Sanity's edge CDN caches responses up to 10s; for an editorial site where
 * the brand expects "publish → live in seconds," that drift is the
 * difference between feeling fresh and feeling broken. CDN savings are
 * negligible at this traffic profile. Paired with `cache: "no-store"` on the
 * fetch options in queries.ts, this gives us an end-to-end always-fresh path.
 */
export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
      token: readToken,
    })
  : null;

export const previewClient = isSanityConfigured && readToken
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "previewDrafts",
      token: readToken,
    })
  : null;
