import React from 'react';
import { Link } from 'react-router-dom';
import { URLS } from '@data/constants.ts';
import styles from './navigation.module.scss';

const Navigation: React.FC = () => {
	return (
		<nav className={styles.navigation}>
			<ul className={styles.navigation__list}>
				<Link className={styles.navigation_catalog} to={'/catalog'}>
					Каталог
				</Link>
				<Link className={` ${styles.navigation__item}`} to={URLS.ABOUT_US}>
					О нас
				</Link>
				<Link className={` ${styles.navigation__item}`} to={URLS.DELIVERY}>
					Доставка
				</Link>
				<Link className={` ${styles.navigation__item}`} to={'/recipes'}>
					Рецепты
				</Link>
				<Link className={` ${styles.navigation__item}`} to={'/contacts'}>
					Контакты
				</Link>
			</ul>
		</nav>
	);
};

export default Navigation;
