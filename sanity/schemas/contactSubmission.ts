import { defineField, defineType } from "sanity";

/**
 * Contact form submissions — stored as documents.
 * Created server-side via /api/contact; not user-editable in Studio (read-only-friendly).
 */
export default defineType({
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  readOnly: false, // editor can mark resolved, archive, etc.
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (r) =>
        r
          .required()
          .max(180)
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email", invert: false }),
    }),
    defineField({
      name: "organisation",
      title: "Company / Organisation",
      type: "string",
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "inquiryType",
      title: "Inquiry Type",
      type: "string",
      options: {
        list: [
          { title: "Business & Partnerships", value: "partnership" },
          { title: "Media & Press", value: "press" },
          { title: "Careers", value: "careers" },
          { title: "Brand Inquiries", value: "brand" },
        ],
        layout: "dropdown",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 6,
      validation: (r) => r.required().min(20).max(2000),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "In progress", value: "in_progress" },
          { title: "Resolved", value: "resolved" },
          { title: "Spam", value: "spam" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
  ],
  orderings: [
    {
      title: "Submitted, newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "fullName", subtitle: "inquiryType", date: "submittedAt", status: "status" },
    prepare({ title, subtitle, date, status }) {
      const d = date ? new Date(date as string).toLocaleString() : "";
      return {
        title: title as string,
        subtitle: [subtitle, status, d].filter(Boolean).join(" · "),
      };
    },
  },
});
