"use client";

import { motion, useReducedMotion as fmReducedMotion } from "framer-motion";
import React, { ReactNode } from "react";
import { EASE_STANDARD } from "@/lib/motion";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  staggerMs?: number;
  durationMs?: number;
  triggerOnView?: boolean;
  children?: ReactNode;
};

/**
 * RevealText — word-by-word stagger reveal (Framer Motion).
 * Spec §1.3 hero timeline: 60ms stagger, 800ms each, expo-out.
 * Drives H1/H2 reveals across hero sections.
 */
export default function RevealText({
  text,
  as = "h2",
  className,
  style,
  delay = 0,
  staggerMs = 60,
  durationMs = 800,
  triggerOnView = true,
}: Props) {
  const reduced = fmReducedMotion();
  const Tag = motion[as];
  const words = text.split(" ");

  if (reduced) {
    return React.createElement(as, { className, style }, text);
  }

  const container = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay / 1000,
        staggerChildren: staggerMs / 1000,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: "0.6em" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: durationMs / 1000, ease: EASE_STANDARD },
    },
  };

  return (
    <Tag
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView={triggerOnView ? "visible" : undefined}
      animate={triggerOnView ? undefined : "visible"}
      viewport={{ once: true, amount: 0.4 }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.06em" }}
        >
          <motion.span
            variants={child}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
