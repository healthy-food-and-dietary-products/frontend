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
	/**
	 * Slug
	 * @format slug
	 * @maxLength 100
	 * @pattern ^[-a-zA-Z0-9_]+$
	 */
	slug?: string;
	subcategories?: SubcategoryLight[];
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
	 * @minLength 1
	 * @maxLength 150
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
}

export interface TagLight {
	/**
	 * Tag name
	 * @minLength 1
	 */
	tag_name: string;
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
}

export interface Product {
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
	final_price?: string;
	promotions?: PromotionLight[];
	/** Promotion quantity */
	promotion_quantity?: string;
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
	is_favorited?: string;
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

export interface FavoriteProductCreate {
	/** ID */
	id?: number;
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
	 * @minLength 1
	 * @maxLength 150
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
	/** Role */
	role?: 'user' | 'moderator' | 'admin';
	/** City */
	city?: 'Moscow';
	/**
	 * Birth_date
	 * @format date
	 */
	birth_date?: string | null;
	addresses?: Address[];
	/** Address quantity */
	address_quantity?: string;
	/**
	 * Phone_number
	 * @maxLength 128
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

export interface UserPresent {
	/**
	 * Username
	 * @minLength 1
	 * @maxLength 150
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

export interface OrderList {
	/** ID */
	id?: number;
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
		| 'Completed'
		| 'Gathered'
		| 'In delivering'
		| 'Delivered';
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
}

export interface OrderPostDelete {
	/**
	 * Number
	 * @minLength 1
	 * @maxLength 50
	 */
	order_number?: string;
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
	address?: number | null;
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
