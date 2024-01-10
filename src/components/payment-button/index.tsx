import { useState } from 'react';
import api from '@services/api';
import Button from '@components/button';
import styles from './payment-button.module.scss';

type PaymentButtonProps = {
	orderId: number;
	isCheckoutPage?: boolean;
	buttonText?: string;
};

const PaymentButton: React.FC<PaymentButtonProps> = ({
	orderId,
	isCheckoutPage,
	buttonText,
}) => {
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
				setPaymentError(errors[0].detail);
			})
			.finally(() => setIsDisabled(false));
	};

	return (
		<div className={isCheckoutPage ? styles.buttonContainer : ''}>
			<Button
				onClick={handlePayment}
				buttonText={buttonText || 'Оплатить онлайн'}
				buttonStyle="green-button"
				disabled={isDisabled}
				classNames={styles['green-button__type_narrow']}
			/>
			<span className={styles.errorText}>{paymentError}</span>
		</div>
	);
};

export default PaymentButton;
