import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useAuth } from '../../hooks/use-auth.ts';
import Navigation from '@components/navigation';
import styles from './header.module.scss';
import NavigationIcons from '@components/navigation-icons';
import BurgerMenu from '@components/burger-menu';
import NavigationBar from '@components/navigation-bar';

const Header: React.FC = () => {
	// Этот блок кода предназначен для реализации переходов между страницами
	// с учетом авторизации пользователя. Если пользователь авторизован,
	// то будет доступна ссылка на страницу профиля, иначе будет показана кнопка "Профиль",
	// которая будет использоваться для открытия попапа авторизации.
	// {isLoggedIn ? (
	// 	<Link to="/profile">Профиль</Link>
	// ) : (
	// 	<button>Профиль</button>
	// )}
	// const { isLoggedIn } = useAuth();
	const [openBurger, setOpenBurger] = useState(false);
	console.log(openBurger);
	function ClickOpen() {
		if (!openBurger) {
			setOpenBurger(true);
		} else {
			setOpenBurger(false);
		}
	}

	return (
		<header className={styles.header}>
			<div className={styles.header__container}>
				<BurgerMenu ClickOpen={ClickOpen} />
				<Link to={'/'} className="link">
					<h1 className={styles.header__title}>GoodFood</h1>
				</Link>
				<Navigation />
				<NavigationIcons />
				<NavigationBar isOpen={openBurger} />
			</div>
		</header>
	);
};

export default Header;

{
	/* <Link to="/">Главная</Link>;
{
	isLoggedIn ? <Link to="/profile">Профиль</Link> : <button>Профиль</button>;
}
<Link to="/login">Логин</Link>; */
}
