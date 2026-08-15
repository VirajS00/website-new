import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    short_description: z.string(),
    thumbnail: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    project_id: z.number().optional().nullable(),
  }),
});

export const collections = { blog };
