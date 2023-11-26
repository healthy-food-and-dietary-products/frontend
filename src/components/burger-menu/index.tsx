import React from 'react';
import styles from './burger-menu.module.scss';
import { usePopup } from '@hooks/use-popup.ts';

const BurgerMenu: React.FC = () => {
	const { handleOpenPopup } = usePopup();

	return (
		<button
			className={styles.burgerMenu}
			type="button"
			onClick={() => handleOpenPopup('openPopupLogin')}
		/>
	);
};

export default BurgerMenu;
