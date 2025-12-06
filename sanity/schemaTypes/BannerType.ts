// schemas/banner.ts
import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const bannerType = defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Banner Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "image",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Redirect Link",
      type: "url",
      description: "URL where this banner should redirect when clicked",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description: "Text to show on the banner button",
    }),
    defineField({
      name: "priority",
      title: "Priority / Order",
      type: "number",
      description: "Use for sorting banners (smaller = first)",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "isActive",
      title: "Active Banner",
      type: "boolean",
      description: "Turn off if you don't want to show this banner",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "subtitle",
    },
    prepare(selection) {
      const { title, media, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle,
        media: media,
      };
    },
  },
});
