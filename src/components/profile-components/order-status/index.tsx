import styles from './order-status.module.scss';
import doneIcon from '@images/profile/home-status.svg';
import canceledIcon from '@images/profile/cancel-status.svg';
import orderedIcon from '@images/profile/payment-status.svg';
import deliveredIcon from '@images/profile/car-status.svg';
import clsx from 'clsx';

type Props = {
	status?: 'Completed' | 'Delivered' | 'Canceled' | 'Ordered';
};

const OrderStatus = ({ status = 'Completed' }: Props) => {
	let text, image, style;
	switch (status) {
		case 'Completed': {
			text = 'Доставлен';
			image = doneIcon;
			style = styles.done;
			break;
		}
		case 'Delivered': {
			text = 'Доставляется';
			image = deliveredIcon;
			style = styles.delivered;
			break;
		}
		case 'Canceled': {
			text = 'Отменен';
			image = canceledIcon;
			style = styles.canceled;
			break;
		}
		case 'Ordered': {
			text = 'Оплачен';
			image = orderedIcon;
			style = styles.ordered;
			break;
		}
	}
	return (
		<p className={clsx(style, styles.status)}>
			<span className={styles.icon}>
				<img className={styles.image} src={image} alt={text} />
			</span>
			<span>{text}</span>
		</p>
	);
};

export default OrderStatus;
