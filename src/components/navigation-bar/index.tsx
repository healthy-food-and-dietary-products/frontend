import React, { useEffect, useRef } from 'react';
import CustomNavLink from '@components/custom-nav-link';
import { usePopup } from '@hooks/use-popup';
import { useAuth } from '@hooks/use-auth';
import { URLS } from '@data/constants';
import styles from './navigation-bar.module.scss';

interface NavigationBarProps {
	isOpen: boolean;
	onClick: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ isOpen, onClick }) => {
	const { isLoggedIn } = useAuth();
	const { handleOpenPopup } = usePopup();
	const burgerRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		onClick();
		handleOpenPopup('openPopupLogin');
	};

	const closeBurger = (e: MouseEvent) => {
		if (isOpen && !burgerRef.current?.contains(e.target as Node)) {
			onClick();
		}
	};
	const closeBurgerOnEsc = (e: KeyboardEvent) => {
		if (isOpen && e.key === 'Escape') {
			onClick();
		}
	};

	useEffect(() => {
		document.addEventListener('pointerdown', closeBurger);
		document.addEventListener('keydown', closeBurgerOnEsc);
		return () => {
			document.removeEventListener('pointerdown', closeBurger);
			document.removeEventListener('keydown', closeBurgerOnEsc);
		};
	});

	return (
		<div
			ref={burgerRef}
			className={`${styles['navigation-bar']} ${isOpen ? styles.visible : styles.hidden}`}
		>
			<nav className={`${styles['navigation-bar__nav']}`}>
				{!isLoggedIn && (
					<button onClick={handleClick} className={`${styles['navigation-bar__button']}`}>
						Войти
					</button>
				)}
				<ul className={`${styles['navigation-bar__list']}`}>
					<CustomNavLink
						onClick={onClick}
						to={'/catalog'}
						className={`${styles['navigation-bar__link']}`}
						classNameActive={`${styles['navigation-bar__link_active']}`}
					>
						Каталог
					</CustomNavLink>
					<CustomNavLink
						onClick={onClick}
						to={'/cart'}
						className={`${styles['navigation-bar__link']}`}
						classNameActive={`${styles['navigation-bar__link_active']}`}
					>
						Корзина
					</CustomNavLink>
					<CustomNavLink
						onClick={onClick}
						to={URLS.ABOUT_US}
						className={`${styles['navigation-bar__link']}`}
						classNameActive={`${styles['navigation-bar__link_active']}`}
					>
						О нас
					</CustomNavLink>
					<CustomNavLink
						onClick={onClick}
						to="/#topSelling"
						className={`${styles['navigation-bar__link']}`}
						classNameActive={`${styles['navigation-bar__link_active']}`}
					>
						Товары недели
					</CustomNavLink>
					<CustomNavLink
						onClick={onClick}
						to={'/recipes'}
						className={`${styles['navigation-bar__link']}`}
						classNameActive={`${styles['navigation-bar__link_active']}`}
					>
						Рецепты
					</CustomNavLink>
					<CustomNavLink
						onClick={onClick}
						to={'/contacts'}
						className={`${styles['navigation-bar__link']}`}
						classNameActive={`${styles['navigation-bar__link_active']}`}
					>
						Контакты
					</CustomNavLink>
				</ul>
			</nav>
		</div>
	);
};

export default NavigationBar;
