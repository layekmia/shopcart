import { defineField, defineType } from "sanity";

export const brandType = defineType({
  name: "brand",
  title: "brand",
  type: "document",
  fields: [
    defineField({ name: "string", type: "string" }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", type: "text" }),
    defineField({
      name: "image",
      title: "Brand Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "image" },
  },
});
