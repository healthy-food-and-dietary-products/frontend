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

type translationsType = {
	grams: {
		singular: 'гр';
		plural: 'кг';
	};
	milliliters: {
		singular: 'мл';
		plural: 'л';
	};
	items: {
		singular: 'шт';
		plural: 'шт';
	};
};

export const translations: translationsType = {
	grams: { singular: 'гр', plural: 'кг' },
	milliliters: { singular: 'мл', plural: 'л' },
	items: { singular: 'шт', plural: 'шт' },
};

export const translateMeasureUnit = (measureUnit: string, amount: number) => {
	const translatedMeasureObj = { measureUnit, amount };

	switch (true) {
		case !measureUnit || !amount:
			translatedMeasureObj.measureUnit = translations.items.singular;
			translatedMeasureObj.amount = 1;
			return translatedMeasureObj;
		case amount > 499 && measureUnit === 'grams':
			translatedMeasureObj.measureUnit = translations.grams.plural;
			translatedMeasureObj.amount = amount / 1000;
			return translatedMeasureObj;
		case amount > 499 && measureUnit === 'milliliters':
			translatedMeasureObj.measureUnit = translations.milliliters.plural;
			translatedMeasureObj.amount = amount / 1000;
			return translatedMeasureObj;
		case measureUnit === 'grams':
			translatedMeasureObj.measureUnit = translations.grams.singular;
			return translatedMeasureObj;
		case measureUnit === 'milliliters':
			translatedMeasureObj.measureUnit = translations.milliliters.singular;
			return translatedMeasureObj;
		case measureUnit === 'items':
			translatedMeasureObj.measureUnit = translations.items.singular;
			return translatedMeasureObj;
		default:
			return translatedMeasureObj;
	}
};
