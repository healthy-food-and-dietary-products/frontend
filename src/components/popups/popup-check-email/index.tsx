import Popup from '@components/popup';
import { usePopup } from '@hooks/use-popup';
import styles from './popup-check-email.module.scss';

export default function PopupCheckEmail() {
	const { popupState, handleClosePopup } = usePopup();
	return (
		<Popup
			openPopup={popupState.openPopupCheckEmail}
			onClickClose={() => handleClosePopup('openPopupCheckEmail')}
		>
			<div className={styles.container}>
				<h3 className={styles.title}>Проверьте вашу электронную почту</h3>
				<p className={styles.text}>
					Мы отправили на вашу почту информацию для подтверждения вашего личного кабинета
				</p>
			</div>
		</Popup>
	);
}
