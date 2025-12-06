import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export const blogCategory = defineType({
  name: "blogcategory",
  title: "Blog Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({ name: "string", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "description",
      type: "text", 
    }),
  ],
});
