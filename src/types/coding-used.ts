export type CodingDataRaw = {
	id: number;
	title: string;
	very_short_desc: string;
	img: string;
	github_link: string;
	project_link: string;
	tools_used: string;
};

export type CodingData = {
	id: number;
	title: string;
	very_short_desc: string;
	img: {
		url: string;
		imageTags?: {
			height?: number;
			width?: number;
		};
		aspectRatio: number;
	};
	github_link: string;
	project_link: string;
	tools_used: string[];
};
