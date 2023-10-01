import type { CodingData, CodingDataRaw } from "../types/coding-used";
import { getAspectRatio } from "./get-aspect-ratio";
import { getData } from "./get-data";

export const getCodingDesign = async (): Promise<CodingData[]> => {
	const dbData = (await getData(
		"SELECT * FROM coding_design ORDER BY id ASC"
	)) as CodingDataRaw[];

	let picDataRet = [];

	for (let i = 0; i < dbData.length; i++) {
		const picData = {
			url: dbData[i].img,
			...(await getAspectRatio(dbData[i].img)),
		};

		picDataRet.push({
			...dbData[i],
			tools_used: dbData[i].tools_used.split(","),
			img: picData,
		});
	}

	return picDataRet;
};
