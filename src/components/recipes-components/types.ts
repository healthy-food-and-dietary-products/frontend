export type ReceipeIngredient = {
	amount: number;
	final_price: number;
	id: number;
	ingredient_photo: string;
	measure_unit: string;
	name: string;
	need_to_buy: number;
	quantity_in_recipe: number;
	quantity_in_recipe_measure?: string;
};

export type RecipeIngredientsProps = {
	ingredients: ReceipeIngredient[];
	handleClick: (id: number, idAndCategories?: (string | number | undefined)[][]) => void;
};

export type ReceipeInfoProps = {
	author: number;
	carbohydrates: number;
	cooking_time: number;
	fats: number;
	id: number;
	image: string;
	ingredients: ReceipeIngredient[];
	kcal: number;
	name: string;
	proteins: number;
	text: string;
	total_ingredients?: number;
};
