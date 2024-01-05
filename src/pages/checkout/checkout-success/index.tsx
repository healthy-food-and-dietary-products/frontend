import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import OurBlock from '@components/our-block';
import OrderStatusTracker from '@components/order-status-tracker';
import { URLS } from '@data/constants';
import Button from '@components/button';
import api from '@services/api';
import { useAuth } from '@hooks/use-auth';
import { usePopup } from '@hooks/use-popup';

import styles from './checkout-success.module.scss';

type Order = {
	orderNumber: string;
	orderId: number;
};

const CheckoutSuccess: React.FC = () => {
	const [order, setOrder] = React.useState<Order>({ orderNumber: '', orderId: 0 });
	const [paymentUrl, setPaymentUrl] = useState('');
	const location = useLocation();
	const navigate = useNavigate();
	const { isLoggedIn } = useAuth();
	const { handleOpenPopup } = usePopup();

	React.useEffect(() => {
		location.state?.orderId ? setOrder(location.state) : navigate('/', { replace: true });
	}, [location, navigate]);

	React.useEffect(() => {
		if (order.orderId !== 0) {
			api
				.usersOrderPay(order.orderId)
				.then(({ checkout_session_url }) => setPaymentUrl(checkout_session_url));
		}
	}, [order.orderId]);

	const handlePayment = () => {
		if (paymentUrl) return window.location.assign(paymentUrl);
	};

	return (
		<div className={styles.checkoutSuccess}>
			<section className={styles.checkoutSuccess__order}>
				<h1 className={styles.checkoutSuccess__title}>
					Заказ №{order.orderNumber} успешно оформлен!
				</h1>
				<Button
					onClick={handlePayment}
					buttonText="Оплатить онлайн"
					buttonStyle="green-button"
				></Button>
				<p className={styles.checkoutSuccess__paragraph}>
					Мы уже приступили к его сборке. <br />
					За статусом заказа можно следить в{' '}
					{isLoggedIn ? (
						<Link className={styles.checkoutSuccess__link} to={URLS.PROFILE_ORDERS}>
							личном кабинете
						</Link>
					) : (
						<Link
							onClick={() => handleOpenPopup('openPopupLogin')}
							className={styles.checkoutSuccess__link}
							to="/profile"
						>
							личном кабинете
						</Link>
					)}
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
