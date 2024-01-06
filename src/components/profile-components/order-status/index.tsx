import styles from './order-status.module.scss';
import doneIcon from '@images/profile/home-status.svg';
import canceledIcon from '@images/profile/cancel-status.svg';
import orderedIcon from '@images/profile/payment-status.svg';
import deliveredIcon from '@images/profile/car-status.svg';
import clsx from 'clsx';

type Props = {
	status?:
		| 'Ordered'
		| 'In processing'
		| 'Collecting'
		| 'Gathered'
		| 'In delivering'
		| 'Delivered'
		| 'Completed';
};

const statusObj = {
	Completed: {
		text: 'Доставлен',
		image: doneIcon,
		style: styles.done,
	},
	Delivered: {
		text: 'Доставляется',
		image: deliveredIcon,
		style: styles.delivered,
	},
	Canceled: {
		text: 'Отменен',
		image: canceledIcon,
		style: styles.canceled,
	},
	Ordered: {
		text: 'Заказан',
		image: orderedIcon,
		style: styles.ordered,
	},
	Gathered: { text: '', image: '', style: '' },
	'In processing': { text: '', image: '', style: '' },
	'In delivering': { text: '', image: '', style: '' },
	Collecting: { text: '', image: '', style: '' },
};

const OrderStatus = ({ status = 'Completed' }: Props) => {
	const { text, image, style } = statusObj[status];

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
