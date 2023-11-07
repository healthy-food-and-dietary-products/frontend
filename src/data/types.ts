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

export type UserType = {
	username: string;
	email: string;
	id?: number;
	first_name?: string;
	last_name?: string;
	role?: 'user' | 'moderator' | 'admin';
	city?: 'Moscow';
	birth_date?: string;
	address_quantity?: string;
	phone_number?: string;
	photo?: string;
};

export type UserCreateType = {
	email: string;
	username: string;
	password: string;
	id?: number;
	city?: string;
};

export type ActivationType = {
	uid: string;
	token: string;
};
