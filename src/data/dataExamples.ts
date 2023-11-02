import TomatoesForProductPage from '@images/tomatoes_for_product_page.png';

export const mainPageBlockLinks = [
	{
		title: 'Овощи',
		link: 'vegetables',
		backgroundImage: '/4e039f6d2c33797f4fd913bd642549f0.jpeg',
	},
	{
		title: 'Фрукты',
		link: 'fruits',
		backgroundImage: '/5b5f8ca8a8f4f583ac88b6e80a646e10.jpeg',
	},
	{
		title: 'Орехи',
		link: 'nuts',
		backgroundImage: '/05c2db3efd894fa03b952abf2d5a88ee.jpeg',
	},
	{
		title: 'Молочные продукты',
		link: 'diary',
		backgroundImage: '/383bea75365411fd84f9c6c47e081cab.jpeg',
	},
	{
		title: 'Мясо и птица',
		link: 'meat',
		backgroundImage: '/e8ab3ec81c9d3e4cc473a3d6ae86bc5a.jpeg',
	},
];

export const products = [
	{
		cardName: 'Помидоры черри',
		price: `80 руб.`,
		weight: `1кг`,
		buttonText: 'В корзину',
	},
	{
		cardName: 'Огурцы короткоплодные',
		price: `100 руб.`,
		weight: `1кг`,
		buttonText: 'В корзину',
	},
	{
		cardName: 'Перец болгарский',
		price: `120 руб.`,
		weight: `1кг`,
		buttonText: 'В корзину',
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
