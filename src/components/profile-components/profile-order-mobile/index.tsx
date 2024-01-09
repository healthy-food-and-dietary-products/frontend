import clsx from 'clsx';
import ProductCard from '@components/product-card';
import PaymentButton from '@components/payment-button';
import OrderStatus from '../order-status';
import type { CommonOrder, Product } from '@pages/profile/utils/types';
import { getDeliveryMethodRu, getPaymentMethodRu } from '@pages/profile/utils/utils';
import styles from './profile-order-mobile.module.scss';

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
					{(products as Array<{ product: Product; quantity: number }>).map((item) => (
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
						<span className={styles['text-span']}>
							{getDeliveryMethodRu(delivery_method)}
						</span>
					</p>
					<p className={styles.text}>
						<span className={styles['text-span']}>Способ оплаты:</span>
						<span className={styles['text-span']}>
							{getPaymentMethodRu(payment_method)}
						</span>
					</p>
				</div>
			</div>
			<div className={styles.status}>
				<p className={styles.price}>{`${total_price} руб.`}</p>
				{order.is_paid || payment_method !== 'Online' ? (
					<OrderStatus status={order.is_paid ? 'In delivering' : status} />
				) : (
					<PaymentButton orderId={order.id} />
				)}
			</div>
		</button>
	);
};

export default ProfileOrderMobile;
