import Hero from "@/components/home/Hero";
import IntroStatement from "@/components/home/IntroStatement";
import GuidingPrinciples from "@/components/home/GuidingPrinciples";
import CorporateSnapshot from "@/components/home/CorporateSnapshot";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import BrandFilm from "@/components/home/BrandFilm";
import SustainabilityTeaser from "@/components/home/SustainabilityTeaser";
import NewsPreview from "@/components/home/NewsPreview";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStatement />
      <GuidingPrinciples />
      <CorporateSnapshot />
      <PortfolioPreview />
      <BrandFilm />
      <SustainabilityTeaser />
      <NewsPreview />
      <FinalCTA />
    </>
  );
}
