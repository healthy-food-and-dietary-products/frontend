import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import OurBlock from '@components/our-block';
import OrderStatusTracker from '@components/order-status-tracker';

import styles from './checkout-success.module.scss';

const CheckoutSuccess: React.FC = () => {
	const [order, setOrder] = React.useState('');
	const location = useLocation();
	const navigate = useNavigate();

	React.useEffect(
		() =>
			location.state?.order
				? setOrder(location.state.order)
				: navigate('/', { replace: true }),
		[location, navigate]
	);

	return (
		<div className={styles.checkoutSuccess}>
			<section className={styles.checkoutSuccess__order}>
				<h1 className={styles.checkoutSuccess__title}>
					Заказ №{order} успешно оформлен!
				</h1>
				<p className={styles.checkoutSuccess__paragraph}>
					Мы уже приступили к его сборке. <br />
					За статусом заказа можно следить в{' '}
					<Link className={styles.checkoutSuccess__link} to="/profile">
						личном кабинете
					</Link>
					.
				</p>
				<OrderStatusTracker />
			</section>
			<section className={styles.checkoutSuccess__ourBlock}>
				<p className={styles.checkoutSuccess__advice}>
					Пока вы ждёте заказ, можете ознакомиться с рецептами из нашего блога
				</p>
				<OurBlock />
			</section>
		</div>
	);
};

export default CheckoutSuccess;
