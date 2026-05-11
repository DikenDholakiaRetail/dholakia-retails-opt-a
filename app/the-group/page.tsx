import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import CorporateIdentity from "@/components/about/CorporateIdentity";
import Leadership from "@/components/about/Leadership";
import Philosophy from "@/components/about/Philosophy";
import Timeline from "@/components/about/Timeline";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "The Group",
  description:
    "Established in 2024, Dholakia Retail was created to build, guide, and grow luxury jewellery brands with governance, precision, and long-term vision.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CorporateIdentity />
      <Leadership />
      <Philosophy />
      <Timeline />
      <FinalCTA />
    </>
  );
}
