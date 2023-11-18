import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './navigation-icons.module.scss';

const NavigationIcons: React.FC = () => {
	const location = useLocation();
	return (
		<div className={styles.navigation__icons}>
			<div className={styles['navigation__iconsContainer']}>
				<button
					className={`${styles.navigation__icon} ${styles.navigation__icon_search}`}
					type="button"
				/>
				<Link
					className={`${styles.navigation__icon} ${styles.navigation__icon_busket}`}
					to={''}
				></Link>
				<Link
					className={`${styles.navigation__icon} ${styles.navigation__icon_profile}`}
					to={'/profile'}
					state={{ prevPath: location.pathname }}
				></Link>
			</div>
		</div>
	);
};

export default NavigationIcons;
