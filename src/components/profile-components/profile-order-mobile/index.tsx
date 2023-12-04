import { useState, useEffect } from 'react';
import api from '@services/api.ts';
import type { Product } from '@services/generated-api/data-contracts';
import ProductCard from '@components/product-card';
import styles from './profile-order-mobile.module.scss';
import OrderStatus from '../order-status';
import clsx from 'clsx';

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

const ProfileOrderMobile = ({
	isShowedProductsDetails = false,
	showDetails = () => {},
}: Props) => {
	// вместо products нужно использовать продукты из заказа пользователя
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		// вместо products нужно использовать продукты из заказа пользователя
		api
			.productsList('')
			.then((data) => {
				setProducts(data.results);
			})
			.catch((err) => console.log(err))
			.finally(() => {});
	}, []);

	return (
		<button
			type="button"
			className={clsx(styles.order, isShowedProductsDetails && styles.details)}
			onClick={showDetails}
		>
			<h4 className={styles['order-title']}>
				<span>{`Заказ № ${order_number} от ${ordering_date.toLocaleDateString()}`}</span>
			</h4>
			{isShowedProductsDetails && (
				<div className={styles['order-products']}>
					{/* вместо products нужно использовать продукты из заказа пользователя */}
					{products.map((item) => (
						<li key={item.id}>
							<ProductCard
								cardName={item.name}
								price={item.price}
								weight={item.amount || 0}
								cardImage={item.photo || ''}
								idCard={item.id}
								measureUnit={item.measure_unit}
								is_favorited={item.is_favorited}
							/>
						</li>
					))}
				</div>
			)}

			<div className={styles['order-details']}>
				<div className={styles.info}>
					<p className={styles.text}>
						<span className={styles['text-span']}>Способ получения:</span>
						<span className={styles['text-span']}>{delivery_method}</span>
					</p>
					<p className={styles.text}>
						<span className={styles['text-span']}>Способ оплаты:</span>
						<span className={styles['text-span']}>{payment_method}</span>
					</p>
				</div>
			</div>
			<div className={styles.status}>
				<p className={styles.price}>{`${price} руб.`}</p>
				<OrderStatus status={status} />
			</div>
		</button>
	);
};

export default ProfileOrderMobile;
