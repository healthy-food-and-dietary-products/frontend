import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import OurBlock from '@components/our-block';
import OrderStatusTracker from '@components/order-status-tracker';
import PaymentButton from '@components/payment-button';
import { URLS } from '@data/constants';
import { useAuth } from '@hooks/use-auth';

import styles from './checkout-success.module.scss';

type Order = {
	orderNumber: string;
	orderId: number;
};

const CheckoutSuccess: React.FC = () => {
	const [order, setOrder] = React.useState<Order>({ orderNumber: '', orderId: 0 });
	const location = useLocation();
	const navigate = useNavigate();
	const { isLoggedIn } = useAuth();

	React.useEffect(() => {
		location.state?.orderId ? setOrder(location.state) : navigate('/', { replace: true });
	}, [location, navigate]);

	return (
		<div className={styles.checkoutSuccess}>
			<section className={styles.checkoutSuccess__order}>
				<h1 className={styles.checkoutSuccess__title}>
					Заказ №{order.orderNumber} успешно оформлен!
				</h1>
				<PaymentButton orderId={order.orderId} isCheckoutPage={true} />
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
