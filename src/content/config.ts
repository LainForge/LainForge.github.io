import { defineCollection } from "astro:content";
import { blogSchema } from "./_schemas";
import { projectSchema } from "./_schemas";

const blog = defineCollection({
  schema: blogSchema,
});

const project = defineCollection({
  schema: projectSchema,
});

export const collections = { blog, project };
