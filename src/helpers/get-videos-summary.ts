import type { FilmsTableReturnType } from "../types/films-db-return-type";
import type { YoutubeApiResponseType } from "../types/youtube-api-response";
import { getData } from "./get-data";
import Autolinker from "autolinker";

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
		return returnValue.reverse();
	} else {
		return returnValue.filter((x) => x.category === category).reverse();
	}
};

export const getCurrentCategories = async (): Promise<string[]> => {
	const dbData = (await getData("SELECT category FROM films")) as {
		category: string;
	}[];

	const categories = ["all", ...new Set(dbData.map((x) => x.category))];

	return categories;
};

export const getVideoIds = async (): Promise<string[]> => {
	const dbData = (await getData("SELECT film_id FROM films")) as {
		film_id: string;
	}[];

	return dbData.map((x) => x.film_id);
};

type FilmDetailsReturnType = {
	video_id: string;
	title?: string;
	description?: string;
	role: string;
	category: string;
	year: string;
};

export const getVideoDetails = async (
	filmId?: string
): Promise<FilmDetailsReturnType> => {
	const dbData = (await getData(
		`SELECT * FROM films WHERE film_id = '${filmId}'`
	)) as FilmsTableReturnType[];

	const url = import.meta.env.YOUTUBE_API_URL;

	const res = await fetch(url, {
		headers: {
			"Content-type": "application/JSON",
		},
	});

	const ytData = (await res.json()) as YoutubeApiResponseType;

	return dbData.map((x) => {
		const filmYt = ytData.items.find(
			(y) => y.snippet.resourceId.videoId === x.film_id
		);

		const autolinker = new Autolinker({ newWindow: true, className: "lnk" });

		return {
			video_id: x.film_id,
			title: filmYt?.snippet.title,
			description: autolinker.link(
				filmYt?.snippet.description.replace(/(?:\r\n|\r|\n)/g, "<br>") ?? ""
			),
			role: x.my_role,
			category: x.category,
			year: x.year,
		};
	})[0];
};
