/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SubcategoryLight {
	/**
	 * Subcategory name
	 * @minLength 1
	 */
	subcategory_name: string;
	/**
	 * Subcategory slug
	 * @minLength 1
	 */
	subcategory_slug: string;
}

export interface Category {
	/** ID */
	id?: number;
	/**
	 * Name
	 * @minLength 1
	 * @maxLength 100
	 */
	name: string;
	image: string;
	/**
	 * Slug
	 * @format slug
	 * @maxLength 100
	 * @pattern ^[-a-zA-Z0-9_]+$
	 */
	slug?: string;
	subcategories?: SubcategoryLight[];
	/** Top three products */
	top_three_products?: string;
}

export interface CategoryCreate {
	/** ID */
	id?: number;
	/**
	 * Category name
	 * @minLength 1
	 */
	category_name: string;
	/**
	 * Slug
	 * @format slug
	 * @maxLength 100
	 * @pattern ^[-a-zA-Z0-9_]+$
	 */
	slug?: string;
}

export interface ValidationError {
	/**
	 * Code
	 * @minLength 1
	 */
	code: string;
	/**
	 * Detail
	 * @minLength 1
	 */
	detail: string;
	/**
	 * Attr
	 * @minLength 1
	 */
	attr: string;
}

export interface ValidationErrorResponse {
	/** Type */
	type: 'validation_error';
	errors: ValidationError[];
}

export interface Error401 {
	/** Code */
	code: 'authentication_failed' | 'not_authenticated';
	/**
	 * Detail
	 * @minLength 1
	 */
	detail: string;
	/**
	 * Attr
	 * @minLength 1
	 */
	attr?: string | null;
}

export interface ErrorResponse401 {
	/** Type */
	type: 'client_error';
	errors: Error401[];
}

export interface Error403 {
	/** Code */
	code: 'permission_denied';
	/**
	 * Detail
	 * @minLength 1
	 */
	detail: string;
	/**
	 * Attr
	 * @minLength 1
	 */
	attr?: string | null;
}

export interface ErrorResponse403 {
	/** Type */
	type: 'client_error';
	errors: Error403[];
}

export interface Error404 {
	/** Code */
	code: 'not_found';
	/**
	 * Detail
	 * @minLength 1
	 */
	detail: string;
	/**
	 * Attr
	 * @minLength 1
	 */
	attr?: string | null;
}

export interface ErrorResponse404 {
	/** Type */
	type: 'client_error';
	errors: Error404[];
}

export interface Component {
	/** ID */
	id?: number;
	/**
	 * Name
	 * Component name
	 * @minLength 1
	 * @maxLength 100
	 */
	name: string;
	/**
	 * Slug
	 * Component slug
	 * @format slug
	 * @maxLength 100
	 * @pattern ^[-a-zA-Z0-9_]+$
	 */
	slug?: string;
}

export interface UserLight {
	/**
	 * Username
	 * 150 characters or fewer. Letters, digits and @/./+/-/_ only.
	 * @minLength 1
	 * @maxLength 150
	 * @pattern ^[\w.@+-]+$
	 */
	username: string;
	/**
	 * E-mail address
	 * @format email
	 * @minLength 1
	 * @maxLength 254
	 */
	email: string;
}

export interface ProducerLight {
	/**
	 * Producer name
	 * @minLength 1
	 */
	producer_name: string;
	/**
	 * Producer slug
	 * @minLength 1
	 */
	producer_slug: string;
}

export interface ProductLight {
	/**
	 * Name
	 * Product name
	 * @minLength 1
	 * @maxLength 100
	 */
	name: string;
	producer: ProducerLight;
}

export interface FavoriteProduct {
	/** ID */
	id?: number;
	user: UserLight;
	product: ProductLight;
}

export interface Producer {
	/** ID */
	id?: number;
	/**
	 * Name
	 * Producer name
	 * @minLength 1
	 * @maxLength 100
	 */
	name: string;
	/**
	 * Slug
	 * Producer slug
	 * @format slug
	 * @maxLength 100
	 * @pattern ^[-a-zA-Z0-9_]+$
	 */
	slug?: string;
	/** Producer type */
	producer_type?: 'company' | 'entrepreneur';
	/**
	 * Description
	 * Brief information about the company or entrepreneur
	 */
	description?: string;
	/**
	 * Address
	 * Legal address of the producers
	 * @minLength 1
	 */
	address: string;
}

export interface CategoryLight {
	/**
	 * Category name
	 * @minLength 1
	 */
	category_name: string;
	/**
	 * Category slug
	 * @minLength 1
	 */
	category_slug: string;
}

export interface TagLight {
	/**
	 * Tag name
	 * @minLength 1
	 */
	tag_name: string;
	/**
	 * Tag slug
	 * @minLength 1
	 */
	tag_slug: string;
}

export interface PromotionLight {
	/**
	 * Promotion name
	 * @minLength 1
	 */
	promotion_name: string;
	/**
	 * Discount
	 * Percentage of a product price
	 * @min 0
	 * @max 100
	 */
	discount?: number;
}

export interface ComponentLight {
	/**
	 * Component name
	 * @minLength 1
	 */
	component_name: string;
	/**
	 * Component slug
	 * @minLength 1
	 */
	component_slug: string;
}

export interface Product {
	/** ID */
	id: number;
	/**
	 * Name
	 * Product name
	 * @minLength 1
	 * @maxLength 100
	 */
	name: string;
	/**
	 * Description
	 * Product description
	 */
	description?: string;
	/**
	 * Creation time
	 * Date of inclusion of the product in the database
	 * @format date-time
	 */
	creation_time?: string;
	category?: CategoryLight;
	subcategory: SubcategoryLight;
	tags?: TagLight[];
	/**
	 * Discontinued
	 * Is this product discontinued from sale
	 */
	discontinued?: boolean;
	producer: ProducerLight;
	/** Measure unit */
	measure_unit?: 'grams' | 'milliliters' | 'items';
	/**
	 * Amount
	 * Number of grams, milliliters or items
	 * @min 0
	 * @max 32767
	 */
	amount?: number;
	/**
	 * Price
	 * Price per one product unit
	 * @min 0
	 */
	price: number;
	/** Final price */
	final_price?: number;
	promotions?: PromotionLight[];
	/** Promotion quantity */
	promotion_quantity?: number;
	/**
	 * Photo
	 * @format uri
	 */
	photo?: string;
	components: ComponentLight[];
	/**
	 * Kcal
	 * Number of kcal per 100 g of product
	 * @min 0
	 * @max 32767
	 */
	kcal: number;
	/**
	 * Proteins
	 * Number of proteins per 100 g of product
	 * @min 0
	 * @max 32767
	 */
	proteins: number;
	/**
	 * Fats
	 * Number of fats per 100 g of product
	 * @min 0
	 * @max 32767
	 */
	fats: number;
	/**
	 * Carbohydrates
	 * Number of carbohydrates per 100 g of product
	 * @min 0
	 * @max 32767
	 */
	carbohydrates: number;
	/**
	 * Views number
	 * Number of product page views
	 * @min 0
	 * @max 2147483647
	 */
	views_number?: number;
	/**
	 * Orders number
	 * Number of orders for this product
	 * @min 0
	 * @max 2147483647
	 */
	orders_number?: number;
	/** Is favorited */
	is_favorited?: boolean;
}

export interface ProductCreate {
	/** ID */
	id?: number;
	/**
	 * Name
	 * Product name
	 * @minLength 1
	 * @maxLength 100
	 */
	name: string;
	/**
	 * Description
	 * Product description
	 */
	description?: string;
	/**
	 * Creation time
	 * Date of inclusion of the product in the database
	 * @format date-time
	 */
	creation_time?: string;
	/** Category */
	category?: number;
	/** Subcategory */
	subcategory: number;
	/** @uniqueItems true */
	tags?: number[];
	/**
	 * Discontinued
	 * Is this product discontinued from sale
	 */
	discontinued?: boolean;
	/** Producer */
	producer: number;
	/** Measure unit */
	measure_unit?: 'grams' | 'milliliters' | 'items';
	/**
	 * Amount
	 * Number of grams, milliliters or items
	 * @min 0
	 * @max 32767
	 */
	amount?: number;
	/**
	 * Price
	 * Price per one product unit
	 * @min 0
	 */
	price: number;
	/** Final price */
	final_price?: string;
	/**
	 * Photo
	 * @format uri
	 */
	photo?: string;
	/** @uniqueItems true */
	components: number[];
	/**
	 * Kcal
	 * Number of kcal per 100 g of product
	 * @min 0
	 * @max 32767
	 */
	kcal: number;
	/**
	 * Proteins
	 * Number of proteins per 100 g of product
	 * @min 0
	 * @max 32767
	 */
	proteins: number;
	/**
	 * Fats
	 * Number of fats per 100 g of product
	 * @min 0
	 * @max 32767
	 */
	fats: number;
	/**
	 * Carbohydrates
	 * Number of carbohydrates per 100 g of product
	 * @min 0
	 * @max 32767
	 */
	carbohydrates: number;
}

export interface ProductUpdate {
	/** ID */
	id?: number;
	/**
	 * Name
	 * Product name
	 * @minLength 1
	 * @maxLength 100
	 */
	name: string;
	/**
	 * Description
	 * Product description
	 */
	description?: string;
	/**
	 * Creation time
	 * Date of inclusion of the product in the database
	 * @format date-time
	 */
	creation_time?: string;
	/** Category */
	category?: number;
	/** Subcategory */
	subcategory: number;
	/** @uniqueItems true */
	tags?: number[];
	/**
	 * Discontinued
	 * Is this product discontinued from sale
	 */
	discontinued?: boolean;
	/** Producer */
	producer: number;
	/** Measure unit */
	measure_unit?: 'grams' | 'milliliters' | 'items';
	/**
	 * Amount
	 * Number of grams, milliliters or items
	 * @min 0
	 * @max 32767
	 */
	amount?: number;
	/**
	 * Price
	 * Price per one product unit
	 * @min 0
	 */
	price: number;
	/** Final price */
	final_price?: string;
	/** @uniqueItems true */
	promotions: number[];
	/**
	 * Photo
	 * @format uri
	 */
	photo?: string;
	/** @uniqueItems true */
	components: number[];
	/**
	 * Kcal
	 * Number of kcal per 100 g of product
	 * @min 0
	 * @max 32767
	 */
	kcal: number;
	/**
	 * Proteins
	 * Number of proteins per 100 g of product
	 * @min 0
	 * @max 32767
	 */
	proteins: number;
	/**
	 * Fats
	 * Number of fats per 100 g of product
	 * @min 0
	 * @max 32767
	 */
	fats: number;
	/**
	 * Carbohydrates
	 * Number of carbohydrates per 100 g of product
	 * @min 0
	 * @max 32767
	 */
	carbohydrates: number;
}

export interface Promotion {
	/** ID */
	id?: number;
	/** Promotion type */
	promotion_type?:
		| 'simple'
		| 'birthday'
		| 'loyalty_card'
		| 'expired_soon'
		| 'present'
		| 'two_for_one'
		| 'multiple_items';
	/**
	 * Name
	 * Promotion name
	 * @minLength 1
	 * @maxLength 100
	 */
	name: string;
	/**
	 * Discount
	 * Percentage of a product price
	 * @min 0
	 * @max 100
	 */
	discount?: number;
	/**
	 * Conditions
	 * Conditions of the promotion
	 */
	conditions?: string;
	/**
	 * Active or not
	 * Is this promotion valid now
	 */
	is_active?: boolean;
	/**
	 * Constant or not
	 * Does this promotion have a time limits
	 */
	is_constant?: boolean;
	/**
	 * Promotion start time
	 * @format date-time
	 */
	start_time?: string | null;
	/**
	 * Promotion end time
	 * @format date-time
	 */
	end_time?: string | null;
}

export interface FavoriteProductCreate {
	/** ID */
	id?: number;
}

export interface UserPresent {
	/**
	 * Username
	 * 150 characters or fewer. Letters, digits and @/./+/-/_ only.
	 * @minLength 1
	 * @maxLength 150
	 * @pattern ^[\w.@+-]+$
	 */
	username: string;
	/**
	 * Имя
	 * @maxLength 150
	 */
	first_name?: string;
	/**
	 * Фамилия
	 * @maxLength 150
	 */
	last_name?: string;
}

export interface ShoppingCartProductList {
	/** Id */
	id?: string;
	/** Name */
	name?: string;
	/** Measure unit */
	measure_unit?: string;
	/** Price */
	price?: string;
	/** Final price */
	final_price?: string;
	/** Amount */
	amount?: string;
	/**
	 * Количество
	 * @min 1
	 * @max 10000
	 */
	quantity?: number;
	/** Is favorited by user */
	is_favorited_by_user?: string;
}

export interface ShoppingCartGet {
	/** ID */
	id?: number;
	user?: UserPresent;
	products?: ShoppingCartProductList[];
	/**
	 * Total price
	 * @min 0
	 * @max 2147483647
	 */
	total_price?: number;
	/** Status */
	status?: 'Ordered' | 'In Work';
}

export interface ShoppingCartProductCreateUpdate {
	/** Id */
	id: number;
	/**
	 * Quantity
	 * @default 1
	 */
	quantity?: number;
}

export interface ShoppingCartPostUpdateDelete {
	products: ShoppingCartProductCreateUpdate[];
}

export interface Subcategory {
	/** ID */
	id?: number;
	/** Category */
	parent_category: number;
	/**
	 * Name
	 * @minLength 1
	 * @maxLength 100
	 */
	name: string;
	/**
	 * Slug
	 * @format slug
	 * @maxLength 100
	 * @pattern ^[-a-zA-Z0-9_]+$
	 */
	slug?: string;
}

export interface Tag {
	/** ID */
	id?: number;
	/**
	 * Name
	 * Tag name
	 * @minLength 1
	 * @maxLength 100
	 */
	name: string;
	/**
	 * Slug
	 * Tag slug
	 * @format slug
	 * @maxLength 100
	 * @pattern ^[-a-zA-Z0-9_]+$
	 */
	slug?: string;
}

export interface TokenCreate {
	/**
	 * Password
	 * @minLength 1
	 */
	password?: string;
	/**
	 * Email
	 * @minLength 1
	 */
	email?: string;
}

export interface Token {
	/**
	 * Auth token
	 * @minLength 1
	 */
	auth_token: string;
}

export interface Address {
	/** ID */
	id?: number;
	/**
	 * Address
	 * @minLength 1
	 */
	address: string;
	/** Priority */
	priority_address?: boolean;
}

export interface User {
	/** ID */
	id?: number;
	/**
	 * Username
	 * 150 characters or fewer. Letters, digits and @/./+/-/_ only.
	 * @minLength 1
	 * @maxLength 150
	 * @pattern ^[\w.@+-]+$
	 */
	username: string;
	/**
	 * E-mail address
	 * @format email
	 * @minLength 1
	 * @maxLength 254
	 */
	email: string;
	/**
	 * Имя
	 * @maxLength 150
	 */
	first_name?: string;
	/**
	 * Фамилия
	 * @maxLength 150
	 */
	last_name?: string;
	/** City */
	city?: 'Moscow';
	/**
	 * Birth date
	 * @format date
	 */
	birth_date?: string | null;
	addresses?: Address[];
	/** Address quantity */
	address_quantity?: string;
	/**
	 * Phone number
	 * @maxLength 17
	 * @pattern ^(\+7|7|8)\d{10}$
	 */
	phone_number?: string;
	/**
	 * Photo
	 * @format uri
	 */
	photo?: string;
}

export interface UserCreate {
	/**
	 * Email
	 * @format email
	 * @minLength 1
	 */
	email: string;
	/** ID */
	id?: number;
	/**
	 * Username
	 * @minLength 1
	 */
	username: string;
	/**
	 * Password
	 * @minLength 1
	 */
	password: string;
	/** City */
	city?: string;
}

export interface ProductsInRecipe {
	/** Id */
	id?: string;
	/** Name */
	name?: string;
	/** Measure unit */
	measure_unit?: string;
	/** Quantity */
	quantity?: string;
}

export interface Recipe {
	/** ID */
	id?: number;
	/** Recipe author */
	author: number;
	/**
	 * Recipe title
	 * @minLength 1
	 * @maxLength 255
	 */
	name: string;
	/**
	 * Recipe description
	 * @minLength 1
	 */
	text: string;
	/**
	 * Dish image
	 * @format uri
	 */
	image?: string;
	ingredients: ProductsInRecipe[];
	/** Total ingredients */
	total_ingredients?: string;
	/** Recipe nutrients */
	recipe_nutrients?: string;
	/**
	 * Cooking time
	 * @min 1
	 * @max 2147483647
	 */
	cooking_time: number;
}

export interface Activation {
	/**
	 * Uid
	 * @minLength 1
	 */
	uid: string;
	/**
	 * Token
	 * @minLength 1
	 */
	token: string;
}

export interface SendEmailReset {
	/**
	 * Email
	 * @format email
	 * @minLength 1
	 */
	email: string;
}

export interface PasswordResetConfirm {
	/**
	 * Uid
	 * @minLength 1
	 */
	uid: string;
	/**
	 * Token
	 * @minLength 1
	 */
	token: string;
	/**
	 * New password
	 * @minLength 1
	 */
	new_password: string;
}

export interface UsernameResetConfirm {
	/**
	 * E-mail address
	 * @format email
	 * @minLength 1
	 * @maxLength 254
	 */
	new_email: string;
}

export interface SetPassword {
	/**
	 * New password
	 * @minLength 1
	 */
	new_password: string;
	/**
	 * Current password
	 * @minLength 1
	 */
	current_password: string;
}

export interface SetUsername {
	/**
	 * Current password
	 * @minLength 1
	 */
	current_password: string;
	/**
	 * E-mail address
	 * @format email
	 * @minLength 1
	 * @maxLength 254
	 */
	new_email: string;
}

export interface OrderList {
	/** ID */
	id: number;
	user?: UserPresent;
	shopping_cart?: ShoppingCartGet;
	/** Order number */
	order_number?: string;
	/**
	 * DateTime
	 * @format date-time
	 */
	ordering_date?: string;
	/** Status */
	status?:
		| 'Ordered'
		| 'In processing'
		| 'Collecting'
		| 'Gathered'
		| 'In delivering'
		| 'Delivered'
		| 'Completed';
	/** Payment Method */
	payment_method?: 'Payment at the point of delivery' | 'In getting by cash';
	/** Is paid */
	is_paid?: boolean;
	/** Delivery Method */
	delivery_method?: 'Point of delivery' | 'By courier';
	/** Address */
	address?: string;
	/** Delivery point */
	delivery_point?: string;
	/**
	 * Package price
	 * Price per order packaging
	 * @min 0
	 */
	package?: number;
	/** Comment */
	comment?: string | null;
	/** Total price */
	total_price?: string;
	products: Array<{
		amount: number;
		final_price: number;
		id: number;
		measure_unit: string;
		name: string;
		quantity: string;
		photo: string;
	}>;
}

export interface OrderPostDelete {
	/** Payment Method */
	payment_method?: 'Payment at the point of delivery' | 'In getting by cash';
	/** Delivery Method */
	delivery_method?: 'Point of delivery' | 'By courier';
	/** Delivery Point */
	delivery_point?: number | null;
	/**
	 * Package price
	 * Price per order packaging
	 * @min 0
	 */
	package?: number;
	/** Comment */
	comment?: string | null;
	/** User's address */
	add_address?: string;
}

export interface OrderPostAdd extends OrderPostDelete {
	user_data: {
		first_name: string;
		last_name: string;
		phone_number: string;
		email: string;
	};
	address?: number;
}
