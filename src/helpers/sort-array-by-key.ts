function getNestedValue(obj: any, key: string) {
	const keys = key.split(".");
	return keys.reduce((acc, currentKey) => acc[currentKey], obj);
}

export const sortArrayByNestedKey = (array: any[], key: string) => {
	return array.sort((a, b) => {
		const x = getNestedValue(a, key);
		const y = getNestedValue(b, key);
		if (x < y) {
			return -1;
		}
		if (x > y) {
			return 1;
		}
		return 0;
	});
};
