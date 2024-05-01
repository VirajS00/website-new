import type { GetImageResult } from "astro";

export type ImageType = GetImageResult & {
	data: {
		img_id: number;
		img_path: string;
		categ_id: number;
		category: string;
		caption: string;
		url_small: string;
		sort: number;
	};
	index?: number;
};
