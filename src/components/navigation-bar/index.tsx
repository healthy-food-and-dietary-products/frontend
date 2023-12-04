import React from 'react';
import styles from './navigation-bar.module.scss';
import CustomNavLink from '@components/custom-nav-link';

interface NavigationBarProps {
	isOpen: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ isOpen }) => {
	return (
		<div
			className={`${styles['navigation-bar']} ${isOpen ? styles.visible : styles.hidden}`}
		>
			<nav className={`${styles['navigation-bar__nav']}`}>
				<button className={`${styles['navigation-bar__button']}`}>Войти</button>
				<ul className={`${styles['navigation-bar__list']}`}>
					<CustomNavLink
						to={'/catalog'}
						className={`${styles['navigation-bar__link']}`}
						classNameActive={`${styles['navigation-bar__link_active']}`}
					>
						Каталог
					</CustomNavLink>
					<CustomNavLink to={'/'} className={`${styles['navigation-bar__link']}`}>
						О нас
					</CustomNavLink>
					<CustomNavLink to={'/'} className={`${styles['navigation-bar__link']}`}>
						Товары недели
					</CustomNavLink>
					<CustomNavLink to={'/'} className={`${styles['navigation-bar__link']}`}>
						Рецепты
					</CustomNavLink>
					<CustomNavLink to={'/'} className={`${styles['navigation-bar__link']}`}>
						Контакты
					</CustomNavLink>
				</ul>
			</nav>
		</div>
	);
};

export default NavigationBar;
