import { Link } from 'react-router-dom';
import Payment from '..';
import OrderStatusTracker from '@components/order-status-tracker';
import { useAuth } from '@hooks/use-auth';
import successIcon from '@images/circle-ok-min.svg';
import styles from './payment-good.module.scss';

const PaymentGood = () => {
	const { isLoggedIn } = useAuth();
	const text = 'Пока вы ждёте заказ, можете ознакомиться с рецептами из нашего блога';

	return (
		<Payment adviceText={text}>
			<section className={styles.container}>
				<img className={styles.image} src={successIcon}></img>
				<h1 className={styles.title}>Успешно!</h1>
				{isLoggedIn ? (
					<p className={styles.info}>
						Ваш платеж принят в обработку. Отслеживать его вы можете в
						<Link to={'/profile'}> личном кабинете</Link>
					</p>
				) : (
					<p className={styles.info}>
						Ваш платеж принят в обработку. История заказов доступна для зарегистрированных
						пользователей.
					</p>
				)}
				<OrderStatusTracker />
			</section>
		</Payment>
	);
};

export default PaymentGood;
