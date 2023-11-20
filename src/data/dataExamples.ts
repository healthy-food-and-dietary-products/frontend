import TomatoesForProductPage from '@images/tomatoes_for_product_page.png';

export const mainPageBlockLinks = [
	{
		title: 'Овощи',
		link: 'vegetables',
		backgroundImage: '/383bea75365411fd84f9c6c47e081cab.jpeg',
	},
	{
		title: 'Фрукты',
		link: 'fruits',
		backgroundImage: '/e8ab3ec81c9d3e4cc473a3d6ae86bc5a.jpeg',
	},
	{
		title: 'Орехи',
		link: 'nuts-dried-fruits',
		backgroundImage: '/05c2db3efd894fa03b952abf2d5a88ee.jpeg',
	},
	{
		title: 'Молочные продукты',
		link: 'dairy',
		backgroundImage: '/5b5f8ca8a8f4f583ac88b6e80a646e10.jpeg',
	},
	{
		title: 'Мясо и птица',
		link: 'meat-and-poultry',
		backgroundImage: '/4e039f6d2c33797f4fd913bd642549f0.jpeg',
	},
];

export const products = [
	{
		cardName: 'Помидоры черри',
		cardImage: 'https://goodfood.acceleratorpracticum.ru/media/images/products/1.jpg',
		price: 100,
		weight: 1,
		buttonText: 'В корзину',
		measure_unit: 'grams',
	},
	{
		cardName: 'Огурцы короткоплодные',
		cardImage: 'https://goodfood.acceleratorpracticum.ru/media/images/products/1.jpg',
		price: 200,
		weight: 2,
		buttonText: 'В корзину',
		measure_unit: 'grams',
	},
	{
		cardName: 'Перец болгарский',
		cardImage: 'https://goodfood.acceleratorpracticum.ru/media/images/products/1.jpg',
		price: 300,
		weight: 3,
		buttonText: 'В корзину',
		measure_unit: 'grams',
	},
];

export const productApiDataExample = {
	id: '1',
	name: 'Помидоры черри Краснодар',
	description:
		'Наши томаты вручную собирают самые заботливые фермеры Краснодарского края. При выращивании используется только вода и натруальные удобрения.',
	category: 'Овощи',
	producer: 'ООО Агрокомплекс',
	subcategory: 'Томаты',
	expiresDate: '21 сутки',
	amount: 10,
	price: 100,
	photo: TomatoesForProductPage,
	kcal: 15,
	proteins: 1,
	fats: 2,
	carbohydrates: 4,
};
