import styles from './profile-order.module.scss';
import OrderStatus from '../order-status';
import clsx from 'clsx';

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

const ProfileOrder = ({
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

	console.log(status);
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
		<>
			<button
				type="button"
				className={clsx(styles.order, isShowedProductsDetails && styles.details)}
				onClick={showDetails}
			>
				<h4 className={styles['order-title']}>
					<span>{`Заказ № ${order_number} от ${date}`}</span>
					<span>{`${total_price} руб`}</span>
				</h4>
				{isShowedProductsDetails ? (
					<ul className={styles['order-products']}>
						{(products as Array<{ product: Product; quantity: string }>).map((item) => (
							<li className={styles.product} key={item.product.name}>
								<div className={styles['product__image-large']}>
									<img
										className={styles.product__image}
										src={item.product.photo}
										alt={item.product.name}
									/>
								</div>
								<p className={styles.product__name}>{item.product.name}</p>
								<p className={styles.product__weight}>{`${
									item.product.amount * Number(item.quantity)
								} ${item.product.measure_unit}`}</p>
								<p
									className={styles.product__price}
								>{`${item.product.final_price} руб.`}</p>
							</li>
						))}
					</ul>
				) : (
					<ul className={styles['order-products']}>
						{(products as Array<{ product: Product; quantity: string }>).map(
							(item, index) => (
								<li className={styles.product} key={index}>
									{index < 5 && (
										<div className={styles['product__image-small']}>
											<img
												className={styles.product__image}
												src={item.product.photo}
												alt={item.product.name}
											/>
										</div>
									)}
								</li>
							)
						)}
					</ul>
				)}

				<div className={styles['order-details']}>
					<div className={styles.info}>
						<p className={styles.text}>{`Способ оплаты: ${payment_method_ru}`}</p>
						<p className={styles.text}>{`Способ получения: ${delivery_method_ru}`}</p>
					</div>
					<div className={styles.status}>
						<OrderStatus status={status} />
					</div>
				</div>
			</button>
		</>
	);
};

export default ProfileOrder;
