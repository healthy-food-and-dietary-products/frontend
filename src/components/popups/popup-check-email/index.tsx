import Popup from '@components/popup';
import { usePopup } from '@hooks/use-popup';
import styles from './popup-check-email.module.scss';
import clsx from 'clsx';

export default function PopupCheckEmail() {
	const { popupState, handleClosePopup } = usePopup();
	return (
		<Popup
			openPopup={popupState.openPopup}
			onClickClose={() => handleClosePopup('openPopup')}
		>
			<div className={styles.container}>
				<h3 className={styles.title}>Проверьте вашу электронную почту</h3>
				<p className={clsx(styles.text, 'text_type_u')}>
					Мы отправили на вашу почту информацию для подтверждения вашего личного кабинета
				</p>
			</div>
		</Popup>
	);
}
