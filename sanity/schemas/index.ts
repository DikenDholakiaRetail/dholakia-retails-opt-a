import type { SchemaTypeDefinition } from "sanity";
import post from "./post";
import author from "./author";
import category from "./category";
import contactSubmission from "./contactSubmission";
import career from "./career";
import jobApplication from "./jobApplication";
import blogPost from "./blogPost";
import blockContent from "./blockContent";
import newsletterSubscriber from "./newsletterSubscriber";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Shared types must come first so other schemas can reference them.
  blockContent,
  post,
  author,
  category,
  contactSubmission,
  career,
  jobApplication,
  blogPost,
  newsletterSubscriber,
];
