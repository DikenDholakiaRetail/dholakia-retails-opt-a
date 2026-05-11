"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import RevealText from "@/components/motion/RevealText";
import TiltCard from "@/components/motion/TiltCard";
import EditorialImage from "@/components/motion/EditorialImage";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { EASE_STANDARD } from "@/lib/motion";
import { MAYAVE_LOOKBOOK } from "@/lib/media";

/**
 * P04-S04 Lookbook.
 * Masonry grid (3-col desktop, 2-col tablet, 1-col mobile).
 * Mixed aspect ratios: 4:5 portrait, 1:1 square, 16:9 landscape.
 * EditorialImageDrift on each image (±10px, scale 1.04 base).
 * Card3DTilt at 3°. Click suggests lightbox (expand icon).
 * Stagger-enter 60ms apart, fade-up 16px Y. Hover: image scale 1.05 600ms; caption +4px.
 *
 * Image source: lib/media → MAYAVE_LOOKBOOK (cool-tone editorial photography
 * via Unsplash, filtered through <EditorialImage>).
 */

type Tile = {
  caption: string;
  ratio: "4/5" | "1/1" | "16/9";
  src: { id: string; alt: string };
};

const CAPTIONS = [
  "Stillness in detail",
  "Light in proportion",
  "The private surface",
  "Jewellery as whisper",
  "Stillness in detail",
  "Light in proportion",
];

const TILES: Tile[] = MAYAVE_LOOKBOOK.map((src, i) => ({
  caption: CAPTIONS[i],
  ratio: src.ratio as "4/5" | "1/1" | "16/9",
  src,
}));

export default function Lookbook() {
  return (
    <section
      className="bg-white"
      style={{ paddingTop: "160px", paddingBottom: "160px" }}
    >
      <div className="container-editorial">
        <div className="max-w-2xl mb-16 md:mb-20">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE_STANDARD }}
          >
            Lookbook
          </motion.p>
          <RevealText
            text="The visual heart of Mayavé."
            as="h2"
            className="text-[var(--color-text-primary)] font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(1.875rem, 3.4vw, 3rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              fontWeight: 500,
            }}
            staggerMs={50}
            durationMs={650}
          />
        </div>

        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {TILES.map((t, i) => (
            <LookbookTile key={i} tile={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function LookbookTile({ tile }: { tile: Tile }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useMouseParallax(cardRef, [{ ref: imgRef, amplitude: 10 }], {
    duration: 0.5,
    ease: "power2.out",
  });

  return (
    <motion.div
      className="break-inside-avoid mb-6"
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_STANDARD } },
      }}
    >
      <TiltCard angle="standard" scale={1.005}>
        <div
          ref={cardRef}
          className="group/tile relative overflow-hidden cursor-pointer"
        >
          <motion.div
            ref={imgRef}
            className="relative w-full will-change-transform overflow-hidden"
            style={{
              aspectRatio: tile.ratio,
              transform: "scale(1.04)",
              background:
                "linear-gradient(135deg, #1a2b4f 0%, #050A14 100%)",
            }}
          >
            {/* Editorial photograph */}
            <div className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover/tile:scale-[1.05]">
              <EditorialImage
                src={tile.src}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>

            {/* Expand icon on hover */}
            <span className="absolute top-4 right-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-accent-primary)] text-white opacity-0 group-hover/tile:opacity-100 transition-opacity duration-[240ms] z-10">
              <Expand size={16} strokeWidth={1.5} />
            </span>
          </motion.div>
          <p
            className="mt-3 font-[family-name:var(--font-display)] italic text-[var(--color-text-muted)] transition-transform duration-[240ms] ease-out group-hover/tile:-translate-y-1"
            style={{ fontSize: "0.95rem" }}
          >
            {tile.caption}
          </p>
        </div>
      </TiltCard>
    </motion.div>
  );
}
