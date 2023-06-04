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

	const returnValue: VideSummary[] = ytData.items.map((x) => {
		const videoId = x.snippet.resourceId.videoId;

		const dbDataFilm = dbData.find((x) => x.film_id === videoId);

		return {
			category: dbDataFilm?.category ?? "",
			short_description: dbDataFilm?.film_short_description ?? "",
			thumbnail: x.snippet.thumbnails.high.url,
			title: x.snippet.title,
			year: dbDataFilm?.year ?? "",
			videoId: videoId,
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
