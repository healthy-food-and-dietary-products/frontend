import React from 'react';
import styles from './burger-menu.module.scss';
import { usePopup } from '@hooks/use-popup.ts';

const BurgerMenu: React.FC = () => {
	const { handleOpenPopup } = usePopup();

	return (
		<div className={styles.burgerContainer}>
			<button
				className={`${styles.navigation__icon} ${styles.navigation__icon_burger}`}
				type="button"
				onClick={() => handleOpenPopup('openPopupLogin')}
			/>
		</div>
	);
};

export default BurgerMenu;
