import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, writeToken, isSanityConfigured } from "../env";

/**
 * Write client — used server-side only for inserting form submissions.
 * Requires a token with Editor (or higher) scope.
 */
export const writeClient =
  isSanityConfigured && writeToken
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: writeToken,
      })
    : null;
