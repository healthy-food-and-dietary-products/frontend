import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navigation.module.scss';

const Navigation: React.FC = () => {
	return (
		<nav className={styles.navigation}>
			<ul className={styles.navigation__list}>
				<Link className={styles.navigation_catalog} to={'/catalog'}>
					Каталог
				</Link>
				<Link
					className={`${styles.navigation__item}  `}
					to="#aboutCompany"
					reloadDocument
				>
					О нас
				</Link>
				<Link className={` ${styles.navigation__item}`} to="#delivery" reloadDocument>
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
