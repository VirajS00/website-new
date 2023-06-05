import type { FilmsTableReturnType } from "../types/films-db-return-type";
import type { YoutubeApiResponseType } from "../types/youtube-api-response";
import { getData } from "./get-data";

type VideSummary = {
	title: string;
	category: string;
	short_description: string;
	year: string;
	thumbnail: string;
	videoId: string;
};

export const getVideoSummary = async (
	category?: string
): Promise<VideSummary[]> => {
	const url = import.meta.env.YOUTUBE_API_URL;

	const res = await fetch(url, {
		headers: {
			"Content-type": "application/JSON",
		},
	});

	const ytData = (await res.json()) as YoutubeApiResponseType;

	const dbData = (await getData(
		"SELECT * FROM films"
	)) as FilmsTableReturnType[];

	const returnValue: VideSummary[] = dbData.map((x) => {
		const videoId = x.film_id;

		const ytDataFilm = ytData.items.find(
			(x) => x.snippet.resourceId.videoId === videoId
		);

		return {
			category: x.category,
			short_description: x.film_short_description,
			thumbnail: ytDataFilm?.snippet.thumbnails.high.url ?? "",
			title: ytDataFilm?.snippet.title ?? "",
			videoId: videoId,
			year: x.year,
		};
	});

	if (category === "all") {
		return returnValue;
	} else {
		return returnValue.filter((x) => x.category === category);
	}
};

export const getCurrentCategories = async (): Promise<string[]> => {
	const dbData = (await getData("SELECT category FROM films")) as {
		category: string;
	}[];

	const categories = ["all", ...new Set(dbData.map((x) => x.category))];

	return categories;
};
