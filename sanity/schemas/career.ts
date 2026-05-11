import { defineField, defineType } from "sanity";

/**
 * Career — single role document.
 * Spec P10 + P11. Used by `/careers` listing and `/careers/[slug]` detail.
 */
export default defineType({
  name: "career",
  title: "Career",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Role Title",
      type: "string",
      validation: (r) => r.required().max(140),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "functionArea",
      title: "Function",
      type: "string",
      options: {
        list: [
          { title: "Design", value: "design" },
          { title: "Brand", value: "brand" },
          { title: "Merchandising", value: "merchandising" },
          { title: "Retail", value: "retail" },
          { title: "Operations", value: "operations" },
          { title: "Corporate Functions", value: "corporate" },
        ],
        layout: "dropdown",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Surat",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      options: {
        list: [
          { title: "Full-time", value: "Full-time" },
          { title: "Part-time", value: "Part-time" },
          { title: "Contract", value: "Contract" },
          { title: "Internship", value: "Internship" },
        ],
        layout: "dropdown",
      },
      initialValue: "Full-time",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description (subtitle)",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: "publishDate",
      title: "Posted Date",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "closingDate",
      title: "Applications Close",
      type: "datetime",
    }),
    defineField({
      name: "leadParagraph",
      title: "Lead Paragraph (About the Role)",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "responsibilities",
      title: "What you will do",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.max(12),
    }),
    defineField({
      name: "requirements",
      title: "What we are looking for",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.max(12),
    }),
    defineField({
      name: "successMetrics",
      title: "What success looks like in 12 months",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "teamDescription",
      title: "Team Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "teamValues",
      title: "Team Values (pills)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "manager",
      title: "Manager",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "compensationSummary",
      title: "Compensation Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [
        defineField({
          name: "benefit",
          title: "Benefit",
          type: "object",
          fields: [
            { name: "icon", title: "Icon", type: "string", options: { list: ["heart", "plane", "calendar", "hammer"] } },
            { name: "label", title: "Label", type: "string" },
          ],
        }),
      ],
      validation: (r) => r.max(8),
    }),
    defineField({
      name: "applicationInstructions",
      title: "Application Instructions",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "active",
      title: "Active (open for applications)",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Posted, newest first",
      name: "publishDateDesc",
      by: [{ field: "publishDate", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "functionArea", date: "publishDate" },
    prepare({ title, subtitle, date }) {
      const d = date ? new Date(date as string).toLocaleDateString() : "";
      return { title: title as string, subtitle: [subtitle, d].filter(Boolean).join(" · ") };
    },
  },
});
