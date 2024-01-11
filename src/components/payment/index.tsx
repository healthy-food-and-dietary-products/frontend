import React, { ReactNode } from 'react';
import OurBlock from '@components/our-block';
import styles from './payment.module.scss';

type PaymentProps = {
	children?: ReactNode;
	adviceText: string;
};

const Payment: React.FC<PaymentProps> = ({ children, adviceText }) => {
	return (
		<div className={styles.payment}>
			{children}
			<section className={styles.payment__ourBlock}>
				<p className={styles.payment__advice}>{adviceText}</p>
				<OurBlock />
			</section>
		</div>
	);
};

export default Payment;
