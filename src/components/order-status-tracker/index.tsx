import React from 'react';
import styles from './order-status-tracker.module.scss';
import donePath from '@images/circle-ok-min.svg';
import packagingPath from '@images/cart-add-min.svg';
import deliveringPath from '@images/car-alt-min.svg';
import deliveredPath from '@images/home-alt-min.svg';

const OrderStatusTracker: React.FC = () => {
	return (
		<ul className={styles.orderStatusTracker}>
			<li className={styles.orderStatusTracker__item}>
				<img
					src={donePath}
					alt="Заказ принят"
					className={styles.orderStatusTracker__icon}
				/>
				<p className={styles.orderStatusTracker__status}>Заказ принят</p>
			</li>
			<li className={styles.orderStatusTracker__spacer} />
			<li className={styles.orderStatusTracker__item}>
				<img
					src={packagingPath}
					alt="Сборка заказа"
					className={styles.orderStatusTracker__icon}
				/>
				<p className={styles.orderStatusTracker__status}>Сборка заказа</p>
			</li>
			<li className={styles.orderStatusTracker__spacer} />
			<li className={styles.orderStatusTracker__item}>
				<img
					src={deliveringPath}
					alt="Передан в доставку"
					className={styles.orderStatusTracker__icon}
				/>
				<p className={styles.orderStatusTracker__status}>Передан в доставку</p>
			</li>
			<li className={styles.orderStatusTracker__spacer} />
			<li className={styles.orderStatusTracker__item}>
				<img
					src={deliveredPath}
					alt="Успешно доставлено"
					className={styles.orderStatusTracker__icon}
				/>
				<p className={styles.orderStatusTracker__status}>Успешно доставлено</p>
			</li>
		</ul>
	);
};

export default OrderStatusTracker;
