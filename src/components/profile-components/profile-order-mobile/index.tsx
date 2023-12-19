import ProductCard from '@components/product-card';
import styles from './profile-order-mobile.module.scss';
import OrderStatus from '../order-status';
import clsx from 'clsx';
// import { OrderList } from '@services/generated-api/data-contracts';

type OrderStatusType =
	| 'Ordered'
	| 'In processing'
	| 'Collecting'
	| 'Gathered'
	| 'In delivering'
	| 'Delivered'
	| 'Completed';

type Product = {
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

type CommonOrder = {
	id: number;
	order_number?: string;
	ordering_date?: string;
	total_price?: string;
	payment_method?: string;
	delivery_method?: string;
	status?: OrderStatusType;
	products: Array<{ product: Product; quantity: string }> | Product[];
};

type Props = {
	readonly isShowedProductsDetails?: boolean;
	readonly showDetails?: () => void;
	readonly order: CommonOrder;
};

const ProfileOrderMobile = ({
	isShowedProductsDetails = false,
	showDetails = () => {},
	order,
}: Props) => {
	const {
		order_number,
		ordering_date,
		total_price,
		payment_method,
		delivery_method,
		status,
		products,
	} = order;

	let payment_method_ru =
		payment_method === 'Payment at the point of delivery'
			? 'Банковской картой'
			: 'Наличные';

	let delivery_method_ru;
	if (delivery_method === 'Point of delivery') {
		delivery_method_ru = 'Самовывоз';
	} else {
		delivery_method_ru = 'Курьером';
		payment_method_ru += 'курьеру';
	}

	const date = ordering_date && new Date(ordering_date).toLocaleDateString();
	return (
		<button
			type="button"
			className={clsx(styles.order, isShowedProductsDetails && styles.details)}
			onClick={showDetails}
		>
			<h4 className={styles['order-title']}>
				<span>{`Заказ № ${order_number} от ${date}`}</span>
			</h4>
			{isShowedProductsDetails && (
				<div className={styles['order-products']}>
					{(products as Array<{ product: Product; quantity: string }>).map((item) => (
						<li key={item.product.id}>
							<ProductCard
								cardName={item.product.name}
								price={item.product.final_price}
								weight={item.product.amount || 0}
								cardImage={item.product.photo || ''}
								idCard={item.product.id}
								measureUnit={item.product.measure_unit}
								category={item.product.category.category_slug}
							/>
						</li>
					))}
				</div>
			)}

			<div className={styles['order-details']}>
				<div className={styles.info}>
					<p className={styles.text}>
						<span className={styles['text-span']}>Способ получения:</span>
						<span className={styles['text-span']}>{delivery_method_ru}</span>
					</p>
					<p className={styles.text}>
						<span className={styles['text-span']}>Способ оплаты:</span>
						<span className={styles['text-span']}>{payment_method_ru}</span>
					</p>
				</div>
			</div>
			<div className={styles.status}>
				<p className={styles.price}>{`${total_price} руб.`}</p>
				<OrderStatus status={status} />
			</div>
		</button>
	);
};

export default ProfileOrderMobile;
