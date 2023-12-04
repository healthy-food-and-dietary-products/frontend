import React from 'react';
import styles from './burger-menu.module.scss';

interface BurgerMenuProps {
	ClickOpen: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ ClickOpen }) => {
	return (
		<div className={styles.burgerContainer}>
			<button
				className={`${styles.navigation__icon} ${styles.navigation__icon_burger}`}
				type="button"
				onClick={() => ClickOpen()}
			/>
		</div>
	);
};

export default BurgerMenu;
