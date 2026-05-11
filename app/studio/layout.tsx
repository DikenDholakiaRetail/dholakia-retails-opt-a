/**
 * Studio uses its own metadata viewport; bypass the marketing chrome.
 */
export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
