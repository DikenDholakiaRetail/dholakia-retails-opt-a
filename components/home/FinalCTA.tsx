import PageClosingBand from "@/components/cta/PageClosingBand";

/** P01-S09 Final CTA — reuses PageClosingBand. Variant: navy. Magnetic strong (140px / 0.5). */
export default function FinalCTA() {
  return (
    <PageClosingBand
      heading="Start the conversation."
      body="For partnerships, media inquiries, brand discussions, or future collaboration, connect with Dholakia Retail directly."
      ctaLabel="Contact the House"
      ctaHref="/contact"
      variant="navy"
      strength="strong"
    />
  );
}
