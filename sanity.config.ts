import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { apiVersion, dataset, projectId, studioBasePath } from "./sanity/env";

export default defineConfig({
  basePath: studioBasePath,
  projectId,
  dataset,
  title: "Dholakia Retail · Newsroom",
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
