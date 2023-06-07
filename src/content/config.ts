import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		short_description: z.string(),
		thumbnail: z.string(),
		image: z.string(),
		tags: z.array(z.string()),
	}),
});

export const collections = {
	blog: blogCollection,
};
