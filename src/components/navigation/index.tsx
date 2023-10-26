import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth.ts';

import styles from './navigation.module.scss';

const Navigation: React.FC = () => {
	const { isLoggedIn } = useAuth();
	return (
		<nav className={styles.navigation}>
			<ul className={styles.navigation__list}>
				<Link className={`${styles.navigation__item} text link`} to={''}>
					О нас
				</Link>
				<Link className={`link ${styles.navigation__item} text`} to={''}>
					Доставка
				</Link>
				<Link className={`link ${styles.navigation__item} text`} to={''}>
					Рецепты
				</Link>
				<Link className={`link ${styles.navigation__item} text`} to={''}>
					Контакты
				</Link>
			</ul>

			<div className={styles.navigation__icons}>
				<Link
					className={`${styles.navigation__icon} ${styles.navigation__icon_search}`}
					to={''}
				></Link>
				<Link
					className={`${styles.navigation__icon} ${styles.navigation__icon_busket}`}
					to={''}
				></Link>
				{/* логика перехода на профиль, либо регистрацию, здесь потом попап */}
				<Link
					className={`${styles.navigation__icon} ${styles.navigation__icon_profile}`}
					to={isLoggedIn ? '/profile' : ''}
				></Link>
			</div>
		</nav>
	);
};

export default Navigation;
