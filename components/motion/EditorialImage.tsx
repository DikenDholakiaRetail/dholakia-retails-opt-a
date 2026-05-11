"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { unsplashUrl } from "@/lib/media";

/**
 * <EditorialImage> — site-wide image wrapper.
 *
 * Responsibilities:
 *   1. Source from the `media` registry (id-based).
 *   2. Render via next/image with proper sizes / responsive srcset.
 *   3. Apply uniform cool-tone editorial filter — enforces palette discipline
 *      regardless of the upstream photo's original tone, AND darkens any
 *      white/pale background areas so they never compete with the typography.
 *   4. Layer a multi-stop dark gradient on top so any remaining luminance is
 *      pulled down to the cool-monochrome editorial range.
 *   5. If the remote URL ever fails (network error, removed asset), fall back
 *      to the on-brand cool gradient so the layout never breaks visually.
 *
 * Usage:
 *   <EditorialImage src={HOME_HERO} fill priority />
 *   <EditorialImage src={MAYAVE_SPOTLIGHT} ratio="4/5" />
 *   <EditorialImage src={X} fill darkOverlay="strong" />  // extra darkening
 */

type Props = {
  src: { id: string; alt: string; src?: string };
  fill?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  className?: string;
  wrapperClassName?: string;
  style?: CSSProperties;
  priority?: boolean;
  rawTone?: boolean;
  quality?: number;
  alt?: string;
  /** Darkening overlay strength.
   *  - 'subtle' (default) — tints whites enough for editorial restraint
   *  - 'strong' — for dark hero placements (40-55% Midnight Navy)
   *  - 'cinematic' — 3-stop gradient (top 60% · mid 30% · bottom 70%) for full-bleed
   *    hero/band backgrounds; matches the PDF's premium, cinematic intent. */
  darkOverlay?: "none" | "subtle" | "strong" | "cinematic";
};

const FALLBACK_GRADIENT =
  "radial-gradient(70% 80% at 50% 45%, #2a3a5c 0%, #14213d 50%, #060B17 100%)";

/**
 * Tightened editorial filter — grayscale + contrast pull warm tones to cool;
 * brightness 0.78 (was 0.92) means even pure white pixels render at ~#c6c6c6
 * which sits comfortably inside the editorial palette.
 */
const EDITORIAL_FILTER =
  "grayscale(0.55) contrast(1.1) brightness(0.78) saturate(0.65) hue-rotate(-8deg)";

const OVERLAY_BY_STRENGTH: Record<NonNullable<Props["darkOverlay"]>, string> = {
  none: "transparent",
  // Subtle — works behind text, behind editorial cards. Cool tint, soft vignette.
  subtle:
    "linear-gradient(180deg, rgba(11,20,38,0.18) 0%, rgba(11,20,38,0.28) 100%)",
  // Strong — for hero photos with bright skies / pale backgrounds.
  strong:
    "linear-gradient(180deg, rgba(11,20,38,0.40) 0%, rgba(11,20,38,0.55) 100%)",
  // Cinematic — 3-stop gradient (top 60% · mid 30% · bottom 70%) per PDF.
  // Premium dark-tone heroes; ensures text legibility at top + bottom while
  // preserving photo subject in the middle band.
  cinematic:
    "linear-gradient(180deg, rgba(11,20,38,0.60) 0%, rgba(11,20,38,0.30) 50%, rgba(11,20,38,0.70) 100%)",
};

/**
 * Picsum.photos is a stable random-photo CDN (commercial-safe). Used as a
 * deterministic fallback when an Unsplash photo ID 404s — same `src.id` →
 * same Picsum seed → same photo every time. With the cool-tone editorial
 * filter applied, any Picsum photo reads as on-brand.
 */
function picsumUrl(seed: string, width: number, height: number): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

export default function EditorialImage({
  src,
  fill = false,
  sizes = "100vw",
  width,
  height,
  className = "",
  wrapperClassName = "",
  style,
  priority = false,
  rawTone = false,
  quality = 80,
  alt,
  darkOverlay = "subtle",
}: Props) {
  // Stage progression depends on whether a local asset exists.
  //   With local src:  0 = local file, 1 = Picsum fallback, 2 = gradient.
  //   Without local:   0 = Unsplash,    1 = Picsum fallback, 2 = gradient.
  const hasLocal = Boolean(src.src);
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  const targetWidth = width ?? 2400;
  const targetHeight = height ?? Math.round((targetWidth * 9) / 16);

  let url: string;
  if (stage === 0) {
    url = hasLocal ? (src.src as string) : unsplashUrl(src.id, 2400, quality);
  } else {
    // stage 1 — deterministic real photo via Picsum (seeded by Unsplash id)
    url = picsumUrl(src.id, targetWidth, targetHeight);
  }

  if (stage === 2) {
    return (
      <span
        aria-label={alt ?? src.alt}
        className={wrapperClassName}
        style={{
          ...style,
          background: FALLBACK_GRADIENT,
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
    );
  }

  const filterStyle: CSSProperties = rawTone ? {} : { filter: EDITORIAL_FILTER };
  const onErrorAdvance = () => setStage((s) => (s < 2 ? ((s + 1) as 1 | 2) : 2));

  if (fill) {
    return (
      <>
        <Image
          // Re-mount on stage change so next/image re-fetches.
          key={`${src.id}-${stage}`}
          src={url}
          alt={alt ?? src.alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={stage === 1}
          className={["object-cover", className].join(" ")}
          style={filterStyle}
          onError={onErrorAdvance}
        />
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

  // Sized (non-fill) — wrap so the overlay can sit absolutely above the <img>.
  return (
    <span
      className={["relative inline-block", wrapperClassName].join(" ")}
      style={{ lineHeight: 0 }}
    >
      <Image
        key={`${src.id}-${stage}`}
        src={url}
        alt={alt ?? src.alt}
        width={targetWidth}
        height={targetHeight}
        sizes={sizes}
        priority={priority}
        unoptimized={stage === 1}
        className={className}
        style={filterStyle}
        onError={onErrorAdvance}
      />
      {!rawTone && darkOverlay !== "none" && (
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: OVERLAY_BY_STRENGTH[darkOverlay] }}
        />
      )}
    </span>
  );
}
