"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Newspaper, Users, Gem, ArrowRight } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import TiltCard from "@/components/motion/TiltCard";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * P12-S02 Inquiry Routing — 4-col card grid on White.
 * Card3DTilt 4° (expressive). Cards stagger 80ms; hover lift +6px with sequential
 * Electric Blue border draw (100ms per edge). Click hands off to #contact-form
 * with `?type=` URL parameter — InquiryForm pre-selects the matching option.
 */

const CARDS = [
  {
    Icon: Briefcase,
    title: "Business & Partnerships",
    description:
      "Investor relations, strategic alliances, supplier partnerships, and joint ventures.",
    type: "partnership",
  },
  {
    Icon: Newspaper,
    title: "Media & Press",
    description:
      "Press inquiries, interview requests, and access to the press kit.",
    type: "press",
  },
  {
    Icon: Users,
    title: "Careers",
    description:
      "Profile submissions, role inquiries, and recruitment partnerships.",
    type: "careers",
  },
  {
    Icon: Gem,
    title: "Brand Inquiries",
    description:
      "Mayavé private viewings, brand development inquiries, future-territory proposals.",
    type: "brand",
  },
];

export default function RoutingCards() {
  return (
    <section className="bg-white" style={{ paddingTop: "120px", paddingBottom: "60px" }}>
      <div className="container-editorial">
        <div className="max-w-2xl mb-12 md:mb-14 mx-auto text-center">
          <RevealText
            text="Choose the right desk."
            as="h2"
            className="text-[var(--color-text-primary)]"
            style={{
              fontSize: "clamp(1.875rem, 3.4vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
            }}
            staggerMs={50}
            durationMs={650}
          />
        </div>

        <motion.div
          className="group/grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: "1000px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {CARDS.map(({ Icon, title, description, type }) => (
            <motion.div
              key={type}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
              }}
            >
              <TiltCard angle="expressive" scale={1.015}>
                <Link
                  href={`?type=${type}#contact-form`}
                  scroll
                  className="group/card relative flex flex-col h-full p-7 bg-white border border-black/10 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-transparent"
                >
                  <span className="pointer-events-none absolute top-0 left-0 h-px bg-[var(--color-accent-primary)] w-0 group-hover/card:w-full transition-[width] duration-100 ease-out" />
                  <span className="pointer-events-none absolute top-0 right-0 w-px bg-[var(--color-accent-primary)] h-0 group-hover/card:h-full transition-[height] duration-100 ease-out delay-100" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-px bg-[var(--color-accent-primary)] w-0 group-hover/card:w-full transition-[width] duration-100 ease-out delay-200" />
                  <span className="pointer-events-none absolute bottom-0 left-0 w-px bg-[var(--color-accent-primary)] h-0 group-hover/card:h-full transition-[height] duration-100 ease-out delay-300" />

                  <Icon size={32} strokeWidth={1.5} className="text-[var(--color-accent-primary)] mb-5" />
                  <h3
                    className="font-[family-name:var(--font-display)] text-[var(--color-text-primary)] mb-3"
                    style={{ fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.25 }}
                  >
                    {title}
                  </h3>
                  <p className="text-[var(--color-text-body)] text-[0.9rem] leading-relaxed mb-6 flex-1">
                    {description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[var(--color-accent-primary)] text-[0.85rem] font-medium">
                    Get in touch
                    <ArrowRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform duration-300 group-hover/card:translate-x-1"
                    />
                  </span>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
