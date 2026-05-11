"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import TiltCard from "@/components/motion/TiltCard";
import EditorialImage from "@/components/motion/EditorialImage";
import { EASE_STANDARD } from "@/lib/motion";
import { GROUP_LEADERSHIP } from "@/lib/media";

/**
 * P02-S03 Leadership.
 * 4-col grid (3-col tablet, 1-col mobile). 4:5 portrait → name → role.
 * On hover: card flip 3D rotateY 0→180° over 600ms ease-in-out.
 * PortraitSubtleDrift — image drifts ±4px on cursor (face stays centered).
 * Card3DTilt at 2° max (very gentle).
 * Cards stagger-enter 100ms apart, fade-up 24px Y.
 * Below: text-link row Governance · Code · Sourcing — underline draws-in 300ms left-to-right.
 */

type Director = {
  name: string;
  role: string;
  bio: string;
  hue: string;
  src: { id: string; alt: string };
};

const DIRECTORS: Director[] = [
  {
    name: "Founder Director",
    role: "Chairperson",
    bio: "Long-term steward of the group's strategic direction; brings decades of jewellery and retail leadership to the corporate platform.",
    hue: "#1f2c4d",
    src: GROUP_LEADERSHIP[0],
  },
  {
    name: "Managing Director",
    role: "Managing Director",
    bio: "Oversees brand portfolio development, governance, and long-term operating strategy across the Dholakia Retail platform.",
    hue: "#243352",
    src: GROUP_LEADERSHIP[1],
  },
  {
    name: "Director, Brands",
    role: "Director · Brands",
    bio: "Leads brand strategy, creative direction, and the architecture for new houses entering the portfolio over time.",
    hue: "#1c2845",
    src: GROUP_LEADERSHIP[2],
  },
  {
    name: "Director, Operations",
    role: "Director · Operations",
    bio: "Stewards operational excellence, sourcing discipline, and the systems that protect quality at every stage of creation.",
    hue: "#202d4a",
    src: GROUP_LEADERSHIP[3],
  },
];

const POLICY_LINKS = [
  { label: "Governance Framework", href: "/the-group#governance" },
  { label: "Code of Conduct", href: "/the-group#conduct" },
  { label: "Ethical Sourcing Charter", href: "/the-group#sourcing" },
];

export default function Leadership() {
  return (
    <section id="leadership" className="bg-white" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
      <div className="container-editorial">
        <div className="max-w-2xl mb-16 md:mb-20">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Leadership
          </motion.p>
          <motion.h2
            className="mb-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE_STANDARD }}
            style={{ fontSize: "clamp(1.875rem, 3.4vw, 3rem)", lineHeight: 1.15, letterSpacing: "-0.015em" }}
          >
            Guided by long-term thinking.
          </motion.h2>
          <motion.p
            className="text-[var(--color-text-body)] leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE_STANDARD }}
          >
            Director names and roles are drawn from public records or
            client-approved information. Portrait photography is in production —
            silhouette placeholders are used here.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {DIRECTORS.map((d) => (
            <motion.div
              key={d.name}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
              }}
            >
              <DirectorCard d={d} />
            </motion.div>
          ))}
        </motion.div>

        {/* Policy links — underline draws in on hover, 300ms left-to-right */}
        <motion.div
          className="mt-20 pt-10 border-t border-black/10 flex flex-wrap items-center gap-x-10 gap-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE_STANDARD }}
        >
          <span className="text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)]">
            Governance
          </span>
          {POLICY_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group/link inline-flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors text-[0.95rem]"
            >
              <span className="relative inline-block">
                {l.label}
                <span
                  className="absolute left-0 right-0 -bottom-1 h-px bg-[var(--color-accent-primary)] origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 ease-out"
                />
              </span>
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5"
              />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DirectorCard({ d }: { d: Director }) {
  const cardRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  // PortraitSubtleDrift: portrait drifts ±4px on cursor; face stays centered (env shifts)
  useMouseParallax(cardRef, [{ ref: portraitRef, amplitude: 4 }], {
    duration: 0.5,
    ease: "power2.out",
  });

  return (
    <TiltCard angle="gentle" scale={1.005} as="article">
      <article ref={cardRef} className="will-change-transform">
        {/* 3D flip wrapper */}
        <div
          className="relative aspect-[4/5] overflow-hidden bg-[var(--color-bg-elevated)] group/card"
          style={{ perspective: "1500px" }}
        >
          <motion.div
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
            initial={false}
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
          >
            {/* Front — environmental B&W portrait with parallax drift */}
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: "hidden", background: `linear-gradient(160deg, ${d.hue} 0%, #08101F 100%)` }}
            >
              <div ref={portraitRef} className="absolute inset-0">
                <EditorialImage src={d.src} fill sizes="(min-width: 1024px) 25vw, 50vw" />
              </div>
              <div
                className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
                  backgroundSize: "3px 3px",
                }}
              />
            </div>

            {/* Back — bio on Soft Sky */}
            <div
              className="absolute inset-0 p-6 flex items-center"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "var(--color-accent-soft)",
              }}
            >
              <p className="text-white text-[0.9rem] leading-relaxed">{d.bio}</p>
            </div>
          </motion.div>
        </div>

        <div className="pt-5">
          <h3 className="text-[var(--color-text-primary)]" style={{ fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.25 }}>
            {d.name}
          </h3>
          <p className="text-[0.7rem] tracking-[0.14em] uppercase text-[var(--color-text-muted)] mt-2">
            {d.role}
          </p>
        </div>
      </article>
    </TiltCard>
  );
}
