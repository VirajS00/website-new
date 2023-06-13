export const arrayPattern = (length: number, pattern: number[]) => {
	let a = [];

	for (let i = 0; i < length; i++) {
		a.push(...pattern);
	}

	a = a.slice(0, length);

	return a;
};
