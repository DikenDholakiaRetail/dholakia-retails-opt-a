import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "News Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "content",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail (16:9, listing card)",
      type: "image",
      group: "media",
      options: { hotspot: true, metadata: ["lqip", "palette"] },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string", validation: (r) => r.required() }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image (detail-page hero, optional)",
      type: "image",
      group: "media",
      options: { hotspot: true, metadata: ["lqip", "palette"] },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Short description / excerpt",
      type: "text",
      group: "content",
      rows: 3,
      validation: (r) => r.required().min(20).max(220),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
    }),
    /* SEO group */
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta title",
          type: "string",
          validation: (r) => r.max(60),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta description",
          type: "text",
          rows: 3,
          validation: (r) => r.max(160),
        }),
        defineField({
          name: "ogImage",
          title: "Open Graph image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "thumbnail",
      date: "publishedAt",
    },
    prepare({ title, subtitle, media, date }) {
      const d = date ? new Date(date as string).toLocaleDateString() : "";
      return {
        title: title as string,
        subtitle: [subtitle, d].filter(Boolean).join(" · "),
        media: media as React.ReactNode,
      };
    },
  },
});
