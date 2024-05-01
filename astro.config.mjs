import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import qwikdev from "@qwikdev/astro";
import icon from "astro-icon";
import codeTitles from "remark-code-titles";

// https://astro.build/config
export default defineConfig({
	integrations: [mdx(), icon(), qwikdev()],
	markdown: {
		shikiConfig: {
			theme: "material-theme-darker",
		},
		remarkPlugins: [codeTitles],
	},
	image: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.ytimg.com",
			},
			{
				protocol: "https",
				hostname: "**.staticflickr.com",
			},
			{
				protocol: "https",
				hostname: "**.cloudinary.com",
			},
		],
	},
	compressHTML: true,
});
