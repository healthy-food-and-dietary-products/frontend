// NOTE: This is used to pick a value from array of word forms
// For English, 1st and 3rd elements should be the same

// Example: ['дней', 'день', 'дня'][plural(x)]
// 0 -> 'дней'
// 1 -> 'день'
// 2 -> 'дня'
// 3 -> 'дня'
// 231 -> 'день'

export default function plural(x: number) {
	if (x % 100 >= 5 && x % 100 <= 19) {
		return 0;
	} else {
		if (x % 10 === 0 || x % 10 >= 5) {
			return 0;
		} else if (x % 10 >= 2 && x % 10 <= 4) {
			return 2;
		} else {
			return 1;
		}
	}
}
