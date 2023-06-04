export type YoutubeThumbnailResponse = {
	url: string;
	width: number;
	height: number;
};

export type YoutubeApiResponseItem = {
	kind: string;
	etag: string;
	id: string;
	snippet: {
		publishedAt: string;
		channelId: string;
		title: string;
		description: string;
		thumbnails: {
			default: YoutubeThumbnailResponse;
			medium: YoutubeThumbnailResponse;
			high: YoutubeThumbnailResponse;
			standard: YoutubeThumbnailResponse;
			maxres: YoutubeThumbnailResponse;
		};
		channelTitle: string;
		playlistId: string;
		position: number;
		resourceId: {
			kind: string;
			videoId: string;
		};
		videoOwnerChannelTitle: string;
		videoOwnerChannelId: string;
	};
};

export type YoutubeApiResponseType = {
	kind: string;
	etag: string;
	items: YoutubeApiResponseItem[];
};
