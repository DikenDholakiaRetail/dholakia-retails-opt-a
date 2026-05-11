import type { Metadata } from "next";
import CraftsmanshipHero from "@/components/craftsmanship/CraftsmanshipHero";
import CraftPhilosophy from "@/components/craftsmanship/CraftPhilosophy";
import MakingEcosystem from "@/components/craftsmanship/MakingEcosystem";
import ProcessTimeline from "@/components/craftsmanship/ProcessTimeline";
import EditorialQuote from "@/components/craftsmanship/EditorialQuote";

export const metadata: Metadata = {
  title: "Craftsmanship",
  description:
    "Luxury jewellery is defined by detail, balance, finish, and the intelligence of skilled hands. Inside the disciplines of craft at Dholakia Retail.",
};

/**
 * Page 5 — Craftsmanship.
 *   S01 Hero               (Frame P05-S01)
 *   S02 Craft Philosophy   (Frame P05-S02)
 *   S03 Making Ecosystem   (Frame P05-S03)
 *   S04 Process Timeline   (Frame P05-S04)
 *   S05 Editorial Quote    (Frame P05-S05)
 */
export default function CraftsmanshipPage() {
  return (
    <>
      <CraftsmanshipHero />
      <CraftPhilosophy />
      <MakingEcosystem />
      <ProcessTimeline />
      <EditorialQuote />
    </>
  );
}
