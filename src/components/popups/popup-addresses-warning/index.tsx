import { usePopup } from '@hooks/use-popup';
import styles from './popup-addresses-warning.module.scss';
import Popup from '@components/popup';

export default function PopupAddressesWarning() {
	const { popupState, handleClosePopup } = usePopup();

	return (
		<Popup
			openPopup={popupState.openPopupAddressesWarning}
			onClickClose={() => handleClosePopup('openPopupAddressesWarning')}
		>
			<div className={styles['popup-warning-text']}>
				Вы добавили максимально допустимое количество адресов. Чтобы добавить новый адрес,
				удалите один из текущих
			</div>
		</Popup>
	);
}
