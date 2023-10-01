import { ExifParserFactory } from "ts-exif-parser";

export const getAspectRatio = async (
	picUrl: string
): Promise<{
	imageTags?: { height?: number; width?: number };
	aspectRatio: number;
}> => {
	const rawPic = await fetch(picUrl);
	const a = await rawPic.blob();
	const buffer = await a.arrayBuffer();

	const parser = ExifParserFactory.create(buffer);

	const parsed = parser.parse();

	const imageTags = parsed.imageSize;

	const aspectRatio = (imageTags?.width ?? 3) / (imageTags?.height ?? 2);

	return {
		imageTags,
		aspectRatio,
	};
};
