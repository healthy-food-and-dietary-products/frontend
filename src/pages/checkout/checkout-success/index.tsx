import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import OurBlock from '@components/our-block';
import OrderStatusTracker from '@components/order-status-tracker';
import { URLS } from '@data/constants';
import Button from '@components/button';
import api from '@services/api';
import { useAuth } from '@hooks/use-auth';

import styles from './checkout-success.module.scss';

type Order = {
	orderNumber: string;
	orderId: number;
};

const CheckoutSuccess: React.FC = () => {
	const [order, setOrder] = React.useState<Order>({ orderNumber: '', orderId: 0 });
	const [paymentError, setPaymentError] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const { isLoggedIn } = useAuth();

	React.useEffect(() => {
		location.state?.orderId ? setOrder(location.state) : navigate('/', { replace: true });
	}, [location, navigate]);

	const handlePayment = () => {
		setIsDisabled(true);

		if (order.orderId === 0) return;

		api
			.usersOrderPay(order.orderId)
			.then(({ checkout_session_url }) => {
				window.location.assign(checkout_session_url);
			})
			.catch(({ errors }) => {
				setPaymentError(errors[0].detail);
			})
			.finally(() => setIsDisabled(false));
	};

	return (
		<div className={styles.checkoutSuccess}>
			<section className={styles.checkoutSuccess__order}>
				<h1 className={styles.checkoutSuccess__title}>
					Заказ №{order.orderNumber} успешно оформлен!
				</h1>
				<div className={styles.checkoutSuccess__buttonContainer}>
					<Button
						onClick={handlePayment}
						buttonText="Оплатить онлайн"
						buttonStyle="green-button"
						disabled={isDisabled}
					/>
					<span className={styles.checkoutSuccess__error}>{paymentError}</span>
				</div>
				<div className={styles.checkoutSuccess__textContainer}>
					<p className={styles.checkoutSuccess__text}>Мы уже приступили к его сборке.</p>
					{isLoggedIn ? (
						<>
							<span className={styles.checkoutSuccess__text}>
								За статусом заказа можно следить в
							</span>
							<Link className={styles.checkoutSuccess__link} to={URLS.PROFILE_ORDERS} />
							&nbsp;личном кабинете.
						</>
					) : (
						<p className={styles.checkoutSuccess__text}>
							История заказов доступна для зарегистрированных пользователей.
						</p>
					)}
				</div>
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
