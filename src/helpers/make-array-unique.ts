export const makeArrayUnique = (arr: any[], prop: string) => {
	const uniqueMap = arr.reduce((map, obj) => {
		const key = obj[prop];
		if (!map.has(key)) {
			map.set(key, obj);
		}
		return map;
	}, new Map());

	return Array.from(uniqueMap.values());
};
