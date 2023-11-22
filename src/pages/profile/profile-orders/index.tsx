import styles from './profile-orders.module.scss';
import { useState } from 'react';
import ProfileOrder from '@components/profile-components/profile-order';

const ordersArray = [...new Array(4)];

export default function ProfileOrders() {
	const [isOpenDetails, setIsOpenDetails] = useState<number>();

	const showDetails = (index: number) => {
		return () => {
			setIsOpenDetails(index);
		};
	};

	const hideDetails = () => setIsOpenDetails(undefined);
	return (
		<div className={styles['profile-orders']}>
			<div className={styles['profile-orders__title']}>
				<h2 className={styles['profile-orders__title-text']}>Мои заказы</h2>
				{typeof isOpenDetails === 'number' && (
					<button
						onClick={hideDetails}
						className={styles['profile-orders__title-button']}
						type="button"
					>
						Назад к заказам
					</button>
				)}
			</div>
			<div className={styles['profile-orders__list']}>
				{ordersArray
					.filter((_, index) =>
						typeof isOpenDetails === 'number' ? isOpenDetails === index : true
					)
					.map((_, index) => (
						<ProfileOrder
							key={index}
							isShowedProductsDetails={typeof isOpenDetails === 'number'}
							showDetails={showDetails(index)}
						/>
					))}
			</div>
			{typeof isOpenDetails !== 'number' && (
				<button className={styles['profile-orders__button']}>Загрузить еще</button>
			)}
		</div>
	);
}
