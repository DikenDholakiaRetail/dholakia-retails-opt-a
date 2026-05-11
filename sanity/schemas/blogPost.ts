import { defineField, defineType } from "sanity";

/**
 * Blog Post — long-form journal entries. Editorial voice (≠ News press style).
 * Spec P18 + P19.
 */
export default defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Craft", value: "craft" },
          { title: "Materials", value: "materials" },
          { title: "Philosophy", value: "philosophy" },
          { title: "Conversations", value: "conversations" },
          { title: "Atelier", value: "atelier" },
          { title: "Sustainability", value: "sustainability" },
        ],
        layout: "dropdown",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured (surfaces in P18-S02)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail (16:9, grid card)",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image (4:3, P18-S02)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image (article hero, optional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishDate",
      title: "Publish Date",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
      validation: (r) => r.min(1).max(60),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "Publish date, newest first",
      name: "publishDateDesc",
      by: [{ field: "publishDate", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", date: "publishDate", media: "thumbnail" },
    prepare({ title, subtitle, date, media }) {
      const d = date ? new Date(date as string).toLocaleDateString() : "";
      return {
        title: title as string,
        subtitle: [subtitle, d].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
