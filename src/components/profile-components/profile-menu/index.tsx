import { NavLink, useNavigate } from 'react-router-dom';
import styles from './profile-menu.module.scss';
import BagIcon from '@images/profile/bag.svg?react';
import ExitIcon from '@images/profile/exit.svg?react';
import HeartIcon from '@images/profile/heart.svg?react';
import MarkerIcon from '@images/profile/marker.svg?react';
import UserIcon from '@images/profile/user.svg?react';
import { useAuth } from '@hooks/use-auth';
import clsx from 'clsx';
import { usePopup } from '@hooks/use-popup';
import { useProfile } from '@hooks/use-profile';
import Popup from '@components/popup';
import { useState } from 'react';

const menuArray = [
	{ title: 'Мои заказы', Icon: BagIcon, path: 'orders' },
	{ title: 'Личные данные', Icon: UserIcon, path: '.' },
	{ title: 'Мои адреса', Icon: MarkerIcon, path: 'addresses' },
	{ title: 'Избранное', Icon: HeartIcon, path: 'favorites' },
	{ title: 'Выйти из аккаунта', Icon: ExitIcon },
];

export default function ProfileMenu() {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const { handleOpenPopup, handleClosePopup, popupState } = usePopup();
	const [isLoadingExit, setIsLoadingExit] = useState(false);
	const { setIsProfileMenuOpen } = useProfile();

	const handleExit = () => {
		setIsLoadingExit(true);
		logout().then(() => {
			handleClosePopup('openPopupLogout');
			setIsLoadingExit(false);
			navigate('/');
		});
	};
	return (
		<ul className={styles.list}>
			{menuArray.map(({ title, Icon, path }) => (
				<li key={title} className={styles.item}>
					{path ? (
						<NavLink
							onClick={() => setIsProfileMenuOpen(false)}
							to={path}
							className={({ isActive }) => clsx(styles.link, isActive && styles.active)}
							end
						>
							<Icon className={styles.link__icon} />
							<span className={clsx('text_type_u', styles.link__title)}>{title}</span>
						</NavLink>
					) : (
						<>
							<button
								className={styles.button}
								type="button"
								onClick={() => handleOpenPopup('openPopupLogout')}
							>
								<Icon className={styles.button__icon} />
								<span className={clsx('text_type_u', styles.button__title)}>{title}</span>
							</button>
							<Popup
								openPopup={popupState.openPopupLogout}
								onClickClose={() => !isLoadingExit && handleClosePopup('openPopupLogout')}
							>
								<div className={styles['popup-logout']}>
									<h3 className={styles['popup-logout__title']}>
										Хотите выйти из профиля?
									</h3>
									<div className={styles['popup-logout__buttons']}>
										<button
											onClick={handleExit}
											type="button"
											className={styles['popup-logout__button-confirm']}
											disabled={isLoadingExit}
										>
											Да
										</button>
										<button
											disabled={isLoadingExit}
											onClick={() => handleClosePopup('openPopupLogout')}
											type="button"
											className={styles['popup-logout__button-cancel']}
										>
											Нет
										</button>
									</div>
								</div>
							</Popup>
						</>
					)}
				</li>
			))}
		</ul>
	);
}
