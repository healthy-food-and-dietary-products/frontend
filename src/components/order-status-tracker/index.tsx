import React from 'react';

import donePath from '@images/circle-ok-min.svg';
import packagingPath from '@images/cart-add-min.svg';
import deliveringPath from '@images/car-alt-min.svg';
import deliveredPath from '@images/home-alt-min.svg';

import styles from './order-status-tracker.module.scss';

const orderSteps = [
	{ icon: donePath, text: 'Заказ принят' },
	{ icon: packagingPath, text: 'Сборка заказа' },
	{ icon: deliveringPath, text: 'Передан в доставку' },
	{ icon: deliveredPath, text: 'Успешно доставлено' },
];

const OrderStatusTracker: React.FC = () => (
	<ul className={styles.orderStatusTracker}>
		{orderSteps.map((step, index) => (
			<React.Fragment>
				<li key={index} className={styles.orderStatusTracker__item}>
					<img
						src={step.icon}
						alt={step.text}
						className={styles.orderStatusTracker__icon}
					/>
					<p className={styles.orderStatusTracker__status}>{step.text}</p>
				</li>
				{index < orderSteps.length - 1 && (
					<li className={styles.orderStatusTracker__spacer} />
				)}
			</React.Fragment>
		))}
	</ul>
);
export default OrderStatusTracker;
