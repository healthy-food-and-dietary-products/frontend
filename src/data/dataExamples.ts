import TomatoesForProductPage from '@images/tomatoes_for_product_page.png';

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
		cardImage: 'https://goodfood.acceleratorpracticum.ru/media/images/products/4.jpg',
		price: 200,
		weight: 2,
		buttonText: 'В корзину',
		measure_unit: 'grams',
	},
	{
		cardName: 'Перец болгарский',
		cardImage: 'https://goodfood.acceleratorpracticum.ru/media/images/products/7.jpg',
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
