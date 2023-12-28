import { usePopup } from '@hooks/use-popup';
import styles from './popup-checkout-response.module.scss';
import Popup from '@components/popup';

type PopupCheckoutResponseProps = {
	text: string;
	handleClose: () => void;
};

const PopupCheckoutResponse: React.FC<PopupCheckoutResponseProps> = ({
	text,
	handleClose,
}) => {
	const { popupState } = usePopup();
	return (
		<Popup openPopup={popupState.openPopupCheckoutResponse} onClickClose={handleClose}>
			<div className={styles.textContainer}>
				<p className={styles.text}>{text}</p>
			</div>
		</Popup>
	);
};

export default PopupCheckoutResponse;
