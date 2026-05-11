"use client";

import { useEffect } from "react";

/**
 * <PageTheme value="light" /> — declares the dominant background tone of the
 * current page so the global Header can pick a legible foreground (dark text
 * on light backdrops, white text on dark heroes).
 *
 * Mount this once near the top of any page that does NOT begin with a dark
 * hero (legal pages, 404, etc). The default is "dark" — no marker needed for
 * pages with a Midnight-Navy hero band.
 *
 * Implementation: writes `data-page-theme` on <html>. Header subscribes via
 * MutationObserver + pathname so route changes propagate cleanly.
 */
export default function PageTheme({ value }: { value: "light" | "dark" }) {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.dataset.pageTheme;
    root.dataset.pageTheme = value;
    return () => {
      // Reset to the default ("dark") on unmount so the next route starts
      // from a known baseline, unless something else has already replaced it.
      if (root.dataset.pageTheme === value) {
        if (previous) root.dataset.pageTheme = previous;
        else delete root.dataset.pageTheme;
      }
    };
  }, [value]);

  return null;
}
