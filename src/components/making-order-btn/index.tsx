import React from 'react';
import styles from './making-order-btn.module.scss';
import Button from '@components/Button';

interface MakingOrderBtnProps {
	onClick?: () => void;
}

const MakingOrderBtn: React.FC<MakingOrderBtnProps> = ({ onClick }) => {
	return (
		<div className={styles.order}>
			<Button buttonText="Оформить заказ" buttonStyle="green-button" onClick={onClick} />
			<p className={`${styles.order__title}`}>
				Нажимая на&nbsp;кнопку &laquo;Оформить заказ&raquo;, вы&nbsp;соглашаетесь
				с&nbsp;условиями обработки персональных данных, а&nbsp;также с&nbsp;условиями
				продажи.
			</p>
		</div>
	);
};

export default MakingOrderBtn;
