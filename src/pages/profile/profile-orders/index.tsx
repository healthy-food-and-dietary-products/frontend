import { useEffect, useState } from 'react';
import { useProfile } from '@hooks/use-profile';
import ProfileOrder from '@components/profile-components/profile-order';
import ProfileOrderMobile from '@components/profile-components/profile-order-mobile';
import styles from './profile-orders.module.scss';
import api from '@services/api';
import { OrderList } from '@services/generated-api/data-contracts';

export default function ProfileOrders() {
	const [isOpenDetails, setIsOpenDetails] = useState<number>();
	const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth <= 768);
	const [width, setWidth] = useState(window.innerWidth);
	const [orders, setOrders] = useState<OrderList[]>([]);
	const { setIsProfileMenuOpen } = useProfile();

	const onResize = () => {
		setIsMobileScreen(window.innerWidth <= 768);
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		api.usersOrderList().then((data) => setOrders(data));
	}, []);

	useEffect(() => {
		setTimeout(() => {
			window.addEventListener('resize', onResize);
		}, 100);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, [width]);

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
				{isMobileScreen && (
					<button
						onClick={() => setIsProfileMenuOpen(true)}
						className={styles['profile-orders__title-button']}
						type="button"
					>
						Назад к меню
					</button>
				)}
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
