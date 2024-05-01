import type { CodingData } from "../types/coding-used";
import CodingDesign from "../../data/coding_design.json";

export const getCodingDesign = (): CodingData[] => {
	const data = CodingDesign.data;

	let picDataRet = [];

	for (let i = 0; i < data.length; i++) {
		const picData = {
			url: data[i].img,
		};

		picDataRet.push({
			...data[i],
			tools_used: data[i].tools_used,
			img: picData,
		});
	}

	return picDataRet;
};
