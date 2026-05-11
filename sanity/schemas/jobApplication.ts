import { defineField, defineType } from "sanity";

/**
 * Job Application — submitted via P11-S04 application form.
 */
export default defineType({
  name: "jobApplication",
  title: "Job Application",
  type: "document",
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
      validation: (r) => r.required().max(180),
    }),
    defineField({
      name: "currentRole",
      title: "Current Role",
      type: "string",
      validation: (r) => r.max(160),
    }),
    defineField({
      name: "coverNote",
      title: "Cover Note",
      type: "text",
      rows: 6,
      validation: (r) => r.max(4000),
    }),
    defineField({
      name: "howDidYouHear",
      title: "How did you hear?",
      type: "string",
    }),
    defineField({
      name: "cvUrl",
      title: "CV URL",
      type: "url",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "reference",
      to: [{ type: "career" }],
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
          { title: "Reviewing", value: "reviewing" },
          { title: "Shortlisted", value: "shortlisted" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
  ],
  preview: {
    select: { title: "fullName", subtitle: "role.title", date: "submittedAt" },
    prepare({ title, subtitle, date }) {
      const d = date ? new Date(date as string).toLocaleString() : "";
      return { title: title as string, subtitle: [subtitle, d].filter(Boolean).join(" · ") };
    },
  },
});
