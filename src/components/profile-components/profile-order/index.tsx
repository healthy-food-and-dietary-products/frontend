import styles from './profile-order.module.scss';
import OrderStatus from '../order-status';
import clsx from 'clsx';

import { products } from '@data/dataExamples';

const order_number = 1111;
const ordering_date = new Date('2023-11-21T04:23:30.372Z');
const price = 100;

const payment_method = 'Наличными курьеру';
const delivery_method = 'Курьером';
const address = 'ул. Пушкина д. Колотушкина';

const status = 'Delivered';

function getDivByType(element: Record<string, string | number>, index: number) {
	const [key, key2] = Object.keys(element);
	switch (key) {
		case 'cardImage': {
			return (
				<div key={index} className={styles['product__image-large']}>
					<img
						className={styles.product__image}
						src={element[key] as string}
						alt="Продукт"
					/>
				</div>
			);
		}
		case 'cardName': {
			return (
				<p key={index} className={styles.product__name}>
					{element[key]}
				</p>
			);
		}
		case 'weight': {
			return (
				<p
					key={index}
					className={styles.product__weight}
				>{`${element[key]} ${element[key2]}`}</p>
			);
		}
		case 'price': {
			return (
				<p key={index} className={styles.product__price}>{`${element[key]} руб.`}</p>
			);
		}
	}
}

type Props = {
	readonly isShowedProductsDetails?: boolean;
	readonly showDetails?: () => void;
};

export default function ProfileOrder({
	isShowedProductsDetails = false,
	showDetails = () => {},
}: Props) {
	const productsDetails = products.reduce(
		(acc: Array<Record<string, string | number>>, product) => {
			const { cardImage, cardName, weight, measure_unit, price } = product;
			return [...acc, { cardImage }, { cardName }, { weight, measure_unit }, { price }];
		},
		[]
	);
	return (
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
					{productsDetails.map((type, index) => getDivByType(type, index))}
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
					<p className={styles.text}>{`Адрес доставки: ${address}`}</p>
				</div>
				<div className={styles.status}>
					<OrderStatus status={status} />
				</div>
			</div>
		</button>
	);
}
