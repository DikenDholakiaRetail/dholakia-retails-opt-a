import type { Metadata } from "next";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import BrandMatrix from "@/components/portfolio/BrandMatrix";
import MayaveSpotlight from "@/components/portfolio/MayaveSpotlight";
import FutureTerritories from "@/components/portfolio/FutureTerritories";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A house of distinct brand expressions. Each brand within the Dholakia Retail portfolio is shaped for a specific audience and emotional territory.",
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <BrandMatrix />
      <MayaveSpotlight />
      <FutureTerritories />
      <PortfolioCTA />
    </>
  );
}
