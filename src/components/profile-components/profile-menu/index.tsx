import { NavLink, useNavigate } from 'react-router-dom';
import styles from './profile-menu.module.scss';
import BagIcon from '@images/profile/bag.svg?react';
import ExitIcon from '@images/profile/exit.svg?react';
import HeartIcon from '@images/profile/heart.svg?react';
import MarkerIcon from '@images/profile/marker.svg?react';
import UserIcon from '@images/profile/user.svg?react';
// import { useAuth } from '@hooks/use-auth';
import clsx from 'clsx';

const menuArray = [
	{ title: 'Мои заказы', Icon: BagIcon, path: '.' },
	{ title: 'Личные данные', Icon: UserIcon, path: 'user' },
	{ title: 'Мои адреса', Icon: MarkerIcon, path: 'addresses' },
	{ title: 'Избранное', Icon: HeartIcon, path: 'favorites' },
	{ title: 'Выйти из аккаунта', Icon: ExitIcon },
];

export default function ProfileMenu() {
	const navigate = useNavigate();
	// const { logout } = useAuth();

	const onClick = () => {
		// logout();
		navigate('/');
	};
	return (
		<ul className={styles.list}>
			{menuArray.map(({ title, Icon, path }) => (
				<li key={title} className={styles.item}>
					{path ? (
						<NavLink
							to={path}
							className={({ isActive }) => clsx(styles.link, isActive && styles.active)}
							end
						>
							<Icon className={styles.link__icon} />
							<span className={clsx('text_type_u', styles.link__title)}>{title}</span>
						</NavLink>
					) : (
						<button className={styles.button} type="button" onClick={onClick}>
							<Icon className={styles.button__icon} />
							<span className={clsx('text_type_u', styles.button__title)}>{title}</span>
						</button>
					)}
				</li>
			))}
		</ul>
	);
}
