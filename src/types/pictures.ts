import type { ImgHTMLAttributes } from "@astrojs/image/components";

export type Picture = {
	meta: PictureDbResponse;
	image: ImgHTMLAttributes;
	sources: {
		type: string;
		srcset: string;
	}[];
	dimentions: {
		height?: number;
		width?: number;
		aspectRatio: number;
	};
};

export type PictureSrcType = {
	img_id: number;
	img_path: string;
	categ_id: number;
	category: string;
	caption: string;
};

export type PictureDbResponse = {
	img_id: number;
	img_path: string;
	categ_id: string;
	category: string;
	caption: string;
	url_small: string;
	sort: number;
};
