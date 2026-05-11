import Image from "next/image";
import Link from "next/link";

/**
 * Logo variant — describes the INK colour of the rendered wordmark, so the
 * mapping is unambiguous regardless of how the underlying SVG files are named.
 *
 *   "navy"  → deep-navy ink, for light-tone backgrounds (legal pages, 404,
 *             white sections in the footer columns, etc).
 *   "white" → white ink, for dark-tone backgrounds (Midnight-Navy heroes,
 *             dark-glass scrolled header, inverted footer slab, mobile drawer).
 *
 * Both files share the same 204×49 viewBox so they overlay pixel-for-pixel,
 * which lets us cross-fade between them on theme change without a single px
 * of layout shift.
 */
type Props = { variant?: "navy" | "white"; className?: string };

const SOURCES: Record<NonNullable<Props["variant"]>, string> = {
  navy: "/brand/dr-logo/dr_logo_light.svg",
  white: "/brand/dr-logo/dr_logo_dark.svg",
};

const W = 140;
const H = 34;
const TRANSITION = "opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)";

export default function Logo({ variant = "navy", className = "" }: Props) {
  return (
    <Link
      href="/"
      aria-label="Dholakia Retail — home"
      className={`relative inline-flex items-center ${className}`}
      style={{ width: `${W}px`, height: `${H}px` }}
    >
      <Image
        src={SOURCES.navy}
        alt="Dholakia Retail"
        width={W}
        height={H}
        priority
        style={{
          position: "absolute",
          inset: 0,
          height: `${H}px`,
          width: "auto",
          opacity: variant === "navy" ? 1 : 0,
          transition: TRANSITION,
        }}
      />
      <Image
        src={SOURCES.white}
        alt=""
        aria-hidden
        width={W}
        height={H}
        priority
        style={{
          position: "absolute",
          inset: 0,
          height: `${H}px`,
          width: "auto",
          opacity: variant === "white" ? 1 : 0,
          transition: TRANSITION,
        }}
      />
    </Link>
  );
}
