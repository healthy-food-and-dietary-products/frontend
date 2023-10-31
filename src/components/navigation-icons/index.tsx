import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth.ts';
import styles from './navigation-icons.module.scss';

const NavigationIcons: React.FC = () => {
	const { isLoggedIn } = useAuth();

	return (
		<div className={styles.navigation__icons}>
			<Link
				className={`${styles.navigation__icon} ${styles.navigation__icon_search}`}
				to={''}
			></Link>
			<Link
				className={`${styles.navigation__icon} ${styles.navigation__icon_busket}`}
				to={''}
			></Link>
			<Link
				className={`${styles.navigation__icon} ${styles.navigation__icon_profile}`}
				to={isLoggedIn ? '/profile' : ''}
			></Link>
		</div>
	);
};

export default NavigationIcons;
