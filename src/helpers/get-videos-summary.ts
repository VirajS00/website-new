import type { YoutubeApiResponseType } from "../types/youtube-api-response";
import Films from "../../data/films.json";
import Autolinker from "autolinker";
import { sortArrayByNestedKey } from "./sort-array-by-key";

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

	const returnValue: VideSummary[] = Films.data.map((film) => {
		const videoId = film.film_id;

		const ytDataFilm = ytData.items.find(
			(x) => x.snippet.resourceId.videoId === videoId
		);

		return {
			category: film.category,
			short_description: film.film_short_description,
			thumbnail: ytDataFilm?.snippet.thumbnails.high.url ?? "",
			title: ytDataFilm?.snippet.title ?? "",
			videoId: videoId,
			year: film.year,
			sort_order: film.sort_order,
		};
	});

	if (category === "all") {
		return sortArrayByNestedKey(returnValue, "sort_order");
	} else {
		return sortArrayByNestedKey(
			returnValue.filter((x) => x.category === category),
			"sort_order"
		);
	}
};

export const getCurrentCategories = async (): Promise<string[]> => {
	const cat = new Set(Films.data.map((x) => x.category));
	const categories = ["all", ...Array.from(cat)];

	return categories;
};

export const getVideoIds = async (): Promise<string[]> =>
	Films.data.map((x) => x.film_id);

type FilmDetailsReturnType = {
	video_id: string;
	title?: string;
	description?: string;
	role: string;
	category: string;
	year: string;
	images?: {
		imageUrl: string;
	}[];
};

export const getVideoDetails = async (
	filmId?: string
): Promise<FilmDetailsReturnType> => {
	const url = import.meta.env.YOUTUBE_API_URL;

	const res = await fetch(url, {
		headers: {
			"Content-type": "application/JSON",
		},
	});

	const ytData = (await res.json()) as YoutubeApiResponseType;

	const fd = Films.data.find((x) => x.film_id === filmId);

	const filmYt = ytData.items.find(
		(y) => y.snippet.resourceId.videoId === fd?.film_id
	);

	const autolinker = new Autolinker({
		newWindow: true,
		className: "film-desc-link",
	});

	const images = fd?.images.map((x) => {
		return {
			imageUrl: x,
		};
	});

	return {
		video_id: fd?.film_id ?? "",
		title: filmYt?.snippet.title,
		description: autolinker.link(
			filmYt?.snippet.description.replace(/(?:\r\n|\r|\n)/g, "<br>") ?? ""
		),
		role: fd?.my_role ?? "",
		category: fd?.category ?? "",
		year: fd?.year ?? "",
		images,
	};
};
