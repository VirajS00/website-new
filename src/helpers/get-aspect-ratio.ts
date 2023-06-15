// @ts-ignore
import ExifParser from "exif-parser";

export const getAspectRatio = async (
	picUrl: string
): Promise<{
	imageTags: { height: number; width: number };
	aspectRatio: number;
}> => {
	const rawPic = await fetch(picUrl);
	const a = await rawPic.blob();
	const buffer = await a.arrayBuffer();

	const parser = ExifParser.create(buffer);
	const imageTags = parser.parse().imageSize;
	const aspectRatio = parseInt(imageTags.width) / parseInt(imageTags.height);

	return {
		imageTags,
		aspectRatio,
	};
};
