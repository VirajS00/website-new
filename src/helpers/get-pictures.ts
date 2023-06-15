import type { Picture, PictureDbResponse } from "../types/pictures";
import { getData } from "./get-data";
import { getPicture } from "@astrojs/image";
// @ts-ignore
import ExifParser from "exif-parser";

export const convertPictures = async (picturesSrc: PictureDbResponse[]) => {
	const picturesPromise: Promise<Picture>[] = picturesSrc.map(async (pic) => {
		const rawPic = await fetch(pic.img_path);
		const a = await rawPic.blob();
		const buffer = await a.arrayBuffer();

		const parser = ExifParser.create(buffer);
		const imageTags = parser.parse().imageSize;
		const aspectRatio = parseInt(imageTags.width) / parseInt(imageTags.height);

		const pics = await getPicture({
			alt: pic.caption,
			formats: ["avif", "webp", "jpg"],
			src: pic.img_path,
			widths: [800],
			aspectRatio: aspectRatio,
			fit: "cover",
		});

		return { ...pics, meta: pic, dimentions: { ...imageTags, aspectRatio } };
	});

	const pics = await Promise.all(picturesPromise);

	return pics;
};

export const getPictures = async (category: string): Promise<Picture[]> => {
	let q;

	if (category === "all") {
		q = "SELECT * FROM images ORDER BY sort ASC";
	} else {
		q = `SELECT * FROM images WHERE category = '${category}' ORDER BY sort ASC`;
	}

	const dbData = (await getData(q)) as PictureDbResponse[];

	const converted = await convertPictures(dbData);

	return converted;
};

export const getCategories = async () => {
	const dbData = (await getData(
		"SELECT category FROM images ORDER BY sort ASC"
	)) as PictureDbResponse[];

	const allCategArray = dbData.map((x) => x.category);

	const categArray = [...new Set(allCategArray)];

	return [
		{ displayName: "All", category: "all" },
		...categArray.map((x) => ({ displayName: x, category: x.toLowerCase() })),
	];
};
