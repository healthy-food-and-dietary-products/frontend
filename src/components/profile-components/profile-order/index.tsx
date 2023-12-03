import styles from './profile-order.module.scss';
import OrderStatus from '../order-status';
import clsx from 'clsx';

import { products } from '@data/dataExamples';

const order_number = 1111;
const ordering_date = new Date('2023-11-21T04:23:30.372Z');
const price = 100;

const payment_method = 'Наличные';
const delivery_method = 'Курьером';

const status = 'Delivered';

type Props = {
	readonly isShowedProductsDetails?: boolean;
	readonly showDetails?: () => void;
};

const ProfileOrder = ({
	isShowedProductsDetails = false,
	showDetails = () => {},
}: Props) => {
	return (
		<>
			<button
				type="button"
				className={clsx(styles.order, isShowedProductsDetails && styles.details)}
				onClick={showDetails}
			>
				<h4 className={styles['order-title']}>
					<span>{`Заказ № ${order_number} от ${ordering_date.toLocaleDateString()}`}</span>
					<span>{`${price} руб`}</span>
				</h4>
				{isShowedProductsDetails ? (
					<div className={styles['order-products']}>
						{products.map((prod, index) => (
							<>
								<div key={index} className={styles['product__image-large']}>
									<img
										className={styles.product__image}
										src={prod.cardImage as string}
										alt="Продукт"
									/>
								</div>
								<p key={index} className={styles.product__name}>
									{prod.cardName}
								</p>
								<p key={index} className={styles.product__weight}>{`${
									prod.weight || ''
								} ${prod.measure_unit || ''}`}</p>
								<p key={index} className={styles.product__price}>{`${
									prod.price || ''
								} руб.`}</p>
							</>
						))}
					</div>
				) : (
					<ul className={styles['order-products']}>
						{products.map((product, index) => (
							<li className={styles.product} key={product.cardName}>
								{index < 5 && (
									<div className={styles['product__image-small']}>
										<img
											className={styles.product__image}
											src={product.cardImage}
											alt={product.cardName}
										/>
									</div>
								)}
							</li>
						))}
					</ul>
				)}

				<div className={styles['order-details']}>
					<div className={styles.info}>
						<p className={styles.text}>{`Способ оплаты: ${payment_method}`}</p>
						<p className={styles.text}>{`Способ получения: ${delivery_method}`}</p>
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
