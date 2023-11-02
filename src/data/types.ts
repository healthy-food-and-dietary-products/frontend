export type ProducerType = {
	name: string;
	address: string;
	slug?: string;
	producer_type?: string;
	description?: string;
};

export type ProductType = {
	name: string;
	subcategory: number;
	producer: number;
	price: number;
	components: number[];
	kcal: number;
	proteins: number;
	fats: number;
	carbohydrates: number;

	tags?: number[];
	description?: string;
	discontinued?: boolean;
	measure_unit?: 'grams' | 'milliliters' | 'items';
	amount?: number;
	views_number?: number;
};
