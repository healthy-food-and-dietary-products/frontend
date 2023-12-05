import ProductCard from '@components/product-card';
import styles from './profile-order-mobile.module.scss';
import OrderStatus from '../order-status';
import clsx from 'clsx';
import { OrderList } from '@services/generated-api/data-contracts';

type Props = {
	readonly isShowedProductsDetails?: boolean;
	readonly showDetails?: () => void;
	readonly order: OrderList;
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
					{/* вместо products нужно использовать продукты из заказа пользователя */}
					{products.map((item) => (
						<li key={item.id}>
							<ProductCard
								cardName={item.name}
								price={item.final_price}
								weight={item.amount || 0}
								cardImage={item.photo || ''}
								idCard={item.id}
								measureUnit={item.measure_unit}
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
