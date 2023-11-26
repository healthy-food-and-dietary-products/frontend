import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@hooks/use-auth.ts';
import styles from './navigation-icons.module.scss';
import { usePopup } from '@hooks/use-popup.ts';

const NavigationIcons: React.FC = () => {
	const { isLoggedIn } = useAuth();
	const { handleOpenPopup } = usePopup();

	return (
		<div className={styles.navigation__icons}>
			{isLoggedIn ? (
				<div className={styles['navigation__iconsContainer']}>
					<button
						className={`${styles.navigation__icon} ${styles.navigation__icon_search}`}
						type="button"
						onClick={() => handleOpenPopup('openPopupLogin')}
					/>
					<Link
						className={`${styles.navigation__icon} ${styles.navigation__icon_busket}`}
						to={'/cart'}
					></Link>
					<Link
						className={`${styles.navigation__icon} ${styles.navigation__icon_profile}`}
						to={isLoggedIn ? '/profile' : ''}
					></Link>
				</div>
			) : (
				<div className={styles['navigation__iconsContainer']}>
					<button
						className={`${styles.navigation__icon} ${styles.navigation__icon_search}`}
						type="button"
						onClick={() => handleOpenPopup('openPopupLogin')}
					/>
					<button
						className={`${styles.navigation__icon} ${styles.navigation__icon_busket}`}
						type="button"
						onClick={() => handleOpenPopup('openPopupLogin')}
					/>
					<button
						className={`${styles.navigation__icon} ${styles.navigation__icon_profile}`}
						type="button"
						onClick={() => handleOpenPopup('openPopupLogin')}
					/>
				</div>
			)}
		</div>
	);
};

export default NavigationIcons;
