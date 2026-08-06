import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        tags: z.array(
          z.enum([
            "Routes In",
            "My Journey",
            "Should You Move?",
            "Practical Advice",
            "Classroom Life",
          ]),
        ),
        heroImage: image().optional(),
        heroImageAlt: z.string().optional(),
      })
      .refine(
        (data) =>
          !data.heroImage ||
          (data.heroImageAlt && data.heroImageAlt.trim().length > 0),
        {
          message: "heroImageAlt is required whenever heroImage is set",
          path: ["heroImageAlt"],
        },
      ),
});

export const collections = { posts };
