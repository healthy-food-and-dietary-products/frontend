import { useProfile } from '@hooks/use-profile';
import styles from './return-back-button.module.scss';

const ReturnBackButton = () => {
	const { setIsProfileMenuOpen } = useProfile();

	return (
		<button
			onClick={() => setIsProfileMenuOpen(true)}
			className={styles.button}
			type="button"
		>
			Назад к меню
		</button>
	);
};

export default ReturnBackButton;
