import { z } from "zod";

export const HOW_HEARD_OPTIONS = [
  "LinkedIn",
  "Company website",
  "Referral",
  "Industry network",
  "Other",
] as const;

export const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email"),
  currentRole: z.string().trim().min(2).max(160),
  cvUrl: z
    .string()
    .trim()
    .url("Please paste a public link to your CV (PDF or website)")
    .max(500),
  coverNote: z
    .string()
    .trim()
    .min(20, "Please share at least a short note (20+ characters)")
    .max(4000),
  howDidYouHear: z.enum(HOW_HEARD_OPTIONS),
  roleSlug: z.string().trim().max(120),
  // Honeypot — must be empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
