type OrderStatusType =
	| 'Ordered'
	| 'In processing'
	| 'Collecting'
	| 'Gathered'
	| 'In delivering'
	| 'Delivered'
	| 'Completed';

export type Product = {
	amount: number;
	final_price: number;
	id: number;
	measure_unit: string;
	name: string;
	quantity: string;
	photo: string;
	category: {
		category_name: string;
		category_slug: string;
	};
};

export type CommonOrder = {
	id: number;
	is_paid: boolean;
	order_number?: string;
	ordering_date?: string;
	total_price?: string;
	payment_method?: string;
	delivery_method?: string;
	status?: OrderStatusType;
	products: Array<{ product: Product; quantity: number }> | Product[];
};
