import clsx from 'clsx';
import doneIcon from '@images/profile/home-status.svg';
import canceledIcon from '@images/profile/cancel-status.svg';
import orderedIcon from '@images/profile/payment-status.svg';
import deliveredIcon from '@images/profile/car-status.svg';
import checkedIcon from '@images/profile/check-status.svg';
import { OrderStatusType } from '@pages/profile/utils/types';
import styles from './order-status.module.scss';

type Props = {
	status?: OrderStatusType;
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
		text: 'Оформлен',
		image: checkedIcon,
		style: styles.checked,
	},
	Gathered: { text: '', image: '', style: '' },
	'In processing': { text: '', image: '', style: '' },
	'In delivering': { text: 'Оплачен', image: orderedIcon, style: styles.ordered },
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
