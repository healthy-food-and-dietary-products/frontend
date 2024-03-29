import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PaymentButton from '@components/payment-button';
import OrderStatus from '../order-status';
import { translateMeasureUnit } from '@utils/utils';
import type { CommonOrder, Product } from '@pages/profile/utils/types';
import { getDeliveryMethodRu, getPaymentMethodRu } from '@pages/profile/utils/utils';
import styles from './profile-order.module.scss';

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

	const getAmountWithMeasureUnit = (
		unitOfMeasure: string,
		size: number,
		multiplier: number
	) => {
		const totalAmount = size * multiplier;
		const { measureUnit, amount } = translateMeasureUnit(unitOfMeasure, totalAmount);
		return `${amount} ${measureUnit}`;
	};

	const date = ordering_date && new Date(ordering_date).toLocaleDateString();
	return (
		<>
			<div
				className={clsx(styles.order, isShowedProductsDetails && styles.details)}
				onClick={showDetails}
			>
				<h4 className={styles['order-title']}>
					<span>{`Заказ № ${order_number} от ${date}`}</span>
					<span>{`${total_price} руб`}</span>
				</h4>
				{isShowedProductsDetails ? (
					<ul className={styles['order-products']}>
						{(products as Array<{ product: Product; quantity: number }>).map((item) => (
							<li className={styles.product} key={item.product.name}>
								<Link
									className={styles.product__linkImage}
									to={`/catalog/${item.product.category.category_slug}/${item.product.id}`}
								>
									<div className={styles['product__image-large']}>
										<img
											className={styles.product__image}
											src={item.product.photo}
											alt={item.product.name}
										/>
									</div>
								</Link>
								<Link
									className={styles.product__linkText}
									to={`/catalog/${item.product.category.category_slug}/${item.product.id}`}
								>
									<p className={styles.product__name}>{item.product.name}</p>
								</Link>
								<p className={styles.product__weight}>
									{getAmountWithMeasureUnit(
										item.product.measure_unit,
										item.product.amount,
										item.quantity
									)}
								</p>
								<p className={styles.product__price}>{`${
									item.product.final_price * item.quantity
								} руб.`}</p>
							</li>
						))}
					</ul>
				) : (
					<ul className={styles['order-products']}>
						{(products as Array<{ product: Product; quantity: number }>).map(
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
						<p className={styles.text}>{`Оплата: ${getPaymentMethodRu(
							payment_method
						)}`}</p>
						<p className={styles.text}>{`Получение: ${getDeliveryMethodRu(
							delivery_method
						)}`}</p>
					</div>
					<div className={styles.status}>
						{order.is_paid || payment_method !== 'Online' ? (
							<OrderStatus status={order.is_paid ? 'In delivering' : status} />
						) : (
							<PaymentButton orderId={order.id} />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileOrder;
