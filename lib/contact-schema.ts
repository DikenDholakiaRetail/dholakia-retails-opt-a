import { z } from "zod";

// Spec §1.11 + P12-S04 — exact 4 inquiry types.
export const INQUIRY_OPTIONS = [
  { value: "partnership", label: "Business & Partnerships" },
  { value: "press", label: "Media & Press" },
  { value: "careers", label: "Careers" },
  { value: "brand", label: "Brand Inquiries" },
] as const;

export const inquiryValues = INQUIRY_OPTIONS.map((o) => o.value) as [
  string,
  ...string[],
];

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(120),
  organisation: z
    .string()
    .trim()
    .min(2, "Please enter your company or organisation")
    .max(200),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email"),
  inquiryType: z.enum(inquiryValues),
  message: z
    .string()
    .trim()
    .min(20, "Please share a few sentences (20+ characters)")
    .max(2000),
  // Honeypot — must be empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

// Confirmation copy by inquiry type — spec §1.11.
export const CONFIRMATION_BY_TYPE: Record<string, string> = {
  partnership: "The business development team will respond within 48 hours.",
  press:
    "Our communications team will be in touch within 24 hours. The press kit is available for immediate download.",
  careers: "The talent team will respond within five business days.",
  brand: "A member of our brand team will follow up within 48 hours.",
};
