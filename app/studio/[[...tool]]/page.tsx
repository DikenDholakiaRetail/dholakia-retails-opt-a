/**
 * Embedded Sanity Studio at /studio.
 * Opens the standalone Studio UI at the same origin as the marketing site.
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
