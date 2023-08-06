import { defineConfig } from "astro/config";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";

import solidJs from "@astrojs/solid-js";
import codeTitles from "remark-code-titles";

// https://astro.build/config
export default defineConfig({
	integrations: [image(), mdx(), solidJs()],
	markdown: {
		shikiConfig: {
			theme: "material-theme-darker",
		},
		remarkPlugins: [codeTitles],
	},
	compressHTML: true,
});
