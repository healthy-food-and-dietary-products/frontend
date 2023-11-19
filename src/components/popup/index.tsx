import React, { ReactNode } from 'react';
import styles from './popup.module.scss';
import { createPortal } from 'react-dom';

type PopupProps = {
	openPopup: boolean;
	onClickClose: () => void;
	children: ReactNode;
	additionalClasses?: string;
};

const popupRoot = document.querySelector('#popup');

const Popup: React.FC<PopupProps> = ({
	openPopup,
	onClickClose,
	children,
	additionalClasses,
}) => {
	return (
		popupRoot &&
		createPortal(
			<div className={openPopup ? styles['popup__open'] : styles['popup']}>
				<div className={`${styles['popup__inner']} ${additionalClasses}`}>
					<button
						className={styles['popup__button']}
						type="button"
						onClick={onClickClose}
					/>
					{children}
				</div>
			</div>,
			popupRoot
		)
	);
};

export default Popup;
