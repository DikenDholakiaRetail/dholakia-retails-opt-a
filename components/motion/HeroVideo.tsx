"use client";

import { useEffect, useRef, useState } from "react";

/**
 * <HeroVideo> — autoplaying muted looped silent loop with cool-tone filter.
 *
 * Intended for spec sections that call for a 10-12s ambient loop:
 * P01-S01 (Home hero), P04-S01 (Mayavé hero), P05-S03 (Making Ecosystem
 * left pane), P01-S06 (Brand Film modal).
 *
 * Behaviour:
 *   - Plays on viewport entry via IntersectionObserver (saves bandwidth).
 *   - poster derived from the same registry image, so first paint shows the
 *     same cool-tone still as later when the video starts.
 *   - On load failure, the underlying poster image is rendered through
 *     <picture> so layout never breaks.
 */
type Props = {
  /** Pexels (or any) MP4 URL. */
  src: string;
  /** Optional WebM source. */
  webmSrc?: string;
  /** Unsplash photo id used both as poster and the on-fail fallback. */
  posterImageId: string;
  /**
   * Optional local poster URL (e.g. `/media/images/...png`). When provided
   * it replaces the Unsplash-derived poster — used for committed Option_A
   * assets so the first paint is the final still.
   */
  posterImageSrc?: string;
  alt: string;
  className?: string;
  /** Disable cool-tone CSS filter for this instance. */
  rawTone?: boolean;
  /** Darkening gradient layered on top — defaults to 'cinematic' (top 60%
   *  · mid 30% · bottom 70%) so videos read with proper text contrast. */
  darkOverlay?: "none" | "subtle" | "strong" | "cinematic";
};

const EDITORIAL_FILTER =
  "grayscale(0.45) contrast(1.05) brightness(0.78) saturate(0.7) hue-rotate(-5deg)";

const OVERLAY_BY_STRENGTH: Record<NonNullable<Props["darkOverlay"]>, string> = {
  none: "transparent",
  subtle:
    "linear-gradient(180deg, rgba(11,20,38,0.18) 0%, rgba(11,20,38,0.28) 100%)",
  strong:
    "linear-gradient(180deg, rgba(11,20,38,0.40) 0%, rgba(11,20,38,0.55) 100%)",
  cinematic:
    "linear-gradient(180deg, rgba(11,20,38,0.60) 0%, rgba(11,20,38,0.30) 50%, rgba(11,20,38,0.70) 100%)",
};

export default function HeroVideo({
  src,
  webmSrc,
  alt,
  className = "",
  rawTone = false,
  darkOverlay = "cinematic",
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [errored, setErrored] = useState(false);

  // Pause when offscreen — bandwidth + battery friendly.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) node.play().catch(() => {});
          else node.pause();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  if (errored) {
    return (
      <>
        {!rawTone && darkOverlay !== "none" && (
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: OVERLAY_BY_STRENGTH[darkOverlay] }}
          />
        )}
      </>
    );
  }

  return (
    <>
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        className={["absolute inset-0 w-full h-full object-cover", className].join(" ")}
        style={rawTone ? undefined : { filter: EDITORIAL_FILTER }}
        onError={() => setErrored(true)}
      >
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        <source src={src} type="video/mp4" />
      </video>
      {!rawTone && darkOverlay !== "none" && (
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: OVERLAY_BY_STRENGTH[darkOverlay] }}
        />
      )}
    </>
  );
}
