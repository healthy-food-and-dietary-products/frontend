// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function splitIntoSubArrays(arr: Record<string, any>[], arrSize: number) {
	const arrayWithSubArrays = [];
	for (let i = 0; i < arr.length; i += arrSize) {
		arrayWithSubArrays.push(arr.slice(i, i + arrSize));
	}

	return arrayWithSubArrays;
}

export function declOfNum(n: number, titles: [string, string, string]) {
	return titles[
		n % 10 === 1 && n % 100 !== 11
			? 0
			: n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
			? 1
			: 2
	];
}
