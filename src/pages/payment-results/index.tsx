import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '@services/api';
import successIcon from '@images/circle-ok-min.svg';
import { textIfOrderPaid, textIfOrderNotPaid } from '@data/constants';
import Payment from '../../components/payment';
import OrderStatusTracker from '@components/order-status-tracker';
import PaymentButton from '@components/payment-button';
import Preloader from '@components/preloader';
import failIcon from '@images/circle-not-ok.svg';
import { useAuth } from '@hooks/use-auth';
import styles from './payment-results.module.scss';

type PaymentResultsProps = {
	isPaid: boolean;
};

const PaymentResults: React.FC<PaymentResultsProps> = ({ isPaid }) => {
	const { isLoggedIn } = useAuth();
	const [paimentInfo, setPaymentInfo] = useState({
		order_id: '',
		order_number: '',
		stripe_session_id: '',
	});
	const textToShow = isPaid ? textIfOrderPaid : textIfOrderNotPaid;
	const location = useLocation();
	const paymentSessionIid = location.search.split('=')[1];

	useEffect(() => {
		const data = {
			stripe_session_id: paymentSessionIid,
		};

		api.paymentCheck(data).then(setPaymentInfo);
	}, [paymentSessionIid]);

	if (!paimentInfo.order_number) return <Preloader />;

	return (
		<Payment adviceText={textToShow}>
			{isPaid ? (
				<section className={styles.container}>
					<img className={styles.image} src={successIcon}></img>
					<h1 className={styles.title}>Успешно!</h1>
					{isLoggedIn ? (
						<p className={styles.info}>
							Ваш платеж по заказу {paimentInfo.order_number} принят в обработку.
							Отслеживать его вы можете в
							<Link to={'/profile/orders'}> личном кабинете</Link>
						</p>
					) : (
						<p className={styles.info}>
							Ваш платеж по заказу {paimentInfo.order_number} принят в обработку. История
							заказов доступна для зарегистрированных пользователей.
						</p>
					)}
					<OrderStatusTracker />
				</section>
			) : (
				<section className={styles.container}>
					<img className={styles.image} src={failIcon}></img>
					<h1 className={styles.title}>
						Ваш платеж по заказу {paimentInfo.order_number} отменён
					</h1>
					<p className={styles.info}>
						Возможно это был временный сбой&nbsp;—&nbsp;просто попробуйте снова
					</p>
					<PaymentButton
						orderId={Number(paimentInfo.order_id)}
						buttonText="Попробовать снова"
						isCheckoutPage={true}
					></PaymentButton>
				</section>
			)}
		</Payment>
	);
};

export default PaymentResults;
