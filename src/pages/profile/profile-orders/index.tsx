import { useEffect, useState } from 'react';
import api from '@services/api';
import ProfileOrder from '@components/profile-components/profile-order';
import ProfileOrderMobile from '@components/profile-components/profile-order-mobile';
import ReturnBackButton from '@components/profile-components/return-back-button';
import { useProfile } from '@hooks/use-profile';
import type { CommonOrder } from '../utils/types';
import styles from './profile-orders.module.scss';

export default function ProfileOrders() {
	const [isOpenDetails, setIsOpenDetails] = useState<number>();
	const [orders, setOrders] = useState<CommonOrder[]>([]);
	const { isMobileScreen } = useProfile();

	useEffect(() => {
		api.usersOrderList().then((data) => setOrders(data));
	}, []);

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
				{isMobileScreen && <ReturnBackButton />}
			</div>
			<div className={styles['profile-orders__list']}>
				{orders.length ? (
					orders
						.filter((order) => (isOpenDetails ? isOpenDetails === order.id : true))
						.map((order) =>
							isMobileScreen ? (
								<ProfileOrderMobile
									key={order.id}
									order={order}
									isShowedProductsDetails={!!isOpenDetails}
									showDetails={showDetails(order.id)}
								/>
							) : (
								<ProfileOrder
									key={order.id}
									order={order}
									isShowedProductsDetails={!!isOpenDetails}
									showDetails={showDetails(order.id)}
								/>
							)
						)
				) : (
					<p className={styles['text']}>Вы пока ничего не заказывали</p>
				)}
			</div>
			{/* {typeof isOpenDetails !== 'number' && (
				<button className={styles['profile-orders__button']}>Загрузить еще</button>
			)} */}
		</div>
	);
}
