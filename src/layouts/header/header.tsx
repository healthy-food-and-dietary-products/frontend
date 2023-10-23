import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth.ts';

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
	const { isLoggedIn } = useAuth();
	return (
		<div>
			<h2>Header</h2>
			<Link to="/">Главная</Link>
			{isLoggedIn ? <Link to="/profile">Профиль</Link> : <button>Профиль</button>}
			<Link to="/login">Логин</Link>
		</div>
	);
};

export default Header;
