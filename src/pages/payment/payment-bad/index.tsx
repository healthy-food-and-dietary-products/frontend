import Payment from '..';
import PaymentButton from '@components/payment-button';
import failIcon from '@images/circle-not-ok.svg';
import styles from './payment-bad.module.scss';

const PaymentBad = () => {
	const text =
		'Пока решается проблема с оплатой, вы можете ознакомиться с рецептами из нашего блога';

	return (
		<Payment adviceText={text}>
			<section className={styles.container}>
				<img className={styles.image} src={failIcon}></img>
				<h1 className={styles.title}>Платеж не прошел</h1>
				<p className={styles.info}>
					Возможно это был временный сбой&nbsp;—&nbsp;просто попробуйте снова
				</p>
				<PaymentButton
					// TODO orderId получать из кук или из localStorage
					orderId={1000}
					buttonText="Попробовать снова"
					isCheckoutPage={true}
				></PaymentButton>
			</section>
		</Payment>
	);
};

export default PaymentBad;
