import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navigation.module.scss';
import Button from '@components/Button';

const Navigation: React.FC = () => {
	return (
		<nav className={styles.navigation}>
			<ul className={styles.navigation__list}>
				<Button buttonText="Каталог" buttonStyle="header-button"></Button>
				<Link className={`${styles.navigation__item}  `} to={''}>
					О нас
				</Link>
				<Link className={` ${styles.navigation__item}`} to={''}>
					Доставка
				</Link>
				<Link className={` ${styles.navigation__item}`} to={''}>
					Рецепты
				</Link>
				<Link className={` ${styles.navigation__item}`} to={''}>
					Контакты
				</Link>
			</ul>
		</nav>
	);
};

export default Navigation;
