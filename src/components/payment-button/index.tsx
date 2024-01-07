import { useState } from 'react';
import api from '@services/api';
import Button from '@components/button';
import styles from './payment-button.module.scss';

type PaymentButtonProps = {
	orderId: number;
};

const PaymentButton: React.FC<PaymentButtonProps> = ({ orderId }) => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [paymentError, setPaymentError] = useState('');

	const handlePayment = () => {
		setIsDisabled(true);

		if (orderId === 0) return;

		api
			.usersOrderPay(orderId)
			.then(({ checkout_session_url }) => {
				window.location.assign(checkout_session_url);
			})
			.catch(({ errors }) => {
				console.log(errors);
				setPaymentError(errors[0].detail);
			})
			.finally(() => setIsDisabled(false));
	};
	return (
		<div>
			<Button
				onClick={handlePayment}
				buttonText="Оплатить онлайн"
				buttonStyle="green-button"
				disabled={isDisabled}
			/>
			<span className={styles.errorText}>{paymentError}</span>
		</div>
	);
};

export default PaymentButton;
