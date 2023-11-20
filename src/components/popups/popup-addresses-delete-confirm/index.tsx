import { usePopup } from '@hooks/use-popup';
import styles from './popup-addresses-delete-confirm.module.scss';
import Popup from '@components/popup';
import clsx from 'clsx';

type Props = {
	readonly cancelDeleteAddress?: () => void;
	readonly deleteAddress?: () => void;
	readonly address?: string;
};

export default function PopupAddressesDeleteConfirm({
	cancelDeleteAddress = () => {},
	deleteAddress = () => {},
	address = '',
}: Props) {
	const { popupState, handleClosePopup } = usePopup();

	const handleConfirm = () => {
		handleClosePopup('openPopupAddressesDeleteConfirm');
		deleteAddress();
	};

	const handleCancel = () => {
		handleClosePopup('openPopupAddressesDeleteConfirm');
		cancelDeleteAddress();
	};

	return (
		<Popup
			openPopup={popupState.openPopupAddressesDeleteConfirm}
			onClickClose={handleCancel}
		>
			<div className={styles['popup-delete-confirm']}>
				<p className={styles['popup-delete-confirm__text']}>
					Вы хотите удалить адрес
					<br />
					{address}
				</p>
				<div className={styles['popup-delete-confirm__buttons']}>
					<button
						type="button"
						className={clsx(
							styles['popup-delete-confirm__button'],
							styles['popup-delete-confirm__button-confirm']
						)}
						onClick={handleConfirm}
					>
						Да
					</button>
					<button
						type="button"
						className={clsx(
							styles['popup-delete-confirm__button'],
							styles['popup-delete-confirm__button-cancel']
						)}
						onClick={handleCancel}
					>
						Нет
					</button>
				</div>
			</div>
		</Popup>
	);
}
