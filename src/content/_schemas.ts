import { z } from "astro:content";

export const blogSchema = z
  .object({
    author: z.string().optional(),
    pubDatetime: z.date(),
    title: z.string(),
    postSlug: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: z.string().optional(),
    description: z.string(),
    canonicalURL: z.string().optional(),
    category: z.string().default('blog'),
    projectTitle: z.string().default('none')
  })
  .strict();

export const projectSchema = z.object({
  title: z.string(),
  pubDatetime: z.date(),
  projectSlug: z.string().optional(),
  featured: z.boolean().optional(),
  draft: z.boolean().optional(),
  tags: z.array(z.string()).default(["others"]),
  ogImage: z.string().optional(),
  status: z.string().optional().default("ongoing"),
  description: z.string(),
  canonicalURL: z.string().optional(),
});

export type BlogFrontmatter = z.infer<typeof blogSchema>;
export type ProjectFrontMatter = z.infer<typeof projectSchema>;
