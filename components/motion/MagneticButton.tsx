"use client";

import Link from "next/link";
import { ComponentProps } from "react";

/**
 * ButtonHoverFill — spec §1.4 (updated).
 *
 * Restraint approach: NO magnetic pull, NO proximity tracking.
 * Pure CSS hover-fill: 240ms expo-out fill, inline arrow translates 4px right.
 * This component keeps the legacy `MagneticButton` import name for compatibility,
 * but the magnetic behaviour has been removed in line with the updated spec
 * which classes ButtonHoverFill as a "performance-free interaction".
 *
 * The `strength` prop is now ignored (kept to avoid breaking call sites).
 */

type Strength = "gentle" | "standard" | "strong";

type BaseProps = {
  strength?: Strength;
  children: React.ReactNode;
  className?: string;
};

type LinkProps = BaseProps & {
  href: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

type ButtonProps = BaseProps & {
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
};

export function MagneticButton(props: LinkProps | ButtonProps) {
  if ("href" in props) {
    const { href, strength: _s, children, className, ...rest } = props;
    void _s;
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  const { onClick, type = "button", className, children, strength: _s, ...rest } = props;
  void _s;
  return (
    <button type={type} onClick={onClick} className={className} {...rest}>
      {children}
    </button>
  );
}

// Named export alias for clarity at new call sites.
export { MagneticButton as ButtonHoverFill };
